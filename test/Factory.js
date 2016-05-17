"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "require", "./amchartFactory", "./c3chartFactory", "./chartFactory", "./compositeFactory", "./commonFactory", "./formFactory", "./googleFactory", "./graphFactory", "./layoutFactory", "./mapFactory", "./marshallerFactory", "./otherFactory", "./treeFactory", "./templatesFactory"], factory);
    } else {
        root.test_Factory = factory(root.d3, root.require, root.test_amchartFactory, root.test_c3chartFactory, root.test_chartFactory, root.test_compositeFactory, root.test_commonFactory, root.test_formFactory, root.test_googleFactory, root.test_graphFactory, root.test_layoutFactory, root.test_mapFactory, root.test_marshallerFactory, root.test_otherFactory, root.test_treeFactory, root.test_templatesFactory);
    }
}(this, function (d3, require, amchartFactory, c3chartFactory, chartFactory, compositeFactory, commonFactory, formFactory, googleFactory, graphFactory, layoutFactory, mapFactory, marshallerFactory, otherFactory, treeFactory, templatesFactory) {
    var bundles = { common: commonFactory, chart: chartFactory, amchart: amchartFactory, google: googleFactory, c3chart: c3chartFactory, composite: compositeFactory, map: mapFactory, tree: treeFactory, graph: graphFactory, other: otherFactory, form: formFactory, layout: layoutFactory, marshaller: marshallerFactory, templates: templatesFactory };
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
        widgets: bundlesWidgetMap
    };
}));

