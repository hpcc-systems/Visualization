import { expect } from "chai";
import { mean } from "../index";

describe("mean", () => {
    it("generator", () => {
        expect(mean((row: number) => row)([5, 1, 2, 3, 4])).to.equal(3);
    });

    it("fn", () => {
        expect(mean([5, -6, 1, 2, -2], row => row)).to.equal(0);
        expect(mean([9], row => row)).to.deep.equal(9);
    });

    it("reuse", () => {
        const calcMean = mean((row: number) => row);
        expect(calcMean([5, 1, 2, 3, 4])).to.equal(3);
        expect(calcMean([15, 11, 12, 13, 14])).to.equal(13);
        expect(calcMean([5, 1, 2, 3, 4])).to.equal(3);
    });
});

