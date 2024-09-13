import { expect } from "chai";
import { generate } from "@hpcc-js/dataflow";

describe("generate", () => {
    it("basic", () => {
        expect([...generate(Math.random, 22)]).to.be.lengthOf(22);
    });

});
