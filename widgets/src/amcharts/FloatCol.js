"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonSerial", "amcharts.serial", "../chart/INDChart"], factory);
    } else {
        root.amcharts_FloatCol = factory(root.d3, root.amcharts_CommonSerial, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function FloatCol() {
        CommonSerial.call(this);
        this._class = "amcharts_charts_FloatCol";
        this._tag = "div";
        
        this._gType = "column";
        
        this._openField;
        this._closeField;
    };
    FloatCol.prototype = Object.create(CommonSerial.prototype);
    FloatCol.prototype.implements(INDChart.prototype);

    FloatCol.prototype.publish("paletteGrouping", "Main", "set", "Palette Grouping",["Main","Columns"]);

    FloatCol.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    FloatCol.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    FloatCol.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    
    FloatCol.prototype.publish("3dDepth", 0, "number", "3D Depth (px)");
    FloatCol.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");

    FloatCol.prototype.publish("isStacked", true, "boolean", "Stacked");
    FloatCol.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);

    FloatCol.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    FloatCol.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    FloatCol.prototype.testData = function() {
        this.columns(["Subject", "open", "close"]);
        this.data([
            ["Geography", 15, 35],
            ["English", 25, 45],
            ["Math", 10, 35],
            ["Science", 45, 60]
        ]);
        return this;
    };
    
    FloatCol.prototype.columns = function(colArr) {
        var context = this;   
        this._categoryField = colArr[0];
        this._openField = [];
        this._closeField = [];
        colArr.slice(1,colArr.length).forEach(function(col,colIdx){
            if(colIdx%2){
                context._closeField.push(col);
            } else {
                context._openField.push(col);
            }
        });
        this._columns = colArr;
    };
    
    FloatCol.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    FloatCol.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        
        this._chart.depth3D = this._3dDepth;
        this._chart.angle = this._3dAngle;
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
    }
    
    FloatCol.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return FloatCol;
}));