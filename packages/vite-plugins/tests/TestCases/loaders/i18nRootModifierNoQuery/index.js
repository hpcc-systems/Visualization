define(["./strings"], function (strings) {
    it("should load the strings without a root", function () {
        expect(strings.hello).toBe("hello");
    });
});