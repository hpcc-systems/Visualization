
function hasFn(loaderGlobal) {
	loaderGlobal.fooRead = true;
	return "foo" in loaderGlobal && loaderGlobal.foo;
}
define(["dojo/has"], function(has) {
	it ("should read global props in object passed to has function, but not reflect changes back to global object", function() {
		has.add("foo", hasFn, false, true);
		global.foo = "bar";
		// Test that global props appear in the object passed to has function
		expect(has("foo")).toEqual("bar");
		// test context isolation
		expect(global.fooRead).toBeUndefined();
	});
});
