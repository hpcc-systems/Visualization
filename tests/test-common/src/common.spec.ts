import * as common from "@hpcc-js/common";
// tslint:disable-next-line:no-duplicate-imports
import { Button, CanvasWidget, Class, Entity, EntityCard, EntityPin, EntityRect, EntityRectList, EntityVertex, FAChar, HTMLWidget, Icon, IconBar, Image, List, Menu, ResizeSurface, Shape, Spacer, Surface, SVGWidget, SVGZoomWidget, Text, TextBox, TitleBar, ToggleButton } from "@hpcc-js/common";
import { expect } from "chai";
import { classDef, renderIcon, renderMedium, renderSmall } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];
const menuList = ["List item 1", "This is Item 2", "List item 3", "This is list item 4", "And finally 5"];

describe("Widget.classed", () => {
    it("set/get", function () {
        const text = new Text()
            .text("Hello\nand\nWelcome!")
            .classed("TestClass0", true)
            .classed({ TestClass3: true, TestClass4: false })
            .classed("TestClass", true)
            .classed("TestClass2", false)
            ;
        expect(text.classed("TestClass0")).to.be.undefined;
        expect(text.classed("TestClass")).to.be.true;
        expect(text.classed("TestClass2")).to.be.false;
        expect(text.classed("TestClass3")).to.be.true;
        expect(text.classed("TestClass4")).to.be.false;
        expect(text.classed()["TestClass"]).to.be.true;
        expect(text.classed()["TestClass2"]).to.be.false;
        expect(text.classed()["TestClass3"]).to.be.true;
        expect(text.classed()["TestClass4"]).to.be.false;
    });
});

describe("@hpcc-js/common", () => {
    for (const key in common) {
        const item = (common as any)[key];
        if (item && item.prototype && item.prototype.constructor && item.prototype.constructor.name) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("common", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Text:
                                renderSmall(new Text().text("Hello\nand\nWelcome!"));
                                break;
                            case Shape:
                                renderIcon(new Shape());
                                break;
                            case FAChar:
                                renderIcon(new FAChar().char("\uf007"));
                                break;
                            case TextBox:
                                renderSmall(new TextBox().text("Hello\nand\nWelcome!"));
                                break;
                            case Icon:
                                renderIcon(new Icon().faChar("\uf007"));
                                renderIcon(new Icon()
                                    .diameter(60)
                                    .imageUrl("http://3.bp.blogspot.com/-OafJIIN-DDk/Twteb5onPkI/AAAAAAAAB3Q/vRaUgxkbgWc/s1600/The_Shmoo_by_zombiegoon.jpg")
                                );
                                break;
                            case Image:
                                renderSmall(new Image()
                                    .source("http://3.bp.blogspot.com/-OafJIIN-DDk/Twteb5onPkI/AAAAAAAAB3Q/vRaUgxkbgWc/s1600/The_Shmoo_by_zombiegoon.jpg")
                                    .sizing("fit")
                                    .lockAspectRatio(false)
                                );
                                break;
                            case List:
                                renderSmall(new List()
                                    .data(menuList)
                                );
                                break;
                            case Menu:
                                renderMedium(new Menu()
                                    .data(menuList)
                                );
                                break;
                            case Surface:
                                renderMedium(new Surface()
                                    .title("Surface")
                                    .menu(menuList)
                                    .content(new Text()
                                        .text("Hello\nand\nWelcome!")
                                    ));
                                break;
                            case ResizeSurface:
                                renderMedium(new ResizeSurface()
                                    .title("Resize Me")
                                    .menu(menuList)
                                    .content(new Text()
                                        .text("I\nam\nResizale!")
                                    ));
                                break;
                            case EntityCard:
                                renderMedium(new EntityCard()
                                    .icon("")
                                    .iconDiameter(28)
                                    .iconPaddingPercent(0)
                                    .title("SomeTitle")
                                    .titleFontSize(28)
                                    .titleColor("#ecf0f1")
                                    .description("SomeDescription")
                                    .descriptionColor("#ecf0f1")
                                    .iconColor("#ecf0f1")
                                    .backgroundShape("rect")
                                    .backgroundColorFill("#2980b9")
                                    .backgroundColorStroke("#2c3e50")
                                    .annotationIcons([
                                        { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
                                        { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
                                        { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" }
                                    ])
                                );
                                break;
                            case EntityPin:
                                renderMedium(new EntityPin()
                                    .icon("")
                                    .iconDiameter(18)
                                    .iconPaddingPercent(1)
                                    .title("SomeTitle")
                                    .titleColor("#E3151A")
                                    .titleFontSize(24)
                                    .description("SomeDescription")
                                    .descriptionColor("#000000")
                                    .descriptionFontSize(15)
                                    .iconColor("#E3151A")
                                    .titleColor("#E3151A")
                                    .descriptionColor("#E3151A")
                                    .backgroundShape("pin")
                                    .backgroundColorFill("#F8F8F8")
                                    .backgroundColorStroke("#CCCCCC")
                                    .cornerRadius(5)
                                    .arrowHeight(10)
                                    .arrowWidth(16)
                                    .annotationIcons([
                                        { faChar: "A", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                                        { faChar: "B", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                                        { faChar: "C", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" }
                                    ])
                                );
                                break;
                            case EntityRect:
                                renderMedium(new EntityRect()
                                    .icon("")
                                    .iconDiameter(18)
                                    .iconPaddingPercent(1)
                                    .title("SomeTitle")
                                    .titleColor("#E3151A")
                                    .titleFontSize(24)
                                    .description("SomeDescription")
                                    .descriptionColor("#000000")
                                    .descriptionFontSize(15)
                                    .iconColor("#E3151A")
                                    .titleColor("#E3151A")
                                    .descriptionColor("#E3151A")
                                    .backgroundShape("pin")
                                    .backgroundColorFill("#F8F8F8")
                                    .backgroundColorStroke("#CCCCCC")
                                    .cornerRadius(5)
                                    .arrowHeight(10)
                                    .arrowWidth(16)
                                    .annotationIcons([
                                        { faChar: "A", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                                        { faChar: "B", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                                        { faChar: "C", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" }
                                    ])
                                );
                                break;
                            case EntityRectList:
                                renderMedium(new EntityRectList()
                                    .columns(["Icon", "IconColor", "Title"])
                                    .data([
                                        ["", "red", "Event Type 1 - Event Type 1 - Event Type 1 - Event Type 1 - "],
                                        ["", "yellow", "Event Type 1 - Event Type 1 - "],
                                        ["", "green", "Event Type 3"]
                                    ])
                                    .iconColumn("Icon")
                                    .iconColorColumn("IconColor")
                                    .titleColumn("Title")
                                );
                                break;
                            case EntityVertex:
                                renderMedium(new EntityVertex()
                                    .icon("")
                                    .title("SomeTitle")
                                    .iconColor("#2c3e50")
                                    .iconColorFill("#ecf0f1")
                                    .iconColorStroke("#2c3e50")
                                    .textboxColorFill("#ecf0f1")
                                    .textboxColorStroke("#2c3e50")
                                    .annotationIcons([
                                        { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "#2c3e50" },
                                        { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "#2c3e50" },
                                        { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "#2c3e50" }
                                    ])
                                );
                                break;
                            case Button:
                            case Entity:
                            case ToggleButton:
                            case Spacer:
                            case IconBar:
                            case TitleBar:
                                break;
                            case CanvasWidget:
                                renderMedium(new CanvasWidget());
                                break;
                            case SVGZoomWidget:
                                renderMedium(new SVGZoomWidget());
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
