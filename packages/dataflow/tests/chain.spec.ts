import { describe, it, expect } from "vitest";
import { count, concat, pipe, filter, min, max, map, each, generate, sensor, scalar, activity } from "@hpcc-js/dataflow";
import { person, Person, population } from "./data.spec.ts";

describe("chain", () => {
    it("generator", () => {
        const p = pipe(concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p([1, 2])]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = pipe(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2([1, 2])]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = pipe(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3([1, 2])]).to.deep.equal([2, 4, 6, 8]);
    });

    it("fn", () => {
        expect([...pipe([1, 2])]).to.deep.equal([1, 2]);
        const p = pipe([1, 2], concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = pipe([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = pipe([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3]).to.deep.equal([2, 4, 6, 8]);
    });

    it("activity", () => {
        expect([...pipe(
            concat([3, 4, 5, 6]),
            concat([7, 8]),
            activity(max())
        )([1, 2])]).to.deep.equal([8]);

        expect([...pipe(
            [1, 2],
            concat([3, 4, 5, 6]),
            concat([7, -1, 8]),
            activity(min())
        )]).to.deep.equal([-1]);
    });

    it("scalar", () => {
        expect(pipe(
            concat([3, 4, 5, 6]),
            concat([7, 8]),
            scalar(max())
        )([1, 2])).to.equal(8);

        expect(pipe(
            [1, 2],
            concat([3, 4, 5, 6]),
            concat([7, -1, 8]),
            scalar(min())
        )).to.equal(-1);
    });

    it("chain-all", () => {
        const s1 = count();
        const s2 = count();
        const myPipeline = pipe(
            map((_: Person) => ({ id: _.email, display: `The id is:  ${_}`, ageBucket: Math.round(_.age / 10) })),
            each(row => { /* do nothing */ }),
            sensor(s1),
            filter(_ => _.ageBucket !== 2),
            sensor(s2)
        );
        expect([...myPipeline(generate(person, 1000))]).to.have.lengthOf(829);
        expect(s1.peek()).to.equal(1000);
        expect(s2.peek()).to.equal(829);
    });

    it("sensor", () => {
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
});
