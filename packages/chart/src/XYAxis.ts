import { SVGWidget, Utility } from "@hpcc-js/common";
import { max as d3Max, min as d3Min } from "d3-array";
import { brush as d3Brush, brushSelection as d3BrushSelection, brushX as d3BrushX, brushY as d3BrushY } from "d3-brush";
import { hsl as d3Hsl } from "d3-color";
import { event as d3Event, select as d3Select } from "d3-selection";
import { Axis } from "./Axis";

import "../src/XYAxis.css";

export class XYAxis extends SVGWidget {
    protected domainAxis: Axis;
    protected valueAxis: Axis;
    protected xAxis: Axis;
    protected yAxis: Axis;
    protected xyBrush;
    protected xBrush;
    protected yBrush;
    protected margin;
    protected focusChart: XYAxis;
    _palette;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this.domainAxis = new Axis()
            .classed({ domain: true })
            .orientation_default("bottom")
            .type("ordinal")
            .overlapMode_default("stagger")
            .shrinkToFit_default("high")
            .extend_default(0)
            ;
        this.valueAxis = new Axis()
            .classed({ value: true })
            .orientation_default("left")
            .type("linear")
            .shrinkToFit_default("high")
            ;

        this.xyBrush = d3Brush()
            .on("end", () => {
                return this.brushMoved();
            })
            .on("start.handle brush.handle end.handle", () => {
                return this.brushMoved2();
            })
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

    bandwidth() {
        return this.domainAxis.bandwidth();
    }

    protected svg;
    protected svgRegions;
    protected svgDomainGuide;
    protected svgValueGuide;
    protected svgData;
    protected svgDataClipRect;
    protected svgFocus;
    protected svgBrush;
    enter(domNode, element) {
        super.enter(domNode, element);
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
        this.chartsEnter(this, this.svgData, 250);
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

    private _skipSelection = false;
    skipSelection(): boolean;
    skipSelection(_: boolean): this;
    skipSelection(_?: boolean): boolean | this {
        if (!arguments.length) return this._skipSelection;
        this._skipSelection = _;
        return this;
    }

    brushMoved() {
        if (this._skipSelection) return;
        let selected = [];
        const context = this;
        const currSel: any = d3BrushSelection(this.svgBrush.node());
        if (currSel) {
            selected = this.data().filter(function (d) {
                const pos = context.dataPos(d[0]);
                if (context.use2dSelection()) {
                    const pos2 = context.valuePos(d[1]) + context.valueAxis.bandwidth() / 2;
                    return pos >= currSel[0][0] && pos <= currSel[1][0] && pos2 >= currSel[0][1] && pos2 <= currSel[1][1];
                } else {
                    return pos >= currSel[0] && pos <= currSel[1];
                }
            });
        }
        this.selection(selected);
    }

    brushMoved2() {
        const isHorizontal = this.orientation() === "horizontal";
        const handleTypes = this.use2dSelection() ? [] : isHorizontal ? [{ type: "w" }, { type: "e" }] : [{ type: "n" }, { type: "s" }];
        const handlePath = this.svgBrush.selectAll(".handle--custom").data(handleTypes);
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

    getAxisSize(host: XYAxis): { width: number, height: number } {
        return {
            width: !this.xAxis ? host.xAxis.width() : this.xAxis.width(),
            height: !this.yAxis ? host.yAxis.width() : this.yAxis.height()
        };
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

        let xRight = 0;
        let xHeight = 30;
        let yTop = 0;
        let yWidth = 30;
        for (let i = 0; i < 10; ++i) {
            this.xAxis.width(width - yWidth).height(0);
            const xAxisOverlap = this.xAxis.calcOverflow(element);
            const newXHeight = xAxisOverlap.depth;

            this.yAxis.width(0).height(height - xHeight);
            const yAxisOverlap = this.yAxis.calcOverflow(element);
            const newYWidth = yAxisOverlap.depth;

            xRight = xAxisOverlap.right;
            yTop = yAxisOverlap.top;

            if (newXHeight === xHeight && newYWidth === yWidth) {
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
        margin.top += yTop;
        margin.right += xRight;
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
        super.update(domNode, element);
        const context = this;

        const isHorizontal = this.orientation() === "horizontal";
        this.updateRegions(domNode, element, isHorizontal);

        this.domainAxis
            .orientation(isHorizontal ? "bottom" : "left")
            .title(this.xAxisTitle_exists() ? this.xAxisTitle() : this.columns()[0])
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
        this.chartsUpdate(width, height, 250);
        if (this.selectionMode()) {
            return this.brushMoved();
        }
    }

    updateBrush(width, height, maxCurrExtent, isHorizontal) {
        const currBrush = this.use2dSelection() ? this.xyBrush : isHorizontal ? this.xBrush : this.yBrush;
        const prevBrushSel: any = d3BrushSelection(this.svgBrush.node());
        currBrush.extent([[0, 0], [width, height]]);
        this.svgBrush
            .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .style("display", this.selectionMode() ? null : "none")
            .call(currBrush)
            ;
        const handleTypes = this.use2dSelection() ? [] : isHorizontal ? [{ type: "w" }, { type: "e" }] : [{ type: "n" }, { type: "s" }];
        const handlePath = this.svgBrush.selectAll(".handle--custom").data(handleTypes);
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
                            .on("end", () => {
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
        const context: XYAxis = this;
        const focusChart = this.svgFocus.selectAll("#" + this.id() + "_focusChart").data(this.xAxisFocus() ? [true] : []);
        focusChart.enter().append("g")
            .attr("id", this.id() + "_focusChart")
            .attr("class", "focus")
            .each(function () {
                context.focusChart = new (context.constructor as any)()
                    .target(this)
                    ;
                context.focusChart.xBrush
                    .on("brush.focus", function () {
                        context.syncAxis(width);
                        context.chartsUpdate(width, height, 0);
                    })
                    ;
                context.focusChart
                    .layers(context.layers().map((w: any) => new w.constructor()))
                    ;
            })
            .merge(focusChart)
            .each(function (this: SVGElement) {
                context.copyPropsTo(context.focusChart, ["layers"]);
                let layerIdx = 0;
                for (const layer of context.layers()) {
                    layer.copyPropsTo(context.focusChart.layers()[layerIdx]);
                    layerIdx++;
                }
                context.focusChart
                    .xAxisFocus(false)
                    .selectionMode(true)
                    .skipSelection(true)
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
                context.syncAxis(width);
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
    }

    syncAxis(width: number) {
        const currSel = d3BrushSelection(this.focusChart.svgBrush.node()) as [number, number];
        if (currSel) {
            if (this.focusChart.xAxisType() !== "ordinal") {
                console.log(JSON.stringify([this.focusChart.xAxis.invert(currSel[0]), this.focusChart.xAxis.invert(currSel[1])]));
                this.xAxis.domain([this.focusChart.xAxis.invert(currSel[0]), this.focusChart.xAxis.invert(currSel[1])]);
            } else {
                const brushWidth = currSel[1] - currSel[0];
                const scale = brushWidth / width;
                this.xAxis.range([-currSel[0] / scale, (width - currSel[0]) / scale]);
            }
            this.xAxis.rerender();
        }
    }

    //  Layers  ---
    layerColumns(host: XYAxis): string[] {
        const masterColumns = host.columns();
        const retVal = super.columns().filter(col => col !== masterColumns[0]);
        if (!retVal.length) {
            return masterColumns;
        }
        return [masterColumns[0], ...retVal];
    }

    layerColumnIndices(host: XYAxis): number[] {
        const masterColumns = host.columns();
        const layerColumns = this.layerColumns(host);
        return layerColumns.map(col => masterColumns.indexOf(col));
    }

    layerColumnIndex(host: XYAxis, column: string): number {
        const masterColumns = host.columns();
        return masterColumns.indexOf(column);
    }

    layerData(host: XYAxis): any[][] {
        if (arguments.length === 1) {
            const indices = this.layerColumnIndices(host);
            return host.data().map(row => {
                const retVal = indices.map(idx => row[idx]);
                (retVal as any).__hpcc_origRow = row;
                return retVal;
            });
        }
        throw new Error("Setting data on XYAxisLayer is not supported.");
    }

    layerEnter(host: XYAxis, element, duration: number = 250) {
    }

    layerUpdate(host: XYAxis, element, duration: number = 250) {
    }

    layerExit(host: XYAxis, element, duration: number = 250) {
    }

    chartsEnter(host: XYAxis, element, duration: number = 250) {
        this.layerEnter(this, element, duration);
        for (const w of this.layers()) {
            w["__xyAxisElement"] = element.append("g")
                .attr("class", w.class())
                ;
            w
                .target(w["__xyAxisElement"].node() as SVGElement)
                .layerEnter(this, element, duration)
                ;
        }
    }

    chartsUpdate(width, height, duration): void {
        this.layerUpdate(this, this.svgData, duration);
        for (const w of this.layers()) {
            w
                .resize({ width, height })
                .layerUpdate(this, w["__xyAxisElement"], duration)
                ;
        }
    }

    exit(domNode, element) {
        this.valueAxis.target(null);
        this.domainAxis.target(null);
        super.exit(domNode, element);
    }

    selection(_selected) {
        const context = this;
        this._selection.widgetElement().selectAll(".selected,.deselected")
            .each(function (d) {
                const selected = _selected.indexOf(d.origRow) >= 0;
                d3Select(this)
                    .classed("selected", selected)
                    .classed("deselected", !selected)
                    .attr("filter", context._selection.svgGlowID() && selected ? `url(#${context._selection.svgGlowID()})` : null)
                    ;
            })
            ;

        const selRows = _selected.map(d => {
            return this.rowToObj(d);
        });
        setTimeout(() => {
            this.click(selRows, "", true);
        }, 0);
    }

    //  Events  ---
    click(row: object[], column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    //  Selection  ---
    _selection: Utility.SimpleSelection;
}
XYAxis.prototype._class += " chart_XYAxis";
XYAxis.prototype.mixin(Utility.SimpleSelectionMixin);

export interface XYAxis {
    orientation(): "horizontal" | "vertical";
    orientation(_: "horizontal" | "vertical"): this;
    orientation_default(_: string);
    pointSizeColumn(): string;
    pointSizeColumn(_: string): this;
    pointSizeColumn_exists(): boolean;
    minPointSize(): number;
    minPointSize(_: number): this;
    maxPointSize(): number;
    maxPointSize(_: number): this;
    use2dSelection(): boolean;
    use2dSelection(_: boolean): this;
    selectionMode(): boolean;
    selectionMode(_: boolean): this;
    xAxisTitle(): string;
    xAxisTitle(_: string): this;
    xAxisTitle_exists(): boolean;
    xAxisTickCount(): number;
    xAxisTickCount(_: number): this;
    xAxisTickFormat(): string;
    xAxisTickFormat(_: string): this;
    xAxisType(): "none" | "ordinal" | "linear" | "pow" | "log" | "time";
    xAxisType(_: "none" | "ordinal" | "linear" | "pow" | "log" | "time"): this;
    xAxisType_default(_: string);
    xAxisTypeTimePattern(): string;
    xAxisTypeTimePattern(_: string): this;
    xAxisDomainLow(): number | string;
    xAxisDomainLow(_: number | string): this;
    xAxisDomainHigh(): number | string;
    xAxisDomainHigh(_: number | string): this;
    xAxisOrdinalPaddingInner(): number;
    xAxisOrdinalPaddingInner(_: number): this;
    xAxisOrdinalPaddingOuter(): number;
    xAxisOrdinalPaddingOuter(_: number): this;
    xAxisOverlapMode(): "none" | "stagger" | "hide" | "rotate" | "linebreak" | "wrap";
    xAxisOverlapMode(_: "none" | "stagger" | "hide" | "rotate" | "linebreak" | "wrap"): this;
    xAxisLabelRotation(): number;
    xAxisLabelRotation(_: number): this;
    xAxisDomainPadding(): number;
    xAxisDomainPadding(_: number): this;
    xAxisGuideLines(): boolean;
    xAxisGuideLines(_: boolean): this;
    xAxisGuideLines_default(_: boolean);
    xAxisFocus(): boolean;
    xAxisFocus(_: boolean): this;
    xAxisFocusHeight(): number;
    xAxisFocusHeight(_: number): this;
    xAxisHidden(): boolean;
    xAxisHidden(_: boolean): this;
    xAxisHidden_default(_: boolean);
    yAxisTitle(): string;
    yAxisTitle(_: string): this;
    yAxisTickCount(): number;
    yAxisTickCount(_: number): this;
    yAxisTickFormat(): string;
    yAxisTickFormat(_: string): this;
    yAxisType(): "none" | "ordinal" | "linear" | "pow" | "log" | "time";
    yAxisType(_: "none" | "ordinal" | "linear" | "pow" | "log" | "time"): this;
    yAxisType_default(_: string);
    yAxisTypeTimePattern(): string;
    yAxisTypeTimePattern(_: string): this;
    yAxisTypePowExponent(): number;
    yAxisTypePowExponent(_: number): this;
    yAxisTypeLogBase(): number;
    yAxisTypeLogBase(_: number): this;
    yAxisStacked(): boolean;
    yAxisStacked(_: boolean): this;
    yAxisDomainLow(): number | string;
    yAxisDomainLow(_: number | string): this;
    yAxisDomainHigh(): number | string;
    yAxisDomainHigh(_: number | string): this;
    yAxisDomainPadding(): number;
    yAxisDomainPadding(_: number): this;
    yAxisGuideLines(): boolean;
    yAxisGuideLines(_: boolean): this;
    yAxisGuideLines_default(_: boolean);
    yAxisHidden(): boolean;
    yAxisHidden(_: boolean): this;
    yAxisHidden_default(_: boolean);
    regions(): object[];
    regions(_: object[]): this;
    layers(): XYAxis[];
    layers(_: XYAxis[]): this;
}

XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
XYAxis.prototype.publish("pointSizeColumn", null, "string", "pointSizeColumn", null, { optional: true });
XYAxis.prototype.publish("minPointSize", 6, "number", "minPointSize");
XYAxis.prototype.publish("maxPointSize", 26, "number", "maxPointSize");
XYAxis.prototype.publish("use2dSelection", false, "boolean", "2D Range Selector");
XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");
XYAxis.prototype.publishProxy("xAxisTitle", "domainAxis", "title");
XYAxis.prototype.publishProxy("xAxisTickCount", "domainAxis", "tickCount");
XYAxis.prototype.publishProxy("xAxisTickFormat", "domainAxis", "tickFormat");
XYAxis.prototype.publishProxy("xAxisType", "domainAxis", "type");
XYAxis.prototype.publishProxy("xAxisTypeTimePattern", "domainAxis", "timePattern");
XYAxis.prototype.publish("xAxisDomainLow", null, "string", "X-Axis Low", null, { optional: true, disable: (w: XYAxis) => w.xAxisType() === "ordinal" });
XYAxis.prototype.publish("xAxisDomainHigh", null, "string", "X-Axis High", null, { optional: true, disable: (w: XYAxis) => w.xAxisType() === "ordinal" });
XYAxis.prototype.publishProxy("xAxisOrdinalPaddingInner", "domainAxis", "ordinalPaddingInner");
XYAxis.prototype.publishProxy("xAxisOrdinalPaddingOuter", "domainAxis", "ordinalPaddingOuter");
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
XYAxis.prototype.publish("layers", [], "widgetArray", "Layers", null, { render: false });
