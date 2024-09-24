import { expect } from "chai";
import { each, join, map, normalize } from "@hpcc-js/dataflow";
import { Person, population } from "./data.ts";

interface PersonEx extends Person {
    normalizedAge: number;
}

describe("join", () => {
    it("normalize", () => {
        const extractAge = map<Person, number>(row => row.age);
        const normalizeFn = normalize();
        const joinNormalizeAges = join(normalizeFn(extractAge(population)), (row: Person, age: number): PersonEx => ({ ...row, normalizedAge: age }));
        const doTest = each(row => {
            expect(row.normalizedAge).to.be.greaterThanOrEqual(0);
            expect(row.normalizedAge).to.be.lessThanOrEqual(1);
        });
        [...doTest(joinNormalizeAges(population))];
    });
});
