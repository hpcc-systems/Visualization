import { describe, it, expect } from "vitest";
import { mean, scalar } from "../src/index.ts";

describe("mean", () => {
    it("should calculate average when used as scalar activity", () => {
        const a1 = scalar(mean());
        expect(a1([5, -6, 1, 2, -2])).to.equal(0);
        expect(a1([9])).to.deep.equal(9);
    });

    it("with accessor callback", () => {
        const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
        const a1 = scalar(mean((d: { value: number }) => d.value));
        expect(a1(data)).to.equal(20);
    });
});

