import { describe, it, expect } from "vitest";
import { sort } from "../src/index.ts";
import { Person, population } from "./data.spec.ts";;

function sortFunc(l: Person, r: Person): number {
    const retVal = l.lname.localeCompare(r.lname);
    if (retVal === 0) return l.fname.localeCompare(r.fname);
    return retVal;
}

const expected = [...population].sort(sortFunc);

describe("sort", () => {
    it("should sort items by comparison function when used as curried activity", () => {
        expect([...sort(sortFunc)(population)]).to.deep.equal(expected);
    });

    it("should sort items by comparison function when executed immediately", () => {
        expect([...sort(population, sortFunc)]).to.deep.equal(expected);
    });

    it("should use default sort when callback is undefined", () => {
        const numbers = [5, 2, 8, 1, 9];
        expect([...sort(numbers, undefined as any)]).to.deep.equal([1, 2, 5, 8, 9]);
    });
});
