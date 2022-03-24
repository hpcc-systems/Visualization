import { instanceOfIHighlight } from "@hpcc-js/api";
import { Database, Palette, SVGWidget, Widget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { scaleOrdinal as d3ScaleOrdinal } from "d3-scale";
import {
    symbol as d3Symbol,
    symbolCircle as d3SymbolCircle,
    symbolCross as d3SymbolCross,
    symbolDiamond as d3SymbolDiamond,
    symbolSquare as d3SymbolSquare,
    symbolStar as d3SymbolStar,
    symbolTriangle as d3SymbolTriangle,
    symbolWye as d3SymbolWye
} from "d3-shape";
import { legendColor as d3LegendColor } from "d3-svg-legend";
import { ChartPanel } from "./ChartPanel";

export class Legend extends SVGWidget {
    _owner: ChartPanel;
    _targetWidget: Widget;
    _targetWidgetMonitor;
    _legendOrdinal;
    _disabled: string[] = [];

    private _symbolTypeMap = {
        "circle": d3SymbolCircle,
        "cross": d3SymbolCross,
        "diamond": d3SymbolDiamond,
        "square": d3SymbolSquare,
        "star": d3SymbolStar,
        "triangle": d3SymbolTriangle,
        "wye": d3SymbolWye
    };

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

    getPalette(): Palette.OrdinalPaletteFunc | Palette.RainbowPaletteFunc {
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

    calcMetaData() {
        let dataArr = [];
        let total = 0;
        let maxLabelWidth = 0;
        const colLength = this.columns().length;

        if (this._targetWidget) {
            const columns = this.columns();
            switch (this.getPaletteType()) {
                case "ordinal":
                    const fillColor = this.fillColorFunc();
                    let val = 0;
                    switch (this.dataFamily()) {
                        case "2D":
                            dataArr = this.data().map(function (n, i) {
                                val = this.data()[i].slice(1, colLength).reduce((acc, n) => acc + n, 0);
                                const disabled = this.isDisabled(n[0]);
                                if (!disabled) total += val;
                                const label = n[0] + (!disabled && this.showSeriesTotal() ? ` (${val})` : "");
                                const textSize = this.textSize(label);
                                if (maxLabelWidth < textSize.width) maxLabelWidth = textSize.width;
                                return [fillColor(n, n[0], false), n[0], label];
                            }, this);
                            break;
                        case "ND":
                            const widgetColumns = this.columns().filter(col => col.indexOf("__") !== 0);
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n, i) {
                                val = this.data().reduce((acc, n) => acc + n[i + 1], 0);
                                const disabled = this.isDisabled(columns[i + 1]);
                                const label = n + (!disabled && this.showSeriesTotal() ? ` (${val})` : "");
                                if (!disabled) total += val;
                                const textSize = this.textSize(label);
                                if (maxLabelWidth < textSize.width) maxLabelWidth = textSize.width;
                                return [fillColor(undefined, n, false), n, label];
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
                    const palette = this.getPalette() as Palette.RainbowPaletteFunc;
                    const format = d3Format(this.rainbowFormat());
                    const widget = this.getWidget();
                    const steps = this.rainbowBins();
                    const weightMin: number = widget._dataMinWeight;
                    const weightMax: number = widget._dataMaxWeight;
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
        return {
            dataArr,
            total,
            maxLabelWidth
        };
    }

    update(domNode, element) {
        super.update(domNode, element);

        const { dataArr, maxLabelWidth, total } = this.calcMetaData();

        const radius = this.shapeRadius();
        const size = this.radiusToSymbolSize(radius);

        const strokeWidth = 1;

        let shapePadding = this.itemPadding();// + strokeWidth;
        if (this.orientation() === "horizontal") {
            shapePadding += maxLabelWidth - (radius * 2);
        }

        const ordinal = d3ScaleOrdinal()
            .domain(dataArr.map(row => row[1]))
            .range(dataArr.map(row => row[0]));
        this._legendOrdinal
            .shape("path", d3Symbol().type(this._symbolTypeMap[this.symbolType()]).size(size)())
            .orient(this.orientation())
            .title(this.title())
            .labelWrap(this.labelMaxWidth())
            .labelAlign(this.labelAlign())
            .shapePadding(shapePadding)
            .scale(ordinal)
            .labels(d => dataArr[d.i][2])
            ;

        this._g.call(this._legendOrdinal);

        this.updateDisabled(element, dataArr);

        const legendCellsBbox = this._g.select(".legendCells").node().getBBox();
        let offsetX = Math.abs(legendCellsBbox.x);
        let offsetY = Math.abs(legendCellsBbox.y) + strokeWidth;

        if (this.orientation() === "horizontal") {
            if (this.labelAlign() === "start") {
                offsetX += strokeWidth;
            } else if (this.labelAlign() === "end") {
                offsetX -= strokeWidth;
            }
            if (this.width() > legendCellsBbox.width) {
                const extraWidth = this.width() - legendCellsBbox.width;
                offsetX += (extraWidth / 2);
            }
        } else if (this.orientation() === "vertical") {
            offsetX += strokeWidth;
            if (this._containerSize.height > legendCellsBbox.height) {
                const extraHeight = this.height() - legendCellsBbox.height;
                offsetY += (extraHeight / 2);
            }
        }

        this._g.attr("transform", `translate(${offsetX}, ${offsetY})`);
        this.pos({
            x: 0,
            y: 0
        });
        this._legendOrdinal
            .labelOffset(this.itemPadding())
            ;
        const legendTotal = this._g.selectAll(".legendTotal").data(dataArr.length && this.showLegendTotal() ? [total] : []);
        const totalText = `Total: ${total}`;
        const totalOffsetX = -offsetX;
        const totalOffsetY = legendCellsBbox.height + this.itemPadding() + strokeWidth;
        this.enableOverflowScroll(false);
        this.enableOverflow(true);
        legendTotal
            .enter()
            .append("text")
            .classed("legendTotal", true)
            .merge(legendTotal)
            .attr("transform", `translate(${totalOffsetX}, ${totalOffsetY})`)
            .text(totalText)
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

    postUpdate(domNode, element) {
        let w;
        if (this._boundingBox) {
            w = this._boundingBox.width;
            this._boundingBox.width = this._size.width;
        }
        super.postUpdate(domNode, element);
        if (w !== undefined) {
            this._boundingBox.width = w;
        }
        this._parentRelativeDiv.style("overflow", "hidden");
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    radiusToSymbolSize(radius) {
        const circleSize = Math.pow(radius, 2) * Math.PI;
        switch (this.symbolType()) {
            case "star":
                return circleSize * 0.45;
            case "triangle":
                return circleSize * 0.65;
            case "cross":
            case "diamond":
            case "wye":
                return circleSize * 0.75;
            case "circle":
                return circleSize;
            case "square":
                return circleSize * 1.3;
        }
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
    }

    onMouseOver(rowData, rowIdx) {
    }
    private _containerSize;
    resize(_size?: { width: number, height: number }) {
        let retVal;
        if (this.fitToContent()) {
            this._containerSize = _size;
            const bbox = this.getBBox();
            if (_size.width > bbox.width) {
                bbox.width = _size.width;
            }
            if (_size.height > bbox.height) {
                bbox.height = _size.height;
            }
            retVal = super.resize.apply(this, [{ ...bbox }]);
        } else {
            retVal = super.resize.apply(this, arguments);
        }
        return retVal;
    }

}
Legend.prototype._class += " layout_Legend";

export interface Legend {
    title(): string;
    title(_: string): this;
    symbolType(): "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye";
    symbolType(_: "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye"): this;
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
    itemPadding(): number;
    itemPadding(_: number): this;
    shapeRadius(): number;
    shapeRadius(_: number): this;
    fitToContent(): boolean;
    fitToContent(_: boolean): this;
    labelAlign(): "start" | "middle" | "end";
    labelAlign(_: "start" | "middle" | "end"): this;
}
Legend.prototype.publish("title", "", "string", "Title");
Legend.prototype.publish("symbolType", "circle", "set", "Shape of each legend item", ["circle", "cross", "diamond", "square", "star", "triangle", "wye"]);
Legend.prototype.publish("labelMaxWidth", null, "number", "Max Label Width (pixels)", null, { optional: true });
Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows", ["vertical", "horizontal"], { tags: ["Private"] });
Legend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "graph", "any"], { tags: ["Private"] });
Legend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: w => !w.isRainbow() });
Legend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: w => !w.isRainbow() });
Legend.prototype.publish("showSeriesTotal", false, "boolean", "Show value next to series");
Legend.prototype.publish("showLegendTotal", false, "boolean", "Show a total of the series values under the legend", null);
Legend.prototype.publish("itemPadding", 8, "number", "Padding between legend items (pixels)");
Legend.prototype.publish("shapeRadius", 7, "number", "Radius of legend shape (pixels)");
Legend.prototype.publish("fitToContent", true, "boolean", "If true, resize will simply reapply the bounding box dimensions");
Legend.prototype.publish("labelAlign", "start", "set", "Horizontal alignment of legend item label (for horizontal orientation only)", ["start", "middle", "end"], { optional: true, disable: (w: any) => w.orientation() === "vertical" });
