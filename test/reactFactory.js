"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function () {
    return {
        Orb: {
            simple: function (callback) {
                require(["test/DataFactory", "src/react/Orb"], function (DataFactory, Orb) {
                    callback(new Orb()
                    );
                });
            }
        }
    };
}));
