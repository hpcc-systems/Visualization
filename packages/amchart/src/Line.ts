import { INDChart } from "@hpcc-js/api";
import { CommonSerial } from "./CommonSerial";

export class Line extends CommonSerial {
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
            if (this.stepLines()) {
                gObj.type = "step";
            } else if (this.smoothLines()) {
                gObj.type = "smoothedLine";
            } else {
                gObj.type = "line";
            }

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
    paletteID: { (): string; (_: string): Line };
    paletteID_exists: () => boolean;
    smoothLines: { (): boolean; (_: boolean): Line };
    smoothLines_exists: () => boolean;
    stepLines: { (): boolean; (_: boolean): Line };
    stepLines_exists: () => boolean;
    bulletSize: { (): number; (_: number): Line };
    bulletSize_exists: () => boolean;
    bulletType: { (): string; (_: string): Line };
    bulletType_exists: () => boolean;
}
Line.prototype._class += " amchart_Line";
Line.prototype.implements(INDChart.prototype);

Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly", null, { tags: ["Basic", "Shared"] });

Line.prototype.publish("stepLines", false, "boolean", "Causes chart data lines to draw smoothly", null, { tags: ["Basic"] });

Line.prototype.publish("bulletSize", 6, "number", "Bullet Size", null, { tags: ["Intermediate"] });
Line.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Basic"] });
