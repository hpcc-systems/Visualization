import { describe, it, expect } from "vitest";
import { sort } from "@hpcc-js/dataflow";
import { Person, population } from "./data.spec.ts";;

function sortFunc(l: Person, r: Person): number {
    const retVal = l.lname.localeCompare(r.lname);
    if (retVal === 0) return l.fname.localeCompare(r.fname);
    return retVal;
}

const expected = [...population].sort(sortFunc);

describe("sort", () => {
    it("generator", () => {
        expect([...sort(sortFunc)(population)]).to.deep.equal(expected);
    });

    it("scalarActivity", () => {
        expect([...sort(population, sortFunc)]).to.deep.equal(expected);
    });
});
