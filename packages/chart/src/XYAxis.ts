import { SVGWidget, Utility } from "@hpcc-js/common";
import { max as d3Max, min as d3Min } from "d3-array";
import { brushSelection as d3BrushSelection, brushX as d3BrushX, brushY as d3BrushY } from "d3-brush";
import { hsl as d3Hsl } from "d3-color";
import { event as d3Event } from "d3-selection";
import { Axis } from "./Axis";

import "../src/XYAxis.css";

export abstract class XYAxis extends SVGWidget {
    protected domainAxis: Axis;
    protected valueAxis: Axis;
    protected xAxis: Axis;
    protected yAxis: Axis;
    protected xBrush;
    protected yBrush;
    protected margin;
    protected focusChart;
    _palette;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this.domainAxis = new Axis()
            .classed({ domain: true })
            .orientation_default("bottom")
            .type_default("ordinal")
            .overlapMode_default("stagger")
            .shrinkToFit_default("high")
            .extend_default(0)
            ;
        this.valueAxis = new Axis()
            .classed({ value: true })
            .orientation_default("left")
            .type_default("linear")
            .shrinkToFit_default("high")
            ;

        this.xBrush = d3BrushX()
            .on("end", () => {
                return this.brushMoved();
            })
            .on("start.handle brush.handle end.handle", () => {
                return this.brushMoved2();
            })
            ;
        this.yBrush = d3BrushY()
            .on("end", () => {
                return this.brushMoved();
            })
            .on("start.handle brush.handle end.handle", () => {
                return this.brushMoved2();
            })
            ;
    }

    protected _prevBrush;
    resetSelection() {
        this._prevBrush = null;
        return this;
    }

    parseData(d) {
        return this.domainAxis.parse(d);
    }

    parseValue(d) {
        return this.valueAxis.parse(d, true);
    }

    formatData(d) {
        return this.domainAxis.format(d);
    }

    formatValue(d) {
        return this.valueAxis.format(d);
    }

    parsedData() {
        const retVal = this.data().map(function (row) {
            let prevValue = 0;
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return this.parseData(cell);
                }
                if (idx >= this.columns().length) {
                    return cell;
                }
                const _retVal = this.yAxisStacked() ? [prevValue, prevValue + this.parseValue(cell)] : this.parseValue(cell);
                prevValue += this.parseValue(cell);
                return _retVal;
            }, this);
        }, this);
        return retVal;
    }

    protected svg;
    protected svgRegions;
    protected svgDomainGuide;
    protected svgValueGuide;
    protected svgData;
    protected svgDataClipRect;
    protected svgFocus;
    protected svgBrush;
    enter(_domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.svg = element.append("g");
        this.svgRegions = element.append("g");
        this.svgDomainGuide = this.svg.append("g");
        this.svgValueGuide = this.svg.append("g");
        this.svgData = this.svg.append("g");

        this.svgDataClipRect = this.svg.append("clipPath")
            .attr("id", this.id() + "_clippath")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            ;
        this.svgData = this.svg.append("g")
            .attr("clip-path", "url(#" + this.id() + "_clippath)")
            ;
        this._selection.widgetElement(this.svgData);

        this.svgFocus = element.append("g");

        this.domainAxis
            .target(this.svg.node())
            .guideTarget(this.svgDomainGuide.node())
            ;

        this.valueAxis
            .target(this.svg.node())
            .guideTarget(this.svgValueGuide.node())
            ;

        this.svgBrush = element.append("g")
            .attr("class", "brush")
            ;
    }

    resizeBrushHandle(d, width, height) {
        let e;
        let x;
        let y;
        if (d.type === "e" || d.type === "w") {
            e = +(d.type === "e");
            x = e ? 1 : -1;
            y = height / 3;
            return "M" + (0.5 * x) + "," + y +
                "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
                "V" + (2 * y - 6) +
                "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y) +
                "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8);
        } else {
            e = +(d.type === "s");
            y = e ? 1 : -1;
            x = width / 3;
            return "M" + x + ", " + (0.5 * y) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (x + 6) + "," + (6.5 * y) +
                "H" + (2 * x - 6) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (2 * x) + "," + (0.5 * y) +
                "Z" +
                "M" + (x + 8) + "," + (2.5 * y) +
                "H" + (2 * x - 8) +
                "M" + (x + 8) + "," + (4.5 * y) +
                "H" + (2 * x - 8);
        }
    }

    brushMoved() {
        let selected = [];
        const currSel: any = d3BrushSelection(this.svgBrush.node());
        if (currSel) {
            selected = this.data().filter(function (d) {
                let pos = d[0];
                pos = this.domainAxis.d3Scale(pos) + (this.domainAxis.d3Scale.bandwidth ? this.domainAxis.d3Scale.bandwidth() / 2 : 0);
                return pos >= currSel[0] && pos <= currSel[1];
            }, this);
        }
        this.selection(selected);
    }

    brushMoved2() {
        const isHorizontal = this.orientation() === "horizontal";
        const handlePath = this.svgBrush.selectAll(".handle--custom").data(isHorizontal ? [{ type: "w" }, { type: "e" }] : [{ type: "n" }, { type: "s" }]);
        const s = d3Event.selection;
        if (s == null) {
            handlePath.attr("display", "none");
        } else if (isHorizontal) {
            handlePath.attr("display", null).attr("transform", (_d, i) => "translate(" + s[i] + "," + 0 + ")");
        } else {
            handlePath.attr("display", null).attr("transform", (_d, i) => "translate(" + 0 + ", " + s[i] + ")");
        }
    }

    dataPos(d) {
        return this.domainAxis.scalePos(d);
    }

    valuePos(d) {
        return this.valueAxis.scalePos(d);
    }

    setScaleRange(width, height) {
        this.xAxis.width(width);
        this.yAxis.height(height);
    }

    calcMargin(_domNode, element, isHorizontal) {
        const margin = {
            top: !isHorizontal && this.selectionMode() ? 10 : 2,
            right: isHorizontal && (this.selectionMode() || this.xAxisFocus()) ? 10 : 2,
            bottom: (this.xAxisFocus() ? this.xAxisFocusHeight() : 0) + 2,
            left: 2
        };
        const width = this.width() - margin.left - margin.right;
        const height = this.height() - margin.top - margin.bottom;

        let xHeight = 30;
        let yWidth = 30;
        for (let i = 0; i < 10; ++i) {
            this.xAxis.width(width - yWidth).height(0);
            const xAxisOverlap = this.xAxis.calcOverflow(element);

            this.yAxis.width(0).height(height - xHeight);
            const yAxisOverlap = this.yAxis.calcOverflow(element);

            const newXHeight = xAxisOverlap.depth;
            const newYWidth = yAxisOverlap.depth;

            if (newXHeight === xHeight && newYWidth === yWidth) {
                xHeight = newXHeight;
                yWidth = newYWidth;
                break;
            }
            xHeight = newXHeight;
            yWidth = newYWidth;
        }
        this.xAxis
            .x(width / 2 + yWidth / 2 + margin.left)
            .y(height + margin.top)
            .width(width - yWidth)
            ;
        this.yAxis
            .x(margin.left)
            .y(height / 2 - xHeight / 2 + margin.top)
            .height(height - xHeight)
            ;
        margin.left += yWidth;
        margin.bottom += xHeight;
        return margin;
    }

    updateRegions(_domNode, _element, isHorizontal) {
        const context = this;

        const regions = this.svgRegions.selectAll(".region").data(this.regions());
        regions.enter().append("rect")
            .attr("class", "region")
            ;
        if (isHorizontal) {
            regions
                .attr("x", function (d) { return context.dataPos(d.x0); })
                .attr("y", 0)
                .attr("width", function (d) { return context.dataPos(d.x1) - context.dataPos(d.x0); })
                .attr("height", this.height())
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3Hsl(context._palette(d.colorID)).brighter(); })
                ;
        } else {
            regions
                .attr("x", 0)
                .attr("y", function (d) { return context.dataPos(d.x0); })
                .attr("width", this.width())
                .attr("height", function (d) { return context.dataPos(d.x0) - context.dataPos(d.x1); })
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3Hsl(context._palette(d.colorID)).brighter(); })
                ;
        }
        regions.exit().remove();
    }

    protected _prevXAxisType;
    update(domNode, element) {
        const context = this;

        const isHorizontal = this.orientation() === "horizontal";
        this.updateRegions(domNode, element, isHorizontal);

        this.domainAxis
            .orientation(isHorizontal ? "bottom" : "left")
            .title(this.columns()[0])
            ;
        this.valueAxis
            .orientation(isHorizontal ? "left" : "bottom")
            ;
        this.xAxis = isHorizontal ? this.domainAxis : this.valueAxis;
        this.yAxis = isHorizontal ? this.valueAxis : this.domainAxis;

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "ordinal":
                this.domainAxis.ordinals(this.data().map(function (d) { return d[0]; }));
                break;
            default:
                const domainMin = this.xAxisDomainLow() ? this.xAxisDomainLow() : this.domainAxis.parseInvert(d3Min(this.parsedData(), function (data) {
                    return data[0];
                }));
                const domainMax = this.xAxisDomainHigh() ? this.xAxisDomainHigh() : this.domainAxis.parseInvert(d3Max(this.parsedData(), function (data) {
                    return data[0];
                }));
                if (domainMin !== undefined && domainMax !== undefined) {
                    this.domainAxis
                        .low(domainMin)
                        .high(domainMax)
                        ;
                }
                break;
        }

        const min = this.yAxisDomainLow() ? this.yAxisDomainLow() : this.valueAxis.parseInvert(d3Min(this.parsedData(), function (data: any[]) {
            return d3Min(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[0] : d; });
        }));
        const max = this.yAxisDomainHigh() ? this.yAxisDomainHigh() : this.valueAxis.parseInvert(d3Max(this.parsedData(), function (data: any[]) {
            return d3Max(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[1] : d; });
        }));
        this.valueAxis
            .low(min)
            .high(max)
            ;

        //  Calculate Margins  ---
        this.margin = this.calcMargin(domNode, element, isHorizontal);

        //  Update Range  ---
        let width = this.width() - this.margin.left - this.margin.right;
        if (width < 0) width = 0;
        let height = this.height() - this.margin.top - this.margin.bottom;
        if (height < 0) height = 0;
        const maxCurrExtent = isHorizontal ? width : height;
        const maxOtherExtent = isHorizontal ? height : width;

        //  Render  ---
        this.domainAxis
            .tickLength(this.xAxisGuideLines() ? maxOtherExtent : 0)
            .render()
            ;
        this.valueAxis
            .tickLength(this.yAxisGuideLines() ? maxCurrExtent : 0)
            .render()
            ;

        this.svgDataClipRect
            .attr("width", width)
            .attr("height", height)
            ;
        this.svgData.transition()
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            ;

        this.updateBrush(width, height, maxCurrExtent, isHorizontal);
        this.updateFocusChart(domNode, element, this.margin, width, height, isHorizontal);
        this.updateChart(domNode, element, this.margin, width, height, isHorizontal, 250);
    }

    updateBrush(width, height, maxCurrExtent, isHorizontal) {
        const currBrush = isHorizontal ? this.xBrush : this.yBrush;
        const prevBrushSel: any = d3BrushSelection(this.svgBrush.node());
        currBrush.extent([[0, 0], [width, height]]);
        this.svgBrush
            .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .style("display", this.selectionMode() ? null : "none")
            .call(currBrush)
            ;

        const handlePath = this.svgBrush.selectAll(".handle--custom").data(isHorizontal ? [{ type: "w" }, { type: "e" }] : [{ type: "n" }, { type: "s" }]);
        handlePath.enter().append("path")
            .attr("class", "handle--custom")
            .merge(handlePath)
            .attr("cursor", isHorizontal ? "ew-resize" : "ns-resize")
            .attr("d", (d) => this.resizeBrushHandle(d, width, height))
            ;

        if (this.selectionMode()) {
            if (this._prevXAxisType !== this.xAxisType()) {
                this._prevXAxisType = this.xAxisType();
                this._prevBrush = null;
            }
            if (this._prevBrush) {
                if (prevBrushSel) {
                    if (this._prevBrush.orientation !== this.orientation()) {
                        const tmp = prevBrushSel[0];
                        prevBrushSel[0] = this._prevBrush.maxCurrExtent - prevBrushSel[1];
                        prevBrushSel[1] = this._prevBrush.maxCurrExtent - tmp;
                    }
                    const ratio = maxCurrExtent / this._prevBrush.maxCurrExtent;
                    if (ratio !== 1) {
                        this.svgBrush.transition()
                            .on("start", function () {
                                currBrush.on("end", null);
                            })
                            .call(currBrush.move, [prevBrushSel[0] * ratio, prevBrushSel[1] * ratio])
                            .on("end", function () {
                                currBrush.on("end", () => {
                                    return this.brushMoved();
                                });
                            })
                            ;
                    }
                }
            } else {
                this.svgBrush
                    .call(currBrush.move, [0, maxCurrExtent])
                    ;
            }
            this._prevBrush = {
                orientation: this.orientation(),
                maxCurrExtent
            };
        }
    }

    updateFocusChart(domNode, element, margin, width, height, isHorizontal) {
        const context: any = this;
        const focusChart = this.svgFocus.selectAll("#" + this.id() + "_focusChart").data(this.xAxisFocus() ? [true] : []);
        focusChart.enter().append("g")
            .attr("id", this.id() + "_focusChart")
            .attr("class", "focus")
            .each(function () {
                context.focusChart = new context.constructor()
                    .target(this)
                    ;
                context.focusChart.xBrush
                    .on("brush.focus", function () {
                        syncAxis();
                        context.updateChart(domNode, element, margin, width, height, isHorizontal, 0);
                    })
                    ;
            })
            .merge(focusChart)
            .each(function () {
                context.copyPropsTo(context.focusChart);
                context.focusChart
                    .xAxisFocus(false)
                    .selectionMode(true)
                    .tooltipStyle("none")
                    .orientation("horizontal")
                    .xAxisGuideLines(false)
                    .xAxisDomainLow(null)
                    .xAxisDomainHigh(null)
                    .yAxisGuideLines(false)
                    .x(context.width() / 2)
                    .y(context.height() - context.xAxisFocusHeight() / 2)
                    .width(context.width())
                    .height(context.xAxisFocusHeight())
                    .columns(context.columns())
                    .data(context.data())
                    .render()
                    ;
                syncAxis();
            })
            ;
        focusChart.exit()
            .each(function () {
                if (context.focusChart) {
                    context.focusChart
                        .target(null)
                        ;
                    delete context.focusChart;
                }
            })
            .remove()
            ;

        function syncAxis() {
            const currSel = d3BrushSelection(context.focusChart.svgBrush.node()) as [number, number];
            if (currSel) {
                if (context.focusChart.xAxisType() !== "ordinal") {
                    console.log(JSON.stringify([context.focusChart.xAxis.invert(currSel[0]), context.focusChart.xAxis.invert(currSel[1])]));
                    context.xAxis.domain([context.focusChart.xAxis.invert(currSel[0]), context.focusChart.xAxis.invert(currSel[1])]);
                } else {
                    const brushWidth = currSel[1] - currSel[0];
                    const scale = brushWidth / width;
                    context.xAxis.range([-currSel[0] / scale, (width - currSel[0]) / scale]);
                }
                context.xAxis.svgAxis.call(context.xAxis.d3Axis);
                context.xAxis.svgGuides.call(context.xAxis.d3Guides);
            }
        }
    }

    abstract updateChart(_domNode, _element, _margin, _width, _height, _isHorizontal, _duration): void;

    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    selection(_selected) {
        console.log(_selected);
    }

    orientation: { (): string; (_: string): XYAxis; };
    orientation_default: { (): string; (_: string): XYAxis; };
    selectionMode: { (): boolean; (_: boolean): XYAxis; };
    imageUrl: { (): string; (_: string): XYAxis; };
    xAxisTickCount: { (): number; (_: number): XYAxis; };
    xAxisTickFormat: { (): string; (_: string): XYAxis; };
    xAxisType: { (): string; (_: string): XYAxis; };
    xAxisType_default: { (): string; (_: string): XYAxis; };
    xAxisTypeTimePattern: { (): string; (_: string): XYAxis; };
    xAxisDomainLow: { (): string; (_: string): XYAxis; };
    xAxisDomainHigh: { (): string; (_: string): XYAxis; };

    xAxisOverlapMode: { (): string; (_: string): XYAxis; };
    xAxisLabelRotation: { (): number; (_: number): XYAxis; };
    xAxisDomainPadding: { (): number; (_: number): XYAxis; };
    xAxisGuideLines: { (): boolean; (_: boolean): XYAxis; };
    xAxisGuideLines_default: { (): boolean; (_: boolean): XYAxis; };
    xAxisFocus: { (): boolean; (_: boolean): XYAxis; };
    xAxisFocusHeight: { (): number; (_: number): XYAxis; };
    xAxisHidden: { (): boolean; (_: boolean): XYAxis; };
    xAxisHidden_default: { (): boolean; (_: boolean): XYAxis; };

    yAxisTitle: { (): string; (_: string): XYAxis; };
    yAxisTickCount: { (): number; (_: number): XYAxis; };
    yAxisTickFormat: { (): string; (_: string): XYAxis; };
    yAxisType: { (): string; (_: string): XYAxis; };
    yAxisType_default: { (): string; (_: string): XYAxis; };
    yAxisTypeTimePattern: { (): string; (_: string): XYAxis; };
    yAxisTypePowExponent: { (): number; (_: number): XYAxis; };
    yAxisTypeLogBase: { (): number; (_: number): XYAxis; };
    yAxisStacked: { (): boolean; (_: boolean): XYAxis; };
    yAxisDomainLow: { (): string; (_: string): XYAxis; };
    yAxisDomainHigh: { (): string; (_: string): XYAxis; };
    yAxisDomainPadding: { (): number; (_: number): XYAxis; };
    yAxisGuideLines: { (): boolean; (_: boolean): XYAxis; };
    yAxisGuideLines_default: { (): boolean; (_: boolean): XYAxis; };
    yAxisHidden: { (): boolean; (_: boolean): XYAxis; };
    yAxisHidden_default: { (): boolean; (_: boolean): XYAxis; };

    regions: { (): any[]; (_: string): XYAxis; };
    sampleData: { (): string; (_: string): XYAxis; };

    //  Selection  ---
    protected _selection;
}
XYAxis.prototype._class += " chart_XYAxis";
XYAxis.prototype.mixin(Utility.SimpleSelectionMixin);

XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");

XYAxis.prototype.publishProxy("xAxisTickCount", "domainAxis", "tickCount");
XYAxis.prototype.publishProxy("xAxisTickFormat", "domainAxis", "tickFormat");
XYAxis.prototype.publishProxy("xAxisType", "domainAxis", "type");
XYAxis.prototype.publishProxy("xAxisTypeTimePattern", "domainAxis", "timePattern");
XYAxis.prototype.publish("xAxisDomainLow", null, "string", "X-Axis Low", null, { optional: true, disable: (w: any) => w.xAxisType() === "ordinal" });
XYAxis.prototype.publish("xAxisDomainHigh", null, "string", "X-Axis High", null, { optional: true, disable: (w: any) => w.xAxisType() === "ordinal" });
XYAxis.prototype.publishProxy("xAxisOverlapMode", "domainAxis", "overlapMode");
XYAxis.prototype.publishProxy("xAxisLabelRotation", "domainAxis", "labelRotation");
XYAxis.prototype.publishProxy("xAxisDomainPadding", "domainAxis", "extend");
XYAxis.prototype.publish("xAxisGuideLines", false, "boolean", "Y-Axis Guide Lines");
XYAxis.prototype.publish("xAxisFocus", false, "boolean", "X-Axis Focus", null, { disable: (w: any) => w.orientation() !== "horizontal" });
XYAxis.prototype.publish("xAxisFocusHeight", 80, "number", "X-Axis Focus Height", null, { disable: (w: any) => !w.xAxisFocus() });
XYAxis.prototype.publishProxy("xAxisHidden", "domainAxis", "hidden");

XYAxis.prototype.publishProxy("yAxisTitle", "valueAxis", "title");
XYAxis.prototype.publishProxy("yAxisTickCount", "valueAxis", "tickCount");
XYAxis.prototype.publishProxy("yAxisTickFormat", "valueAxis", "tickFormat");
XYAxis.prototype.publishProxy("yAxisType", "valueAxis", "type");
XYAxis.prototype.publishProxy("yAxisTypeTimePattern", "valueAxis", "timePattern");
XYAxis.prototype.publishProxy("yAxisTypePowExponent", "valueAxis", "powExponent");
XYAxis.prototype.publishProxy("yAxisTypeLogBase", "valueAxis", "logBase");
XYAxis.prototype.publish("yAxisStacked", false, "boolean", "Stacked Chart", null, { tags: ["Basic"], disable: (w: any) => w.xAxisType() !== "ordinal" || w._class.indexOf("chart_Column") < 0 });
XYAxis.prototype.publish("yAxisDomainLow", null, "string", "Y-Axis Low", null, { optional: true, disable: (w: any) => w.yAxisType() === "ordinal" });
XYAxis.prototype.publish("yAxisDomainHigh", null, "string", "Y-Axis High", null, { optional: true, disable: (w: any) => w.yAxisType() === "ordinal" });
XYAxis.prototype.publishProxy("yAxisDomainPadding", "valueAxis", "extend");
XYAxis.prototype.publish("yAxisGuideLines", true, "boolean", "Y-Axis Guide Lines");
XYAxis.prototype.publishProxy("yAxisHidden", "valueAxis", "hidden");

XYAxis.prototype.publish("regions", [], "array", "Regions");

XYAxis.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "ordinalRange", "linear", "time-x", "time-y"]);
