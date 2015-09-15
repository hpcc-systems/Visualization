"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_marshallerFactory = factory();
    }
}(this, function () {
    return {
        HTML: {
            databomb: function (callback) {
                require(["test/DataFactory", "src/marshaller/HTML"], function (DataFactory, HTML) {
                    callback(new HTML()
                        .ddlUrl(DataFactory.Marshaller.simple.ddlUrl)
                        .databomb(DataFactory.Marshaller.simple.databomb)
                    );
                });
            },
            roxie: function (callback) {
                require(["test/DataFactory", "src/marshaller/HTML"], function (DataFactory, HTML) {
                    callback(new HTML()
                        .ddlUrl(DataFactory.Marshaller.hipie.ddlUrl)
                    );
                });
            }
        },
        Graph: {
            databomb: function (callback) {
                require(["test/DataFactory", "src/marshaller/Graph"], function (DataFactory, Graph) {
                    callback(new Graph()
                        .ddlUrl(DataFactory.Marshaller.simple.ddlUrl)
                        .databomb(DataFactory.Marshaller.simple.databomb)
                    );
                });
            },
            roxie: function (callback) {
                require(["test/DataFactory", "src/marshaller/Graph"], function (DataFactory, Graph) {
                    callback(new Graph()
                        .ddlUrl(DataFactory.Marshaller.hipie.ddlUrl)
                    );
                });
            }
        }
    };
}));
