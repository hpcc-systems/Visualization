import { expect } from "chai";
import { quartile } from "../index";

describe("quartile", () => {
    it("generator", () => {
        expect(quartile((row: number) => row)([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49])).to.deep.equal([6, 15, 40, 43, 49]);
        expect(quartile((row: number) => row)([7, 15, 36, 39, 40, 41])).to.deep.equal([7, 15, 37.5, 40, 41]);
        expect(quartile((row: number) => row)([1, 22, 133])).to.deep.equal([1, 1, 22, 133, 133]);
        expect(quartile((row: number) => row)([2, 144, 33])).to.deep.equal([2, 2, 33, 144, 144]);
    });

    it("fn", () => {
        expect(quartile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49], row => row)).to.deep.equal([6, 15, 40, 43, 49]);
        expect(quartile([7, 15, 36, 39, 40, 41], row => row)).to.deep.equal([7, 15, 37.5, 40, 41]);
    });
});

