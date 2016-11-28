import { Common } from "./Common";
import { I2DChart } from "../api/I2DChart";

export function Common2D() {
    Common.call(this);
    I2DChart.call(this);
}
Common2D.prototype = Object.create(Common.prototype);
Common2D.prototype.constructor = Common2D;
Common2D.prototype._class += " google_Common2D";
Common2D.prototype.implements(I2DChart.prototype);

Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

Common2D.prototype.getChartOptions = function () {
    var chartOptions = Common.prototype.getChartOptions.call(this);
    chartOptions.series = initSeries(this.getNumSeries());
    chartOptions.axes = {};

    return chartOptions;
};

Common2D.prototype.update = function (domNode, element) {
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
