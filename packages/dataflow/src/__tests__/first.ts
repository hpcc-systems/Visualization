import { expect } from "chai";
import { first } from "../index";

describe("first", () => {
    it("generator", () => {
        expect([...first(2)([])]).to.deep.equal([]);
        expect([...first(2)(["a", "b", "c"])]).to.deep.equal(["a", "b"]);
    });

    it("fn", () => {
        expect([...first([], 22)]).to.deep.equal([]);
        expect([...first(["a", "b", "c"], 2)]).to.deep.equal(["a", "b"]);
        expect([...first(["a", "b", "c"], 22)]).to.deep.equal(["a", "b", "c"]);
    });
});
