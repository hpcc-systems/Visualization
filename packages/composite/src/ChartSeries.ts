import { Area, Column, Contour, Line, Scatter } from "@hpcc-js/chart";
import { HTMLWidget, Palette } from "@hpcc-js/common";
import { FlexGrid } from "@hpcc-js/layout";

export class ChartSeries extends HTMLWidget {
    _grid;
    _widgetPrototypes;
    _widgetCache = [];
    _palette;
    _paletteCache = {};
    constructor() {
        super();
        this._grid = new FlexGrid()
            .flexBasis("100%")
            .orientation("horizontal")
            ;
        this._widgetPrototypes = { Area, Column, Contour, Line, Scatter };
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._grid.target(domNode);
    }
    update(domNode, element) {
        super.update(domNode, element);
        this._palette = this._palette.switch(this.paletteID());

        const context = this;
        const rowCount = this.data().length;
        let rowHeight = Math.floor( (this.height() - this.xAxisHeight()) / rowCount);
        let columnCount = 1;
        if (this.minimumChartHeight() > rowHeight) {
            const mag = rowHeight / this.minimumChartHeight();
            columnCount = Math.ceil(1 / mag);
            if (columnCount > 1) {
                rowHeight = Math.floor( (this.height() - this.xAxisHeight()) / (rowCount / columnCount));
            }
        }
        const rowWidth = Math.floor(this.width() / columnCount);
        const widgetSelection = element.selectAll(".widget-row").data(this.data());
        let min;
        let max;
        const widgetEnter = widgetSelection.enter()
            .append("div")
            .classed("widget-row", true)
            .style("height", (row, idx) => {
                const h = this.isBottomChart(idx, rowCount, columnCount) ? rowHeight + this.xAxisHeight() : rowHeight;
                return h + "px";
            })
            .style("width", rowWidth + "px")
            .each(function(row, idx) {
                const data = [
                    ...row.slice(1).map((n, i) => [context.columns()[i + 1], n])
                ];
                context._widgetCache[idx] = context.getWidget()
                    .target(this)
                    .columns([row[0], "Value"])
                    .data(data)
                    ;
            })
            ;
        const widgetUpdate = widgetEnter
            .merge(widgetSelection)
            .style("height", (row, idx) => {
                const h = this.isBottomChart(idx, rowCount, columnCount) ? rowHeight + this.xAxisHeight() : rowHeight;
                return h + "px";
            })
            .style("width", rowWidth + "px")
            .style("float", "left")
            .each((row) => {
                row.slice(1).map((n, i) => {
                    if (typeof min === "undefined" || n < min) {
                        min = n;
                    }
                    if (typeof max === "undefined" || n > max) {
                        max = n;
                    }
                    return [this.columns()[i + 1], n];
                });
            })
            .each((row, idx) => {
                switch (this.chartType()) {
                    case "Area":
                        this._widgetCache[idx]
                            .interpolate("linear")
                            .interpolateFill(true)
                            .pointSize(6)
                            ;
                        break;
                    case "Step":
                        this._widgetCache[idx]
                            .interpolate("step")
                            .interpolateFill(true)
                            .pointSize(0)
                            ;
                        break;
                    case "Line":
                        this._widgetCache[idx]
                            .interpolate("linear")
                            .interpolateFill(false)
                            .pointSize(6)
                            ;
                        break;
                    case "Scatter":
                        this._widgetCache[idx]
                            .interpolate("")
                            .interpolateFill(false)
                            .pointSize(6)
                            ;
                        break;
                }
                this._widgetCache[idx]
                    .paletteID(this.getChartPalette(idx))
                    .xAxisHideTicks(!this.isBottomChart(idx, rowCount, columnCount))
                    .xAxisHideLine(!this.isBottomChart(idx, rowCount, columnCount))
                    .yAxisHideTicks(!this.isLeftChart(idx, columnCount))
                    .yAxisHideLine(!this.isLeftChart(idx, columnCount))
                    .yAxisDomainHigh(max)
                    .yAxisDomainLow(min)
                    .xAxisGuideLines(this.xAxisGuideLines())
                    .yAxisGuideLines(this.yAxisGuideLines())
                    .xAxisOverlapMode("rotate")
                    .xAxisLabelRotation(90)
                    .yAxisTickCount(this.yAxisTickCount())
                    .render()
                    ;
            })
            ;
        widgetUpdate
            .exit()
            .each(w => w.target(null))
            .remove()
            ;
    }
    getChartPalette(idx) {
        const paletteName = this.paletteID() + "_" + idx;
        Palette.ordinal(paletteName, [this._palette(idx)]);
        return paletteName;
    }
    isBottomChart(idx, rowCount, columnCount) {
        return idx >= rowCount - columnCount;
    }
    isLeftChart(idx, columnCount) {
        return idx % columnCount === 0;
    }
    resize() {
        const size = super.resize.apply(this, arguments);

        const rowCount = this.data().length;
        let rowHeight = Math.floor( (this.height() - this.xAxisHeight()) / rowCount);
        let columnCount = 1;
        if (this.minimumChartHeight() > rowHeight) {
            const mag = rowHeight / this.minimumChartHeight();
            columnCount = Math.ceil(1 / mag);
            if (columnCount > 1) {
                rowHeight = Math.floor( (this.height() - this.xAxisHeight()) / (rowCount / columnCount));
            }
        }
        const rowWidth = Math.floor(this.width() / columnCount);
        this.element().selectAll(".widget-row")
            .style("height", (w, i) => this.isBottomChart(i, rowCount, columnCount) ? (rowHeight + this.xAxisHeight()) + "px" : rowHeight + "px")
            .style("width", rowWidth + "px")
            ;
        this._widgetCache.forEach(w => w.resize());
        return size;
    }
    exit(domNode, element) {
        super.exit(domNode, element);
    }
    getWidget(idx?) {
        if (typeof idx !== "undefined" && this._widgetCache[idx] && this._widgetCache[idx].prototype === this._widgetPrototypes[this.chartType()]) {
            return this._widgetCache[idx];
        }
        return new this._widgetPrototypes[this.chartType()]();
    }
}
ChartSeries.prototype._class += " composite_ChartSeries";
ChartSeries.prototype._palette = Palette.ordinal("default");

export interface ChartSeries {
    chartType(): "Area" | "Step" | "Line" | "Scatter";
    chartType(_: "Area" | "Step" | "Line" | "Scatter"): this;
    pointSize(): number;
    pointSize(_: number): this;
    titleSuffix(): string;
    titleSuffix(_: string): this;
    prependMissingData(): boolean;
    prependMissingData(_: boolean): this;
    valueRangeBuffer(): number;
    valueRangeBuffer(_: number): this;
    xAxisHeight(): number;
    xAxisHeight(_: number): this;
    minimumChartHeight(): number;
    minimumChartHeight(_: number): this;
    yAxisTickCount(): number;
    yAxisTickCount(_: number): this;
    xAxisGuideLines(): boolean;
    xAxisGuideLines(_: boolean): this;
    yAxisGuideLines(): boolean;
    yAxisGuideLines(_: boolean): this;
    paletteID(): string;
    paletteID(_: string): this;
}
ChartSeries.prototype.publish("paletteID", "default", "set", "Color palette for this widget", ChartSeries.prototype._palette.switch());
ChartSeries.prototype.publish("xAxisGuideLines", true, "boolean", "X-Axis Guide Lines");
ChartSeries.prototype.publish("yAxisGuideLines", true, "boolean", "Y-Axis Guide Lines");
ChartSeries.prototype.publish("yAxisTickCount", 3, "number", "The ideal number of y axis ticks (there may be slightly more or slightly less)");
ChartSeries.prototype.publish("minimumChartHeight", 50, "number", "Minimum height of charts (pixels)");
ChartSeries.prototype.publish("xAxisHeight", 18, "number", "Height of x axis on the bottom chart (pixels)");
ChartSeries.prototype.publish("pointSize", 6, "number", "Size of point (pixels)");
ChartSeries.prototype.publish("chartType", "Area", "set", "Type of widget to be used", ["Area", "Step", "Line", "Scatter"]);
ChartSeries.prototype.publish("titleSuffix", "", "string", "Suffix appended to chart category");
ChartSeries.prototype.publish("prependMissingData", false, "boolean", "If false, missing data series are appended with [category, 0] rows");
ChartSeries.prototype.publish("valueRangeBuffer", 0.2, "number", "Ratio of value range to apply to min and max");
