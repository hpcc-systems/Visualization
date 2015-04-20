"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonXY", "amcharts.xy", "../../chart/INDChart", "css!./Bar"], factory);
    } else {
        root.Scatter = factory(root.d3, root.CommonXY, root.amcharts, root.INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Scatter() {
        CommonXY.call(this);
        this._class = "amcharts_charts_Bar";
        this._tag = "div";

        this._gType = "column";
    };
    Scatter.prototype = Object.create(CommonXY.prototype);

    Scatter.prototype.implements(INDChart.prototype);

    Scatter.prototype.testData = function() {
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

    Scatter.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // TODO: Scatter Specific Options
    }

    Scatter.prototype.update = function(domNode, element) {
        var context = this;   

        this.updateChartOptions();
        // https://jsfiddle.net/h6nk9jsx/ google ... go withthis format for data?

        this._chart.validateNow(); // magic
        this._chart.validateData();

    };


    return Scatter;
}));