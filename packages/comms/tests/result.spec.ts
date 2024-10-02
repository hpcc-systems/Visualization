import { describe, it, expect } from "vitest";

import { Result } from "@hpcc-js/comms";

describe("Result", function () {
    it("basic", function () {
        expect(Result).to.be.a("function");
    });
});
