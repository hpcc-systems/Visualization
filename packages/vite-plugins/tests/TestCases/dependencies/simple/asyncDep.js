define(["module", "exports"], function (module, exports) {
    // module.exports is replaced by the module value once the factory returns
    var initialExports = module.exports;
    it("test async require vars", function () {
        expect(module.id).toEqual("test/asyncDep");
        expect(initialExports).toEqual(exports);
    });

    module.exports = "asyncDep";
});
