import { describe, bench, test, expect } from "vitest";
import { count, concat, pipe, filter, min, max, map, each, generate, sensor, scalar, activity, IterableActivity, sort, reduce } from "../src/index.ts";
import { person, Person } from "./data.spec.ts";

describe("pipe benchmarks", () => {
    const testData = Array.from({ length: 10000 }, (_, i) => i);
    const personData = [...generate(person, 10000)];

    describe("map", () => {
        let dataflowResult: number[];
        let nativeResult: number[];

        const pipeline = pipe(map((value: number) => value * 2));
        bench("dataflow", () => {
            dataflowResult = [...pipeline(testData)];
        });

        bench("native", () => {
            nativeResult = [...testData.map(value => value * 2)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("filter", () => {
        let dataflowResult: number[];
        let nativeResult: number[];

        const pipeline = pipe(filter((value: number) => value % 2 === 0));
        bench("dataflow", () => {
            dataflowResult = [...pipeline(testData)];
        });

        bench("native", () => {
            nativeResult = [...testData.filter(value => value % 2 === 0)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("map + filter", () => {
        let dataflowResult: number[];
        let nativeResult: number[];

        const pipeline = pipe(
            map((value: number) => value * 2),
            filter((value: number) => value > 500)
        );
        bench("dataflow", () => {
            dataflowResult = [...pipeline(testData)];
        });

        bench("native", () => {
            nativeResult = [...testData.map(value => value * 2).filter(value => value > 500)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("map + filter + map", () => {
        let dataflowResult: number[];
        let nativeResult: number[];

        const pipeline = pipe(
            map((value: number) => value * 2),
            filter((value: number) => value > 500),
            map((value: number) => value + 10)
        );
        bench("dataflow", () => {
            dataflowResult = [...pipeline(testData)];
        });

        bench("native", () => {
            nativeResult = [...testData
                .map(value => value * 2)
                .filter(value => value > 500)
                .map(value => value + 10)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("max", () => {
        let dataflowResult: number;
        let nativeResult: number;

        const pipeline = pipe(scalar(max((p: Person) => p.age)));
        bench("dataflow", () => {
            dataflowResult = pipeline(personData);
        });

        bench("native", () => {
            nativeResult = Math.max(...personData.map(p => p.age));
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toBe(nativeResult);
        });
    });

    describe("min", () => {
        let dataflowResult: number;
        let nativeResult: number;

        const pipeline = pipe(scalar(min((p: Person) => p.age)));
        bench("dataflow", () => {
            dataflowResult = pipeline(personData);
        });

        bench("native", () => {
            nativeResult = Math.min(...personData.map(p => p.age));
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toBe(nativeResult);
        });
    });

    describe("sort", () => {
        let dataflowResult: Person[];
        let nativeResult: Person[];

        const pipeline = pipe(sort((a: Person, b: Person) => a.age - b.age));
        bench("dataflow", () => {
            dataflowResult = [...pipeline(personData)];
        });

        bench("native", () => {
            nativeResult = [...personData.sort((a, b) => a.age - b.age)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("reduce", () => {
        let dataflowResult: number;
        let nativeResult: number;

        const s = reduce<Person>((acc, p) => acc + p.age, 0);
        const pipeline = pipe(sensor(s));
        bench("dataflow", () => {
            [...pipeline(personData)];
            dataflowResult = s.peek();
        });

        bench("native", () => {
            nativeResult = personData.reduce((acc, p) => acc + p.age, 0);
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toBe(nativeResult);
        });
    });

    describe("complex Person pipeline", () => {
        let dataflowResult: number[];
        let nativeResult: number[];

        const pipeline = pipe(
            map((p: Person) => ({ ...p, age: p.age + 1 })),
            filter((p: Person) => p.age > 30),
            map((p: Person) => p.age),
            filter((age: number) => age < 50)
        );
        bench("dataflow", () => {
            dataflowResult = [...pipeline(personData)];
        });

        bench("native", () => {
            nativeResult = [...personData
                .map(p => ({ ...p, age: p.age + 1 }))
                .filter(p => p.age > 30)
                .map(p => p.age)
                .filter(age => age < 50)];
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
        });
    });

    describe("deeply nested pipeline with population data", () => {
        let dataflowResult: number[];
        let nativeResult: number[];
        let dfCount1: number, dfCount2: number, dfCount3: number, dfCount4: number;
        let dfCount5: number, dfCount6: number, dfCount7: number;
        let nCount1: number, nCount2: number, nCount3: number, nCount4: number;
        let nCount5: number, nCount6: number, nCount7: number;

        const deepS1 = count();
        const deepS2 = count();
        const deepS3 = count();
        const deepS4 = count();
        const deepS5 = count();
        const deepS6 = count();
        const deepS7 = count();
        const deeplyNestedPipeline = pipe(
            sensor(deepS1),
            map((p: Person) => ({ ...p, age: p.age + 1 })),
            filter(p => p.age > 20),
            sensor(deepS2),
            map((p: Person) => ({ ...p, age: p.age * 2 })),
            each((p: Person) => { /* side effect */ }),
            map((p: Person) => p.age),
            map((age: number) => age - 1),
            filter((age: number) => age % 3 === 0),
            sensor(deepS3),
            map((age: number) => age + 5),
            concat([100]),
            map((age: number) => age / 2),
            filter((age: number) => age < 50),
            sensor(deepS4),
            map((age: number) => age + 10),
            each((age: number) => { /* side effect */ }),
            map((age: number) => age * 3),
            filter((age: number) => age > 120),
            sensor(deepS5),
            map((age: number) => age - 5),
            concat([200]),
            sensor(deepS6),
            map((age: number) => age / 5),
            sort((a, b) => a - b),
            map((age: number) => Math.floor(age)),
            filter((age: number) => age < 35),
            sensor(deepS7)
        );
        bench("dataflow", () => {
            dataflowResult = [...deeplyNestedPipeline(personData)];
            dfCount1 = deepS1.peek();
            dfCount2 = deepS2.peek();
            dfCount3 = deepS3.peek();
            dfCount4 = deepS4.peek();
            dfCount5 = deepS5.peek();
            dfCount6 = deepS6.peek();
            dfCount7 = deepS7.peek();
        });

        bench("native", () => {
            let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0;
            const step1 = personData.map(p => { count1++; return p; });
            const step2 = step1
                .map(p => ({ ...p, age: p.age + 1 }))
                .filter(p => { const pass = p.age > 20; if (pass) count2++; return pass; });
            const step3 = step2
                .map(p => ({ ...p, age: p.age * 2 }))
                .map(p => { /* side effect */ return p; })
                .map(p => p.age)
                .map(age => age - 1)
                .filter(age => { const pass = age % 3 === 0; if (pass) count3++; return pass; });
            const step4 = [...step3
                .map(age => age + 5), 100]
                .map(age => age / 2)
                .filter(age => { const pass = age < 50; if (pass) count4++; return pass; });
            const step5 = step4
                .map(age => age + 10)
                .map(age => { /* side effect */ return age; })
                .map(age => age * 3)
                .filter(age => { const pass = age > 120; if (pass) count5++; return pass; });
            const step6 = step5
                .map(age => age - 5)
                .concat([200])
                .map(age => { count6++; return age; });
            nativeResult = [...step6
                .map(age => age / 5)
                .sort((a, b) => a - b)
                .map(age => Math.floor(age))
                .filter(age => { const pass = age < 35; if (pass) count7++; return pass; })];
            nCount1 = count1;
            nCount2 = count2;
            nCount3 = count3;
            nCount4 = count4;
            nCount5 = count5;
            nCount6 = count6;
            nCount7 = count7;
        });

        test("outputs are equal", () => {
            expect(dataflowResult).toEqual(nativeResult);
            expect(dfCount1).toBe(nCount1);
            expect(dfCount2).toBe(nCount2);
            expect(dfCount3).toBe(nCount3);
            expect(dfCount4).toBe(nCount4);
            expect(dfCount5).toBe(nCount5);
            expect(dfCount6).toBe(nCount6);
            expect(dfCount7).toBe(nCount7);
        });
    });
});
