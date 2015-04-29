"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../api/INDChart"], factory);
    } else {
        root.c3chart_CommonND = factory(root.c3chart_Common, root.chart_INDChart);
    }
}(this, function (Common, INDChart) {
    function CommonND(target) {
        Common.call(this);
        INDChart.call(this);
        this._class = "c3chart_CommonND";

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
        this._prevColumns = [];
    };
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch());
    CommonND.prototype.publish("xaxis_type", "category", "set", "X-Axis Type", ["category", "timeseries", "indexed"]);
    CommonND.prototype.publish("subchart", false, "boolean", "Show SubChart");

    CommonND.prototype.getDiffC3Columns = function () {
        return this._prevColumns.filter(function (i) { return this._columns.indexOf(i) < 0; }, this);
    };

    CommonND.prototype.render = function () {
        var retVal = Common.prototype.render.apply(this, arguments);
        this._prevColumns = this._columns;
        return retVal;
    };

    CommonND.prototype.enter = function (domNode, element) {
        if (this._subchart) {
            this._config.subchart = {
                show: true, size: {
                    height: 20
                }
            };
        }

        this._config.axis.x = {
            type: this._xaxis_type
        };

        switch (this._xaxis_type) {
        case "category":
            this._config.axis.tick = {
                centered: true,
                multiline: false
            }
            break;
        case "timeseries":
            this._config.data.x = this._columns[0];
            this._config.axis.tick = {
                format: '%d %b %Y'
            }
            break;
        }

        Common.prototype.enter.apply(this, arguments);
    };

    CommonND.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this._paletteID);

        switch (this._xaxis_type) {
            case "category":
                this.c3Chart.load({
                    categories: this.getC3Categories(),
                    columns: this.getC3Columns(),
                    unload: this.getDiffC3Columns()
                });
                break;
            case "indexed":
            case "timeseries":
                this.c3Chart.load({
                    columns: this.getC3Columns(),
                    unload: this.getDiffC3Columns()
                });
                break;
        }
    };

    return CommonND;
}));
