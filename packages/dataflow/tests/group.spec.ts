import { describe, it, expect } from "vitest";
import { group } from "../src/index.ts";
import { Person, population } from "./data.spec.ts";;

describe("group", () => {
    it("should group items by key when used as curried activity", () => {
        const gb = [...group<Person>(row => row.address.state)(population)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });

    it("should group items by key when executed immediately", () => {
        const gb = [...group(population, row => row.address.state)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });
});
