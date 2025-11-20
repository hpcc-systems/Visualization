import { describe, it, expect } from "vitest";
import { map } from "../src/index.ts";
import { Person, population } from "./data.spec.ts";;

const testMap = (row: Person) => ({ ...row.address });
const expected = population.map(testMap);

describe("map", () => {
    it("should transform items when used as curried activity", () => {
        const pipeline = map(testMap);
        const it = pipeline(population);
        expect([...it]).to.deep.equal(expected);
    });

    it("should transform items when executed immediately", () => {
        const pipeline = map(population, testMap);
        expect([...pipeline]).to.deep.equal(expected);
    });
});
