define(["./content.txt"], function (contentWithHeader) {
    it("should add header to content", function () {
        expect(contentWithHeader).toMatch(/^data:text\/plain;base64,/);
    });
});
