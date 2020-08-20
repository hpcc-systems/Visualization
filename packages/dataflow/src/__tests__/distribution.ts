import { expect } from "chai";

import { distribution } from "../index";

describe("distribution", () => {
    it("generator", () => {
        expect(distribution((row: number) => row)([5, 1, 2, 3, 4])).to.deep.equal({
            min: 1,
            mean: 3,
            max: 5,
            deviation: Math.sqrt(2.5),
            variance: 2.5
        });
    });

    it("fn", () => {
        expect(distribution([5, 1, 2, 3, 4], row => row)).to.deep.equal({
            min: 1,
            mean: 3,
            max: 5,
            deviation: Math.sqrt(2.5),
            variance: 2.5
        });
    });

    it("empty array", () => {
        expect(distribution((row: number) => row)([])).to.be.undefined;
    });
});
