"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Common = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }

}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Common() {
        HTMLWidget.call(this);
        //this._class = "amcharts_charts_Common";
        this._tag = "div";

        //this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
        
        this.flag = 0;
    };
    
    Common.prototype = Object.create(HTMLWidget.prototype);

    Common.prototype.implements(INDChart.prototype);
    Common.prototype.publish("paletteID", "default", "set", "Palette ID", Common.prototype._palette.switch());
    Common.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);
    
    Common.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    Common.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    Common.prototype.publish("isStacked", false, "boolean", "Stacked");
    Common.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);
    
    Common.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);

    Common.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Common.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Common.prototype.publish("globalFillAlpha", .7, "number", "Area Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Common.prototype.publish("globalLineAlpha", 0, "number", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    Common.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    Common.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    
    Common.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    Common.prototype.publish("showGuides", false, "boolean", "Show Guides");
    
    //make guide into an array of objects
    Common.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Area Guides");
    
    // TODO break this out into its own FILE common.js
    Common.prototype.publish("dataDateFormat", null, "string", "Show Guides");
    
    Common.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    Common.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    Common.prototype.publish("categoryAxisAxisAlpha", 1, "number", "Axis opacity");
    //
    Common.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    Common.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    Common.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    Common.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    Common.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    // dateFormats
    // equalSpacing
    Common.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Common.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    Common.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    // forceShowField
    Common.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");
    
    Common.prototype.publish("numValueAxis", 1, "number", "Grid alpha.");
    Common.prototype.publish("valueAxesId", [], "array", "");
    Common.prototype.publish("valueAxesTitle", [], "array", "");
    Common.prototype.publish("valueAxesMinimum", [], "array", "");
    Common.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    Common.prototype.publish("valueAxesAxisAxisAlpha", [], "array", "");
    
    
    Common.prototype.updateChartOptions = function() {
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
        
        return this._chart;
    };
    
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
    
    Common.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Common.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 
        
        this._palette = this._palette.switch(this._paletteID);
        
        this.updateChartOptions();
        
        this._chart.validateNow(); // magic
        this._chart.validateData();
        
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
    
    return Common;
}));
