// Test ESM imports for @hpcc-js/comms package
import { describe, it, expect } from "vitest";

describe("@hpcc-js/comms ESM compatibility", () => {
    it("should successfully import the package", async () => {
        const comms = await import("@hpcc-js/comms");
        expect(comms).toBeDefined();
        expect(Object.keys(comms).length).toBeGreaterThan(0);
    });

    it("should export ESPConnection class", async () => {
        const { ESPConnection } = await import("@hpcc-js/comms");
        expect(ESPConnection).toBeDefined();

        const connection = new ESPConnection({ baseUrl: "http://localhost:8010" }, "WsWorkunits", "1.76");
        expect(connection).toBeDefined();
        expect(typeof connection).toBe("object");
    });

    it("should export WorkunitsService class", async () => {
        const { WorkunitsService } = await import("@hpcc-js/comms");
        expect(WorkunitsService).toBeDefined();

        const service = new WorkunitsService({ baseUrl: "http://localhost:8010" });
        expect(service).toBeDefined();
        expect(typeof service).toBe("object");
    });

    it("should export Workunit class", async () => {
        const { Workunit } = await import("@hpcc-js/comms");
        expect(Workunit).toBeDefined();

        const wu = Workunit.attach({ baseUrl: "http://localhost:8010" }, "W12345");
        expect(wu).toBeDefined();
        expect(typeof wu).toBe("object");
    });

    it("should export utility functions", async () => {
        const { createConnection, isArray, parseXSD, serializeRequest, deserializeResponse } = await import("@hpcc-js/comms");

        expect(createConnection).toBeDefined();
        expect(isArray).toBeDefined();
        expect(parseXSD).toBeDefined();
        expect(serializeRequest).toBeDefined();
        expect(deserializeResponse).toBeDefined();
    });

    it("should export exception classes", async () => {
        const { ESPExceptions } = await import("@hpcc-js/comms");
        expect(ESPExceptions).toBeDefined();

        const exception = new ESPExceptions("test", {}, { Source: "test", Exception: [] });
        expect(exception).toBeDefined();
        expect(exception).toBeInstanceOf(Error);
    });

    it("should support named imports", async () => {
        const { ESPConnection, WorkunitsService, Workunit, ESPExceptions } = await import("@hpcc-js/comms");

        expect(ESPConnection).toBeDefined();
        expect(WorkunitsService).toBeDefined();
        expect(Workunit).toBeDefined();
        expect(ESPExceptions).toBeDefined();

        const connection = new ESPConnection({ baseUrl: "http://localhost:8010" }, "WsWorkunits", "1.76");
        expect(connection).toBeDefined();

        const service = new WorkunitsService({ baseUrl: "http://localhost:8010" });
        expect(service).toBeDefined();
    });

    it("should support mixed imports", async () => {
        const {
            ESPConnection,
            WorkunitsService,
            DFUService,
            LogicalFile,
            createConnection
        } = await import("@hpcc-js/comms");

        expect(ESPConnection).toBeDefined();
        expect(WorkunitsService).toBeDefined();
        expect(DFUService).toBeDefined();
        expect(LogicalFile).toBeDefined();
        expect(createConnection).toBeDefined();

        const connection = new ESPConnection({ baseUrl: "http://localhost:8010" }, "WsWorkunits", "1.76");
        const wuService = new WorkunitsService({ baseUrl: "http://localhost:8010" });
        const dfuService = new DFUService({ baseUrl: "http://localhost:8010" });

        expect(connection).toBeDefined();
        expect(wuService).toBeDefined();
        expect(dfuService).toBeDefined();
    });

    it("should have expected number of exports", async () => {
        const comms = await import("@hpcc-js/comms");
        const exportKeys = Object.keys(comms);
        expect(exportKeys.length).toBeGreaterThan(100);
    });
});
