import { expect } from "chai";
import { filter } from "../index";
import { population } from "./data";

const testFilter = row => row.address.state === "FL";
const expected = population.filter(testFilter);

describe("filter", () => {
    it("generator", () => {
        expect([...filter(testFilter)(population)]).to.deep.equal(expected);
    });

    it("fn", () => {
        expect([...filter(population, testFilter)]).to.deep.equal(expected);
    });
});
