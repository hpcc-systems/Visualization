import { expect } from "chai";
import { pipe, filter, extent, scalar, sensor } from "@hpcc-js/dataflow";
import { population } from "./data.ts";

describe("max", () => {

    it("Population", () => {
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

    it("scalarActivity", () => {
        const extentActivity = scalar(extent());
        expect(extentActivity([5, 1, 2, -3, 4])).to.deep.equal([-3, 5]);
    });
});
