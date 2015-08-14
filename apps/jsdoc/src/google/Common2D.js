/**
* @file Google Chart Common2D
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../google/Common", "../api/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_Common2D = factory(root.d3, root.google_Common, root.api_I2DChart);
    }
}(this, function (d3, Common, I2DChart) {
    /**
     * @class google_Common2D
     * @extends google_Common
     * @implements api_I2DChart
     * @abstract
     * @noinit
     */
    function Common2D() {
        Common.call(this);
        I2DChart.call(this);
    }
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype.constructor = Common2D;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof google_Common2D
     * @private
     */
    Common2D.prototype._class += " google_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    /**
     * Builds and returns a google configuration object based on publish param values.
     * @method getChartOptions
     * @memberof google_Common2D
     * @instance
     * @private
     * @returns {Object}
     */
    Common2D.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof google_Common2D
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        Common.prototype.update.apply(this, arguments);
    };

    /**
     * Initializes empty object(s) for google chart series.
     * @method initSeries
     * @memberof google_Common2D
     * @instance
     * @protected
     * @param {Number} num Number of series.
     * @returns {Array}
     */
    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }

    return Common2D;
}));
