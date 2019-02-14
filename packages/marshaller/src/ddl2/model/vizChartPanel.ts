import { ChartPanel } from "@hpcc-js/layout";

export class VizChartPanel extends ChartPanel {
}
VizChartPanel.prototype._class += " marshaller_VizChartPanel";

export interface VizChartPanel {
    minWidth(): number;
    minWidth(_: number): this;
    minWidth(_: number): this;
    minWidth_exists(): boolean;
    minHeight(): number;
    minHeight(_: number): this;
    minHeight_exists(): boolean;
}
VizChartPanel.prototype.publish("descriptionTemplate", "", "string");
VizChartPanel.prototype.publish("minWidth", 160, "number", "Min Width");
VizChartPanel.prototype.publish("minHeight", 120, "number", "Min Height");
