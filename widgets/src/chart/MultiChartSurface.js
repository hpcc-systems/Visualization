(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/ResizeSurface", "./I2DChart", "../common/Palette"], factory);
    } else {
        root.MultiChartSurface = factory(root.d3, root.ResizeSurface, root.I2DChart, root.Palette);
    }
}(this, function (d3, ResizeSurface, I2DChart, Palette) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        I2DChart.call(this);

        this._title = "MultiChartSurface";

        this._chartType = "";
        this._content = null;

        this._2dChartTypes = [
            { id: "BUBBLE", display: "Bubble", path: "src/chart/Bubble" },
            { id: "COLUMN", display: "Column", path: "src/chart/Column" },
            { id: "PIE", display: "Pie", path: "src/chart/Pie" },
            { id: "GOOGLE_PIE", display: "Pie (Google)", path: "src/google/Pie" },
            { id: "C3_PIE", display: "Pie (C3)", path: "src/c3/Pie" },
            { id: "WORD_CLOUD", display: "Word Cloud", path: "src/other/WordCloud" }
        ];
        this._multiChartTypes = [
            { id: "GOOGLE_BAR", display: "Bar (Google)", path: "src/google/Bar" },
            { id: "GOOGLE_COLUMN", display: "Column (Google)", path: "src/google/Column" },
            { id: "LINE", display: "Line", path: "src/chart/Line" },
            { id: "GOOGLE_LINE", display: "Line (Google)", path: "src/google/Line" },
            { id: "C3_LINE", display: "Line (C3)", path: "src/c3/Line" },
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
        //  Backward compatability until we role our own BAR  ---
        this._allCharts["BAR"] = this._allCharts["COLUMN"];

        var context = this;
        this._menu.click = function (d) {
            context.chartType(d);
        }
        this._menu.preShowMenu = function () {
            if (context.content() && context.content()._overlayElement) {
                context.content()._parentElement
                    .style("display", "none");
                ;
            }
        }
        this._menu.postHideMenu = function () {
            if (context.content() && context.content()._overlayElement) {
                context.content()._parentElement
                    .style("display", null);
                ;
            }
        }
        this.mode("all");
    };
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.implements(I2DChart.prototype);

    MultiChartSurface.prototype.columns = function (_) {
        var retVal = ResizeSurface.prototype.columns.apply(this, arguments);
        if (arguments.length && this.content()) {
            this.content().columns(_);
        }
        return retVal;
    };

    MultiChartSurface.prototype.data = function (_) {
        var retVal = ResizeSurface.prototype.data.apply(this, arguments);
        if (arguments.length && this.content()) {
            this.content().data(_);
        }
        return retVal;
    };

    MultiChartSurface.prototype.mode = function (_) {
        if (!arguments.length) return this._mode;
        this._mode = _;
        switch (this._mode) {
            case "2d":
                this.menu(this._2dChartTypes.concat(this._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "multi":
                this.menu(this._multiChartTypes.concat(this._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "all":
            default:
                this.menu(this._allChartTypes.map(function (item) { return item.display; }).sort());
        }
        return this;
    };

    MultiChartSurface.prototype.requireContent = function (chartType, callback) {
        var retVal = this._allCharts[chartType].widget;
        if (retVal) {
            callback(retVal);
            return;
        }

        var context = this;
        require([this._allCharts[chartType].path], function (widgetClass) {
            retVal = new widgetClass();
            retVal.click = function (d) {
                context.click(d);
            }
            context._allCharts[chartType].widget = retVal;
            callback(retVal);
        });
    };

    MultiChartSurface.prototype.chartType = function (_, skipRender) {
        if (!arguments.length) return this._chartType;
        this._chartType = _;
        if (!skipRender && this._renderCount) {
            var oldContent = this._content;
            var context = this;
            this.requireContent(this._chartType, function (newContent) {
                if (newContent !== oldContent) {
                    var size = context._container.getBBox();
                    context.content(newContent
                        .columns(context._columns)
                        .data(context._data)
                        .size(size)
                    );
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

    MultiChartSurface.prototype.render = function () {
        ResizeSurface.prototype.render.apply(this, arguments);
        if (this._chartType && this._renderCount == 1) {
            this.chartType(this._chartType);
        }
        return this;
    }

    return MultiChartSurface;
}));
