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
        this._chartTypeProperties = {};
    }
    MultiChart.prototype = Object.create(HTMLWidget.prototype);
    MultiChart.prototype.constructor = MultiChart;
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype._1DChartTypes = [
        { id: "C3_GAUGE", display: "Gauge (C3)", widgetClass: "c3chart_Gauge" }
    ].map(function(item) { item.family = "1D"; return item;});
    MultiChart.prototype._2DChartTypes = [
        { id: "SUMMARY", display: "Summary", widgetClass: "chart_Summary" },
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
        { id: "HEXBIN", display: "Hex Bin", widgetClass: "chart_HexBin" },
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
    MultiChart.prototype._mapChartTypes = [
        { id: "CHORO_USSTATES", display: "US State Choropleth", widgetClass: "map_ChoroplethStates" },
        { id: "CHORO_USCOUNTIES", display: "US County Choropleth", widgetClass: "map_ChoroplethCounties" },
        { id: "CHORO_COUNTRIES", display: "Country Choropleth", widgetClass: "map_ChoroplethCountries" },
        { id: "GOOGLE_MAP", display: "Google Map", widgetClass: "map_GMapLayered" },
        { id: "OPENSTREET", display: "Open Street Map", widgetClass: "map_OpenStreet" }
    ].map(function (item) { item.family = "map"; return item; });
    MultiChart.prototype._anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" },
        { id: "TABLE_NESTED", display: "Nested Table", widgetClass: "other_NestedTable" },
        { id: "TABLE_CALENDAR", display: "Table driven Calendar Heat Map", widgetClass: "other_CalendarHeatMap" },
        { id: "TABLE_BULLET", display: "Table driven bullet chart", widgetClass: "chart_Bullet" },
        { id: "TABLE_SELECT", display: "Table driven select", widgetClass: "other_Select" },
        { id: "TABLE_AUTOCOMPLETE", display: "Table driven auto complete", widgetClass: "other_AutoCompleteText" },
        { id: "TABLE_HANDSON", display: "Table driven handson", widgetClass: "handson_Table" },
        { id: "TABLE_OPPORTUNITY", display: "Table driven opportunity widget", widgetClass: "graph_Opportunity" },
        { id: "TABLE_TREE", display: "Table driven tree", widgetClass: "tree_Dendrogram" },
        { id: "TABLE_TREEMAP", display: "Table driven Treemap", widgetClass: "tree_Treemap" },
        { id: "TABLE_SANKEY", display: "Table driven Sankey", widgetClass: "graph_Sankey" },
        { id: "TABLE_GMAP_PIN", display: "Table driven Google Map (pins)", widgetClass: "map_GMapPin" },
        { id: "TABLE_GMAP_PINLINE", display: "Table driven Google Map (pins/lines)", widgetClass: "map_GMapPinLine" }
    ].map(function (item) { item.family = "any"; return item; });
    MultiChart.prototype._allChartTypes =
        MultiChart.prototype._1DChartTypes.concat(
        MultiChart.prototype._2DChartTypes.concat(
        MultiChart.prototype._NDChartTypes.concat(
        MultiChart.prototype._mapChartTypes.concat(
        MultiChart.prototype._anyChartTypes
    ))));
    MultiChart.prototype._allMap = d3.map(MultiChart.prototype._allChartTypes, function (item) { return item.family; });
    MultiChart.prototype._allFamilies = MultiChart.prototype._allMap.keys();
    MultiChart.prototype._allChartTypesMap = {};
    MultiChart.prototype._allChartTypesByClass = {};
    MultiChart.prototype._allChartTypes.forEach(function (item) {
        item.widgetPath = Utility.widgetPath(item.widgetClass);
        MultiChart.prototype._allChartTypesMap[item.id] = item;
        MultiChart.prototype._allChartTypesByClass[item.widgetClass] = item;
    }, this);

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

    MultiChart.prototype.columns = function (_, asDefault) {
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().columns();
            this.chart().columns(_, asDefault);
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
            if (this._allChartTypesByClass[_.classID()]) {
                this.chartType(this._allChartTypesByClass[_.classID()].id);
            } else {
                console.log("Unknown Class ID:  " + _.classID());
            }
            _.click = function (row, column, selected) {
                context.click.apply(context, arguments);
            };
            _.dblclick = function (row, column, selected) {
                context.dblclick.apply(context, arguments);
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

    MultiChart.prototype.chartTypeProperties = function (_) {
        if (!arguments.length) return this._chartTypeProperties;
        this._chartTypeProperties = _;
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
                        console.log("Exception Setting Default:  " + key);
                    }
                } else {
                    console.log("Unknown Default:  " + key);
                }
            }
            this._chartTypeDefaults = {};
            for (var propKey in this._chartTypeProperties) {
                if (currChart[propKey]) {
                    try {
                        currChart[propKey](this._chartTypeProperties[propKey]);
                    } catch (e) {
                        console.log("Exception Setting Property:  " + propKey);
                    }
                } else {
                    console.log("Unknown Property:  " + propKey);
                }
            }
            this._chartTypeProperties = {};
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
