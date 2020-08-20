import { expect } from "chai";
import { median } from "../index";

describe("median", () => {
    it("generator", () => {
        expect(median((row: number) => row)([5, 1, 2, 3, 4])).to.equal(3);
        expect(median((row: number) => row)([5, 1, 2, 3, 4, 6])).to.equal(3.5);
    });

    it("fn", () => {
        expect(median([-6, -2, 1, 2, 5], row => row)).to.equal(1);
        expect(median([5, -6, 1, 2, -2], row => row)).to.equal(1);
        expect(median([-6, -2, 1, 2, 5, 6], row => row)).to.equal(1.5);
        expect(median([5, -6, 1, 2, -2, 6], row => row)).to.equal(1.5);
        expect(median([9], row => row)).to.deep.equal(9);
    });
});

