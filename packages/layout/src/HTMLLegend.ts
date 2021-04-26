import { instanceOfIHighlight } from "@hpcc-js/api";
import { Database, HTMLWidget, Palette, Widget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection"; 
import { format as d3Format } from "d3-format";
import { ChartPanel } from "./ChartPanel";

export class HTMLLegend extends HTMLWidget {
    _div;
    _subdiv;
    _wrapper;
    _rainbowPalette;
    _ordinalPalette;
    _targetWidgetMonitor;
    _owner: ChartPanel;
    _targetWidget: Widget;
    _disabled: string[] = [];

    constructor(owner: ChartPanel) {
        super();
        this._owner = owner;
    }
    enter(domNode, element){
        super.enter(domNode, element);
        this._wrapper = element.append("div");
        this._div = this._wrapper.append("div");
        this._subdiv = this._wrapper.append("div");
        this._subdiv.append("span");
    }
    update(domNode, element){
        super.update(domNode, element);
        const gutter = this.gutter();
        const labelMinWidth = this.labelMinWidth();
        const labelMaxWidth = this.labelMaxWidth();
        const symbolSize = this.symbolSize();

        const verticalScroll = this.scrollMode_exists() ? this.scrollMode() === "vertical" : this.orientation() === "vertical";
        const verticalOrient = this.orientation() === "vertical";
        
        this._wrapper
            .style(!verticalOrient ? "min-height" : "min-width", this.legendSize() + "px")
            .style(!verticalOrient ? "max-height" : "max-width", this.maxLegendSize() + "px")
            .style("display", "flex")
            .style("flex-direction", "column")
            ;

        this._div
            .style("flex", "1")
            .style("overflow-x", verticalScroll ? "hidden" : "auto")
            .style("overflow-y", verticalScroll ? "auto" : "hidden")
            .style("display", "flex")
            .style("flex-wrap", verticalScroll && !verticalOrient ? "wrap" : "nowrap")
            .style("flex-direction", verticalOrient ? "column" : "row")
            .style("box-sizing", "border-box")
            ;
        this._subdiv
            .style("width", "100%")
            .style("overflow", "hidden")
            .style("display", "flex")
            ;

        const metaData = this.calcMetaData();

        const rowsDataSelection = this._div.selectAll(".data-row").data(metaData.dataArr);

        if (this.useClonedPalette()) {
            this._ordinalPalette = this._ordinalPalette.cloneNotExists(this.ordinalPaletteID() + "_" + this.id());
        }

        const context = this;

        let maxLabelHeight = 0;
        let maxLabelWidth = 0;
        let maxValueWidth = 0;
        rowsDataSelection.enter().append("div")
            .classed("data-row", true)
            .style("cursor", "pointer")
            .style("display", "flex")
            .style("flex-direction", "column")
            .each(function (row) {
                const rowElement = d3Select(this);
                const infoDiv = rowElement.append("div")
                    .attr("class", "legend-info")
                    .style("display", "flex")
                    .style("flex-direction", "row")
                    ;
                infoDiv.append("div").attr("class", "legend-symbol");
                infoDiv.append("div").attr("class", "legend-value").append("span");
                rowElement.append("div").attr("class", "legend-label").append("span");
            })
            .on("click", function (d) {
                context.onClick(d, this);
            })
            .on("mousemove", (d) => {
                context.onOver(d, this);
            })
            .on("mouseleave", (d) => {
                context.onOut(d, this);
            })
            .merge(rowsDataSelection)
            .style("color", this.labelColor())
            .style("padding", this.padding() + "px")
            .each(function (row) {
                const rowElement = d3Select(this);
                rowElement.attr("title", context.showAltTextOnHover() ? row[1] : "");
                rowElement.select("div.legend-label")
                    .style("min-width", labelMinWidth + "px")
                    .style("max-width", labelMaxWidth + "px")
                    ;
                rowElement.select("div.legend-label > span")
                    .text(row[1])
                    ;
                rowElement.select("div.legend-value")
                    .style("display", context.showSeriesTotal() ? "inline-block" : "none")
                    ;
                const valueSpan = rowElement.select("div.legend-value > span")
                    .text(row[3])
                    ;
                const valueWidth = (valueSpan.node() as any).getBoundingClientRect().width;
                if(valueWidth > maxValueWidth)maxValueWidth = valueWidth;

                rowElement.select("div.legend-symbol")
                    .style("margin-right", gutter+"px")
                    .style("background-color", row[0])
                    .style("min-width", symbolSize+"px")
                    .style("height", symbolSize+"px")
                    ;
            })
            ;
        this._div.selectAll("div.legend-label > span").each(function (row) {
            const bbox = this.getBoundingClientRect();
            if(maxLabelHeight < bbox.height)maxLabelHeight = bbox.height;
            if(maxLabelWidth < bbox.width)maxLabelWidth = bbox.width;
        });
        this._subdiv
            .style("display", this.showLegendTotal() ? "inline-block" : "none")
            ;
        this._subdiv.select("span")
            .style("margin-left", this.padding() + "px")
            .text(`Total: ${metaData.total}`)
            ;

        const subSize = 15;
        const scrollbarSize = 19;
        const _height = this.height();
        const _width = this.width();
        if(verticalOrient) {
            let itemsWidth = Math.min(
                this.maxLegendSize(),
                Math.max(
                    maxLabelWidth + (this.padding() * 2),
                    symbolSize + (this.padding() * 2) + maxValueWidth,
                    this._subdiv.select("span").node().getBoundingClientRect().width
                ) + scrollbarSize
            );
            itemsWidth = Math.max(
                _width,
                itemsWidth
            );
            this._div
                .style("width", itemsWidth + "px")
                .style("flex-basis", (_height - subSize) + "px")
                ;
            
            this._wrapper
                .style("width", itemsWidth + "px")
                ;
            if(this.width() !== _width || this.height() !== _height) {
                this.resize({
                    height: _height,
                    width: _width
                });
            }
        } else {
            const itemsHeight = _height - subSize;
            const wrapperHeight = itemsHeight + subSize;
            this._div
                .style("flex-basis", itemsHeight + "px")
                ;
                
            this._wrapper
                .style("height", wrapperHeight + "px")
                ;
        }

        rowsDataSelection.exit().remove();
    }
    exit(domNode, element) {
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        super.exit(domNode, element);
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

    calcMetaData() {
        let dataArr = [];
        let total = 0;
        let labelMaxWidth = 0;
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
                                if(!disabled)total += val;
                                const label = n[0] + (!disabled && this.showSeriesTotal() ? ` (${val})` : "");
                                const textSize = this.textSize(label);
                                if(labelMaxWidth < textSize.width)labelMaxWidth = textSize.width;
                                return [fillColor(n, n[0], false), n[0], label, val, textSize];
                            }, this);
                            break;
                        case "ND":
                            const widgetColumns = this.columns().filter(col => col.indexOf("__") !== 0);
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n, i) {
                                val = this.data().reduce((acc, n) => acc + n[i + 1], 0);
                                const disabled = this.isDisabled(columns[i+1]);
                                const label = n + (!disabled && this.showSeriesTotal() ? ` (${val})` : "");
                                if(!disabled)total += val;
                                const textSize = this.textSize(label);
                                if(labelMaxWidth < textSize.width)labelMaxWidth = textSize.width;
                                return [fillColor(undefined, n, false), n, label, val, textSize];
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
            labelMaxWidth
        };
    }

    onClick(d, domNode) {
        switch (this.getPaletteType()) {
            case "ordinal":
                switch (this.dataFamily()) {
                    case "2D":
                    case "ND":
                        const disabledIdx = this._disabled.indexOf(d[1]);
                        if (disabledIdx < 0) {
                            this._disabled.push(d[1]);
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
                            if (this._disabled.indexOf(d[1]) < 0) {
                                this._owner.highlightColumn(d[1]);
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
    resize(_size?: { width: number, height: number }) {
        let retVal;
        if(this.fitToContent()) {
            const bbox = this.getBBox();
            if(_size.width > bbox.width) {
                bbox.width = _size.width;
            }
            if(_size.height > bbox.height) {
                bbox.height = _size.height;
            }
            retVal = super.resize.apply(this, [{...bbox}]);
        } else {
            retVal = super.resize.apply(this, arguments);
        }
        if(_size) {
            this.element()
                .style("height", _size.height + "px")
                ;
        }
        return retVal;
    }

    _enableOverflow = false;
    enableOverflow(): boolean;
    enableOverflow(_: boolean): this;
    enableOverflow(_?: boolean): boolean | this {
        if (!arguments.length) return this._enableOverflow;
        this._enableOverflow = _;
        return this;
    }

    _enableOverflowScroll = true;
    enableOverflowScroll(): boolean;
    enableOverflowScroll(_: boolean): this;
    enableOverflowScroll(_?: boolean): boolean | this {
        if (!arguments.length) return this._enableOverflowScroll;
        this._enableOverflowScroll = _;
        return this;
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
}
HTMLLegend.prototype._class += " layout_HTMLLegend";

export interface HTMLLegend {
    title(): string;
    title(_: string): this;
    symbolType(): "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye";
    symbolType(_: "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye"): this;
    gutter(): number;
    gutter(_: number): this;
    padding(): number;
    padding(_: number): this;
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
    itemPadding(): number;
    itemPadding(_: number): this;
    shapeRadius(): number;
    shapeRadius(_: number): this;
    fitToContent(): boolean;
    fitToContent(_: boolean): this;
    labelAlign(): "start" | "middle" | "end";
    labelAlign(_: "start" | "middle" | "end"): this;
    flexDirection(): "row" | "column";
    flexDirection(_: "row" | "column"): this;
    maxColumnCount(): number;
    maxColumnCount(_: number): this;
    labelColor(): "string";
    labelColor(_: "string"): this;
    targetWidget(): Widget;
    targetWidget(_: Widget): this;
    ordinalPaletteID(): string;
    ordinalPaletteID(_: string): this;
    rainbowPaletteID(): string;
    rainbowPaletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    flexWrapMode(): string;
    flexWrapMode(_: string): this;
    showSeriesTotal(): boolean;
    showSeriesTotal(_: boolean): this;
    showLegendTotal(): boolean;
    showLegendTotal(_: boolean): this;
    scrollMode(): "vertical" | "horizontal";
    scrollMode(_: "vertical" | "horizontal"): this;
    scrollMode_exists: () => boolean;
    showAltTextOnHover(): boolean;
    showAltTextOnHover(_: boolean): this;
    symbolSize(): number;
    symbolSize(_: number): this;
    labelMinWidth(): number;
    labelMinWidth(_: number): this;
    labelMaxWidth(): number;
    labelMaxWidth(_: number): this;
    legendSize(): number;
    legendSize(_: number): this;
    maxLegendSize(): number;
    maxLegendSize(_: number): this;
    
}

HTMLLegend.prototype._rainbowPalette = Palette.rainbow("default");
HTMLLegend.prototype._ordinalPalette = Palette.ordinal("default");
HTMLLegend.prototype.publish("rainbowPaletteID", "default", "set", "Color palette for this widget", HTMLLegend.prototype._rainbowPalette.switch());
HTMLLegend.prototype.publish("ordinalPaletteID", "default", "set", "Color palette for this widget", HTMLLegend.prototype._ordinalPalette.switch());
HTMLLegend.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette");
HTMLLegend.prototype.publish("flexWrapMode", "wrap", "string", "Wrap mode for legend items");
HTMLLegend.prototype.publish("maxColumnCount", 3, "number", "Number of legend item columns per row");
HTMLLegend.prototype.publish("scrollMode", "vertical", "string", "Legend scroll mode");

HTMLLegend.prototype.publish("title", "", "string", "Title");
HTMLLegend.prototype.publish("symbolType", "circle", "set", "Shape of each legend item", ["circle", "cross", "diamond", "square", "star", "triangle", "wye"]);
HTMLLegend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows", ["vertical", "horizontal"], { tags: ["Private"] });
HTMLLegend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "graph", "any"], { tags: ["Private"] });
HTMLLegend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: w => !w.isRainbow() });
HTMLLegend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: w => !w.isRainbow() });
HTMLLegend.prototype.publish("itemPadding", 8, "number", "Padding between legend items (pixels)");
HTMLLegend.prototype.publish("shapeRadius", 7, "number", "Radius of legend shape (pixels)");
HTMLLegend.prototype.publish("fitToContent", false, "boolean", "If true, resize will simply reapply the bounding box dimensions");
HTMLLegend.prototype.publish("labelAlign", "start", "set", "Horizontal alignment of legend item label (for horizontal orientation only)", ["start", "middle", "end"], { optional: true, disable: (w: any) => w.orientation() === "vertical" });
HTMLLegend.prototype.publish("flexDirection", "row", "string", "Direction the legend items should go");
HTMLLegend.prototype.publish("labelColor", "black", "string", "Color of label text");
HTMLLegend.prototype.publish("showAltTextOnHover", false, "boolean", "If true, full legend item text will display as alt textt on hover");
HTMLLegend.prototype.publish("gutter", 4, "number", "Pixel spacing between symbol and label");
HTMLLegend.prototype.publish("padding", 6, "number", "Pixel padding");
HTMLLegend.prototype.publish("targetWidget", null, "widget", "Target widget is the source of data and palette");
HTMLLegend.prototype.publish("showSeriesTotal", false, "boolean", "Show value next to series");
HTMLLegend.prototype.publish("showLegendTotal", false, "boolean", "Show a total of the series values under the legend", null);
HTMLLegend.prototype.publish("symbolSize", 16, "number", "Pixel size of legend shape");
HTMLLegend.prototype.publish("labelMinWidth", 80, "number", "Min pixel width of label");
HTMLLegend.prototype.publish("labelMaxWidth", null, "number", "Max Label Width (pixels)", null, { optional: true });
HTMLLegend.prototype.publish("legendSize", 80, "number", "Pixel height of legend");
HTMLLegend.prototype.publish("maxLegendSize", 120, "number", "Maximum legend size (pixels)");
