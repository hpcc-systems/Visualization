import { I2DChart } from "@hpcc-js/api";
import { format as d3Format } from "d3-format";
import { CommonFunnel } from "./CommonFunnel";

export class Funnel extends CommonFunnel {
    constructor() {
        super();
    }

    enter(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        const context = this;
        this._chart.balloonFunction = function (d) {
            if (context && context.tooltipValueFormat) {
                return d.title + ", " + d3Format(context.tooltipValueFormat())(d.value);
            } else {
                return d.title + ", " + d.value;
            }
        };
        this._chart.neckHeight = this.neckHeightPercent() + "%";
        this._chart.neckWidth = this.neckWidthPercent() + "%";
    }

    update(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    }

    paletteID: { (): string; (_: string): Funnel };
    paletteID_exists: () => boolean;
    neckHeightPercent: { (): number; (_: number): Funnel };
    neckHeightPercent_exists: () => boolean;
    neckWidthPercent: { (): number; (_: number): Funnel };
    neckWidthPercent_exists: () => boolean;
}
Funnel.prototype._class += " amchart_Funnel";
Funnel.prototype.implements(I2DChart.prototype);

Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %", null, { tags: ["Basic"] });
Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %", null, { tags: ["Basic"] });
