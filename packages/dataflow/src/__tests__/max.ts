import { expect } from "chai";
import { max } from "../index";

describe("max", () => {
    it("generator", () => {
        expect(max((row: number) => row)([5, 1, 2, 3, 4])).to.equal(5);
    });

    it("fn", () => {
        expect(max([5, 1, 2, 3, 4], row => row)).to.equal(5);
    });

    it("reuse", () => {
        const calcMax = max((row: number) => row);
        expect(calcMax([5, 1, 2, 3, 4])).to.equal(5);
        expect(calcMax([1, 2, 3, 4])).to.equal(4);
        expect(calcMax([11, 2, 3, 4])).to.equal(11);
    });
});

