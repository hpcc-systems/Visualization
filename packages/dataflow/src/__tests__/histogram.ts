import { expect } from "chai";
import { histogram } from "../index";
import { Person, population } from "./data";

describe("histogram", () => {
    it("generator", () => {
        const h = [...histogram<Person>(row => row.age, { buckets: 10 })(population)];
        expect(h).to.have.length;
        expect(h.length).to.equal(10);
        expect(h[0].from).to.exist;
        expect(h[0].to).to.exist;
        expect(h[0].value).to.have.length;

        const h2 = [...histogram<Person>(row => row.age, { min: 15, range: 5 })(population)];
        expect(h2).to.have.length;
        expect(h2.length).to.equal(11);
    });

    it("fn", () => {
        const h = [...histogram(population, row => row.age, { buckets: 10 })];
        expect(h).to.have.length;
        expect(h[0].from).to.exist;
        expect(h[0].to).to.exist;
        expect(h[0].value).to.have.length;
    });

    it("readme", () => {
        const data = [1, 12, 13, 13, 3, 14, 19, 6];
        const h = [...histogram(data, n => n, { buckets: 3 })];
        expect(h).to.have.length;
        const h2 = [...histogram(data, n => n, { min: 0, range: 5 })];
        expect(h2).to.have.length;
    });
});
