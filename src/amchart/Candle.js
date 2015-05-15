"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Candle = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Candle() {
        CommonSerial.call(this);
        this._class = "amchart_Candle";
        this._tag = "div";

        this._gType = "candlestick";

        this._openField = undefined;
        this._closeField = undefined;
        this._categoryField = undefined;
        this._lowField = undefined;
        this._highField = undefined;
    }

    Candle.prototype = Object.create(CommonSerial.prototype);
    Candle.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Candle.prototype.publish("paletteID", "default", "set", "Palette ID", Candle.prototype._palette.switch(), {tags:['Basic','Shared']});
    Candle.prototype.publish("isStacked", true, "boolean", "Stack CHart", null, {tags:['Basic','Shared']});
    Candle.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});
    /**
     * Publish Params Unique To This Widget
     */
    Candle.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:['Basic']});

    Candle.prototype.publish("tooltipTemplate",'<div style="text-align:left;"><b>[[category]]</b><br/> Open:<b>[[open]]</b> Close:<b>[[close]]</b><br/>Low:<b>[[low]]</b> High:<b>[[high]]</b></div>', "string", "Tooltip Text",null,{tags:['Intermediate']});

    Candle.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars",null,{tags:['Basic']});
    Candle.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars",null,{tags:['Basic']});

    Candle.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:['Basic']});

    Candle.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});
    Candle.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines",null,{tags:['Intermediate']});

    Candle.prototype.testData = function() {
        this.columns(["Subject", "low", "open", "close", "high"]);
        this.data([
            ["Geography", 10, 15, 35, 40],
            ["English", 20, 25, 45, 55],
        ]);
        return this;
    };

    Candle.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var context = this;
        var retVal = CommonSerial.prototype.columns.apply(this, arguments);
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
        return retVal;
    };

    Candle.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Candle.prototype.updateChartOptions = function() {
        var context = this;
        this._gType = this.useOhlcLines() ? "ohlc" : "candlestick";
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue

        // Color Palette
        switch(this.paletteGrouping()) {
            case "By Category":
                this._chart.dataProvider.forEach(function(dataPoint,i){
                    context._chart.dataProvider[i].color = context._palette(i);
                    context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(i);
                });
                this._chart.colors = [];
            break;
            case "By Column":
                this._colors = [];
                this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                    context._colors.push(context._palette(i));
                });
                this._chart.colors = this._colors;
            break;
            default:
                this._colors = [];
                this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                    context._colors.push(context._palette(i));
                });
                this._chart.colors = this._colors;
            break;
        }

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Candle.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._openField) !== 'undefined' && typeof(this._openField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if (this.cylinderBars()) {
                 gObj.topRadius = this.circleRadius();
            } else {
                 gObj.topRadius = undefined;
            }

            if(this.paletteGrouping() === "By Category"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    Candle.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Candle;
}));