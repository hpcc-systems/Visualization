define(['dojo/has', 'foo', 'bar', 'foo/relPathTests', 'bar/relPathTests'], function (has, foo, bar, fooTests, barTests) {
	it("should load main modules from bar/main.js", function () {
		expect(foo).toEqual("bar/main");
		expect(bar).toEqual("bar/main");
	});

	it("should return correct value from toAbsMid", function () {
		expect(require.toAbsMid("foo")).toEqual("foo");
		expect(require.toAbsMid("bar")).toEqual("bar/main");
	});

	it("should run relPath tests successfully", function () {
		fooTests();
		barTests();
	});

	it("should load main module from bar/main.js at runtime", function (done) {
		var deps = [];
		deps.push("foo");
		deps.push("bar");
		require(deps, function (rtFoo, rtBar) {
			expect(rtFoo).toEqual("bar/main");
			expect(rtBar).toEqual("bar/main");
			done();
		});
	});

	if (has('dojo-config-api')) {
		it("rawConfig should specify original main path", function () {
			expect(require.rawConfig.packages.find(function (pkg) { return pkg.name === 'foo'; }).main).toEqual('../../sub/bar/main');
		});
	}
});
