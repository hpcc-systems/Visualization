define("named1", [], function() {
	return "named1";
});

define("named2", [], function() {
	return "named2";
});

define("named3", [], function() {
	return "named3";
});

define("named4", [], function() {
	return "named4";
});

define(["named1", "named2"], function(named1, named2) {
	it("should load the named modules in defined dependencies", function() {
		expect("named1").toEqual(named1);
		expect("named2").toEqual(named2);
	});

	it("should load the named modules in require dependencies", function(done) {
		try {
			require(["named3", "named4"], function (named3, named4) {
				expect("named3").toEqual(named3);
				expect("named4").toEqual(named4);
				done();
			});
		} catch(e) {
			done(e);
		}
	});
});
