/**
* @file Google Chart CommonND
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../google/Common", "../api/INDChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_CommonND = factory(root.d3, root.google_Common, root.api_INDChart);
    }
}(this, function (d3, Common, INDChart) {
    /**
     * @class google_CommonND
     * @extends google_Common
     * @implements api_INDChart
     * @abstract
     * @noinit
     */
    function CommonND() {
        Common.call(this);
        INDChart.call(this);
    }
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.constructor = CommonND;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof google_CommonND
     * @private
     */
    CommonND.prototype._class += " google_CommonND";
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(),{tags:["Basic","Shared"]});
    CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    /**
     * Builds and returns a google configuration object based on publish param values.
     * @method getChartOptions
     * @memberof google_CommonND
     * @instance
     * @private
     * @returns {Object}
     */
    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof google_CommonND
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    CommonND.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        Common.prototype.update.apply(this, arguments);
    };

    /**
     * Initializes empty object(s) for google chart series.
     * @method initSeries
     * @memberof google_CommonND
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

    return CommonND;
}));
