import { describe, it, expect } from "vitest";
import { count, concat, pipe, filter, min, max, map, each, generate, sensor, scalar, activity, IterableActivity, sort } from "../src/index.ts";
import { person, Person, population } from "./data.spec.ts";

describe("pipe", () => {
    it("should create a reusable pipeline generator that can be applied to different data sources", () => {
        const p = pipe(concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p([1, 2])]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = pipe(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2([1, 2])]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = pipe(concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3([1, 2])]).to.deep.equal([2, 4, 6, 8]);
    });

    it("should create a pipeline with a fixed data source and multiple activities", () => {
        expect([...pipe([1, 2])]).to.deep.equal([1, 2]);
        const p = pipe([1, 2], concat([3, 4, 5, 6]), concat([7, 8]));
        expect([...p]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
        const p2 = pipe([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]));
        expect([...p2]).to.deep.equal([2, 4, 6, 7, 8]);
        const p3 = pipe([1, 2], concat([3, 4, 5, 6]), filter(i => i % 2 === 0), concat([7, 8]), filter(i => i % 2 === 0));
        expect([...p3]).to.deep.equal([2, 4, 6, 8]);
    });

    it("should support observer activities that aggregate results within a pipeline", () => {
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

    it("should return a single scalar value when using scalar() with observers", () => {
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

    it("should execute a complex pipeline with sensors tracking data flow at multiple stages", () => {
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

    it("should allow sensors to observe data at different pipeline stages without modifying the flow", () => {
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

    it("should handle pipelines with a large number of chained activities (1024+)", () => {
        const activityCount = 1024;
        const activities = Array.from(
            { length: activityCount },
            () => map((value: number) => value + 1)
        ) as [IterableActivity<number, number>, ...IterableActivity<number, number>[]];
        const pipeline = pipe(...activities) as IterableActivity<number, number>;
        const result = [...pipeline([0])];
        expect(result).to.deep.equal([activityCount]);
    });

    it("should correctly process complex pipelines with numerous diverse activity types", () => {
        const s1 = count();
        const s2 = count();
        const s3 = count();
        const s4 = count();
        const s5 = count();
        const s6 = count();
        const s7 = count();
        const pipeline = pipe(
            sensor(s1),
            map((p: Person) => ({ ...p, age: p.age + 1 })),
            filter(p => p.age > 20),
            sensor(s2),
            map((p: Person) => ({ ...p, age: p.age * 2 })),
            each((p: Person) => { /* side effect */ }),
            map((p: Person) => p.age),
            map((age: number) => age - 1),
            filter((age: number) => age % 3 === 0),
            sensor(s3),
            map((age: number) => age + 5),
            concat([100]),
            map((age: number) => age / 2),
            filter((age: number) => age < 50),
            sensor(s4),
            map((age: number) => age + 10),
            each((age: number) => { /* side effect */ }),
            map((age: number) => age * 3),
            filter((age: number) => age > 120),
            sensor(s5),
            map((age: number) => age - 5),
            concat([200]),
            sensor(s6),
            map((age: number) => age / 5),
            sort((a, b) => a - b),
            map((age: number) => Math.floor(age)),
            filter((age: number) => age < 35),
            sensor(s7)
        );
        const inData = population;
        const result = [...pipeline(inData)];
        expect(result.length).to.be.greaterThan(0);
        expect(s1.peek()).to.equal(inData.length);
        expect(s2.peek()).to.equal(932);
        expect(s3.peek()).to.equal(286);
        expect(s4.peek()).to.equal(180);
        expect(s5.peek()).to.equal(142);
        expect(s6.peek()).to.equal(s5.peek() + 1);
        expect(s7.peek()).to.equal(result.length);
        expect(result[0]).to.be.a("number");
    });

    it("should efficiently process large datasets with thousands of items", () => {
        const itemCount = 20000;
        const pipeline = pipe(map((value: number) => value * 2));
        const result = [...pipeline(Array.from({ length: itemCount }, (_, i) => i))];
        expect(result).to.have.lengthOf(itemCount);
        expect(result[0]).to.equal(0);
        expect(result[itemCount - 1]).to.equal((itemCount - 1) * 2);
    });

    it("should return the source data unchanged when no activities are provided", () => {
        const data = [1, 2, 3];
        const result = pipe(data);
        expect(result).to.equal(data);
    });

    it("should pass through data unchanged when an empty activities array is provided", () => {
        // This tests the pipeGen empty activities case
        const data = [1, 2, 3];
        const identity = pipe(data);
        expect([...identity]).to.deep.equal([1, 2, 3]);
    });

    it("should throw a TypeError when invoked without any arguments", () => {
        expect(() => (pipe as any)()).to.throw(TypeError, "pipe requires at least one argument");
    });
});
