import { describe, it, expect } from "vitest";
import { median, scalar } from "../src/index.ts";

describe("median", () => {

    it("should calculate median for odd and even length arrays", () => {
        const calcMedian = scalar(median());
        expect(calcMedian([-6, -2, 1, 2, 5])).to.equal(1);
        expect(calcMedian([5, -6, 1, 2, -2])).to.equal(1);
        expect(calcMedian([-6, -2, 1, 2, 5, 6])).to.equal(1.5);
        expect(calcMedian([5, -6, 1, 2, -2, 6])).to.equal(1.5);
        expect(calcMedian([9])).to.deep.equal(9);
    });

    it("with accessor callback", () => {
        const data = [{ value: -6 }, { value: -2 }, { value: 1 }, { value: 2 }, { value: 5 }];
        const calcMedian = scalar(median((d: { value: number }) => d.value));
        expect(calcMedian(data)).to.equal(1);
    });
});
