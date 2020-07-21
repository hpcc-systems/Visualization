import { expect } from "chai";
import { group } from "../index";
import { Person, population } from "./data";

describe("group", () => {
    it("generator", () => {
        const gb = [...group<Person>(row => row.address.state)(population)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });

    it("fn", () => {
        const gb = [...group(population, row => row.address.state)];
        expect(gb).to.have.length;
        expect(gb[0].key).to.exist;
        expect(gb[0].value).to.have.length;
    });
});
