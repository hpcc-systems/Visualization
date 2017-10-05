import { expect } from "chai";

import { debounce } from "@hpcc-js/util";

describe("debounce", function () {
    let funcCallCount = 0;

    const func = debounce(async (): Promise<number> => {
        ++funcCallCount;
        return 42;
    });

    it("basic", async function (): Promise<void> {
        expect(debounce).to.exist;
        for (let i = 0; i < 100; ++i) {
            func().then(val => {
                expect(funcCallCount).to.equal(1);
            });
        }
        for (let i = 1; i < 100; ++i) {
            await func().then(val => {
                expect(funcCallCount).to.equal(i);
                expect(val).to.equal(42);
            });
        }
        expect(funcCallCount).to.equal(99);
    });

    let func1SecCallCount = 0;
    const func1Sec = debounce(async (): Promise<number> => {
        console.log("aaa");
        ++func1SecCallCount;
        return 42;
    }, 1000);

    it("1 sec timeout", async function (): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const startTime = Date.now();
            func1Sec();
            const interval = setInterval(() => {
                console.log("bbb");
                func1Sec();
                if (Date.now() - startTime > 1000) {
                    console.log("ddd");
                    clearInterval(interval);
                    expect(func1SecCallCount).to.be.greaterThan(1);
                    resolve();
                } else {
                    console.log("ccc");
                    expect(func1SecCallCount).to.equal(1);
                }
            }, 101);
        });
    });
});
