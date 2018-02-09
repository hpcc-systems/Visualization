import { Palette, Platform } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { select as d3Select } from "d3-selection";
import { Table } from "./Table";

import "../src/Legend.css";

function _htmlColorBlock(hexColor) {
    return "<div class=\"colorBlock\" style=\"background-color:" + hexColor + ";\"></div>";
}

export class Legend extends Table {
    _targetWidget;
    _targetWidgetMonitor;

    constructor() {
        super();

        this.showHeader(false);
        this.pagination(false);
    }

    isRainbow() {
        const widget = this.getWidget();
        return widget && widget._palette && widget._palette.type() === "rainbow";
    }

    targetWidget(): any;
    targetWidget(_: any): this;
    targetWidget(_?: any): any | this {
        if (!arguments.length) return this._targetWidget;
        this._targetWidget = _;
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
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
        return this;
    }

    getWidget() {
        if (this._targetWidget) {
            switch (this._targetWidget.classID()) {
                case "chart_MultiChart":
                    return this._targetWidget.chart();
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

    enter(domNode, element) {
        Table.prototype.enter.apply(this, arguments);
        d3Select(domNode.parentNode).style("overflow-y", "auto");

        this.renderHtmlDataCells(true);
        this.fixedHeader(false);
        this.fixedSize(true);
        element.classed("other_Legend", true);
    }

    update(domNode, element) {
        const colArr = ["Key", "Label"];
        let dataArr = [];
        if (this._targetWidget) {
            const palette = this.getPalette();
            switch (palette.type()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case "2D":
                            dataArr = this._targetWidget.data().map(function (n) {
                                return [_htmlColorBlock(palette(n[0])), n[0]];
                            }, this);
                            break;
                        case "ND":
                            const widgetColumns = this._targetWidget.columns();
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n) {
                                return [_htmlColorBlock(palette(n)), n];
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
                    dataArr.push([_htmlColorBlock(palette(weightMin, weightMin, weightMax)), format(weightMin)]);
                    for (let x = 1; x < steps - 1; ++x) {
                        const mid = stepWeightDiff * x;
                        dataArr.push([_htmlColorBlock(palette(mid, weightMin, weightMax)), format(Math.floor(mid))]);
                    }
                    dataArr.push([_htmlColorBlock(palette(weightMax, weightMin, weightMax)), format(weightMax)]);
                    break;
            }
        }
        this.columns(colArr);
        this.data(dataArr);
        Table.prototype.update.apply(this, arguments);

        element.classed("horiz-legend", this.orientation() === "horizontal");

        const table = element.select(".tableDiv > table");
        const tableRect = table.node().getBoundingClientRect();
        const elementRect = this._placeholderElement.node().getBoundingClientRect();

        element.select(".tableDiv").style({ overflow: "visible" });

        const top = elementRect.height / 2 - tableRect.height / 2;
        const left = elementRect.width / 2 - tableRect.width / 2;
        table.style({ position: "absolute", top: top + "px", left: left + "px" });

        const startIndex = this.pageNumber() - 1;
        const itemsOnPage = this.itemsPerPage();

        const start = startIndex * itemsOnPage;
        const end = startIndex * parseInt(itemsOnPage) + parseInt(itemsOnPage);

        let tData = null;
        if (this.pagination()) {
            tData = this.data().slice(start, end);
        } else {
            tData = this.data();
        }

        const rows = this.tbody.selectAll("tr").data(tData);
        const context = this;
        rows
            .on("click", function (d, i) {
                context.onClick(d, i);
            })
            .on("dblclick", function (d, i) {
                context.onDblClick(d, i);
            })
            .on("mouseover", function (d, i) {
                context.onMouseOver(d, i);
            })
            ;
    }

    exit(domNode, element) {
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        Table.prototype.exit.apply(this, arguments);
    }

    onClick(rowData, rowIdx) {
        console.log("Legend onClick method");
        console.log("rowData: " + rowData);
        console.log("rowIdx: " + rowIdx);
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

    dataFamily_exists: () => boolean;
    orientation_exists: () => boolean;
    rainbowFormat_exists: () => boolean;
    rainbowBins_exists: () => boolean;
}
Legend.prototype._class += " other_Legend";

const origGetBBox = Table.prototype.getBBox;
Legend.prototype.getBBox = function (refresh, round) {
    const retVal = origGetBBox.apply(this, arguments);
    const table = this.element().select(".tableDiv > table");
    if (!table.empty()) {
        const tableRect = table.node().getBoundingClientRect();
        const width = tableRect.width + 8 + (this.hasVScroll(this._placeholderElement) ? Platform.getScrollbarWidth() : 0);
        const height = tableRect.height + 8 + (this.hasHScroll(this._placeholderElement) ? Platform.getScrollbarWidth() : 0);
        return {
            x: retVal.x,
            y: retVal.y,
            width: (round ? Math.round(width) : width) * this._scale,
            height: (round ? Math.round(height) : height) * this._scale
        };
    }
    return retVal;
};

export interface Legend {
    dataFamily(): string;
    dataFamily(_: string): this;
    orientation(): string;
    orientation(_: string): this;
    rainbowFormat(): string;
    rainbowFormat(_: string): this;
    rainbowBins(): number;
    rainbowBins(_: number): this;
}
Legend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "any", "other"], { tags: ["Private"] });
Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows", ["vertical", "horizontal"], { tags: ["Private"] });
Legend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: w => !w.isRainbow() });
Legend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: w => !w.isRainbow() });
