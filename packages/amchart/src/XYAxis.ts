import "amcharts3/amcharts/xy";
import { SerialAxis } from "./SerialAxis";

export class XYAxis extends SerialAxis {
    constructor() {
        super();
    }

    axisAutoGridCount: { (): boolean; (_: boolean): XYAxis };
    axisAutoGridCount_exists: () => boolean;
    axisGridPosition: { (): string; (_: string): XYAxis };
    axisGridPosition_exists: () => boolean;
    axisTickFormat: { (): string; (_: string): XYAxis };
    axisTickFormat_exists: () => boolean;
    axisGridAlpha: { (): number; (_: number): XYAxis };
    axisGridAlpha_exists: () => boolean;
}
XYAxis.prototype._class += " amchart_XYAxis";

XYAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size", null, { override: true, tags: ["Advanced"] });
XYAxis.prototype.publish("axisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start", "middle"], { override: true, tags: ["Advanced"] });
XYAxis.prototype.publish("axisTickFormat", "", "string", "Y-Axis Tick Format", null, { optional: true, override: true });
XYAxis.prototype.publish("axisGridAlpha", 0.2, "number", "Grid alpha.", null, { override: true, tags: ["Intermediate"] });
