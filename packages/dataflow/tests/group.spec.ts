import { describe, it, expect } from "vitest";
import { group } from "@hpcc-js/dataflow";
import { Person, population } from "./data.spec.ts";;

describe("group", () => {
    it("generator", () => {
        const gb = [...group<Person>(row => row.address.state)(population)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });

    it("scalarActivity", () => {
        const gb = [...group(population, row => row.address.state)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });
});
