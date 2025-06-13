/* eslint-disable @typescript-eslint/no-require-imports */
import { describe, it, expect } from "vitest";

describe("@hpcc-js/comms CommonJS compatibility", () => {
    it("should successfully require the package", () => {
        const comms = require("@hpcc-js/comms");
        expect(comms).toBeDefined();
        expect(Object.keys(comms).length).toBeGreaterThan(0);
    });

    it("should export ESPConnection class", () => {
        const comms = require("@hpcc-js/comms");
        expect(comms.ESPConnection).toBeDefined();

        const connection = new comms.ESPConnection({ baseUrl: "http://localhost:8010" });
        expect(connection).toBeDefined();
        expect(typeof connection).toBe("object");
    });

    it("should export WorkunitsService class", () => {
        const comms = require("@hpcc-js/comms");
        expect(comms.WorkunitsService).toBeDefined();

        const service = new comms.WorkunitsService({ baseUrl: "http://localhost:8010" });
        expect(service).toBeDefined();
        expect(typeof service).toBe("object");
    });

    it("should export Workunit class", () => {
        const comms = require("@hpcc-js/comms");
        expect(comms.Workunit).toBeDefined();

        const wu = new comms.Workunit({ baseUrl: "http://localhost:8010" }, "W12345");
        expect(wu).toBeDefined();
        expect(typeof wu).toBe("object");
    });

    it("should export utility functions", () => {
        const comms = require("@hpcc-js/comms");

        expect(comms.createConnection).toBeDefined();
        expect(comms.isArray).toBeDefined();
        expect(comms.parseXSD).toBeDefined();
        expect(comms.serializeRequest).toBeDefined();
        expect(comms.deserializeResponse).toBeDefined();
    });

    it("should export exception classes", () => {
        const comms = require("@hpcc-js/comms");
        expect(comms.ESPExceptions).toBeDefined();

        const exception = new comms.ESPExceptions("test", {}, { Source: "test", Exception: [] });
        expect(exception).toBeDefined();
        expect(exception).toBeInstanceOf(Error);
    });

    it("should support destructuring require", () => {
        const { ESPConnection, WorkunitsService, Workunit, ESPExceptions } = require("@hpcc-js/comms");

        expect(ESPConnection).toBeDefined();
        expect(WorkunitsService).toBeDefined();
        expect(Workunit).toBeDefined();
        expect(ESPExceptions).toBeDefined();

        const connection = new ESPConnection({ baseUrl: "http://localhost:8010" });
        expect(connection).toBeDefined();

        const service = new WorkunitsService({ baseUrl: "http://localhost:8010" });
        expect(service).toBeDefined();
    });

    it("should have expected number of exports", () => {
        const comms = require("@hpcc-js/comms");
        const exportKeys = Object.keys(comms);
        expect(exportKeys.length).toBeGreaterThan(100);
    });
});
