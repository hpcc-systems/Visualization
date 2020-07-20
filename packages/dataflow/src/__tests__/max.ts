import { expect } from "chai";
import { max } from "../index";

describe("max", () => {
    it("generator", () => {
        expect(max((row: number) => row)([5, 1, 2, 3, 4])).to.equal(5);
    });

    it("fn", () => {
        expect(max([5, 1, 2, 3, 4], row => row)).to.equal(5);
    });
});

