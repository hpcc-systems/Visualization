import { describe, it, expect } from "vitest";

import { SashaService } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("WsSasha", function () {
    it("basic", function () {
        const service = new SashaService({ baseUrl: ESP_URL });
        expect(service).exist;
    });
});
