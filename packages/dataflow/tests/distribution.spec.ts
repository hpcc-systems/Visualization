import { describe, it, expect } from "vitest";
import { distribution, scalar } from "../src/index.ts";

describe("distribution", () => {

    it("should calculate full distribution statistics", () => {
        const calcDistribution = scalar(distribution());
        expect(calcDistribution([5, 1, 2, 3, 4])).to.deep.equal({
            min: 1,
            mean: 3,
            max: 5,
            deviation: Math.sqrt(2.5),
            variance: 2.5
        });
    });

    it("should return undefined for empty array", () => {
        const a1 = scalar(distribution());
        expect(a1([])).to.be.undefined;
    });

    it("with accessor callback", () => {
        const data = [{ value: 5 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
        const calcDistribution = scalar(distribution((d: { value: number }) => d.value));
        expect(calcDistribution(data)).to.deep.equal({
            min: 1,
            mean: 3,
            max: 5,
            deviation: Math.sqrt(2.5),
            variance: 2.5
        });
    });
});
