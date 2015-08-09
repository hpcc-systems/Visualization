"use strict";
define(["d3", "require"], function (d3, require) {
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

                it("Adding widget to the page", function (done) {
                    this.timeout(5000);
                    setTimeout(function () {
                        var element = d3.select("#testWidget");
                        var testDiv = element.append("div")
                            .attr("class", "widgetTest")
                        ;
                        var widgetDiv = testDiv.append("div")
                            .attr("class", "widget")
                        ;
                        testDiv.append("center")
                            .attr("class", "title")
                            .text(path)
                        ;
                        require([path], function (Widget) {
                            var vizWidget = new Widget()
                                .target(widgetDiv.node())
                                .testData()
                                .render()
                            ;
                            done();
                        });
                    }, 0);
                });
            });
        });
    });
});
