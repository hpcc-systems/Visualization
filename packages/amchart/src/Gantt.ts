import { ITooltip } from "@hpcc-js/api";
import { INDChart } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/gantt";
import { timeParse as d3TimeParse } from "d3-time-format";
import "./CommonSerial";  //  Need to load amcharts/serial

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class Gantt extends HTMLWidget {
    _chart: any = {};

    _selected = null;
    _selections = [];

    _dataUpdated = 0;
    _prevDataUpdated = -1;
    _columnsUpdated = 0;
    _prevColumnsUpdated = -1;

    _dateParserData = d3TimeParse("%Y-%m-%d");

    _prevTimePattern;

    constructor() {
        super();
        this._tag = "div";
    }

    updateChartOptions() {
        const context = this;

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.depth3D = this.depth3D();
        this._chart.angle = this.angle3D();

        if (this._dataUpdated > this._prevDataUpdated || this._prevTimePattern !== this.timePattern()) {
            this._chart.dataProvider = [];
            const data = this.amFormattedData();
            for (const key in data) {
                const obj: any = {};
                obj.category = key;
                obj.segments = [];
                data[key].forEach(function (range) {
                    const segment = { start: context._dateParserData(range[0]), end: context._dateParserData(range[1]) };
                    obj.segments.push(segment);
                });
                this._chart.dataProvider.push(obj);
            }
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevTimePattern = this.timePattern();

        this._chart.dataProvider.forEach(function (dataPoint, i) {
            context._chart.dataProvider[i].color = context._palette(i);
        });

        this._chart.columnWidth = this.columnWidth();
        this._chart.colorField = "color";

        this._chart.valueAxes[0].type = "date";
        this._chart.valueAxes[0].minPeriod = this.minPeriod();

        this._chart.brightnessStep = this.brightnessStep() || undefined;

        this._chart.categoryField = "category";
        this._chart.segmentsField = "segments";
        this._chart.startDateField = "start";
        this._chart.endDateField = "end";

        this._chart.guides = this.guides();
    }

    amFormattedData() {
        const obj = {};
        this.data().forEach(function (row) {
            if (!obj[row[0]]) {
                obj[row[0]] = [];
            }
            row.forEach(function (data, idx) {
                if (idx === 0) {
                    return;
                }
                obj[row[0]].push(data);
            });
        });
        return obj;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;

        const initObj: any = {
            type: "gantt",
            theme: "none",
            autoMargins: true,
            valueAxis: {},
            graph: {
                fillAlphas: 1,
                balloonText: "<b>[[category]]</b>: [[open]] - [[value]]" // TODO replace with balloon function
            },
            rotate: true,
            dataProvider: [],
            chartScrollbar: {},
            export: {
                enabled: true
            }
        };

        if (typeof (window as any).define === "function" && (window as any).define.amd) {
            initObj.pathToImages = require && require.toUrl ? require.toUrl("amchartsImg") : ".";
        }
        this._chart = AmCharts.makeChart(domNode, initObj);

        this._chart.addListener("clickGraphItem", function (e) {
            const data = e.graph.segmentData;
            const field = "color";

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
                        colIndex: e.target.columnIndex,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex + 1], context._selected !== null);
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

    paletteID: { (): string; (_: string): Gantt };
    paletteID_exists: () => boolean;
    fontFamily: { (): string; (_: string): Gantt };
    fontFamily_exists: () => boolean;
    fontSize: { (): number; (_: number): Gantt };
    fontSize_exists: () => boolean;
    fontColor: { (): string; (_: string): Gantt };
    fontColor_exists: () => boolean;
    depth3D: { (): number; (_: number): Gantt };
    depth3D_exists: () => boolean;
    angle3D: { (): number; (_: number): Gantt };
    angle3D_exists: () => boolean;
    selectionMode: { (): string; (_: string): Gantt };
    selectionMode_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): Gantt };
    useClonedPalette_exists: () => boolean;
    timePattern: (_?: string) => string | Gantt;
    timePattern_exists: () => boolean;
    selectionColor: { (): string; (_: string): Gantt };
    selectionColor_exists: () => boolean;
    brightnessStep: { (): number; (_: number): Gantt };
    brightnessStep_exists: () => boolean;
    columnWidth: { (): number; (_: number): Gantt };
    columnWidth_exists: () => boolean;
    minPeriod: { (): string; (_: string): Gantt };
    minPeriod_exists: () => boolean;
    guides: { (): any[]; (_: any[]): Gantt };
    guides_exists: () => boolean;

    //  I2DChart
    _palette;
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
Gantt.prototype._class += " amchart_Gantt";
Gantt.prototype.implements(INDChart.prototype); // 2d?

Gantt.prototype.publish("paletteID", "default", "set", "Palette ID", Gantt.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

Gantt.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family", null, { tags: ["Basic", "Shared"] });
Gantt.prototype.publish("fontSize", 11, "number", "Label Font Size", null, { tags: ["Basic", "Shared"] });
Gantt.prototype.publish("fontColor", "#000000", "html-color", "Label Font Color", null, { tags: ["Basic", "Shared"] });

Gantt.prototype.publish("depth3D", 0, "number", "3D Depth (px)", null, { tags: ["Basic"] });
Gantt.prototype.publish("angle3D", 0, "number", "3D Angle (Deg)", null, { tags: ["Basic"] });

Gantt.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

Gantt.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

Gantt.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern");

Gantt.prototype.publish("selectionColor", "#f00", "html-color", "Font Color", null, { tags: ["Basic"] });

Gantt.prototype.publish("brightnessStep", 0, "number", "Brightness step", null, { tags: ["Basic"] });
Gantt.prototype.publish("columnWidth", 0.5, "number", "column width", null, { tags: ["Basic"] });
Gantt.prototype.publish("minPeriod", "DD", "string", "Value axis minimum period", null, { tags: ["Basic"] });

Gantt.prototype.publish("guides", [], "array", "Vertical lines", null, { tags: ["Intermediate"] });

const timePattern = Gantt.prototype.timePattern;
Gantt.prototype.timePattern = function (_?: string): string | Gantt {
    const retVal = timePattern.apply(this, arguments);
    if (arguments.length) {
        this._dateParserData = d3TimeParse(_);
    }
    return retVal;
};
