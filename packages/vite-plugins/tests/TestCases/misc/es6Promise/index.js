define(['amd/dojoES6Promise.js'], function (Promise) {
    function makePromise1() {
        return new Promise(function (resolve) {
            window.setTimeout(function () {
                resolve("resolve1");
            }, 10);
        });
    }

    it("Promise should resolve.", async function () {
        const data = await new Promise(function (resolve) {
            window.setTimeout(function () {
                resolve("resolve");
            }, 10);
        });
        expect(data).toBe("resolve");
    });

    it("Promise should reject.", async function () {
        await new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                reject(new Error("rejected"));
            }, 10);
        }).catch(function (err) {
            expect(err.message).toBe("rejected");
        });
    });

    it("Promise.resolve should return resolved promise", async function () {
        var check = false;
        const data = await Promise.resolve("resolved");
        check = true;
        expect(data).toBe("resolved");
        expect(check).toBe(true);
    });

    it("Promise.reject should return a rejected promise", async function () {
        var check = false;
        await Promise.reject(new Error("rejected")).catch(function (err) {
            check = true;
            expect(err.message).toBe("rejected");
        });
        expect(check).toBe(true);
    });

    describe("Test race/all", function () {
        it("Promise.race should resolve correctly", async function () {
            var promise2 = new Promise(function () { });
            const data = await Promise.race([makePromise1(), promise2]);
            expect(data).toBe("resolve1");
        });

        it("Promise.race should resolve correctly with non-promise entry", async function () {
            const data = await Promise.race([makePromise1(), "resolve2"]);
            expect(data).toBe("resolve2");
        });

        it("Promise.all should resolve correctly", async function () {
            var promise2 = new Promise(function (resolve) {
                window.setTimeout(function () {
                    resolve("resolve2");
                }, 100);
            });
            const data = await Promise.all([makePromise1(), promise2, "resolve3"]);
            expect(data[0]).toBe("resolve1");
            expect(data[1]).toBe("resolve2");
            expect(data[2]).toBe("resolve3");
        });
    });

    it("Promise.finally should be called on resolved promises", async function () {
        var check = false, cbCalled = false;
        await Promise.resolve("resolved")
            .then(function (data) {
                cbCalled = true;
                expect(data).toBe("resolved");
                expect(check).toBe(true);
            })
            .finally(function () {
                expect(cbCalled).toBe(true);
            });
        check = true;
    });

    it("Promise.finally should be called on rejected promises", async function () {
        var check = false, cbCalled = false;
        await Promise.reject(new Error("rejected"))
            .catch(function (err) {
                cbCalled = true;
                expect(err.message).toBe("rejected");
                expect(check).toBe(true);
            })
            .finally(function () {
                expect(cbCalled).toBe(true);
            });
        check = true;
    });

    it("Promise.finally should be called when it's the only handler", async function () {
        var check = false;
        const promise = Promise.resolve("resolved").finally(function () {
            expect(check).toBe(true);
        });
        check = true;
        await promise;
    });

    it("Promise callback should be invoked asynchronously by resolver", async function () {
        var resolver, check = false;
        var promise = new Promise(function (resolve) {
            resolver = resolve;
        });
        const received = promise.then(function (data) {
            expect(data).toBe("resolved");
            expect(check).toBe(true);
        });
        resolver("resolved");
        check = true;
        await received;
    });

});
