define(['require', '.'], function (require, main) {
    return function () {
        expect(main).toEqual("bar/main");
        expect(require('.')).toEqual("bar/main");
    };
});