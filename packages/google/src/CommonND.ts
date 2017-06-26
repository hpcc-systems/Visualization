import { INDChart } from "@hpcc-js/api";
import { Common } from "./Common";

export class CommonND extends Common {

    constructor() {
        super();
        INDChart.call(this);
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

    paletteID: { (): string; (_: string): CommonND };
    paletteID_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): CommonND };
    useClonedPalette_exists: () => boolean;
}
CommonND.prototype._class += " google_CommonND";
CommonND.prototype.implements(INDChart.prototype);

CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

function initSeries(num) {
    const series = [];
    for (let i = 0; i < num; i++) {
        series.push({});
    }
    return series;
}
