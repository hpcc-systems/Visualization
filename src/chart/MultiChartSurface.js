"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/ResizeSurface", "./MultiChart", "../api/INDChart"], factory);
    } else {
        root.chart_MultiChartSurface = factory(root.d3, root.common_ResizeSurface, root.chart_MultiChart, root.api_INDChart);
    }
}(this, function (d3, ResizeSurface, MultiChart, INDChart) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        INDChart.call(this);

        this._title = "MultiChartSurface";

        this._content = new MultiChart();
        var context = this;
        this._content.click = function (row, column) {
            context.click(row, column);
        };
        this._menu.click = function (d) {
            context._content.chartType(d).render();
        };
        this.content(this._content);
        this.mode("all");
    }
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.constructor = MultiChartSurface;
    MultiChartSurface.prototype._class += " chart_MultiChartSurface";
    MultiChartSurface.prototype.implements(INDChart.prototype);

    MultiChartSurface.prototype.publish("mode", "2D", "set", "Chart Type", ["1D", "2D", "ND", "all"]);
    MultiChartSurface.prototype.publishProxy("chartType", "_content");

    MultiChartSurface.prototype.columns = function (_) {
        if (!arguments.length) return this.content().columns();
        this.content().columns(_);
        return this;
    };

    MultiChartSurface.prototype.data = function (_) {
        if (!arguments.length) return this.content().data();
        this.content().data(_);
        return this;
    };

    MultiChartSurface.prototype._origMode = MultiChartSurface.prototype.mode;
    MultiChartSurface.prototype.mode = function (_) {
        var retVal = MultiChartSurface.prototype._origMode.apply(this, arguments);
        if (arguments.length) {
            this._mode = _;
            switch (this._mode) {
                case "1d":
                case "1D":
                    this.menu(this.content()._1DChartTypes.map(function (item) { return item.display; }).sort());
                    break;
                case "2d":
                case "2D":
                    this.menu(this.content()._2DChartTypes.concat(this.content()._anyChartTypes).map(function (item) { return item.display; }).sort());
                    break;
                case "multi":
                    /* falls through */
                case "ND":
                    this.menu(this.content()._NDChartTypes.concat(this.content()._anyChartTypes).map(function (item) { return item.display; }).sort());
                    break;
                case "all":
                    /* falls through */
                default:
                    this.menu(this.content()._allChartTypes.map(function (item) { return item.display; }).sort());
            }
        }
        return retVal;
    };

    return MultiChartSurface;
}));
