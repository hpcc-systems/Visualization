"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_treeFactory = factory();
    }
}(this, function () {
    return {
        CirclePacking: {
            simple: function (callback) {
                require(["test/DataFactory", "src/tree/CirclePacking"], function (DataFactory, CirclePacking) {
                    callback(new CirclePacking()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                require(["test/DataFactory", "src/tree/CirclePacking"], function (DataFactory, CirclePacking) {
                    callback(new CirclePacking()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }
        },
        Dendrogram: {
            simple: function (callback) {
                require(["test/DataFactory", "src/tree/Dendrogram"], function (DataFactory, Dendrogram) {
                    callback(new Dendrogram()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                require(["test/DataFactory", "src/tree/Dendrogram"], function (DataFactory, Dendrogram) {
                    callback(new Dendrogram()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }
        },
        SunburstPartition: {
            simple: function (callback) {
                require(["test/DataFactory", "src/tree/SunburstPartition"], function (DataFactory, SunburstPartition) {
                    callback(new SunburstPartition()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                require(["test/DataFactory", "src/tree/SunburstPartition"], function (DataFactory, SunburstPartition) {
                    callback(new SunburstPartition()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }

        },

        Treemap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/tree/Treemap"], function (DataFactory, Treemap) {
                    callback(new Treemap()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.default.data)
                    );
                });
            },
            flare: function (callback) {
                require(["test/DataFactory", "src/tree/Treemap"], function (DataFactory, Treemap) {
                    callback(new Treemap()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }
        }
    };
}));
