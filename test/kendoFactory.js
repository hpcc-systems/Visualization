"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","kendo"], factory);
    } else {
        root.test_kendoFactory = factory();
    }
}(this, function (jquery, kendo) {
    return {
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/kendo/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Donut: {
            simple: function (callback) {
                require(["test/DataFactory", "src/kendo/Donut"], function (DataFactory, Donut) {
                    callback(new Donut()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
    };
}));