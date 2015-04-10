"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart", "css!./Bar"], factory);
    } else {
        root.Bar = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Bar() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Bar";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Bar.prototype = Object.create(HTMLWidget.prototype);

    Bar.prototype.implements(INDChart.prototype);
    Bar.prototype.publish("paletteID", "default", "set", "Palette ID", Bar.prototype._palette.switch());
    Bar.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);
    
    Bar.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    Bar.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    Bar.prototype.publish("isStacked", false, "boolean", "Stacked");
    Bar.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%","3d"]);
    
    Bar.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);
    
    Bar.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    Bar.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    Bar.prototype.publish("columnWidth", 0.62, "number", "Bar Width");

//TODO: Figure out how to appropriately include the theme files for Amcharts
//    Bar.prototype.publish("amTheme", "chalk", "set", "AMCharts Theme", ["none","patterns","chalk","dark","light"]);


    Bar.prototype.publish("tooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Bar.prototype.publish("3dDepth", 20, "number", "3D Depth (px)");
    Bar.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");
    
    Bar.prototype.publish("fillAlpha", 1, "number", "Bar Opacity");
    Bar.prototype.publish("lineAlpha", 0, "number", "Bar Border Opacity");
    
    Bar.prototype.publish("startDuration", 1, "number", "Start Duration (sec)");
    
    Bar.prototype.publish("showGuides", false, "boolean", "Show Guides");
    Bar.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Bar Guides");
    
    
    //AMCharts support for lineColor doesn't seem to work without setting chart color within graph nodes
//    Bar.prototype.publish("lineColor", '#333333', "html-color", "Bar Border Color");

    Bar.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "pathToImages": "//cdn.amcharts.com/lib/3/images/",
            "theme": "none",
            "type": "serial",
            "startDuration": this._startDuration,
            "dataProvider": this._data,
            "graphs": this.buildGraphsArr(),
            "depth3D": this._3dDepth,
            "angle": this._3dAngle,
            "rotate": this._orientation === "horizontal",
            "categoryField": this._categoryField,
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0.05,
                "gridAlpha":0
            },
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Axis title"
                }
            ]
        };
        chartOptions.dataProvider = this.formatData(this._data);
        if(this._paletteGrouping === "Main"){
            chartOptions.dataProvider.forEach(function(dataPoint,i){
                chartOptions.dataProvider[i].color = context._palette(i);
            });
        } else if (this._paletteGrouping === "Columns") {
            this._colors = [];
            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                context._colors.push(context._palette(i));
            });
            chartOptions.colors = this._colors;
        }

        if(this._isStacked){
            if (typeof(this._chart.valueAxes) === 'undefined') {
                this._chart.valueAxes = [];
            }
            chartOptions.valueAxes[0].stackType = this._stackType;
        } else {
            if (typeof(this._chart.valueAxes) !== 'undefined' && this._chart.valueAxes.length > 0) {
                this._chart.valueAxes[0].stackType = "none";
            }
        }
        if(this._chartCursor){
            chartOptions.chartCursor = {};
        } else {
            if (typeof(this._chart.chartCursor)!=='undefined') {
                delete this._chart.chartCursor;
            }
        }
        if(this._chartScrollbar){
            chartOptions.chartScrollbar = {};
        } else {
            if (typeof(this._chart.chartScrollbar)!=='undefined') {
                delete this._chart.chartScrollbar;
            }
        }
        
        // not working
        if(this._showGuides){
            chartOptions.guides = this.buildGuides(this._guides);
        } else {
            delete this._chart.guides ;
        }
        return chartOptions;
    };
    
    Bar.prototype.buildGuides = function(guideArr){
        var retArr = [];
        guideArr.forEach(function(guide){
            retArr.push({
                "above": guide[3],
                "dashLength": 5,
                "id": "Guide-1",
                "inside": guide[2],
                "label": guide[0],
                "labelRotation": 90,
                "lineAlpha": 1,
                "lineColor": guide[4],
                "value": guide[1]
            });
        })
        return retArr;
    }
    
    //Format our standard data/columns format into the format that AMCharts expects
    Bar.prototype.buildGraphsArr = function(){
        var context = this;
        var graphsArr = [];
        this._valueField.forEach(function(vf,i){
            var gObj = {
                "balloonText": context._tooltipText,
                "fillAlphas": context._fillAlpha,
                "lineAlpha": context._lineAlpha,
                "title": vf,
                "type": "column",
                "valueField": vf,
                "columnWidth": context._columnWidth
            };
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }
            if(context._cylinderBars){
                gObj.topRadius = context._circleRadius;
            } else {
                if (context._chart.hasOwnProperty("graphs")) {
                    delete context._chart.graphs[i].topRadius;
                }
            }
            graphsArr.push(gObj);
        });
        return graphsArr;
    }
    Bar.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            })
            dataObjArr.push(dataObj);
        })
        return dataObjArr;
    }
    
    Bar.prototype.columns = function(colArr) {
        var context = this;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (arguments.length) {
            this._categoryField = colArr[0];
            this._valueField = [];
            colArr.slice(1,colArr.length).forEach(function(col){
                context._valueField.push(col);
            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };
    Bar.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Bar.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 3, 11],
            ["English", 23, 75, 4],
            ["Math", 98, 92, 9],
            ["Science", 66, 6, 66]
        ]);
        return this;
    };
    
    Bar.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Bar.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        mergeJSON(chartOptions,this._chart);
        
        this._chart.validateNow();
        this._chart.validateData();
        
        //TODO: REMOVE THIS when we're using the licensed version...
        document.getElementsByTagName('svg')[0].nextElementSibling.innerHTML = '';
    };
    
    function mergeJSON(source1,source2){
        var mergedJSON = source2;
        for (var attrname in source1) {
            if(mergedJSON.hasOwnProperty(attrname)) {
                if(source1[attrname] != null && typeof(source1[attrname]) === 'object'){
                    mergeJSON(source1[attrname], mergedJSON[attrname]);
                } else {
                    mergedJSON[attrname] = source1[attrname];
                }
            } else {
                mergedJSON[attrname] = source1[attrname];
            }
        }
    }
    
    return Bar;
}));

//chart.validateData();
//chart.invalidateSize();