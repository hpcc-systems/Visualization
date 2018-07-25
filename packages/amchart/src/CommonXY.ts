import { ITooltip } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/xy";
import { format as d3Format } from "d3-format";
import { XYAxis as Axis } from "./XYAxis";

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class CommonXY extends HTMLWidget {
    _chart: any = {};

    _selected = null;
    _selections = [];

    _dataUpdated = 0;
    _prevDataUpdated = -1;
    _columnsUpdated = 0;
    _prevColumnsUpdated = -1;

    _xAxis = new Axis();
    _yAxis = new Axis();

    excludeObjs;

    constructor() {
        super();
        this._tag = "div";

        this._xAxis._owningWidget = this;
        this._yAxis._owningWidget = this;
    }

    switchProperties(val) {
        if (val === true) {
            CommonXY.prototype.excludeObjs = ["amchart_XYAxis"];
            // hide the regular ones with the exclude tags?
        } else {
            CommonXY.prototype.excludeObjs = [];
        }
    }

    xAxis(idx) {
        if (!this.xAxes()[idx]) {
            const xAxis = new Axis();
            xAxis._owningWidget = this;
            this.xAxes()[idx] = xAxis;
        }
        return this.xAxes()[idx];
    }

    yAxis(idx) {
        if (!this.yAxes()[idx]) {
            const yAxis = new Axis();
            yAxis._owningWidget = this;
            this.yAxes()[idx] = yAxis;
        }
        return this.yAxes()[idx];
    }

    updateChartOptions() {
        const context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        // left vAxis must always be 0 and bottom 1 !!

        let vAxisCount = 0;

        for (let iy = 0; iy < this.yAxes().length; iy++) {
            const yAxis = this.yAxes()[iy];

            this._chart.valueAxes[vAxisCount].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[vAxisCount].axisAlpha = yAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = yAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = yAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = yAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = yAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = yAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = yAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].autoGridCount = yAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = yAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = yAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = yAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = yAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = yAxis.axisDashLength();

            this._chart.valueAxes[vAxisCount].labelFunction = function (d) {
                return d3Format(yAxis.axisTickFormat())(d);
            };

            vAxisCount++;
        }

        for (let ix = 0; ix < this.xAxes().length; ix++) {
            const xAxis = this.xAxes()[ix];

            this._chart.valueAxes[vAxisCount].position = xAxis.position() ? xAxis.position() : "bottom";
            this._chart.valueAxes[vAxisCount].axisAlpha = xAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = xAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = xAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = xAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = xAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = xAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = xAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].labelRotation = xAxis.axisLabelRotation();
            this._chart.valueAxes[vAxisCount].autoGridCount = xAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = xAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = xAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = xAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = xAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = xAxis.axisDashLength();

            if (xAxis.axisType() === "ordinal") {
                this._chart.valueAxes[vAxisCount].integersOnly = true;
                // this._chart.valueAxes[vAxisCount].maximum = this.data().length; // (off for now)
                this._chart.valueAxes[vAxisCount].labelFunction = function (a, b) {
                    if (b > context.data().length) {
                        return ""; // so the the last dots arent on the edge
                    }
                    return context.data().length && b > 0 ? context.data()[b - 1][0] : "";
                };
            } else {
                this._chart.valueAxes[vAxisCount].labelFunction = function (d) {
                    return d3Format(xAxis.axisTickFormat())(d);
                };
            }

            vAxisCount++;
        }

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.dataProvider.forEach(function (dataPoint, i) {
            context._chart.dataProvider[i].color = context._palette(dataPoint[context.columns()[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context.columns()[2]]);
        });

        this._chart.colors = [];

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        if (this.showCursor()) {
            this._chart.precision = this.xAxes()[0].axisType() === "ordinal" ? 1 : undefined; // so ordinal will work with labelfunction
            this._chart.chartCursor.enabled = true;
            this._chart.chartCursor.valueLineEnabled = true;
            this._chart.chartCursor.valueLineBalloonEnabled = true;
            this._chart.chartCursor.categoryBalloonEnabled = true;
        } else {
            this._chart.precision = undefined; // so ordinal will work with labelfunction
            this._chart.chartCursor.enabled = false;
            this._chart.chartCursor.valueLineEnabled = false;
            this._chart.chartCursor.valueLineBalloonEnabled = false;
            this._chart.chartCursor.categoryBalloonEnabled = false;
        }

        return this._chart;
    }

    buildGraphObj(gType, i) {
        const context = this;
        const gObj: any = {};

        gObj.id = "g" + i;

        gObj.balloonFunction = function (d) {
            if (context && context.tooltipValueFormat) {
                return context.columns()[d.graph.index] + ": " + d3Format(context.tooltipValueFormat())(context.data()[d.index][d.graph.index]);
            } else {
                return context.columns()[d.graph.index] + ": " + context.data()[d.index][d.graph.index];
            }
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();

        gObj.type = gType;

        gObj.colorField = "color" + i;
        gObj.lineColorField = "linecolor";

        // XY Values
        if (this.xAxes()[0].axisType() === "ordinal") {
            gObj.xField = "idx";
            gObj.yField = context.columns()[i];
        }
        if (this.xAxes()[0].axisType() === "linear") {
            gObj.xField = context.columns()[0];
            gObj.yField = context.columns()[1];
        }
        return gObj;
    }

    formatData(dataArr) {
        const context = this;
        const dataObjArr = [];
        dataArr.forEach(function (dataRow, i) {
            const dataObj = {};
            context.columns().forEach(function (colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
                dataObj["idx"] = i + 1;
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        if (this.xAxes().length === 0) {
            this.xAxes().push(this._xAxis);
        }
        if (this.yAxes().length === 0) {
            this.yAxes().push(this._yAxis);
        }

        const context = this;
        const initObj: any = {
            type: "xy",
            addClassNames: true,
            autoMargins: true,
            chartScrollbar: {},
            valueAxes: [],
            chartCursor: {
                enabled: false,
                valueLineEnabled: false,
                valueLineBalloonEnabled: false,
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                valueLineAlpha: 0.2,
                oneBalloonOnly: true,
                balloonPointerOrientation: "vertical",
                valueBalloonsEnabled: false // always set false
            },
            graphs: [{}],
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
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
                data[field] = context.amchartSelectionColor();
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

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index], context._selected !== null);
        });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        const context = this;

        // assign correct axe to PPs and correct context to PropertyExt Obj
        this.yAxes().forEach(function (axe, idx) {
            if (idx === 0) {
                context._yAxis = axe;
            }
            axe._owningWidget = context;
        });

        this.xAxes().forEach(function (axe, idx) {
            if (idx === 0) {
                context._xAxis = axe;
            }
            axe._owningWidget = context;
        });

        if (this.backwardsCompatible()) {
            this.switchProperties(true);
        } else {
            this.switchProperties(false);
        }

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

    backwardsCompatible: (_?: boolean) => boolean | this;
    backwardsCompatible_exists: () => boolean;
    xAxes: { (): any[]; (_: any[]): CommonXY };
    xAxes_exists: () => boolean;
    yAxes: { (): any[]; (_: any[]): CommonXY };
    yAxes_exists: () => boolean;
    fontSize: { (): number; (_: number): CommonXY };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): CommonXY };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): CommonXY };
    fontColor_exists: () => boolean;
    lineWidth: { (): number; (_: number): CommonXY };
    lineWidth_exists: () => boolean;
    lineColor: { (): string; (_: string): CommonXY };
    lineColor_exists: () => boolean;
    lineOpacity: { (): number; (_: number): CommonXY };
    lineOpacity_exists: () => boolean;
    dashedLineStyle: { (): number; (_: number): CommonXY };
    dashedLineStyle_exists: () => boolean;
    showScrollbar: { (): boolean; (_: boolean): CommonXY };
    showScrollbar_exists: () => boolean;
    bulletSize: { (): number; (_: number): CommonXY };
    bulletSize_exists: () => boolean;
    bulletType: { (): string; (_: string): CommonXY };
    bulletType_exists: () => boolean;
    marginLeft: { (): number; (_: number): CommonXY };
    marginLeft_exists: () => boolean;
    marginRight: { (): number; (_: number): CommonXY };
    marginRight_exists: () => boolean;
    marginTop: { (): number; (_: number): CommonXY };
    marginTop_exists: () => boolean;
    marginBottom: { (): number; (_: number): CommonXY };
    marginBottom_exists: () => boolean;
    amchartSelectionColor: { (): string; (_: string): CommonXY };
    amchartSelectionColor_exists: () => boolean;
    selectionMode: { (): string; (_: string): CommonXY };
    selectionMode_exists: () => boolean;
    showCursor: { (): boolean; (_: boolean): CommonXY };
    showCursor_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): CommonXY };
    useClonedPalette_exists: () => boolean;
    axisLineWidth: { (): number; (_: number): CommonXY };
    axisLineWidth_exists: () => boolean;
    axisAlpha: { (): number; (_: number): CommonXY };
    axisAlpha_exists: () => boolean;

    //  INDChart
    _palette;
    paletteID: { (): string; (_: string): CommonXY };
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

CommonXY.prototype._class += " amchart_CommonXY";
CommonXY.prototype.implements(ITooltip.prototype);

CommonXY.prototype.publish("backwardsCompatible", true, "boolean", "Allow use of old publish parameters");

CommonXY.prototype.publish("xAxes", [], "propertyArray", "widgets", null, { max: 1, tags: ["Basic"] }); // max number of xAxes
CommonXY.prototype.publish("yAxes", [], "propertyArray", "widgets", null, { tags: ["Basic"] });

CommonXY.prototype.publish("fontSize", 11, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
CommonXY.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
CommonXY.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, { min: 0, max: 10, step: 1, inputType: "range", tags: ["Basic", "Shared"] });
CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines", null, { tags: ["Basic", "Shared"] });
CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Basic", "Shared"] });

CommonXY.prototype.publish("dashedLineStyle", 0, "number", "", null, { tags: ["Advanced", "Shared"] });

CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar", null, { tags: ["Intermediate"] });

CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size", null, { tags: ["Intermediate"] });
CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Intermediate"] });

CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)", null, { tags: ["Intermediate"] });
CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)", null, { tags: ["Intermediate"] });
CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)", null, { tags: ["Intermediate"] });
CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)", null, { tags: ["Intermediate"] });

CommonXY.prototype.publish("amchartSelectionColor", "#f00", "html-color", "Font Color", null, { tags: ["Basic"] });
CommonXY.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

CommonXY.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar", null, { tags: ["Intermediate", "Shared"] });

CommonXY.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

CommonXY.prototype.publishProxy("xAxisType", "_xAxis", "axisType");
CommonXY.prototype.publishProxy("yAxisType", "_yAxis", "axisType");

CommonXY.prototype.publishProxy("xAxisTitle", "_xAxis", "axisTitle");
CommonXY.prototype.publishProxy("yAxisTitle", "_yAxis", "axisTitle");

CommonXY.prototype.publishProxy("xAxisBaselineColor", "_xAxis", "axisBaselineColor");
CommonXY.prototype.publishProxy("yAxisBaselineColor", "_yAxis", "axisBaselineColor");

CommonXY.prototype.publishProxy("xAxisFontColor", "_xAxis", "axisFontColor");
CommonXY.prototype.publishProxy("yAxisFontColor", "_yAxis", "axisFontColor");

CommonXY.prototype.publishProxy("xAxisTitleFontSize", "_xAxis", "axisTitleFontSize");
CommonXY.prototype.publishProxy("yAxisTitleFontSize", "_yAxis", "axisTitleFontSize");

CommonXY.prototype.publishProxy("xAxisTitleFontColor", "_xAxis", "axisTitleFontColor");
CommonXY.prototype.publishProxy("yAxisTitleFontColor", "_yAxis", "axisTitleFontColor");

CommonXY.prototype.publishProxy("xAxisLabelRotation", "_xAxis", "axisLabelRotation");
CommonXY.prototype.publishProxy("yAxisLabelRotation", "_yAxis", "axisLabelRotation");

CommonXY.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis", null, { tags: ["Intermediate", "Shared"] }); // ??

CommonXY.prototype.publishProxy("xAxisAutoGridCount", "_xAxis", "axisAutoGridCount");
CommonXY.prototype.publishProxy("yAxisAutoGridCount", "_yAxis", "axisAutoGridCount");

CommonXY.prototype.publishProxy("xAxisGridPosition", "_xAxis", "axisGridPosition");
CommonXY.prototype.publishProxy("yAxisGridPosition", "_yAxis", "axisGridPosition");

CommonXY.prototype.publishProxy("xAxisFillAlpha", "_xAxis", "axisFillAlpha");
CommonXY.prototype.publishProxy("yAxisFillAlpha", "_yAxis", "axisFillAlpha");

CommonXY.prototype.publishProxy("xAxisFillColor", "_xAxis", "axisFillColor");
CommonXY.prototype.publishProxy("yAxisFillColor", "_yAxis", "axisFillColor");

CommonXY.prototype.publishProxy("xAxisGridAlpha", "_xAxis", "axisGridAlpha");
CommonXY.prototype.publishProxy("yAxisGridAlpha", "_yAxis", "axisGridAlpha");

CommonXY.prototype.publishProxy("xAxisDashLength", "_xAxis", "axisDashLength");
CommonXY.prototype.publishProxy("yAxisDashLength", "_yAxis", "axisDashLength");

// CommonXY.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:["Intermediate"]});

CommonXY.prototype.publishProxy("xAxisTickFormat", "_xAxis", "axisTickFormat");
CommonXY.prototype.publishProxy("yAxisTickFormat", "_yAxis", "axisTickFormat");

CommonXY.prototype.publish("axisAlpha", 1, "number", "Axis opacity", null, { tags: ["Intermediate"] }); // need to covnert to axis alpha this need to be publish proxied?

const _origBackwardsCompatible = CommonXY.prototype.backwardsCompatible;
CommonXY.prototype.backwardsCompatible = function (_) {
    const retVal = _origBackwardsCompatible.apply(this, arguments);
    if (arguments.length) {
        this.switchProperties(_);
    }
    return retVal;
};
