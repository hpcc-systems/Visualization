import { ChartPanel } from "@hpcc-js/layout";

export class VizChartPanel extends ChartPanel {
}
VizChartPanel.prototype._class += " marshaller_VizChartPanel";

export interface VizChartPanel {
}
VizChartPanel.prototype.publish("descriptionTemplate", "", "string");
