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
                require(["test/DataFactory", "src/form/Form", "src/form/Input", "src/common/WidgetArray"], function (DataFactory, Form, Input, WidgetArray) {
                    callback(new Form()
                        .inputs([
                            new Input()
                                .name("textbox-test")
                                .label("Alphanumeric")
                                .type("text")
                                .validate("^[A-Za-z0-9]+$")
                                .value("SomeString123"),
                            new Input()
                                .name("number-test")
                                .label("Number Test")
                                .type("number")
                                .validate("\\d+")
                                .value(123),
                            new Input()
                                .name("select-test")
                                .label("Select Test")
                                .type("select")
                                .selectOptions(["A", "B", "C"])
                                .value("B"),
                            new WidgetArray()
                                .content([
                                    new Input()
                                        .name("textbox-test")
                                        .label("Only Alpha")
                                        .type("text")
                                        .validate("^[A-Za-z]+$")
                                        .value("SomeString"),
                                    new Input()
                                        .name("checkbox-test")
                                        .label("Checkbox Test")
                                        .type("checkbox")
                                        .value(true)
                                ]),
                            new Input()
                                .name("textarea-test")
                                .label("Textarea Test")
                                .type("textarea")
                                .value("Textarea Text")
                            ]
                        )
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
