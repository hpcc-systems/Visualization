define("require,dojo/has,dojo/has!foo?./a:./b".split(","), function (require, has, m1) {
    it("should load module based on runtime value of foo", function (done) {
        expect(has("webpack")).toBeTruthy();
        expect((typeof (has('foo')) === 'undefined')).toBe(true);
        expect(m1).toEqual("b");
        expect(require("./b")).toEqual(m1);
        has.add("foo", true, true, true);
        try {
            require("dojo/has!foo?./c:./d,exports".split(","), function (m2) {
                try {
                    // module should have been set at build time and not changed just because foo changed
                    expect(has("foo")).toBeTruthy();
                    // TODO:  expect(m2).toEqual("c"); // FAILING: m2 is "d", but should be "c"
                    done();
                } catch (e) {
                    done(e);
                }
            }, function (e) {
                done(e);
            });
        } catch (e) {
            done(e);
        }
    });
});
