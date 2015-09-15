"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_formFactory = factory();
    }
}(this, function () {
    return {
        Form: {
            simple: function (callback) {
                require(["test/DataFactory", "src/form/Form"], function (DataFactory, Form) {
                    callback(new Form()
                        .inputs(DataFactory.Form.simple.inputs())
                    );
                });
            }
        },
        Slider: {
            simple: function (callback) {
                require(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .columns(DataFactory.Slider.simple.columns)
                        .data(DataFactory.Slider.simple.data)
                    );
                });
            },
            range: function (callback) {
                require(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .columns(DataFactory.Slider.simple.columns)
                        //.data(DataFactory.Slider.simple.range)
                    );
                });
            }
        }
    };
}));
