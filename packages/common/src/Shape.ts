import { select as d3Select } from "d3-selection";
import { SVGWidget } from "./SVGWidget";

import "../src/Shape.css";

export class Shape extends SVGWidget {
    protected _tooltipElement;

    constructor() {
        super();
    }

    contains(point) {
        switch (this.shape()) {
            case "circle":
                return this.containsCircle(this.radius(), point);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    }

    intersection(pointA, pointB) {
        switch (this.shape()) {
            case "circle":
                return this.intersectCircle(this.radius(), pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        delete this._prevHash;
    }

    _prevHash;
    update(_domNode, element) {
        const shape = element.selectAll("rect,circle,ellipse,path").data([this.shape()], function (d) { return d; });
        const hash = this.hash();
        if (this._prevHash !== hash) {
            this._prevHash = hash;

            const context = this;
            shape.enter().append(this.getShapeElementTag(this.shape()))
                .attr("class", "common_Shape")
                .each(function () {
                    const element2 = d3Select(this);
                    context._tooltipElement = element2.append("title");
                })
                .on("click", () => {
                    this.click();
                })
                .on("dblclick", () => {
                    this.dblclick();
                })
                .merge(shape)
                .style("fill", this.colorFill())
                .style("stroke", this.colorStroke())
                .each(function () {
                    const element2 = d3Select(this);
                    context._tooltipElement.text(context.tooltip());
                    switch (context.shape()) {
                        case "circle":
                            const radius = context.radius();
                            element2
                                .attr("r", radius)
                                ;
                            break;
                        case "square":
                            const width = Math.max(context.width(), context.height());
                            element2
                                .attr("x", -width / 2)
                                .attr("y", -width / 2)
                                .attr("width", width)
                                .attr("height", width)
                                ;
                            break;
                        case "rect":
                            element2
                                .attr("x", -context.width() / 2)
                                .attr("y", -context.height() / 2)
                                .attr("width", context.width())
                                .attr("height", context.height())
                                ;
                            break;
                        case "ellipse":
                            element2
                                .attr("rx", context.width() / 2)
                                .attr("ry", context.height() / 2)
                                ;
                            break;
                        case "pin":
                            element2
                                .attr("d", context.pinPath())
                                ;
                            break;
                    }
                })
                ;
            shape.exit().remove();
        }
    }
    getShapeElementTag(_shape) {
        switch (_shape) {
            case "square":
                return "rect";
            case "pin":
                return "path";
        }
        return _shape;
    }
    pinPath() {
        const radius = this.cornerRadius();
        const arrow_h = this.arrowHeight();
        const arrow_w = this.arrowWidth();
        const width = this.width();
        const height = this.height() - arrow_h;
        const x = 0 - width / 2;
        const y = 0 - height;
        const arrow_b = (width - radius * 2 - arrow_w) / 2;
        return "M" + x + "," + y +
            "a" + -radius + "," + -radius + " 0 0 1 " + radius + "," + -radius +
            "h" + (width + -radius * 2) +
            "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
            "v" + (height + -radius * 2) +
            "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
            "h" + -arrow_b +
            "l" + -arrow_w / 2 + "," + arrow_h +
            "l" + -arrow_w / 2 + "," + -arrow_h +
            "h" + -arrow_b +
            "a" + -radius + "," + -radius + " 0 0 1 " + -radius + "," + -radius +
            "z";
    }

    click() {
    }

    dblclick() {
    }

}
Shape.prototype._class += " common_Shape";

export interface Shape {
    shape(): string;
    shape(_: string): this;
    colorStroke(): string;
    colorStroke(_: string): this;
    colorFill(): string;
    colorFill(_: string): this;
    colorFill_exists(): boolean;
    radius(): number;
    radius(_: number): this;
    cornerRadius(): number;
    cornerRadius(_: number): this;
    arrowHeight(): number;
    arrowHeight(_: number): this;
    arrowWidth(): number;
    arrowWidth(_: number): this;
    tooltip(): string;
    tooltip(_: string): this;
}

Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse", "pin"], { tags: ["Private"] });
Shape.prototype.publish("width", 24, "number", "Width", null, { tags: ["Private"] });
Shape.prototype.publish("height", 24, "number", "Height", null, { tags: ["Private"] });
Shape.prototype.publish("colorStroke", null, "html-color", "Stroke Color", null, { optional: true });
Shape.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { optional: true });
Shape.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Private"] });
Shape.prototype.publish("cornerRadius", 3, "number", "cornerRadius");
Shape.prototype.publish("arrowHeight", 5, "number", "arrowHeight");
Shape.prototype.publish("arrowWidth", 10, "number", "arrowWidth");
Shape.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

const _origRadius = Shape.prototype.radius;
Shape.prototype.radius = function (_?) {
    const retVal = _origRadius.apply(this, arguments);
    if (arguments.length) {
        this.width(_);
        this.height(_);
        return retVal;
    }
    return Math.max(this.width(), this.height()) / 2;
};
