import { HTMLWidget } from "../common/HTMLWidget";
import "goog!visualization,1,packages:[treemap]";

export function TreeMap() {
    HTMLWidget.call(this);

    this._chartType = "TreeMapChart";
    this._data_google = [];
    this._tag = "div";

    this.columns([]);
    this.data([]);
    this._selection = {};
}
TreeMap.prototype = Object.create(HTMLWidget.prototype);
TreeMap.prototype.constructor = TreeMap;
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

TreeMap.prototype.getChartOptions = function () {
    var retVal = [];

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

    var context = this;
    retVal.generateTooltip = function (a, b, c) {
        return TreeMap.prototype.defaultlTooltip.apply(context, arguments);
    };

    return retVal;
};

TreeMap.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
    element.style("overflow", "hidden");
    this._chart = new google.visualization.TreeMap(element.node());

    var context = this;
    google.visualization.events.addListener(this._chart, "select", function () {
        var selectedItem = context._chart.getSelection()[0];
        context._selection = {
            data: context.rowToObj(context.data()[selectedItem.row]),
            column: context.columns()[selectedItem.column] || null
        };

        context.click(context._selection.data, context._selection.column, Object.keys(context._selection).length !== 0);
    });
};

TreeMap.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);
    this._chart.draw(this._data_google, this.getChartOptions());
};

TreeMap.prototype.data = function (_) {
    var retVal = HTMLWidget.prototype.data.apply(this, arguments);
    if (arguments.length) {
        var arr = [this.columns()].concat(this.data());
        this._data_google = new google.visualization.arrayToDataTable(arr);
    }
    return retVal;
};

TreeMap.prototype.defaultlTooltip = function (row, size, value) {
    var data = this._data_google;

    return "<div style='background:#ddd; padding:10px; border-style:solid' >" +
        "Label: " + data.getValue(row, 0) + "<br>" +
        "Parent: " + data.getValue(row, 1) + "<br>" +
        "Column 3 Label: " + data.getColumnLabel(2) + ", Value: " + data.getValue(row, 2) + "<br>" +
        "Column 4 Label: " + data.getColumnLabel(3) + ", Value: " + data.getValue(row, 3) + "<br>" +
        "Datatable row #: " + row + "<br>" +
        data.getColumnLabel(2) + " (total value of this cell and its children): " + size + "<br>" +
        data.getColumnLabel(3) + ": " + value + " </div>";
};

TreeMap.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
