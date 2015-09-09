"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonRadar", "amcharts.radar", "../api/INDChart"], factory);
    } else {
        root.amchart_Polar = factory(root.d3, root.amchart_CommonRadar, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonRadar, AmCharts, INDChart) {
    function Polar() {
        CommonRadar.call(this);
        this._tag = "div";
        this._gType = "column";
    }
    Polar.prototype = Object.create(CommonRadar.prototype);
    Polar.prototype.constructor = Polar;
    Polar.prototype._class += " amchart_Polar";
    Polar.prototype.implements(INDChart.prototype);

    Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Polar.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"]);
        this.data([
            ["English", 5, 43, 41, 92],
            ["English II", 7, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 6, 73, 52, 83],
            ["Geography III", 6, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8],
        ]);
        this.yAxisTitleOffset([20]);
        this.yAxisMinimum([0]);
        this.axisAlpha([0.15]);
        this.yAxisDashLength([3]);
        return this;
    };

    Polar.prototype.enter = function(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    };

    Polar.prototype.updateChartOptions = function() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Polar.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonRadar.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, this._valueField[i], i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj,valueField) {
            gObj.valueField = valueField;
            return gObj;
        }
    };

    Polar.prototype.update = function(domNode, element) {
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Polar;
}));
