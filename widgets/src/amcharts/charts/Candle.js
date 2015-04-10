"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonSerial", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Candle = factory(root.d3, root.CommonSerial, root.amcharts, root.INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Candle() {
        CommonSerial.call(this);
        this._class = "amcharts_charts_Candle";
        this._tag = "div";
        
        this._gType = "candlestick";
        
        this._openField;
        this._closeField;
    };
    
    Candle.prototype = Object.create(CommonSerial.prototype);
    Candle.prototype.implements(INDChart.prototype);

    Candle.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);

    Candle.prototype.publish("globalTooltipText",'<div style="text-align:left;"><b>[[category]]</b><br/> Open:<b>[[open]]</b> Close:<b>[[close]]</b><br/>Low:<b>[[low]]</b> High:<b>[[high]]</b></div>', "string", "Tooltip Text", null, {inputType:'textarea'});
    Candle.prototype.publish("graphTooltipText",[], "array", "Tooltip Text Array");

    Candle.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    Candle.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    Candle.prototype.publish("columnWidth", 0.62, "number", "Bar Width");

    Candle.prototype.publish("isStacked", true, "boolean", "Stacked");
    Candle.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);
    
    Candle.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC lines rather than candlestick blocks");

    Candle.prototype.testData = function() {
        this.columns(["Subject", "low", "open", "close", "high"]);
        this.data([
            ["Geography", 10, 15, 35, 40],
            ["English", 20, 25, 45, 55],
        ]);
        return this;
    };
    
    Candle.prototype.columns = function(colArr) {
        var context = this;   
        this._categoryField = colArr[0];
        this._lowField = [];
        this._openField = [];
        this._highField = [];
        this._closeField = [];
        colArr.slice(1,colArr.length).forEach(function(col,colIdx){
            switch(colIdx%4){
                case 0:
                    context._lowField.push(col);
                    break;
                case 1:
                    context._openField.push(col);
                    break;
                case 2:
                    context._closeField.push(col);
                    break;
                case 3:
                    context._highField.push(col);
                    break;
            }
        });
        this._columns = colArr;
    };
    
    Candle.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    Candle.prototype.updateChartOptions = function() {
        this._gType = this._useOhlcLines ? "ohlc" : "candlestick";
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
    }
    
    Candle.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Candle;
}));