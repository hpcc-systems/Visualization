"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Line = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Line() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Line";
        this._tag = "div";

        this._chart = null;
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Line.prototype = Object.create(HTMLWidget.prototype);

    Line.prototype.implements(INDChart.prototype);
    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch());
//    Line.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping", ["Main", "Columns"]);

    Line.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    Line.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");

    Line.prototype.publish("isStacked", false, "boolean", "Stacked");
    Line.prototype.publish("stackType", "regular", "set", "Stack Type", ["none", "regular", "100%", "3d"]);
    
    Line.prototype.publish("yAxisTitle", "Axis title", "string", "Y-Axis Title");

    Line.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal", "vertical"]);

//    Line.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
//    Line.prototype.publish("circleRadius", 1, "number", "Circle Radius");

//    Line.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    Line.prototype.publish("bullet", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    Line.prototype.publish("bulletArr", [], "array", "Bullet Type Array");

    Line.prototype.publish("type", "smoothedLine", "set", "Bullet Type", ["line", "column", "step", "smoothedLine"]);
    Line.prototype.publish("typeArr", [], "array", "Graph Type Array");

    Line.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Line.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");

    Line.prototype.publish("globalFillAlpha", .7, "number", "Area Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Line.prototype.publish("globalLineAlpha", 0, "number", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Line.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    Line.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    

    Line.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    Line.prototype.publish("xAxisLabelRotation", 30, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range'});
    
    Line.prototype.publish("showGuides", false, "boolean", "Show Guides");
    Line.prototype.publish("guides", [["min", 20, true, true, "#ee00ff"], ["med", 40, true, true, "#ccccff"], ["max", 60, true, true, "#ff00cc"]], "array", "Bar Guides");

    // TODO break this out into its own FILE common.js
    Line.prototype.publish("dataDateFormat", null, "string", "Show Guides");
    
    
    Line.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    Line.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    Line.prototype.publish("categoryAxisAxisAlpha", 1, "number", "Axis opacity");
    //
    Line.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    Line.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    Line.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    Line.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    Line.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    // dateFormats
    // equalSpacing
    Line.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Line.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Line.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    // forceShowField
    Line.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");
    
    Line.prototype.publish("numValueAxis", 1, "number", "Grid alpha.");
    Line.prototype.publish("valueAxesId", [], "array", "");
    Line.prototype.publish("valueAxesTitle", [], "array", "");
    Line.prototype.publish("valueAxesMinimum", [], "array", "");
    Line.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    Line.prototype.publish("valueAxesAxisAxisAlpha", [], "array", "");
    
    Line.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "serial",
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "categoryField": this._categoryField,
            "startDuration": this._startDuration,
            "categoryAxis": {
                "startOnAxis": true,
//                "autoRotateAngle": 19.8,
//                "gridPosition": "start",
//                "tickPosition": "start",
                "labelRotation": this._xAxisLabelRotation
            },
            "trendLines": [],
            "graphs": [],
            "valueAxes": [],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "maxColumns": 6,
                "useGraphSettings": true
            },
            "titles": [],
        };
        this._chart.dataProvider = this.formatData(this._data);
        
        // ValueAxis
        for (var i = 0, j = this._numValueAxis; i < j; i++) {
            var valueAxisObj = {
                id:this._valueAxesId,
                title:this._valueAxesTitle
            }
            
            chartOptions.valueAxes.push(valueAxisObj);
            this._chart.valueAxes[i] = valueAxisObj;
        }
        
        this._chart.valueAxes[0].title = this._yAxisTitle;
        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);  
  
        // Build Graphs
        buildGraphs.call(this);
        
        // Other
        if(this._isStacked){
            if (typeof(this._chart.valueAxes) === 'undefined') {
                this._chart.valueAxes = [];
            }
            console.log(chartOptions.valueAxes);
            chartOptions.valueAxes[0].stackType = this._stackType;
            this._chart.valueAxes[0].stackType = this._stackType;
            console.log('blah');
            console.log(this._chart.valueAxis);
            
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
        
        return chartOptions;
    };

    Line.prototype.buildGuides = function(guideArr) {
        var retArr = [];
        guideArr.forEach(function(guide) {
            retArr.push({
                "above": guide[3],
                "dashLength": 5,
                "id": "Guide-1",
                "inside": guide[2],
                "label": guide[0],
                "labelRotation": 90,
                "lineAlpha": 1,
                "lineColor": guide[4],
                "value": guide[1],
            });
        })
        return retArr;
    }

    function buildGraphs() {
        var context = this;
        function buildGraphObj(type) {
            switch(type) {
                case "new":
                    var gObj = new AmCharts.AmGraph(); 
                break;
                case "edit":
                    var gObj = {};
                break;
            }
            // TODO: Add more Graph Params
            gObj.balloonText = context._graphTooltipText[i] || context._globalTooltipText;
            gObj.fillAlphas = context._graphFillAlpha[i] || context._globalFillAlpha;
            gObj.lineAlpha = context._graphLineAlpha[i] || context._globalLineAlpha;
            gObj.title = vf;
            gObj.valueField = vf;

            gObj.type = context._type,
            gObj.bullet =  context._bullet,
            gObj.columnWidth = context._columnWidth

            gObj.colorField = "color";

            // --
            if(typeof (context._bulletTypeArr) === 'object' && typeof (context._bulletTypeArr[i]) !== 'undefined'){
                if(context.__meta_bulletType.set.indexOf(context._bulletTypeArr[i]) !== -1){
                    gObj.bullet = context._bulletTypeArr[i];
                }
            }
            
            if (context._cylinderBars) {
                gObj.topRadius = context._circleRadius;
            }
            var optionalArr = ["bullet","type"];
            optionalArr.forEach(function(n){
                if(typeof (context['_'+n+'Arr']) === 'object' && typeof (context['_'+n+'Arr'][i]) !== 'undefined'){
                    if(context['__meta_'+n].set.indexOf(context['_'+n+'Arr'][i]) !== -1){
                        gObj[n] = context['_'+n+'Arr'][i];
                    }
                }
            });
            // --
                        
            return gObj;
        }
        // Build Graphs
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var graphLen = this._chart.graphs.length; 
        var len = Math.max(graphLen, this._valueField.length);
        
        for(var i = 0; i < len; i++) {
            if (typeof(this._valueField[i]) !== 'undefined') {
                var vf = this._valueField[i];
                
                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    console.log('edit existing graph:'+i);
                    var gObj = buildGraphObj("edit");
                    for (var key in gObj) {
                        this._chart.graphs[i][key] = gObj[key];
                    }
                } else {
                    console.log('creating new graph:'+i);
                    var gObj = buildGraphObj("new");
                    this._chart.addGraph(gObj);
                }
            } 
            else {
                console.log('deleting graph:'+i);
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }
    }
    
    Line.prototype.formatData = function(dataArr) {
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            })
            dataObjArr.push(dataObj);
        })
        return dataObjArr;
    }

    Line.prototype.columns = function(colArr) {
        var context = this;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (arguments.length) {
            this._categoryField = colArr[0];
            this._valueField = [];
            colArr.slice(1, colArr.length).forEach(function(col) {
                context._valueField.push(col);
            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };
    Line.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Line.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 3, 11],
            ["English", 23, 75, 4],
            ["Math", 98, 92, 9],
            ["Science", 66, 6, 66]
        ]);
        return this;
    };

    Line.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
            
        var initObj = {
            "theme": "none",
            "type": "serial",
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    Line.prototype.update = function(domNode, element) {
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
    
    return Line;
}));

//chart.validateData();
//chart.invalidateSize();