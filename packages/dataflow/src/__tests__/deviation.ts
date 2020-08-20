import { expect } from "chai";

import { deviation } from "../index";

describe("deviation", () => {
    it("generator", () => {
        expect(deviation((row: number) => row)([5, 1, 2, 3, 4])).to.equal(Math.sqrt(2.5));
    });

    it("fn", () => {
        expect(deviation([5, 1, 2, 3, 4], row => row)).to.equal(Math.sqrt(2.5));
    });

    it("empty array", () => {
        expect(deviation((row: number) => row)([])).to.be.undefined;
    });
});
