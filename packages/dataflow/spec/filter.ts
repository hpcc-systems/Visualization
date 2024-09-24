import { expect } from "chai";
import { filter } from "@hpcc-js/dataflow";
import { population } from "./data.ts";

const testFilter = row => row.address.state === "FL";
const expected = population.filter(testFilter);

describe("filter", () => {
    it("generator", () => {
        expect([...filter(testFilter)(population)]).to.deep.equal(expected);
    });

    it("scalarActivity", () => {
        expect([...filter(population, testFilter)]).to.deep.equal(expected);
    });
});
