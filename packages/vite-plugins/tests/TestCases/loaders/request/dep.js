define(["dojo/request/default!"], function (request) {
    it("should load request/xhr", function () {
        expect("dojo/request/xhr").toEqual(request);
        expect(require("dojo/request/default!")).toEqual(request);
        expect(require("dojo/request/xhr")).toEqual(request);
    });
});
