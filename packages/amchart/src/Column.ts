import { INDChart } from "@hpcc-js/api";
import { CommonSerial } from "./CommonSerial";

export class Column extends CommonSerial {
    constructor() {
        super();

        this._tag = "div";
        this._gType = "column";

        this.orientation("horizontal");
    }

    enter(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        if (this._rangeType === "candle-ohlc") {
            this._gType = this.useOhlcLines() ? "ohlc" : "candlestick";
        } else {
            this._gType = "column";
        }

        this.buildGraphs(this._gType);

        // Stacked
        if (this.stacked()) {
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        if (this.yAxisDomainLow_exists()) {
            this._chart.valueAxes[0].minimum = this.yAxisDomainLow();
        }

        if (this.yAxisDomainHigh_exists()) {
            this._chart.valueAxes[0].maximum = this.yAxisDomainHigh();
        }
        this._chart.valueAxes[0].strictMinMax = false;

        if (this.yAxisLabelFrequency_exists()) {
            this._chart.valueAxes[0].labelFrequency = this.yAxisLabelFrequency();
        }

        if (this.yAxisBaseValue_exists()) {
            this._chart.valueAxes[0].baseValue = this.yAxisBaseValue();
        }

        if (this.yAxisTickCount_exists()) {
            this._chart.valueAxes[0].gridCount = this.yAxisTickCount();
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false;

        return this._chart;
    }

    buildGraphs(gType) {
        this._chart.graphs = [];

        for (let i = 0; i < this.columns().length - 1; i++) {
            const gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            const gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if (this.cylinderBars()) {
                gObj.topRadius = this.circleRadius();
            } else {
                gObj.topRadius = undefined;
            }

            if (this._rangeType === "normal") {
                gObj.openField = "openField" + i;
                gObj.valueField = "valueField" + i;
            }
            if (this._rangeType === "candle-ohlc") {
                gObj.lowField = "lowField" + i;
                gObj.openField = "openField" + i;
                gObj.closeField = "closeField" + i;
                gObj.highField = "highField" + i;
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    }

    update(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    paletteID: { (): string; (_: string): Column };
    paletteID_exists: () => boolean;
    stacked: { (): boolean; (_: boolean): Column };
    stacked_exists: () => boolean;
    fillOpacity: { (): number; (_: number): Column };
    fillOpacity_exists: () => boolean;
    cylinderBars: { (): boolean; (_: boolean): Column };
    cylinderBars_exists: () => boolean;
    circleRadius: { (): number; (_: number): Column };
    circleRadius_exists: () => boolean;
    columnWidth: { (): number; (_: number): Column };
    columnWidth_exists: () => boolean;
    Depth3D: { (): number; (_: number): Column };
    Depth3D_exists: () => boolean;
    Angle3D: { (): number; (_: number): Column };
    Angle3D_exists: () => boolean;
    stackType: { (): string; (_: string): Column };
    stackType_exists: () => boolean;
    useOhlcLines: { (): boolean; (_: boolean): Column };
    useOhlcLines_exists: () => boolean;
    yAxisDomainLow: { (): number; (_: number): Column };
    yAxisDomainLow_exists: () => boolean;
    yAxisDomainHigh: { (): number; (_: number): Column };
    yAxisDomainHigh_exists: () => boolean;
    yAxisBaseValue: { (): number; (_: number): Column };
    yAxisBaseValue_exists: () => boolean;
    yAxisLabelFrequency: { (): number; (_: number): Column };
    yAxisLabelFrequency_exists: () => boolean;
    yAxisTickCount: { (): number; (_: number): Column };
    yAxisTickCount_exists: () => boolean;
}
Column.prototype._class += " amchart_Column";
Column.prototype.implements(INDChart.prototype);

Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Column.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
Column.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Intermediate", "Shared"] });

Column.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars", null, { tags: ["Basic"] });
Column.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars", null, { tags: ["Basic"] });

Column.prototype.publish("columnWidth", 0.62, "number", "Column Width", null, { tags: ["Basic"] });

Column.prototype.publish("Depth3D", 0, "number", "3D Depth (px)", null, { tags: ["Basic"] });
Column.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)", null, { tags: ["Basic"] });

Column.prototype.publish("stackType", "regular", "set", "Stack Type", ["none", "regular", "100%", "3d"], { tags: ["Basic"] });
Column.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines", null, { tags: ["Intermediate"] });

Column.prototype.publish("yAxisDomainLow", null, "number", "Y axis Minimum value", null, { optional: true });
Column.prototype.publish("yAxisDomainHigh", null, "number", "Y axis Maximum value", null, { optional: true });
Column.prototype.publish("yAxisBaseValue", null, "number", "Y axis base value", null, { optional: true });
Column.prototype.publish("yAxisLabelFrequency", 1, "number", "Y axis label frequency", null, { optional: true });
Column.prototype.publish("yAxisTickCount", null, "number", "Y axis grid count", null, { optional: true });
