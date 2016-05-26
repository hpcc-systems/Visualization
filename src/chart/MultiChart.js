"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/Utility", "../api/INDChart"], factory);
    } else {
        root.chart_MultiChart = factory(root.d3, root.common_HTMLWidget, root.common_Utility, root.api_INDChart);
    }
}(this, function (d3, HTMLWidget, Utility, INDChart) {
    function MultiChart() {
        HTMLWidget.call(this);
        INDChart.call(this);

        this._tag = "div";

        this._allCharts = {};
        this._allChartTypes.forEach(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.widget = null;
            this._allCharts[item.id] = newItem;
            this._allCharts[item.display] = newItem;
            this._allCharts[item.widgetClass] = newItem;
        }, this);
        this._chartTypeDefaults = {};
    }
    MultiChart.prototype = Object.create(HTMLWidget.prototype);
    MultiChart.prototype.constructor = MultiChart;
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype._1DChartTypes = [
        { id: "SUMMARY", display: "Summary", widgetClass: "chart_Summary" },
        { id: "C3_GAUGE", display: "Gauge (C3)", widgetClass: "c3chart_Gauge" }
    ].map(function(item) { item.family = "1D"; return item;});
    MultiChart.prototype._2DChartTypes = [
        { id: "BUBBLE", display: "Bubble", widgetClass: "chart_Bubble" },
        { id: "PIE", display: "Pie", widgetClass: "chart_Pie" },
        { id: "GOOGLE_PIE", display: "Pie (Google)", widgetClass: "google_Pie" },
        { id: "C3_DONUT", display: "Donut (C3)", widgetClass: "c3chart_Donut" },
        { id: "C3_PIE", display: "Pie (C3)", widgetClass: "c3chart_Pie" },
        { id: "AM_FUNNEL", display: "Area (amCharts)", widgetClass: "amchart_Funnel" },
        { id: "AM_PIE", display: "Pie (amCharts)", widgetClass: "amchart_Pie" },
        { id: "AM_PYRAMID", display: "Area (amCharts)", widgetClass: "amchart_Pyramid" },
        { id: "WORD_CLOUD", display: "Word Cloud", widgetClass: "other_WordCloud" }
    ].map(function(item) { item.family = "2D"; return item;});
    MultiChart.prototype._NDChartTypes = [
        { id: "COLUMN", display: "Column", widgetClass: "chart_Column" },
        { id: "BAR", display: "Bar", widgetClass: "chart_Bar" },
        { id: "LINE", display: "Line", widgetClass: "chart_Line" },
        { id: "AREA", display: "Area", widgetClass: "chart_Area" },
        { id: "STEP", display: "Step", widgetClass: "chart_Step" },
        { id: "SCATTER", display: "Scatter", widgetClass: "chart_Scatter" },
        { id: "GOOGLE_BAR", display: "Bar (Google)", widgetClass: "google_Bar" },
        { id: "GOOGLE_COLUMN", display: "Column (Google)", widgetClass: "google_Column" },
        { id: "GOOGLE_LINE", display: "Line (Google)", widgetClass: "google_Line" },
        { id: "GOOGLE_SCATTER", display: "Scatter (Google)", widgetClass: "google_Scatter" },
        { id: "GOOGLE_COMBO", display: "Combo (Google)", widgetClass: "google_Combo" },
        { id: "C3_AREA", display: "Area (C3)", widgetClass: "c3chart_Area" },
        { id: "C3_BAR", display: "Bar (C3)", widgetClass: "c3chart_Bar" },
        { id: "C3_COLUMN", display: "Column (C3)", widgetClass: "c3chart_Column" },
        { id: "C3_LINE", display: "Line (C3)", widgetClass: "c3chart_Line" },
        { id: "C3_SCATTER", display: "Scatter (C3)", widgetClass: "c3chart_Scatter" },
        { id: "C3_STEP", display: "Step (C3)", widgetClass: "c3chart_Step" },
        { id: "C3_COMBO", display: "Combo (C3)", widgetClass: "c3chart_Combo" },
        { id: "AM_AREA", display: "Area (amCharts)", widgetClass: "amchart_Area" },
        { id: "AM_BAR", display: "Bar (amCharts)", widgetClass: "amchart_Bar" },
        { id: "AM_LINE", display: "Line (amCharts)", widgetClass: "amchart_Line" },
        { id: "AM_SCATTER", display: "Scatter (amCharts)", widgetClass: "amchart_Scatter" },
        { id: "AM_COLUMN", display: "Column (amCharts)", widgetClass: "amchart_Column" },
        { id: "AM_GANTT", display: "Gantt (amCharts)", widgetClass: "amchart_Gantt" },
        { id: "AM_COMBO", display: "Combo (amCharts)", widgetClass: "amchart_Combo" },
    ].map(function(item) { item.family = "ND"; return item;});
    MultiChart.prototype._anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" },
        { id: "TABLE_NESTED", display: "Nested Table", widgetClass: "other_NestedTable" },
        { id: "TABLE_CALENDAR", display: "Calendar HEat Map", widgetClass: "other_CalendarHeatMap" },
        { id: "TABLE_BULLET", display: "Table driven bullet chart", widgetClass: "chart_Bullet" },
        { id: "TABLE_SELECT", display: "Table driven select", widgetClass: "other_Select" },
        { id: "TABLE_TREE", display: "Table driven tree", widgetClass: "tree_Dendrogram" },
        { id: "TABLE_TREEMAP", display: "Treemap", widgetClass: "tree_Treemap" },
        { id: "TABLE_SANKEY", display: "Sankey", widgetClass: "graph_Sankey" },
        { id: "TABLE_GMAP_PIN", display: "Google Map (pins)", widgetClass: "map_GMapPin" },
        { id: "TABLE_GMAP_PINLINE", display: "Google Map (pins/lines)", widgetClass: "map_GMapPinLine" }
    ].map(function (item) { item.family = "any"; return item; });
    MultiChart.prototype._allChartTypes = MultiChart.prototype._1DChartTypes.concat(MultiChart.prototype._2DChartTypes.concat(MultiChart.prototype._NDChartTypes.concat(MultiChart.prototype._anyChartTypes)));

    MultiChart.prototype.publishReset();
    MultiChart.prototype.publish("chartType", "BUBBLE", "set", "Chart Type", MultiChart.prototype._allChartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    MultiChart.prototype.publish("chart", null, "widget", "Chart",null,{tags:["Basic"]});

    MultiChart.prototype.fields = function (_) {
        var retVal = HTMLWidget.prototype.fields.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().fields();
            this.chart().fields(_);
        }
        return retVal;
    };

    MultiChart.prototype.columns = function (_) {
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().columns();
            this.chart().columns(_);
        }
        return retVal;
    };

    MultiChart.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().data();
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
            if (this._chartMonitor) {
                this._chartMonitor.remove();
                delete this._chartMonitor;
            }
            this._chartMonitor = _.monitor(function (key, newVal, oldVal) {
                context.broadcast(key, newVal, oldVal, _);
            });
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

    MultiChart.prototype.chartTypeDefaults = function (_) {
        if (!arguments.length) return this._chartTypeDefaults;
        this._chartTypeDefaults = _;
        return this;
    };
    
    MultiChart.prototype.getChartDataFamily = function () {
        return this._allCharts[this.chartType()].family;
    };

    MultiChart.prototype.requireContent = function (chartType, callback) {
        Utility.requireWidget(this._allCharts[chartType].widgetClass).then(function(Widget) {
            callback(new Widget());
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
                    .fields(context.fields())
                    .data(context.data())
                    .size(size)
                ;

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
        HTMLWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".multiChart").data(this.chart() ? [this.chart()] : [], function (d) { return d._id; });
        content.enter().append("div")
            .attr("class", "multiChart")
            .each(function (d) {
                d.target(this);
            })
        ;

        var currChart = this.chart();
        if (currChart) {
            for (var key in this._chartTypeDefaults) {
                if (currChart[key + "_default"]) {
                    try {
                        currChart[key + "_default"](this._chartTypeDefaults[key]);
                    } catch (e) {
                        console.log("Exception Setting Property:  " + key);
                    }
                } else {
                    console.log("Unknown Property:  " + key);
                }
            }
            this._chartTypeDefaults = {};
        }

        var context = this;
        content
            .each(function (d) { d.resize(context.size()); })
        ;

        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;
    };

    MultiChart.prototype.exit = function (domNode, element) {
        if (this._chartMonitor) {
            this._chartMonitor.remove();
            delete this._chartMonitor;
        }
        if (this.chart()) {
            this.chart().target(null);
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };


    MultiChart.prototype.render = function (callback) {
        if (this.chartType() && (!this.chart() || (this.chart().classID() !== this._allCharts[this.chartType()].widgetClass))) {
            var context = this;
            var args = arguments;
            this.switchChart(function () {
                HTMLWidget.prototype.render.apply(context, args);
            });
            return this;
        }
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    return MultiChart;
}));
