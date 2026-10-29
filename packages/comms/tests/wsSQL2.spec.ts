import { describe, expect, it, vi } from "vitest";

import { DFUArrayActions, DFUService, SQL2Service, SQLConnection, type WsSQL2, Workunit } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

const SQL_URL = "http://127.0.0.1:8510/";

async function supportsSQL2(): Promise<boolean> {
    const connection = new SQLConnection({ baseUrl: SQL_URL });
    try {
        return await connection.ping();
    } catch {
        return false;
    } finally {
        await connection.close();
    }
}

const hasSQL2 = await supportsSQL2();

describe.skipIf(!hasSQL2)("WsSQL2", () => {
    it("routes typed requests and unwraps responses", async () => {
        const hookSend = vi.fn(async (_options, action: string) => action.endsWith("ExecuteQuery.json")
            ? { ExecuteQueryResponse: { CursorId: "cursor-1", ResultSetMetadata: { Column: [] } } }
            : { FetchResultSetResponse: { RowsJSON: "[]", Complete: true } });
        const service = new SQL2Service({ baseUrl: "http://localhost:8510", hookSend });
        const query: WsSQL2.ExecuteQueryRequest = { SQLText: "SELECT 1", IncludeResultSetMetadata: true };

        expect(service.connection().service()).toBe("WsSQL2");
        expect(service.connection().version()).toBe("1.01");
        expect(await service.ExecuteQuery(query)).toEqual({ CursorId: "cursor-1", ResultSetMetadata: { Column: [] } });
        expect(hookSend).toHaveBeenCalledWith(
            expect.anything(), "WsSQL2/ExecuteQuery.json", { ...query, ver_: "1.01" }, "json", expect.anything(), undefined
        );

        expect(await service.FetchResultSet({ CursorId: "cursor-1", RowCount: 10 })).toEqual({ RowsJSON: "[]", Complete: true });
        expect(hookSend).toHaveBeenLastCalledWith(
            expect.anything(), "WsSQL2/FetchResultSet.json", { CursorId: "cursor-1", RowCount: 10, ver_: "1.01" }, "json", expect.anything(), undefined
        );
    });

    it("exposes the renamed plan and runtime graph response fields", async () => {
        const service = new SQL2Service({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => action.endsWith("ExplainQuery.json")
                ? { ExplainQueryResponse: { Plan: "plan", PlanJSON: "{}" } }
                : { FetchResultSetResponse: { RowsJSON: "[]", Complete: true, RuntimeGraph: "graph", RuntimeGraphJSON: "{}" } }
        });
        expect(await service.ExplainQuery({ SQLText: "SELECT 1" })).toMatchObject({
            Plan: "plan", PlanJSON: "{}"
        });
        expect(await service.FetchResultSet({ CursorId: "cursor-1" })).toMatchObject({
            Complete: true, RuntimeGraph: "graph", RuntimeGraphJSON: "{}"
        });
    });

    it("routes SplitQuery and preserves its statement response", async () => {
        const hookSend = vi.fn(async () => ({
            SplitQueryResponse: { Statements: { Statement: ["SELECT 1", "SELECT 'a;b'"] } }
        }));
        const service = new SQL2Service({ baseUrl: "http://localhost:8510", hookSend });
        const request: WsSQL2.SplitQueryRequest = { SQLText: "SELECT 1; SELECT 'a;b';" };
        expect(await service.SplitQuery(request)).toEqual({
            Statements: { Statement: ["SELECT 1", "SELECT 'a;b'"] }
        });
        expect(hookSend).toHaveBeenCalledWith(
            expect.anything(), "WsSQL2/SplitQuery.json", { ...request, ver_: "1.01" }, "json", expect.anything(), undefined
        );
    });

    describe("integration", () => {
        it("splits a multi-statement script without splitting quoted semicolons", async () => {
            const connection = new SQLConnection({ baseUrl: SQL_URL });
            try {
                expect(await connection.splitQuery("SELECT 1; SELECT 'a;b';")).toEqual([
                    "SELECT 1", "SELECT 'a;b'"
                ]);
                expect(await connection.splitQuery("-- comment")).toEqual([]);
            } finally {
                await connection.close();
            }
        });

        it("pages through a 1000-row logical file and removes its workunit and file", async () => {
            const fileName = `hpcc-js::test::sql2::${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
            const dfu = new DFUService({ baseUrl: ESP_URL });
            let workunit: Workunit | undefined;
            let connection: SQLConnection | undefined;
            let fetches = 0;
            let closedCursors = 0;
            let failure: unknown;
            try {
                workunit = await Workunit.create({ baseUrl: ESP_URL });
                await workunit.update({
                    QueryText: `rowLayout := RECORD
    UNSIGNED4 id;
    STRING label;
END;
testRows := DATASET(1000, TRANSFORM(rowLayout,
    SELF.id := COUNTER;
    SELF.label := (STRING) COUNTER;
));
OUTPUT(testRows,, '~${fileName}', OVERWRITE);`
                });
                await workunit.submit("hthor");
                await workunit.watchUntilComplete();
                if (workunit.isFailed()) {
                    await workunit.fetchInfo({ IncludeExceptions: true });
                    throw new Error(`Workunit ${workunit.Wuid} failed: ${JSON.stringify(workunit.Exceptions)}`);
                }
                const createdFiles = await dfu.DFUQuery({ LogicalName: fileName });
                expect(createdFiles.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)).toBe(true);

                connection = new SQLConnection({
                    baseUrl: SQL_URL,
                    hookSend: (options, action, request, responseType, defaultSend, header) => {
                        if (action === "WsSQL2/FetchResultSet.json") ++fetches;
                        if (action === "WsSQL2/CloseResultSet.json") ++closedCursors;
                        return defaultSend(options, action, request, responseType, header);
                    }
                });
                const statement = connection.createStatement();
                statement.setFetchSize(73);
                const result = await statement.executeQuery(`SELECT id, label FROM hpcc_scan('${fileName}') ORDER BY id`);
                expect(fetches).toBe(0);
                let count = 0;
                while (await result.next()) {
                    ++count;
                    expect(result.getObject("id")).toBe(count);
                    expect(result.getString("label")).toBe(String(count));
                }
                expect(count).toBe(1000);
                expect(fetches).toBeGreaterThan(1);
                await result.close();
                const earlyResult = await statement.executeQuery(`SELECT id FROM hpcc_scan('${fileName}') ORDER BY id`);
                expect(await earlyResult.next()).toBe(true);
                await earlyResult.close();
                expect(closedCursors).toBe(1);
                const pendingResult = await statement.executeQuery(`SELECT id FROM hpcc_scan('${fileName}') ORDER BY id`);
                const fetchesBeforeCancel = fetches;
                await pendingResult.cancel();
                expect(fetches).toBe(fetchesBeforeCancel);
                expect(closedCursors).toBe(2);
            } catch (error) {
                failure = error;
            } finally {
                const cleanup = await Promise.allSettled([
                    connection?.close(),
                    workunit ? (async () => {
                        const files = await dfu.DFUQuery({ LogicalName: fileName });
                        if (files.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)) {
                            const response = await dfu.DFUArrayAction({
                                Type: DFUArrayActions.Delete,
                                LogicalFiles: { Item: [fileName] }
                            });
                            const failures = response.ActionResults?.DFUActionInfo?.filter(action => action.Failed) ?? [];
                            if (failures.length) throw new Error(`Failed to remove logical file ${fileName}: ${JSON.stringify(failures)}`);
                            const remaining = await dfu.DFUQuery({ LogicalName: fileName });
                            if (remaining.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)) {
                                throw new Error(`Logical file ${fileName} still exists after deletion`);
                            }
                        }
                    })() : undefined
                ].filter((operation): operation is Promise<void> => operation !== undefined));
                const errors = cleanup.filter((result): result is PromiseRejectedResult => result.status === "rejected");
                if (workunit) {
                    try {
                        await workunit.delete();
                        expect(workunit.isDeleted()).toBe(true);
                    } catch (error) {
                        errors.push({ status: "rejected", reason: error });
                    }
                }
                if (errors.length) {
                    failure = new AggregateError(
                        [...(failure === undefined ? [] : [failure]), ...errors.map(error => error.reason)],
                        "SQL2 integration test or cleanup failed"
                    );
                }
            }
            if (failure !== undefined) throw failure;
        }, 120000);
    });
});
