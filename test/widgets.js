"use strict";
define(["require"], function (require) {
    describe("widgets", function () {
        allWidgets.forEach(function (widget) {
            var path = widget.path;
            describe(path, function () {
                var pathParts = path.split("/");
                var pathFileName = pathParts[2];
                var pathClassID = pathParts[1] + "_" + pathParts[2];

                it("require load", function (done) {
                    require([path], function (Widget) {
                        done();
                    });
                });

                it("features", function (done) {
                    var pathParts = path.split("/");
                    var className = pathParts[1] + "_" + pathParts[2];
                    require([path], function (Widget) {
                        assert.isFunction(Widget);
                        assert.isFunction(Widget.prototype.constructor, "constructor");
                        assert.isFunction(Widget.prototype.testData, "has testData");
                        assert.include(Widget.prototype._class, className, "Correct Class Name");
                        done();
                    });
                });

                it("Class Hierarchy", function (done) {
                    require(["src/common/Widget", path], function (Widget, TestWidget) {
                        var proto = TestWidget.prototype;
                        while (proto) {
                            var className = getClassName(proto);
                            var constructorName = getContructorName(proto);
                            assert.equal(className, constructorName);
                            if (className === "Widget") {
                                break;
                            }
                            proto = proto.__proto__;
                        }
                        done();
                    });
                });

                it("Clone Palette", function (done) {
                    require([path], function (Widget) {
                        if (typeof(Widget.prototype.paletteID) === "function") {
                            assert.isFunction(Widget.prototype.useClonedPalette, 'has useClonedPalette');
                        }
                        done();
                    });
                });
            });
        });
    });

    function getContructorName(__prototype) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(__prototype.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    function getClassName(__prototype) {
        var classParts = __prototype.classID().split("_");
        return classParts[classParts.length - 1];
    };
});
