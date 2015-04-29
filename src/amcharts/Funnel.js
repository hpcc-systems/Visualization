"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "amcharts/funnel", "../chart/INDChart"], factory);
    } else {
        root.amcharts_Funnel = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, INDChart) {
    function Funnel() {
        CommonFunnel.call(this);
        this._class = "amcharts_Funnel";
    };
    
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.implements(INDChart.prototype);

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %");
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %");
    
    Funnel.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Funnel.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 300],
            ["English", 120],
            ["Math", 98],
            ["Science", 72]
        ]);
        return this;
    };
    
    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };
    
    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        
        this._chart.neckHeight = this._neckHeightPercent+"%";
        this._chart.neckWidth = this._neckWidthPercent+"%";
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
