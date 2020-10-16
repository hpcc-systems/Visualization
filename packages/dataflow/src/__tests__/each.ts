import { expect } from "chai";
import { each } from "../index";
import { population } from "./data";

describe("each", () => {
    it("generator", () => {
        [...each((row, i) => expect(row).to.equal(population[i]))(population)];
    });

    it("scalarActivity", () => {
        [...each(population, (row, i) => expect(row).to.equal(population[i]))];
    });
});
