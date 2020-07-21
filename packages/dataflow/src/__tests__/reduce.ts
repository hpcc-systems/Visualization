import { expect } from "chai";
import { reduce } from "../index";

const data = [1, 2, 3, 4, 5];
const reduceFunc = (prev, row) => prev + row;
const expectedA = data.reduce(reduceFunc);
const expectedB = data.reduce(reduceFunc, 10);

describe("reduce", () => {
    it("generator", () => {
        expect(reduce(reduceFunc)(data)).to.equal(expectedA);
        expect(reduce(reduceFunc, 10)(data)).to.equal(expectedB);
        expect(reduce(reduceFunc)(data[Symbol.iterator]())).to.equal(expectedA);
        expect(reduce(reduceFunc, 10)(data[Symbol.iterator]())).to.equal(expectedB);
    });

    it("fn", () => {
        expect(reduce(data, reduceFunc)).to.equal(expectedA);
        expect(reduce(data, reduceFunc, 10)).to.equal(expectedB);
        expect(reduce(data[Symbol.iterator](), reduceFunc)).to.equal(expectedA);
        expect(reduce(data[Symbol.iterator](), reduceFunc, 10)).to.equal(expectedB);
    });
});
