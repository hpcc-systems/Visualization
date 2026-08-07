define(["require", "test/a"], function(require, a) {
	it("should compile", function(done) {
		done();
	});
	it("should load the module specified as a variable", function(done) {
		try {
			expect(a).toEqual("a");
			var avar = "test/a";
			var count = 3;
			function getVar() {
				return "test/a";
			}
			require([avar, "test/b"], function(_a, b) {
				expect((a === _a)).toBe(true);
				expect(b.b).toEqual("b");
				expect(b.a).toEqual("a");
				if (--count === 0) done();
			});
			avar = "./a";
			require([avar, "./b"], function(_a, b) {
				expect((a === _a)).toBe(true);
				expect(b.b).toEqual("b");
				expect(b.a).toEqual("a");
				if (--count === 0) done();
			});
			require([getVar(), "./b"], function(_a, b) {
				expect((a === _a)).toBe(true);
				expect(b.b).toEqual("b");
				expect(b.a).toEqual("a");
				if (--count === 0) done();
			});
		} catch(e) {
			done(e);
		}
	});
});