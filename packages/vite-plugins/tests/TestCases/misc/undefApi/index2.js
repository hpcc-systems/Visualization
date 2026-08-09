define(["require", "./a"], function (req, a) {
    it("global and context require.undef should be undefined", function () {
        expect(a.label).toEqual("a");
        expect((typeof require.undef)).toEqual("undefined");
        expect((typeof req.undef)).toEqual("undefined");
    });
});
