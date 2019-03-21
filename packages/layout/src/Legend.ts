import { instanceOfIHighlight } from "@hpcc-js/api";
import { Database, Palette, SVGWidget, Widget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { scaleOrdinal as d3ScaleOrdinal } from "d3-scale";
import { symbol as d3Symbol, symbolCircle as d3SymbolCircle } from "d3-shape";
import { legendColor as d3LegendColor } from "d3-svg-legend";
import { ChartPanel } from "./ChartPanel";

export class Legend extends SVGWidget {
    _owner: ChartPanel;
    _targetWidget: Widget;
    _targetWidgetMonitor;
    _legendOrdinal;
    _disabled: string[] = [];

    constructor(owner: ChartPanel) {
        super();
        this._owner = owner;
        this._drawStartPos = "origin";

        const context = this;
        this._legendOrdinal = d3LegendColor()
            .shape("path", d3Symbol().type(d3SymbolCircle).size(150)())
            .shapePadding(10)
            .shapeRadius(10)
            .on("cellclick", function (d) {
                context.onClick(d, this);
            })
            .on("cellover", (d) => {
                context.onOver(d, this);
            })
            .on("cellout", (d) => {
                context.onOut(d, this);
            })
            ;
    }

    isDisabled(d: string | Database.Field): boolean {
        if (typeof d === "undefined") {
            return false;
        } else if (typeof d === "string") {
            return d.indexOf("__") === 0 || this._disabled.indexOf(d) >= 0;
        } else if (d instanceof Database.Field) {
            return d.id().indexOf("__") === 0 || this._disabled.indexOf(d.id()) >= 0;
        }
        return this._disabled.indexOf(d) >= 0;
    }

    filteredFields(): Database.Field[] {
        switch (this.dataFamily()) {
            case "2D":
                return this.fields();
            case "ND":
                return this.fields().filter(d => !this.isDisabled(d));
        }
        return this.fields();
    }

    filteredColumns(): string[] {
        switch (this.dataFamily()) {
            case "2D":
                return this.columns();
            case "ND":
                return this.columns().filter(d => !this.isDisabled(d));
        }
        return this.columns();
    }

    filteredData(): any[][] {
        switch (this.dataFamily()) {
            case "2D":
                return this.data().filter(row => !this.isDisabled(row[0]));
            case "ND":
                const disabledCols: { [key: number]: boolean } = {};
                let anyDisabled: boolean = false;
                this.columns().forEach((col, idx) => {
                    const disabled = this.isDisabled(col);
                    disabledCols[idx] = disabled;
                    if (disabled) {
                        anyDisabled = true;
                    }
                });
                return !anyDisabled ? this.data() : this.data().map(row => {
                    return row.filter((cell, idx) => !disabledCols[idx]);
                });
        }
        return this.data();
    }

    isRainbow() {
        const widget = this.getWidget();
        return widget && widget._palette && widget._palette.type() === "rainbow";
    }

    targetWidget(): Widget;
    targetWidget(_: Widget): this;
    targetWidget(_?: Widget): Widget | this {
        if (!arguments.length) return this._targetWidget;
        this._targetWidget = _;
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        if (this._targetWidget) {
            const context = this;
            this._targetWidgetMonitor = this._targetWidget.monitor(function (key, newProp, oldProp, source) {
                switch (key) {
                    case "chart":
                    case "columns":
                    case "data":
                    case "paletteID":
                        context.lazyRender();
                        break;
                }
            });
        }
        return this;
    }

    getWidget() {
        if (this._targetWidget) {
            switch (this._targetWidget.classID()) {
                case "composite_MultiChart":
                    return (this._targetWidget as any).chart();
            }
        }
        return this._targetWidget;
    }

    getPalette() {
        const widget = this.getWidget();
        if (widget && widget._palette) {
            switch (widget._palette.type()) {
                case "ordinal":
                    return Palette.ordinal(widget._palette.id());
                case "rainbow":
                    return Palette.rainbow(widget._palette.id());
            }
        }
        return Palette.ordinal("default");
    }

    getPaletteType() {
        return this.getPalette().type();
    }

    fillColorFunc() {
        const widget = this.getWidget();
        if (widget && widget.fillColor) {
            //  Legend will render before the widget, so its possible the widgets palette will not have switched yet...
            if (widget._palette && widget.paletteID && widget._palette.name !== widget.paletteID()) {
                widget._palette = widget._palette.switch(widget.paletteID());
            }
            return (row, col, sel) => {
                return widget.fillColor(row, col, sel);
            };
        }
        const palette = Palette.ordinal(widget && widget.paletteID ? widget.paletteID() || "default" : "default");
        return (row, col, sel) => {
            return palette(col);
        };
    }

    fillColor(row, col, sel) {
        return this.fillColorFunc()(row, col, sel);
    }

    protected _g;
    enter(domNode, element) {
        super.enter(domNode, element);
        this._g = element.append("g")
            .attr("class", "legendOrdinal")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        let dataArr = [];
        if (this._targetWidget) {
            switch (this.getPaletteType()) {
                case "ordinal":
                    const fillColor = this.fillColorFunc();
                    switch (this.dataFamily()) {
                        case "2D":
                            dataArr = this.data().map(function (n) {
                                return [fillColor(n, n[0], false), n[0]];
                            }, this);
                            break;
                        case "ND":
                            const widgetColumns = this.columns().filter(col => col.indexOf("__") !== 0);
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n) {
                                return [fillColor(undefined, n, false), n];
                            }, this);
                            break;
                        default:
                            const widgetColumns2 = this.columns();
                            dataArr = widgetColumns2.map(function (n) {
                                return [fillColor(undefined, n, false), n];
                            }, this);
                            break;
                    }
                    break;
                case "rainbow":
                    const palette = this.getPalette();
                    const format = d3Format(this.rainbowFormat());
                    const widget = this.getWidget();
                    const steps = this.rainbowBins();
                    const weightMin = widget._dataMinWeight;
                    const weightMax = widget._dataMaxWeight;
                    const stepWeightDiff = (weightMax - weightMin) / (steps - 1);
                    dataArr.push([palette(weightMin, weightMin, weightMax), format(weightMin)]);
                    for (let x = 1; x < steps - 1; ++x) {
                        let mid = stepWeightDiff * x;
                        if (Math.floor(mid) > parseInt(dataArr[0][1])) {
                            mid = Math.floor(mid);
                        }
                        dataArr.push([palette(mid, weightMin, weightMax), format(mid)]);
                    }
                    dataArr.push([palette(weightMax, weightMin, weightMax), format(weightMax)]);
                    break;
            }
        }

        const ordinal = d3ScaleOrdinal()
            .domain(dataArr.map(row => row[1]))
            .range(dataArr.map(row => row[0]));
        let total = 0;
        const colLength = this.columns().length;
        this._legendOrdinal
            .orient(this.orientation())
            .title(this.title())
            .labelWrap(this.labelMaxWidth())
            .scale(ordinal)
            .labels(d => {
                let val = 0;
                switch (this.dataFamily()) {
                    case "ND":
                        val = this.data().reduce((acc, n) => acc + n[d.i + 1], 0);
                        break;
                    case "2D":
                        val = this.data()[d.i].slice(1, colLength).reduce((acc, n) => acc + n, 0);
                        break;
                }
                const disabled = this.isDisabled(d.domain[d.i]);
                if (!disabled) {
                    total += val;
                }
                return d.domain[d.i] + (!disabled && this.showSeriesTotal() ? ` (${val})` : "");
            })
            ;
        this._g.call(this._legendOrdinal);

        this.updateDisabled(element, dataArr);

        const bbox = this.getBBox(true, true);
        this._g.attr("transform", "translate(5,8)");
        this.pos({
            x: this.width() / 2 - bbox.width / 2,
            y: this.height() / 2 - bbox.height / 2
        });
        const legendCellsBbox = this._g.select(".legendCells").node().getBBox();
        const legendCellHeight = legendCellsBbox.height / (dataArr.length || 1);
        const legendTotal = this._g.selectAll(".legendTotal").data(dataArr.length && this.showLegendTotal() ? [total] : []);
        const firstLabel = this._g.select(".label");
        legendTotal
            .enter()
            .append("text")
            .classed("legendTotal", true)
            .merge(legendTotal)
            .attr("transform", `${dataArr.length ? firstLabel.attr("transform").split(",")[0] : "translate(0"}, ${legendCellsBbox.height + (legendCellHeight / (3 / 2))})`)
            .text(`Total: ${total}`)
            ;
        legendTotal.exit().remove();
    }
    updateDisabled(element, dataArr) {
        element
            .style("cursor", "pointer")
            .selectAll("path.swatch").filter((d, i) => i < dataArr.length)
            .style("stroke", (d, i) => dataArr[i][0])
            .style("fill", (d, i) =>
                this._disabled.indexOf(d) < 0 ? dataArr[i][0] : "white"
            )
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    onClick(d, domNode) {
        switch (this.getPaletteType()) {
            case "ordinal":
                switch (this.dataFamily()) {
                    case "2D":
                    case "ND":
                        const disabledIdx = this._disabled.indexOf(d);
                        if (disabledIdx < 0) {
                            this._disabled.push(d);
                        } else {
                            this._disabled.splice(disabledIdx, 1);
                        }
                        this._owner.refreshColumns();
                        this._owner.refreshData();
                        this._owner.render();
                        break;
                }
                break;
        }
    }

    onOver(d, domNode) {
        if (instanceOfIHighlight(this._owner)) {
            switch (this.getPaletteType()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case "2D":
                        case "ND":
                            if (this._disabled.indexOf(d) < 0) {
                                this._owner.highlightColumn(d);
                            }
                            break;
                    }
                    break;
            }
        }
    }

    onOut(d, domNode) {
        if (instanceOfIHighlight(this._owner)) {
            switch (this.getPaletteType()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case "2D":
                        case "ND":
                            this._owner.highlightColumn();
                            break;
                    }
                    break;
            }
        }
    }

    onDblClick(rowData, rowIdx) {
        console.log("Legend onDblClick method");
        console.log("rowData: " + rowData);
        console.log("rowIdx: " + rowIdx);
    }

    onMouseOver(rowData, rowIdx) {
        console.log("Legend onMouseOver method");
        console.log("rowData: " + rowData);
        console.log("rowIdx: " + rowIdx);
    }

}
Legend.prototype._class += " layout_Legend";

export interface Legend {
    title(): string;
    title(_: string): this;
    labelMaxWidth(): number;
    labelMaxWidth(_: number): this;
    orientation(): "vertical" | "horizontal";
    orientation(_: "vertical" | "horizontal"): this;
    orientation_exists: () => boolean;
    dataFamily(): "1D" | "2D" | "ND" | "map" | "graph" | "any";
    dataFamily(_: "1D" | "2D" | "ND" | "map" | "graph" | "any"): this;
    dataFamily_exists: () => boolean;
    rainbowFormat(): string;
    rainbowFormat(_: string): this;
    rainbowFormat_exists: () => boolean;
    rainbowBins(): number;
    rainbowBins(_: number): this;
    rainbowBins_exists: () => boolean;
    showSeriesTotal(): boolean;
    showSeriesTotal(_: boolean): this;
    showLegendTotal(): boolean;
    showLegendTotal(_: boolean): this;
}
Legend.prototype.publish("title", "", "string", "Title");
Legend.prototype.publish("labelMaxWidth", null, "number", "Max Label Width (pxiels)", null, { optional: true });
Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows", ["vertical", "horizontal"], { tags: ["Private"] });
Legend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "graph", "any"], { tags: ["Private"] });
Legend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: w => !w.isRainbow() });
Legend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: w => !w.isRainbow() });
Legend.prototype.publish("showSeriesTotal", false, "boolean", "Show value next to series");
Legend.prototype.publish("showLegendTotal", false, "boolean", "Show a total of the series values under the legend", null);
