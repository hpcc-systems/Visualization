import { describe, it, expect } from "vitest";
import { pipe, filter, min, scalar, sensor } from "@hpcc-js/dataflow";
import { population } from "./data.spec.ts";;

describe("min", () => {
    it("NumberArray", () => {
        const s1 = min();
        const s2 = min();
        const p1 = pipe(
            sensor(s1),
            filter(r => r > 3),
            sensor(s2),
        );
        const data = [...p1([1, 2, 3, 4, 5, 0])];
        expect(data.length).to.equal(2);
        expect(s1.peek()).to.equal(0);
        expect(s2.peek()).to.equal(4);
    });

    it("Population", () => {
        const s1 = min(r => r.age);
        const s2 = min(r => r.age);
        const p1 = pipe(
            sensor(s1),
            filter(r => r.age > 30),
            sensor(s2),
        );
        const data = [...p1(population)];
        expect(data.length).to.equal(699);
        expect(s1.peek()).to.equal(16);
        expect(s2.peek()).to.equal(31);
    });

    it("scalarActivity", () => {
        const a1 = scalar(min());
        expect(a1([1, 2, 3, 4, 5, 0])).to.equal(0);

        const a2 = scalar(min(r => r.age));
        expect(a2(population)).to.equal(16);
    });
});

