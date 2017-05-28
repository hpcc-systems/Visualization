import { I2DChart } from "@hpcc-js/api";
import { format as d3Format } from "d3-format";
import { CommonFunnel } from "./CommonFunnel";

export class Pyramid extends CommonFunnel {
    constructor() {
        super();
        this._tag = "div";
    }

    enter(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    }

    updateChartOptions() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        const context = this;
        this._chart.balloonFunction = function (d) {
            if (context && context.tooltipValueFormat) {
                return d.title + ": " + d3Format(context.tooltipValueFormat())(d.value);
            }
        };
    }

    update(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);
    }

    paletteID: { (): string; (_: string): Pyramid };
    paletteID_exists: () => boolean;
}
Pyramid.prototype._class += " amchart_Pyramid";
Pyramid.prototype.implements(I2DChart.prototype);

Pyramid.prototype.publish("paletteID", "default", "set", "Palette ID", Pyramid.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
