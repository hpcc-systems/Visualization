﻿"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "require", "../src/other/Persist", "./amchartFactory", "./c3chartFactory", "./chartFactory", "./compositeFactory", "./commonFactory", "./formFactory", "./googleFactory", "./graphFactory", "./layoutFactory", "./mapFactory", "./marshallerFactory", "./otherFactory", "./treeFactory", "./templatesFactory", "./handsonFactory", "./reactFactory"], factory);
    } else {
        root.test_Factory = factory(root.d3, root.require, root.other_Persist, root.test_amchartFactory, root.test_c3chartFactory, root.test_chartFactory, root.test_compositeFactory, root.test_commonFactory, root.test_formFactory, root.test_googleFactory, root.test_graphFactory, root.test_layoutFactory, root.test_mapFactory, root.test_marshallerFactory, root.test_otherFactory, root.test_treeFactory, root.test_templatesFactory, root.test_handsonFactory, root.test_reactFactory);
    }
}(this, function (d3, require, Persist, amchartFactory, c3chartFactory, chartFactory, compositeFactory, commonFactory, formFactory, googleFactory, graphFactory, layoutFactory, mapFactory, marshallerFactory, otherFactory, treeFactory, templatesFactory, handsonFactory, reactFactory) {
    var bundles = { common: commonFactory, chart: chartFactory, amchart: amchartFactory, google: googleFactory, c3chart: c3chartFactory, composite: compositeFactory, map: mapFactory, tree: treeFactory, graph: graphFactory, other: otherFactory, form: formFactory, layout: layoutFactory, marshaller: marshallerFactory, templates: templatesFactory, handson: handsonFactory, react: reactFactory };
    var bundlesCatMap = {};
    var bundlesWidgetMap = {};
    d3.map(bundles).entries().forEach(function (bundle) {
        var folderID = bundle.key;
        d3.map(bundle.value).entries().forEach(function (widget) {
            var widgetID = widget.key;
            d3.map(widget.value).entries().forEach(function (sample) {
                var sampleID = sample.key;
                var widgetPath = "src/" + folderID + "/" + widgetID;
                var widgetTestData = {
                    folder: folderID,
                    file: widgetID,
                    sample: sampleID,
                    widgetPath: widgetPath,
                    factory: sample.value
                };
                if (!bundlesCatMap[folderID]) {
                    bundlesCatMap[folderID] = {}
                };
                if (!bundlesCatMap[folderID][widgetID]) {
                    bundlesCatMap[folderID][widgetID] = {}
                };
                bundlesCatMap[folderID][widgetID][sampleID] = widgetTestData;

                if (!bundlesWidgetMap[widgetPath]) {
                    bundlesWidgetMap[widgetPath] = {}
                };
                bundlesWidgetMap[widgetPath][sampleID] = widgetTestData;
            }, this);
        }, this);
    }, this);

    function createFunction(widgetPath, dataPath, sampleID, target, nameID, options) {
        sampleID = sampleID || "default";
        nameID = nameID || sampleID;
        options = options || function () { };
        target[nameID] = function (callback) {
            require([widgetPath, "./" + dataPath + "Factory"], function (Widget, data) {
                var widget = data[sampleID](new Widget());
                options(widget);
                callback(widget);
            });
        };
    }

    return {
        categories: bundlesCatMap,
        widgets: bundlesWidgetMap,

        serializeToURL: function (testID, widget) {
            var obj = Persist.serializeToObject(widget);
            return walkObj(obj, testID);

            function walkObj(obj, testID) {
                var retVal = testID || obj.__class;
                for (var key in obj.__properties) {
                    switch (typeof (obj.__properties[key])) {
                        case "boolean":
                        case "number":
                        case "string":
                            var newParam = "&" + encodeURIComponent(key);
                            if (obj.__properties[key] !== undefined) {
                                newParam += "=" + encodeURIComponent(obj.__properties[key]);
                            }
                            if (retVal.length + newParam.length < 2000) { //  2000 comes from:  http://stackoverflow.com/a/417184
                                retVal += newParam;
                            }
                            break;
                        case "object":
                            switch (key) {
                                case "fields":
                                    break;
                                default:
                                    if (obj.__properties[key] instanceof Array) {
                                        var d = 0;
                                    } else {
                                        var d = 0;
                                    }
                            }
                            break;
                    }
                }
                return retVal;
            }
        },
        deserializeFromURL: function (def, callback) {
            var widgetPath = "";
            var widgetTest = "";
            var params = {};
            var monitorHandle;
            if (def) {
                def.split("&").forEach(function (param, idx) {
                    var paramParts = param.split("=");
                    if (paramParts[0] === "hpcc_debug") {
                        window.__hpcc_debug = paramParts[1];
                    } else if (widgetPath === "" && paramParts.length === 1) {
                        widgetPath = decodeURIComponent(paramParts[0]);
                        var wpParts = widgetPath.split(".");
                        widgetPath = wpParts[0];
                        widgetTest = wpParts[1];
                    } else {
                        params[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
                    }
                });
            }
            if (widgetPath) {
                var context = this;
                var func = widgetTest ? this.widgets[widgetPath][widgetTest].factory : d3.map(this.widgets[widgetPath]).values()[0].factory;
                func(function (widget) {
                    if (params) {
                        for (var key in params) {
                            if (widget["__meta_" + key] !== undefined) {
                                if (widget["__meta_" + key].type === "array") {
                                    widget[key](params[key].split(","));
                                } else {
                                    widget[key](params[key]);
                                }
                            }
                        }
                    }
                    callback(widget, widgetPath + (widgetTest    ? "." + widgetTest : ""));
                });
            } else {
                callback(null);
            }
        }
    };
}));

