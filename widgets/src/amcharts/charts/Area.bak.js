"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart", "css!./Area"], factory);
    } else {
        root.Area = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Area() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Area";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
        
    };
    
    Area.prototype = Object.create(HTMLWidget.prototype);

    Area.prototype.implements(INDChart.prototype);
    Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch());
    Area.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);
    
    Area.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    Area.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    Area.prototype.publish("isStacked", false, "boolean", "Stacked");
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);
    
    Area.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);

    Area.prototype.publish("tooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Area.prototype.publish("3dDepth", 20, "number", "3D Depth (px)");
    Area.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");
    
    Area.prototype.publish("fillAlpha", .7, "number", "Area Opacity"); // todo per graph
    Area.prototype.publish("lineAlpha", 0, "number", "Area Border Opacity"); // todo per graph
    
    Area.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    Area.prototype.publish("showGuides", false, "boolean", "Show Guides");
    Area.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Area Guides");
    
    Area.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "theme": "none",
            "type": "serial",
            "startDuration": this._startDuration,
            "dataProvider": this._data,
            "graphs": this.buildGraphsArr(),
            "depth3D": this._3dDepth,
            "angle": this._3dAngle,
            "rotate": this._orientation === "vertical",
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
        
        if(this._showGuides){
            chartOptions.guides = this.buildGuides(this._guides);
        }
        return chartOptions;
    };
    
    Area.prototype.buildGuides = function(guideArr){
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
    
    Area.prototype.buildGraphsArr = function() {
        var context = this;
        var graphsArr = [];
        this._valueField.forEach(function(vf,i){
            var gObj = {}
            gObj.balloonText = context._tooltipText;
            gObj.fillAlphas = context._fillAlpha;
            gObj.lineAlpha = context._lineAlpha;
            gObj.title = vf;
            gObj.valueField = vf;
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }
            graphsArr.push(gObj);
        });
        return graphsArr;
    }
    
    Area.prototype.formatData = function(dataArr) {
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
    
    Area.prototype.columns = function(colArr) {
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
    Area.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Area.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, 52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 66]
        ]);
        return this;
    };
    
    Area.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Area.prototype.update = function(domNode, element) {
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
    
    return Area;
}));
