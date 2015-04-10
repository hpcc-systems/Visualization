"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Bar = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Candle() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Candle";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Candle.prototype = Object.create(HTMLWidget.prototype);

    Candle.prototype.implements(INDChart.prototype);
    Candle.prototype.publish("paletteID", "default", "set", "Palette ID", Candle.prototype._palette.switch());
    Candle.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);
    
    Candle.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    Candle.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    Candle.prototype.publish("isStacked", false, "boolean", "Stacked");
    Candle.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%","3d"]);
    
    Candle.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);
    
    Candle.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    Candle.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    Candle.prototype.publish("columnWidth", 0.62, "number", "Bar Width");

//TODO: Figure out how to appropriately include the theme files for Amcharts
//    Bar.prototype.publish("amTheme", "chalk", "set", "AMCharts Theme", ["none","patterns","chalk","dark","light"]);


    Candle.prototype.publish("tooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Candle.prototype.publish("3dDepth", 20, "number", "3D Depth (px)");
    Candle.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");
    
    Candle.prototype.publish("fillAlpha", 1, "number", "Bar Opacity");
    Candle.prototype.publish("lineAlpha", 0, "number", "Bar Border Opacity");
    
    Candle.prototype.publish("startDuration", 1, "number", "Start Duration (sec)");
    
    Candle.prototype.publish("showGuides", false, "boolean", "Show Guides");
    Candle.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Bar Guides");
    
    
    //AMCharts support for lineColor doesn't seem to work without setting chart color within graph nodes
//    Bar.prototype.publish("lineColor", '#333333', "html-color", "Bar Border Color");

    Candle.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "serial",
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true
            },
            "chartCursor": {},
            "chartScrollbar": {
                "graph": "g1",
                "graphType": "line",
                "scrollbarHeight": 30
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                    "closeField": "close",
                    "fillAlphas": 0.9,
                    "fillColors": "#7f8da9",
                    "highField": "high",
                    "id": "g1",
                    "lineColor": "#7f8da9",
                    "lowField": "low",
                    "negativeFillColors": "#db4c3c",
                    "negativeLineColor": "#db4c3c",
                    "openField": "open",
                    "title": "Price:",
                    "type": "candlestick",
                    "valueField": "close"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
        //	"dataProvider": []
        };
        chartOptions.dataProvider = this.formatData(this._data);
//        if(this._paletteGrouping === "Main"){
//            chartOptions.dataProvider.forEach(function(dataPoint,i){
//                chartOptions.dataProvider[i].color = context._palette(i);
//            });
//        } else if (this._paletteGrouping === "Columns") {
//            this._colors = [];
//            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
//                context._colors.push(context._palette(i));
//            });
//            chartOptions.colors = this._colors;
//        }
//        if(this._isStacked){
//            chartOptions.valueAxes[0].stackType = this._stackType;
//        }
//        if(this._chartCursor){
//            chartOptions.chartCursor = {};
//        }
//        if(this._chartScrollbar){
//            chartOptions.chartScrollbar = {};
//        }
//        if(this._showGuides){
//            chartOptions.guides = this.buildGuides(this._guides);
//        }
        return chartOptions;
    };
    
    Candle.prototype.buildGuides = function(guideArr){
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
    Candle.prototype.buildGraphsArr = function(){
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
            }
            graphsArr.push(gObj);
        });
        return graphsArr;
    }
    Candle.prototype.formatData = function(dataArr){
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
    
    Candle.prototype.columns = function(colArr) {
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
    Candle.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Candle.prototype.testData = function() {
        this.columns(["date", "open", "high", "low", "close"]);
        this.data([
            ["2011-08-01","136.65","136.96","134.15","136.49"],
            ["2011-08-02","135.26","135.95","131.50","131.85"],
            ["2011-08-05","132.90","135.27","128.30","135.25"],
            ["2011-08-06","134.94","137.24","132.63","135.03"],
            ["2011-08-07","136.76","136.86","132.00","134.01"],
            ["2011-08-08","131.11","133.00","125.09","126.39"],
            ["2011-08-09","123.12","127.75","120.30","125.00"],
            ["2011-08-12","128.32","129.35","126.50","127.79"]
        ]);
        return this;
    };
    
    Candle.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        //this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Candle.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        //mergeJSON(chartOptions,this._chart);
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);

        //this._chart.validateNow();
        //this._chart.validateData();
        
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
    
    return Candle;
}));

//chart.validateData();
//chart.invalidateSize();