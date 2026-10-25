import { IConnection, IOptions } from "../connection.ts";
import { SQL2Service, WsSQL2 } from "../services/wsSQL2.ts";

export type SQLValue = string | number | boolean | null | SQLValue[] | { [key: string]: SQLValue };
export type SQLRow = Record<string, SQLValue>;

export class SQLCleanupError extends Error {
    constructor(message: string, public readonly cause: unknown, public readonly cleanupErrors: unknown[]) {
        super(message);
    }
}

function checkExceptions(response: { Exceptions?: WsSQL2.Exceptions }): void {
    if (response.Exceptions) {
        throw new Error(response.Exceptions.Exception?.map(e => e.Message ?? e.Code).join("; ") || "WsSQL2 request failed");
    }
}

function rowsFrom(response: { Rows?: string }): SQLValue[][] {
    if (typeof response.Rows !== "string") {
        throw new Error("WsSQL2 response is missing Rows");
    }
    let rows: unknown;
    try {
        rows = JSON.parse(response.Rows);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw Object.assign(new Error(`Error parsing WsSQL2 Rows JSON '${message}'`), { cause: error });
    }
    if (!Array.isArray(rows) || !rows.every(row => Array.isArray(row))) {
        throw new Error("WsSQL2 Rows must be an array of arrays");
    }
    return rows as SQLValue[][];
}

export class SQLConnection {
    protected readonly service: SQL2Service;
    protected readonly statements = new Set<SQLStatement>();
    protected closed = false;
    protected closing?: Promise<void>;

    constructor(options: IOptions | IConnection | SQL2Service) {
        this.service = options instanceof SQL2Service ? options : new SQL2Service(options);
    }

    createStatement(): SQLStatement {
        this.checkOpen();
        const statement = new SQLStatement(this.service, () => this.statements.delete(statement));
        this.statements.add(statement);
        return statement;
    }

    async queryRows(sql: string, fetchSize?: number): Promise<SQLRow[]> {
        const statement = this.createStatement();
        const rows: SQLRow[] = [];
        try {
            if (fetchSize !== undefined) statement.setFetchSize(fetchSize);
            const result = await statement.executeQuery(sql);
            while (await result.next()) rows.push(result.getRow());
        } catch (error) {
            try {
                await statement.close();
            } catch (closeError) {
                throw new SQLCleanupError("Failed to query rows and close statement", error, [closeError]);
            }
            throw error;
        }
        await statement.close();
        return rows;
    }

    async explainQuery(sql: string): Promise<WsSQL2.ExplainQueryResponse> {
        this.checkOpen();
        if (!sql.trim()) throw new Error("SQL text is required");
        const response = await this.service.ExplainQuery({ SqlText: sql });
        checkExceptions(response);
        return response;
    }

    async logicalFileMeta(logicalName: string): Promise<WsSQL2.LogicalFileMeta | undefined> {
        this.checkOpen();
        if (!logicalName.trim()) throw new Error("Logical file name is required");
        const response = await this.service.LogicalFileMeta({ LogicalName: logicalName });
        checkExceptions(response);
        return response.LogicalFileMeta;
    }

    async ping(): Promise<boolean> {
        this.checkOpen();
        await this.service.Ping({});
        return true;
    }

    async splitQuery(sql: string): Promise<string[]> {
        this.checkOpen();
        if (!sql.trim()) return [];
        const response = await this.service.SplitQuery({ SqlText: sql });
        checkExceptions(response);
        const statements = response.Statements?.Statement ?? [];
        if (!Array.isArray(statements) || !statements.every(statement => typeof statement === "string")) {
            throw new Error("WsSQL2 response has invalid Statements");
        }
        return statements;
    }

    close(): Promise<void> {
        if (this.closing) return this.closing;
        this.closed = true;
        this.closing = (async () => {
            const results = await Promise.allSettled([...this.statements].map(statement => statement.close()));
            const errors = results.filter((result): result is PromiseRejectedResult => result.status === "rejected").map(result => result.reason);
            if (errors.length) throw new SQLCleanupError("Failed to close SQL statements", errors[0], errors);
        })();
        void this.closing.then(
            () => { this.closing = undefined; },
            () => { this.closing = undefined; }
        );
        return this.closing;
    }

    [Symbol.asyncDispose](): Promise<void> {
        return this.close();
    }

    checkOpen(): void {
        if (this.closed) throw new Error("SQL connection is closed");
    }
}

export class SQLStatement {
    protected result?: SQLResultSet;
    protected closed = false;
    protected fetchSize = 0;
    protected executing?: Promise<SQLResultSet>;
    protected closing?: Promise<void>;

    constructor(protected readonly service: SQL2Service, protected readonly onClose: () => void) {
    }

    setFetchSize(size: number): void {
        this.checkOpen();
        if (!Number.isSafeInteger(size) || size < 0) throw new RangeError("Fetch size must be a non-negative integer");
        this.fetchSize = size;
    }

    cancel(): Promise<void> {
        this.checkOpen();
        if (this.executing) return this.executing.then(result => result.cancel());
        return this.result?.cancel() ?? Promise.resolve();
    }

    executeQuery(sql: string): Promise<SQLResultSet> {
        this.checkOpen();
        if (this.executing) throw new Error("SQL statement is already executing");
        if (!sql.trim()) throw new Error("SQL text is required");
        return this.execute(sql);
    }

    protected async execute(sql: string): Promise<SQLResultSet> {
        const operation = this.runQuery(sql);
        this.executing = operation;
        try {
            return await operation;
        } finally {
            this.executing = undefined;
        }
    }

    protected async runQuery(sql: string): Promise<SQLResultSet> {
        await this.result?.close();
        this.result = undefined;
        if (this.closed) throw new Error("SQL statement is closed");
        const response = await this.service.ExecuteQuery({
            SqlText: sql, IncludeResultSetMetadata: true
        });
        const columns = response.ResultSetMetadata?.Column;
        const result = response.CursorId ? new SQLResultSet(this.service, columns ?? [], response.CursorId, this.fetchSize) : undefined;
        this.result = result;
        try {
            checkExceptions(response);
            if (!response.CursorId) throw new Error("WsSQL2 response is missing CursorId");
            if (!columns) throw new Error("WsSQL2 response is missing result-set metadata");
            if (this.closed) throw new Error("SQL statement is closed");
            return result;
        } catch (error) {
            if (result) {
                try {
                    await result.close();
                } catch (closeError) {
                    throw new SQLCleanupError("Failed to parse result and close cursor", error, [closeError]);
                }
            }
            throw error;
        }
    }

    close(): Promise<void> {
        if (this.closing) return this.closing;
        this.closed = true;
        this.closing = (async () => {
            if (this.executing) {
                try {
                    await this.executing;
                } catch {
                    // The query caller receives its own error; close still releases its cursor.
                }
            }
            await this.result?.close();
            this.onClose();
        })();
        void this.closing.then(
            () => { this.closing = undefined; },
            () => { this.closing = undefined; }
        );
        return this.closing;
    }

    [Symbol.asyncDispose](): Promise<void> {
        return this.close();
    }

    protected checkOpen(): void {
        if (this.closed) throw new Error("SQL statement is closed");
    }
}

export class SQLResultSet {
    protected index = -1;
    protected row?: SQLValue[];
    protected wasNullValue = false;
    protected closed = false;
    protected advancing?: Promise<boolean>;
    protected closing?: Promise<void>;

    constructor(
        protected readonly service: SQL2Service,
        protected readonly columns: WsSQL2.Column[],
        protected cursor: string | undefined,
        protected readonly fetchSize: number
    ) {
    }
    protected rows: SQLValue[][] = [];
    protected complete = false;

    getMetaData(): readonly WsSQL2.Column[] {
        this.checkOpen();
        return this.columns;
    }

    findColumn(label: string): number {
        this.checkOpen();
        const index = this.columns.findIndex(column => column.ColumnLabel?.toLowerCase() === label.toLowerCase());
        if (index < 0) throw new Error(`Unknown SQL column: ${label}`);
        return index + 1;
    }

    next(): Promise<boolean> {
        this.checkOpen();
        if (this.advancing) throw new Error("SQL result set is already fetching");
        return this.advance();
    }

    private async advance(): Promise<boolean> {
        const operation = this.advancePage();
        this.advancing = operation;
        try {
            return await operation;
        } finally {
            this.advancing = undefined;
        }
    }

    private async advancePage(): Promise<boolean> {
        this.row = undefined;
        try {
            while (++this.index >= this.rows.length) {
                this.checkOpen();
                if (this.complete) return false;
                const response = await this.service.FetchResultSet({ CursorId: this.cursor, FetchSize: this.fetchSize });
                checkExceptions(response);
                if (typeof response.Complete !== "boolean") throw new Error("WsSQL2 fetch response is missing Complete");
                const rows = rowsFrom(response);
                this.checkOpen();
                this.complete = response.Complete;
                if (this.complete) this.cursor = undefined;
                this.rows = rows;
                this.index = -1;
            }
            this.checkOpen();
            const row = this.rows[this.index];
            if (row.length !== this.columns.length) throw new Error("WsSQL2 row width does not match result metadata");
            this.row = row;
            return true;
        } catch (error) {
            this.closed = true;
            try {
                await this.close();
            } catch (closeError) {
                throw new SQLCleanupError("Failed to read result and close cursor", error, [closeError]);
            }
            throw error;
        }
    }

    getObject(column: number | string): SQLValue {
        this.checkOpen();
        if (!this.row) throw new Error("SQL result set is not positioned on a row");
        const index = typeof column === "string" ? this.findColumn(column) : column;
        if (!Number.isInteger(index) || index < 1 || index > this.columns.length) {
            throw new RangeError(`SQL column index out of range: ${index}`);
        }
        const value = this.row[index - 1];
        this.wasNullValue = value === null;
        return value;
    }

    getString(column: number | string): string | null {
        const value = this.getObject(column);
        return value === null ? null : String(value);
    }

    getRow(): SQLRow {
        this.checkOpen();
        const row = this.row;
        if (!row) throw new Error("SQL result set is not positioned on a row");
        const result: SQLRow = Object.create(null);
        const labels = new Set<string>();
        this.columns.forEach((column, index) => {
            const label = column.ColumnLabel;
            if (!label) throw new Error("WsSQL2 column is missing a label");
            if (labels.has(label.toLowerCase())) throw new Error(`Duplicate SQL column label: ${label}`);
            labels.add(label.toLowerCase());
            result[label] = row[index];
        });
        return result;
    }

    wasNull(): boolean {
        this.checkOpen();
        return this.wasNullValue;
    }

    close(): Promise<void> {
        if (this.closing) return this.closing;
        this.closed = true;
        this.closing = (async () => {
            await this.closeCursor();
        })();
        void this.closing.then(
            () => { this.closing = undefined; },
            () => { this.closing = undefined; }
        );
        return this.closing;
    }

    [Symbol.asyncDispose](): Promise<void> {
        return this.close();
    }

    cancel(): Promise<void> {
        return this.close();
    }

    protected async closeCursor(): Promise<void> {
        if (this.cursor) {
            const cursor = this.cursor;
            const response = await this.service.CloseResultSet({ CursorId: cursor });
            checkExceptions(response);
            this.cursor = undefined;
        }
    }

    protected checkOpen(): void {
        if (this.closed) throw new Error("SQL result set is closed");
    }
}
