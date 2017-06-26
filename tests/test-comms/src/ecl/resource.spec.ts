import { expect } from "chai";

import { Resource } from "@hpcc-js/comms";

describe("Resource", function () {
    it("basic", function () {
        expect(Resource).to.be.a("function");
    });
});
