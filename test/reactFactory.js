"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./es6Require"], factory);
    } else {
        root.test_commonFactory = factory(root.es6Require);
    }
}(this, function (es6Require) {
    return {
        Orb: {
            simple: function (callback) {
                es6Require(["test/DataFactory", "src/react/Orb"], function (DataFactory, Orb) {
                    callback(new Orb()
                        .data(DataFactory.Pivot.subjects.data)
                        .columns(DataFactory.Pivot.subjects.columns)
                    );
                });
            }
        }
    };
}));
