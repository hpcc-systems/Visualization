import { expect } from "chai";
import { variance } from "../index";

describe("variance", () => {
    it("generator", () => {
        expect(variance((row: number) => row)([5, 1, 2, 3, 4])).to.equal(2.5);
    });

    it("fn", () => {
        expect(variance([5, 1, 2, 3, 4], row => row)).to.equal(2.5);
    });

    it("reuse", () => {
        const calcVariance = variance((row: number) => row);
        expect(calcVariance([5, 1, 2, 3, 4])).to.equal(2.5);
        expect(calcVariance([15, 11, 12, 13, 14])).to.equal(2.5);
        expect(calcVariance([5, 1, 2, 3, 4])).to.equal(2.5);
    });
});
