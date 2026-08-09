define(["test/a"], function (a) {
    it("should successfully undefine the module and then load it again using global require with " + require.rawConfig.testCase, function (done) {
        expect(a.label).toEqual("a");
        expect(require("a")).toEqual(a);
        require.undef("a");
        try {
            require("a");
            return done(new Error("Shouldn't get here"));
        } catch (e) { }
        require(["a"], function (_a) {
            try {
                expect(a).toEqual(_a);
                expect(_a).toBe(a);
                require.undef("a");
                try {
                    require("./a");
                    return done(new Error("Shouldn't get here"));
                } catch (e) { }
                var dep = "a";
                require([dep], function (__a) {
                    expect(a).toEqual(__a);
                    try {
                        expect(__a).toBe(a);
                        expect(__a).toBe(_a);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            } catch (e) {
                done(e);
            }
        });
    });
});
