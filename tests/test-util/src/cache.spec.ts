import { expect } from "chai";

import { AsyncCache, Cache } from "@hpcc-js/util";

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

describe("AsyncCache", function () {
    it("basic", async function () {
        class MyClass {
            id: string;
            id2: string;
            val: string = "";

            constructor(id: string, id2: string) {
                this.id = id;
            }

            async refresh(): Promise<string> {
                return new Promise<string>(resolve => {
                    setTimeout(() => {
                        this.val = "done";
                        resolve("done");
                    }, 1000);
                });
            }
        }
        const myCache = new AsyncCache<{ id: string }, MyClass>((obj: { id: string; }) => {
            return Cache.hash([obj.id]);
        });
        expect(myCache.has({ id: "007" })).is.false;
        let callbackCount = 0;
        const promises = [];
        for (let i = 0; i < 10; ++i) {
            promises.push(myCache.get({ id: "007" }, async () => {
                const retVal = new MyClass("007", "a");
                await retVal.refresh();
                ++callbackCount;
                return retVal;
            }));
        }
        expect(callbackCount).to.equal(0);
        expect(myCache.has({ id: "007" })).is.true;
        expect(myCache.has({ id: "008" })).is.false;
        myCache.get({ id: "007" }).then(item => {
            expect(item).to.be.not.null;
            expect(item!.val === "done");
        });
        myCache.get({ id: "008" }).then(item => {
            expect(item).to.be.null;
        });
        const resolved = await Promise.all(promises);
        myCache.get({ id: "007" }).then(item => {
            expect(item).to.be.not.null;
            expect(item!.val === "done");
        });
        myCache.get({ id: "008" }).then(item => {
            expect(item).to.be.null;
        });
        expect(callbackCount).to.equal(1);
        expect(resolved[3].val).to.equal("done");
    });
});
