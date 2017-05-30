import { expect } from "chai";

import { Result } from "@hpcc-js/comms";

describe("Result", function () {
    it("basic", function () {
        expect(Result).to.be.a("function");
    });
});
