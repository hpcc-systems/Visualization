"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonXY", "amcharts/xy", "../chart/INDChart", "css!./Bar"], factory);
    } else {
        root.amcharts_Bubble = factory(root.d3, root.amcharts_CommonXY, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Bubble() {
        CommonXY.call(this);
        this._class = "amcharts_Bubble";
        this._tag = "div";
        
        this._type = "Bubble";
        this._gType = "column";
    };
    Bubble.prototype = Object.create(CommonXY.prototype);

    Bubble.prototype.implements(INDChart.prototype);

    Bubble.prototype.testData = function() {
        this.columns(["Cereal Name","Calories","Sugars"]);
        this.data([
            ["100%_Bran",70,6],
            ["100%_Natural_Bran",120,8],
            ["All-Bran",70,5],
            ["All-Bran_with_Extra_Fiber",50,0],
            ["Almond_Delight",110,10],
        ]);
        return this;
    };

    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // TODO: Scatter Specific Options
    }

    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);
        var context = this;   

        this.updateChartOptions();
        // https://jsfiddle.net/h6nk9jsx/ google ... go withthis format for data?

        this._chart.validateNow(); // magic
        this._chart.validateData();

    };


    return Bubble;
}));