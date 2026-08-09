define("exports,module,./dep".split(","), function (exports, module, dep) {
    it("should compile", function (done) {
        done();
    });

    it("require scoping", function () {
        // verify require function hasn't been renamed;
        var name = "req";
        name += "uire";
        expect(eval(name)).toEqual(require);
        expect((typeof require.toUrl)).toEqual("function");
        expect((typeof require.toAbsMid)).toEqual("function");
    });

    it("defined vars", function () {
        expect(exports).toEqual(exports);
        expect(module.id).toEqual("test/index");
    });

    it("require", function (done) {
        expect(require('test/dep')).toEqual(dep);
        var exceptionThrown;
        try {
            require('test/asyncDep');
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
        try {
            require('require,module,exports,asyncDep,test/asyncDep'.split(','), function (require, reqModule, reqExports, asyncDep) {
                expect(reqModule.id).toEqual(module.id);
                expect(reqExports).toEqual(exports);
                expect(asyncDep).toEqual("asyncDep");
                // context require
                expect(require("asyncDep")).toEqual(asyncDep);
                expect(require('test/asyncDep')).toEqual(asyncDep);
                done();
            });
        } catch (e) {
            done(e);
        }
    });

    dep.runTests();
});
