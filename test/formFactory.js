"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./es6Require"], factory);
    } else {
        root.test_commonFactory = factory(root.es6Require);
    }
} (this, function (es6Require) {
    return {
        Form: {
            simple: function (callback) {
                require(["test/DataFactory", "src/form/Button", "src/form/ColorInput", "src/form/Radio", "src/form/CheckBox", "src/form/Form", "src/form/Input", "src/form/InputRange", "src/form/Select", "src/form/TextArea", "src/common/WidgetArray", "src/form/Slider"], function (DataFactory, Button, ColorInput, Radio, CheckBox, Form, Input, InputRange, Select, TextArea, WidgetArray, Slider) {
                    callback(new Form()
                        .inputs([
                            new Input()
                                .name("textbox-test")
                                .label("Alphanumeric")
                                .type("text")
                                .validate("^[A-Za-z0-9]+$")
                                .value("SomeString123"),
                            new InputRange()
                                .name("textbox-range-test")
                                .label("Range")
                                .value(["SomeString001", "SomeString100"]),
                            new Input()
                                .name("number-test")
                                .label("Number Test")
                                .type("number")
                                .validate("\\d+")
                                .value(123),
                            new Select()
                                .name("select-test")
                                .label("Select Test")
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
                                    new CheckBox()
                                        .name("checkbox-test")
                                        .label("Checkbox Test")
                                        .value(true),
                                    new Radio()
                                        .name("radio-test")
                                        .label("Radio Test")
                                        .value(true),
                                    new Button()
                                        .name("button-test")
                                        .value("Button Test")
                                ]),
                            new TextArea()
                                .name("textarea-test")
                                .label("Textarea Test")
                                .value("Textarea Text")
                                .minHeight(64)
                                .rows(10),
                            new ColorInput()
                                .name("color-input-test")
                                .label("Color Input Test"),
                            new Slider()
                                .columns(DataFactory.Slider.simple.columns)
                                .data(DataFactory.Slider.simple.data)
                        ]
                        )
                    );
                });
            }
        },
        Slider: {
            simple: function (callback) {
                es6Require(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .columns(DataFactory.Slider.simple.columns)
                        .data(DataFactory.Slider.simple.data)
                    );
                });
            },
            range: function (callback) {
                es6Require(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .columns(DataFactory.Slider.simple.columns)
                        //.data(DataFactory.Slider.simple.range)
                    );
                });
            },
            dateRange: function (callback) {
                es6Require(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .type("time")
                        .low("1995-01-01")
                        .high("2004-12-31")
                        .step(1)
                        .columns(["Date/Time"])
                        .data(["1999-07-03", "2001-05-24"])
                    );
                });
            }
        }
    };
}));
