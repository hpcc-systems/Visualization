"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonXY", "amcharts/xy", "css!./Bar"], factory);
    } else {
        root.amcharts_Bubble = factory(root.d3, root.amcharts_CommonXY, root.amcharts);
    }
}(this, function(d3, CommonXY, AmCharts) {
    function Bubble() {
        CommonXY.call(this);
        this._class = "amcharts_Bubble";
        this._tag = "div";
        
        this._type = "Bubble";
        this._gType = "column";
    };
    Bubble.prototype = Object.create(CommonXY.prototype);

    Bubble.prototype.testData = function() {
        this.columns(["Calories","Sugars","Taste"]);
        this.data([
            [70,6,9],
            [120,8,8],
            [70,5,7],
            [50,0,6],
            [110,10,5],
        ]);
        return this;
    };

    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // TODO: Bubble Specific Options
    }

    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);
        var context = this;   

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bubble;
}));