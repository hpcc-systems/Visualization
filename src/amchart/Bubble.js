"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonXY", "amcharts.xy", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Bubble = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Bubble() {
        CommonXY.call(this);
        this._class = "amchart_Bubble";
        this._tag = "div";
        
        this._type = "Bubble";
        this._gType = "column";
    };
    Bubble.prototype = Object.create(CommonXY.prototype);
    Bubble.prototype.implements(INDChart.prototype);

    Bubble.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Bubble.prototype._palette.switch());

    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
        this.buildGraphs(this._gType);
        return this._chart;
    }

    Bubble.prototype.buildGraphs = function(gType) {
        var context = this;
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length; 
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);
        
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonXY.prototype.buildGraphObj.call(this,gType,i);
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
            if (context._type == "Bubble") {
                var fieldArr = ['value'];
                fieldArr.forEach(function(field){
                    if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                        gObj[field+'Field'] = context['_'+field+'Field'][i]; //for bubble
                    }
                });
            }
            return gObj;
        }
    }
    
    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);
        var context = this;   

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bubble;
}));