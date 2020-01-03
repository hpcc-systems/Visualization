"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function () {
    return {
        SVGAdapter: {
            simple: function (callback) {
                legacyRequire(["src/react/SVGAdapter", "src/react/Icon"], function (SVGAdapter, Icon) {
                    const icon = new SVGAdapter(Icon)
                        .prop("shape", "square")
                        .prop("fill", "lightgrey")
                        .prop("stroke", "black")
                        .prop("faCharFill", "black")
                        .prop("faChar", "fa-user")
                        .prop("height", 64)
                        ;
                    callback(icon);
                });
            },
            simple2: function (callback) {
                legacyRequire(["src/react/SVGAdapter", "src/react/Icon"], function (SVGAdapter, Icon) {
                    const icon = new SVGAdapter(Icon)
                        .props({
                            shape: "circle",
                            fill: "pink",
                            stroke: "black",
                            faCharFill: "black",
                            faChar: "fa-user",
                            height: 64
                        })
                        ;
                    callback(icon);
                });
            },
            modal: function (callback) {
                legacyRequire(["src/react/HTMLAdapter", "src/react/TestModal"], function (HTMLAdapter, TestModal) {
                    const modal = new HTMLAdapter(TestModal)
                        .props({
                        })
                        ;
                    callback(modal);
                });
            }

        }
    };
}));
