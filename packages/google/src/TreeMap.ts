import { CommonND } from "./CommonND";
import { arrayToDataTable } from "./Loader";

export class TreeMap extends CommonND {
    _chartPackage = "treemap";
    _chartType = "TreeMap";
    _data_google = [];

    constructor() {
        super();

        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._selection = {};
    }
    getChartOptions() {
        const retVal: any = {};

        retVal.headerColor = this.headerColor();
        retVal.headerHeight = this.headerHeight();
        retVal.headerHighlightColor = this.headerHighlightColor();
        retVal.hintOpacity = this.hintOpacity();
        retVal.maxColor = this.maxColor();
        retVal.maxDepth = this.maxDepth();
        retVal.maxHighlightColor = this.maxHighlightColor();
        retVal.maxPostDepth = this.maxPostDepth();
        retVal.maxColorValue = this.maxColorValue();
        retVal.midColor = this.midColor();
        retVal.midHighlightColor = this.midHighlightColor();
        retVal.minColor = this.minColor();
        retVal.minHighlightColor = this.minHighlightColor();
        retVal.minColorValue = this.minColorValue();
        retVal.noColor = this.noColor();
        retVal.noHighlightColor = this.noHighlightColor();
        retVal.showScale = this.showScale();
        retVal.showTooltips = this.showTooltips();
        retVal.useWeightedAverageForAggregation = this.useWeightedAverageForAggregation();
        retVal.width = this.width();
        retVal.height = this.height();

        const context = this;
        retVal.generateTooltip = function (a, b, c) {
            return TreeMap.prototype.defaultlTooltip.apply(context, arguments);
        };

        return retVal;
    }

    formatData() {
        const arr = [this.columns()].concat(this.data());
        this._data_google = arrayToDataTable(arr);
        return this._data_google;
    }

    defaultlTooltip(row, size, value) {
        const data: any = this._data_google;

        return "<div style='background:#ddd; padding:10px; border-style:solid' >" +
            "Label: " + data.getValue(row, 0) + "<br>" +
            "Parent: " + data.getValue(row, 1) + "<br>" +
            "Column 3 Label: " + data.getColumnLabel(2) + ", Value: " + data.getValue(row, 2) + "<br>" +
            "Column 4 Label: " + data.getColumnLabel(3) + ", Value: " + data.getValue(row, 3) + "<br>" +
            "Datatable row #: " + row + "<br>" +
            data.getColumnLabel(2) + " (total value of this cell and its children): " + size + "<br>" +
            data.getColumnLabel(3) + ": " + value + " </div>";
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    headerColor: { (): string; (_: string): TreeMap };
    headerColor_exists: () => boolean;
    headerHeight: { (): number; (_: number): TreeMap };
    headerHeight_exists: () => boolean;
    headerHighlightColor: { (): string; (_: string): TreeMap };
    headerHighlightColor_exists: () => boolean;
    hintOpacity: { (): number; (_: number): TreeMap };
    hintOpacity_exists: () => boolean;
    maxColor: { (): string; (_: string): TreeMap };
    maxColor_exists: () => boolean;
    maxDepth: { (): number; (_: number): TreeMap };
    maxDepth_exists: () => boolean;
    maxHighlightColor: { (): string; (_: string): TreeMap };
    maxHighlightColor_exists: () => boolean;
    maxPostDepth: { (): number; (_: number): TreeMap };
    maxPostDepth_exists: () => boolean;
    maxColorValue: { (): number; (_: number): TreeMap };
    maxColorValue_exists: () => boolean;
    midColor: { (): string; (_: string): TreeMap };
    midColor_exists: () => boolean;
    midHighlightColor: { (): string; (_: string): TreeMap };
    midHighlightColor_exists: () => boolean;
    minColor: { (): string; (_: string): TreeMap };
    minColor_exists: () => boolean;
    minHighlightColor: { (): string; (_: string): TreeMap };
    minHighlightColor_exists: () => boolean;
    minColorValue: { (): number; (_: number): TreeMap };
    minColorValue_exists: () => boolean;
    noColor: { (): string; (_: string): TreeMap };
    noColor_exists: () => boolean;
    noHighlightColor: { (): string; (_: string): TreeMap };
    noHighlightColor_exists: () => boolean;
    showScale: { (): boolean; (_: boolean): TreeMap };
    showScale_exists: () => boolean;
    showTooltips: { (): boolean; (_: boolean): TreeMap };
    showTooltips_exists: () => boolean;
    useWeightedAverageForAggregation: { (): boolean; (_: boolean): TreeMap };
    useWeightedAverageForAggregation_exists: () => boolean;
}
TreeMap.prototype._class += " google_TreeMap";

TreeMap.prototype.publish("headerColor", null, "html-color", "The color of the header section for each node. Specify an HTML color value.", null, { tags: ["Basic"] });
TreeMap.prototype.publish("headerHeight", 0, "number", "The height of the header section for each node, in pixels (can be zero).", null, { tags: ["Basic"] });
TreeMap.prototype.publish("headerHighlightColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00', or an object with the following properties.", null, { tags: ["Basic"] });

TreeMap.prototype.publish("hintOpacity", 0.0, "number", "When maxPostDepth is greater than 1, causing nodes below the current depth to be shown, hintOpacity specifies how transparent it should be. It should be between 0 and 1; the higher the value, the fainter the node.", null, { tags: ["Intermediate"] });

TreeMap.prototype.publish("maxColor", null, "html-color", "The color for a rectangle with a column 3 value of maxColorValue. Specify an HTML color value.", null, { tags: ["Basic"] });
TreeMap.prototype.publish("maxDepth", 1, "number", "The maximum number of node levels to show in the current view. Levels will be flattened into the current plane. If your tree has more levels than this, you will have to go up or down to see them. You can additionally see maxPostDepth levels below this as shaded rectangles within these nodes.", null, { tags: ["Intermediate"] });
TreeMap.prototype.publish("maxHighlightColor", null, "html-color", "The highlight color to use for the node with the largest value in column 3. Specify an HTML color value or null; If null, this value will be the value of maxColor lightened by 35%", null, { tags: ["Basic"] });
TreeMap.prototype.publish("maxPostDepth", 0, "number", "How many levels of nodes beyond maxDepth to show in  fashion. Hinted nodes are shown as shaded rectangles within a node that is within the maxDepth limit.", null, { tags: ["Advanced"] });
TreeMap.prototype.publish("maxColorValue", null, "number", "The maximum value allowed in column 3. All values greater than this will be trimmed to this value. If set to null, it will be set to the max value in the column.", null, { tags: ["Intermediate"] });

TreeMap.prototype.publish("midColor", null, "html-color", "The color for a rectangle with a column 3 value midway between maxColorValue and minColorValue. Specify an HTML color value.", null, { tags: ["Basic"] });
TreeMap.prototype.publish("midHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value near the median of minColorValue and maxColorValue. Specify an HTML color value or null; if null, this value will be the value of midColor lightened by 35%.", null, { tags: ["Basic"] });

TreeMap.prototype.publish("minColor", null, "html-color", "The color for a rectangle with the column 3 value of minColorValue. Specify an HTML color value.", null, { tags: ["Basic"] });
TreeMap.prototype.publish("minHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value nearest to minColorValue. Specify an HTML color value or null; if null, this value will be the value of minColor lightened by 35%", null, { tags: ["Basic"] });
TreeMap.prototype.publish("minColorValue", null, "number", "The minimum value allowed in column 3. All values less than this will be trimmed to this value. If set to null, it will be calculated as the minimum value in the column.", { tags: ["Basic"] });

TreeMap.prototype.publish("noColor", null, "html-color", "The color to use for a rectangle when a node has no value for column 3, and that node is a leaf (or contains only leaves). Specify an HTML color value.", { tags: ["Basic"] });
TreeMap.prototype.publish("noHighlightColor", null, "html-color", "The color to use for a rectangle of  color when highlighted. Specify an HTML color value or null; if null, this will be the value of noColor lightened by 35%.", null, { tags: ["Basic"] });

TreeMap.prototype.publish("showScale", true, "boolean", "Whether or not to show a color gradient scale from minColor to maxColor along the top of the chart. Specify true to show the scale.", null, { tags: ["Intermediate"] });

TreeMap.prototype.publish("showTooltips", true, "boolean", "Whether or not to show tooltips.", null, { tags: ["Basic"] });

TreeMap.prototype.publish("useWeightedAverageForAggregation", true, "boolean", "Whether to use weighted averages for aggregation.", null, { tags: ["Basic"] });
