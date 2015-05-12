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
    Gauge.prototype._class += " c3chart_Gauge";

    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound");
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound");
    Gauge.prototype.publish("value_format", "Percent", "set", "Value Display Format", ["Percent", "Value"]);
    Gauge.prototype.publish("arc_width", 50, "number", "Gauge width of arc");
    Gauge.prototype.publish("show_labels", true, "boolean", "Show Labels");
    Gauge.prototype.publish("show_value_label", true, "boolean", "Show Value Label");

    Gauge.prototype.update = function (domNode, element) {
        Common1D.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.gauge_min = this.low();
        this.c3Chart.internal.config.gauge_max = this.high();
        this.c3Chart.internal.config.gauge_units = this.show_value_label() ? this.columns() : "";
        this.c3Chart.internal.config.gauge_width = this.arc_width();
        this.c3Chart.internal.config.gauge_label_format = this.value_format() === "Percent" ? null : function (value, ratio) { return value; };
        this.c3Chart.internal.config.gauge_label_show = this.show_labels();
    };

    Gauge.prototype.getChartOptions = function () {
        var chartOptions = Common1D.prototype.getChartOptions.apply(this, arguments);

        chartOptions.columns = [[this._columns, this._data]];

        return chartOptions;
    };

    return Gauge;
}));
