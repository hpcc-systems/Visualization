import { describe, it, expect } from "vitest";

import { Resource } from "@hpcc-js/comms";

describe("Resource", function () {
    it("basic", function () {
        expect(Resource).to.be.a("function");
    });
});
