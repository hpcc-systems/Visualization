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

        this._type = "donut";
    }
    Donut.prototype = Object.create(Common2D.prototype);
    Donut.prototype._class += " c3chart_Donut";

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    Donut.prototype.publish("showLabel", true, "boolean", "Show Label",null,{tags:['Basic']});
    //Donut.prototype.publish("labelFormat", null, "function", "???",null,{tags:['Intermediate']});
    //Donut.prototype.publish("labelThreshold", 0.05, "number", "???",null,{tags:['Intermediate']});
    Donut.prototype.publish("arcWidth", 45, "number", "Arc Width",null,{tags:['Basic']});
    Donut.prototype.publish("expand", true, "boolean", "Arc Explode",null,{tags:['Intermediate']});
    Donut.prototype.publish("title", "xxx", "string", "Center Label",null,{tags:['Intermediate']});

    Donut.prototype.enter = function (domNode, element) {
        this._config.donut = {
            label_show: this.showLabel(),
            width: this.arcWidth(),
            expand: this.expand(),
            title: this.title()
        };

        Common2D.prototype.enter.apply(this, arguments);
    };

    Donut.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.donut_label_show = this.showLabel();
//        this.c3Chart.internal.config.donut_label_format = this.high();
//        this.c3Chart.internal.config.donut_label_threshold = this.showValueLabel() ? this.columns() : "";
        this.c3Chart.internal.config.donut_width = this.arcWidth();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();
    };

    Donut.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    };

    return Donut;
}));
