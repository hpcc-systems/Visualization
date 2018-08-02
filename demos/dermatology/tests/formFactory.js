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
        SearchForm: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Button", "src/form/ColorInput", "src/form/Radio", "src/form/CheckBox", "src/form/SearchForm", "src/form/Input", "src/form/InputRange", "src/form/Select", "src/form/TextArea", "src/common/WidgetArray", "src/form/Slider"], function (DataFactory, Button, ColorInput, Radio, CheckBox, SearchForm, Input, InputRange, Select, TextArea, WidgetArray, Slider) {
                    callback(new SearchForm()
                        .inputWidthPercentages([
                            [30,30,20,20],
                            [100],
                            [40,30,10,20],
                            [20,15],
                            [25,30,15,15],
                            [100]
                        ])
                        .inputs([
                            new WidgetArray()
                                .content([
                                    new Input().name("LAST_NAME").label("Last Name").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("FIRST_NAME").label("First Name").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("MIDDLE_NAME").label("Middle Name").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("SSN").label("SSN").type("text").validate("^[A-Za-z]+$")
                                ]),
                            new WidgetArray()
                                .content([
                                    new Input().name("INCLUDE_NAME_VARIATIONS").label("Include name variations").type("checkbox")
                                ]),
                            new WidgetArray()
                                .content([
                                    new Input().name("STREET_ADDRESS").label("Street Address").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("CITY").label("City").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("STATE").label("State").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("ZIP").label("ZIP").type("text").validate("^[A-Za-z]+$")
                                ]),
                            new WidgetArray()
                                .content([
                                    new Input().name("COUNTY").label("County").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("RADIUS").label("Radius").type("text").validate("^[A-Za-z]+$")
                                ]),
                            new WidgetArray()
                                .content([
                                    new Input().name("PHONE").label("Phone").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("DOB").label("DOB").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("AGE_MIN").label("Min Age").type("text").validate("^[A-Za-z]+$"),
                                    new Input().name("AGE_MAX").label("Max Age").type("text").validate("^[A-Za-z]+$")
                                ]),
                            new WidgetArray()
                                .content([
                                    new Input().name("INCLUDE_BANKRUPTCIES").label("Include Bankruptcies").type("checkbox")
                                ]),
                        ])
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
                    );
                });
            },
            range: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
                    callback(new Slider()
                        .allowRange(true)
                        .columns(DataFactory.Slider.simple.columns)
                        //.data(DataFactory.Slider.simple.range)
                    );
                });
            },
            dateRange: function (callback) {
                legacyRequire(["test/DataFactory", "src/form/Slider"], function (DataFactory, Slider) {
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
