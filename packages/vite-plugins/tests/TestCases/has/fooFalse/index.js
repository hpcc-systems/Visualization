define(["require", "dojo/has", "dojo/has!foo?./a:./b", "dojo/has!foo?undef"], function (require, has, m1, undef) {

    it("should load false module", function (done) {
        expect(has("webpack")).toBeTruthy();
        expect(has("foo")).toBeFalsy();
        expect(m1).toEqual("b");
        expect((typeof undef === 'undefined')).toBe(true);
        has.add("foo", true, true, true);
        try {
            require(["dojo/has!foo?./c:./d"], function (m2) {
                // module should have been set at build time and not changed just because foo changed
                expect(has("foo")).toBeTruthy();
                expect(m2).toEqual("d");
                done();
            });
        } catch (e) {
            done(e);
        }
    });
});
