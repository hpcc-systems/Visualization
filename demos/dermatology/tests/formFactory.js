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
                legacyRequire(["test/DataFactory", "src/form/Button", "src/form/ColorInput", "src/form/Radio", "src/form/CheckBox", "src/form/Form", "src/form/Input", "src/form/InputRange", "src/form/Select", "src/form/TextArea", "src/common/WidgetArray", "src/form/Slider"], function (DataFactory, Button, ColorInput, Radio, CheckBox, Form, Input, InputRange, Select, TextArea, WidgetArray, Slider) {
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
                                .label("Slider Test")
                                .allowRange(false)
                                .columns(["Percent"])
                                .data([[40]])
                        ]
                        )
                    );
                });
            }
        },
        FieldForm: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/FieldForm", "src/common/Database"], function (DataFactory, FieldForm, Database) {
                    callback(new FieldForm()
                        .fields([
                            new Database.Field().id("fname").label("First Name"),
                            new Database.Field().id("lname").label("Last Name"),
                            new Database.Field().id("age").label("Age")
                        ])
                        .data([["Joe", "Bloggs", 42]])
                    );
                });
            }
        },
        Slider: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .columns(DataFactory.Slider.simple.columns)
                        .data(DataFactory.Slider.simple.data)
                        .low(0)
                        .high(100)
                    );
                });
            },
            range: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .columns(DataFactory.Slider.range.columns)
                        .data(DataFactory.Slider.range.data)
                        .low(0)
                        .high(1000)
                    );
                });
            },
            dateRange: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .timePattern("%Y-%m-%d")
                        .tickDateFormat("%b,%Y")
                        .lowDatetime("1998-01-01")
                        .highDatetime("2004-12-31")
                        .step(1)
                        .columns(["Date/Time"])
                        .data([
                            ["1999-07-03", "2001-05-24"]
                        ])
                    );
                });
            }
        }
    };
}));
