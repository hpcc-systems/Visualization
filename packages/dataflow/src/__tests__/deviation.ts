import { expect } from "chai";
import { deviation, scalar } from "../index";

describe("deviation", () => {
    it("scalarActivity", () => {
        const calcDeviation = scalar(deviation());
        expect(calcDeviation([5, 1, 2, 3, 4])).to.equal(Math.sqrt(2.5));
    });

    it("empty array", () => {
        const deviationActivity = scalar(deviation());
        expect(deviationActivity([])).to.be.undefined;
    });
});
