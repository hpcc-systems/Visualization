import { INDChart, ITooltip } from "@hpcc-js/api";
import { d3SelectionType, SVGWidget } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";
import { select as d3Select } from "d3-selection";
import {
    area as d3Area,
    curveBasis as d3CurveBasis, curveBundle as d3CurveBundle, curveCardinal as d3CurveCardinal, curveCatmullRom as d3curveCatmullRom, curveLinear as d3CurveLinear,
    curveMonotoneX as d3CurveMonotoneX, curveNatural as d3CurveNatural, curveStep as d3CurveStep, curveStepAfter as d3CurveStepAfter, curveStepBefore as d3CurveStepBefore,
    line as d3Line
} from "d3-shape";
import { XYAxis } from "./XYAxis";

import "../src/Scatter.css";

export class Scatter extends XYAxis {

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        this
            .xAxisGuideLines_default(true)
            .yAxisGuideLines_default(true)
            ;
    }

    xPos(host: XYAxis, d) {
        return host.orientation() === "horizontal" ? host.dataPos(d.label) : host.valuePos(d.value);
    }

    yPos(host: XYAxis, d) {
        return host.orientation() === "horizontal" ? host.valuePos(d.value) : host.dataPos(d.label);
    }

    private curve(): any {
        switch (this.interpolate()) {
            case "linear":
                return d3CurveLinear;
            case "step":
                return d3CurveStep;
            case "step-before":
                return d3CurveStepBefore;
            case "step-after":
                return d3CurveStepAfter;
            case "basis":
                return d3CurveBasis;
            case "bundle":
                return d3CurveBundle;
            case "cardinal":
                return d3CurveCardinal;
            case "catmullRom":
                return d3curveCatmullRom;
            case "natural":
                return d3CurveNatural;
            case "monotone":
            default:
                return d3CurveMonotoneX;
        }
    }

    layerEnter(host: XYAxis, element: d3SelectionType, duration: number = 250) {
        super.layerEnter(host, element, duration);
        const context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d.label, series: context.layerColumns(host)[d.colIdx], value: d.value });
            })
            ;
    }

    protected _prevPointShape;
    layerUpdate(host: XYAxis, element, duration: number = 250) {
        super.layerUpdate(host, element);
        const isHorizontal = host.orientation() === "horizontal";
        const height = isHorizontal ? this.height() : this.width();
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        if (this._prevPointShape !== this.pointShape()) {
            element.selectAll(".data").remove();
            this._prevPointShape = this.pointShape();
        }

        function mapShape(shape) {
            switch (shape) {
                case "rectangle":
                    return "rect";
                case "circle":
                    return "circle";
                case "cross":
                    return "path";
                default:
            }
        }

        const data = this.flattenData(this.layerColumns(host), this.layerData(host)).map(function (d) {
            d.shape = mapShape(context.pointShape());
            return d;
        });

        const points = element.selectAll(".point").data(data, function (d, idx) { return d.shape + "_" + idx; });
        points.enter().append("g")
            .attr("class", "point")
            .each(function (d2) {
                const element = d3Select(this);
                element
                    .append("circle")
                    .attr("class", "pointSelection")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .call(host._selection.enter.bind(host._selection))
                    .on("click", function (d: any, _idx) {
                        context.click(host.rowToObj(host.data()[d.rowIdx]), context.layerColumns(host)[d.colIdx], host._selection.selected(this));
                    })
                    .on("dblclick", function (d: any, _idx) {
                        context.dblclick(host.rowToObj(host.data()[d.rowIdx]), context.layerColumns(host)[d.colIdx], host._selection.selected(this));
                    })
                    ;
                element
                    .append(d2.shape)
                    .attr("class", "pointShape")
                    ;
            })
            .merge(points)
            .each(function (d2) {
                const elementSelection = d3Select(this).select(".pointSelection");
                elementSelection
                    .attr("cx", function (d) { return context.xPos(host, d); })
                    .attr("cy", function (d) { return context.yPos(host, d); })
                    .attr("r", context.pointSize())
                    ;

                const element = d3Select(this).select(".pointShape");
                switch (d2.shape) {
                    case "rect":
                        element
                            .attr("x", function (d) { return context.xPos(host, d) - context.pointSize() / 2; })
                            .attr("y", function (d) { return context.yPos(host, d) - context.pointSize() / 2; })
                            .attr("width", context.pointSize())
                            .attr("height", context.pointSize())
                            .style("fill", function (d: any, _idx) { return context._palette(context.layerColumns(host)[d.colIdx]); })
                            ;
                        break;
                    case "circle":
                        element
                            .attr("cx", function (d) { return context.xPos(host, d); })
                            .attr("cy", function (d) { return context.yPos(host, d); })
                            .attr("r", context.pointSize() / 2)
                            .style("fill", function (d: any, _idx) { return context._palette(context.layerColumns(host)[d.colIdx]); })
                            ;
                        break;
                    case "path":
                        element
                            .attr("d", function (d: any) {
                                return "M" + (context.xPos(host, d) - context.pointSize() / 2) + " " + (context.yPos(host, d) - context.pointSize() / 2) + " " +
                                    "L" + (context.xPos(host, d) + context.pointSize() / 2) + " " + (context.yPos(host, d) + context.pointSize() / 2) + " " +
                                    "M" + (context.xPos(host, d) - context.pointSize() / 2) + " " + (context.yPos(host, d) + context.pointSize() / 2) + " " +
                                    "L" + (context.xPos(host, d) + context.pointSize() / 2) + " " + (context.yPos(host, d) - context.pointSize() / 2);
                            })
                            .style("stroke", function (d: any) { return context._palette(context.layerColumns(host)[d.colIdx]); })
                            ;
                        break;
                    default:
                }
            })
            ;
        points.exit()
            .remove()
            ;

        const areas = element.selectAll(".area").data(this.layerColumns(host).filter(function (_d, idx) { return context.interpolate() && context.interpolateFill() && idx > 0; }));
        const areasEnter = areas.enter().append("path")
            .attr("class", "area")
            ;
        const area = d3Area()
            .curve(this.curve())
            ;
        if (isHorizontal) {
            area
                .x(function (d) { return context.xPos(host, d); })
                .y0(Math.min(height, this.yPos(host, { value: 0 })))
                .y1(function (d) { return context.yPos(host, d); })
                ;
        } else {
            area
                .y(function (d) { return context.yPos(host, d); })
                .x0(Math.max(0, this.xPos(host, { value: 0 })))
                .x1(function (d) { return context.xPos(host, d); })
                ;
        }
        areasEnter.merge(areas)
            .each(function (_d, idx) {
                const element = d3Select(this);
                element
                    .attr("d", area(data.filter(function (d2) { return d2.colIdx === idx + 1; })))
                    .style("opacity", context.interpolateFillOpacity())
                    .style("stroke", "none")
                    .style("fill", function () { return d3Hsl(context._palette(context.layerColumns(host)[idx + 1])).brighter().toString(); })
                    ;
            });
        areas.exit().remove();

        const lines = element.selectAll(".line").data(this.layerColumns(host).filter(function (_d, idx) { return context.interpolate() && idx > 0; }));
        const linesEnter = lines.enter().append("path")
            .attr("class", "line")
            ;
        const line = d3Line()
            .x(function (d) { return context.xPos(host, d); })
            .y(function (d) { return context.yPos(host, d); })
            .curve(this.curve())
            ;
        linesEnter.merge(lines)
            .each(function (_d, idx) {
                const element = d3Select(this);
                const data2 = data.filter(function (d2) { return d2.colIdx === idx + 1; });
                element
                    .attr("d", line(data2))
                    .style("stroke", function () { return context._palette(context.layerColumns(host)[idx + 1]); })
                    .style("fill", "none")
                    ;
            });
        lines.exit().remove();
    }

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    interpolate_default: { (): string; (_: string): Scatter; };

    //  INDChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
}
Scatter.prototype._class += " chart_Scatter";
Scatter.prototype.implements(INDChart.prototype);
Scatter.prototype.implements(ITooltip.prototype);

export interface Scatter {
    paletteID(): string;
    paletteID(_: string): this;
    pointShape(): string;
    pointShape(_: string): this;
    pointSize(): number;
    pointSize(_: number): this;
    interpolate(): string;
    interpolate(_: string): this;
    interpolateFill(): boolean;
    interpolateFill(_: boolean): this;
    interpolateFill_default(): boolean;
    interpolateFill_default(_: boolean): this;
    interpolateFillOpacity(): number;
    interpolateFillOpacity(_: number): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
}
Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Scatter.prototype.publish("pointShape", "cross", "set", "Shape of the data points", ["circle", "rectangle", "cross"]);
Scatter.prototype.publish("pointSize", 6, "number", "Point Size", null, { range: { min: 1, step: 1, max: 200 } });
Scatter.prototype.publish("interpolate", "", "set", "Interpolate Data", ["", "linear", "step", "step-before", "step-after", "basis", "bundle", "cardinal", "catmullRom", "natural", "monotone"]);
Scatter.prototype.publish("interpolateFill", false, "boolean", "Fill Interpolation");
Scatter.prototype.publish("interpolateFillOpacity", 0.66, "number", "Fill Interpolation Opacity", null, { range: { min: 0, step: 0.01, max: 1 } });
Scatter.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
