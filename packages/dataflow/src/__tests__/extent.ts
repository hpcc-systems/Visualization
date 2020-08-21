import { expect } from "chai";
import { extent } from "../index";

describe("max", () => {
    it("generator", () => {
        expect(extent((row: number) => row)([5, 1, 2, 3, 4])).to.deep.equal([1, 5]);
    });

    it("fn", () => {
        expect(extent([5, 1, 2, -3, 4], row => row)).to.deep.equal([-3, 5]);
    });
});

