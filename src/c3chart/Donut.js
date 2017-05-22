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

        var context = this;
        this._config.data.onclick = function (d, element) {
            var rows = context.data().filter(function (row) {
                return row[0] === d.name;
            });
            if (rows.length === 1) {
                context.click(context.rowToObj(rows[0]), d.id, context.c3Chart.selected().length > 0);
            } else if (rows.length > 1) {
                console.log("C3 sel.name matches too much data.");
            } else {
                console.log("C3 sel.name does not match any data.");
            }
        };
    }
    Donut.prototype = Object.create(Common2D.prototype);
    Donut.prototype.constructor = Donut;
    Donut.prototype._class += " c3chart_Donut";

    Donut.prototype.publish("showLabel", true, "boolean", "Show Label",null,{tags:["Basic"]});
    Donut.prototype.publish("arcWidth", 45, "number", "Arc Width",null,{tags:["Basic"]});
    Donut.prototype.publish("expand", true, "boolean", "Arc Explode",null,{tags:["Intermediate"]});
    Donut.prototype.publish("title", "", "string", "Center Label",null,{tags:["Intermediate"]});

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
        this.c3Chart.internal.config.donut_label_show = this.showLabel();
        this.c3Chart.internal.config.donut_width = this.arcWidth();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();

        Common2D.prototype.update.apply(this, arguments);

        element.select(".c3-chart-arcs-title")
            .text(this.showLabel() ? this.title() : "")
        ;
    };

    Donut.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        var data = this.data().map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    };

    return Donut;
}));
