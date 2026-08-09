define([], function () {
    it("should resolve path from loader config", function () {
        expect(require.toUrl('foo/bar')).toMatch(/foo\/bar\.js$/);
    });
});