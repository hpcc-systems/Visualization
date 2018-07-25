import { ITooltip } from "@hpcc-js/api";
import { I2DChart } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/pie";
import { min as d3Min } from "d3-array";
import { format as d3Format } from "d3-format";
import { select as d3Select } from "d3-selection";

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class Pie extends HTMLWidget {
    _tag;
    _chart;

    _selected;
    _selections;

    _dataUpdated;
    _prevDataUpdated;
    _columnsUpdated;
    _prevColumnsUpdated;

    d3LabelSelection;

    tooltipValueFormat;

    constructor() {
        super();
        this._tag = "div";
        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }

    calcRadius() {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    }

    updateChartOptions() {
        const context = this;
        this._chart.type = "pie";
        this._chart.labelsEnabled = true;
        if (this.labelPosition() === "inside") {
            this._chart.radius = "50%";
            this._chart.labelRadius = -40;
            this._chart.pullOutRadius = "20%";
        } else {
            this._chart.radius = this.calcRadius();
            this._chart.labelRadius = 20;
            this._chart.pullOutRadius = "20%";
        }

        this._chart.labelFunction = function (d) {
            return d.title;
        };

        this._chart.marginRight = this.marginRight();
        this._chart.marginLeft = this.marginLeft();
        this._chart.marginTop = this.marginTop();
        this._chart.marginBottom = this.marginBottom();

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.innerRadius = this.holePercent() + "%";
        this._chart.fontFamily = this.fontFamily();
        this._chart.fontSize = this.fontSize();
        this._chart.fontSize = this.fontSize();
        this._chart.color = this.fontColor();

        this._chart.titleField = this.columns()[0];
        this._chart.valueField = this.columns()[1];

        let sortingMethod;
        if (this.reverseDataSorting()) {
            sortingMethod = function (a, b) { return a[1] < b[1] ? 1 : -1; };
        } else {
            sortingMethod = function (a, b) { return a[1] > b[1] ? 1 : -1; };
        }
        this.data().sort(sortingMethod);

        this._chart.colorField = "sliceColor";

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.colors = this.data().map(function (row) {
            return this._palette(row[0]);
        }, this);
        this._chart.pullOutOnlyOne = this.selectionMode() === "simple";

        this.pieAlpha().forEach(function (d, i) {
            if (typeof (this._chart.chartData[i]) === "undefined") {
                this._chart.chartData[i] = {};
            }
            this._chart.chartData[i].alpha = d;
        }, this);

        this._chart.balloonFunction = function (d) {
            if (context && context.tooltipValueFormat) {
                return d.title + ": " + d3Format(",.2%")(d.percents / 100) + "  " + d3Format(context.tooltipValueFormat())(d.value);
            }
        };

        return this._chart;
    }

    formatData(dataArr) {
        const dataObjArr = [];
        const context = this;
        dataArr.forEach(function (dataRow) {
            const dataObj = {};
            context.columns().forEach(function (colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;
        const initObj: any = {
            type: "pie",
            addClassNames: true,
            theme: "none"
        };
        if (typeof (window as any).define === "function" && (window as any).define.amd) {
            initObj.pathToImages = require && require.toUrl ? require.toUrl("amchartsImg") : ".";
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickSlice", function (e) {
            const field = e.chart.colorField;
            const data = e.dataItem.dataContext;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.amchartSelectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field,
                        data,
                        cIdx: 1,
                        dIdx: e.dataItem.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.dataItem.index]), context.columns()[1], context._selected !== null);
        });
    }

    update(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    render(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    }

    postUpdate(domNode, element) {
        const context = this;

        const containerBoundingClientRect = context._element.select("svg").node().getBoundingClientRect(); // might need to change this selection (could get a bit more accurate results?)
        this.d3LabelSelection = element.selectAll(".amcharts-pie-label");

        const left = [];
        const right = [];
        const top = [];
        const bottom = [];

        this.d3LabelSelection.each(function (d, i) {
            const boundingRect = d3Select(this).node().getBoundingClientRect();

            const labelTopPos = boundingRect.top;
            if (labelTopPos < containerBoundingClientRect.top) {
                top.push(labelTopPos - containerBoundingClientRect.top);
            }

            const labelBottomPos = boundingRect.bottom;
            if (labelBottomPos > containerBoundingClientRect.bottom) {
                bottom.push(containerBoundingClientRect.bottom - labelTopPos);

            }

            const labelRightPos = boundingRect.right;
            if (labelRightPos > containerBoundingClientRect.right) {
                right.push(containerBoundingClientRect.right - labelRightPos);
            }

            const labelLeftPos = boundingRect.left;
            if (labelLeftPos < containerBoundingClientRect.left) {
                left.push(labelLeftPos - containerBoundingClientRect.left);
            }
        });

        const topOffset = top.length ? d3Min(top) : 0;
        const bottomOffset = bottom.length ? d3Min(bottom) : 0;
        const rightOffset = right.length ? d3Min(right) : 0;
        const leftOffset = left.length ? d3Min(left) : 0;

        let smallerOffset = 0;

        if (topOffset < 0) {
            smallerOffset += topOffset;
        }
        if (bottomOffset < 0) {
            smallerOffset += bottomOffset;
        }
        if (rightOffset < 0) {
            smallerOffset += rightOffset;
        }
        if (leftOffset < 0) {
            smallerOffset += leftOffset;
        }

        if (this.calcRadius() + smallerOffset - 20 < this.calcRadius()) {
            this._chart.radius = this.calcRadius() + smallerOffset - 20; // 20 for the label line lengths
            this._chart.validateNow();
        }
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    }

    columns(): string[];
    columns(_: string[]): this;
    columns(_?: string[]): string[] | this {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    }

    paletteID: (_?: string) => string | Pie;
    useClonedPalette: (_?: boolean) => boolean | Pie;
    fontSize: (_?: number) => number | Pie;
    fontFamily: (_?: string) => string | Pie;
    fontColor: (_?: string) => string | Pie;

    Depth3D: (_?: number) => number | Pie;
    Angle3D: (_?: number) => number | Pie;

    marginLeft: (_?: number) => number | Pie;
    marginRight: (_?: number) => number | Pie;
    marginTop: (_?: number) => number | Pie;
    marginBottom: (_?: number) => number | Pie;

    reverseDataSorting: (_?: boolean) => boolean | Pie;

    holePercent: (_?: number) => number | Pie;

    radius: (_?: number) => number | Pie;
    pieAlpha: { (): any[]; (_): Pie };

    labelPosition: (_?: string) => string | Pie;

    selectionMode: (_?: string) => string | Pie;
    amchartSelectionColor: (_?: string) => string | Pie;

    //  I2DChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    tooltipTick: { (): boolean; (_: boolean): Pie; };
    tooltipTick_default: { (): boolean; (_: boolean): Pie; };
    tooltipOffset: { (): number; (_: number): Pie; };
    tooltipOffset_default: { (): number; (_: number): Pie; };
}
Pie.prototype._class += " amchart_Pie";
Pie.prototype.implements(I2DChart.prototype);
Pie.prototype.implements(ITooltip.prototype);

Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Pie.prototype.publish("fontSize", 11, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Pie.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
Pie.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Pie.prototype.publish("Depth3D", 0, "number", "3D Depth (px)", null, { tags: ["Basic"] });
Pie.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)", null, { tags: ["Basic"] });

Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)", null, { tags: ["Intermediate"] });
Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)", null, { tags: ["Intermediate"] });
Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)", null, { tags: ["Intermediate"] });
Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)", null, { tags: ["Intermediate"] });

Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting", null, { tags: ["Intermediate"] });

Pie.prototype.publish("holePercent", 0, "number", "Hole Size (Percent)", null, { tags: ["Basic"] });

Pie.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Basic"] });
Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice", null, { tags: ["Private"] });

Pie.prototype.publish("labelPosition", "outside", "set", "Label Position", ["inside", "outside"], { tags: ["Intermediate"] });

Pie.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
Pie.prototype.publish("amchartSelectionColor", "#f00", "html-color", "Font Color", null, { tags: ["Basic"] });
