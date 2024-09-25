import { describe, it, expect } from "vitest";

import { SourceFile } from "@hpcc-js/comms";

describe("SourceFile", function () {
    it("basic", function () {
        expect(SourceFile).to.be.a("function");
    });
});
