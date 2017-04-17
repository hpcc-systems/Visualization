/**
* @file Google TreeMap Chart
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[treemap]"], factory);
    } else {
        root.TreeMap = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    /**
     * @class google_TreeMap
     * @extends common_HTMLWidget
     */
    function TreeMap() {
        HTMLWidget.call(this);
        /**
         * Specifies the widget type of the google Widget/HPCC Widget.
         * @member {string} _chartType
         * @memberof google_TreeMap
         * @private
         */
        this._chartType = "TreeMapChart";
        /**
         * Google Chart DataTable Object
         * @member {string} _data_google
         * @memberof google_TreeMap
         * @private
         */
        this._data_google = [];
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof google_TreeMap
         * @private
         */
        this._tag = "div";

        this.columns([]);
        this.data([]);

        /**
         * Google Treemap chart object.
         * @member {Object} treemapChart
         * @memberof google_TreeMap
         * @private
         */
        this.treemapChart = null;

    }
    TreeMap.prototype = Object.create(HTMLWidget.prototype);
    TreeMap.prototype.constructor = TreeMap;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof google_TreeMap
     * @private
     */
    TreeMap.prototype._class += " google_TreeMap";

    TreeMap.prototype.publish("headerColor", null, "html-color", "The color of the header section for each node. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("headerHeight", 0, "number", "The height of the header section for each node, in pixels (can be zero).",null,{tags:["Basic"]});
    TreeMap.prototype.publish("headerHighlightColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00', or an object with the following properties.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("hintOpacity", 0.0, "number", "When maxPostDepth is greater than 1, causing nodes below the current depth to be shown, hintOpacity specifies how transparent it should be. It should be between 0 and 1; the higher the value, the fainter the node.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("maxColor", null, "html-color", "The color for a rectangle with a column 3 value of maxColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("maxDepth", 1, "number", "The maximum number of node levels to show in the current view. Levels will be flattened into the current plane. If your tree has more levels than this, you will have to go up or down to see them. You can additionally see maxPostDepth levels below this as shaded rectangles within these nodes.",null,{tags:["Intermediate"]});
    TreeMap.prototype.publish("maxHighlightColor", null, "html-color", "The highlight color to use for the node with the largest value in column 3. Specify an HTML color value or null; If null, this value will be the value of maxColor lightened by 35%",null,{tags:["Basic"]});
    TreeMap.prototype.publish("maxPostDepth", 0, "number", "How many levels of nodes beyond maxDepth to show in  fashion. Hinted nodes are shown as shaded rectangles within a node that is within the maxDepth limit.",null,{tags:["Advanced"]});
    TreeMap.prototype.publish("maxColorValue", null, "number", "The maximum value allowed in column 3. All values greater than this will be trimmed to this value. If set to null, it will be set to the max value in the column.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("midColor", null, "html-color", "The color for a rectangle with a column 3 value midway between maxColorValue and minColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("midHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value near the median of minColorValue and maxColorValue. Specify an HTML color value or null; if null, this value will be the value of midColor lightened by 35%.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("minColor", null, "html-color", "The color for a rectangle with the column 3 value of minColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("minHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value nearest to minColorValue. Specify an HTML color value or null; if null, this value will be the value of minColor lightened by 35%",null,{tags:["Basic"]});
    TreeMap.prototype.publish("minColorValue", null, "number", "The minimum value allowed in column 3. All values less than this will be trimmed to this value. If set to null, it will be calculated as the minimum value in the column.",{tags:["Basic"]});

    TreeMap.prototype.publish("noColor", null, "html-color", "The color to use for a rectangle when a node has no value for column 3, and that node is a leaf (or contains only leaves). Specify an HTML color value.",{tags:["Basic"]});
    TreeMap.prototype.publish("noHighlightColor", null, "html-color", "The color to use for a rectangle of  color when highlighted. Specify an HTML color value or null; if null, this will be the value of noColor lightened by 35%.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("showScale", true, "boolean", "Whether or not to show a color gradient scale from minColor to maxColor along the top of the chart. Specify true to show the scale.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("showTooltips", true, "boolean", "Whether or not to show tooltips.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("useWeightedAverageForAggregation", true, "boolean", "Whether to use weighted averages for aggregation.",null,{tags:["Basic"]});

    /**
     * Builds and returns a google configuration object based on publish param values.
     * @method getChartOptions
     * @memberof google_TreeMap
     * @instance
     * @private
     * @returns {Object}
     */
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
        retVal.generateTooltip = function(a,b,c) {
            return TreeMap.prototype.defaultlTooltip.apply(context, arguments);
        };

        return retVal;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof google_TreeMap
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    TreeMap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        this.treemapChart = new google.visualization.TreeMap(element.node());
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof google_TreeMap
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    TreeMap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this.treemapChart.draw(this._data_google, this.getChartOptions());
    };

    /**
     * Sets data to be render within widget. (Overrides and calls back to HTMLWidget.data()). Also creates and populates this._data_google Google chart data table.
     * @method data
     * @memberof google_TreeMap
     * @instance
     * @param {Mixed} _ The data being rendered.
     * @returns {Widget}
     * @example widget
     * .columns([["Location", "Parent", "Market trade volume (size)", "Market increase/decrease (color)"]])
     * .data( ["Global", null, 0, 0], ["America","Global", 0, 0] )
     * .render();
     */
    TreeMap.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var arr = this._columns.concat(this._data);
            this._data_google = new google.visualization.arrayToDataTable(arr);
        }
        return retVal;
    };

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof google_TreeMap
     * @instance
     * @returns {Widget}
     */
    TreeMap.prototype.testData = function () {
            this.columns([["Location", "Parent", "Market trade volume (size)", "Market increase/decrease (color)"]]);
            this.data(
            [
              ["Global",    null,                 0,                               0],
              ["America",   "Global",             0,                               0],
              ["Europe",    "Global",             0,                               0],
              ["Asia",      "Global",             0,                               0],
              ["Australia", "Global",             0,                               0],
              ["Africa",    "Global",             0,                               0],
              ["Brazil",    "America",            11,                              10],
              ["USA",       "America",            52,                              31],
              ["Mexico",    "America",            24,                              12],
              ["Canada",    "America",            16,                              -23],
              ["France",    "Europe",             42,                              -11],
              ["Germany",   "Europe",             31,                              -2],
              ["Sweden",    "Europe",             22,                              -13],
              ["Italy",     "Europe",             17,                              4],
              ["UK",        "Europe",             21,                              -5],
              ["China",     "Asia",               36,                              4],
              ["Japan",     "Asia",               20,                              -12],
              ["India",     "Asia",               40,                              63],
              ["Laos",      "Asia",               4,                               34],
              ["Mongolia",  "Asia",               1,                               -5],
              ["Israel",    "Asia",               12,                              24],
              ["Iran",      "Asia",               18,                              13],
              ["Pakistan",  "Asia",               11,                              -52],
              ["Egypt",     "Africa",             21,                              0],
              ["S. Africa", "Africa",             30,                              43],
              ["Sudan",     "Africa",             12,                              2],
              ["Congo",     "Africa",             10,                              12],
              ["Zaire",     "Africa",             8,                               10]
            ]);

        return this;
    };

    //TODO
    /**
     * Creates the default tooltip HTML for mouse over.
     * @method defaultlTooltip
     * @memberof google_TreeMap
     * @instance
     * @param {Number} row
     * @param {Number} size
     * @param {Number} value
     * @returns {Widget}
     */
    TreeMap.prototype.defaultlTooltip = function(row, size, value) {
        var data =  this._data_google;

        return "<div style='background:#ddd; padding:10px; border-style:solid' >" +
            "Label: " + data.getValue(row, 0) + "<br>" +
            "Parent: " + data.getValue(row, 1) + "<br>" +
            "Column 3 Label: " + data.getColumnLabel(2) + ", Value: " + data.getValue(row, 2) + "<br>" +
            "Column 4 Label: " + data.getColumnLabel(3) + ", Value: " + data.getValue(row, 3) + "<br>" +
            "Datatable row #: " + row + "<br>" +
            data.getColumnLabel(2) +" (total value of this cell and its children): " + size + "<br>" +
            data.getColumnLabel(3) + ": " + value + " </div>";
    };

    return TreeMap;
}));
