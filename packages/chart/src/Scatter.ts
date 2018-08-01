import { INDChart, ITooltip } from "@hpcc-js/api";
import { d3SelectionType, InputField, SVGWidget } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import { scaleLinear as d3ScaleLinear, scaleLog as d3ScaleLog, scalePow as d3ScalePow, scaleSqrt as d3ScaleSqrt } from "d3-scale";
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
    static __inputs: InputField[] = [{
        id: "label",
        type: "any"
    }, {
        id: "values",
        type: "number",
        multi: true
    }];

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

    private getScale() {
        switch (this.pointSizeScale()) {
            case "linear":
                return d3ScaleLinear();
            case "pow":
                return d3ScalePow().exponent(2);
            case "log":
                return d3ScaleLog();
            case "sqrt":
                return d3ScaleSqrt();
        }
    }

    layerEnter(host: XYAxis, element: d3SelectionType, duration: number = 250) {
        super.layerEnter(host, element, duration);
        const context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d.label, series: d.column, value: d.value });
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
        const usePointSizeColumn = this.pointSizeColumn() !== null;
        let pointSizeColumnIdx;
        let extent;
        let scale;
        if (usePointSizeColumn) {
            pointSizeColumnIdx = this.columns().indexOf(this.pointSizeColumn());
            extent = d3Extent(this.data(), d => d[pointSizeColumnIdx]);
            scale = this.getScale().domain(extent);
        }
        const layerColumns = this.layerColumns(host);
        const layerData = this.layerData(host);
        const flatData = this.flattenData(layerColumns, layerData).map(function (d) {
            d.shape = mapShape(context.pointShape());
            d.column = layerColumns[d.colIdx];
            d.row = layerData[d.rowIdx];
            if (extent) {
                d.size = scale(d.row[pointSizeColumnIdx]) * (context.maxPointSize() - context.minPointSize()) + context.minPointSize();
                return d.column === context.pointSizeColumn() ? false : d;
            } else {
                d.size = context.pointSize();
                return d;
            }

        }).filter(d => d);
        const points = element.selectAll(".point").data(flatData, function (d, idx) { return d.shape + "_" + idx; });
        points.enter().append("g")
            .each(function (this: SVGElement, d2) {
                const element = d3Select(this);
                element
                    .append("text")
                    .attr("class", "pointValue")
                    .style("display", "none")
                    .attr("text-anchor", context.valueAnchor())
                    .attr("alignment-baseline", context.valueBaseline())
                    ;
                element
                    .append("circle")
                    .attr("class", "pointSelection")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", (d, i, arr) => context.tooltip.show(d, arr[i]))
                    .call(host._selection.enter.bind(host._selection))
                    .on("click", function (d: any, _idx) {
                        context.click(host.rowToObj(host.data()[d.rowIdx]), d.column, host._selection.selected(this));
                    })
                    .on("dblclick", function (d: any, _idx) {
                        context.dblclick(host.rowToObj(host.data()[d.rowIdx]), d.column, host._selection.selected(this));
                    })
                    ;
                element
                    .append(d2.shape)
                    .attr("class", "pointShape")
                    ;
            })
            .merge(points)
            .attr("class", d => "point series series-" + this.cssTag(d.column))
            .each(function (this: SVGElement, d2) {
                const textSelection = d3Select(this).select(".pointValue");
                textSelection
                    .attr("x", function (d) { return context.xPos(host, d); })
                    .attr("y", function (d) { return context.yPos(host, d); })
                    .style("display", context.showValuesFor().indexOf(d2.colIdx) === -1 ? "none" : "block")
                    .attr("text-anchor", context.valueAnchor())
                    .attr("alignment-baseline", context.valueBaseline())
                    .text(function (d) {
                        return d["value"];
                    });
                const elementSelection = d3Select(this).select(".pointSelection");
                elementSelection
                    .attr("cx", function (d) { return context.xPos(host, d); })
                    .attr("cy", function (d) { return context.yPos(host, d); })
                    .attr("r", d2.size)
                    ;

                const element = d3Select(this).select(".pointShape");
                switch (d2.shape) {
                    case "rect":
                        element
                            .attr("x", function (d) { return context.xPos(host, d) - d2.size / 2; })
                            .attr("y", function (d) { return context.yPos(host, d) - d2.size / 2; })
                            .attr("width", d2.size)
                            .attr("height", d2.size)
                            .style("fill", context.strokeColor(d2.row, d2.column, d2.value))
                            ;
                        break;
                    case "circle":
                        element
                            .attr("cx", function (d) { return context.xPos(host, d); })
                            .attr("cy", function (d) { return context.yPos(host, d); })
                            .attr("r", d2.size * 0.9)
                            .style("fill", context.strokeColor(d2.row, d2.column, d2.value))
                            ;
                        break;
                    case "path":
                        element
                            .attr("d", function (d: any) {
                                return "M" + (context.xPos(host, d) - d2.size / 2) + " " + (context.yPos(host, d) - d2.size / 2) + " " +
                                    "L" + (context.xPos(host, d) + d2.size / 2) + " " + (context.yPos(host, d) + d2.size / 2) + " " +
                                    "M" + (context.xPos(host, d) - d2.size / 2) + " " + (context.yPos(host, d) + d2.size / 2) + " " +
                                    "L" + (context.xPos(host, d) + d2.size / 2) + " " + (context.yPos(host, d) - d2.size / 2);
                            })
                            .style("stroke", context.strokeColor(d2.row, d2.column, d2.value))
                            ;
                        break;
                    default:
                }
            })
            ;
        points.exit()
            .remove()
            ;

        const areas = element.selectAll(".area").data(layerColumns.filter(function (_d, idx) { return context.interpolate() && context.interpolateFill() && idx > 0; }));
        const areasEnter = areas.enter().append("path");
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
            .attr("class", d => "area series series-" + this.cssTag(d))
            .each(function (_d, idx) {
                const element = d3Select(this);
                element
                    .attr("d", area(flatData.filter(function (d2) { return d2.colIdx === idx + 1; })))
                    .style("opacity", context.interpolateFillOpacity())
                    .style("stroke", "none")
                    .style("fill", context.fillColor([], _d, undefined))
                    ;
            });
        areas.exit().remove();

        const lines = element.selectAll(".line").data(layerColumns.filter(function (_d, idx) { return context.interpolate() && idx > 0; }));
        const linesEnter = lines.enter().append("path");
        const line = d3Line()
            .x(function (d) { return context.xPos(host, d); })
            .y(function (d) { return context.yPos(host, d); })
            .curve(this.curve())
            ;
        linesEnter.merge(lines)
            .attr("class", d => "line series series-" + this.cssTag(d))
            .each(function (_d, idx) {
                const element = d3Select(this);
                const data2 = flatData.filter(function (d2) { return d2.colIdx === idx + 1; });
                element
                    .attr("d", line(data2))
                    .style("stroke", context.strokeColor([], _d, undefined))
                    .style("fill", "none")
                    ;
            });
        lines.exit().remove();
    }

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    paletteID: { (): string; (_: string): Scatter; };
    useClonedPalette: { (): boolean; (_: boolean): Scatter; };
    pointSizeScale: { (): string; (_: string): Scatter; };
    pointShape: { (): string; (_: string): Scatter; };
    pointSize: { (): number; (_: number): Scatter; };
    interpolate: { (): string; (_: string): Scatter; };
    interpolate_default: { (): string; (_: string): Scatter; };
    interpolateFill: { (): boolean; (_: boolean): Scatter; };
    interpolateFill_default: { (): boolean; (_: boolean): Scatter; };
    interpolateFillOpacity: { (): number; (_: number): Scatter; };

    //  INDChart
    _palette;
    fillColor: (row, column, value) => string;
    strokeColor: (row, column, value) => string;
    textColor: (row, column, value) => string;
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

Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Scatter.prototype.publish("pointSizeScale", "linear", "set", "pointSizeScale", ["linear", "pow", "log", "sqrt"]);
Scatter.prototype.publish("pointShape", "cross", "set", "Shape of the data points", ["circle", "rectangle", "cross"]);
Scatter.prototype.publish("pointSize", 6, "number", "Point Size", null, { range: { min: 1, step: 1, max: 200 } });
Scatter.prototype.publish("interpolate", "", "set", "Interpolate Data", ["", "linear", "step", "step-before", "step-after", "basis", "bundle", "cardinal", "catmullRom", "natural", "monotone"]);
Scatter.prototype.publish("interpolateFill", false, "boolean", "Fill Interpolation");
Scatter.prototype.publish("interpolateFillOpacity", 0.66, "number", "Fill Interpolation Opacity", null, { range: { min: 0, step: 0.01, max: 1 } });
Scatter.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
