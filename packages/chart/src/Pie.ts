import { I2DChart, ITooltip } from "@hpcc-js/api";
import { FAChar, SVGWidget, Text, Utility } from "@hpcc-js/common";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { select as d3Select } from "d3-selection";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";

import "../src/Pie.css";

export class Pie extends SVGWidget {
    labelWidgets;
    d3Pie;
    d3Arc;
    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this.labelWidgets = {};

        this.d3Pie = d3Pie()
            .padAngle(0.0025)
            .sort(function (b, a) {
                return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            })
            .value(function (d) {
                return d[1];
            })
            ;
        this.d3Arc = d3Arc()
            .padRadius(this.calcRadius())
            .innerRadius(this.innerRadius())
            ;
        this
            .tooltipTick_default(false)
            .tooltipOffset_default(0)
            ;
    }

    pointInArc(pt, ptData) {
        const r1 = this.d3Arc.innerRadius()(ptData);
        const r2 = this.d3Arc.outerRadius()(ptData);
        const theta1 = this.d3Arc.startAngle()(ptData);
        const theta2 = this.d3Arc.endAngle()(ptData);

        const dist = pt.x * pt.x + pt.y * pt.y;
        let angle = Math.atan2(pt.x, -pt.y);

        angle = (angle < 0) ? (angle + Math.PI * 2) : angle;

        return (r1 * r1 <= dist) && (dist <= r2 * r2) && (theta1 <= angle) && (angle <= theta2);
    }

    boxInArc(pos, bb, ptData) {
        const topLeft = { x: pos.x + bb.x, y: pos.y + bb.y };
        const topRight = { x: topLeft.x + bb.width, y: topLeft.y };
        const bottomLeft = { x: topLeft.x, y: topLeft.y + bb.height };
        const bottomRight = { x: topLeft.x + bb.width, y: topLeft.y + bb.height };
        return this.pointInArc(topLeft, ptData) && this.pointInArc(topRight, ptData) && this.pointInArc(bottomLeft, ptData) && this.pointInArc(bottomRight, ptData);
    }

    calcRadius() {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    }

    intersection(pointA, pointB) {
        return this.intersectCircle(this.calcRadius(), pointA, pointB);
    }

    enter(_domNode, element) {
        super.enter(_domNode, element);
        this._selection.widgetElement(element);
        const context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d.data[0], value: d.data[1] });
            })
            ;
    }

    update(_domNode, element) {
        super.update(_domNode, element);
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        this.d3Arc.innerRadius(this.innerRadius_exists() ? this.calcRadius() * (this.innerRadius() as number) / 100 : 0);
        const arc = element.selectAll(".arc").data(this.d3Pie(this.data()), function (d) {
            return d.data[0];
        });

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", "arc")
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                const element2 = d3Select(this);
                element2.append("path")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("mouseover", arcTween(0, 0))
                    .on("mouseout", arcTween(-5, 150))
                    ;
                if (d.data.__viz_faChar) {
                    context.labelWidgets[d.data[0]] = new FAChar()
                        .char(d.data.__viz_faChar)
                        .target(this)
                        .render()
                        ;
                } else {
                    context.labelWidgets[d.data[0]] = new Text()
                        .text(d.data[0])
                        .target(this)
                        .render()
                        ;
                }
            })
            .merge(arc).transition()
            .attr("opacity", 1)
            .each(function (d) {
                d.outerRadius = context.calcRadius() - 5;
                let pos = { x: 0, y: 1 };
                if (context.outerText()) {
                    const xFactor = Math.cos((d.startAngle + d.endAngle - Math.PI) / 2);
                    const yFactor = Math.sin((d.startAngle + d.endAngle - Math.PI) / 2);

                    const textBBox = context.labelWidgets[d.data[0]].getBBox();
                    const textOffset = Math.abs(xFactor) > Math.abs(yFactor) ? textBBox.width : textBBox.height;
                    pos.x = xFactor * (context.calcRadius() + textOffset);
                    pos.y = yFactor * (context.calcRadius() + textOffset);
                } else {
                    const centroid = context.d3Arc.centroid(d);
                    pos = { x: centroid[0], y: centroid[1] };
                }

                const element2 = d3Select(this);
                element2.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", function (d2: any) { return context._palette(d2.data[0]); })
                    ;
                context.labelWidgets[d.data[0]]
                    .pos(pos)
                    .render()
                    .element()
                    .classed("innerLabel", !context.outerText())
                    .classed("outerLabel", context.outerText())
                    .style("opacity", (context.outerText() || context.boxInArc(pos, context.labelWidgets[d.data[0]].getBBox(), d)) ? null : 0)
                    ;
            })
            ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
            ;

        //  Label Lines  ---
        if (context.outerText()) {
            const lines = element.selectAll("line").data(this.d3Pie(this.data()), function (d) { return d.data[0]; });
            lines.enter().append("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", -this.calcRadius() - 3)
                .attr("y2", -this.calcRadius() - 8)
                .attr("stroke", "gray")
                .attr("transform", function (d) {
                    return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
                });
            lines.transition()
                .attr("transform", function (d) {
                    return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
                });
            lines.exit().remove();
        }

        function arcTween(outerRadiusDelta, delay) {
            return function () {
                d3Select(this).transition().delay(delay).attrTween("d", function (d: any) {
                    const i = d3Interpolate(d.outerRadius, context.calcRadius() + outerRadiusDelta);
                    return function (t) { d.outerRadius = i(t); return context.d3Arc(d); };
                });
            };
        }
    }

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    paletteID: (_?: string) => string | Pie;
    useClonedPalette: (_?: boolean) => boolean | Pie;
    outerText: (_?: boolean) => boolean | Pie;
    innerRadius: { (): number; (_: number): Pie; };
    innerRadius_exists: () => boolean;

    //  I2DChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    tooltipTick: { (): boolean; (_: boolean): Pie; };
    tooltipTick_default: { (): boolean; (_: boolean): Pie; };
    tooltipOffset: { (): number; (_: number): Pie; };
    tooltipOffset_default: { (): number; (_: number): Pie; };

    //  SimpleSelectionMixin
    _selection;
}

Pie.prototype._class += " chart_Pie";
Pie.prototype.implements(I2DChart.prototype);
Pie.prototype.implements(ITooltip.prototype);
Pie.prototype.mixin(Utility.SimpleSelectionMixin);

Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Pie.prototype.publish("outerText", false, "boolean", "Sets label position inside or outside chart", null, { tags: ["Basic"] });
Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart", null, { tags: ["Basic"], range: { min: 0, step: 1, max: 100 } });
