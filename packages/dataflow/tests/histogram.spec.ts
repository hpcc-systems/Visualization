import { describe, it, expect } from "vitest";
import { histogram } from "../src/index.ts";
import { people, Person, population } from "./data.spec.ts";;

describe("histogram", () => {
    it("should create histogram buckets with dynamic and fixed ranges", () => {
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

    it("should create histogram buckets from generated data", () => {
        const h = [...histogram<Person>(row => row.age, { buckets: 10 })(people())];
        expect(h).to.have.length;
        expect(h.length).to.equal(10);
        expect(h[0].from).to.exist;
        expect(h[0].to).to.exist;
        expect(h[0].value).to.have.length;

        const h2 = [...histogram<Person>(row => row.age, { min: 15, range: 5 })(people())];
        expect(h2).to.have.length;
        expect(h2.length).to.equal(11);
    });

    it("should create histogram when executed immediately", () => {
        const h = [...histogram(population, row => row.age, { buckets: 10 })];
        expect(h).to.have.length;
        expect(h[0].from).to.exist;
        expect(h[0].to).to.exist;
        expect(h[0].value).to.have.length;
    });

    it("should match README examples for histogram buckets", () => {
        const data = [1, 12, 13, 13, 3, 14, 19, 6];
        const h = [...histogram(data, n => n, { buckets: 3 })];
        expect(h).to.have.length;
        expect(h.length).to.equal(3);
        const h2 = [...histogram(data, n => n, { min: 0, range: 5 })];
        expect(h2).to.have.length;
        expect(h2.length).to.equal(4);
    });


    it("sparse buckets", () => {
        const data = [1, 6, 13, 13, 3, 14, 19, 4];
        const h = [...histogram(data, n => n, { buckets: 3 })];
        expect(h).to.have.length;
        expect(h.length).to.equal(3);
        for (let i = 0; i < h.length; i++) {
            switch (i) {
                case 0:
                    expect(h[i].from).to.equal(1);
                    expect(h[i].to).to.equal(7);
                    expect(h[i].value).to.deep.equal([1, 6, 3, 4]);
                    break;
                case 1:
                    expect(h[i].from).to.equal(7);
                    expect(h[i].to).to.equal(13);
                    expect(h[i].value).to.deep.equal([]);
                    break;
                case 2:
                    expect(h[i].from).to.be.equal(13);
                    expect(h[i].to).to.be.equal(19);
                    expect(h[i].value).to.deep.equal([13, 13, 14, 19]);
                    break;
            }
        }
        const data2 = [1, 13, 12, 13, 3, 14, 19, 4];
        const h2 = [...histogram(data2, n => n, { min: 0, range: 5 })];
        expect(h2).to.have.length;
        expect(h2.length).to.equal(4);
        for (let i = 0; i < h.length; i++) {
            switch (i) {
                case 0:
                    expect(h2[i].from).to.equal(0);
                    expect(h2[i].to).to.equal(5);
                    expect(h2[i].value).to.deep.equal([1, 3, 4]);
                    break;
                case 1:
                    expect(h2[i].from).to.equal(5);
                    expect(h2[i].to).to.equal(10);
                    expect(h2[i].value).to.deep.equal([]);
                    break;
                case 2:
                    expect(h2[i].from).to.be.equal(10);
                    expect(h2[i].to).to.be.equal(15);
                    expect(h2[i].value).to.deep.equal([13, 12, 13, 14]);
                    break;
                case 3:
                    expect(h2[i].from).to.be.equal(15);
                    expect(h2[i].to).to.be.equal(20);
                    expect(h2[i].value).to.deep.equal([19]);
                    break;
            }
        }
    });

    it("empty source with buckets", () => {
        const h = [...histogram<number>(n => n, { buckets: 10 })([])];
        expect(h.length).to.equal(10);
        for (const b of h) {
            expect(b.from).to.be.NaN;
            expect(b.to).to.be.NaN;
            expect(b.value).to.deep.equal([]);
        }
    });

    it("empty source with buckets 2", () => {
        const data: number[] = [];
        const h = [...histogram(data, n => n, { buckets: 3 })];
        expect(h).to.have.length;
        expect(h.length).to.equal(3);
        const h2 = [...histogram(data, n => n, { min: 0, range: 5 })];
        expect(h2).to.have.length;
        expect(h2.length).to.equal(0);
    });

    it("should handle empty source with different histogram options", () => {
        const data: number[] = [];
        const h = [...histogram(data, n => n, { buckets: 3 })];
        expect(h).to.have.length;
        const h2 = [...histogram(data, n => n, { min: 0, range: 5 })];
        expect(h2).to.have.length;
    });

});
