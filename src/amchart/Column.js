"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Column"], factory);
    } else {
        root.amchart_Column = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Column() {
        CommonSerial.call(this);

        this._tag = "div";
        this._gType = "column";

        this.orientation("horizontal");
    }
    Column.prototype = Object.create(CommonSerial.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " amchart_Column";
    Column.prototype.implements(INDChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Column.prototype.publish("stacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Column.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});

    Column.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars",null,{tags:["Basic"]});
    Column.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars",null,{tags:["Basic"]});

    Column.prototype.publish("columnWidth", 0.62, "number", "Column Width",null,{tags:["Basic"]});

    Column.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Column.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Column.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%","3d"],{tags:["Basic"]});
    Column.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines",null,{tags:["Intermediate"]});

    Column.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Column.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        if (this._rangeType === "candle-ohlc") {
            this._gType = this.useOhlcLines() ? "ohlc" : "candlestick";
        } else {
            this._gType = "column";
        }

        this.buildGraphs(this._gType);

        // Stacked
        if(this.stacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false;

        return this._chart;
    };

    Column.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if (this.cylinderBars()) {
                 gObj.topRadius = this.circleRadius();
            } else {
                 gObj.topRadius = undefined;
            }
            
            if (this._rangeType === "normal") {
                gObj.openField = "openField" + i;
                gObj.valueField = "valueField" + i;
            }
            if (this._rangeType === "candle-ohlc") {
                gObj.lowField = "lowField" + i;
                gObj.openField = "openField" + i;
                gObj.closeField = "closeField" + i;
                gObj.highField = "highField" + i;
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    Column.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Column;
}));
