define([], function () {
	it("should access global require", function () {
		let req;
		req = require;
		expect((typeof req)).toEqual('function');
		expect((typeof window["require"])).toEqual('function');
	});
});
