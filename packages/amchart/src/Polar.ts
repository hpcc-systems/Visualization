import { INDChart } from "@hpcc-js/api";
import "amcharts3/amcharts/radar";
import { CommonRadar } from "./CommonRadar";

import "../src/Area.css";

export class Polar extends CommonRadar {
    _gType;

    constructor() {
        super();
        this._tag = "div";
        this._gType = "column";
    }

    enter(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    }

    buildGraphs(gType) {
        this._chart.graphs = [];

        for (let i = 0; i < this.columns().length - 1; i++) {
            const gRetVal = CommonRadar.prototype.buildGraphObj.call(this, gType, i);
            const gObj = buildGraphObj.call(this, gRetVal, this._valueField[i], i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, valueField) {
            gObj.valueField = valueField;
            return gObj;
        }
    }

    update(domNode, element) {
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }
    paletteID: { (): string; (_: string): Polar };
    paletteID_exists: () => boolean;
}
Polar.prototype._class += " amchart_Polar";
Polar.prototype.implements(INDChart.prototype);

Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
