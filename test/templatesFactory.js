"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_templatesFactory = factory();
    }
}(this, function () {
    return {
        SVG: {
            simple: function (callback) {
                require(["test/DataFactory", "templates/SVGTemplate"], function (DataFactory, SVGTemplate) {
                    callback(new SVGTemplate()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        HTML: {
            simple: function (callback) {
                require(["test/DataFactory", "templates/HTMLTemplate"], function (DataFactory, SVGTemplate) {
                    callback(new SVGTemplate()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        }

    };
}));
