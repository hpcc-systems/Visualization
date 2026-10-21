import { describe, expect, it, vi } from "vitest";

import { SQL2Service, type WsSQL2 } from "@hpcc-js/comms";

describe("WsSQL2", () => {
    it("routes typed requests and unwraps responses", async () => {
        const hookSend = vi.fn(async (_options, action: string) => action.endsWith("ExecuteQuery.json")
            ? { ExecuteQueryResponse: { CursorId: "cursor-1", ResultSetMetadata: { Column: [] } } }
            : { FetchResultSetResponse: { Rows: "[]", Complete: true } });
        const service = new SQL2Service({ baseUrl: "http://localhost:8510", hookSend });
        const query: WsSQL2.ExecuteQueryRequest = { SqlText: "SELECT 1", IncludeResultSetMetadata: true };

        expect(service.connection().service()).toBe("WsSQL2");
        expect(service.connection().version()).toBe("0.00");
        expect(await service.ExecuteQuery(query)).toEqual({ CursorId: "cursor-1", ResultSetMetadata: { Column: [] } });
        expect(hookSend).toHaveBeenCalledWith(
            expect.anything(), "WsSQL2/ExecuteQuery.json", { ...query, ver_: "0.00" }, "json", expect.anything(), undefined
        );

        expect(await service.FetchResultSet({ CursorId: "cursor-1", FetchSize: 10 })).toEqual({ Rows: "[]", Complete: true });
        expect(hookSend).toHaveBeenLastCalledWith(
            expect.anything(), "WsSQL2/FetchResultSet.json", { CursorId: "cursor-1", FetchSize: 10, ver_: "0.00" }, "json", expect.anything(), undefined
        );
    });

    it("exposes the renamed plan and runtime graph response fields", async () => {
        const service = new SQL2Service({
            baseUrl: "http://localhost:8510",
            hookSend: async (_options, action) => action.endsWith("ExplainQuery.json")
                ? { ExplainQueryResponse: { Plan: "plan", PlanJson: "{}" } }
                : { FetchResultSetResponse: { Rows: "[]", Complete: true, RuntimeGraph: "graph", RuntimeGraphJson: "{}" } }
        });
        expect(await service.ExplainQuery({ SqlText: "SELECT 1" })).toMatchObject({
            Plan: "plan", PlanJson: "{}"
        });
        expect(await service.FetchResultSet({ CursorId: "cursor-1" })).toMatchObject({
            Complete: true, RuntimeGraph: "graph", RuntimeGraphJson: "{}"
        });
    });

    it("routes SplitQuery and preserves its statement response", async () => {
        const hookSend = vi.fn(async () => ({
            SplitQueryResponse: { Statements: { Statement: ["SELECT 1", "SELECT 'a;b'"] } }
        }));
        const service = new SQL2Service({ baseUrl: "http://localhost:8510", hookSend });
        const request: WsSQL2.SplitQueryRequest = { SqlText: "SELECT 1; SELECT 'a;b';" };
        expect(await service.SplitQuery(request)).toEqual({
            Statements: { Statement: ["SELECT 1", "SELECT 'a;b'"] }
        });
        expect(hookSend).toHaveBeenCalledWith(
            expect.anything(), "WsSQL2/SplitQuery.json", { ...request, ver_: "0.00" }, "json", expect.anything(), undefined
        );
    });
});
