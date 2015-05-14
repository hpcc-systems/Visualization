"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Line = factory(root.d3, root.amchart_CommonSerial, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, INDChart) {
    function Line() {
        CommonSerial.call(this);
        this._class = "amchart_Line";
        this._tag = "div";
        
        this._gType = "line";
    }

    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(), {tags:['Basic','Shared']});
    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    //Line.prototype.publish("gType", "smoothedLine", "set", "Bullet Type", ["line", "column", "step", "smoothedLine"],{tags:['Basic']}); should we expose and is it shared? right now its private and we need to call it via gType() if we do use it

    Line.prototype.publish("stepLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic']});
    Line.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Basic']});

    Line.prototype.enter = function(domNode, element) {
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
    };

    Line.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
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
            if (this.stepLines()) {
                gObj.type = 'step';
            } else if (this.smoothLines()) {
                gObj.type = 'smoothedLine';
            } else {
                gObj.type = 'line';
            }

            return gObj;
        }
    };
    
    Line.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Line;
}));
