import { describe, it, expect } from "vitest";

import { ESPConnection } from "@hpcc-js/comms";

describe("ESPConnection", function () {
    it("basic", function () {
        expect(ESPConnection).to.be.a("function");
    });
});
