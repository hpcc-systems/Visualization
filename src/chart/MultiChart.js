
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./INDChart", "require"], factory);
    } else {
        root.chart_MultiChart = factory(root.d3, root.common_SVGWidget, root.chart_INDChart, root.require);
    }
}(this, function (d3, SVGWidget, INDChart, require) {
    var _2dChartTypes = [
        { id: "BUBBLE", display: "Bubble", widgetClass: "chart_Bubble" },
        { id: "COLUMN", display: "Column", widgetClass: "chart_Column" },
        { id: "PIE", display: "Pie", widgetClass: "chart_Pie" },
        { id: "GOOGLE_PIE", display: "Pie (Google)", widgetClass: "google_Pie" },
        { id: "C3_PIE", display: "Pie (C3)", widgetClass: "c3chart_Pie" },
        { id: "C3_DONUT", display: "Donut (C3)", widgetClass: "c3chart_Donut" },
        { id: "WORD_CLOUD", display: "Word Cloud", widgetClass: "other_WordCloud" }
    ];
    var _multiChartTypes = [
        { id: "GOOGLE_BAR", display: "Bar (Google)", widgetClass: "google_Bar" },
        { id: "GOOGLE_COLUMN", display: "Column (Google)", widgetClass: "google_Column" },
        { id: "LINE", display: "Line", widgetClass: "chart_Line" },
        { id: "GOOGLE_LINE", display: "Line (Google)", widgetClass: "google_Line" },
        { id: "C3_LINE", display: "Line (C3)", widgetClass: "c3chart_Line" },
        { id: "C3_BAR", display: "Bar (C3)", widgetClass: "c3chart_Bar" },
        { id: "C3_COLUMN", display: "Column (C3)", widgetClass: "c3chart_Column" },
        { id: "C3_STEP", display: "Step (C3)", widgetClass: "c3chart_Step" },
        { id: "C3_AREA", display: "Area (C3)", widgetClass: "c3chart_Area" },
        { id: "C3_SCATTER", display: "Scatter (C3)", widgetClass: "c3chart_Scatter" }
    ];
    var _anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" }
    ];
    var _allChartTypes = _2dChartTypes.concat(_multiChartTypes.concat(_anyChartTypes));

    function MultiChart() {
        SVGWidget.call(this);
        INDChart.call(this);
        this._class = "chart_MultiChart";

        this._chart = null;

        this._2dChartTypes = _2dChartTypes;
        this._multiChartTypes = _multiChartTypes;
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
    };
    MultiChart.prototype = Object.create(SVGWidget.prototype);
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype.publish("chart_type", "BUBBLE", "set", "Chart Type", _allChartTypes.map(function (item) { return item.id; }));
    MultiChart.prototype.publish("chart", null, "widget", "Chart");

    MultiChart.prototype.columns = function (_) {
        var retVal = SVGWidget.prototype.columns.apply(this, arguments);
        if (arguments.length && this._chart) {
            this._chart.columns(_);
        }
        return retVal;
    };

    MultiChart.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length && this._chart) {
            this._chart.data(_);
        }
        return retVal;
    };

    MultiChart.prototype.hasOverlay = function () {
        return this._chart && this._chart.hasOverlay();
    };

    MultiChart.prototype.visible = function (_) {
        if (!arguments.length) return this._chart.visible();
        if (this._chart) {
            this._chart.visible(_);
        }
        return this;
    };

    MultiChart.prototype.requireContent = function (chartType, callback) {
        var retVal = this._allCharts[chartType].widget;
        if (retVal) {
            callback(retVal);
            return;
        }

        var context = this;
        var path = "../" + this._allCharts[chartType].widgetClass.split("_").join("/");
        require([path], function (widgetClass) {
            retVal = new widgetClass();
            context._allCharts[chartType].widget = retVal;
            callback(retVal);
        });
    };

    MultiChart.prototype.switchChart = function (callback) {
        var oldContent = this._chart;
        var context = this;
        this.requireContent(this._chart_type, function (newContent) {
            if (newContent !== oldContent) {
                var size = context.size();
                context._chart = newContent
                    .columns(context._columns)
                    .data(context._data)
                    .size(size)
                ;
                newContent.click = function (row, column) {
                    context.click(row, column);
                }
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

    MultiChart.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".multiChart").data(this._chart ? [this._chart] : [], function (d) { return d._id; });
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

    MultiChart.prototype.exit = function (domNode, element) {
        if (this._chart) {
            this._chart.target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };


    MultiChart.prototype.render = function (callback) {
        if (this._chart_type && (!this._chart || (this._chart._class !== this._allCharts[this._chart_type].widgetClass))) {
            var context = this;
            var args = arguments;
            this.switchChart(function () {
                SVGWidget.prototype.render.apply(context, args);
            });
            return this;
        }
        return SVGWidget.prototype.render.apply(this, arguments);
    }

    return MultiChart;
}));
