(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./INDChart"], factory);
    } else {
        root.MultiChart = factory(root.d3, root.SVGWidget, root.INDChart);
    }
}(this, function (d3, SVGWidget, INDChart) {
    function MultiChart() {
        SVGWidget.call(this);
        INDChart.call(this);
        this.class = "chart_MultiChart";

        this._chartType = "";
        this._chart = null;

        this._2dChartTypes = [
            { id: "BUBBLE", display: "Bubble", path: "src/chart/Bubble" },
            { id: "COLUMN", display: "Column", path: "src/chart/Column" },
            { id: "PIE", display: "Pie", path: "src/chart/Pie" },
            { id: "GOOGLE_PIE", display: "Pie (Google)", path: "src/google/Pie" },
            { id: "C3_PIE", display: "Pie (C3)", path: "src/c3/Pie" },
            { id: "C3_DONUT", display: "Donut (C3)", path: "src/c3/Donut" },
            { id: "WORD_CLOUD", display: "Word Cloud", path: "src/other/WordCloud" }
        ];
        this._multiChartTypes = [
            { id: "GOOGLE_BAR", display: "Bar (Google)", path: "src/google/Bar" },
            { id: "GOOGLE_COLUMN", display: "Column (Google)", path: "src/google/Column" },
            { id: "LINE", display: "Line", path: "src/chart/Line" },
            { id: "GOOGLE_LINE", display: "Line (Google)", path: "src/google/Line" },
            { id: "C3_LINE", display: "Line (C3)", path: "src/c3/Line" },
            { id: "C3_BAR", display: "Bar (C3)", path: "src/c3/Bar" },
            { id: "C3_COLUMN", display: "Column (C3)", path: "src/c3/Column" },
            { id: "C3_STEP", display: "Step (C3)", path: "src/c3/Step" },
            { id: "C3_AREA", display: "Area (C3)", path: "src/c3/Area" },
            { id: "C3_SCATTER", display: "Scatter (C3)", path: "src/c3/Scatter" }
        ];
        this._anyChartTypes = [
            { id: "TABLE", display: "Table", path: "src/other/Table" }
        ];
        this._allChartTypes = this._2dChartTypes.concat(this._multiChartTypes.concat(this._anyChartTypes));
        this._allCharts = {};
        this._allChartTypes.forEach(function (item) {
            item.widget = null;
            this._allCharts[item.id] = item;
            this._allCharts[item.display] = item;
        }, this);
        //  Backward compatability until we roll our own BAR  ---
        this._allCharts["BAR"] = this._allCharts["COLUMN"];
    };
    MultiChart.prototype = Object.create(SVGWidget.prototype);
    MultiChart.prototype.implements(INDChart.prototype);

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
        require([this._allCharts[chartType].path], function (widgetClass) {
            retVal = new widgetClass();
            retVal.click = function (row, column) {
                context.click(row, column);
            }
            context._allCharts[chartType].widget = retVal;
            callback(retVal);
        });
    };

    MultiChart.prototype.chartType = function (_, skipRender) {
        if (!arguments.length) return this._chartType;
        this._chartType = _;
        if (!skipRender && this._renderCount) {
            var oldContent = this._chart;
            var context = this;
            this.requireContent(this._chartType, function (newContent) {
                if (newContent !== oldContent) {
                    var size = context.size();
                    context._chart = newContent
                        .columns(context._columns)
                        .data(context._data)
                        .size(size)
                    ;
                    if (oldContent) {
                        oldContent
                            .data([])
                            .size({ width: 1, height: 1 })
                            .render()
                        ;
                    }
                    context.render();
                }
            });
        }
        return this;
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

    MultiChart.prototype.render = function () {
        SVGWidget.prototype.render.apply(this, arguments);
        if (this._chartType && this._renderCount == 1) {
            this.chartType(this._chartType);
        }
        return this;
    }

    return MultiChart;
}));
