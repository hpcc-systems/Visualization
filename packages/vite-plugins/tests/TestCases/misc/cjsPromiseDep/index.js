const promiseModule = require("./promiseDep");

it("cjs require should return a promise value", async function () {
    const wrappedPromise = promiseModule && (promiseModule.default || promiseModule.__DOJO_WEBPACK_PROMISE_VALUE__) || promiseModule;
    const value = await Promise.resolve(wrappedPromise);
    expect(value).toBe("Done!");
});