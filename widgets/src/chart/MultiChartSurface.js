(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/ResizeSurface", "./MultiChart", "./I2DChart", "../common/Palette"], factory);
    } else {
        root.MultiChartSurface = factory(root.d3, root.ResizeSurface, root.MultiChart, root.I2DChart, root.Palette);
    }
}(this, function (d3, ResizeSurface, MultiChart, I2DChart, Palette) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        I2DChart.call(this);

        this._title = "MultiChartSurface";

        this._content = new MultiChart();

        var context = this;
        this._menu.click = function (d) {
            context._content.chartType(d);
        }
        this._menu.preShowMenu = function () {
            if (context._content.hasOverlay()) {
                context._content.visible(false);
            }
        }
        this._menu.postHideMenu = function () {
            if (context._content.hasOverlay()) {
                context._content.visible(true);
            }
        }
        this.mode("all");
    };
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.implements(I2DChart.prototype);
    MultiChartSurface.prototype.testData = I2DChart.prototype.testData;

    MultiChartSurface.prototype.columns = function (_) {
        if (!arguments.length) return this._content.columns();
        this._content.columns(_);
        return this;
    };

    MultiChartSurface.prototype.data = function (_) {
        if (!arguments.length) return this._content.data();
        this._content.data(_);
        return this;
    };

    MultiChartSurface.prototype.mode = function (_) {
        if (!arguments.length) return this._mode;
        this._mode = _;
        switch (this._mode) {
            case "2d":
                this.menu(this._content._2dChartTypes.concat(this._content._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "multi":
                this.menu(this._content._multiChartTypes.concat(this._content._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "all":
            default:
                this.menu(this._content._allChartTypes.map(function (item) { return item.display; }).sort());
        }
        return this;
    };

    MultiChartSurface.prototype.chartType = function (_, skipRender) {
        if (!arguments.length) return this._content.chartType();
        this._content.chartType(_);
        return this;
    };

    return MultiChartSurface;
}));
