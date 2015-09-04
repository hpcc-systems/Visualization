"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonXY", "amcharts.xy", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Scatter = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Scatter() {
        CommonXY.call(this);
        this._tag = "div";

        this._type = "Scatter";
        this._gType = "column";
    }
    Scatter.prototype = Object.create(CommonXY.prototype);
    Scatter.prototype.constructor = Scatter;
    Scatter.prototype._class += " amchart_Scatter";
    Scatter.prototype.implements(INDChart.prototype);

    Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Scatter.prototype.publish("scatterType", "scatter", "set", "Bullet Type", ["scatter", "bubble"],{tags:["Basic"]});
    Scatter.prototype.publish("sampleData", "ordinal", "set", "Display Sample Data", ["ordinal","linear"]);

    Scatter.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Scatter.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length; i++) {
            var gRetVal = CommonXY.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj) {
            if (this.scatterType() === "bubble") {
                gObj["valueField"] = this.columns()[2];
            } else {
                delete gObj["valueField"];
            }
            return gObj;
        }
    };

    Scatter.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();

    };

    Scatter.prototype.testData = function(_) {
        this.sampleData("ordinal");
        return this;
    };

    Scatter.prototype.testDataLinear = function(_) {
        if (this.scatterType() === "scatter") {
            this.xAxisType("linear");
            this.columns(["Data X", "Data Y"]);
            this.data([
                [10, 75],
                [20, 45],
                [30, 98],
                [40, 66]
            ]);
        } else if (this.scatterType() === "bubble") {
            this.xAxisType("linear");
            this.columns(["Data X", "Data Y", "Size"]);
            this.data([
                [10, 75, 10],
                [20, 45, 12],
                [30, 98, 14],
                [40, 66, 16]
            ]);
        }
        return this;
    };

    Scatter.prototype._sampleData = Scatter.prototype.sampleData;
    Scatter.prototype.sampleData = function (_) {
        var retVal = Scatter.prototype._sampleData.apply(this, arguments);
        if (arguments.length) {
            switch (_) {
                case "ordinal":
                    // TODO need a new shape for INDchart Bubble stuff or something????? need to ask how ordinal would work with that
                    // this will get refactored in testData PR anyways
                    //this.testDataOrdinal();
                    this.xAxisType("ordinal");
                    INDChart.prototype.testData.apply(this, arguments);
                    break;
                case "linear":
                    this.testDataLinear();
                    break;
            }
        }
        return retVal;
    };

    return Scatter;
}));