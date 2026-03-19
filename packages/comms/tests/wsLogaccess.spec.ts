import { describe, it, expect, vi } from "vitest";
import { LogaccessService, WsLogaccess } from "../src/services/wsLogaccess.ts";
import { elkInfo, elkLogs } from "./fixtures/logaccess.ts";

function makeService() {
    const svc = new LogaccessService({ baseUrl: "http://localhost" });
    vi.spyOn(svc, "GetLogAccessInfo").mockResolvedValue(elkInfo as WsLogaccess.GetLogAccessInfoResponse);
    vi.spyOn(svc, "GetLogs").mockResolvedValue(elkLogs as any);
    return svc;
}

describe("LogaccessService.GetLogsEx (ELK stack)", () => {
    it("returns all lines and correct total from elasticstack fixture", async () => {
        const result = await makeService().GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.total).toBe(88);
        expect(result.lines).toHaveLength(10);
    });

    it("maps message field via column name", async () => {
        const result = await makeService().GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines[0].message).toBe("Compile request processing for workunit W20260318-215244");
    });

    it("maps workunits field via hpcc.log.jobid", async () => {
        const result = await makeService().GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines[0].workunits).toBe("W20260318-215244");
    });

    it("maps components field via kubernetes.container.name", async () => {
        const result = await makeService().GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines[0].components).toBe("myeclccserver");
    });

    it("maps audience and class fields", async () => {
        const result = await makeService().GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines[0].audience).toBe("PRG");
        expect(result.lines[0].class).toBe("INF");
    });

    it("returns empty lines for an unknown RemoteLogManagerType", async () => {
        const svc = new LogaccessService({ baseUrl: "http://localhost" });
        vi.spyOn(svc, "GetLogAccessInfo").mockResolvedValue({ ...elkInfo, RemoteLogManagerType: "unknownengine" } as WsLogaccess.GetLogAccessInfoResponse);
        vi.spyOn(svc, "GetLogs").mockResolvedValue(elkLogs as any);
        const result = await svc.GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines).toHaveLength(0);
    });

    it("returns empty lines and zero total when LogLines JSON is malformed", async () => {
        const svc = new LogaccessService({ baseUrl: "http://localhost" });
        vi.spyOn(svc, "GetLogAccessInfo").mockResolvedValue(elkInfo as WsLogaccess.GetLogAccessInfoResponse);
        vi.spyOn(svc, "GetLogs").mockResolvedValue({ LogLines: "NOT VALID JSON", TotalLogLinesAvailable: 50 } as any);
        const result = await svc.GetLogsEx({ LogLineStartFrom: 0, LogLineLimit: 100 });
        expect(result.lines).toHaveLength(0);
        expect(result.total).toBe(0);
    });
});

describe("LogaccessService.GetLogsEx — filter construction", () => {
    it("single class value produces a ByLogType leftFilter", async () => {
        const svc = makeService();
        await svc.GetLogsEx({ class: ["INF"], LogLineStartFrom: 0, LogLineLimit: 100 });
        const filter = vi.mocked(svc.GetLogs).mock.calls[0][0].Filter!;
        expect(filter.leftFilter).toMatchObject({
            LogCategory: WsLogaccess.LogAccessType.ByLogType,
            SearchField: "class",
            SearchByValue: "INF"
        });
        expect(filter.Operator).toBeUndefined();
        expect(filter.rightFilter).toBeUndefined();
    });

    it("two class values produce an OR BinaryLogFilter", async () => {
        const svc = makeService();
        await svc.GetLogsEx({ class: ["INF", "PRO"], LogLineStartFrom: 0, LogLineLimit: 100 });
        const filter = vi.mocked(svc.GetLogs).mock.calls[0][0].Filter!;
        const binary = filter.leftBinaryFilter?.BinaryLogFilter?.[0]!;
        expect(binary).toBeDefined();
        expect(binary.leftFilter).toMatchObject({
            LogCategory: WsLogaccess.LogAccessType.ByLogType,
            SearchField: "class",
            SearchByValue: "INF"
        });
        expect(binary.Operator).toBe(WsLogaccess.LogAccessFilterOperator.OR);
        expect(binary.rightFilter).toMatchObject({
            LogCategory: WsLogaccess.LogAccessType.ByLogType,
            SearchField: "class",
            SearchByValue: "PRO"
        });
    });

    it("class and audience values produce an AND chain of two ByLogType filters", async () => {
        const svc = makeService();
        await svc.GetLogsEx({ class: ["INF"], audience: "USR", LogLineStartFrom: 0, LogLineLimit: 100 });
        const filter = vi.mocked(svc.GetLogs).mock.calls[0][0].Filter!;
        expect(filter.Operator).toBe(WsLogaccess.LogAccessFilterOperator.AND);
        // one field on the left, the other on the right
        const left = filter.leftFilter ?? filter.leftBinaryFilter?.BinaryLogFilter?.[0]?.leftFilter;
        const right = filter.rightFilter ?? filter.rightBinaryFilter?.BinaryLogFilter?.[0]?.leftFilter;
        const searchFields = new Set([left?.SearchField, right?.SearchField]);
        expect(searchFields).toContain("class");
        expect(searchFields).toContain("audience");
    });
});

