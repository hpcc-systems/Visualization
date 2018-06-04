import { I2DChart, ITooltip } from "@hpcc-js/api";
import { SVGWidget, Utility } from "@hpcc-js/common";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { select as d3Select } from "d3-selection";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";

import "../src/Pie.css";

export class Pie extends SVGWidget {

    d3Pie;
    d3Arc;
    d3LabelArc;
    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this.d3Pie = d3Pie()
            .padAngle(0.0025)
            .sort(function (b, a) {
                return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            })
            .value(function (d) {
                return d[1];
            })
            ;

        this.d3Arc = d3Arc();
        this.d3LabelArc = d3Arc();
        this
            .tooltipTick_default(false)
            .tooltipOffset_default(0)
            ;
    }

    intersection(pointA, pointB) {
        return this.intersectCircle(this.calcOuterRadius(), pointA, pointB);
    }

    calcInnerRadius() {
        return this.innerRadius_exists() ? this.calcOuterRadius() * (this.innerRadius() as number) / 100 : 0;
    }

    calcOuterRadius() {
        const maxTextWidth = this.textSize(this.data().map(d => d[0]), "Verdana", 12).width;
        return Math.min(this._size.width - maxTextWidth * 2 - 20, this._size.height - 12 * 3) / 2 - 2;
    }

    _slices;
    _labels;
    enter(_domNode, element) {
        super.enter(_domNode, element);
        this._selection.widgetElement(element);
        this._slices = element.append("g");
        this._labels = element.append("g");
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
        const innerRadius = this.calcInnerRadius();
        const outerRadius = this.calcOuterRadius();
        const labelRadius = outerRadius + 12;
        this.d3Arc
            .innerRadius(innerRadius)
            .padRadius(outerRadius)
            .outerRadius(outerRadius)
            ;
        const arc = this._slices.selectAll(".arc").data(this.d3Pie(this.data()), d => d.data[0]);

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", (d, i) => "arc series series-" + this.cssTag(d.data[0]))
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
            })
            .merge(arc).transition()
            .attr("opacity", 1)
            .each(function (d) {
                d.outerRadius = outerRadius - 5;
                const element2 = d3Select(this);
                element2.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", function (d2: any) { return context._palette(d2.data[0]); })
                    ;
            })
            ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
            ;

        //  Labels  ---
        this.d3LabelArc
            .innerRadius(labelRadius)
            .outerRadius(labelRadius)
            ;
        const text = this._labels.selectAll("text").data(this.d3Pie(this.data()), d => d.data[0]);

        text.enter().append("text")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data[0];
            })
            .on("click", function (d) {
                context._slices.selectAll("g").filter(function (d2) {
                    if (d.data === d2.data) {
                        context._selection.click(this);
                    }
                });
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .merge(text)
            .transition().duration(1000)
            .attrTween("transform", function (d) {
                this._current = this._current || d;
                const interpolate = d3Interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    const pos = context.d3LabelArc.centroid(d2);
                    pos[0] = labelRadius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function (d) {
                this._current = this._current || d;
                const interpolate = d3Interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.exit()
            .remove();

        const polyline = this._labels.selectAll("polyline").data(this.d3Pie(this.data()), d => d.data[0]);

        polyline.enter()
            .append("polyline")
            .merge(polyline)
            .transition().duration(1000)
            .attrTween("points", function (d) {
                this._current = this._current || d;
                const interpolate = d3Interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    const pos = context.d3LabelArc.centroid(d2);
                    const pos1 = context.d3Arc.centroid(d2);
                    const pos2 = [...pos];
                    pos[0] = labelRadius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [pos1, pos2, pos];
                };
            });

        polyline.exit()
            .remove();

        function arcTween(outerRadiusDelta, delay) {
            return function () {
                d3Select(this).transition().delay(delay).attrTween("d", function (d: any) {
                    const i = d3Interpolate(d.outerRadius, outerRadius + outerRadiusDelta);
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
    _selection: Utility.SimpleSelection;
}

Pie.prototype._class += " chart_Pie";
Pie.prototype.implements(I2DChart.prototype);
Pie.prototype.implements(ITooltip.prototype);
Pie.prototype.mixin(Utility.SimpleSelectionMixin);

Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart", null, { tags: ["Basic"], range: { min: 0, step: 1, max: 100 } });
