import { describe, it, expect } from "vitest";
import { pipe, filter, max, scalar, sensor } from "../src/index.ts";
import { population } from "./data.spec.ts";;

describe("max", () => {
    it("should track maximum value through pipeline with number array", () => {
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

    it("should track maximum age through pipeline with accessor", () => {
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

    it("should calculate maximum when used as scalar activity", () => {
        const s1 = scalar(max());
        expect(s1([1, 2, 3, 4, 5, 0])).to.equal(5);

        const s2 = scalar(max(r => r.age));
        expect(s2(population)).to.equal(66);
    });
});

