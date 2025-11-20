import { describe, it, expect } from "vitest";
import { variance, scalar } from "../src/index.ts";

describe("variance", () => {
    it("should calculate variance when used as scalar activity", () => {
        const calcVariance = scalar(variance());
        expect(calcVariance([5, 1, 2, 3, 4])).to.equal(2.5);
    });

    it("should return undefined for empty array", () => {
        const varianceActivity = scalar(variance());
        expect(varianceActivity([])).to.be.undefined;
    });

    it("with accessor callback", () => {
        const data = [{ value: 5 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
        const calcVariance = scalar(variance((d: { value: number }) => d.value));
        expect(calcVariance(data)).to.equal(2.5);
    });
});
