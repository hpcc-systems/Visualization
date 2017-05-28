import { INDChart } from "@hpcc-js/api";
import { CommonXY } from "./CommonXY";

export class Scatter extends CommonXY {
    _type = "Scatter";
    _gType = "column";

    constructor() {
        super();
        this._tag = "div";
    }

    enter(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    }

    buildGraphs(gType) {
        this._chart.graphs = [];

        for (let i = 0; i < this.columns().length; i++) {
            const gRetVal = CommonXY.prototype.buildGraphObj.call(this, gType, i);
            const gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj) {
            if (this.scatterType() === "bubble") {
                gObj["valueField"] = this.columns()[2];
            } else {
                delete gObj["valueField"];
            }
            return gObj;
        }
    }

    update(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();

    }

    paletteID: { (): string; (_: string): Scatter };
    paletteID_exists: () => boolean;
    scatterType: { (): string; (_: string): Scatter };
    scatterType_exists: () => boolean;
}
Scatter.prototype._class += " amchart_Scatter";
Scatter.prototype.implements(INDChart.prototype);

Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

Scatter.prototype.publish("scatterType", "scatter", "set", "Bullet Type", ["scatter", "bubble"], { tags: ["Basic"] });
