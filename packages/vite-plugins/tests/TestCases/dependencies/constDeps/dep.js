define("module,exports".split(","), function(module, exports) {
	exports.runTests = function() {
		it("defined vars", function(done) {
			expect(module.exports).toEqual(exports);
			expect(module.id).toEqual("test/dep");
			done();
		});
	};
});
