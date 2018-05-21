import { PropertyExt } from "@hpcc-js/common";
import { expect } from "chai";

class TestClass extends PropertyExt {
}

interface TestClass {
    str(): string;
    str(_: string): this;
    str_default(): string;
    str_default(_: string): this;
    str_exists(): boolean;
    str_modified(): boolean;
    str_reset(): void;
}
TestClass.prototype.publish("str", "SomeStr", "string", "Test String");
TestClass.prototype.publish("num", 42, "number", "Test Number");
TestClass.prototype.publish("numZero", 0, "number", "Test Number");
TestClass.prototype.publish("optStr1", "", "string", "Optional String", undefined, { optional: true });
TestClass.prototype.publish("optStr2", null, "string", "Optional String", undefined, { optional: true });
TestClass.prototype.publish("optStr3", undefined, "string", "Optional String", undefined, { optional: true });

describe("@hpcc-js/common", () => {
    describe.only("PropertyExt", () => {
        function testProp(propID: string, defValue: any, newValue: any) {
            const testClass: any = new TestClass();
            expect(testClass[propID + "_modified"](), `${propID}: 1`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 2`).to.be.true;
            expect(testClass[propID](), `${propID}: 3`).to.equal(defValue);
            expect(testClass[propID + "_default"](), `${propID}: 4`).to.equal(defValue);
            testClass[propID + "_reset"]();
            expect(testClass[propID + "_modified"](), `${propID}: 5`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 6`).to.be.true;
            expect(testClass[propID](), `${propID}: 7`).to.equal(defValue);
            expect(testClass[propID + "_default"](), `${propID}: 8`).to.equal(defValue);
            testClass[propID](newValue);
            expect(testClass[propID + "_modified"](), `${propID}: 9`).to.be.true;
            expect(testClass[propID + "_exists"](), `${propID}: 10`).to.be.true;
            expect(testClass[propID](), `${propID}: 11`).to.equal(newValue);
            expect(testClass[propID + "_default"](), `${propID}: 12`).to.equal(defValue);
            testClass[propID + "_reset"]();
            expect(testClass[propID + "_modified"](), `${propID}: 13`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 14`).to.be.true;
            expect(testClass[propID](), `${propID}: 15`).to.equal(defValue);
            expect(testClass[propID + "_default"](), `${propID}: 16`).to.equal(defValue);
            testClass[propID](defValue);
            expect(testClass[propID + "_modified"](), `${propID}: 17`).to.be.true;
            expect(testClass[propID + "_exists"](), `${propID}: 18`).to.be.true;
            expect(testClass[propID](), `${propID}: 19`).to.equal(defValue);
            expect(testClass[propID + "_default"](), `${propID}: 20`).to.equal(defValue);
        }
        it("Basic String", () => {
            testProp("str", "SomeStr", "Some Other Str");
        });
        it("Basic Number", () => {
            testProp("num", 42, 48);
        });
        it("Zero Default Number", () => {
            testProp("numZero", 0, 48);
        });
        function testOptional(propID: string, exists: boolean) {
            const testClass: any = new TestClass();
            expect(testClass[propID + "_modified"](), `${propID}: 1`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 2`).to.equal(exists);
            testClass[propID + "_reset"]();
            expect(testClass[propID + "_modified"](), `${propID}: 3`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 4`).to.equal(exists);
            testClass[propID]("someStr");
            expect(testClass[propID + "_modified"](), `${propID}: 5`).to.be.true;
            expect(testClass[propID + "_exists"](), `${propID}: 6`).to.be.true;
            testClass[propID + "_reset"]();
            expect(testClass[propID + "_modified"](), `${propID}: 7`).to.be.false;
            expect(testClass[propID + "_exists"](), `${propID}: 8`).to.equal(exists);
        }
        it("Optional", () => {
            testOptional("optStr1", false);
            testOptional("optStr2", false);
            testOptional("optStr3", false);
        });
    });
});
