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
        this._tag = "div";

        this._gType = "column";
    }
    FloatingColumn.prototype = Object.create(CommonSerial.prototype);
    FloatingColumn.prototype.constructor = FloatingColumn;
    FloatingColumn.prototype._class += " amchart_FloatingColumn";
    FloatingColumn.prototype.implements(INDChart.prototype);

    FloatingColumn.prototype.publish("paletteID", "Dark2", "set", "Palette ID", FloatingColumn.prototype._palette.switch(), {tags:["Basic","Shared"]});
    FloatingColumn.prototype.publish("isStacked", true, "boolean", "Stacked", null, {tags:["Basic","Shared"]});
    FloatingColumn.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});

    FloatingColumn.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:["Intermediate"]});

    FloatingColumn.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:["Basic"]});

    FloatingColumn.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    FloatingColumn.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    FloatingColumn.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:["Basic"]});
    FloatingColumn.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Intermediate"]});

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
        var context = this;
        this._categoryField = colArr[0];
        this._openField = [];
        this._closeField = [];
        this._valueField = [];
        colArr.slice(1,colArr.length).forEach(function(col,colIdx){
            if(colIdx % 2) {
                context._closeField.push(col);
                context._valueField.push(col);
            } else {
                context._openField.push(col);
            }
        });
        this._columns = colArr;

        return this;
    };

    FloatingColumn.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    FloatingColumn.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
        var context = this;

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

        this.buildGraphs(this._gType);
    };

    FloatingColumn.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === "undefined") { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._openField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._openField) !== "undefined" && typeof(this._openField[i]) !== "undefined")) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== "undefined") {
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

            if(this.paletteGrouping() === "By Category"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    FloatingColumn.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return FloatingColumn;
}));