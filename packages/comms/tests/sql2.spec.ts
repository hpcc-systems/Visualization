import { describe, expect, it, vi } from "vitest";

import { SQLCleanupError, SQLConnection } from "@hpcc-js/comms";

const metadata = { Column: [{ ColumnLabel: "id", ColumnTypeName: "INTEGER" }] };
const execute = { ExecuteQueryResponse: { CursorId: "cursor-1", ResultSetMetadata: metadata } };

describe("SQLConnection", () => {
    it("collects labeled rows across pages and keeps native values", async () => {
        const columns = {
            Column: [
                { ColumnLabel: "ID" }, { ColumnLabel: "active" }, { ColumnLabel: "data" }, { ColumnLabel: "__proto__" }
            ]
        };
        const actions: string[] = [];
        let fetches = 0;
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action, request: { FetchSize?: number }) => {
                actions.push(action);
                if (action.endsWith("ExecuteQuery.json")) return {
                    ExecuteQueryResponse: { CursorId: "cursor-1", ResultSetMetadata: columns }
                };
                if (action.endsWith("FetchResultSet.json")) {
                    expect(request.FetchSize).toBe(1);
                    return {
                        FetchResultSetResponse: ++fetches === 1
                            ? { Rows: '[[1,true,{"nested":2},"first"]]', Complete: false }
                            : { Rows: '[[2,null,[3],"second"]]', Complete: true }
                    };
                }
                throw new Error("Completed cursors must not be closed again");
            }
        });
        const rows = await conn.queryRows("SELECT * FROM table", 1);
        expect(rows[0]).toMatchObject({ ID: 1, active: true, data: { nested: 2 } });
        expect(rows[1]).toMatchObject({ ID: 2, active: null, data: [3] });
        expect(Object.getPrototypeOf(rows[0])).toBe(null);
        expect(rows[0]["__proto__"]).toBe("first");
        expect(rows[1]["__proto__"]).toBe("second");
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/FetchResultSet.json", "WsSQL2/FetchResultSet.json"]);
        await conn.close();
    });

    it("returns no rows for an empty result and rejects unlabeled or duplicate columns", async () => {
        const actions: string[] = [];
        let sql = "";
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action, request: { SqlText?: string }) => {
                actions.push(action);
                if (action.endsWith("ExecuteQuery.json")) {
                    sql = request.SqlText!;
                    return {
                        ExecuteQueryResponse: {
                            CursorId: "cursor-1", ResultSetMetadata: {
                                Column: sql === "missing" ? [{}]
                                    : sql === "duplicate" ? [{ ColumnLabel: "Id" }, { ColumnLabel: "id" }]
                                        : [{ ColumnLabel: "id" }]
                            }
                        }
                    };
                }
                if (action.endsWith("FetchResultSet.json")) return {
                    FetchResultSetResponse: {
                        Rows: sql === "missing" ? "[[1]]" : sql === "duplicate" ? "[[1,2]]" : "[]",
                        Complete: sql === "empty"
                    }
                };
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        expect(await conn.queryRows("empty")).toEqual([]);
        await expect(conn.queryRows("missing")).rejects.toThrow("missing a label");
        await expect(conn.queryRows("duplicate")).rejects.toThrow("Duplicate SQL column label");
        expect(actions.filter(action => action.endsWith("CloseResultSet.json"))).toHaveLength(2);
        await conn.close();
    });

    it("closes a cursor after a failed fetch and keeps cleanup errors retryable", async () => {
        let closes = 0;
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                if (action.endsWith("ExecuteQuery.json")) return execute;
                if (action.endsWith("FetchResultSet.json")) throw new Error("Fetch failed");
                if (++closes <= 2) throw new Error(`Close failed ${closes}`);
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const failure = await conn.queryRows("SELECT 1").catch(error => error);
        expect(failure).toBeInstanceOf(SQLCleanupError);
        expect(failure.cause).toBeInstanceOf(SQLCleanupError);
        expect(failure.cause.cause).toHaveProperty("message", "Fetch failed");
        expect(failure.cleanupErrors[0]).toHaveProperty("message", "Close failed 2");
        await conn.close();
        expect(closes).toBe(3);
    });

    it("validates query input and closes its temporary statement after execution errors", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                throw new Error("Execution failed");
            }
        });
        await expect(conn.queryRows("SELECT 1", -1)).rejects.toThrow(RangeError);
        await expect(conn.queryRows(" ")).rejects.toThrow("SQL text is required");
        await expect(conn.queryRows("SELECT 1")).rejects.toThrow("Execution failed");
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json"]);
        await conn.close();
        await expect(conn.queryRows("SELECT 1")).rejects.toThrow("closed");
    });

    it("wraps explain, file metadata and ping while enforcing connection state", async () => {
        const hookSend = vi.fn(async (_options, action: string) => {
            if (action.endsWith("ExplainQuery.json")) return { ExplainQueryResponse: { Plan: "plan", PlanJson: "{}" } };
            if (action.endsWith("LogicalFileMeta.json")) return {
                LogicalFileMetaResponse: {
                    LogicalFileMeta: { LogicalName: "example::file", RecordCount: 2 }
                }
            };
            return { WsSQL2PingResponse: {} };
        });
        const conn = new SQLConnection({ baseUrl: "http://localhost:8510", hookSend });
        expect(await conn.explainQuery("SELECT 1")).toMatchObject({ Plan: "plan", PlanJson: "{}" });
        expect(await conn.logicalFileMeta("example::file")).toEqual({ LogicalName: "example::file", RecordCount: 2 });
        expect(await conn.ping()).toBe(true);
        expect(hookSend.mock.calls.map(call => call[1])).toEqual([
            "WsSQL2/ExplainQuery.json", "WsSQL2/LogicalFileMeta.json", "WsSQL2/Ping.json"
        ]);
        expect(hookSend.mock.calls[0][2]).toMatchObject({ SqlText: "SELECT 1" });
        expect(hookSend.mock.calls[1][2]).toMatchObject({ LogicalName: "example::file" });
        await expect(conn.explainQuery(" ")).rejects.toThrow("SQL text is required");
        await expect(conn.logicalFileMeta(" ")).rejects.toThrow("Logical file name is required");
        await conn.close();
        await expect(conn.explainQuery("SELECT 1")).rejects.toThrow("closed");
        await expect(conn.logicalFileMeta("example::file")).rejects.toThrow("closed");
        await expect(conn.ping()).rejects.toThrow("closed");
    });

    it("propagates explain and metadata service exceptions", async () => {
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => action.endsWith("ExplainQuery.json")
                ? { ExplainQueryResponse: { Exceptions: { Exception: [{ Message: "Bad SQL" }] } } }
                : { LogicalFileMetaResponse: { Exceptions: { Exception: [{ Message: "Not found" }] } } }
        });
        await expect(conn.explainQuery("bad")).rejects.toThrow("Bad SQL");
        await expect(conn.logicalFileMeta("missing")).rejects.toThrow("Not found");
        await conn.close();
    });

    it("splits SQL using the server parser without executing it", async () => {
        const hookSend = vi.fn(async () => ({
            SplitQueryResponse: { Statements: { Statement: ["SELECT 1", "SELECT 'a;b'"] } }
        }));
        const conn = new SQLConnection({ baseUrl: "http://localhost:8510", hookSend });
        expect(await conn.splitQuery("SELECT 1; SELECT 'a;b';")).toEqual(["SELECT 1", "SELECT 'a;b'"]);
        expect(await conn.splitQuery("  ")).toEqual([]);
        expect(hookSend).toHaveBeenCalledTimes(1);
        expect(hookSend.mock.calls[0][1]).toBe("WsSQL2/SplitQuery.json");
        expect(hookSend.mock.calls[0][2]).toMatchObject({ SqlText: "SELECT 1; SELECT 'a;b';" });
        await conn.close();
        await expect(conn.splitQuery("SELECT 1")).rejects.toThrow("closed");
    });

    it("reports SplitQuery service failures and malformed responses", async () => {
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async () => ({
                SplitQueryResponse: { Exceptions: { Exception: [{ Message: "Invalid SQL" }] } }
            })
        });
        await expect(conn.splitQuery("INVALID")).rejects.toThrow("Invalid SQL");
        await conn.close();

        const malformed = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async () => ({ SplitQueryResponse: { Statements: { Statement: "SELECT 1" } } })
        });
        await expect(malformed.splitQuery("SELECT 1")).rejects.toThrow("invalid Statements");
        await malformed.close();
    });

    it("returns no statements for server-recognized comment-only SQL", async () => {
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async () => ({ SplitQueryResponse: {} })
        });
        expect(await conn.splitQuery("-- comment")).toEqual([]);
        await conn.close();
    });

    it("lazily fetches pages using Complete and closes an unfinished cursor", async () => {
        const hookSend = vi.fn(async (_options, action: string) => {
            if (action.endsWith("ExecuteQuery.json")) return execute;
            if (action.endsWith("FetchResultSet.json")) return {
                FetchResultSetResponse: { Rows: "[[1],[2]]", Complete: false }
            };
            return { CloseResultSetResponse: { Closed: true } };
        });
        const conn = new SQLConnection({ baseUrl: "http://localhost:8510", hookSend });
        const stmt = conn.createStatement();
        stmt.setFetchSize(2);
        const rows = await stmt.executeQuery("SELECT id FROM some_table");
        expect(rows.getMetaData()).toEqual(metadata.Column);
        expect(rows.findColumn("ID")).toBe(1);
        expect(hookSend.mock.calls.map(call => call[1])).toEqual(["WsSQL2/ExecuteQuery.json"]);
        expect(hookSend.mock.calls[0][2]).toEqual({
            SqlText: "SELECT id FROM some_table", IncludeResultSetMetadata: true, ver_: "0.00"
        });
        expect(await rows.next()).toBe(true);
        expect(rows.getObject("id")).toBe(1);
        expect(await rows.next()).toBe(true);
        expect(rows.getString(1)).toBe("2");
        expect(hookSend.mock.calls[1][2]).toMatchObject({ CursorId: "cursor-1", FetchSize: 2 });
        await conn.close();
        expect(hookSend.mock.calls[2][1]).toBe("WsSQL2/CloseResultSet.json");
        expect(hookSend.mock.calls[2][2]).toMatchObject({ CursorId: "cursor-1" });
        expect(() => rows.getObject(1)).toThrow("closed");
    });

    it("async-disposes result sets, statements, and connections through their cursor owners", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                return action.endsWith("ExecuteQuery.json") ? execute : { CloseResultSetResponse: { Closed: true } };
            }
        });
        const stmt = conn.createStatement();
        const result = await stmt.executeQuery("SELECT 1");
        await result[Symbol.asyncDispose]();
        expect(() => result.next()).toThrow("closed");
        expect(actions.filter(action => action.endsWith("CloseResultSet.json"))).toHaveLength(1);

        const nextResult = await stmt.executeQuery("SELECT 2");
        await stmt[Symbol.asyncDispose]();
        expect(() => nextResult.next()).toThrow("closed");
        expect(actions.filter(action => action.endsWith("CloseResultSet.json"))).toHaveLength(2);

        const lastResult = await conn.createStatement().executeQuery("SELECT 3");
        await conn[Symbol.asyncDispose]();
        expect(() => lastResult.next()).toThrow("closed");
        await conn[Symbol.asyncDispose]();
        expect(actions.filter(action => action.endsWith("CloseResultSet.json"))).toHaveLength(3);
    });

    it("retries a failed cursor disposal without losing ownership", async () => {
        let closes = 0;
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                if (action.endsWith("ExecuteQuery.json")) return execute;
                if (++closes === 1) throw new Error("Close failed");
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const result = await conn.createStatement().executeQuery("SELECT 1");
        await expect(result[Symbol.asyncDispose]()).rejects.toThrow("Close failed");
        await conn[Symbol.asyncDispose]();
        expect(closes).toBe(2);
    });

    it("closes a prepared cursor on await using scope exit", async () => {
        const actions: string[] = [];
        {
            await using conn = new SQLConnection({
                baseUrl: "http://localhost:8510",
                hookSend: async (_options, action) => {
                    actions.push(action);
                    return action.endsWith("ExecuteQuery.json") ? execute : { CloseResultSetResponse: { Closed: true } };
                }
            });
            await conn.createStatement().executeQuery("SELECT 1");
        }
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json"]);
    });

    it("consumes final-page rows without another fetch or close request", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                if (action.endsWith("ExecuteQuery.json")) return execute;
                return { FetchResultSetResponse: { Rows: "[[1],[2]]", Complete: true } };
            }
        });
        const rows = await conn.createStatement().executeQuery("SELECT 1");
        expect(await rows.next()).toBe(true);
        expect(rows.getObject(1)).toBe(1);
        expect(await rows.next()).toBe(true);
        expect(rows.getObject(1)).toBe(2);
        expect(await rows.next()).toBe(false);
        await conn.close();
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/FetchResultSet.json"]);
    });

    it("fetches through empty intermediate pages", async () => {
        let fetches = 0;
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => action.endsWith("ExecuteQuery.json")
                ? execute
                : {
                    FetchResultSetResponse: ++fetches === 1
                        ? { Rows: "[]", Complete: false }
                        : { Rows: "[[42]]", Complete: true }
                }
        });
        const rows = await conn.createStatement().executeQuery("SELECT 42");
        expect(await rows.next()).toBe(true);
        expect(rows.getObject(1)).toBe(42);
        expect(await rows.next()).toBe(false);
        expect(fetches).toBe(2);
        await conn.close();
    });

    it("closes the cursor if a fetch fails or returns malformed data", async () => {
        for (const invalid of [new Error("Fetch failed"), { FetchResultSetResponse: { Rows: "bad json", Complete: false } }]) {
            const actions: string[] = [];
            const conn = new SQLConnection({
                baseUrl: "http://localhost:8510",
                hookSend: async (_options, action) => {
                    actions.push(action);
                    if (action.endsWith("ExecuteQuery.json")) return execute;
                    if (action.endsWith("FetchResultSet.json")) {
                        if (invalid instanceof Error) throw invalid;
                        return invalid;
                    }
                    return { CloseResultSetResponse: { Closed: true } };
                }
            });
            const rows = await conn.createStatement().executeQuery("SELECT 1");
            await expect(rows.next()).rejects.toThrow();
            expect(actions).toEqual([
                "WsSQL2/ExecuteQuery.json", "WsSQL2/FetchResultSet.json", "WsSQL2/CloseResultSet.json"
            ]);
            await conn.close();
        }
    });

    it("closes the cursor when the execute metadata is invalid", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                return action.endsWith("ExecuteQuery.json")
                    ? { ExecuteQueryResponse: { CursorId: "cursor-1" } }
                    : { CloseResultSetResponse: { Closed: true } };
            }
        });
        await expect(conn.createStatement().executeQuery("SELECT 1")).rejects.toThrow("metadata");
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json"]);
        await conn.close();
    });

    it("closes a previous result before executing again", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                return action.endsWith("ExecuteQuery.json") ? execute : { CloseResultSetResponse: { Closed: true } };
            }
        });
        const stmt = conn.createStatement();
        const first = await stmt.executeQuery("SELECT 1");
        await stmt.executeQuery("SELECT 2");
        expect(() => first.getMetaData()).toThrow("closed");
        expect(actions).toEqual([
            "WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json", "WsSQL2/ExecuteQuery.json"
        ]);
        await conn.close();
        expect(actions.at(-1)).toBe("WsSQL2/CloseResultSet.json");
    });

    it("retries a failed result close without losing the cursor", async () => {
        const cursorIds: string[] = [];
        let releaseClose: (response: object) => void;
        const pendingClose = new Promise<object>(resolve => { releaseClose = resolve; });
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action, request: { CursorId?: string }) => {
                if (action.endsWith("ExecuteQuery.json")) return execute;
                cursorIds.push(request.CursorId!);
                return cursorIds.length === 1 ? pendingClose : { CloseResultSetResponse: { Closed: true } };
            }
        });
        const rows = await conn.createStatement().executeQuery("SELECT 1");
        const closing = rows.close();
        expect(rows.close()).toBe(closing);
        releaseClose!({ CloseResultSetResponse: { Exceptions: { Exception: [{ Message: "Temporary failure" }] } } });
        await expect(closing).rejects.toThrow("Temporary failure");
        await rows.close();
        expect(cursorIds).toEqual(["cursor-1", "cursor-1"]);
        await conn.close();
        expect(cursorIds).toHaveLength(2);
    });

    it("retries failed statement and connection cleanup without losing ownership", async () => {
        const closeAttempts = new Map<string, number>();
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action, request: { CursorId?: string; SqlText?: string }) => {
                if (action.endsWith("ExecuteQuery.json")) return {
                    ExecuteQueryResponse: { CursorId: request.SqlText, ResultSetMetadata: metadata }
                };
                const id = request.CursorId!;
                closeAttempts.set(id, (closeAttempts.get(id) ?? 0) + 1);
                if (id === "SELECT 1" && closeAttempts.get(id) === 1) throw new Error("Network error");
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const first = conn.createStatement();
        const second = conn.createStatement();
        await first.executeQuery("SELECT 1");
        await second.executeQuery("SELECT 2");
        await expect(conn.close()).rejects.toThrow("Failed to close SQL statements");
        await conn.close();
        expect([...closeAttempts]).toEqual([["SELECT 1", 2], ["SELECT 2", 1]]);
        await conn.close();
        expect(closeAttempts.get("SELECT 1")).toBe(2);
    });

    it("retains a cursor after cleanup fails for invalid execute metadata", async () => {
        let closeAttempts = 0;
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                if (action.endsWith("ExecuteQuery.json")) return { ExecuteQueryResponse: { CursorId: "cursor-1" } };
                ++closeAttempts;
                if (closeAttempts === 1) throw new Error("Close failed");
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const stmt = conn.createStatement();
        await expect(stmt.executeQuery("SELECT 1")).rejects.toThrow("Failed to parse result and close cursor");
        await stmt.close();
        expect(closeAttempts).toBe(2);
        await conn.close();
    });

    it("closes immediately during a pending fetch to cancel server execution", async () => {
        let releaseFetch: (response: object) => void;
        const fetch = new Promise<object>(resolve => { releaseFetch = resolve; });
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                if (action.endsWith("ExecuteQuery.json")) return execute;
                if (action.endsWith("FetchResultSet.json")) return fetch;
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const rows = await conn.createStatement().executeQuery("SELECT 1");
        const pending = rows.next();
        await conn.close();
        expect(actions).toEqual([
            "WsSQL2/ExecuteQuery.json", "WsSQL2/FetchResultSet.json", "WsSQL2/CloseResultSet.json"
        ]);
        releaseFetch!({ FetchResultSetResponse: { Rows: "[[1]]", Complete: false } });
        await expect(pending).rejects.toThrow("closed");
        expect(actions).toHaveLength(3);
    });

    it("cancels a prepared cursor before the first fetch", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                return action.endsWith("ExecuteQuery.json") ? execute : { CloseResultSetResponse: { Closed: true } };
            }
        });
        const rows = await conn.createStatement().executeQuery("SELECT 1");
        await rows.cancel();
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json"]);
        expect(() => rows.next()).toThrow("closed");
        await conn.close();
    });

    it("cancels via the statement without closing the statement", async () => {
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                return action.endsWith("ExecuteQuery.json") ? execute : { CloseResultSetResponse: { Closed: true } };
            }
        });
        const stmt = conn.createStatement();
        const rows = await stmt.executeQuery("SELECT 1");
        await stmt.cancel();
        expect(() => rows.next()).toThrow("closed");
        await stmt.executeQuery("SELECT 2");
        await conn.close();
        expect(actions).toEqual([
            "WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json",
            "WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json"
        ]);
    });

    it("waits for an in-flight execute before connection close", async () => {
        let release: (response: object) => void;
        const pendingResponse = new Promise<object>(resolve => { release = resolve; });
        let started: () => void;
        const executing = new Promise<void>(resolve => { started = resolve; });
        const actions: string[] = [];
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => {
                actions.push(action);
                if (action.endsWith("ExecuteQuery.json")) {
                    started();
                    return pendingResponse;
                }
                return { CloseResultSetResponse: { Closed: true } };
            }
        });
        const query = conn.createStatement().executeQuery("SELECT 1");
        await executing;
        const closing = conn.close();
        release!(execute);
        await expect(query).rejects.toThrow("closed");
        await closing;
        expect(actions).toEqual(["WsSQL2/ExecuteQuery.json", "WsSQL2/CloseResultSet.json"]);
    });

    it("rejects invalid fetch sizes and column lookups", async () => {
        const conn = new SQLConnection({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => action.endsWith("ExecuteQuery.json")
                ? execute
                : { FetchResultSetResponse: { Rows: "[[1]]", Complete: true } }
        });
        const stmt = conn.createStatement();
        expect(() => stmt.setFetchSize(-1)).toThrow(RangeError);
        const rows = await stmt.executeQuery("SELECT 1");
        expect(() => rows.getObject(1)).toThrow("not positioned");
        expect(await rows.next()).toBe(true);
        expect(() => rows.getObject(2)).toThrow(RangeError);
        expect(() => rows.getObject("missing")).toThrow("Unknown SQL column");
        await conn.close();
    });
});
