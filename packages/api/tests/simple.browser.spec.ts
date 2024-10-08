import { describe, it, expect } from "vitest";

import { BUILD_VERSION } from "@hpcc-js/api";

describe("Result", function () {
    it("basic", function () {
        expect(BUILD_VERSION).to.be.a("string");
    });
});
