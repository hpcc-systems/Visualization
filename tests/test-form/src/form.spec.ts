import { Class, Database, HTMLWidget, SVGWidget, WidgetArray } from "@hpcc-js/common";
import * as form from "@hpcc-js/form";
// tslint:disable-next-line: no-duplicate-imports
import { Button, CheckBox, ColorInput, FieldForm, Form, Input, InputRange, OnOff, Radio, Range, Select, Slider, TextArea } from "@hpcc-js/form";
import { expect } from "chai";
import { classDef, data, render } from "../../test-data/src/index";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/form", () => {
    for (const key in form) {
        const item = (form as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("form", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Button:
                                render(new Button()
                                    .name("button-test")
                                    .value("Button Test")
                                );
                                break;
                            case ColorInput:
                                break;
                            case Radio:
                                break;
                            case CheckBox:
                                break;
                            case FieldForm:
                                render(new FieldForm()
                                    .fields([
                                        new Database.Field().id("fname").label("First Name"),
                                        new Database.Field().id("lname").label("Last Name"),
                                        new Database.Field().id("age").label("Age")
                                    ])
                                    .data([["Joe", "Bloggs", 42]])
                                );
                                break;
                            case Form:
                                render(new Form()
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
                                            .minHeight(64)
                                            .rows(10)
                                            .name("textarea-test")
                                            .label("Textarea Test")
                                            .value("Textarea Text")
                                        ,
                                        new ColorInput()
                                            .name("color-input-test")
                                            .label("Color Input Test"),
                                        new Slider()
                                            .columns(data.Slider.simple.columns)
                                            .data(data.Slider.simple.data)
                                    ]
                                    ));
                                break;
                            case Input:
                                break;
                            case InputRange:
                                break;
                            case OnOff:
                                break;
                            case Range:
                                break;
                            case Select:
                                break;
                            case TextArea:
                                break;
                            case Slider:
                                break;

                            default:
                                it("Has render test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
