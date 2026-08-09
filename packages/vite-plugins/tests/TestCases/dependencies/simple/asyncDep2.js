define(["module", "exports"], function (module, exports) {
    // module.exports is replaced by the module value once the factory returns
    var initialExports = module.exports;
    it("test async require vars", function (done) {
        expect(module.id).toEqual("test/asyncDep2");
        expect(initialExports).toEqual(exports);
        done();
    });

    return "asyncDep2";
});
