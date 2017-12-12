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

    let funcHalfSecCallCount = 0;
    const funcHalfSec = debounce(async (): Promise<number> => {
        ++funcHalfSecCallCount;
        console.log(`funcHalfSec - ${funcHalfSecCallCount}`);
        return 42;
    }, 500);

    it("0.5 sec timeout", async function (): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const startTime = Date.now();
            funcHalfSec();
            const interval = setInterval(() => {
                funcHalfSec();
                const elapsed = Date.now() - startTime;
                console.log(`elapsed - ${elapsed}`);
                if (elapsed > 1500) {
                    expect(funcHalfSecCallCount).to.equal(4);
                    clearInterval(interval);
                    resolve();
                } else if (elapsed > 1000) {
                    expect(funcHalfSecCallCount).to.equal(3);
                } else if (elapsed > 500) {
                    expect(funcHalfSecCallCount).to.equal(2);
                } else {
                    expect(funcHalfSecCallCount).to.equal(1);
                }
            }, 175);
        });
    });

    let funcNoTimeoutCount = 0;
    const funcNoTimeout = debounce((): Promise<number> => {
        return new Promise<number>((resolve, reject) => {
            ++funcNoTimeoutCount;
            resolve(42);
        });
    });

    it("no timeout", async function (): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            funcNoTimeout();
            expect(funcNoTimeoutCount).to.equal(1);
            funcNoTimeout();
            expect(funcNoTimeoutCount).to.equal(1);
            funcNoTimeout();
            expect(funcNoTimeoutCount).to.equal(1);
            funcNoTimeout();
            expect(funcNoTimeoutCount).to.equal(1);
            funcNoTimeout();
            expect(funcNoTimeoutCount).to.equal(1);
            setTimeout(() => {
                funcNoTimeout();
                expect(funcNoTimeoutCount).to.equal(2);
                resolve();
            }, 0);
        });
    });
});
