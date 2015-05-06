"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Bar = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Bar() {
        CommonSerial.call(this);
        this._class = "amchart_Bar";
        this._tag = "div";
        
        this._gType = "column";
    };
    Bar.prototype = Object.create(CommonSerial.prototype);
    Bar.prototype.implements(INDChart.prototype);
    
    Bar.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Bar.prototype._palette.switch());
    Bar.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);

    Bar.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    Bar.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    Bar.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    
    Bar.prototype.publish("Depth3D", 20, "number", "3D Depth (px)");
    Bar.prototype.publish("Angle3D", 45, "number", "3D Angle (Deg)");

    Bar.prototype.publish("isStacked", false, "boolean", "Stacked");
    Bar.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);

    Bar.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Bar.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Bar.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    Bar.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        
        // Color Palette
        if(this.paletteGrouping() === "Main"){
            this._chart.dataProvider.forEach(function(dataPoint,i){
                context._chart.dataProvider[i].color = context._palette(i);
                context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(i);
            });
            this._chart.colors = [];
        } else if (this.paletteGrouping() === "Columns") {
            this._colors = [];
            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                context._colors.push(context._palette(i));
            });
            this._chart.colors = this._colors;
        } else { 
            this._colors = [];
            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                context._colors.push(context._palette(i));
            });
            this._chart.colors = this._colors;
        }
        
        // Stacked
        if(this.isStacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
        
        this.buildGraphs(this._gType);
        
        return this._chart;
    }
    
    Bar.prototype.buildGraphs = function(gType) {
        var context = this;
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length; 
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);
        
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj(gRetVal);
                
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
            if (context.columnWidth()) {
                gObj.columnWidth = context.columnWidth();
            }

            if (context.cylinderBars()) {
                 gObj.topRadius = context.circleRadius();
            } else {
                 gObj.topRadius = undefined;
            }

            return gObj;
        }
    }
    
    Bar.prototype.update = function(domNode, element) {
        this.updateChartOptions();
        CommonSerial.prototype.update.apply(this, arguments);
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Bar;
}));
