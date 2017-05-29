import * as common from "@hpcc-js/common";
import { Class, FAChar, HTMLWidget, Icon, Image, List, Menu, ResizeSurface, Shape, Surface, SVGWidget, SVGZoomWidget, Text, TextBox } from "@hpcc-js/common";
import { expect } from "chai";
import { classDef, renderIcon, renderMedium, renderSmall } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];
const menuList = ["List item 1", "This is Item 2", "List item 3", "This is list item 4", "And finally 5"];

describe("@hpcc-js/common", () => {
    for (const key in common) {
        const item = (common as any)[key];
        if (item) {
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
                            case SVGZoomWidget:
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
