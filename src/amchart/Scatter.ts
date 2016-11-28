import { CommonXY } from "./CommonXY";
import { INDChart } from "../api/INDChart";

export function Scatter() {
    CommonXY.call(this);
    this._tag = "div";

    this._type = "Scatter";
    this._gType = "column";
}
Scatter.prototype = Object.create(CommonXY.prototype);
Scatter.prototype.constructor = Scatter;
Scatter.prototype._class += " amchart_Scatter";
Scatter.prototype.implements(INDChart.prototype);

Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

Scatter.prototype.publish("scatterType", "scatter", "set", "Bullet Type", ["scatter", "bubble"], { tags: ["Basic"] });

Scatter.prototype.enter = function (domNode, element) {
    CommonXY.prototype.enter.apply(this, arguments);
};

Scatter.prototype.updateChartOptions = function () {
    CommonXY.prototype.updateChartOptions.apply(this, arguments);

    this.buildGraphs(this._gType);

    return this._chart;
};

Scatter.prototype.buildGraphs = function (gType) {
    this._chart.graphs = [];

    for (var i = 0; i < this.columns().length; i++) {
        var gRetVal = CommonXY.prototype.buildGraphObj.call(this, gType, i);
        var gObj = buildGraphObj.call(this, gRetVal, i);

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
};

Scatter.prototype.update = function (domNode, element) {
    CommonXY.prototype.update.apply(this, arguments);

    this.updateChartOptions();

    this._chart.validateNow();
    this._chart.validateData();

};
