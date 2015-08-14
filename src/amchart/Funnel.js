/**
 * @file AmChart Funnel
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Funnel = factory(root.d3, root.amchart_CommonFunnel, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, I2DChart) {
    /**
     * @class amchart_Funnel
     * @extends amchart_CommonFunnel
     * @implements api_I2DChart
     */
    function Funnel() {
        CommonFunnel.call(this);
    }
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.constructor = Funnel;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof amchart_Funnel
     * @private
     */
    Funnel.prototype._class += " amchart_Funnel";
    Funnel.prototype.implements(I2DChart.prototype);

    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %",null,{tags:["Basic"]});
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %",null,{tags:["Basic"]});

    //TODO
    Funnel.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Basic"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @instance
     * @memberof amchart_Funnel
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @memberof amchart_Funnel
     * @instance
     * @private
     * @returns {Object}
     */
    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);

        this._chart.balloonText = this.tooltipTemplate();
        this._chart.neckHeight = this.neckHeightPercent()+"%";
        this._chart.neckWidth = this.neckWidthPercent()+"%";
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_Funnel
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Funnel.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Funnel;
}));
