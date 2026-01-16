import { describe, it, expect } from "vitest";

import { Connection, WorkunitsService } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("AbortController", function () {
    it("should be available globally", function () {
        expect(typeof AbortController).toBe("function");
        const controller = new AbortController();
        expect(controller).toBeDefined();
        expect(controller.signal).toBeDefined();
        expect(typeof controller.abort).toBe("function");
    });

    it("should abort a WUQuery request", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        const controller = new AbortController();

        // Abort immediately
        controller.abort();

        try {
            await wsWorkunits.WUQuery({}, controller.signal);
            expect.fail("Request should have been aborted");
        } catch (error: any) {
            expect(error.name).toBe("AbortError");
        }
    });

    it("should abort a WUQuery request after delay", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        const controller = new AbortController();

        // Abort after a short delay
        setTimeout(() => controller.abort(), 10);

        try {
            await wsWorkunits.WUQuery({}, controller.signal);
            // If the request completes before abort, that's OK for this test
        } catch (error: any) {
            // If it was aborted, verify it's an AbortError
            expect(error.name).toBe("AbortError");
        }
    });

    it("should complete request when not aborted", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        const controller = new AbortController();

        const response = await wsWorkunits.WUQuery({}, controller.signal);
        expect(response).toBeDefined();
        expect(response.Workunits).toBeDefined();
    });

    it("should handle multiple requests with same controller", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        const controller = new AbortController();

        // First request should succeed
        const response1 = await wsWorkunits.WUQuery({}, controller.signal);
        expect(response1).toBeDefined();

        // Abort controller
        controller.abort();

        // Second request should fail
        try {
            await wsWorkunits.WUQuery({}, controller.signal);
            expect.fail("Request should have been aborted");
        } catch (error: any) {
            expect(error.name).toBe("AbortError");
        }
    });

    it("should handle request without abort signal", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));

        // Request without abort signal should work normally
        const response = await wsWorkunits.WUQuery({});
        expect(response).toBeDefined();
        expect(response.Workunits).toBeDefined();
    });

    it("should work with GET requests", async function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "get" }));
        const controller = new AbortController();

        controller.abort();

        try {
            await wsWorkunits.WUQuery({}, controller.signal);
            expect.fail("Request should have been aborted");
        } catch (error: any) {
            expect(error.name).toBe("AbortError");
        }
    });
});
