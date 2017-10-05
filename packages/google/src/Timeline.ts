import { timeParse as d3TimeParse } from "d3-time-format";
import { CommonND } from "./CommonND";
import { createDataTable } from "./Loader";

export class Timeline extends CommonND {
    _chartPackage = "timeline";
    _chartType = "Timeline";

    _data_google;
    _selection;

    constructor() {
        super();

        this._data_google = [];
        this._selection = {};
    }

    getChartOptions() {
        const retVal: any = {};

        retVal.avoidOverlappingGridLines = this.avoidOverlappingGridLines();
        retVal.backgroundColor = this.backgroundColor();
        retVal.timelineColorByRowLabel = this.timelineColorByRowLabel();
        retVal.timelineGroupByRowLabel = this.timelineGroupByRowLabel();
        retVal.timelineShowBarLabels = this.timelineShowBarLabels();
        retVal.timelineShowRowLabels = this.timelineShowRowLabels();
        retVal.timelineSingleColor = this.timelineSingleColor();
        retVal.tooltipIsHtml = this.tooltipIsHtml();
        retVal.tooltipTrigger = this.tooltipTrigger();
        retVal.width = this.width();
        retVal.height = this.height();
        retVal.timePattern = this.timePattern();

        return retVal;
    }

    formatData() {
        if (this.data().length) {
            this._data_google = createDataTable();

            this._data_google.addColumn({ type: "string", id: "Label A" });
            this._data_google.addColumn({ type: "string", id: "Label B" });
            this._data_google.addColumn({ type: "date", id: "start" });
            this._data_google.addColumn({ type: "date", id: "end" });

            let start;
            let end;
            const parseDate = d3TimeParse(this.timePattern());

            this.data().forEach(function (d) {
                start = parseDate(d[2]);
                end = parseDate(d[3]);
                this._data_google.addRows([[d[0], d[1], start, end]]);
            }, this);
        }
        return this._data_google;
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    tooltipIsHtml: { (): boolean; (_: boolean): Timeline };
    tooltipIsHtml_exists: () => boolean;
    tooltipTrigger: { (): string; (_: string): Timeline };
    tooltipTrigger_exists: () => boolean;
    backgroundColor: { (): string; (_: string): Timeline };
    backgroundColor_exists: () => boolean;
    avoidOverlappingGridLines: { (): boolean; (_: boolean): Timeline };
    avoidOverlappingGridLines_exists: () => boolean;
    timelineColorByRowLabel: { (): boolean; (_: boolean): Timeline };
    timelineColorByRowLabel_exists: () => boolean;
    timelineGroupByRowLabel: { (): boolean; (_: boolean): Timeline };
    timelineGroupByRowLabel_exists: () => boolean;
    timelineShowBarLabels: { (): boolean; (_: boolean): Timeline };
    timelineShowBarLabels_exists: () => boolean;
    timelineShowRowLabels: { (): boolean; (_: boolean): Timeline };
    timelineShowRowLabels_exists: () => boolean;
    timelineSingleColor: { (): string; (_: string): Timeline };
    timelineSingleColor_exists: () => boolean;
    timePattern: { (): string; (_: string): Timeline };
    timePattern_exists: () => boolean;
}
Timeline.prototype._class += " google_Timeline";

Timeline.prototype.publish("tooltipIsHtml", true, "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips. See Customizing Tooltip Content for more details.", null, { tags: ["Advanced"] });
Timeline.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed: focus - The tooltip will be displayed when the user hovers over the element; none - The tooltip will not be displayed.", ["none", "focus"], { tags: ["Basic"] });
Timeline.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00'.", null, { tags: ["Basic"] });

Timeline.prototype.publish("avoidOverlappingGridLines", true, "boolean", "Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.", null, { tags: ["Basic"] });
Timeline.prototype.publish("timelineColorByRowLabel", false, "boolean", "If set to true, colors every bar on the row the same. The default is to use one color per bar label.", null, { tags: ["Basic"] });
Timeline.prototype.publish("timelineGroupByRowLabel", true, "boolean", "If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.", null, { tags: ["Basic"] });
Timeline.prototype.publish("timelineShowBarLabels", true, "boolean", "If set to false, omits bar labels. The default is to show them.", null, { tags: ["Basic"] });
Timeline.prototype.publish("timelineShowRowLabels", true, "boolean", "If set to false, omits row labels. The default is to show them.", null, { tags: ["Basic"] });
Timeline.prototype.publish("timelineSingleColor", null, "html-color", "Colors all bars the same. Specified as a hex value (e.g., '#8d8').", null, { tags: ["Basic"] });
Timeline.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time format of the data.", null, { tags: ["Basic"] });
