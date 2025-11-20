import { describe, it, expect } from "vitest";
import { each } from "../src/index.ts";
import { population } from "./data.spec.ts";;

describe("each", () => {
    it("should execute callback for each item when used as curried activity", () => {
        [...each((row, i) => expect(row).to.equal(population[i]))(population)];
    });

    it("should execute callback for each item when executed immediately", () => {
        [...each(population, (row, i) => expect(row).to.equal(population[i]))];
    });
});
