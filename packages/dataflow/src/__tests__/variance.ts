import { expect } from "chai";
import { variance } from "../index";

describe("variance", () => {
    it("generator", () => {
        expect(variance((row: number) => row)([5, 1, 2, 3, 4])).to.deep.equal(2.5);
    });

    it("fn", () => {
        expect(variance([5, 1, 2, 3, 4], row => row)).to.deep.equal(2.5);
    });
});
