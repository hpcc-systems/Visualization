define(["module"], function (module) {
    var result = {
        runTests: function () {
            it("module.id", function () {
                expect(module.exports).toEqual(result);
                expect(module.id).toEqual("test/dep");
            });
        }
    };
    return result;
});
