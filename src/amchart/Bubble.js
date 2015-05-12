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
    }
    Bubble.prototype = Object.create(CommonXY.prototype);
    Bubble.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Bubble.prototype.publish("paletteID", "default", "set", "Palette ID", Bubble.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Bubble.prototype.publish("tooltipTemplate","[[category]]: [[value]]", "string", "Tooltip Text", null, {tags:['Intermediate']});

    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        this.buildGraphs(this._gType);
        return this._chart;
    };

    Bubble.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonXY.prototype.buildGraphObj.call(this,gType,i);
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
            if (this._type === "Bubble") {
                var fieldArr = ['value'];
                fieldArr.forEach(function(field){
                    if(typeof(this['_'+field+'Field']) !== 'undefined' && typeof(this['_'+field+'Field'][i]) !== 'undefined'){
                        gObj[field+'Field'] = this['_'+field+'Field'][i]; //for bubble
                    }
                });
            }
            return gObj;
        }
    };
    
    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bubble;
}));