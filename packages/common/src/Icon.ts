import { FAChar } from "./FAChar.ts";
import { textColor } from "./Palette.ts";
import { Shape } from "./Shape.ts";
import { SVGWidget } from "./SVGWidget.ts";

import "../src/Icon.css";

export class Icon extends SVGWidget {

    protected _shapeWidget;
    protected _faChar;
    protected _defs;
    protected _root;
    protected _tooltipElement;

    constructor() {
        super();

        this._shapeWidget = new Shape();
        this._faChar = new FAChar();
    }

    getBBox(refresh = false, round = false) {
        const diameter = this.diameter();
        return {
            x: - diameter / 2,
            y: - diameter / 2,
            width: diameter,
            height: diameter
        };
    }

    contains(point) {
        return this._shapeWidget.contains(point);
    }

    intersection(pointA, pointB) {
        return this._shapeWidget.intersection(pointA, pointB);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        delete this._prevHash;
        this._defs = element.append("defs");
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_circle")
            .append("circle")
            .attr("x", 0)
            .attr("y", 0)
            ;
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_square")
            .append("rect")
            ;
        this._root = element.append("g");
        this._shapeWidget
            .target(this._root.node())
            ;
        this._faChar
            .target(element.node())
            ;
        this._tooltipElement = element.append("title");
        const context = this;
        element
            .on("click", function (el) {
                context.click(el);
            })
            .on("dblclick", function (el) {
                context.dblclick(el);
            })
            ;
    }

    click(_domNode) {
        // console.log("Clicked the icon");
    }

    dblclick(_domNode) {
        // console.log("Double clicked the icon");
    }

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hashSum();
        if (this._prevHash !== hash) {
            this._prevHash = hash;

            const diameter = this.diameter();
            const radius = diameter / 2;
            this._defs.select("circle")
                .attr("r", radius)
                ;
            this._defs.select("rect")
                .attr("x", -radius)
                .attr("y", -radius)
                .attr("width", diameter)
                .attr("height", diameter)
                ;
            this._faChar
                .fontSize(diameter * (100 - this.paddingPercent()) / 100)
                .render()
                ;
            this._shapeWidget
                .shape(this.shape())
                .width(diameter)
                .height(diameter)
                .render()
                ;
            const image = this._root.selectAll("image").data(this.imageUrl() ? [this.imageUrl()] : [], function (d) { return d; });
            image.enter()
                .append("image")
                .attr("xlink:href", this.imageUrl())
                .merge(image)
                .attr("clip-path", "url(#clip_" + this.id() + "_" + this.shape() + ")")
                .attr("x", -radius)
                .attr("y", -radius)
                .attr("width", diameter)
                .attr("height", diameter)
                ;
            if (this.shape_colorFill_exists() && !this.image_colorFill_exists()) {
                this.image_colorFill(textColor(this.shape_colorFill()));
            }
            image.exit()
                .remove()
                ;
            this._tooltipElement.text(this.tooltip());
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
        this._shapeWidget
            .target(null)
            ;
        this._faChar
            .target(null)
            ;
    }

}
Icon.prototype._class += " common_Icon";

export interface Icon {
    shape(): string;
    shape(_: string): this;
    faChar(): string;
    faChar(_: string): this;
    imageUrl(): string;
    imageUrl(_: string): this;
    image_colorFill(): string;
    image_colorFill(_: string): this;
    image_colorFill_exists(): boolean;
    tooltip(): string;
    tooltip(_: string): this;
    diameter(): number;
    diameter(_: number): this;
    paddingPercent(): number;
    paddingPercent(_: number): this;
    shape_colorFill(): string;
    shape_colorFill(_: string): this;
    shape_colorFill_exists(): boolean;
    shape_colorStroke(): string;
    shape_colorStroke(_: string): this;
}

Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"], { tags: ["Private"] });
Icon.prototype.publishProxy("faChar", "_faChar", "char");
Icon.prototype.publishProxy("fontFamily", "_faChar", "text_fontFamily");
Icon.prototype.publish("imageUrl", null, "string", "Image URL", null, { optional: true });
Icon.prototype.publishProxy("image_colorFill", "_faChar", "text_colorFill");
Icon.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
Icon.prototype.publish("diameter", 24, "number", "Diameter", null, { tags: ["Private"] });
Icon.prototype.publish("paddingPercent", 45, "number", "Padding Percent", null, { tags: ["Private"] });
Icon.prototype.publishProxy("shape_colorFill", "_shapeWidget", "colorFill");
Icon.prototype.publishProxy("shape_colorStroke", "_shapeWidget", "colorStroke");
