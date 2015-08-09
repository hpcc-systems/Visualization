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

                it ("Adding widget without loadData method", function (done) {
                    var individualDiv = document.createElement("div");
                    individualDiv.setAttribute('id', path);
                    individualDiv.setAttribute('class', 'widgetElement anmol');
                    var element = document.getElementById("testWidget");
                    var content = document.createTextNode(path);
                    individualDiv.appendChild(content);
                    element.appendChild(individualDiv);
                    element.appendChild(document.createElement("br"));
                    require([path], function (Widget) {
                        var vizWidget = new Widget()
                            .target(path)
                            .render()
                        ;
                        done();
                    });
                });
            });
        });
    });
});
