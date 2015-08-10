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
        this._tag = "div";
        this._gType = "column";
    }
    Bar.prototype = Object.create(CommonSerial.prototype);
    Bar.prototype.implements(INDChart.prototype);
    Bar.prototype._class += " amchart_Bar";

    /**
     * Publish Params Common To Other Libraries
     */
    Bar.prototype.publish("paletteID", "default", "set", "Palette ID", Bar.prototype._palette.switch(),{tags:['Basic','Shared']});
    Bar.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
    Bar.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Bar.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:['Basic']});

    Bar.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars",null,{tags:['Basic']});
    Bar.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars",null,{tags:['Basic']});

    Bar.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:['Basic']});

    Bar.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:['Basic']});
    Bar.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    Bar.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});

    Bar.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});

    Bar.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // Stacked
        if(this.isStacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

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
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
            default:
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Bar.prototype.buildGraphs = function(gType) {
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

    Bar.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bar;
}));
