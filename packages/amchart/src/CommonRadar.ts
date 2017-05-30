import { ITooltip } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/radar";
import { format as d3Format } from "d3-format";

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class CommonRadar extends HTMLWidget {
    _chart: any = {};

    _selected = null;
    _selections = [];

    _dataUpdated = 0;
    _prevDataUpdated = -1;
    _columnsUpdated = 0;
    _prevColumnsUpdated = -1;

    _valueField;

    titles;

    constructor() {
        super();
        this._tag = "div";
    }

    updateChartOptions() {
        const context = this;

        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this.startDuration();
        this._chart.categoryField = this.columns()[0];
        this._valueField = this.columns().slice(1);

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this.titles = [];

        // DataProvider
        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        // ValueAxis
        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();
        this._chart.valueAxes[0].minimum = this.yAxisMinimum();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength() || this.dashedLineStyle();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].color = this.yAxisFontColor();

        this._chart.valueAxes[0].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.yAxisGridPosition();

        this._chart.valueAxes[0].labelFunction = function (d) {
            return d3Format(context.yAxisTickFormat())(d);
        };

        // Color Palette
        this._chart.colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        if (this.circularGrid()) { // not dynamic
            this._chart.valueAxes.forEach(function (va, i) {
                context._chart.valueAxes[i].gridType = "circles";
            });
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    }

    buildGraphObj(gType, i) {
        const context = this;
        const gObj: any = {};

        gObj.balloonFunction = function (d) {
            const balloonText = d.category + ", " + context.columns()[d.graph.index + 1] + ": " + context.data()[d.index][d.graph.columnIndex + 1];
            return balloonText;
        };
        gObj.fillAlphas = context.fillOpacity();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = "";

        gObj.colorField = "selected" + i;

        return gObj;
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
            type: "radar",
            addClassNames: true,
            chartScrollbar: {}
        };
        if (typeof (window as any).define === "function" && (window as any).define.amd) {
            initObj.pathToImages = require && require.toUrl ? require.toUrl("amchartsImg") : ".";
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function (e) {
            const graph = e.graph;
            const data = e.item.dataContext;
            const field = graph.colorField;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field,
                        data,
                        cIdx: e.target.index,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index + 1], context._selected !== null);
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
    }

    render(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
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
    fontSize: { (): number; (_: number): CommonRadar };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): CommonRadar };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): CommonRadar };
    fontColor_exists: () => boolean;
    lineWidth: { (): number; (_: number): CommonRadar };
    lineWidth_exists: () => boolean;
    lineOpacity: { (): number; (_: number): CommonRadar };
    lineOpacity_exists: () => boolean;
    dashedLineStyle: { (): number; (_: number): CommonRadar };
    dashedLineStyle_exists: () => boolean;
    yAxisBaselineColor: { (): string; (_: string): CommonRadar };
    yAxisBaselineColor_exists: () => boolean;
    axisFontSize: { (): number; (_: number): CommonRadar };
    axisFontSize_exists: () => boolean;
    yAxisFontColor: { (): string; (_: string): CommonRadar };
    yAxisFontColor_exists: () => boolean;
    yAxisTitle: { (): string; (_: string): CommonRadar };
    yAxisTitle_exists: () => boolean;
    yAxisTitleFontColor: { (): string; (_: string): CommonRadar };
    yAxisTitleFontColor_exists: () => boolean;
    yAxisTitleFontSize: { (): string; (_: string): CommonRadar };
    yAxisTitleFontSize_exists: () => boolean;
    axisLineWidth: { (): number; (_: number): CommonRadar };
    axisLineWidth_exists: () => boolean;
    marginLeft: { (): number; (_: number): CommonRadar };
    marginLeft_exists: () => boolean;
    marginRight: { (): number; (_: number): CommonRadar };
    marginRight_exists: () => boolean;
    marginTop: { (): number; (_: number): CommonRadar };
    marginTop_exists: () => boolean;
    marginBottom: { (): number; (_: number): CommonRadar };
    marginBottom_exists: () => boolean;
    showScrollbar: { (): boolean; (_: boolean): CommonRadar };
    showScrollbar_exists: () => boolean;
    startDuration: { (): number; (_: number): CommonRadar };
    startDuration_exists: () => boolean;
    yAxisAutoGridCount: { (): boolean; (_: boolean): CommonRadar };
    yAxisAutoGridCount_exists: () => boolean;
    yAxisGridPosition: { (): string; (_: string): CommonRadar };
    yAxisGridPosition_exists: () => boolean;
    yAxisMinimum: { (): any[]; (_: any[]): CommonRadar };
    yAxisMinimum_exists: () => boolean;
    yAxisTitleOffset: { (): any[]; (_: any[]): CommonRadar };
    yAxisTitleOffset_exists: () => boolean;
    yAxisDashLength: { (): any[]; (_: any[]): CommonRadar };
    yAxisDashLength_exists: () => boolean;
    axisAlpha: { (): number; (_: number): CommonRadar };
    axisAlpha_exists: () => boolean;
    circularGrid: { (): boolean; (_: boolean): CommonRadar };
    circularGrid_exists: () => boolean;
    bulletSize: { (): number; (_: number): CommonRadar };
    bulletSize_exists: () => boolean;
    bulletType: { (): string; (_: string): CommonRadar };
    bulletType_exists: () => boolean;
    fillOpacity: { (): number; (_: number): CommonRadar };
    fillOpacity_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): CommonRadar };
    useClonedPalette_exists: () => boolean;
    yAxisTickFormat: { (): string; (_: string): CommonRadar };
    yAxisTickFormat_exists: () => boolean;
    selectionColor: { (): string; (_: string): CommonRadar };
    selectionColor_exists: () => boolean;
    selectionMode: { (): string; (_: string): CommonRadar };
    selectionMode_exists: () => boolean;

    //  I2DChart
    _palette;
    paletteID: { (): string; (_: string): CommonRadar };
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
CommonRadar.prototype._class += " amchart_CommonRadar";
CommonRadar.prototype.implements(ITooltip.prototype);

// NO X-Axis  !!!

CommonRadar.prototype.publish("fontSize", 11, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
CommonRadar.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

CommonRadar.prototype.publish("lineWidth", 2, "number", "Line Thickness", null, { min: 0, max: 10, step: 1, inputType: "range", tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("dashedLineStyle", 0, "number", "", null, { tags: ["Advanced", "Shared"] });

CommonRadar.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color", null, { tags: ["Intermediate", "Shared"] });

CommonRadar.prototype.publish("axisFontSize", undefined, "number", "Size of value labels text. Will use chart's fontSize if not set.", null, { tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("yAxisFontColor", undefined, "string", "Font Name", null, { tags: ["Basic", "Shared"] });

CommonRadar.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title", null, { tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.", null, { tags: ["Basic", "Shared"] });
CommonRadar.prototype.publish("yAxisTitleFontSize", null, "html-color", "Font Size of axis value labels. Will use chart's color if not set.", null, { tags: ["Basic", "Shared"] });

CommonRadar.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis", null, { tags: ["Basic", "Shared"] });

CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)", null, { tags: ["Intermediate"] });
CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)", null, { tags: ["Intermediate"] });
CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)", null, { tags: ["Intermediate"] });
CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)", null, { tags: ["Intermediate"] });

CommonRadar.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar", null, { tags: ["Intermediate"] });

CommonRadar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)", null, { tags: ["Private"] });

CommonRadar.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size", null, { tags: ["Advanced"] });
CommonRadar.prototype.publish("yAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start", "middle"], { tags: ["Advanced"] });

// CommonRadar.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Advanced"]});
// CommonRadar.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
// CommonRadar.prototype.publish("yAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
// CommonRadar.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});

CommonRadar.prototype.publish("yAxisMinimum", [], "array", "", null, { tags: ["Advanced"] });
CommonRadar.prototype.publish("yAxisTitleOffset", [], "array", "", null, { tags: ["Advanced"] });
CommonRadar.prototype.publish("yAxisDashLength", [], "array", "Length of a dash. 0 means line is not dashed.", null, { tags: ["Advanced"] });
CommonRadar.prototype.publish("axisAlpha", 1, "number", "Axis opacity", null, { tags: ["Intermediate"] });

CommonRadar.prototype.publish("circularGrid", false, "boolean", "Circular Grid", null, { tags: ["Intermediate"] }); // not dynamic

CommonRadar.prototype.publish("bulletSize", 9, "number", "Bullet Size", null, { tags: ["Intermediate"] });
CommonRadar.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Intermediate"] });

CommonRadar.prototype.publish("fillOpacity", 0.3, "number", "Shape Opacity", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Intermediate"] });
CommonRadar.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

CommonRadar.prototype.publish("yAxisTickFormat", "", "string", "Y-Axis Tick Format", null, { optional: true });

CommonRadar.prototype.publish("selectionColor", "#f00", "html-color", "Font Color", null, { tags: ["Basic"] });
CommonRadar.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
