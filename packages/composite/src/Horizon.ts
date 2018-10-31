import { ChartSeries } from "./ChartSeries";

export class Horizon extends ChartSeries {
    constructor() {
        super();
        this.chartType_default("Area");
        this.minimumChartHeight_default(1);
        this.xAxisGuideLines_default(false);
        this.yAxisGuideLines_default(false);
    }
    chartType_default: (value: "Area" | "Column" | "Line" | "Scatter") => void;
    minimumChartHeight_default: (value: number) => void;
    xAxisGuideLines_default: (value: boolean) => void;
    yAxisGuideLines_default: (value: boolean) => void;
}
Horizon.prototype._class += " composite_Horizon";
