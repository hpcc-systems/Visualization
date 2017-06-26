import { I2DChart } from "@hpcc-js/api";
import { Common } from "./Common";

export class Common2D extends Common {

    constructor() {
        super();
        I2DChart.call(this);
    }

    getChartOptions() {
        const chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    }

    update(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        Common.prototype.update.apply(this, arguments);
    }

    paletteID: { (): string; (_: string): Common2D };
    paletteID_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): Common2D };
    useClonedPalette_exists: () => boolean;
}
Common2D.prototype._class += " google_Common2D";
Common2D.prototype.implements(I2DChart.prototype);

Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

function initSeries(num) {
    const series = [];
    for (let i = 0; i < num; i++) {
        series.push({});
    }
    return series;
}
