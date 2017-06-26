import { timeParse as d3TimeParse } from "d3-time-format";
import { Axis } from "./Axis";

export class SerialAxis extends Axis {
    _parser;
    owningWidget;

    constructor() {
        super();

        this._parser = d3TimeParse("%Y-%m-%d");
    }

    axisFontSize: { (): number; (_: number): SerialAxis };
    axisFontSize_exists: () => boolean;
    axisBaselineColor: { (): string; (_: string): SerialAxis };
    axisBaselineColor_exists: () => boolean;
    axisFontColor: { (): string; (_: string): SerialAxis };
    axisFontColor_exists: () => boolean;
    axisTitle: { (): string; (_: string): SerialAxis };
    axisTitle_exists: () => boolean;
    axisTitleFontSize: { (): number; (_: number): SerialAxis };
    axisTitleFontSize_exists: () => boolean;
    axisTitleFontColor: { (): string; (_: string): SerialAxis };
    axisTitleFontColor_exists: () => boolean;
    axisLabelRotation: { (): number; (_: number): SerialAxis };
    axisLabelRotation_exists: () => boolean;
    axisLineWidth: { (): number; (_: number): SerialAxis };
    axisLineWidth_exists: () => boolean;
    axisAlpha: { (): number; (_: number): SerialAxis };
    axisAlpha_exists: () => boolean;
    axisAutoGridCount: { (): boolean; (_: boolean): SerialAxis };
    axisAutoGridCount_exists: () => boolean;
    axisGridPosition: { (): string; (_: string): SerialAxis };
    axisGridPosition_exists: () => boolean;
    axisBoldPeriodBeginning: { (): boolean; (_: boolean): SerialAxis };
    axisBoldPeriodBeginning_exists: () => boolean;
    axisDashLength: { (): number; (_: number): SerialAxis };
    axisDashLength_exists: () => boolean;
    axisFillAlpha: { (): number; (_: number): SerialAxis };
    axisFillAlpha_exists: () => boolean;
    axisFillColor: { (): string; (_: string): SerialAxis };
    axisFillColor_exists: () => boolean;
    axisGridAlpha: { (): number; (_: number): SerialAxis };
    axisGridAlpha_exists: () => boolean;
    startOnAxis: { (): boolean; (_: boolean): SerialAxis };
    startOnAxis_exists: () => boolean;
    axisTypeTimePattern: (_?: string) => string | this;
    axisTypeTimePattern_exists: () => boolean;
    axisType: { (): string; (_: string): SerialAxis };
    axisType_exists: () => boolean;
    axisTickFormat: { (): string; (_: string): SerialAxis };
    axisTickFormat_exists: () => boolean;
    position: { (): string; (_: string): SerialAxis };
    position_exists: () => boolean;
}
SerialAxis.prototype._class += " amchart_SerialAxis";

SerialAxis.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisBaselineColor", "#000000", "string", "X Axis Baseline Color", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisFontColor", "#000000", "string", "Horizontal Axis Text Style (Color)", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisTitle", "", "string", "X-Axis Title", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisTitleFontColor", "#000000", "string", "Axis Title Text Style (Color)", null, { tags: ["Basic", "Shared"] });
SerialAxis.prototype.publish("axisLabelRotation", 0, "number", "Axis Label Rotation", null, { min: 0, max: 90, step: 0.1, inputType: "range", tags: ["Intermediate", "Shared"] });
SerialAxis.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width", null, { tags: ["Intermediate", "Shared"] });
SerialAxis.prototype.publish("axisAlpha", 1, "number", "Axis Alpha", null, { tags: ["Intermediate"] });
SerialAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size", null, { tags: ["Advanced"] });
SerialAxis.prototype.publish("axisGridPosition", "start", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start", "middle"], { tags: ["Advanced"] });
SerialAxis.prototype.publish("axisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.", null, { tags: ["Intermediate"] });
SerialAxis.prototype.publish("axisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.", null, { tags: ["Advanced"] });
SerialAxis.prototype.publish("axisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.", null, { tags: ["Intermediate"] });
SerialAxis.prototype.publish("axisFillColor", null, "string", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.", null, { tags: ["Intermediate"] });
SerialAxis.prototype.publish("axisGridAlpha", 0.0, "number", "Grid alpha.", null, { tags: ["Intermediate"] });
// SerialAxis.prototype.publish("axisMinimum", null, "number", "",null,{tags:["Intermediate"]});

SerialAxis.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.", null, { tags: ["Intermediate"] });
SerialAxis.prototype.publish("axisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
SerialAxis.prototype.publish("axisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time", "pow", "log", "none"]);
SerialAxis.prototype.publish("axisTickFormat", "", "string", "Y-Axis Tick Format");

SerialAxis.prototype.publish("position", null, "set", "Position of Axis", ["top", "bottom", "left", "right"]);

const axisTypeTimePattern = SerialAxis.prototype.axisTypeTimePattern;
SerialAxis.prototype.axisTypeTimePattern = function (_) {
    const retVal = axisTypeTimePattern.apply(this, arguments);
    if (arguments.length) {
        this._parser = d3TimeParse(_);
    }
    return retVal;
};
