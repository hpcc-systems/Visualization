define(["dojo/query!css2"], function(engine) {
	it("should load the specified selector engine" , function() {
		expect("css2").toEqual(engine);
		expect(require("dojo/query!css2")).toEqual(engine);
	});
});
