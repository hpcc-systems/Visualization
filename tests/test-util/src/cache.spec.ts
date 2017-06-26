import { expect } from "chai";

import { Cache } from "@hpcc-js/util";

describe("Cache", function () {
    it("basic", function () {
        class MyClass {
            id: string;
            id2: string;

            constructor(id: string, id2: string) {
                this.id = id;
                this.id2 = id2;
            }
        }
        const myCache = new Cache<{ id: string }, MyClass>((obj) => {
            return Cache.hash([obj.id]);
        });
        expect(myCache.has({ id: "007" })).is.false;
        const tmp = myCache.get({ id: "007" }, () => {
            return new MyClass("007", "a");
        });
        expect(myCache.has({ id: "007" })).is.true;
        expect(tmp.id2).equals("a");
        const tmp2 = myCache.get({ id: "007" }, () => {
            throw new Error("Should Not Happend");
        });
        expect(tmp2.id2).equals("a");
    });
});
