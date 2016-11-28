import "amcharts-radar";
import { CommonRadar } from "./CommonRadar";
import { INDChart } from "../api/INDChart";
import "css!./Area";

export function Polar() {
    CommonRadar.call(this);
    this._tag = "div";
    this._gType = "column";
}
Polar.prototype = Object.create(CommonRadar.prototype);
Polar.prototype.constructor = Polar;
Polar.prototype._class += " amchart_Polar";
Polar.prototype.implements(INDChart.prototype);

Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

Polar.prototype.enter = function (domNode, element) {
    CommonRadar.prototype.enter.apply(this, arguments);
};

Polar.prototype.updateChartOptions = function () {
    CommonRadar.prototype.updateChartOptions.apply(this, arguments);

    this.buildGraphs(this._gType);

    return this._chart;
};

Polar.prototype.buildGraphs = function (gType) {
    this._chart.graphs = [];

    for (var i = 0; i < this.columns().length - 1; i++) {
        var gRetVal = CommonRadar.prototype.buildGraphObj.call(this, gType, i);
        var gObj = buildGraphObj.call(this, gRetVal, this._valueField[i], i);

        this._chart.addGraph(gObj);
    }

    function buildGraphObj(gObj, valueField) {
        gObj.valueField = valueField;
        return gObj;
    }
};

Polar.prototype.update = function (domNode, element) {
    CommonRadar.prototype.update.apply(this, arguments);
    this.updateChartOptions();

    this._chart.validateNow();
    this._chart.validateData();
};
