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
        this._tag = "div";
        this._gType = "line";
    }
    Area.prototype = Object.create(CommonSerial.prototype);
    Area.prototype.constructor = Area;
    Area.prototype._class += " amchart_Area";
    Area.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch(),{tags:['Basic','Shared']});
    Area.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
    Area.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});


    /**
     * Publish Params Unique To This Widget
     */
    Area.prototype.publish("tooltipTemplate","[[category]]: [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});

    Area.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Area.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

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
            // Area Specific Options
            gObj.fillAlphas = this.fillOpacity();
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
