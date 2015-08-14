/**
 * @file c3 Chart Pie
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.c3chart_Pie = factory(root.c3chart_Common2D);
    }
}(this, function (Common2D) {
    /**
     * @class c3chart_Pie
     * @extends c3chart_Common2D
     */
    function Pie(target) {
        Common2D.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @name _type
         * @member {string} _type
         * @memberof c3chart_Pie
         * @private
         */
        this._type = "pie";
    }
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype.constructor = Pie;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Pie
     * @private
     */
    Pie.prototype._class += " c3chart_Pie";

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Pie
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    /**
     * Builds and returns an c3chart configuration Object based on publish param values.
     * @method getChartOptions
     * @memberof c3chart_Pie
     * @instance
     * @private
     * @returns {Object}
     */
    Pie.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    };

    return Pie;
}));
