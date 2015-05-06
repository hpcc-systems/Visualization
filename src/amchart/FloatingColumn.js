"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_FloatingColumn = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function FloatingColumn() {
        CommonSerial.call(this);
        this._class = "amchart_FloatingColumn";
        this._tag = "div";
        
        this._gType = "column";
        
        this._openField;
        this._closeField;
    };
    FloatingColumn.prototype = Object.create(CommonSerial.prototype);
    FloatingColumn.prototype.implements(INDChart.prototype);

    FloatingColumn.prototype.publish("paletteGrouping", "Main", "set", "Palette Grouping",["Main","Columns"]);

    FloatingColumn.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    FloatingColumn.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    FloatingColumn.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    
    FloatingColumn.prototype.publish("3dDepth", 0, "number", "3D Depth (px)");
    FloatingColumn.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");

    FloatingColumn.prototype.publish("isStacked", true, "boolean", "Stacked");
    FloatingColumn.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);

    FloatingColumn.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    FloatingColumn.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    FloatingColumn.prototype.testData = function() {
        this.columns(["Subject", "open", "close"]);
        this.data([
            ["Geography", 15, 35],
            ["English", 25, 45],
            ["Math", 10, 35],
            ["Science", 45, 60]
        ]);
        return this;
    };
    
    FloatingColumn.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = CommonSerial.prototype.columns.apply(this, arguments);
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
    
    FloatingColumn.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    FloatingColumn.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        
        this._chart.depth3D = this._3dDepth;
        this._chart.angle = this._3dAngle;
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
    }
    
    FloatingColumn.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return FloatingColumn;
}));