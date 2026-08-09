define(["./subdir/a", "./subdir/b"], function (a, b) {
    it("should load dependency relative to module b", function (done) {
        b.loadc(function (c) {
            try {
                expect(c).toEqual("test/subdir/c");
                done();
            } catch (e) {
                done(e);
            }
        });
    });
    it("should load dependency relative to baseUrl", function (done) {
        a.loadc(function (c) {
            try {
                expect(c).toEqual("test/c");
                done();
            } catch (e) {
                done(e);
            }
        });
    });

});