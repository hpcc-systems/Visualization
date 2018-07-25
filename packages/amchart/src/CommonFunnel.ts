import { ITooltip } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/funnel";
import { min as d3Min } from "d3-array";
import { select as d3Select } from "d3-selection";

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class CommonFunnel extends HTMLWidget {
    _chart: any = {};

    _selected = null;
    _selections = [];

    _dataUpdated = 0;
    _prevDataUpdated = -1;
    _columnsUpdated = 0;
    _prevColumnsUpdated = -1;

    d3LabelSelection;
    titles;
    baloon;

    constructor() {
        super();
        this._tag = "div";
    }

    updateChartOptions() {

        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();

        this._chart.pullOutOnlyOne = this.selectionMode() === "simple";

        this._chart.color = this.fontColor();
        this._chart.colorField = "sliceColor";
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.labelPosition = this.labelPosition();

        this.titles = [];
        this.baloon = {};

        this._chart.titleField = this.columns()[0];
        this._chart.valueField = this.columns()[1];

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();

        let sortingMethod = function (a, b) { return a[1] > b[1] ? 1 : -1; };
        if (this.reverseDataSorting()) {
            sortingMethod = function (a, b) { return a[1] < b[1] ? 1 : -1; };
        }
        this.data().sort(sortingMethod);

        // DataProvider
        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        // Color Palette
        this._chart.colors = this.data().map(function (row) {
            return this._palette(row[0]);
        }, this);

        // Scroll Bar
        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

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
            type: "funnel",
            addClassNames: true,
            autoResize: true,
            autoMargins: true,
            chartScrollbar: {}
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
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    render(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    }

    postUpdate(domNode, element) {
        const context = this;
        if (this.labelPosition() !== "center") {
            const containerBoundingClientRect = context._element.select("svg").node().getBoundingClientRect(); // might need to change this selection (could get a bit more accurate results?)
            this.d3LabelSelection = element.selectAll(".amcharts-funnel-item");

            const left = [];
            const right = [];

            this.d3LabelSelection.each(function (d, i) {
                const boundingRect = d3Select(this).node().getBoundingClientRect();

                const labelRightPos = boundingRect.right;
                if (labelRightPos > containerBoundingClientRect.right) {
                    right.push(containerBoundingClientRect.right - labelRightPos);
                }

                const labelLeftPos = boundingRect.left;
                if (labelLeftPos < containerBoundingClientRect.left) {
                    left.push(labelLeftPos - containerBoundingClientRect.left);
                }
            });

            const rightOffset = right.length ? d3Min(right) : 0;
            const leftOffset = left.length ? d3Min(left) : 0;

            let smallerOffset = 0;

            if (rightOffset < 0) {
                smallerOffset += rightOffset;
            }
            if (leftOffset < 0) {
                smallerOffset += leftOffset;
            }

            switch (this.labelPosition()) {
                case "right":
                    this._chart.marginRight = Math.abs(smallerOffset);
                    this._chart.marginLeft = 0;
                    break;
                case "left":
                    this._chart.marginLeft = Math.abs(smallerOffset);
                    this._chart.marginRight = 0;
                    break;
            }
            this._chart.validateNow();
        }
    }

    data(_?) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    }

    fontSize: { (): number; (_: number): CommonFunnel };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): CommonFunnel };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): CommonFunnel };
    fontColor_exists: () => boolean;
    flip: { (): boolean; (_: boolean): CommonFunnel };
    flip_exists: () => boolean;
    reverseDataSorting: { (): boolean; (_: boolean): CommonFunnel };
    reverseDataSorting_exists: () => boolean;
    labelPosition: { (): string; (_: string): CommonFunnel };
    labelPosition_exists: () => boolean;
    showScrollbar: { (): boolean; (_: boolean): CommonFunnel };
    showScrollbar_exists: () => boolean;
    startDuration: { (): number; (_: number): CommonFunnel };
    startDuration_exists: () => boolean;
    Depth3D: { (): number; (_: number): CommonFunnel };
    Depth3D_exists: () => boolean;
    Angle3D: { (): number; (_: number): CommonFunnel };
    Angle3D_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): CommonFunnel };
    useClonedPalette_exists: () => boolean;
    selectionMode: { (): string; (_: string): CommonFunnel };
    selectionMode_exists: () => boolean;
    amchartSelectionColor: { (): string; (_: string): CommonFunnel };
    amchartSelectionColor_exists: () => boolean;

    //  I2DChart
    _palette;
    paletteID: { (): string; (_: string): CommonFunnel };
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip  ---
    tooltipStyle: { (): string; (_: string): ITooltip };
    tooltipStyle_exists: () => boolean;
    tooltipValueFormat: { (): string; (_: string): ITooltip };
    tooltipValueFormat_exists: () => boolean;
    tooltipSeriesColor: { (): string; (_: string): ITooltip };
    tooltipSeriesColor_exists: () => boolean;
    tooltipLabelColor: { (): string; (_: string): ITooltip };
    tooltipLabelColor_exists: () => boolean;
    tooltipValueColor: { (): string; (_: string): ITooltip };
    tooltipValueColor_exists: () => boolean;
    tooltipTick: { (): boolean; (_: boolean): ITooltip };
    tooltipTick_exists: () => boolean;
    tooltipOffset: { (): number; (_: number): ITooltip };
    tooltipOffset_exists: () => boolean;
}
CommonFunnel.prototype._class += " amchart_CommonFunnel";
CommonFunnel.prototype.implements(ITooltip.prototype);

CommonFunnel.prototype.publish("fontSize", 11, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
CommonFunnel.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
CommonFunnel.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart", null, { tags: ["Intermediate"] });
CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting", null, { tags: ["Intermediate"] });

CommonFunnel.prototype.publish("labelPosition", "center", "set", "Label Position", ["left", "right", "center"], { tags: ["Intermediate"] });

CommonFunnel.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar", null, { tags: ["Intermediate"] });

CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)", null, { tags: ["Private"] });

CommonFunnel.prototype.publish("Depth3D", 0, "number", "3D Depth (px)", null, { tags: ["Basic"] });
CommonFunnel.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)", null, { tags: ["Basic"] });

CommonFunnel.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
CommonFunnel.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
CommonFunnel.prototype.publish("amchartSelectionColor", "#f00", "html-color", "Font Color", null, { tags: ["Basic"] });
