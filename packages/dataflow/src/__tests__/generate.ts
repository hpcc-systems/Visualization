import { expect } from "chai";
import { generate } from "../index";

describe("generate", () => {
    it("basic", () => {
        expect([...generate(Math.random, 22)]).to.be.lengthOf(22);
    });

});
