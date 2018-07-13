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
        const shape = element.selectAll("rect,circle,ellipse,path,polygon").data([this.shape()], function (d) { return d; });
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
                                .attr("rx", context.cornerRadius())
                                .attr("ry", context.cornerRadius())
                                .attr("width", width)
                                .attr("height", width)
                                ;
                            break;
                        case "rect":
                            element2
                                .attr("x", -context.width() / 2)
                                .attr("y", -context.height() / 2)
                                .attr("rx", context.cornerRadius())
                                .attr("ry", context.cornerRadius())
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
                        case "polygon":
                            const size = Math.min(context.width(), context.height());
                            const x = -size / 2;
                            const y = -size / 2;
                            element2
                                .attr("points", context.polygonPoints(x, y, size, size, context.polygonSerial()))
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
    polygonPoints(x: number, y: number, width: number, height: number, _fingerprint?: string): string {
        if (!_fingerprint) {
            _fingerprint = "6";
        }
        const fp_arr = _fingerprint.split(":");
        const side_count = parseInt(fp_arr[0]);
        const mod1 = fp_arr[1] ? parseInt(fp_arr[1]) : 1;
        const mod2 = fp_arr[2] ? parseInt(fp_arr[2]) : undefined;
        const mult1 = fp_arr[3] ? parseFloat(fp_arr[3]) : undefined;
        const mult2 = fp_arr[4] ? parseFloat(fp_arr[4]) : undefined;
        const rot1 = fp_arr[5] ? parseFloat(fp_arr[5]) : undefined;
        return get_polygon_points(x, y, width, height, side_count, mod1, mod2, mult1, mult2, rot1);

        function get_polygon_points(x, y, w, h, side_count, mod1?: number, mod2?: number, mult1?: number, mult2?: number, rot1?: number) {
            return Array(side_count)["fill"]("")
                .map((_, i) => get_point(i))
                .join(" ")
                ;
            function get_point(n) {
                const rad = (2 * Math.PI) / side_count;
                let radius_mult = 0.618 / 2;
                if (n % 2) {
                    radius_mult = !mod1 || n % mod1 ? radius_mult : mult1;
                } else {
                    radius_mult = !mod2 || n % mod2 ? radius_mult : mult2;
                }
                return [
                    x + Math.cos(rad * (n + rot1)) * w * radius_mult + w / 2,
                    y + Math.sin(rad * (n + rot1)) * h * radius_mult + h / 2
                ].join(",");
            }
        }
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
    polygonSerial(): string;
    polygonSerial(_: string): this;
}

Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse", "pin", "polygon"], { tags: ["Private"] });
Shape.prototype.publish("width", 24, "number", "Width", null, { tags: ["Private"] });
Shape.prototype.publish("height", 24, "number", "Height", null, { tags: ["Private"] });
Shape.prototype.publish("colorStroke", null, "html-color", "Stroke Color", null, { optional: true });
Shape.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { optional: true });
Shape.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Private"] });
Shape.prototype.publish("cornerRadius", 3, "number", "cornerRadius");
Shape.prototype.publish("arrowHeight", 5, "number", "arrowHeight");
Shape.prototype.publish("arrowWidth", 10, "number", "arrowWidth");
Shape.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
Shape.prototype.publish("polygonSerial", null, "string", "polygonSerial", null, { tags: ["Private"] });

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
