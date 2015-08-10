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
<<<<<<< HEAD
=======

                it ("Adding widget with loadData method", function (done) {
                    var individualDiv = document.createElement("div");
                    individualDiv.setAttribute('id', path);
                    individualDiv.setAttribute('class', 'widgetElement');
                    var element = document.getElementById("testWidget");
                    element.appendChild(individualDiv);
                    element.appendChild(document.createElement("br"));
                    require([path], function (Widget) {
                        var vizWidget = new Widget()
                            .target(path)
                            .testData()
                            .render()
                        ;
                        done();
                    });
                });

                it ("Removing widget from the page", function (done) {
                    var e = document.getElementById(path);
                    e.parentNode.removeChild(e);
                    var f = document.getElementById(path);
                    assert.isNull(f, 'element removed and there are no errors');
                    done();
                });
>>>>>>> dcc34a6... Adds Null Value test
            });
        });
    });
});
