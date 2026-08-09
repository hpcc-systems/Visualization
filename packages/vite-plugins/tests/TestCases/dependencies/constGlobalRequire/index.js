define("require".split(','), function (req) {
	it("should load dep from global context", function (done) {
		require("./asyncDep,asyncDep".split(','), function (asyncDep1, asyncDep2) {
			try {
				expect(asyncDep1).toEqual("global asyncDep");
				expect(asyncDep2).toEqual("local asyncDep");
				expect(require("./asyncDep")).toEqual("global asyncDep");
				expect(require("asyncDep")).toEqual("local asyncDep");
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	it("should load dep from local context", function (done) {
		req("./asyncDep,asyncDep".split(','), function (asyncDep1, asyncDep2) {
			try {
				expect(asyncDep1).toEqual("local asyncDep");
				expect(asyncDep2).toEqual("local asyncDep");
				expect(req("./asyncDep")).toEqual("local asyncDep");
				expect(req("../test/asyncDep")).toEqual("local asyncDep");
				expect(req("asyncDep")).toEqual("local asyncDep");
				done();
			} catch (e) {
				done(e);
			}
		});
	});
});
