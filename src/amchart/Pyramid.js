"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "amcharts.funnel", "../api/I2DChart"], factory);
    } else {
        root.amcharts_Pyramid = factory(root.d3, root.amcharts_CommonFunnel, root.amcharts, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, I2DChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._class = "amcharts_Pyramid";
        this._tag = "div";
    };
    
    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.implements(I2DChart.prototype);

    Pyramid.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Pyramid.prototype._palette.switch());
    
    Pyramid.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Pyramid.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Pyramid.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 75],
            ["English", 23],
            ["Math", 98],
            ["Science", 66]
        ]);
        this.marginLeft(15);
        this.marginRight(150);
        return this;
    };
    
    Pyramid.prototype.enter = function(domNode, element) {       
        CommonFunnel.prototype.enter.apply(this, arguments);
    };
    
    Pyramid.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
    }

    Pyramid.prototype.update = function(domNode, element) {
        var context = this;   
        CommonFunnel.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Pyramid;
}));
