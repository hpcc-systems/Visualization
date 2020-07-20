import { expect } from "chai";
import { min } from "../index";

describe("min", () => {
    it("generator", () => {
        expect(min((row: number) => row)([5, 1, 2, 3, 4])).to.equal(1);
    });

    it("fn", () => {
        expect(min([5, 1, 2, 3, 4], row => row)).to.equal(1);
    });
});

