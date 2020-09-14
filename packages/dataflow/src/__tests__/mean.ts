import { expect } from "chai";
import { mean, scalar } from "../index";

describe("mean", () => {
    it("scalarActivity", () => {
        const a1 = scalar(mean());
        expect(a1([5, -6, 1, 2, -2])).to.equal(0);
        expect(a1([9])).to.deep.equal(9);
    });
});

