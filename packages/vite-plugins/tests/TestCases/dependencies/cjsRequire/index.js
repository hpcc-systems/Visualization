/* global cjsRequire */
const cjsRequire = require;
define(["./amdModule"], function (amd) {
    it("should load CommonJS modules using cjsRequire", function (done) {
        try {
            amd.should.be.eql("amd");
            cjsRequire("./cjsModule1").should.be.eql("cjs1");
            require(["asyncDep"], function () {
                done();
            });
        } catch (e) {
            done(e);
        }
    });
});