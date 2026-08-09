define(['dojo/has', 'has!a?test/a', 'has!b?test/b'], function(has, a, b) {
	it('should load or not load a according to has condition but always load b', function() {
		if (has('a')) {
			expect(a.label).toEqual("a");
		} else {
			expect((typeof a)).toEqual('undefined');
		}
		expect(b.label).toEqual("b");
	});
});