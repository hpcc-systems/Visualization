define(["foo", "fooalias", "dojo/_base/lang"], function (foo, fooalias) {
    it("should load foo", function () {
        foo.should.be.eql("foo");
        fooalias.should.be.eql("foo");
    });
    it("should resolve foo from environment", function () {
        expect(require.toUrl("foo")).toMatch(/foo\.js$/);
    });
    it("should resolve dojo runtime path", function () {
        expect(require.toUrl("dojo/_base/lang")).toMatch(/dojo\/_base\/lang\.js$/);
    });
});