/**
 * @file HPCC VIZ MultiChart
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/INDChart", "require"], factory);
    } else {
        root.chart_MultiChart = factory(root.d3, root.common_SVGWidget, root.api_INDChart, root.require);
    }
}(this, function (d3, SVGWidget, INDChart, require) {
    var _1DChartTypes = [
        { id: "SUMMARY", display: "Summary", widgetClass: "chart_Summary" },
        { id: "C3_GAUGE", display: "Gauge (C3)", widgetClass: "c3chart_Gauge" }
    ];
    var _2DChartTypes = [
        { id: "BUBBLE", display: "Bubble", widgetClass: "chart_Bubble" },
        { id: "PIE", display: "Pie", widgetClass: "chart_Pie" },
        { id: "GOOGLE_PIE", display: "Pie (Google)", widgetClass: "google_Pie" },
        { id: "C3_DONUT", display: "Donut (C3)", widgetClass: "c3chart_Donut" },
        { id: "C3_PIE", display: "Pie (C3)", widgetClass: "c3chart_Pie" },
        { id: "AM_FUNNEL", display: "Area (amCharts)", widgetClass: "amchart_Funnel" },
        { id: "AM_PIE", display: "Pie (amCharts)", widgetClass: "amchart_Pie" },
        { id: "AM_PYRAMID", display: "Area (amCharts)", widgetClass: "amchart_Pyramid" },
        { id: "WORD_CLOUD", display: "Word Cloud", widgetClass: "other_WordCloud" }
    ];
    var _NDChartTypes = [
        { id: "COLUMN", display: "Column", widgetClass: "chart_Column" },
        { id: "LINE", display: "Line", widgetClass: "chart_Line" },
        { id: "AREA", display: "Area", widgetClass: "chart_Area" },
        { id: "STEP", display: "Step", widgetClass: "chart_Step" },
        { id: "GOOGLE_BAR", display: "Bar (Google)", widgetClass: "google_Bar" },
        { id: "GOOGLE_COLUMN", display: "Column (Google)", widgetClass: "google_Column" },
        { id: "GOOGLE_LINE", display: "Line (Google)", widgetClass: "google_Line" },
        { id: "C3_AREA", display: "Area (C3)", widgetClass: "c3chart_Area" },
        { id: "C3_BAR", display: "Bar (C3)", widgetClass: "c3chart_Bar" },
        { id: "C3_COLUMN", display: "Column (C3)", widgetClass: "c3chart_Column" },
        { id: "C3_LINE", display: "Line (C3)", widgetClass: "c3chart_Line" },
        { id: "C3_SCATTER", display: "Scatter (C3)", widgetClass: "c3chart_Scatter" },
        { id: "C3_STEP", display: "Step (C3)", widgetClass: "c3chart_Step" },
        { id: "AM_AREA", display: "Area (amCharts)", widgetClass: "amchart_Area" },
        { id: "AM_BAR", display: "Bar (amCharts)", widgetClass: "amchart_Bar" },
        { id: "AM_LINE", display: "Line (amCharts)", widgetClass: "amchart_Line" },
        //{ id: "AM_SCATTER", display: "Scatter (amCharts)", widgetClass: "amchart_Scatter" },
    ];
    var _anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" }
    ];
    var _allChartTypes = _1DChartTypes.concat(_2DChartTypes.concat(_NDChartTypes.concat(_anyChartTypes)));

    /**
     * @class chart_MultiChart
     * @extends common_SVGWidget
     * @implements api_INDChart
     */
    function MultiChart() {
        SVGWidget.call(this);
        INDChart.call(this);

        this.chart(null);

        this._1DChartTypes = _1DChartTypes;
        this._2DChartTypes = _2DChartTypes;
        this._NDChartTypes = _NDChartTypes;
        this._anyChartTypes = _anyChartTypes;
        this._allChartTypes = _allChartTypes;

        this._allCharts = {};
        this._allChartTypes.forEach(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.widget = null;
            this._allCharts[item.id] = newItem;
            this._allCharts[item.display] = newItem;
            this._allCharts[item.widgetClass] = newItem;
        }, this);
        //  Backward compatability until we roll our own BAR  ---
        this._allCharts["BAR"] = this._allCharts["COLUMN"];
    }
    MultiChart.prototype = Object.create(SVGWidget.prototype);
    MultiChart.prototype.constructor = MultiChart;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof chart_Line
     * @private
     */
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype.publish("chartType", "BUBBLE", "set", "Chart Type", _allChartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    MultiChart.prototype.publish("chart", null, "widget", "Chart",null,{tags:["Basic"]});

    /**
     * Sets the columns for the data being passed into the widget via .data() method.
     * @method columns
     * @memberof chart_MultiChart
     * @instance
     * @param {String[]} _ An array of strings representing the column names for data passed to widget.
     * @returns {Widget}
     * @example widget.columns(["ID", "Year 1", "Year 2"]).data([ [40, 66, 60], [30, 98, 92]  ]).render();
     */
    MultiChart.prototype.columns = function (_) {
        var retVal = SVGWidget.prototype.columns.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().columns(_);
        }
        return retVal;
    };

    /**
     * Sets data to be render for the widget inside the MultiChart container.
     * @method data
     * @memberof chart_MultiChart
     * @instance
     * @param {Mixed} _ The data being rendered.
     * @returns {Widget}
     * @example widget.columns(["ID", "Year 1", "Year 2"]).data([ [40, 66, 60], [30, 98, 92]  ]).render();
     */
    MultiChart.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().data(_);
        }
        return retVal;
    };

    MultiChart.prototype.hasOverlay = function () {
        return this.chart() && this.chart().hasOverlay();
    };

    /**
     * Gets/Sets visibility of widget inside MultiChart container.
     * @method visible
     * @memberof chart_MultiChart
     * @instance
     * @param {Boolean} _ True/False
     * @returns {Widget|Boolean}
     */
    MultiChart.prototype.visible = function (_) {
        if (!arguments.length) return this.chart() && this.chart().visible();
        if (this.chart()) {
            this.chart().visible(_);
        }
        return this;
    };

    /**
     * An optional callback function as parameter. The current widget object being operated on is passed to the function. The function is used to call widget render and/or post/pre render tasks.
     * @name MultiChart~requireContentCb
     * @function
     * @param {Widget} widget - The rendered widget.
     */

    /**
     * Loads widget into the MultiChart container.
     * @method visible
     * @memberof chart_MultiChart
     * @instance
     * @param {String} chartType Name of chart.
     * @param {MultiChart~requireContentCb} callback
     * @returns {Widget|Boolean}
     */
    MultiChart.prototype.requireContent = function (chartType, callback) {
        var retVal = this._allCharts[chartType].widget;
        if (retVal) {
            callback(retVal);
            return;
        }

        var context = this;
        var path = "src/" + this._allCharts[chartType].widgetClass.split("_").join("/");
        require([path], function (WidgetClass) {
            retVal = new WidgetClass();
            context._allCharts[chartType].widget = retVal;
            callback(retVal);
        });
    };

    /**
     * An optional callback function as parameter. The current widget object being operated on is passed to the function. The function will execute ater the widget has completed rendering.
     * @name MultiChart~switchChartCb
     * @function
     * @param {Widget} widget - The rendered widget.
     */

    /**
     * Switches
     * @method visible
     * @memberof chart_MultiChart
     * @instance
     * @param {Boolean} _ True/False
     * @param {MultiChart~switchChartCb} callback
     * @returns {Widget|Boolean}
     */
    MultiChart.prototype.switchChart = function (callback) {
        var oldContent = this.chart();
        var context = this;
        this.requireContent(this.chartType(), function (newContent) {
            if (newContent !== oldContent) {
                var size = context.size();
                newContent
                    .columns(context._columns)
                    .data(context._data)
                    .size(size)
                ;
                context.chart(newContent);
                newContent.click = function (row, column) {
                    context.click(row, column);
                };
                if (oldContent) {
                    oldContent
                        .data([])
                        .size({ width: 1, height: 1 })
                        .render()
                    ;
                }
            }
            if (callback) {
                callback(this);
            }
        });
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof chart_MultiChart
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    MultiChart.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".multiChart").data(this.chart() ? [this.chart()] : [], function (d) { return d._id; });
        content.enter().append("g")
            .attr("class", "multiChart")
            .each(function (d) {
                d.target(this);
            })
        ;

        var size = this.size();
        content
            .each(function (d) {
                d
                    .size(size)
                    .render()
                ;
            })
        ;

        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;
    };

    /**
     * The function that is executed after render. It is used for doing destroying/cleanup.
     * @method exit
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     * @returns {Widget}
     */
    MultiChart.prototype.exit = function (domNode, element) {
        if (this.chart()) {
            this.chart().target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    /**
     * An optional callback function as parameter. The current widget object being operated on is passed to the function. The function will execute ater the widget has completed rendering.
     * @name MultiChart~renderCb
     * @function
     * @param {Widget} widget - The rendered widget.
     */

    /**
     * Renders widget in MultiChart container immediately.
     * @method render
     * @memberof chart_MultiChhart
     * @instance
     * @param {MultiChart~RenderCb} [callback] - The callback function that is executed after widget render.
     * @returns {Widget}
     * @example <caption>Example usage of render.</caption>
     * var w = new Widget.target("divID").render(function(widget) { console.log(widget); });
     */
    MultiChart.prototype.render = function (callback) {
        if (this.chartType() && (!this.chart() || (this.chart().classID() !== this._allCharts[this.chartType()].widgetClass))) {
            var context = this;
            var args = arguments;
            this.switchChart(function () {
                SVGWidget.prototype.render.apply(context, args);
            });
            return this;
        }
        return SVGWidget.prototype.render.apply(this, arguments);
    };

    return MultiChart;
}));
