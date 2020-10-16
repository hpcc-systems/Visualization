import { expect } from "chai";
import { reduce, scalar } from "../index";

const data = [1, 2, 3, 4, 5];
const reduceFunc = (prev, row) => prev + row;
const expectedA = data.reduce(reduceFunc);
const expectedB = data.reduce(reduceFunc, 10);

describe("reduce", () => {

    it("scalarActivity", () => {
        const calcReduce = scalar(reduce(reduceFunc));
        const calcReduce2 = scalar(reduce(reduceFunc, 10));
        expect(calcReduce(data)).to.equal(expectedA);
        expect(calcReduce2(data)).to.equal(expectedB);
    });
});
