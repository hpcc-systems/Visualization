import { INDChart } from "@hpcc-js/api";
import { CommonSerial } from "./CommonSerial";

import "../src/Combo.css";

export class Combo extends CommonSerial {
    constructor() {
        super();
        this._tag = "div";

    }

    enter(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        // Stacked
        if (this.stacked()) {
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this.buildGraphs();

        this._chart.categoryAxis.startOnAxis = false;

        return this._chart;
    }

    buildGraphs() {
        this._chart.graphs = [];
        let gType;

        for (let i = 0; i < this.columns().length - 1; i++) {
            gType = this.types()[i] || this.defaultType();
            const gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            const gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            // Combo Specific Options
            if (gType !== "line") {
                gObj.fillAlphas = this.fillOpacity();
            }
            if (gType !== "column") {
                gObj.bullet = this.bulletType();
                gObj.bulletSize = this.bulletSize();
            }

            gObj.valueField = this.columns()[i + 1];

            gObj.type = gObj.type === "area" ? "line" : gObj.type; // an area chart is a line chart with fillOpacity set
            return gObj;
        }
    }

    update(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    paletteID: { (): string; (_: string): Combo };
    paletteID_exists: () => boolean;
    stacked: { (): boolean; (_: boolean): Combo };
    stacked_exists: () => boolean;
    fillOpacity: { (): number; (_: number): Combo };
    fillOpacity_exists: () => boolean;
    stackType: { (): string; (_: string): Combo };
    stackType_exists: () => boolean;
    bulletSize: { (): number; (_: number): Combo };
    bulletSize_exists: () => boolean;
    bulletType: { (): string; (_: string): Combo };
    bulletType_exists: () => boolean;
    defaultType: { (): string; (_: string): Combo };
    defaultType_exists: () => boolean;
    types: { (): any[]; (_: any[]): Combo };
    types_exists: () => boolean;
    charts: { (): any[]; (_: any[]): Combo };
    charts_exists: () => boolean;
}
Combo.prototype._class += " amchart_Combo";
Combo.prototype.implements(INDChart.prototype);

Combo.prototype.publish("paletteID", "default", "set", "Palette ID", Combo.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Combo.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Intermediate", "Shared"] });
Combo.prototype.publish("stackType", "regular", "set", "Stack Type", ["none", "regular", "100%"], { tags: ["Basic"] });

Combo.prototype.publish("bulletSize", 6, "number", "Bullet Size", null, { tags: ["Intermediate"] });
Combo.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Basic"] });

Combo.prototype.publish("defaultType", "column", "set", "Default chart type", ["column", "line", "spline", "area", "area-spline", "step", "area-step", "scatter"], { tags: ["Basic"] });
Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)", null, { tags: ["Basic"] });

Combo.prototype.publish("charts", [], "widgetArray", "widgets", null, { tags: ["Basic"] }); // perhaps we want to load up the params on a chart and pass in the chart and just read the params there?
