"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "amcharts.funnel", "../api/I2DChart"], factory);
    } else {
        root.amcharts_Funnel = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, I2DChart) {
    function Funnel() {
        CommonFunnel.call(this);
        this._class = "amcharts_Funnel";
    };
    
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.implements(I2DChart.prototype);
    
    Funnel.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Funnel.prototype._palette.switch());

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %");
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %");
    
    Funnel.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
        
    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };
    
    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        
        this._chart.neckHeight = this.neckHeightPercent()+"%";
        this._chart.neckWidth = this.neckWidthPercent()+"%";
    }

    Funnel.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);
        var context = this;   
        
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Funnel;
}));
