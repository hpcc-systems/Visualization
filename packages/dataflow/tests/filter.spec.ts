import { describe, it, expect } from "vitest";
import { filter } from "../src/index.ts";
import { Person, population } from "./data.spec.ts";;

const testFilter = (row: Person) => row.address.state === "FL";
const expected = population.filter(testFilter);

describe("filter", () => {
    it("should filter items by condition when used as curried activity", () => {
        expect([...filter(testFilter)(population)]).to.deep.equal(expected);
    });

    it("should filter items by condition when executed immediately", () => {
        expect([...filter(population, testFilter)]).to.deep.equal(expected);
    });
});
