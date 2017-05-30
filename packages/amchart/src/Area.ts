import { INDChart } from "@hpcc-js/api";
import { CommonSerial } from "./CommonSerial";

import "../src/Area.css";

export class Area extends CommonSerial {

    constructor() {
        super();
        this._tag = "div";
        this._gType = "line";
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

        this.buildGraphs(this._gType);

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
            // Area Specific Options
            gObj.fillAlphas = this.fillOpacity();
            gObj.bullet = this.bulletType();
            gObj.bulletSize = this.bulletSize();

            return gObj;
        }
    }

    update(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    paletteID: { (): string, (_: string): Area };
    stacked: { (): boolean, (_: boolean): Area };
    fillOpacity: { (): number, (_: number): Area };
    stackType: { (): string, (_: string): Area };

    bulletSize: { (): number, (_: number): Area };
    bulletType: { (): string, (_: string): Area };

    //  INDChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
Area.prototype._class += " amchart_Area";
Area.prototype.implements(INDChart.prototype);

Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Area.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Intermediate", "Shared"] });
Area.prototype.publish("stackType", "regular", "set", "Stack Type", ["none", "regular", "100%"], { tags: ["Basic"] });

Area.prototype.publish("bulletSize", 6, "number", "Bullet Size", null, { tags: ["Intermediate"] });
Area.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Basic"] });
