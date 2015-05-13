"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Area"], factory);
    } else {
        root.amchart_Area = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Area() {
        CommonSerial.call(this);
        this._class = "amchart_Area";
        this._tag = "div";
       
        this._gType = "line";
    }
    Area.prototype = Object.create(CommonSerial.prototype);
    Area.prototype.implements(INDChart.prototype);
    
    Area.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Area.prototype._palette.switch());

    Area.prototype.publish("globalTooltipText","[[category]]: [[value]]", "string", "Tooltip Text");
    Area.prototype.publish("graphTooltipText",["[[category]]: [[value]]"], "array", "Tooltip Text Array");
    
    Area.prototype.publish("isStacked", false, "boolean", "Stacked");
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);
    
    Area.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Area.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
            
        // Stacked
        if(this.isStacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }
        
        this.buildGraphs(this._gType);
        
        return this._chart;        
    };
    
    Area.prototype.buildGraphs = function(gType) {
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
    };
    
    Area.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Area;
}));
