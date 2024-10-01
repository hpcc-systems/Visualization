import { describe, it, expect } from "vitest";

import { Timer } from "@hpcc-js/comms";

describe("Timer", function () {
    it("basic", function () {
        expect(Timer).to.be.a("function");
    });
});
