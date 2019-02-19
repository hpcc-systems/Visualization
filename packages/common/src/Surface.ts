import { select as d3Select } from "d3-selection";
import "d3-transition";
import { Icon } from "./Icon";
import { Menu } from "./Menu";
import { Shape } from "./Shape";
import { SVGWidget } from "./SVGWidget";
import { Text } from "./Text";

import "../src/Surface.css";

export class Surface extends SVGWidget {
    _origMenuParam;
    _origShowContent;

    protected _iconWidget;
    protected _containerWidget;
    protected _titleRectWidget;
    protected _textWidget;
    _menuWidget;
    protected _surfaceButtons;

    protected _clipRect;
    protected buttonContainer;

    constructor() {
        super();

        this._iconWidget = new Icon()
            .faChar("\uf07b")
            .paddingPercent(50)
            ;
        this._containerWidget = new Shape()
            .class("container")
            .shape("rect")
            ;
        this._titleRectWidget = new Shape()
            .class("title")
            .shape("rect")
            ;
        this._textWidget = new Text()
            .class("title")
            ;
        this._menuWidget = new Menu()
            .paddingPercent(0)
            ;
        const context = this;
        this._menuWidget.preShowMenu = function () {
            if (context.content() && context.content().hasOverlay()) {
                context.content().visible(false);
            }
        };
        this._menuWidget.postHideMenu = function () {
            if (context.content() && context.content().hasOverlay()) {
                context.content().visible(true);
            }
        };

        this._surfaceButtons = [];
    }

    enter(_domNode, _element) {
        super.enter(_domNode, _element);
        const element = _element.append("g").attr("class", "frame");
        const domNode = element.node();
        this._clipRect = element.append("defs").append("clipPath")
            .attr("id", this.id() + "_clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this._size.width)
            .attr("height", this._size.height)
            ;
        this._titleRectWidget
            .target(domNode)
            .render()
            .display(this.showTitle() && this.showIcon())
            ;
        this._iconWidget
            .target(domNode)
            .render()
            ;
        this._menuWidget
            .target(_domNode)
            ;
        this._textWidget
            .target(domNode)
            ;
        this._containerWidget
            .target(domNode)
            ;
        this.buttonContainer = d3Select(this._target).append("div").attr("class", "svg-button-container");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;

        let width = this.width() - 1;
        const height = this.height() - 1;

        this._iconWidget
            .display(this.showTitle() && this.showIcon())
            .shape(this.icon_shape())
            .render()
            ;
        this._menuWidget
            .render()
            ;
        this._textWidget
            .text(this.title())
            .display(this.showTitle())
            .render()
            ;

        const surfaceButtons = this.buttonContainer.selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").attr("class", "surface-button")
            .each(function (button, idx) {
                const el = context._surfaceButtons[idx] = d3Select(this)
                    .attr("class", "surface-button " + (button.class ? button.class : ""))
                    .attr("id", button.id)
                    .style("padding", button.padding)
                    .style("width", button.width)
                    .style("height", button.height)
                    .style("cursor", "pointer")
                    .on("click", function (d) { context.click(d); });
                if (button.font === "FontAwesome") {
                    el
                        .append("i")
                        .attr("class", "fa")
                        .text(function () { return button.label; });
                } else {
                    el
                        .text(function () { return button.label; });
                }
            })
            ;
        surfaceButtons.exit()
            .each(function (_d, idx) {
                const element2 = d3Select(this);
                delete context._surfaceButtons[idx];
                element2.remove();
            })
            ;

        const buttonClientHeight = this.showTitle() ? Math.max.apply(null, this._surfaceButtons.map(function (d) { return d.node().offsetHeight; })) : 0;
        const iconClientSize = this.showTitle() && this.showIcon() ? this._iconWidget.getBBox(true) : { width: 0, height: 0 };
        const textClientSize = this._textWidget.getBBox(true);
        const menuClientSize = this._menuWidget.getBBox(true);
        const _titleRegionHeight = Math.max(iconClientSize.height, textClientSize.height, menuClientSize.height, buttonClientHeight);
        const titleRegionHeight = this.showTitle() ? _titleRegionHeight : 0;
        const yTitle = (-height + _titleRegionHeight) / 2;

        const titleTextHeight = this.showTitle() ? Math.max(textClientSize.height, menuClientSize.height, buttonClientHeight) : 0;
        const titleTextWidth = this.showTitle() ? textClientSize.width + menuClientSize.width : 0;
        if (titleTextWidth > width) {
            width = titleTextWidth;
        }

        const topMargin = titleRegionHeight <= titleTextHeight ? 0 : (titleRegionHeight - titleTextHeight) / 2;
        const leftMargin = topMargin;

        this._titleRectWidget
            .pos({ x: leftMargin, y: yTitle })
            .width(width - leftMargin * 2)
            .height(titleTextHeight)
            .display(this.showTitle())
            .render()
            ;
        this._iconWidget
            .move({ x: -width / 2 + iconClientSize.width / 2, y: yTitle })
            ;
        this._menuWidget
            .move({ x: width / 2 - menuClientSize.width / 2 - this.menuPadding(), y: yTitle })
            ;
        this._textWidget
            .move({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: yTitle })
            ;

        const xPos = context._titleRectWidget.node().getBoundingClientRect().left + (context._size.width - leftMargin * 2) - context.buttonGutter() - this.buttonContainer.node().offsetWidth;
        const yPos = context._titleRectWidget.node().getBoundingClientRect().top + ((titleTextHeight - this.buttonContainer.node().offsetHeight) / 2);
        if (!isNaN(xPos)) {
            this.buttonContainer.style("left", xPos + "px");
        }
        if (!isNaN(yPos)) {
            this.buttonContainer.style("top", yPos + "px");
        }

        if (this.showTitle()) {
            this._containerWidget
                .pos({ x: leftMargin / 2, y: titleRegionHeight / 2 - topMargin / 2 })
                .width(width - leftMargin)
                .height(height - titleRegionHeight + topMargin)
                .render()
                ;
        } else {
            this._containerWidget
                .pos({ x: 0, y: 0 })
                .width(width)
                .height(height)
                .render()
                ;
        }

        if (this.showContent()) {
            const xOffset = leftMargin;
            const yOffset = titleRegionHeight - topMargin;

            const content = element.selectAll(".content").data(this.content() ? [this.content()] : [], function (d) { return d._id; });
            content.enter().append("g")
                .attr("class", "content")
                .attr("clip-path", "url(#" + this.id() + "_clip)")
                .each(function (d) {
                    d.target(this);
                })
                .merge(content)
                .attr("transform", "translate(" + (leftMargin / 2) + ", " + (titleRegionHeight / 2 - topMargin / 2) + ")")
                .each(function (d) {
                    const padding = {
                        left: 0,
                        top: 0,
                        right: 1,
                        bottom: 1
                    };
                    d
                        .resize({
                            width: width - xOffset - (padding.left + padding.right),
                            height: height - yOffset - (padding.top + padding.bottom)
                        })
                        ;
                })
                ;
            if (this.content()) {
                this._clipRect
                    .attr("x", -(width - xOffset) / 2)
                    .attr("y", -(height - yOffset) / 2)
                    .attr("width", width - xOffset)
                    .attr("height", height - yOffset)
                    ;
            }
            content.exit().transition()
                .each(function (d) { d.target(null); })
                .remove()
                ;
        }

        if (this._menuWidget.element() && this._menuWidget.element().node() && this._menuWidget.element().node().parentNode) {
            this._menuWidget.element().node().parentNode.appendChild(this._menuWidget.element().node()); // Make sure menu is on top (Z-Order POV)
        }
    }

    exit(domNode, element) {
        this._titleRectWidget
            .target(null)
            ;
        this._iconWidget
            .target(null)
            ;
        this._menuWidget
            .target(null)
            ;
        this._textWidget
            .target(null)
            ;
        this._containerWidget
            .target(null)
            ;
        if (this.content()) {
            this.content().target(null);
        }
        super.exit(domNode, element);
    }

    intersection(pointA, pointB) {
        const hits = [];
        const i1 = this._iconWidget.intersection(pointA, pointB, this._pos);
        if (i1) {
            hits.push({ i: i1, d: this.distance(i1, pointB) });
        }
        const i2 = this._titleRectWidget.intersection(pointA, pointB);
        if (i2) {
            hits.push({ i: i2, d: this.distance(i2, pointB) });
        }
        const i3 = this._containerWidget.intersection(pointA, pointB);
        if (i3) {
            hits.push({ i: i3, d: this.distance(i3, pointB) });
        }
        let nearest = null;
        hits.forEach(function (item) {
            if (nearest === null || nearest.d > item.d) {
                nearest = item;
            }
        });
        return nearest && nearest.i ? nearest.i : null;
    }

    click(d) {
        console.log("Clicked: " + d.id);
    }

    showTitle: { (): boolean; (_: boolean): Surface; };
    title: { (): string; (_: string): Surface; };
    titleFontSize: { (): string; (_: string): Surface; };
    showIcon: { (): boolean; (_: boolean): Surface; };
    icon_faChar: { (): string; (_: string): Surface; };
    icon_shape: { (): string; (_: string): Surface; };
    content: { (): any; (_: any): Surface; };
    buttonAnnotations: { (): any[]; (_: any[]): Surface; };
    buttonGutter: { (): number; (_: number): Surface; };
    showContent: { (): boolean; (_: boolean): Surface; };
    menu: { (): any[]; (_: any[]): Surface; };
    menuPadding: { (): number; (_: number): Surface; };
}
Surface.prototype._class += " common_Surface";

Surface.prototype.publish("showTitle", true, "boolean", "Show Title", null, { tags: ["Basic"] });
Surface.prototype.publish("title", "", "string", "Title", null, { tags: ["Basic"] });
Surface.prototype.publishProxy("titleFontSize", "_textWidget", "fontSize");
Surface.prototype.publish("showIcon", true, "boolean", "Show Title", null, { tags: ["Advanced"] });
Surface.prototype.publishProxy("icon_faChar", "_iconWidget", "faChar");
Surface.prototype.publishProxy("icon_shape", "_iconWidget", "shape");

Surface.prototype.publish("content", null, "widget", "Content", null, { tags: ["Private"] });

Surface.prototype.publish("buttonAnnotations", [], "array", "Button Array", null, { tags: ["Intermediate"] });
Surface.prototype.publish("buttonGutter", 25, "number", "Space Between Menu and Buttons", null, { tags: ["Intermediate"] });

Surface.prototype.publish("showContent", true, "boolean", "Show Content", null, { tags: ["Intermediate"] });
Surface.prototype.publish("menu", [], "array", "Menu List Data", null, { tags: ["Intermediate"] });
Surface.prototype.publish("menuPadding", 2, "number", "Menu Padding", null, { tags: ["Advanced"] });

Surface.prototype._origMenuParam = Surface.prototype.menu;
Surface.prototype.menu = function (this: Surface, _?) {
    Surface.prototype._origMenuParam.apply(this, arguments);
    if (arguments.length) {
        this._menuWidget.data(_);
        return this;
    }
    return this._menuWidget.data();
};

Surface.prototype._origShowContent = Surface.prototype.showContent;
Surface.prototype.showContent = function (_?) {
    const retVal = Surface.prototype._origShowContent.apply(this, arguments);
    if (arguments.length) {
        if (this.content()) {
            this.content().visible(this.showContent());
        }
    }
    return retVal;
};
