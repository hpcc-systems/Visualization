import { expect } from "chai";
import { pipe, filter, max, scalar, sensor } from "../index";
import { population } from "./data";

describe("max", () => {
    it("NumberArray", () => {
        const s1 = max();
        const s2 = max();
        const p1 = pipe(
            sensor(s1),
            filter(r => r < 3),
            sensor(s2),
        );
        const data = [...p1([1, 2, 3, 4, 5, 0])];
        expect(data.length).to.equal(3);
        expect(s1.peek()).to.equal(5);
        expect(s2.peek()).to.equal(2);
    });

    it("Population", () => {
        const s1 = max(r => r.age);
        const s2 = max(r => r.age);
        const p1 = pipe(
            sensor(s1),
            filter(r => r.age < 30),
            sensor(s2),
        );
        const data = [...p1(population)];
        expect(data.length).to.equal(286);
        expect(s1.peek()).to.equal(66);
        expect(s2.peek()).to.equal(29);
    });

    it("scalarActivity", () => {
        const s1 = scalar(max());
        expect(s1([1, 2, 3, 4, 5, 0])).to.equal(5);

        const s2 = scalar(max(r => r.age));
        expect(s2(population)).to.equal(66);
    });
});

