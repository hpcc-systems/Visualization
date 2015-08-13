"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonFunnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Funnel = factory(root.d3, root.amchart_CommonFunnel, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, I2DChart) {
    function Funnel() {
        CommonFunnel.call(this);
    }
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.constructor = Funnel;
    Funnel.prototype._class += " amchart_Funnel";
    Funnel.prototype.implements(I2DChart.prototype);

    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %",null,{tags:["Basic"]});
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %",null,{tags:["Basic"]});

    //TODO
    Funnel.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Basic"]});

    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);

        this._chart.balloonText = this.tooltipTemplate();
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
