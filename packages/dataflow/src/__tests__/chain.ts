import { expect } from "chai";
import { concat, chain, filter, min, max, map, each, generate } from "../index";
import { person, Person } from "./data";

describe("chain", () => {
    it("generator", () => {
        const p = chain(concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p([1, 2])]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = chain(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2([1, 2])]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = chain(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3([1, 2])]).to.deep.equal([2, 4, 6, 8]);
    });

    it("fn", () => {
        expect([...chain([1, 2])]).to.deep.equal([1, 2]);
        const p = chain([1, 2], concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = chain([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = chain([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3]).to.deep.equal([2, 4, 6, 8]);
    });

    it("scalar", () => {
        expect(chain(concat([3, 4, 5, 6]), concat([7, 8]), max(d => d))([1, 2])).to.equal(8);
        expect(chain([1, 2], concat([3, 4, 5, 6]), concat([7, -1, 8]), min(d => d))).to.equal(-1);
    });

    it("chain-all", () => {
        const myPipeline = chain(
            map((_: Person) => ({ id: _.email, display: `The id is:  ${_}`, ageBucket: Math.round(_.age / 10) })),
            each(row => { /* do nothing */ }),
            filter(_ => _.ageBucket !== 1)
        );
        expect([...myPipeline(generate(person, 1000))]).to.have.lengthOf(1000);
    });
}); 
