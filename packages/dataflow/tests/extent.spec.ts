import { describe, it, expect } from "vitest";
import { pipe, filter, extent, scalar, sensor } from "../src/index.ts";
import { population } from "./data.spec.ts";;

describe("extent", () => {

    it("should track min and max through pipeline with filters", () => {
        const s1 = extent(r => r.age);
        const s2 = extent(r => r.age);
        const p1 = pipe(
            sensor(s1),
            filter(r => r.age > 30),
            sensor(s2),
        );
        const data = [...p1(population)];
        expect(data.length).to.equal(699);
        expect(s1.peek()).to.deep.equal([16, 66]);
        expect(s2.peek()).to.deep.equal([31, 66]);
    });

    it("should calculate extent when used as scalar activity", () => {
        const extentActivity = scalar(extent());
        expect(extentActivity([5, 1, 2, -3, 4])).to.deep.equal([-3, 5]);
    });
});
