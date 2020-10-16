import { expect } from "chai";
import { distribution, scalar } from "../index";

describe("distribution", () => {

    it("scalarActivity", () => {
        const calcDistribution = scalar(distribution());
        expect(calcDistribution([5, 1, 2, 3, 4])).to.deep.equal({
            min: 1,
            mean: 3,
            max: 5,
            deviation: Math.sqrt(2.5),
            variance: 2.5
        });
    });

    it("empty array", () => {
        const a1 = scalar(distribution());
        expect(a1([])).to.be.undefined;
    });
});
