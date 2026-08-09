define(["./selector/_loader!"], function (selector) {
    it("should load selector/lite", function () {
        expect("test/selector/lite").toEqual(selector);
        expect(require("test/selector/_loader!")).toEqual(selector);
        expect(require("test/selector/lite")).toEqual(selector);
    });
});
