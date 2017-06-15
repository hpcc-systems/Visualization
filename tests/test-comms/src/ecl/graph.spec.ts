import { expect } from "chai";

import { ECLGraph } from "@hpcc-js/comms";

describe("Graph", function () {
    it("basic", function () {
        expect(ECLGraph).to.be.a("function");
    });
});
