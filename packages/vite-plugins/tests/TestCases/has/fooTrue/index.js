define(["require", "dojo/has", "dojo/has!foo?./a:./b", "dojo/has!foo?:undef"], function (require, has, m1, undef) {
    it("should load true module", function (done) {
        expect(has("webpack")).toBeTruthy();
        expect(m1).toEqual("a");
        expect((typeof undef === 'undefined')).toBe(true);
        has.add("foo", false, true, true);
        try {
            require(["dojo/has!foo?./c:./d"], function (m2) {
                expect(has("foo")).toBeFalsy();
                // module should have been set at build time and not changed just because foo changed
                expect(m2).toEqual("c");
                done();
            });
        } catch (e) {
            done(e);
        }
    });
});
