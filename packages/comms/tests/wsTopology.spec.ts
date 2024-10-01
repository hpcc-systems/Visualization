import { describe, it, expect } from "vitest";

import { TopologyService } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("WsTopology", function () {
    it("basic", function () {
        const service = new TopologyService({ baseUrl: ESP_URL });
        expect(service).exist;
    });
});
