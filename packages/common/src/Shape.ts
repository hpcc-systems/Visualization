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
        const shape = element.selectAll("rect,circle,ellipse").data([this.shape()], function (d) { return d; });
        const hash = this.hash();
        if (this._prevHash !== hash) {
            this._prevHash = hash;

            const context = this;
            shape.enter().append(this.shape() === "square" ? "rect" : this.shape())
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
                    }
                })
                ;
            shape.exit().remove();
        }
    }

    click() {
    }

    dblclick() {
    }

    shape: { (): string; (_: string): Shape; };
    colorStroke: { (): number; (_: number): Shape; };
    colorFill: { (): string; (_: string): Shape; };
    radius: { (): number; (_: number): Shape; };
    tooltip: { (): string; (_: string): Shape; };

}
Shape.prototype._class += " common_Shape";

Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse"], { tags: ["Private"] });
Shape.prototype.publish("width", 24, "number", "Width", null, { tags: ["Private"] });
Shape.prototype.publish("height", 24, "number", "Height", null, { tags: ["Private"] });
Shape.prototype.publish("colorStroke", null, "html-color", "Stroke Color", null, { tags: ["Private"] });
Shape.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { tags: ["Private"] });
Shape.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Private"] });
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
