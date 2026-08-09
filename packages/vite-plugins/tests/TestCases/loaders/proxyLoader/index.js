define(["./addHeaderPlugin!./content.txt"], function (contentWithHeader) {
    it("should add header to content", function () {
        expect("Header\ncontent").toEqual(contentWithHeader);
    });
});
