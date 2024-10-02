import { describe, it, expect } from "vitest";
import { map } from "@hpcc-js/dataflow";
import { population } from "./data.spec.ts";;

const testMap = row => ({ ...row.address });
const expected = population.map(testMap);

describe("map", () => {
    it("generator", () => {
        expect([...map(testMap)(population)]).to.deep.equal(expected);
    });

    it("scalarActivity", () => {
        expect([...map(population, testMap)]).to.deep.equal(expected);
    });
});
