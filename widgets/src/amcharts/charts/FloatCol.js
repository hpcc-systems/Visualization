"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Bar = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function FloatCol() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Bar";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._openField;
        this._closeField;
        this._categoryField;
        this._colors = [];
    }
    ;
    FloatCol.prototype = Object.create(HTMLWidget.prototype);

    FloatCol.prototype.implements(INDChart.prototype);
    FloatCol.prototype.publish("paletteID", "Dark2", "set", "Palette ID", FloatCol.prototype._palette.switch());
    FloatCol.prototype.publish("paletteGrouping", "Main", "set", "Palette Grouping",["Main","Columns"]);
    
    FloatCol.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    FloatCol.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    FloatCol.prototype.publish("isStacked", true, "boolean", "Stacked");
    FloatCol.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%","3d"]);
    
    FloatCol.prototype.publish("orientation", "vertical", "set", "Orientation",["horizontal","vertical"]);
    
    FloatCol.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    FloatCol.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    FloatCol.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    
    FloatCol.prototype.publish("axisTitle", "Axis title", "string", "Bar Width");

//TODO: Figure out how to appropriately include the theme files for Amcharts
//    Bar.prototype.publish("amTheme", "chalk", "set", "AMCharts Theme", ["none","patterns","chalk","dark","light"]);


    FloatCol.prototype.publish("tooltipText","open:[[open]] close:[[close]]", "string", "Tooltip Text");
    
    FloatCol.prototype.publish("3dDepth", 5, "number", "3D Depth (px)");
    FloatCol.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");
    
    FloatCol.prototype.publish("fillAlpha", 1, "number", "Bar Opacity");
    FloatCol.prototype.publish("lineAlpha", 0, "number", "Bar Border Opacity");
    
    FloatCol.prototype.publish("startDuration", 1, "number", "Start Duration (sec)");
    
    FloatCol.prototype.publish("showGuides", false, "boolean", "Show Guides");
    FloatCol.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Bar Guides");
    
    //AMCharts support for lineColor doesn't seem to work without setting chart color within graph nodes
//    Bar.prototype.publish("lineColor", '#333333', "html-color", "Bar Border Color");

    FloatCol.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "theme": "none",
            "startDuration": this._startDuration,
            "type": "serial",
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
                    "title": this._axisTitle
                }
            ],
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
            console.log(this._chart);
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
    
    FloatCol.prototype.buildGuides = function(guideArr){
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
    FloatCol.prototype.buildGraphsArr = function(){
        var context = this;
        var graphsArr = [];
//        this._valueField.forEach(function(vf,i){
            var gObj = {
                "balloonText": context._tooltipText,
                "fillAlphas": context._fillAlpha,
                "lineAlpha": context._lineAlpha,
                "openField":this._openField,
                "closeField":this._closeField,
                "type": "column",
                "valueField": "Not set",
                "columnWidth": context._columnWidth
            };
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }
            if(context._cylinderBars){
                gObj.topRadius = context._circleRadius;
            } else {
                if (context._chart.hasOwnProperty("graphs")) {
                    delete context._chart.graphs[0].topRadius;
                }
            }
            graphsArr.push(gObj);
//        });
        return graphsArr;
    }
    FloatCol.prototype.formatData = function(dataArr){
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
    
    FloatCol.prototype.columns = function(colArr) {
        var context = this;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (arguments.length) {
            if(colArr.length !== 3){
                console.error('FloatCol expects 3 columns');
                console.log('colArr:');
                console.log(colArr);
                return retVal;
            }
            this._categoryField = colArr[0];
            this._openField = colArr[1];
            this._closeField = colArr[2];
//            this._valueField = [];
//            colArr.slice(1,colArr.length).forEach(function(col){
//                context._valueField.push(col);
//            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };
    FloatCol.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    FloatCol.prototype.testData = function() {
        this.columns(["Subject", "open", "close"]);
//        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 15, 35],
            ["English", 25, 45],
            ["Math", 10, 35],
            ["Science", 45, 60]
//            ["Geography", 75, 3, 11],
//            ["English", 23, 75, 4],
//            ["Math", 98, 92, 9],
//            ["Science", 66, 6, 66]
        ]);
        return this;
    };
    
    FloatCol.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();

        this._chart = AmCharts.makeChart(domNode, chartOptions);
        
    };

    FloatCol.prototype.update = function(domNode, element) {
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
    
    return FloatCol;
}));

//chart.validateData();
//chart.invalidateSize();