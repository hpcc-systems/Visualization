import { describe, it, expect } from "vitest";
import { quartile, scalar } from "../src/index.ts";

describe("quartile", () => {

    it("should calculate five-number summary (min, Q1, median, Q3, max)", () => {
        const calcQuartile = scalar(quartile());
        expect(calcQuartile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49])).to.deep.equal([6, 15, 40, 43, 49]);
        expect(calcQuartile([7, 15, 36, 39, 40, 41])).to.deep.equal([7, 15, 37.5, 40, 41]);
        expect(calcQuartile([1, 22, 133])).to.deep.equal([1, 1, 22, 133, 133]);
        expect(calcQuartile([2, 144, 33])).to.deep.equal([2, 2, 33, 144, 144]);
    });

    it("should return undefined for single element array", () => {
        const calcQuartile = scalar(quartile());
        expect(calcQuartile([5])).to.be.undefined;
    });

    it("with accessor callback", () => {
        const data = [{ value: 6 }, { value: 7 }, { value: 15 }, { value: 36 }, { value: 39 }, { value: 40 }, { value: 41 }, { value: 42 }, { value: 43 }, { value: 47 }, { value: 49 }];
        const calcQuartile = scalar(quartile((d: { value: number }) => d.value));
        expect(calcQuartile(data)).to.deep.equal([6, 15, 40, 43, 49]);
    });
});
