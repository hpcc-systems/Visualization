import { describe, it, expect } from "vitest";

import { ECLGraph } from "@hpcc-js/comms";

describe("Graph", function () {
    it("basic", function () {
        expect(ECLGraph).to.be.a("function");
    });
});
