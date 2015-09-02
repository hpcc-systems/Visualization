"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/Utility", "require"], factory);
    } else {
        root.widgets = factory(root.d3, root.common_Utility, root.require);
    }
}(this, function (d3, Utility, require) {
    var params = Utility.urlParams();
    var someWidgets = [];
    for (var key in params) {
        if (params[key] === undefined) {
            someWidgets.push({ path: key });
        }
    }
    describe("widgets", function () {
        this.timeout(10000);
        var allWidgets = [
            { path: "src/common/FAChar" },
            { path: "src/common/Icon" },
            { path: "src/common/List" },
            { path: "src/common/Menu" },
            { path: "src/common/ResizeSurface" },
            { path: "src/common/Shape" },
            { path: "src/common/Surface" },
            { path: "src/common/Text" },
            { path: "src/common/TextBox" },
            { path: "src/chart/Area" },
            { path: "src/chart/Bubble" },
            { path: "src/chart/Column" },
            { path: "src/chart/Line" },
            { path: "src/chart/MultiChart" },
            { path: "src/chart/MultiChartSurface" },
            { path: "src/chart/Pie" },
            { path: "src/chart/Scatter" },
            { path: "src/chart/Step" },
            { path: "src/chart/Summary" },
            { path: "src/form/Form" },
            { path: "src/form/Input" },
            { path: "src/form/Slider" },
            { path: "src/map/ChoroplethCounties" },
            { path: "src/map/ChoroplethCountries" },
            { path: "src/map/ChoroplethStates" },
            { path: "src/map/ChoroplethStatesHeat" },
            { path: "src/map/GMap" },
            { path: "src/map/GMapHeat" },
            { path: "src/map/GMapGraph" },
            { path: "src/tree/CirclePacking" },
            { path: "src/tree/Dendrogram" },
            { path: "src/tree/SunburstPartition" },
            { path: "src/graph/Edge" },
            { path: "src/graph/Graph" },
            { path: "src/graph/Vertex" },
            { path: "src/other/HeatMap" },
            { path: "src/other/MorphText" },
            { path: "src/other/Table" },
            { path: "src/other/WordCloud" },
            { path: "src/layout/AbsoluteSurface" },
            { path: "src/layout/Border" },
            { path: "src/layout/Cell" },
            { path: "src/layout/Grid" },
            { path: "src/layout/Layered" },
            { path: "src/layout/Popup" },
            { path: "src/layout/Surface" },
            { path: "src/layout/Tabbed" },
            { path: "src/marshaller/HTML" },
            { path: "src/marshaller/Graph" },
            { path: "src/c3chart/Area" },
            { path: "src/c3chart/Bar" },
            { path: "src/c3chart/Column" },
            { path: "src/c3chart/Donut" },
            { path: "src/c3chart/Gauge" },
            { path: "src/c3chart/Line" },
            { path: "src/c3chart/Pie" },
            { path: "src/c3chart/Scatter" },
            { path: "src/c3chart/Step" },
            { path: "src/google/Area" },
            { path: "src/google/Bar" },
            { path: "src/google/Column" },
            { path: "src/google/Line" },
            { path: "src/google/Pie" },
            { path: "src/google/Scatter" },
            { path: "src/google/Timeline" },
            { path: "src/google/TreeMap" },
            { path: "src/amchart/Area" },
            { path: "src/amchart/Bar" },
            { path: "src/amchart/Candle" },
            { path: "src/amchart/FloatingColumn" },
            { path: "src/amchart/Funnel" },
            { path: "src/amchart/Gauge" },
            { path: "src/amchart/Line" },
            { path: "src/amchart/Pie" },
            { path: "src/amchart/Polar" },
            { path: "src/amchart/Pyramid" },
            { path: "src/amchart/Scatter" }
        ];
        (someWidgets.length ? someWidgets : allWidgets).forEach(function (widget) {
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

                if (!window.skipHierarchTest) {
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
                }

                it("Clone Palette", function (done) {
                    require([path], function (Widget) {
                        if (typeof(Widget.prototype.paletteID) === "function") {
                            assert.isFunction(Widget.prototype.useClonedPalette, 'has useClonedPalette');
                        }
                        done();
                    });
                });

                it("Property Tags", function (done) {
                    require([path, "src/other/Persist"], function (Widget, Persist) {
                        var widget = new Widget();
                        Persist.discover(widget).forEach(function (prop) {
                            if (prop.ext && prop.ext.tags) {
                                prop.ext.tags.forEach(function (tag) {
                                    switch (tag) {
                                        case "Basic":
                                        case "Intermediate":
                                        case "Advanced":
                                        case "Private":
                                        case "Shared":
                                            break;
                                        default:
                                            assert.isTrue(false, "Invalid property tag:  '" + tag + "'");
                                    }
                                });
                            }
                        });
                        done();
                    });
                });

                var noSurfaceHTML = null;
                it("Adding widget to the page", function (done) {
                    require([path], function (Widget) {
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
                        var vizWidget = new Widget()
                            .target(widgetDiv.node())
                            .testData()
                            .render(function (w) {
                                noSurfaceHTML = w.element().selectAll("*");
                                assert.isAbove(noSurfaceHTML.length, 0);
                                done();
                            })
                        ;
                    });
                });

                var surfaceHTML = null;
                switch (path) {
                    case "src/other/HeatMap":
                    case "src/map/ChoroplethStatesHeat":
                        it("Adding widget to a Surface");
                        break;
                    default:
                        it("Adding widget to a Surface", function (done) {
                            require(["src/common/ResizeSurface", path], function (ResizeSurface, Widget) {
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
                                var vizWidget = new ResizeSurface()
                                    .target(widgetDiv.node())
                                    .content(new Widget().testData())
                                    .render(function (w) {
                                        surfaceHTML = w.element().selectAll("*");
                                        assert.equal(noSurfaceHTML.length, surfaceHTML.length);
                                        done();
                                    })
                                ;
                            });
                        });
                }
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
}));
