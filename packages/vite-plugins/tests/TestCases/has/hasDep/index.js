define(["dojo/has!foo?:./a"], function(m1) {
  it("should load true module", function() {
    expect(m1).toEqual("a");
  });
});
