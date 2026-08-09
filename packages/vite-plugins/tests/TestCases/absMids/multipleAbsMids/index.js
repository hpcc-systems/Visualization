define(["a1"], function (a1) {
    it("should resolve all aliases to same module", function () {
        a1.should.be.eql("a");
        require("a").should.be.eql(a1);
        require("a2").should.be.eql(a1);
    });
});