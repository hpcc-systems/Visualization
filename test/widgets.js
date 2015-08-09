"use strict";
define(["require"], function (require) {
    describe("widgets", function () {
        allWidgets.forEach(function (widget) {
            var path = widget.path;
            describe(path, function () {
                it("require load", function (done) {
                    require([path], function (Widget) {
                        done();
                    });
                });

                it("features", function (done) {
                    require([path], function (Widget) {
                        assert.isFunction(Widget);
                        assert.isFunction(Widget.prototype.constructor, "constructor");
                        assert.isFunction(Widget.prototype.testData, "has testData");
                        done();
                    });
                });
            });
        });
    });
});
