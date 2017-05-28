import { expect } from "chai";

import { ESPConnection } from "@hpcc-js/comms";

describe("ESPConnection", function () {
    it("basic", function () {
        expect(ESPConnection).to.be.a("function");
    });
});
