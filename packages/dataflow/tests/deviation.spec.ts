import { describe, it, expect } from "vitest";
import { deviation, scalar } from "../src/index.ts";

describe("deviation", () => {
    it("should calculate standard deviation when used as scalar activity", () => {
        const calcDeviation = scalar(deviation());
        expect(calcDeviation([5, 1, 2, 3, 4])).to.equal(Math.sqrt(2.5));
    });

    it("should return undefined for empty array", () => {
        const deviationActivity = scalar(deviation());
        expect(deviationActivity([])).to.be.undefined;
    });

    it("with accessor callback", () => {
        const data = [{ value: 5 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
        const calcDeviation = scalar(deviation((d: { value: number }) => d.value));
        expect(calcDeviation(data)).to.equal(Math.sqrt(2.5));
    });
});
