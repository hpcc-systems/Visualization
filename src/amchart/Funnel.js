"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "../api/I2DChart", "../api/ITooltip"], factory);
    } else {
        root.amchart_Funnel = factory(root.d3, root.amchart_CommonFunnel, root.api_I2DChart, root.api_ITooltip);
    }
}(this, function(d3, CommonFunnel, I2DChart, ITooltip) {
    function Funnel() {
        CommonFunnel.call(this);
    }
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.constructor = Funnel;
    Funnel.prototype._class += " amchart_Funnel";
    Funnel.prototype.implements(I2DChart.prototype);
    Funnel.prototype.implements(ITooltip.prototype);

    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %",null,{tags:["Basic"]});
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %",null,{tags:["Basic"]});

    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        this._chart.balloonFunction = function(d) {
            if(context && context.tooltipValueFormat){
                return d.title + ", " + d3.format(context.tooltipValueFormat())(d.value);
            }else{
              return d.title + ", " + d.value;  
            } 
        };
        this._chart.neckHeight = this.neckHeightPercent()+"%";
        this._chart.neckWidth = this.neckWidthPercent()+"%";
    };

    Funnel.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Funnel;
}));
