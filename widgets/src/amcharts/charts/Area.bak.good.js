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
        
        this.flag = 0;
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

    Area.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Area.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Area.prototype.publish("globalFillAlpha", .7, "number", "Area Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Area.prototype.publish("globalLineAlpha", 0, "number", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Area.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    Area.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    
    Area.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    Area.prototype.publish("showGuides", false, "boolean", "Show Guides");
    
    //make guide into an array of objects
    Area.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Area Guides");
    
    
    // TODO break this out into its own FILE common.js
    Area.prototype.publish("dataDateFormat", null, "string", "Show Guides");
    
    
    Area.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    Area.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    Area.prototype.publish("categoryAxisAxisAlpha", 1, "number", "Axis opacity");
    //
    Area.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    Area.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    Area.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    Area.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    Area.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    // dateFormats
    // equalSpacing
    Area.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Area.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Area.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    // forceShowField
    Area.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");
    
    Area.prototype.publish("numValueAxis", 1, "number", "Grid alpha.");
    Area.prototype.publish("valueAxesId", [], "array", "");
    Area.prototype.publish("valueAxesTitle", [], "array", "");
    Area.prototype.publish("valueAxesMinimum", [], "array", "");
    Area.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    Area.prototype.publish("valueAxesAxisAxisAlpha", [], "array", "");
    
    
    Area.prototype.updateChartOptions = function() {
        var context = this;
        
        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        this._chart.dataDateFormat = this._dataDateFormat;
        this._chart.theme = "none";
        this._chart.type = "serial";
        this._chart.startDuration = this._startDuration;
        this._chart.rotate = this._orientation === "vertical";
        this._chart.categoryField = this._categoryField;
        this._chart.categoryAxis = {};
        this._chart.categoryAxis.autoGridCount = this._categoryAxisAutoGridCount;
        this._chart.categoryAxis.gridPosition = "start";
        this._chart.categoryAxis.autoGridCount = this._categoryAxisAxisAlpha;
        this._chart.categoryAxis.autoGridCount = this._categoryAxisGridAlpha;
        this._chart.guides = [];
         
        // Build Graphs
        buildGraphs.call(this);
        
        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 
            
        // ValueAxis
        for (var i = 1, j = this._numValueAxis; i < j; i++) {
            this._chart.valueAxes[i].id = this._valueAxesId[i],
            this._chart.valueAxes[i].title = this._valueAxesTitle[i];
        }
        //this._chart.valueAxes[i].id = this._valueAxesId[i] // causes issue
        this._chart.valueAxes[0].title = this._valueAxesTitle[i];
        
        // Color Palette
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
        
        // Others
        if(this._isStacked){
            this._chart.valueAxes[0].stackType = this._stackType;
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }
        
        if(this._chartCursor){
            this._chart.chartCursor = {};
        } else {
            if (typeof(this._chart.chartCursor)!=='undefined') {
                delete this._chart.chartCursor;
            }
        }
        
        if(this._chartScrollbar){
            this._chart.chartScrollbar = {};
        } else {
            if (typeof(this._chart.chartScrollbar)!=='undefined') {
                delete this._chart.chartScrollbar;
            }
        }
        /*
        if (this._showGuides) {
            console.log(buildGuides2(this._guides));
            
            buildGuides2(this._guides).forEach(function(guide,i) {
                console.log(guide);
                console.log(this)
                context._chart.addGuide(guide);
            });
        } else {
            
        }
        */
        return this._chart;
    };
        
    function buildGuides2(guideArr) {
        var retArr = [];
        guideArr.forEach(function(guide){
            var gObj = new AmCharts.Guide();
                    
            gObj.above = guide[3];
            gObj.dashLength = 5;
            gObj.inside = guide[2];
            gObj.label = guide[0];
            gObj.labelRotation = 90;
            gObj.lineAlpha = 1;
            gObj.lineColor = guide[4];
            gObj.value = guide[1];
            
            retArr.push(gObj);
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
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }
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
    
    
    Area.prototype.formatData = function(dataArr){
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
        
        var initObj = {
            "theme": "none",
            "type": "serial",
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        
    };

    Area.prototype.update = function(domNode, element) {
        
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';        

        this.updateChartOptions();
        
        //mergeJSON(chartOptions,this._chart);
        
        this._chart.validateNow();
        this._chart.validateData();
        this.flag++;
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
