import { expect } from "chai";
import { map } from "../index";
import { population } from "./data";

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
