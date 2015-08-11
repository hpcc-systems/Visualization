"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "amcharts.funnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Pyramid = factory(root.d3, root.amchart_CommonFunnel, root.amcharts, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, I2DChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._tag = "div";
    }

    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.constructor = Pyramid;
    Pyramid.prototype._class += " amchart_Pyramid";
    Pyramid.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Pyramid.prototype.publish("paletteID", "default", "set", "Palette ID", Pyramid.prototype._palette.switch(), {tags:["Basic","Shared"]});

    /**
     * Publish Params Unique To This Widget
     */
    Pyramid.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Intermediate"]});

    Pyramid.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 75],
            ["English", 23],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };

    Pyramid.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Pyramid.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
    };

    Pyramid.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);
    };

    return Pyramid;
}));
