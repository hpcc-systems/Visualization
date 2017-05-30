import { timeParse as d3TimeParse } from "d3-time-format";
import { CommonND } from "./CommonND";
import { createDataTable } from "./Loader";

export class MaterialGantt extends CommonND {
    _data_google;

    constructor() {
        super();
        this._chartPackage = "gantt";
        this._chartType = "Gantt";
    }

    getChartOptions() {
        const retVal: any = {};

        retVal.height = this.height();
        retVal.backgroundColor = { fill: this.backgroundColor() };
        retVal.gantt = {
            trackHeight: (this.height() - this.xAxisHeight()) / this.data().length,
            arrow: {
                angle: this.arrowAngle(),
                color: this.arrowColor(),
                length: this.arrowLength(),
                radius: this.arrowRadius(),
                spaceAfter: this.arrowSpaceAfter(),
                width: this.arrowWidth()
            },
            barCornerRadius: this.barCornerRadius(),
            barHeight: this.barHeight(),
            criticalPathEnabled: this.criticalPathEnabled(),
            criticalPathStyle: {
                stroke: this.criticalPathColor(),
                strokeWidth: this.criticalPathStrokeWidth()
            },
            defaultStartDate: this.defaultStartDate(),
            innerGridHorizLine: {
                stroke: this.innerGridLineColor(),
                strokeWidth: this.innerGridLineWidth()
            },
            innerGridTrack: { fill: this.trackColor() },
            innerGridDarkTrack: { fill: this.trackZebraColor() },
            labelMaxWidth: this.labelMaxWidth(),
            labelStyle: {
                fontName: this.labelFontFamily(),
                fontSize: this.labelFontSize(),
            },
            percentEnabled: this.percentEnabled(),
            percentStyle: { fill: this.percentFillColor() },
            shadowEnabled: this.shadowEnabled(),
            shadowColor: this.shadowColor(),
            shadowOffset: this.shadowOffset()
        };

        return retVal;
    }

    formatData() {
        let data = null;
        if (this.data().length) {
            this._data_google = createDataTable();

            this._data_google.addColumn("string", this.columns()[0]);
            this._data_google.addColumn("string", this.columns()[3]);
            this._data_google.addColumn("string", this.columns()[4]);
            this._data_google.addColumn("date", "Start");
            this._data_google.addColumn("date", "End");
            this._data_google.addColumn("number", this.columns()[2]);
            this._data_google.addColumn("number", this.columns()[5]);
            this._data_google.addColumn("string", this.columns()[6]);

            const parseDate = d3TimeParse(this.datePattern());

            data = this.data().map(function (d) {
                const label = d[0];
                const start = parseDate(d[1][0]);
                const end = parseDate(d[1][1]);
                let duration = d[2] || (end.getDate() - start.getDate()) || null;
                const id = d[3] || d[0];
                const resource = d[4];
                const completeness = d[5];
                const dependency = d[6];

                if (duration) {
                    switch (this.durationUnit()) {
                        case "day":
                            duration *= 24 * 60 * 60 * 1000;
                            break;
                        case "hour":
                            duration *= 60 * 60 * 1000;
                            break;
                        case "minute":
                            duration *= 60 * 1000;
                            break;
                        case "second":
                            duration *= 1000;
                            break;
                        default:
                            break;
                    }
                }

                this._data_google.addRows([[id, label, resource, start, end, duration, completeness, dependency]]);
            }, this);
        } else {
            data = [
                ["", { role: "annotation" }],
                ["", ""]
            ];
        }
        return this._data_google;
    }

    backgroundColor: { (): string; (_: string): MaterialGantt };
    backgroundColor_exists: () => boolean;
    arrowAngle: { (): number; (_: number): MaterialGantt };
    arrowAngle_exists: () => boolean;
    arrowColor: { (): string; (_: string): MaterialGantt };
    arrowColor_exists: () => boolean;
    arrowLength: { (): number; (_: number): MaterialGantt };
    arrowLength_exists: () => boolean;
    arrowRadius: { (): number; (_: number): MaterialGantt };
    arrowRadius_exists: () => boolean;
    arrowSpaceAfter: { (): number; (_: number): MaterialGantt };
    arrowSpaceAfter_exists: () => boolean;
    arrowWidth: { (): number; (_: number): MaterialGantt };
    arrowWidth_exists: () => boolean;
    barCornerRadius: { (): number; (_: number): MaterialGantt };
    barCornerRadius_exists: () => boolean;
    barHeight: { (): number; (_: number): MaterialGantt };
    barHeight_exists: () => boolean;
    criticalPathEnabled: { (): boolean; (_: boolean): MaterialGantt };
    criticalPathEnabled_exists: () => boolean;
    criticalPathColor: { (): string; (_: string): MaterialGantt };
    criticalPathColor_exists: () => boolean;
    criticalPathStrokeWidth: { (): number; (_: number): MaterialGantt };
    criticalPathStrokeWidth_exists: () => boolean;
    datePattern: { (): string; (_: string): MaterialGantt };
    datePattern_exists: () => boolean;
    defaultStartDate: { (): number; (_: number): MaterialGantt };
    defaultStartDate_exists: () => boolean;
    durationUnit: { (): string; (_: string): MaterialGantt };
    durationUnit_exists: () => boolean;
    innerGridLineColor: { (): string; (_: string): MaterialGantt };
    innerGridLineColor_exists: () => boolean;
    innerGridLineWidth: { (): number; (_: number): MaterialGantt };
    innerGridLineWidth_exists: () => boolean;
    trackColor: { (): string; (_: string): MaterialGantt };
    trackColor_exists: () => boolean;
    trackZebraColor: { (): string; (_: string): MaterialGantt };
    trackZebraColor_exists: () => boolean;
    labelMaxWidth: { (): number; (_: number): MaterialGantt };
    labelMaxWidth_exists: () => boolean;
    percentEnabled: { (): boolean; (_: boolean): MaterialGantt };
    percentEnabled_exists: () => boolean;
    percentFillColor: { (): string; (_: string): MaterialGantt };
    percentFillColor_exists: () => boolean;
    shadowEnabled: { (): boolean; (_: boolean): MaterialGantt };
    shadowEnabled_exists: () => boolean;
    shadowColor: { (): string; (_: string): MaterialGantt };
    shadowColor_exists: () => boolean;
    shadowOffset: { (): number; (_: number): MaterialGantt };
    shadowOffset_exists: () => boolean;
    trackHeight: { (): number; (_: number): MaterialGantt };
    trackHeight_exists: () => boolean;
    xAxisHeight: { (): number; (_: number): MaterialGantt };
    xAxisHeight_exists: () => boolean;
    labelFontSize: { (): number; (_: number): MaterialGantt };
    labelFontSize_exists: () => boolean;
    labelFontFamily: { (): string; (_: string): MaterialGantt };
    labelFontFamily_exists: () => boolean;
}
MaterialGantt.prototype._class += " google_MaterialGantt";

MaterialGantt.prototype.publish("backgroundColor", "#ffffff", "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00'.", null, { tags: ["Basic"] });

MaterialGantt.prototype.publish("arrowAngle", 45, "number", "Angle of the head of the arrows connecting tasks.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("arrowColor", "#000000", "html-color", "Color of the path arrow.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("arrowLength", 8, "number", "Length of the head of the path arrow.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("arrowRadius", 15, "number", "The radius for defining the curve of the arrow between two tasks.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("arrowSpaceAfter", 4, "number", "The amount of whitespace between the head of an arrow and the task to which it points.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("arrowWidth", 1.4, "number", "The width of the arrows.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("barCornerRadius", null, "number", "The radius for defining the curve of a bar's corners.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("barHeight", null, "number", "The height of the bars for tasks.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("criticalPathEnabled", true, "boolean", "If true any arrows on the critical path will be styled differently.", null, { tags: ["Basic"] });

MaterialGantt.prototype.publish("criticalPathColor", "#ff0000", "html-color", "The color of any critical path arrows.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("criticalPathStrokeWidth", 2.0, "number", "The color of any critical path arrows.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("datePattern", "%Y-%m-%d", "string", "Format for the date columns", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("defaultStartDate", null, "number", "If the start date cannot be computed from the values in the DataTable, the start date will be set to this. Accepts a date value (new Date(YYYY, M, D)) or a number, which is the number of milliseconds to use.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("durationUnit", "day", "set", "Units of the duration, day, hour, minute, second, millisecons", ["day", "hour", "minute", "second", "millisecond"], { tags: ["Basic"] });
MaterialGantt.prototype.publish("innerGridLineColor", null, "html-color", "The color of the inner horizontal grid lines.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("innerGridLineWidth", null, "number", "The width of the inner horizontal grid lines.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("trackColor", null, "html-color", "The fill color of the inner grid track.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("trackZebraColor", "", "html-color", "The fill color of the alternate, dark inner grid track.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("labelMaxWidth", 300, "number", "The maximum amount of space allowed for each task label.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("percentEnabled", true, "boolean", "Fills the task bar based on the percentage completed for the task.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("percentFillColor", null, "html-color", "The color of the percentage completed portion of a task bar.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("shadowEnabled", true, "boolean", "If set to true, draws a shadow under each task bar which has dependencies.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("shadowColor", "#000000", "html-color", "Defines the color of the shadows under any task bar which has dependencies.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("shadowOffset", 1, "number", "Defines the offset, in pixels, of the shadows under any task bar which has dependencies.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("trackHeight", null, "number", "The height of the tracks.", null, { tags: ["Basic"] });
MaterialGantt.prototype.publish("xAxisHeight", 50, "number", "Height of the text area for the x-axis", null, { tags: ["Basic"] });

MaterialGantt.prototype.publish("labelFontSize", null, "number", "Label Font Size", null, { tags: ["Basic", "Shared"] });
MaterialGantt.prototype.publish("labelFontFamily", null, "string", " Label Font Name", null, { tags: ["Basic", "Shared"] });
