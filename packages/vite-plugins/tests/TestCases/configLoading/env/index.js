define(["foo", "fooalias"], function (foo, fooalias) {
    it("should load foo", function () {
        foo.should.be.eql("foo");
        fooalias.should.be.eql("foo");
    });
    it("should resolve foo from environment", function () {
        expect(require.toUrl("foo")).toMatch(/foo\.js$/);
    });
});