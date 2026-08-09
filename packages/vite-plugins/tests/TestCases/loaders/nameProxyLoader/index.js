define(["namePlugin!Fred", "namePlugin!Bob"], function (helloFred, helloBob) {
    it("should load the text with the name specified in the plugin", function () {
        expect(helloFred.replace(/[\r\n]*/g, "")).toEqual("Hello, my name is Fred.");
        expect(helloBob.replace(/[\r\n]*/g, "")).toEqual("Hello, my name is Bob.");
    });
});
