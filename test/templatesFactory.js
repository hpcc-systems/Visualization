"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./es6Require"], factory);
    } else {
        root.test_commonFactory = factory(root.es6Require);
    }
}(this, function (es6Require) {
    return {
        SVG: {
            simple: function (callback) {
                es6Require(["test/DataFactory", "templates/SVGTemplate"], function (DataFactory, SVGTemplate) {
                    callback(new SVGTemplate()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        HTML: {
            simple: function (callback) {
                es6Require(["test/DataFactory", "templates/HTMLTemplate"], function (DataFactory, SVGTemplate) {
                    callback(new SVGTemplate()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        }

    };
}));
