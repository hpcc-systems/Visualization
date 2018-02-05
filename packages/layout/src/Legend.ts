import { instanceOfIHighlight } from "@hpcc-js/api";
import { Palette, SVGWidget, Widget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { scaleOrdinal as d3ScaleOrdinal } from "d3-scale";
import { symbol as d3Symbol, symbolCircle as d3SymbolCircle } from "d3-shape";
import { legendColor as d3LegendColor, Orientation } from "d3-svg-legend";
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

    isDisabled(d: string): boolean {
        return this._disabled.indexOf(d) >= 0;
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

    private _g;
    enter(domNode, element) {
        super.enter.apply(domNode, element);
        this._g = element.append("g")
            .attr("class", "legendOrdinal")
            ;
    }

    update(domNode, element) {
        super.update.apply(domNode, element);
        let dataArr = [];
        if (this._targetWidget) {
            const palette = this.getPalette();
            switch (palette.type()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case "2D":
                            dataArr = this.data().map(function (n) {
                                return [palette(n[0]), n[0]];
                            }, this);
                            break;
                        case "ND":
                            const widgetColumns = this.columns();
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n) {
                                return [palette(n), n];
                            }, this);
                            break;
                        default:
                            const widgetColumns2 = this.columns();
                            dataArr = widgetColumns2.map(function (n) {
                                return [palette(n), n];
                            }, this);
                            break;
                    }
                    break;
                case "rainbow":
                    const format = d3Format(this.rainbowFormat());
                    const widget = this.getWidget();
                    const steps = this.rainbowBins();
                    const weightMin = widget._dataMinWeight;
                    const weightMax = widget._dataMaxWeight;
                    const stepWeightDiff = (weightMax - weightMin) / (steps - 1);
                    dataArr.push([palette(weightMin, weightMin, weightMax), format(weightMin)]);
                    for (let x = 1; x < steps - 1; ++x) {
                        const mid = stepWeightDiff * x;
                        dataArr.push([palette(mid, weightMin, weightMax), format(Math.floor(mid))]);
                    }
                    dataArr.push([palette(weightMax, weightMin, weightMax), format(weightMax)]);
                    break;
            }
        }

        const ordinal = d3ScaleOrdinal()
            .domain(dataArr.map(row => row[1]))
            .range(dataArr.map(row => row[0]));

        this._legendOrdinal
            .orient(this.orientation())
            .title(this.title())
            .scale(ordinal)
            ;
        this._g.call(this._legendOrdinal);

        this.updateDisabled(element, dataArr);

        const bbox = this.getBBox(true, true);
        this._g.attr("transform", `translate(${this.width() / 2 - bbox.width / 2 + 5},${this.height() / 2 - bbox.height / 2})`);
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
        super.exit.apply(domNode, element);
    }

    onClick(d, domNode) {
        const palette = this.getPalette();
        switch (palette.type()) {
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
                        this._owner.render();
                        break;
                }
                break;
        }
        console.log("Legend onClick method");
        console.log("d: " + d);
    }

    onOver(d, domNode) {
        if (instanceOfIHighlight(this._owner)) {
            const palette = this.getPalette();
            switch (palette.type()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case "2D":
                        case "ND":
                            this._owner.highlightColumn(d);
                            break;
                    }
                    break;
            }
        }
        console.log("Legend onOver method");
        console.log("d: " + d);
    }

    onOut(d, domNode) {
        if (instanceOfIHighlight(this._owner)) {
            const palette = this.getPalette();
            switch (palette.type()) {
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
        console.log("Legend onOut method");
        console.log("d: " + d);
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
Legend.prototype._class += " composite_Legend";

export interface Legend {
    title(): string;
    title(_: string): this;
    orientation(): Orientation;
    orientation(_: Orientation): this;
    orientation_exists: () => boolean;
    dataFamily(): string;
    dataFamily(_: string): this;
    dataFamily_exists: () => boolean;
    rainbowFormat(): string;
    rainbowFormat(_: string): this;
    rainbowFormat_exists: () => boolean;
    rainbowBins(): number;
    rainbowBins(_: number): this;
    rainbowBins_exists: () => boolean;
}
Legend.prototype.publish("title", "", "string", "Title");
Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows", ["vertical", "horizontal"], { tags: ["Private"] });
Legend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "any"], { tags: ["Private"] });
Legend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: w => !w.isRainbow() });
Legend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: w => !w.isRainbow() });
