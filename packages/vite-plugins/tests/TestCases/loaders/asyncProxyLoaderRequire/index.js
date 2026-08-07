define(["test/asyncPlugin!foo/content.txt", "test/asyncPlugin!./content.txt", "test/asyncPlugin!"], function (content1, content2, content3) {
    it("should load the resource name as the content", async function () {
        expect(await content1).toBe("Name = foo/content.txt");
        expect(await content2).toBe("Name = test/content.txt");
        expect(await content3).toBe("Name = ");
    });
});