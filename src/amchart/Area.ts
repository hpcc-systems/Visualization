import { CommonSerial } from "./CommonSerial";
import { INDChart } from "../api/INDChart";
import "css!./Area";

export function Area() {
    CommonSerial.call(this);
    this._tag = "div";
    this._gType = "line";
}
Area.prototype = Object.create(CommonSerial.prototype);
Area.prototype.constructor = Area;
Area.prototype._class += " amchart_Area";
Area.prototype.implements(INDChart.prototype);

Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Area.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, { min: 0, max: 1, step: 0.001, inputType: "range", tags: ["Intermediate", "Shared"] });
Area.prototype.publish("stackType", "regular", "set", "Stack Type", ["none", "regular", "100%"], { tags: ["Basic"] });

Area.prototype.publish("bulletSize", 6, "number", "Bullet Size", null, { tags: ["Intermediate"] });
Area.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"], { tags: ["Basic"] });

Area.prototype.enter = function (domNode, element) {
    CommonSerial.prototype.enter.apply(this, arguments);
};

Area.prototype.updateChartOptions = function () {
    CommonSerial.prototype.updateChartOptions.apply(this, arguments);

    // Stacked
    if (this.stacked()) {
        this._chart.valueAxes[0].stackType = this.stackType();
    } else {
        this._chart.valueAxes[0].stackType = "none";
    }

    this.buildGraphs(this._gType);

    return this._chart;
};

Area.prototype.buildGraphs = function (gType) {
    this._chart.graphs = [];

    for (var i = 0; i < this.columns().length - 1; i++) {
        var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
        var gObj = buildGraphObj.call(this, gRetVal, i);

        this._chart.addGraph(gObj);
    }

    function buildGraphObj(gObj, i) {
        // Area Specific Options
        gObj.fillAlphas = this.fillOpacity();
        gObj.bullet = this.bulletType();
        gObj.bulletSize = this.bulletSize();

        return gObj;
    }
};

Area.prototype.update = function (domNode, element) {
    CommonSerial.prototype.update.apply(this, arguments);

    this.updateChartOptions();

    this._chart.validateNow();
    this._chart.validateData();
};
