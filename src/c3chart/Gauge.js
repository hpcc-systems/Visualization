"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common1D"], factory);
    } else {
        root.c3chart_Gauge = factory(root.c3chart_Common1D);
    }
}(this, function (Common1D) {
    function Gauge(target) {
        Common1D.call(this);

        this._type = "gauge";

        var context = this;
        this._config.data.onclick = function (d, element) {
            var clickEvent = {};
            clickEvent[d.id] = d.value;
            context.click(clickEvent, d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(context._data, context.low(), context.high());
        };
    }
    Gauge.prototype = Object.create(Common1D.prototype);
    Gauge.prototype.constructor = Gauge;
    Gauge.prototype._class += " c3chart_Gauge";

    /**
     * Publish Params Common To Other Libraries
     */
    Gauge.prototype.publish("low", 0, "number", "Gauge Lower Bound",null,{tags:["Intermediate","Shared"]});
    Gauge.prototype.publish("high", 100, "number", "Gauge Higher Bound",null,{tags:["Intermediate","Shared"]});

    /**
     * Publish Params Unique To This Widget
     */
    Gauge.prototype.publish("valueFormat", "Percent", "set", "Value Display Format", ["Percent", "Value"],{tags:["Basic"]});
    Gauge.prototype.publish("arcWidth", 10, "number", "Gauge Width of Arc",null,{tags:["Basic"]});
    Gauge.prototype.publish("showLabels", true, "boolean", "Show Labels",null,{tags:["Basic"]});
    Gauge.prototype.publish("showValueLabel", true, "boolean", "Show Value Label",null,{tags:["Basic"]});

    Gauge.prototype.update = function (domNode, element) {
        this.c3Chart.internal.config.gauge_min = this.low();
        this.c3Chart.internal.config.gauge_max = this.high();
        this.c3Chart.internal.config.gauge_units = this.showValueLabel() ? this.columns() : "";
        this.c3Chart.internal.config.gauge_width = this.arcWidth();
        this.c3Chart.internal.config.gauge_label_format = this.valueFormat() === "Percent" ? null : function (value, ratio) { return value; };
        this.c3Chart.internal.config.gauge_label_show = this.showLabels();
        Common1D.prototype.update.apply(this, arguments);
    };

    Gauge.prototype.getChartOptions = function () {
        var chartOptions = Common1D.prototype.getChartOptions.apply(this, arguments);

        chartOptions.columns = [[this._columns, this._data]];

        return chartOptions;
    };

    return Gauge;
}));
