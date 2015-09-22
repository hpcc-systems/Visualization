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
        { id: "SCATTER", display: "Scatter", widgetClass: "chart_Scatter" },
        { id: "GOOGLE_BAR", display: "Bar (Google)", widgetClass: "google_Bar" },
        { id: "GOOGLE_COLUMN", display: "Column (Google)", widgetClass: "google_Column" },
        { id: "GOOGLE_LINE", display: "Line (Google)", widgetClass: "google_Line" },
        { id: "GOOGLE_SCATTER", display: "Scatter (Google)", widgetClass: "google_Scatter" },
        { id: "C3_AREA", display: "Area (C3)", widgetClass: "c3chart_Area" },
        { id: "C3_BAR", display: "Bar (C3)", widgetClass: "c3chart_Bar" },
        { id: "C3_COLUMN", display: "Column (C3)", widgetClass: "c3chart_Column" },
        { id: "C3_LINE", display: "Line (C3)", widgetClass: "c3chart_Line" },
        { id: "C3_SCATTER", display: "Scatter (C3)", widgetClass: "c3chart_Scatter" },
        { id: "C3_STEP", display: "Step (C3)", widgetClass: "c3chart_Step" },
        { id: "AM_AREA", display: "Area (amCharts)", widgetClass: "amchart_Area" },
        { id: "AM_BAR", display: "Bar (amCharts)", widgetClass: "amchart_Bar" },
        { id: "AM_LINE", display: "Line (amCharts)", widgetClass: "amchart_Line" },
        { id: "AM_SCATTER", display: "Scatter (amCharts)", widgetClass: "amchart_Scatter" },
    ];
    var _anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" }
    ];
    var _allChartTypes = _1DChartTypes.concat(_2DChartTypes.concat(_NDChartTypes.concat(_anyChartTypes)));

    function MultiChart() {
        SVGWidget.call(this);
        INDChart.call(this);

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
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype.publish("chartType", "BUBBLE", "set", "Chart Type", _allChartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    MultiChart.prototype.publish("chart", null, "widget", "Chart",null,{tags:["Basic"]});

    MultiChart.prototype.columns = function (_) {
        var retVal = SVGWidget.prototype.columns.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().columns(_);
        }
        return retVal;
    };

    MultiChart.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().data(_);
        }
        return retVal;
    };

    MultiChart.prototype._origChart = MultiChart.prototype.chart;
    MultiChart.prototype.chart = function (_) {
        var retVal = MultiChart.prototype._origChart.apply(this, arguments);
        if (arguments.length) {
            var context = this;
            _.click = function (row, column, selected) {
                context.click(row, column, selected);
            };
        }
        return retVal;
    };

    MultiChart.prototype.hasOverlay = function () {
        return this.chart() && this.chart().hasOverlay();
    };

    MultiChart.prototype.visible = function (_) {
        if (!arguments.length) return this.chart() && this.chart().visible();
        if (this.chart()) {
            this.chart().visible(_);
        }
        return this;
    };

    MultiChart.prototype.chartTypeProperties = function (_) {
        if (!arguments.length) return this._chartTypeProperties;
        this._chartTypeProperties = _;
        return this;
    };

    MultiChart.prototype.requireContent = function (chartType, callback) {
        var path = "src/" + this._allCharts[chartType].widgetClass.split("_").join("/");
        require([path], function (WidgetClass) {
            callback(new WidgetClass());
        });
    };

    MultiChart.prototype.switchChart = function (callback) {
        if (this._switchingTo === this.chartType()) {
            if (callback) {
                callback(this);
            }
            return;
        } else if (this._switchingTo) {
            console.log("Attempting switch to:  " + this.chartType() + ", before previous switch is complete (" + this._switchingTo + ")");
        }
        this._switchingTo = this.chartType();
        var oldContent = this.chart();
        var context = this;
        this.requireContent(this.chartType(), function (newContent) {
            if (newContent !== oldContent) {
                var size = context.size();
                newContent
                    .columns(context.columns())
                    .data(context.data())
                    .size(size)
                ;
                if (context._chartTypeProperties) {
                    for (var key in context._chartTypeProperties) {
                        if (newContent[key]) {
                            try {
                                newContent[key](context._chartTypeProperties[key]);
                            } catch (e) {
                                console.log("Exception Setting Property:  " + key);
                            }
                        } else {
                            console.log("Unknown Property:  " + key);
                        }
                    }
                    delete context._chartTypeProperties;
                }
                context.chart(newContent);
                if (oldContent) {
                    oldContent
                        .data([])
                        .size({ width: 1, height: 1 })
                        .render()
                    ;
                }
            }
            delete context._switchingTo;
            if (callback) {
                callback(this);
            }
        });
    };

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

    MultiChart.prototype.exit = function (domNode, element) {
        if (this.chart()) {
            this.chart().target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };


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
