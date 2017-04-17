/**
 * @file c3 Chart Donut
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.c3chart_Donut = factory(root.c3chart_Common2D);
    }
}(this, function (Common2D) {
    /**
     * @class c3chart_Donut
     * @extends c3chart_Common2D
     */
    function Donut(target) {
        Common2D.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Donut
         * @private
         */
        this._type = "donut";
    }
    Donut.prototype = Object.create(Common2D.prototype);
    Donut.prototype.constructor = Donut;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Donut
     * @private
     */
    Donut.prototype._class += " c3chart_Donut";

    Donut.prototype.publish("showLabel", true, "boolean", "Show Label",null,{tags:["Basic"]});
    //Donut.prototype.publish("labelFormat", null, "function", "???",null,{tags:["Intermediate"]});
    //Donut.prototype.publish("labelThreshold", 0.05, "number", "???",null,{tags:["Intermediate"]});
    Donut.prototype.publish("arcWidth", 45, "number", "Arc Width",null,{tags:["Basic"]});
    Donut.prototype.publish("expand", true, "boolean", "Arc Explode",null,{tags:["Intermediate"]});
    Donut.prototype.publish("title", "xxx", "string", "Center Label",null,{tags:["Intermediate"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof c3chart_Donut
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Donut.prototype.enter = function (domNode, element) {
        this._config.donut = {
            label_show: this.showLabel(),
            width: this.arcWidth(),
            expand: this.expand(),
            title: this.title()
        };

        Common2D.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Donut
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Donut.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.donut_label_show = this.showLabel();
//        this.c3Chart.internal.config.donut_label_format = this.high();
//        this.c3Chart.internal.config.donut_label_threshold = this.showValueLabel() ? this.columns() : "";
        this.c3Chart.internal.config.donut_width = this.arcWidth();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();
    };

    /**
     * Builds and returns an c3chart configuration Object based on publish param values.
     * @method getChartOptions
     * @memberof c3chart_Donut
     * @instance
     * @private
     * @returns {Object}
     */
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
