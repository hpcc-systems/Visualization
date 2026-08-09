define(['dojo/has'], function (has) {
	var loaderGlobal;
	has.add('foo', function (global) {
		loaderGlobal = global;
	}, true, true);
	it("should define window and global properties on global object", function () {
		expect(loaderGlobal).toBeDefined();
		expect(loaderGlobal.global).toBeDefined();
		expect(loaderGlobal.window).toBeDefined();
	});
	it("should reflect global properties in loader global but no the other way around", function () {
		delete global.foo;
		delete loaderGlobal.foo;
		expect(global.foo).toBeUndefined();
		expect(loaderGlobal.foo).toBeUndefined();
		global.foo = "bar";
		expect(global.foo).toBe("bar");
		expect(loaderGlobal.foo).toBe("bar");
		loaderGlobal.foo = "baz";
		expect(global.foo).toBe("bar");
		expect(loaderGlobal.foo).toBe("baz");
	});
});