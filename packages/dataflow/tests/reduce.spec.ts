import { describe, it, expect } from "vitest";
import { reduce, scalar } from "../src/index.ts";

const data = [1, 2, 3, 4, 5];
const reduceFunc = (prev: number, row: number) => prev + row;
const expectedA = data.reduce(reduceFunc);
const expectedB = data.reduce(reduceFunc, 10);

describe("reduce", () => {

    it("should reduce values with and without initial value", () => {
        const calcReduce = scalar(reduce(reduceFunc));
        const calcReduce2 = scalar(reduce(reduceFunc, 10));
        expect(calcReduce(data)).to.equal(expectedA);
        expect(calcReduce2(data)).to.equal(expectedB);
    });
});
