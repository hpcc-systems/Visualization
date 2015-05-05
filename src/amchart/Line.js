"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amcharts_Line = factory(root.d3, root.amcharts_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Line() {
        CommonSerial.call(this);
        this._class = "amcharts_Line";
        this._tag = "div";
        
        this._gType = "smoothedLine";
    };
    
    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.implements(INDChart.prototype);
    
    Line.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Line.prototype._palette.switch());
    
    Line.prototype.publish("gType", "smoothedLine", "set", "Bullet Type", ["line", "column", "step", "smoothedLine"]);

    Line.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Line.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");

    Line.prototype.enter = function(domNode, element) {
        var initObj = {
            "theme": "none",
            "type": "serial",
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    Line.prototype.updateChartOptions = function() {        
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        
        // Color Palette
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;

        this.buildGraphs(this._gType);
        
        return this._chart;
    }

    Line.prototype.buildGraphs = function(gType) {
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
            // TODO: Line Specific Options
            return gObj;
        }
    }
    
    Line.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        var context = this;   

        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Line;
}));
