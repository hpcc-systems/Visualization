import { expect } from "chai";
import { each } from "@hpcc-js/dataflow";
import { population } from "./data.ts";

describe("each", () => {
    it("generator", () => {
        [...each((row, i) => expect(row).to.equal(population[i]))(population)];
    });

    it("scalarActivity", () => {
        [...each(population, (row, i) => expect(row).to.equal(population[i]))];
    });
});
