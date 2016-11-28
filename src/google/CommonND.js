import { Common } from "./Common";
import { INDChart } from "../api/INDChart";

export function CommonND() {
    Common.call(this);
    INDChart.call(this);
}
CommonND.prototype = Object.create(Common.prototype);
CommonND.prototype.constructor = CommonND;
CommonND.prototype._class += " google_CommonND";
CommonND.prototype.implements(INDChart.prototype);

CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

CommonND.prototype.getChartOptions = function () {
    var chartOptions = Common.prototype.getChartOptions.call(this);
    chartOptions.series = initSeries(this.getNumSeries());
    chartOptions.axes = {};

    return chartOptions;
};

CommonND.prototype.update = function (domNode, element) {
    this._palette = this._palette.switch(this.paletteID());
    if (this.useClonedPalette()) {
        this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
    }
    Common.prototype.update.apply(this, arguments);
};

function initSeries(num) {
    var series = [];
    for (var i = 0; i < num; i++) {
        series.push({});
    }
    return series;
}
