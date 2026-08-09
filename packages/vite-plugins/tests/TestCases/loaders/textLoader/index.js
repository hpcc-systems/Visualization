define(["require", "dojo/text!test/hello.txt"], function(require, hello) {
	it("should load text files" , function() {
		expect("hello").toEqual(hello);
		expect(require("dojo/text!./hello.txt")).toEqual(hello);
	});
});
