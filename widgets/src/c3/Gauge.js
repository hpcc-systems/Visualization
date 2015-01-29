(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../chart/I1DChart"], factory);
    } else {
        root.Gauge = factory(root.Common, root.I1DChart);
    }
}(this, function (Common, I1DChart) {
    function Gauge(target) {
        Common.call(this);
        I1DChart.call(this);
        this._class = "c3_Gauge";

        this._type = "gauge";

        var context = this;
        this._config.data.onclick = function (d, element) {
            var clickEvent = {};
            clickEvent[d.id] = d.value;
            context.click(clickEvent, d.id);
        };
    };
    Gauge.prototype = Object.create(Common.prototype);
    Gauge.prototype.implements(I1DChart.prototype);

    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound");
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound");
    Gauge.prototype.publish("value_format", "Percent", "set", "Value Display Format", ["Percent", "Value"]);
    Gauge.prototype.publish("arc_width", 75, "number", "Gauge width of arc");
    Gauge.prototype.publish("show_labels", true, "boolean", "Show Labels");
    Gauge.prototype.publish("show_value_label", true, "boolean", "Show Value Label");

    Gauge.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.gauge_min = this.low();
        this.c3Chart.internal.config.gauge_max = this.high();
        this.c3Chart.internal.config.gauge_units = this.show_value_label() ? this.columns() : "";
        this.c3Chart.internal.config.gauge_width = this.arc_width();
        this.c3Chart.internal.config.gauge_label_format = this.value_format() === "Percent" ? null : function (value, ratio) { return value; };
        this.c3Chart.internal.config.gauge_label_show = this.show_labels();
        this.c3Chart.load({
            columns: [[this._columns, this._data]]
        });
    };

    return Gauge;
}));