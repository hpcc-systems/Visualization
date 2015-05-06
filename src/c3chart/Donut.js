"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.c3chart_Donut = factory(root.c3chart_Common2D);
    }
}(this, function (Common2D) {
    function Donut(target) {
        Common2D.call(this);
        this._class = "c3chart_Donut";

        this._type = "donut";
    };
    Donut.prototype = Object.create(Common2D.prototype);

    Donut.prototype.publish("label_show", true, "boolean", "Show Label");
    //Donut.prototype.publish("label_format", null, "function", "???");
    //Donut.prototype.publish("label_threshold", 0.05, "number", "???");
    Donut.prototype.publish("arc_width", 45, "number", "Arc Width");
    Donut.prototype.publish("expand", true, "boolean", "Arc Explode");
    Donut.prototype.publish("title", "xxx", "string", "Label");

    Donut.prototype.enter = function (domNode, element) {
        this._config.donut = {
            label_show: this.label_show(),
            width: this.arc_width(),
            expand: this.expand(),
            title: this.title()
        }

        Common2D.prototype.enter.apply(this, arguments);
    };

    Donut.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.donut_label_show = this.label_show();
//        this.c3Chart.internal.config.donut_label_format = this.high();
//        this.c3Chart.internal.config.donut_label_threshold = this.show_value_label() ? this.columns() : "";
        this.c3Chart.internal.config.donut_width = this.arc_width();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);
        this.c3Chart.load({
            columns: data
        });
    };

    Donut.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);
        return chartOptions;
    }

    return Donut;
}));
