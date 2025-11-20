import { describe, it, expect } from "vitest";
import { each, join, map, normalize } from "../src/index.ts";
import { Person, population } from "./data.spec.ts";;

interface PersonEx extends Person {
    normalizedAge: number;
}

describe("join", () => {
    it("should join normalized ages with person data", () => {
        const extractAge = map<Person, number>(row => row.age);
        const normalizeFn = normalize();
        const joinNormalizeAges = join(normalizeFn(extractAge(population)), (row: Person, age: number): PersonEx => ({ ...row, normalizedAge: age }));
        const doTest = each(row => {
            expect(row.normalizedAge).to.be.greaterThanOrEqual(0);
            expect(row.normalizedAge).to.be.lessThanOrEqual(1);
        });
        [...doTest(joinNormalizeAges(population))];
    });

    it("should join with generator as second source", () => {
        function* gen() {
            yield 10;
            yield 20;
            yield 30;
        }
        const result = [...join(gen(), (a: number, b: number) => a + b)([1, 2, 3])];
        expect(result).to.deep.equal([11, 22, 33]);
    });
});
