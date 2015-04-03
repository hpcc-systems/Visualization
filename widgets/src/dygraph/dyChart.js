"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "../chart/INDChart", "d3/d3", "dygraphs"], factory);
    } else {
        root.Entity = factory(root.HTMLWidget,root.INDChart, root.d3, root.Palette, root.dygraphs);
    }
}(this, function (HTMLWidget,INDChart, d3, Palette) {

    function dyChart() {
        HTMLWidget.call(this);
        this._class = "dygraph_dyChart";
        this._tag = "div";

        this._chart = null;
        
        this._customOptions = {
            options: {
                
            },
            overwrite: false
        }
        
    };
    
    dyChart.prototype = Object.create(HTMLWidget.prototype);
    dyChart.prototype.implements(INDChart.prototype);   
    
    dyChart.prototype.dataHandler = null;
    dyChart.prototype.annotationClickHandler = null;
    dyChart.prototype.annotationDblClickHandler = null;
    dyChart.prototype.annotationMouseOutHandler = null;
    dyChart.prototype.annotationMouseOverHandler = null;
    
    dyChart.prototype.axisLabelFormatter = {
       x: null, // function place holder
       y: null,
       y2: null
    };
    dyChart.prototype.ticker = {
       x: null, // function place holder
       y: null,
       y2: null
    };
    dyChart.prototype.valueFormatter = {
       x: null, // function place holder
       y: null,
       y2: null
    };
    
    // TODO
    dyChart.prototype.xValueParser = null; //effects CSV only
    dyChart.prototype.clickCallback = null;
    dyChart.prototype.highlightCallback = null;
    dyChart.prototype.pointClickCallback = null;
    dyChart.prototype.drawCallback = null;
    dyChart.prototype.underlayCallback = null;
    dyChart.prototype.unhighlightCallback = null;
    dyChart.prototype.zoomCallback = null;
    dyChart.prototype.drawHighlightPointCallback = null;
    dyChart.prototype.drawPointCallback = null;
    dyChart.prototype.plotter = null;
   
    //dyChart.prototype.publish("showInRangeSelector", null, "boolean", "");
    //dyChart.prototype.publish("labelsFromColumns", true, "boolean", "000"); // cant find the docs on this one
    //dyChart.prototype.publish("valueRange", [], "array", "");
    
    //TODO dyChart.prototype.publish("color", [,,[]], "array", '{type:"custom-html-color"}');
    //TODO dyChart.prototype.publish("colorValue", [,,[]], "array", '{type:"custom-number"}');
    
    dyChart.prototype.publish("paletteID", "default", "set", "Palette ID", dyChart.prototype._palette.switch());
    dyChart.prototype.publish("dateWindow", [], "array", ""); // ??
    dyChart.prototype.publish("series", [], "array", "List of series");
    //dyChart.prototype.publish("axesList", ['x','y','y2'], "array", "List of series"); HARD CODED
    dyChart.prototype.publish("colorSaturation", null, "number", "");
    dyChart.prototype.publish("rollPeriod", 1, "number", "Number of days in which to average data");
    dyChart.prototype.publish("showRangeSelector", false, "boolean", "000");
    dyChart.prototype.publish("legend", "onmouseover", "set", "Legend Options", ["onmouseover", "always", "follow"]); // onmouseover? option
    dyChart.prototype.publish("showRoller", false, "boolean", "000");

    // Axis    
    dyChart.prototype.publish("axisLabelColor_x", "#000000", "html-color", "");
    dyChart.prototype.publish("axisLabelColor_y", "#000000", "html-color", "");
    dyChart.prototype.publish("axisLabelColor_y2", "#000000", "html-color", "");
    
    dyChart.prototype.publish("axisLabelFontSize_x", 14, "number", "");
    dyChart.prototype.publish("axisLabelFontSize_y", 14, "number", "");
    dyChart.prototype.publish("axisLabelFontSize_y2", 14, "number", "");

    dyChart.prototype.publish("axisLabelWidth_x", 60, "number", "");
    dyChart.prototype.publish("axisLabelWidth_y", 50, "number", "");
    
    dyChart.prototype.publish("axisLineColor_x", "#000000", "html-color", "");
    dyChart.prototype.publish("axisLineColor_y", "#000000", "html-color", "");
    dyChart.prototype.publish("axisLineColor_y2", "#000000", "html-color", "");
    
    dyChart.prototype.publish("axisLineWidth_x", 0.3, "number", "");
    dyChart.prototype.publish("axisLineWidth_y", 0.3, "number", "");
    
    dyChart.prototype.publish("axisTickSize_x", 3, "number", "");
    dyChart.prototype.publish("axisTickSize_y", 3, "number", "");
    
    dyChart.prototype.publish("drawAxesAtZero", false, "boolean", "");

    dyChart.prototype.publish("drawAxis_x", true, "boolean", "");
    dyChart.prototype.publish("drawAxis_y", true, "boolean", "");
    dyChart.prototype.publish("drawAxis_y2", false, "boolean", "");
    
    dyChart.prototype.publish("includeZero", false, "boolean", "");
    
    dyChart.prototype.publish("independentTicks_y", true, "boolean", ""); // only ys
    dyChart.prototype.publish("independentTicks_y2", false, "boolean", "");
    
    dyChart.prototype.publish("gridLineWidth_x", 0.3, "number", "");
    dyChart.prototype.publish("gridLineWidth_y", 0.3, "number", "");
    
    dyChart.prototype.publish("labelsUTC", false, "boolean", "");
    
    dyChart.prototype.publish("labelsKMB_y", false, "boolean", "");
    dyChart.prototype.publish("labelsKMB_y2", false, "boolean", "");
    
    dyChart.prototype.publish("labelsKMG2_y", false, "boolean", "");
    dyChart.prototype.publish("labelsKMG2_y2", false, "boolean", "");
    
    dyChart.prototype.publish("logscale", false, "boolean", "");
    dyChart.prototype.publish("panEdgeFraction", null, "number", "");

    dyChart.prototype.publish("pixelsPerLabel_x", 70, "number", "");
    dyChart.prototype.publish("pixelsPerLabel_y", 30, "number", "");
    
    dyChart.prototype.publish("xAxisHeight", null, "number", ""); // make an inject 
    dyChart.prototype.publish("xRangePad", 0, "number", "");
    dyChart.prototype.publish("yRangePad", null, "number", "");
    
    // CSV parsing 
    dyChart.prototype.publish("errorBars", false, "boolean", "000");
    dyChart.prototype.publish("fractions", false, "boolean", "000");
    dyChart.prototype.publish("customBars", false, "boolean", "000"); // only works with certain data
    dyChart.prototype.publish("delimiter", ",", "string", "Chart Title");

    // Chart labels
    dyChart.prototype.publish("title", "", "string", "Chart Title");
    dyChart.prototype.publish("titleHeight", 18, "number", "Chart Title Height");
    
    // Config
    dyChart.prototype.publish("plugins", [], "array", "");
    
    // Data Line display
    dyChart.prototype.publish("connectSeparatedPoints", false, "boolean", "");
    dyChart.prototype.publish("drawGapEdgePoints", false, "boolean", "");

    dyChart.prototype.publish("drawPoints", [false], "array", "series-boolean");
    dyChart.prototype.publish("fillGraph", [false],"array", 'series-boolean');

    dyChart.prototype.publish("pointSize", [], "array", "series-number"); // todo global def: 1.0
    
    dyChart.prototype.publish("stackedGraph", false, "boolean", "");
    dyChart.prototype.publish("stackedGraphNaNFill", "all", "set",null,["all","inside","none"]);
    dyChart.prototype.publish("stepPlot", [], "array", "series-boolean");
    dyChart.prototype.publish("strokeBorderColor", [], "array", "series-html-color"); // todo global def: #FFFFFF
    dyChart.prototype.publish("strokeBorderWidth", [], "array", "series-number"); // todo global def: null
    dyChart.prototype.publish("strokePattern", [], "array", "series-array");
    dyChart.prototype.publish("strokeWidth", [], "array", "series-number"); //// todo global def: 1.0
    
    // Other misc.
    dyChart.prototype.publish("sigma", 2.0, "number", "");
    dyChart.prototype.publish("fillAlpha", 0.15, "number", "");
    dyChart.prototype.publish("wilsonInterval", false, "boolean", "");
     
    dyChart.prototype.publish("yLabelWidth", 18.0, "number", "");
    dyChart.prototype.publish("y2Label", "", "string", "");
    dyChart.prototype.publish("xLabel", "", "string", "");    
    dyChart.prototype.publish("xLabelHeight", 18, "number", "Chart Title Height");
    dyChart.prototype.publish("yLabel", "", "string", "Y-Axis Label");

    // Grid

    dyChart.prototype.publish("drawGrid_x", true, "boolean", "");
    dyChart.prototype.publish("drawGrid_y", true, "boolean", "");
    dyChart.prototype.publish("drawGrid_y2", false, "boolean", "");
    
    dyChart.prototype.publish("gridLineColor_x", "#808080", "html-color", "");
    dyChart.prototype.publish("gridLineColor_y", "#808080", "html-color", "");
    dyChart.prototype.publish("gridLinePattern", [], "array", "");

    // Interactive Elements

    dyChart.prototype.publish("animatedZooms", false, "boolean", "");
    dyChart.prototype.publish("hideOverlayOnMouseOut", false, "boolean", "");
    dyChart.prototype.publish("highlightCircleSize", [3], "array", "series-number");
    dyChart.prototype.publish("highlightSeriesBackgroundAlpha", 0.5, "number", "");

    dyChart.prototype.publish("rangeSelectorHeight", 40, "number", "");
    dyChart.prototype.publish("rangeSelectorPlotFillColor", "#A7B1C4", "html-color", "");
    dyChart.prototype.publish("rangeSelectorPlotStrokeColor", "#808FAB", "html-color", "");

    dyChart.prototype.publish("showLabelsOnHighlight", true, "boolean", "");
    dyChart.prototype.publish("labelsDivWidth", 250, "number", "");
    dyChart.prototype.publish("labelsSeparateLines", false, "boolean", "");
    dyChart.prototype.publish("labelsShowZeroValues", true, "boolean", "");
    dyChart.prototype.publish("rightGap", 5.0, "number", "");
    dyChart.prototype.publish("digitsAfterDecimal", 2.0, "number", "");
    dyChart.prototype.publish("maxNumberWidth", 6, "number", "");
    dyChart.prototype.publish("sigFigs", null, "number", ""); 
     
    dyChart.prototype.enter = function (domNode, element) {
        this._chart = new Dygraph(domNode,[[0]],{width:this.width(),height:this.height()}); // our weird way of init with 0 data ... width and height must be set on init (div size overrides)
    };  
    
    dyChart.prototype.getChartOptions = function () {
        var chartOptions = { 
            'file': this._data,
            'height': this.width(),
            'width': this.height(),
            'plotter': this.plotter,
            'legend': this.legend(),
            'rightGap': this.rightGap(),
            'title': this.title(),
            'titleHeight': this.titleHeight(),
            'showRoller': this.showRoller(),
            'rollPeriod': this.rollPeriod(),
            'ylabel': this.yLabel(),
            'yLabelWidth': this.yLabelWidth(),
            'y2label': this.y2Label(),
            'xlabel': this.xLabel(),
            'xLabelHeight': this.xLabelHeight(),
            'labelsDiv': null,
            //'labelsDivStyles': {
            //    //'textAlign': 'right'
            //},
            //'visibility': [false,true,true], DOES NOT WORK FREEZES WIDGET
            //'interactionModel': this.interactionModel(),
            //'highlightSeriesOpts': this.highlightSeriesOpts(),
            // ----
            //'drawPoints': this._drawPoints[0] !== undefined ?  this._drawPoints[0] : this['__meta_'+'drawPoints'].defaultValue[0],
            //'fillGraph': this._fillGraph[0] !== undefined ?  this._fillGraph[0] : this['__meta_'+'fillGraph'].defaultValue[0],
            //'highlightCircleSize': this._highlightCircleSize[0] !== undefined ?  this._highlightCircleSize[0] : this['__meta_'+'highlightCircleSize'].defaultValue[0],
            //'labelsKMG2': this._labelsKMG2[0] !== undefined ?  this._labelsKMG2[0] : this['__meta_'+'labelsKMG2'].defaultValue[0],
            //'labelsKMB': this._labelsKMB[0] !== undefined ?  this._labelsKMB[0] : this['__meta_'+'labelsKMB'].defaultValue[0],
            //'stepPlot': this._stepPlot[0] !== undefined ?  this._stepPlot[0] : this['__meta_'+'stepPlot'].defaultValue[0],
            //'strokeWidth': this._strokeWidth[0] !== undefined ?  this._strokeWidth[0] : this['__meta_'+'strokeWidth'].defaultValue[0],
            //'strokeBorderWidth': this._strokeBorderWidth[0] !== undefined ?  this._strokeBorderWidth[0] : this['__meta_'+'strokeBorderWidth'].defaultValue[0],
            //'strokeBorderColor' : this._strokeBorderColor[0] !== undefined ?  this._strokeBorderColor[0] : this['__meta_'+'strokeBorderColor'].defaultValue[0],
            //'pointSize': this._pointSize[0] !== undefined ?  this._pointSize[0] : this['__meta_'+'pointSize'].defaultValue[0],            
            'showLabelsOnHighlight': this.showLabelsOnHighlight(),
            'hideOverlayOnMouseOut': this.hideOverlayOnMouseOut(),
            'labelsDivWidth': this.labelsDivWidth(),
            'labelsSeparateLines': this.labelsSeparateLines(),
            'labelsShowZeroValues': this.labelsShowZeroValues(),
            'showRangeSelector': this.showRangeSelector(),
            'rangeSelectorHeight': this.rangeSelectorHeight(),
            'rangeSelectorPlotFillColor': this.rangeSelectorPlotFillColor(),
            'rangeSelectorPlotStrokeColor': this.rangeSelectorPlotStrokeColor(),
            'errorBars': this.errorBars(),
            'fractions': this.showRangeSelector(),
            'customBars': this.customBars(),
            'sigma': this.sigma(),
            'fillAlpha': this.fillAlpha(),
            'connectSeparatedPoints': this.connectSeparatedPoints(),
            'drawGapEdgePoints': this.drawGapEdgePoints(),
            'stackedGraphNaNFill': this.stackedGraphNaNFill(),
            'stackedGraph': this.stackedGraph(),
            'drawAxesAtZero': this.drawAxesAtZero(), // might be used diff doesnt work here .. so far doc says its used here
            'includeZero': this.includeZero(),
            'labelsUTC': this.labelsUTC(),
            'logscale': this.logscale(),
            'panEdgeFraction': this.panEdgeFraction(),
            'maxNumberWidth':this.maxNumberWidth(),
            'sigFigs':this.sigFigs(),
            'digitsAfterDecimal': this.digitsAfterDecimal(),
            'highlightSeriesBackgroundAlpha': this.highlightSeriesBackgroundAlpha(),
            'animatedZooms': this.animatedZooms(),
            'yRangePad': this.yRangePad(),
            'xRangePad': this.xRangePad(),
            'xAxisHeight': this.xAxisHeight(),

            'series': {
                // Dynamically Created
            },
            'axes': {
                'x':{
                    'drawAxis': this._drawAxis_x,
                    'pixelsPerLabel': this._pixelsPerLabel_x,
                    //'independentTicks': this._independentTicks,
                    'gridLineWidth': this._gridLineWidth_x,
                    'gridLineColor': this._gridLineColor_x,
                    'drawGrid': this._drawGrid_x,
                    //'labelsKMB': this._labelsKMB_x,
                    //'labelsKMG2': this._labelsKMG2_x,
                    'axisLabelColor': this._axisLabelColor_x,
                    'axisLabelFontSize': this._axisLabelFontSize_x,
                    'axisLabelWidth': this._axisLabelWidth_x,
                    'axisLineColor': this._axisLineColor_x,
                    'axisLineWidth': this._axisLineWidth_x,
                    'axisTickSize': this._axisTickSize_x,
                },
                'y': {
                    'drawAxis': this._drawAxis_y,
                    'pixelsPerLabel': this._pixelsPerLabel_y,
                    'independentTicks': this._independentTicks_y,
                    'gridLineWidth': this._gridLineWidth_y,
                    'gridLineColor': this._gridLineColor_y,
                    'drawGrid': this._drawGrid_y,
                    'labelsKMB': this._labelsKMB_y,
                    'labelsKMG2': this._labelsKMG2_y,
                    'axisLabelColor': this._axisLabelColor_y,
                    'axisLabelFontSize': this._axisLabelFontSize_y,
                    'axisLabelWidth': this._axisLabelWidth_y,
                    'axisLineColor': this._axisLineColor_y,
                    'axisLineWidth': this._axisLineWidth_y,
                    'axisTickSize': this._axisTickSize_y,         
                },
                'y2': {
                    'drawAxis': this._drawAxis_y2,
                    //'pixelsPerLabel': this._pixelsPerLabel_y2,
                    'independentTicks': this._independentTicks_y2,
                    //'gridLineWidth': this._gridLineWidth_y2,
                    //'gridLineColor': this._gridLineColor_y2,
                    'drawGrid': this._drawGrid_y2,
                    'labelsKMB': this._labelsKMB_y2,
                    'labelsKMG2': this._labelsKMG2_y2,
                    'axisLabelColor': this._axisLabelColor_y2,
                    'axisLabelFontSize': this._axisLabelFontSize_y2,
                    'axisLabelWidth': this._axisLabelWidth_y2,
                    'axisLineColor': this._axisLineColor_y2,
                    //'axisLineWidth': this._axisLineWidth_y2,
                    //'axisTickSize': this._axisTickSize_y2,        
                }
            }
        };
        
        // ------------------------------------------------------------------------------------------------------------------------
        
        // Label & Column
        if (this._columns.length > 0) { chartOptions.labels = this._columns; }

        var colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);
   
        if (colors.length > 0) { chartOptions.colors = colors; }
        if (this.colorSaturation && colors.length == 0 ) { chartOptions.colorSaturation = this.colorSaturation(); }

        // ------------------------------------------------------------------------------------------------------------------------
        
        // Series
        var perSeriesParams = [
            "strokeWidth","drawPoints","pointSize","highlightCircleSize","strokePattern","strokeBorderWidth","strokeBorderColor","stepPlot","fillGraph",
            //"color","colorValue"
        ];
        
        for (var i = 0, j = this._series.length; i < j; i++) {
             chartOptions['series'][this._series[i]] = {}; // init
             for (var axisIdx = 0; axisIdx < perSeriesParams.length; axisIdx++) {
                var val = this['_'+perSeriesParams[axisIdx]][i];
                //TODO a way of removing/resetting if null?
                if (val === undefined || val === null) {
                    continue;
                }
                chartOptions['series'][this._series[i]][perSeriesParams[axisIdx]] = val;
            }
        }
       
        // Func
        var perAxisFuncs = ["axisLabelFormatter","ticker","valueFormatter"];
        this._axesList = ["x","y","y2"]; // these are static in dygraph as far as i know
        for (var i = 0, j = this._axesList.length; i < j; i++) {
             if (typeof chartOptions['axes'][this._axesList[i]] === "undefined") { chartOptions['axes'][this._axesList[i]] = {}; } // init
             for (var axisIdx = 0; axisIdx < perAxisFuncs.length; axisIdx++) {
                var val = this[perAxisFuncs[axisIdx]][this._axesList[i]];
                if (val === 'undefined' || val === null) {
                    continue;
                }
                chartOptions['axes'][this._axesList[i]][perAxisFuncs[axisIdx]] = val;
            }
        }        

        if (this.dateWindow().length > 0) { chartOptions.dateWindow = this.dateWindow(); }

        if (this.dataHandler != null) { chartOptions.dataHandler = this.dataHandler; }

        // Callbacks/Functions
        if (this.clickCallback != null) { chartOptions.clickCallback = this.clickCallback; }
        if (this.pointClickCallback != null) { chartOptions.pointClickCallback = this.pointClickCallback; }
        if (this.annotationMouseOverHandler != null) { chartOptions.annotationMouseOverHandler = this.annotationMouseOverHandler; }
        if (this.annotationMouseOutHandler != null) { chartOptions.annotationMouseOutHandler = this.annotationMouseOutHandler; }
        if (this.annotationDblClickHandler != null) { chartOptions.annotationDblClickHandler = this.annotationDblClickHandler; }
        if (this.annotationClickHandler != null) { chartOptions.annotationClickHandler = this.annotationClickHandler; }
        if (this.xValueParser != null) { chartOptions.xValueParser = this.xValueParser; }
        if (this.drawCallback != null) { chartOptions.drawCallback = this.drawCallback; }
        if (this.highlightCallback != null) { chartOptions.highlightCallback = this.highlightCallback; }
        if (this.underlayCallback != null) { chartOptions.underlayCallback = this.underlayCallback; }
        if (this.unhighlightCallback != null) { chartOptions.unhighlightCallback = this.unhighlightCallback; }
        if (this.zoomCallback != null) { chartOptions.zoomCallback = this.zoomCallback; }
        if (this.drawHighlightPointCallback != null) { chartOptions.drawHighlightPointCallback = this.drawHighlightPointCallbac; }
        if (this.drawPointCallback != null) { chartOptions.drawPointCallback = this.drawPointCallback; }        
        
        return chartOptions;   
    };

    dyChart.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this._paletteID);
        
        var isZoomedIgnoreProgrammaticZoom = false;
        var co = this.getChartOptions();
        
        console.log('Chart Options:');
        console.log(co);

        if (Object.keys(this._customOptions.options).length > 0) {
            if (this._customOptions.overwrite) { // overwrite
                co = this._customOptions.options;
            } 
            else { // merge
                co = mergeJSON(co,this._customOptions.options);
            }
        }

        this._chart.resize(this.size().width,this.size().height);
        this._chart.updateOptions(co,isZoomedIgnoreProgrammaticZoom);
    };

    dyChart.prototype.exit = function (domNode, element) {
        this._chart.destroy();
    };
    
    // ------------------------------------------------------------------------------------------------------------------------
    
    // Other functions

    dyChart.prototype.adjustRoll = function(_) {
        return this._chart.adjustRoll(_);
    }

    dyChart.prototype.annotations = function(ann, supressDraw) {
        if (!arguments.length) return this._chart.annotations();
        this._chart.setAnnotations(ann, supressDraw);
        return this;
    }

    dyChart.prototype.clearSelection = function() {
        return this._chart.clearSelection();
    }

    dyChart.prototype.destroy = function() {
        return this._chart.destroy();
    }

    dyChart.prototype.eventToDomCoords = function(event) {
        return this._chart.eventToDomCoords(event);
    }

    dyChart.prototype.getArea = function() {
        return this._chart.getArea();
    }

    dyChart.prototype.getArea = function() {
        return this._chart.getArea();
    }
    
    dyChart.prototype.getColors = function() {
        return this._chart.getColors();
    }

    dyChart.prototype.getHighlightSeries = function() {
        return this._chart.getHighlightSeries();
    }

    dyChart.prototype.getLabels = function() {
        return this._chart.getLabels();
    }
    
    dyChart.prototype.getOption = function(name, opt_seriesName) {
        return this._chart.getOption(name, opt_seriesName);
    }    

    dyChart.prototype.getOption = function(name, opt_seriesName) {
        return this._chart.getOption(name, opt_seriesName);
    }      

    dyChart.prototype.getPropertiesForSeries = function(series_name) {
        return this._chart.getPropertiesForSeries(series_name);
    }    

    dyChart.prototype.wselection = function(row, seriesName, locked) {
        if (!arguments.length) return this._chart.getSelection();
        return this._chart.setSelection(row, seriesName, locked);
    }  
    
    dyChart.prototype.getValue = function(row, col) {
        return this._chart.getValue(row, col);
    }  

    dyChart.prototype.getValue = function(row, col) {
        return this._chart.getValue(row, col);
    }  

    dyChart.prototype.indexFromSetName = function(name) {
        return this._chart.indexFromSetName(name);
    }  

    dyChart.prototype.isSeriesLocked = function() {
        return this._chart.isSeriesLocked();
    } 

    dyChart.prototype.isZoomed = function(axis) {
        return this._chart.isZoomed(axis);
    } 

    dyChart.prototype.numAxes = function() {
        return this._chart.numAxes();
    } 

    dyChart.prototype.numColumns = function() {
        return this._chart.numColumns();
    } 
    
    dyChart.prototype.numRows = function() {
        return this._chart.numRows();
    } 

    dyChart.prototype.ready = function(callback) {
        return this._chart.ready(callback);
    } 

    dyChart.prototype.resetZoom = function() {
        return this._chart.resetZoom();
    } 
    
    //.resize ... handled above

    dyChart.prototype.wvisibility = function(num, value) {
        if (!arguments.length) return this._chart.visibility();
        return this._chart.setVisibility(num, value);
    } 

    dyChart.prototype.toDataCoords = function(x, y, axis) {
        return this._chart.toDataCoords(x, y, axis);
    } 

    dyChart.prototype.toDataXCoord = function(x) {
        return this._chart.toDataXCoord(x);
    } 

    dyChart.prototype.toDataYCoord = function(y) {
        return this._chart.toDataYCoord(y);
    } 

    dyChart.prototype.toDomCoords = function(x, y, axis) {
        return this._chart.toDomCoords(x, y, axis);
    } 

    dyChart.prototype.toDomXCoord = function(x) {
        return this._chart.toDomXCoord(x);
    } 
 
    dyChart.prototype.toDomYCoord = function(y, axis) {
        return this._chart.toDomYCoord(y, axis);
    }

    dyChart.prototype.toPercentXCoord = function(x) {
        return this._chart.toPercentXCoord(x);
    }

    dyChart.prototype.toPercentYCoord = function(y, axis) {
        return this._chart.toPercentYCoord(y, axis);
    }

    dyChart.prototype.toString = function() {
        return this._chart.toString();
    }
    
    dyChart.prototype.xAxisExtremes = function() {
        return this._chart.xAxisExtremes();
    }    

    dyChart.prototype.xAxisRange = function() {
        return this._chart.xAxisRange();
    } 

    dyChart.prototype.yAxisRange = function(idx) {
        if (!arguments.length) return this._chart.yAxisRanges();
        return this._chart.yAxisRange(idx);
    } 

    dyChart.prototype.testData = function() {
        var data = function() {
            var arr = [];
            var zp = function(x) { if (x < 10) return "0"+x; else return x; };
            //var r = "date,parabola,line,another line,sine wave,sine wave2\n";
            var r = '';
            for (var i=1; i<=31; i++) {
                var tArr = [];
                tArr.push("200610" + zp(i));
                tArr.push(10*(i*(31-i)));
                tArr.push(10*(8*i));
                tArr.push(10*(250 - 8*i));
                tArr.push(10*(125 + 125 * Math.sin(0.3*i)));
                tArr.push(10*(125 + 125 * Math.sin(0.3*i+Math.PI)));
                arr.push(tArr);
            }
            return arr;
        };

        this
            .columns(["date","parabola","line","another line","sine wave","sine wave2"])
            .series(["parabola","line",'another line',"sine wave","sine wave2"])
            .strokeWidth([2,1,null,3,2])
            .highlightCircleSize([6,,,10,3])
            .pointSize([4,1.5])
            .strokePattern([null,Dygraph.DASHED_LINE,[25,5],Dygraph.DOTTED_LINE,Dygraph.DOT_DASH_LINE])
            .strokeBorderWidth([2,2,,2])
            .drawPoints([true,true])
            .data(data());
    
        return this;    
    }

    dyChart.prototype.testData2 = function() {
        var data = function() {
            return "20070101,46;51;56,43;45;48\n20070102,43;48;52,48;56;63\n20070103,39;46;53,50;54;62\n20070104,44;51;58,45;52;56\n20070105,51;57;62,44;49;58\n20070106,55;64;72,40;50;60\n20070107,46;51;56,45;53;63\n20070108,40;49;57,43;53;64\n20070109,37;41;45,49;56;66\n20070110,31;35;38,45;49;54\n20070111,29;35;41,41;46;54\n20070112,39;45;50,41;44;49\n20070113,46;52;57,38;44;53\n20070114,42;44;46,36;43;51\n20070115,41;46;51,36;46;55\n20070116,25;41;57,37;45;54\n20070117,21;26;31,41;47;56\n20070118,25;32;38,38;48;61\n20070119,33;38;43,\n20070120,23;29;35,\n20070121,21;26;31,55;60;68\n20070122,28;31;34,44;54;66\n20070123,30;34;38,41;51;64\n20070124,34;37;40,42;51;64\n20070125,17;27;37,45;49;56\n20070126,11;18;24,44;48;52\n20070127,22;32;41,47;52;58\n20070128,32;38;43,48;52;60\n20070129,24;28;32,47;55;64\n20070130,23;30;37,51;54;56\n20070131,27;31;34,49;52;56\n20070201,28;33;37,46;50;52\n20070202,34;37;39,47;51;57\n20070203,25;32;38,42;51;62\n20070204,18;25;31,44;55;69\n20070205,10;15;20,48;55;68\n20070206,13;20;26,48;54;62\n20070207,14;21;27,51;56;62\n20070208,17;24;30,49;54;56\n20070209,20;27;33,55;56;58\n20070210,25;30;34,55;57;60\n20070211,21;28;34,51;55;59\n20070212,30;36;41,48;51;59\n20070213,23;29;34,48;52;58\n20070214,19;25;31,44;52;60\n20070215,17;21;25,49;55;65\n20070216,16;23;30,48;59;72\n20070217,22;29;36,51;62;77\n20070218,20;28;35,48;54;61\n20070219,14;22;29,48;53;61\n20070220,29;39;49,49;53;59\n20070221,39;44;49,50;54;61\n20070222,33;40;46,43;48;54\n20070223,23;32;40,43;48;54\n20070224,22;33;43,46;51;60\n20070225,26;33;39,49;52;55\n20070226,31;34;37,44;49;54\n20070227,35;39;43,40;45;52\n20070228,37;42;46,42;47;53\n20070301,33;39;45,44;49;55\n20070302,36;49;61,45;52;60\n20070303,37;48;59,48;58;68\n20070304,35;39;42,53;60;72\n20070305,23;33;42,52;58;67\n20070306,14;19;24,49;54;66\n20070307,14;20;25,50;53;60\n20070308,20;28;35,48;52;60\n20070309,15;25;34,49;53;58\n20070310,30;43;55,50;57;69\n20070311,40;45;50,53;63;79\n20070312,36;46;56,57;65;78\n20070313,44;49;54,52;58;68\n20070314,46;56;66,50;54;62\n20070315,37;53;69,51;59;75\n20070316,28;33;38,53;62;76\n20070317,27;35;42,50;53;57\n20070318,29;35;41,50;53;61\n20070319,33;38;43,49;53;59\n20070320,35;43;50,50;54;58\n20070321,27;34;41,48;55;62\n20070322,41;54;67,50;58;71\n20070323,46;54;62,49;56;67\n20070324,40;48;55,50;52;56\n20070325,38;46;53,50;53;56\n20070326,41;48;55,48;53;60\n20070327,48;62;75,46;50;56\n20070328,47;55;63,47;52;61\n20070329,40;48;56,49;57;68\n20070330,42;55;67,48;53;64\n20070331,44;51;57,49;55;68\n20070401,42;47;51,49;52;58\n20070402,42;48;54,48;54;68\n20070403,43;52;60,48;54;66\n20070404,41;43;45,50;56;67\n20070405,36;42;47,50;54;63\n20070406,34;39;43,48;51;55\n20070407,34;39;43,51;54;59\n20070408,32;37;42,51;55;61\n20070409,35;42;49,52;55;59\n20070410,36;43;50,50;56;67\n20070411,37;44;51,51;54;57\n20070412,41;43;45,48;53;58\n20070413,44;47;50,49;54;64\n20070414,42;50;57,50;53;56\n20070415,42;49;56,48;55;65\n20070416,40;47;54,52;58;69\n20070417,43;47;50,48;52;56\n20070418,43;48;53,46;50;55\n20070419,46;55;63,46;50;55\n20070420,46;59;71,47;52;60\n20070421,48;63;78,49;52;57\n20070422,52;64;76,51;55;59\n20070423,54;70;85,48;55;65\n20070424,59;67;75,49;54;63\n20070425,49;56;63,51;54;59\n20070426,48;55;62,50;54;63\n20070427,48;52;55,53;62;78\n20070428,53;63;72,52;61;78\n20070429,55;61;66,50;53;61\n20070430,55;68;81,51;57;66\n20070501,52;62;71,50;55;61\n20070502,51;61;71,52;56;62\n20070503,53;63;72,50;53;58\n20070504,52;62;71,50;54;60\n20070505,52;63;73,50;59;70\n20070506,48;55;62,57;72;86\n20070507,48;57;65,69;76;88\n20070508,50;60;70,53;68;79\n20070509,58;70;82,50;55;61\n20070510,62;71;79,50;54;61\n20070511,61;70;78,49;52;56\n20070512,55;64;73,50;54;60\n20070513,53;61;68,47;55;66\n20070514,52;61;69,49;53;60\n20070515,59;73;87,49;52;59\n20070516,63;76;89,48;55;66\n20070517,55;62;68,49;54;61\n20070518,49;52;55,50;55;63\n20070519,52;55;57,52;57;66\n20070520,55;67;78,51;57;67\n20070521,56;65;74,49;59;69\n20070522,55;64;73,52;61;71\n20070523,58;66;74,56;68;83\n20070524,61;75;88,50;56;69\n20070525,69;82;95,50;52;60\n20070526,73;80;86,50;52;60\n20070527,68;77;85,50;52;56\n20070528,67;77;87,50;55;64\n20070529,63;72;81,51;54;59\n20070530,62;73;84,53;54;57\n20070531,67;79;90,52;54;57\n20070601,64;78;92,50;53;59\n20070602,73;82;90,50;52;56\n20070603,65;73;81,51;54;61\n20070604,60;66;71,55;59;65\n20070605,68;77;85,54;57;61\n20070606,58;65;72,52;56;62\n20070607,58;67;76,51;57;68\n20070608,66;76;85,51;54;62\n20070609,64;73;81,50;58;66\n20070610,63;69;74,53;58;64\n20070611,66;76;85,52;58;66\n20070612,68;76;84,52;60;72\n20070613,59;65;70,57;68;80\n20070614,58;63;67,57;67;84\n20070615,62;68;73,54;62;76\n20070616,64;73;82,52;55;59\n20070617,69;80;90,52;59;70\n20070618,70;78;85,52;56;64\n20070619,69;76;83,54;58;65\n20070620,70;75;80,54;56;61\n20070621,65;75;85,53;59;67\n20070622,65;71;77,53;59;67\n20070623,61;69;77,53;58;67\n20070624,63;74;84,52;58;66\n20070625,71;78;84,52;60;75\n20070626,73;84;94,51;57;65\n20070627,73;84;95,53;59;67\n20070628,73;84;94,54;61;72\n20070629,70;75;79,55;61;72\n20070630,68;76;84,53;58;66\n20070701,64;70;75,52;59;68\n20070702,60;68;76,55;62;71\n20070703,65;74;82,54;59;64\n20070704,68;71;73,55;64;75\n20070705,69;76;82,55;62;72\n20070706,70;79;87,53;57;62\n20070707,72;80;88,52;54;58\n20070708,76;85;93,53;57;65\n20070709,71;84;96,55;59;67\n20070710,75;84;93,56;61;70\n20070711,74;81;88,59;65;74\n20070712,69;77;84,58;66;75\n20070713,75;80;85,57;65;78\n20070714,70;78;86,56;60;69\n20070715,75;83;91,57;63;72\n20070716,72;78;83,56;60;67\n20070717,71;80;88,56;62;73\n20070718,71;75;79,61;66;74\n20070719,71;82;92,58;62;72\n20070720,69;75;81,58;64;73\n20070721,67;76;84,60;66;76\n20070722,70;77;84,60;65;74\n20070723,65;71;76,58;64;76\n20070724,63;73;83,56;60;71\n20070725,71;78;85,56;59;64\n20070726,73;80;86,55;58;72\n20070727,75;82;88,55;60;72\n20070728,74;81;88,55;61;70\n20070729,74;77;80,55;60;74\n20070730,72;80;88,55;63;80\n20070731,74;82;90,54;59;68\n20070801,75;84;93,55;60;69\n20070802,76;87;98,55;61;70\n20070803,73;83;93,54;60;71\n20070804,75;84;92,54;58;67\n20070805,72;78;84,55;58;62\n20070806,75;81;86,56;60;68\n20070807,78;84;90,56;61;69\n20070808,75;85;95,56;59;65\n20070809,74;80;85,57;61;72\n20070810,59;67;75,55;62;73\n20070811,60;72;83,56;60;68\n20070812,73;81;88,54;60;70\n20070813,75;82;88,55;61;74\n20070814,71;77;83,55;60;71\n20070815,72;81;89,54;61;70\n20070816,77;82;87,57;62;72\n20070817,66;77;87,53;64;77\n20070818,62;69;76,56;62;71\n20070819,62;68;73,57;64;75\n20070820,61;67;73,59;65;74\n20070821,58;60;62,58;65;80\n20070822,58;64;69,57;65;80\n20070823,63;71;79,56;62;73\n20070824,67;77;86,58;62;70\n20070825,75;83;91,58;62;71\n20070826,75;80;85,57;61;68\n20070827,71;77;83,56;61;71\n20070828,72;78;84,55;66;82\n20070829,72;79;86,61;69;83\n20070830,73;81;88,62;71;82\n20070831,72;77;81,59;64;72\n20070901,66;73;79,58;66;80\n20070902,63;72;80,58;67;86\n20070903,67;77;86,58;63;71\n20070904,73;79;85,60;64;72\n20070905,69;74;79,58;68;84\n20070906,70;77;83,60;64;69\n20070907,72;80;88,59;63;71\n20070908,74;82;90,58;61;66\n20070909,74;80;86,59;61;66\n20070910,73;76;78,60;64;71\n20070911,72;75;77,59;62;70\n20070912,66;72;77,59;62;65\n20070913,65;71;76,59;65;74\n20070914,67;72;77,60;66;74\n20070915,58;65;71,58;62;72\n20070916,55;62;69,59;63;71\n20070917,56;63;70,56;62;71\n20070918,57;65;72,56;60;67\n20070919,59;68;76,54;57;63\n20070920,64;74;83,54;59;72\n20070921,68;76;84,58;62;73\n20070922,68;72;76,58;60;65\n20070923,67;75;82,56;61;67\n20070924,65;73;81,52;62;78\n20070925,66;78;89,54;66;86\n20070926,72;81;90,58;70;92\n20070927,73;79;84,57;61;68\n20070928,64;71;77,55;59;63\n20070929,62;69;76,51;60;74\n20070930,61;67;73,51;60;71\n20071001,62;67;71,56;62;71\n20071002,60;68;75,54;62;76\n20071003,66;73;80,53;59;67\n20071004,69;77;85,53;55;59\n20071005,67;75;83,51;56;62\n20071006,68;77;85,48;57;68\n20071007,67;75;82,51;59;75\n20071008,67;78;89,52;59;78\n20071009,61;72;83,52;59;67\n20071010,62;68;73,\n20071011,59;64;69,\n20071012,51;57;62,\n20071013,49;56;63,\n20071014,52;59;65,\n20071015,53;61;69,\n20071016,58;65;71,\n20071017,60;67;73,\n20071018,64;72;79,\n20071019,66;70;74,\n20071020,64;68;72,\n20071021,59;68;76,\n20071022,62;70;77,\n20071023,67;74;81,\n20071024,54;62;70,\n20071025,52;57;61,\n20071026,53;57;60,\n20071027,59;65;70,\n20071028,46;53;59,\n20071029,43;49;54,\n20071030,49;57;64,\n20071031,51;58;64,53;60;67\n20071101,52;60;67,51;56;72\n20071102,46;51;56,49;60;82\n20071103,47;50;53,50;61;79\n20071104,49;53;56,53;62;80\n20071105,48;53;58,50;54;59\n20071106,45;52;58,50;54;61\n20071107,42;46;50,50;53;59\n20071108,38;43;48,53;56;60\n20071109,40;44;48,53;58;66\n20071110,39;43;47,52;57;62\n20071111,34;41;48,51;56;64\n20071112,40;46;52,47;56;68\n20071113,49;55;61,57;61;73\n20071114,44;53;61,53;61;72\n20071115,45;54;62,56;59;67\n20071116,39;44;48,54;56;61\n20071117,38;43;47,53;56;61\n20071118,41;44;47,53;57;63\n20071119,39;43;46,50;56;60\n20071120,40;45;50,48;54;63\n20071121,44;51;58,44;53;66\n20071122,42;54;66,46;54;68\n20071123,32;37;42,44;57;72\n20071124,28;34;40,44;54;65\n20071125,37;44;50,51;55;62\n20071126,41;52;63,47;54;65\n20071127,46;56;65,50;55;65\n20071128,37;42;47,47;56;66\n20071129,42;47;52,48;53;64\n20071130,37;40;43,45;49;57\n20071201,26;34;42,46;49;56\n20071202,21;30;38,47;54;59\n20071203,34;42;49,52;59;64\n20071204,30;33;35,31;57;69\n20071205,29;32;34,52;56;63\n20071206,23;30;37,51;52;54\n20071207,34;35;36,48;52;57\n20071208,35;40;45,42;49;56\n20071209,36;39;41,44;51;59\n20071210,37;40;43,45;50;59\n20071211,36;41;46,46;52;59\n20071212,37;46;54,42;49;57\n20071213,30;34;38,42;49;59\n20071214,32;39;45,40;48;57\n20071215,30;34;38,43;49;56\n20071216,31;36;40,46;51;57\n20071217,27;31;35,48;52;56\n20071218,31;35;38,49;52;55\n20071219,35;41;47,46;51;57\n20071220,38;42;45,45;51;56\n20071221,36;39;42,43;48;54\n20071222,36;39;42,39;46;53\n20071223,41;52;62,44;51;61\n20071224,39;46;52,49;53;60\n20071225,38;41;44,41;49;57\n20071226,34;38;41,44;48;55\n20071227,37;42;46,41;46;52\n20071228,43;47;50,41;44;45\n20071229,43;48;53,45;48;52\n20071230,37;41;44,46;49;53\n20071231,36;41;46,38;47;56\n20080101,35;42;49,42;50;58\n20080102,19;29;39,43;50;60\n20080103,15;19;23,51;53;58\n20080104,19;28;37,51;53;59\n20080105,33;38;43,46;49;51\n20080106,37;42;47,42;47;51\n20080107,42;52;61,43;48;53\n20080108,52;58;64,44;49;53\n20080109,49;58;66,46;49;52\n20080110,42;47;51,48;50;51\n20080111,41;49;57,48;51;55\n20080112,40;45;49,46;51;58\n20080113,37;42;47,44;51;60\n20080114,34;37;39,46;51;58\n20080115,34;37;40,44;49;57\n20080116,31;36;40,41;50;60\n20080117,30;36;41,44;50;61\n20080118,37;43;49,42;52;63\n20080119,34;36;37,42;50;62\n20080120,19;27;35,46;49;53\n20080121,16;22;28,43;45;46\n20080122,25;33;40,42;44;47\n20080123,32;37;41,42;44;49\n20080124,26;31;35,43;44;45\n20080125,23;29;34,45;49;52\n20080126,27;31;35,52;55;62\n20080127,31;35;39,45;51;54\n20080128,29;36;43,42;46;51\n20080129,33;39;44,41;45;49\n20080130,34;42;50,42;47;54\n20080131,30;35;40,45;48;52\n20080201,33;45;56,40;46;52\n20080202,36;40;44,42;47;53\n20080203,33;42;50,46;49;52\n20080204,34;39;43,43;49;58\n20080205,38;45;52,40;49;58\n20080206,40;55;69,47;50;55\n20080207,39;45;50,43;50;58\n20080208,36;41;46,46;53;65\n20080209,37;41;45,46;57;69\n20080210,17;31;45,49;57;70\n20080211,12;19;25,48;56;69\n20080212,19;25;31,46;54;70\n20080213,31;43;54,48;57;65\n20080214,30;36;41,49;54;64\n20080215,32;40;48,46;52;60\n20080216,25;30;35,45;51;64\n20080217,30;42;53,46;50;55\n20080218,42;53;64,47;50;58\n20080219,29;36;42,48;51;53\n20080220,25;29;33,48;51;57\n20080221,22;28;34,48;51;56\n20080222,26;30;34,46;50;56\n20080223,30;33;36,43;48;54\n20080224,27;34;40,52;54;58\n20080225,33;41;49,49;55;63\n20080226,38;43;48,48;58;70\n20080227,24;36;47,52;58;71\n20080228,20;25;29,48;56;74\n20080229,19;28;36,48;52;62\n20080301,34;40;45,50;53;59\n20080302,30;36;43,49;59;71\n20080303,35;44;52,47;57;72\n20080304,43;53;62,46;55;68\n20080305,39;49;58,46;55;71\n20080306,36;43;49,47;55;65\n20080307,35;40;45,48;56;69\n20080308,38;48;57,49;55;66\n20080309,31;37;43,47;58;76\n20080310,28;37;46,52;58;70\n20080311,36;43;49,50;54;66\n20080312,36;42;48,48;53;63\n20080313,33;39;45,30;55;61\n20080314,39;46;53,49;52;58\n20080315,42;49;55,43;50;57\n20080316,36;42;47,47;55;68\n20080317,32;41;49,49;56;66\n20080318,36;41;46,48;55;64\n20080319,42;47;52,49;52;60\n20080320,37;48;59,46;51;59\n20080321,35;41;47,47;54;67\n20080322,35;43;50,46;55;73\n20080323,32;40;48,46;54;66\n20080324,33;41;49,47;54;64\n20080325,32;39;46,49;53;59\n20080326,43;52;60,48;52;60\n20080327,44;47;50,45;50;59\n20080328,40;45;49,46;52;60\n20080329,34;41;47,48;52;59\n20080330,28;37;46,44;49;56\n20080331,39;48;57,41;50;62\n20080401,55;60;64,49;53;60\n20080402,39;47;54,48;54;62\n20080403,35;42;49,48;53;62\n20080404,42;49;55,45;50;57\n20080405,49;54;59,46;50;57\n20080406,42;46;50,48;52;59\n20080407,41;46;51,45;51;59\n20080408,41;48;55,47;50;55\n20080409,39;48;56,47;52;59\n20080410,48;62;75,46;55;66\n20080411,47;54;61,50;65;84\n20080412,47;61;74,57;71;87\n20080413,44;50;55,51;64;80\n20080414,41;49;56,48;52;58\n20080415,43;51;59,45;51;60\n20080416,46;56;65,46;51;66\n20080417,45;59;72,49;57;75\n20080418,50;67;83,48;52;60\n20080419,51;62;72,45;49;55\n20080420,48;52;56,43;48;55\n20080421,47;52;57,44;49;57\n20080422,48;59;69,48;54;64\n20080423,52;64;76,48;53;60\n20080424,58;68;77,45;53;65\n20080425,55;63;70,48;57;69\n20080426,52;58;63,51;62;78\n20080427,49;52;55,53;62;77\n20080428,48;54;59,49;56;66\n20080429,47;53;58,50;53;61\n20080430,44;51;57,47;52;60\n20080501,45;52;59,47;55;66\n20080502,50;53;55,49;53;60\n20080503,48;52;56,48;54;63\n20080504,49;61;72,49;52;59\n20080505,51;61;71,48;53;61\n20080506,52;65;77,49;56;68\n20080507,58;66;73,49;55;65\n20080508,64;69;74,48;53;62\n20080509,50;57;64,46;54;65\n20080510,50;59;67,47;54;64\n20080511,50;56;61,48;54;64\n20080512,48;53;57,50;56;66\n20080513,52;61;70,49;61;78\n20080514,53;64;74,55;69;85\n20080515,54;64;73,68;81;102\n20080516,51;56;61,65;77;99\n20080517,50;62;74,52;63;73\n20080518,56;62;67,51;54;62\n20080519,51;56;61,50;54;60\n20080520,50;54;58,52;56;63\n20080521,50;60;69,50;57;65\n20080522,50;56;61,52;58;68\n20080523,52;60;68,49;55;65\n20080524,56;63;70,51;54;62\n20080525,58;68;77,50;56;64\n20080526,60;68;76,50;55;62\n20080527,60;73;85,51;56;64\n20080528,53;61;69,52;58;67\n20080529,54;66;78,53;57;63\n20080530,62;72;82,52;56;66\n20080531,63;70;77,52;54;60\n20080601,67;76;84,49;55;63\n20080602,61;71;80,49;54;62\n20080603,65;75;84,51;55;62\n20080604,58;65;71,51;54;62\n20080605,62;67;72,51;58;70\n20080606,59;66;73,51;57;66\n20080607,60;78;96,50;59;70\n20080608,78;87;96,52;61;74\n20080609,76;88;99,54;66;83\n20080610,73;87;100,53;64;77\n20080611,72;80;88,57;65;79\n20080612,71;79;86,55;67;93\n20080613,65;74;82,50;56;65\n20080614,70;80;90,52;56;65\n20080615,65;74;83,50;54;61\n20080616,64;71;78,49;52;58\n20080617,64;71;77,48;60;78\n20080618,60;68;75,54;65;79\n20080619,60;69;77,57;72;92\n20080620,63;71;79,63;80;102\n20080621,65;75;85,56;75;85\n20080622,71;76;80,51;56;63\n20080623,70;77;83,50;52;56\n20080624,70;76;81,50;58;71\n20080625,68;77;85,51;56;64\n20080626,74;80;85,50;57;70\n20080627,76;81;85,52;57;62\n20080628,70;80;90,55;58;64\n20080629,74;82;90,53;57;65\n20080630,73;79;85,52;57;68\n20080701,71;79;86,53;58;67\n20080702,69;78;87,52;56;65\n20080703,73;83;93,54;60;71\n20080704,71;76;80,55;60;69\n20080705,69;72;75,56;62;74\n20080706,68;74;79,56;62;74\n20080707,70;78;85,56;66;80\n20080708,76;84;91,59;69;86\n20080709,75;81;87,62;69;82\n20080710,73;80;87,59;64;72\n20080711,69;79;89,58;64;73\n20080712,73;80;86,60;64;73\n20080713,72;79;85,60;64;71\n20080714,70;77;83,59;62;68\n20080715,72;81;90,59;62;70\n20080716,71;81;90,57;60;66\n20080717,74;83;92,54;58;65\n20080718,76;86;96,52;56;64\n20080719,81;89;97,53;57;63\n20080720,79;87;94,52;55;63\n20080721,75;84;93,54;57;63\n20080722,73;80;87,52;60;73\n20080723,70;76;82,54;61;76\n20080724,70;78;85,52;60;72\n20080725,71;79;87,52;61;72\n20080726,74;81;88,55;65;79\n20080727,70;76;82,55;57;62\n20080728,69;79;88,54;57;65\n20080729,75;83;90,55;59;68\n20080730,73;80;87,56;60;69\n20080731,75;83;90,55;58;69\n20080801,74;81;88,55;62;74\n20080802,69;76;82,55;64;79\n20080803,68;76;83,54;57;62\n20080804,68;77;85,53;56;65\n20080805,73;79;84,52;56;64\n20080806,72;80;88,54;57;68\n20080807,68;77;86,54;57;66\n20080808,68;75;82,54;58;66\n20080809,66;74;82,54;59;67\n20080810,69;76;82,53;64;79\n20080811,60;67;73,56;63;78\n20080812,63;72;81,55;63;79\n20080813,69;75;81,56;64;82\n20080814,68;76;84,55;61;74\n20080815,67;74;81,55;62;75\n20080816,66;74;82,57;60;66\n20080817,69;77;85,57;60;69\n20080818,73;81;88,58;62;68\n20080819,65;74;82,58;62;73\n20080820,61;69;77,58;65;74\n20080821,66;74;81,60;64;73\n20080822,69;76;83,58;62;72\n20080823,67;74;80,57;62;71\n20080824,71;76;81,57;64;73\n20080825,68;77;85,58;62;72\n20080826,62;71;80,55;61;79\n20080827,64;71;77,59;70;88\n20080828,66;75;84,62;72;86\n20080829,68;74;80,59;67;84\n20080830,68;76;84,57;61;70\n20080831,69;77;84,54;61;73\n20080901,68;76;84,57;68;83\n20080902,71;79;86,58;68;85\n20080903,70;76;81,59;69;87\n20080904,72;81;90,60;73;94\n20080905,73;80;86,63;74;92\n20080906,72;78;83,63;72;84\n20080907,70;77;83,56;62;70\n20080908,68;76;83,55;60;67\n20080909,67;73;78,58;60;65\n20080910,63;68;73,57;61;68\n20080911,62;68;73,56;60;66\n20080912,65;69;72,55;57;63\n20080913,68;74;79,55;59;67\n20080914,71;80;89,55;59;67\n20080915,67;76;84,54;58;67\n20080916,63;67;70,54;58;65\n20080917,61;68;75,56;60;67\n20080918,61;68;74,53;60;70\n20080919,55;61;66,55;62;72\n20080920,54;61;68,59;62;69\n20080921,59;70;80,57;61;70\n20080922,62;68;73,55;64;79\n20080923,57;63;69,56;67;85\n20080924,58;64;69,57;64;74\n20080925,56;62;67,57;65;76\n20080926,60;64;68,56;63;75\n20080927,64;67;69,54;62;78\n20080928,67;71;74,55;59;65\n20080929,63;68;73,57;61;67\n20080930,62;68;73,57;63;76\n20081001,61;67;73,59;64;74\n20081002,56;60;64,60;65;73\n20081003,54;60;65,59;63;71\n20081004,53;58;63,58;62;68\n20081005,54;59;63,57;62;69\n20081006,51;57;63,59;64;76\n20081007,48;56;64,56;64;79\n20081008,52;59;66,58;64;75\n20081009,60;69;77,54;61;71\n20081010,61;67;73,54;58;64\n20081011,57;64;71,55;60;67\n20081012,57;64;71,55;62;72\n20081013,60;68;75,58;64;77\n20081014,59;64;68,53;63;80\n20081015,60;66;71,55;65;83\n20081016,57;68;78,58;68;86\n20081017,52;56;60,59;69;86\n20081018,44;51;57,53;58;65\n20081019,43;51;58,52;54;57\n20081020,45;54;62,51;57;65\n20081021,46;55;63,52;62;79\n20081022,42;47;52,55;67;83\n20081023,40;47;54,61;70;85\n20081024,43;50;57,59;66;86\n20081025,54;61;67,57;67;82\n20081026,51;57;63,52;57;66\n20081027,50;57;64,51;55;65\n20081028,41;46;51,50;55;65\n20081029,40;44;48,49;54;64\n20081030,38;44;49,51;56;61\n20081031,42;53;64,58;61;66\n20081101,52;59;65,34;58;63\n20081102,39;46;52,\n20081103,44;52;59,53;56;61\n20081104,50;57;64,51;54;61\n20081105,55;59;63,46;55;66\n20081106,59;62;65,54;60;72\n20081107,58;62;65,52;60;75\n20081108,55;58;60,53;56;62\n20081109,50;53;56,52;56;63\n20081110,44;48;51,49;55;62\n20081111,40;46;51,53;58;64\n20081112,43;47;50,56;59;68\n20081113,47;53;58,52;61;74\n20081114,55;59;63,55;67;80\n20081115,58;62;65,60;70;82\n20081116,42;52;61,58;66;78\n20081117,39;43;47,57;66;77\n20081118,31;36;41,52;56;62\n20081119,28;33;37,52;54;57\n20081120,31;35;39,54;58;66\n20081121,27;33;39,47;55;67\n20081122,25;29;33,47;55;68\n20081123,26;32;37,49;56;69\n20081124,33;43;53,49;56;64\n20081125,38;43;48,52;57;61\n20081126,38;42;45,53;55;58\n20081127,37;41;44,53;55;61\n20081128,38;44;50,50;54;60\n20081129,38;42;45,50;57;68\n20081130,36;40;44,51;58;70\n20081201,43;49;55,53;55;57\n20081202,38;42;46,52;56;64\n20081203,35;39;43,50;54;59\n20081204,39;45;51,47;53;62\n20081205,34;38;42,46;54;66\n20081206,31;34;37,47;53;62\n20081207,22;30;37,44;50;56\n20081208,20;26;31,46;51;55\n20081209,31;44;56,42;50;59\n20081210,44;54;63,47;52;63\n20081211,38;41;44,48;54;63\n20081212,33;40;46,48;53;60\n20081213,28;31;33,45;49;55\n20081214,30;40;49,43;46;50\n20081215,48;58;67,41;46;51\n20081216,31;45;59,39;42;47\n20081217,33;39;44,39;45;53\n20081218,37;40;43,38;47;55\n20081219,30;35;39,45;50;55\n20081220,23;28;32,39;46;54\n20081221,26;33;40,46;48;51\n20081222,14;22;29,44;49;54\n20081223,20;26;31,43;48;53\n20081224,31;45;58,46;50;54\n20081225,35;47;58,45;48;53\n20081226,32;37;41,\n20081227,40;44;48,\n20081228,47;56;65,\n20081229,38;44;49,47;53;63\n20081230,34;39;44,46;51;58\n20081231,19;28;36,45;48;55\n20090101,16;22;27,44;48;51\n20090102,24;30;36,45;50;55\n20090103,30;35;39,40;46;54\n20090104,26;35;43,36;45;54\n20090105,39;42;44,45;46;48\n20090106,31;35;39,44;49;54\n20090107,32;36;40,44;47;52\n20090108,30;35;39,46;49;56\n20090109,27;30;33,41;51;62\n20090110,24;27;30,48;56;66\n20090111,26;29;32,44;55;70\n20090112,23;29;34,49;62;76\n20090113,29;35;41,55;64;75\n20090114,18;28;37,48;59;70\n20090115,17;20;23,48;60;74\n20090116,11;15;18,48;60;72\n20090117,8;15;22,48;57;68\n20090118,22;28;33,49;58;70\n20090119,26;30;33,46;58;71\n20090120,22;26;30,47;58;71\n20090121,19;24;28,52;57;62\n20090122,22;30;37,51;53;55\n20090123,28;37;45,53;55;56\n20090124,18;33;47,49;52;55\n20090125,15;22;28,46;50;55\n20090126,20;25;30,43;49;57\n20090127,26;29;31,43;50;58\n20090128,24;33;42,43;51;61\n20090129,27;32;37,44;56;70\n20090130,28;32;35,47;56;69\n20090131,21;25;28,44;52;69\n20090201,28;41;53,44;54;70\n20090202,33;43;52,47;57;69\n20090203,26;32;37,47;57;71\n20090204,18;25;31,47;55;67\n20090205,14;19;24,51;54;58\n20090206,17;25;32,51;53;55\n20090207,24;37;49,48;54;63\n20090208,38;49;59,45;50;56\n20090209,35;41;46,43;47;56\n20090210,33;42;50,38;47;54\n20090211,38;51;63,43;48;56\n20090212,44;51;57,44;48;55\n20090213,32;38;44,43;46;54\n20090214,29;35;41,43;48;54\n20090215,30;36;42,46;48;51\n20090216,29;35;40,47;49;56\n20090217,26;34;41,47;50;54\n20090218,32;38;43,45;52;60\n20090219,28;39;50,43;54;66\n20090220,24;29;34,49;57;68\n20090221,28;35;42,50;56;63\n20090222,32;38;43,53;55;58\n20090223,25;30;34,52;56;60\n20090224,23;30;37,50;52;53\n20090225,26;34;41,51;55;61\n20090226,35;43;50,48;54;60\n20090227,40;49;58,46;53;62\n20090228,32;43;54,50;56;66\n20090301,28;32;35,54;57;59\n20090302,18;23;28,53;56;61\n20090303,14;21;28,48;52;58\n20090304,19;27;35,44;50;58\n20090305,28;36;43,46;51;60\n20090306,38;46;54,47;52;58\n20090307,46;58;69,43;52;65\n20090308,44;53;62,50;53;60\n20090309,37;42;46,\n20090310,37;42;46,\n20090311,41;50;59,\n20090312,32;38;44,\n20090313,27;33;38,\n20090314,34;42;50,\n20090315,42;48;53,\n20090316,38;42;46,\n20090317,36;44;52,\n20090318,40;51;61,\n20090319,41;46;50,\n20090320,33;39;44,\n20090321,32;40;47,53;55;60\n20090322,36;45;53,45;50;58\n20090323,30;36;42,44;51;59\n20090324,29;38;47,43;54;66\n20090325,36;44;52,47;56;68\n20090326,40;43;45,51;58;68\n20090327,43;53;63,52;61;75\n20090328,42;48;53,51;59;71\n20090329,42;47;52,48;56;64\n20090330,42;47;51,51;57;68\n20090331,40;50;60,47;56;70\n20090401,42;46;50,50;57;68\n20090402,42;51;59,48;52;60\n20090403,44;53;61,47;53;61\n20090404,48;52;55,43;55;70\n20090405,45;56;66,46;61;80\n20090406,44;48;51,51;61;79\n20090407,40;45;50,51;55;63\n20090408,37;43;49,50;55;64\n20090409,38;50;61,50;53;58\n20090410,46;52;58,48;54;63\n20090411,43;47;50,46;53;61\n20090412,38;43;48,49;56;66\n20090413,36;47;57,49;56;65\n20090414,43;48;53,45;50;57\n20090415,43;49;54,46;46;47\n20090416,44;53;62,44;52;61\n20090417,44;57;69,46;54;70\n20090418,56;67;78,52;62;74\n20090419,47;54;61,51;70;92\n20090420,43;47;51,60;77;99\n20090421,47;52;56,64;78;93\n20090422,49;53;57,52;62;71\n20090423,45;51;57,50;54;61\n20090424,45;57;69,48;52;59\n20090425,50;69;88,45;52;60\n20090426,63;77;91,46;53;63\n20090427,53;66;79,48;51;57\n20090428,68;79;89,47;52;60\n20090429,50;59;68,46;53;61\n20090430,46;54;61,47;54;69\n20090501,54;63;72,51;56;62\n20090502,56;62;67,55;59;65\n20090503,53;56;58,53;59;66\n20090504,51;54;56,52;60;71\n20090505,51;54;56,57;61;69\n20090506,49;57;65,55;61;73\n20090507,52;63;73,51;61;72\n20090508,56;65;74,51;60;71\n20090509,57;68;78,50;57;69\n20090510,55;63;70,50;57;68\n20090511,51;59;66,50;56;65\n20090512,52;60;68,47;57;67\n20090513,51;60;68,50;59;70\n20090514,57;62;66,51;58;69\n20090515,58;66;74,51;58;67\n20090516,58;65;71,54;70;93\n20090517,53;59;64,55;70;92\n20090518,50;55;59,51;55;63\n20090519,50;60;69,51;56;64\n20090520,53;67;81,49;55;62\n20090521,64;73;81,49;54;65\n20090522,63;75;86,51;54;63\n20090523,59;68;76,50;52;56\n20090524,57;71;84,49;51;56\n20090525,64;73;81,49;54;63\n20090526,53;60;66,49;59;73\n20090527,52;56;60,52;57;64\n20090528,56;58;59,51;55;62\n20090529,55;65;74,52;57;63\n20090530,63;71;78,54;56;62\n20090531,58;70;82,53;55;60\n20090601,53;61;69,53;56;61\n20090602,63;72;80,52;57;68\n20090603,54;64;73,53;58;67\n20090604,54;62;69,55;59;67\n20090605,55;59;62,57;62;70\n20090606,58;68;78,57;61;68\n20090607,66;74;82,56;61;67\n20090608,63;70;77,55;58;62\n20090609,60;67;73,56;60;66\n20090610,59;62;65,57;61;69\n20090611,59;61;63,56;60;68\n20090612,62;71;80,56;60;67\n20090613,64;68;71,56;62;70\n20090614,61;67;72,57;62;69\n20090615,58;65;71,58;61;68\n20090616,56;62;68,57;59;66\n20090617,57;63;69,57;60;66\n20090618,62;64;66,56;63;75\n20090619,63;71;79,55;62;71\n20090620,63;68;72,53;59;69\n20090621,63;71;78,53;60;70\n20090622,67;71;75,54;62;75\n20090623,67;74;80,54;63;77\n20090624,66;71;75,54;59;69\n20090625,65;73;81,54;58;66\n20090626,65;75;85,53;60;70\n20090627,66;74;81,53;68;85\n20090628,68;75;82,60;68;78\n20090629,68;76;83,56;61;68\n20090630,67;76;84,56;61;68\n20090701,67;73;79,56;61;68\n20090702,66;72;77,56;60;66\n20090703,68;74;80,55;58;65\n20090704,68;75;81,54;60;67\n20090705,64;72;80,55;57;63\n20090706,68;77;85,54;60;69\n20090707,62;73;83,56;58;62\n20090708,61;69;77,52;62;71\n20090709,62;68;73,53;59;68\n20090710,63;69;75,54;59;66\n20090711,65;71;77,53;58;68\n20090712,66;75;83,53;60;70\n20090713,65;72;79,53;66;84\n20090714,66;74;81,58;68;86\n20090715,67;75;83,53;59;66\n20090716,73;79;85,52;57;69\n20090717,69;79;88,52;58;69\n20090718,71;78;84,54;60;74\n20090719,68;76;83,54;61;73\n20090720,68;75;82,54;57;62\n20090721,65;68;71,53;56;61\n20090722,67;75;82,52;56;60\n20090723,64;72;80,52;55;61\n20090724,65;73;80,53;56;62\n20090725,67;77;86,52;56;67\n20090726,71;79;86,53;57;72\n20090727,71;78;85,52;57;70\n20090728,73;80;87,55;58;63\n20090729,73;78;83,58;58;58\n20090730,74;81;87,56;60;65\n20090731,69;79;89,55;58;64\n20090801,69;77;85,55;58;64\n20090802,73;76;78,56;60;66\n20090803,72;79;85,56;62;70\n20090804,72;79;86,57;64;73\n20090805,74;82;89,58;62;72\n20090806,68;74;79,59;63;71\n20090807,67;74;80,58;63;71\n20090808,65;72;78,58;64;76\n20090809,71;76;81,57;66;82\n20090810,71;83;94,59;66;82\n20090811,77;85;92,58;61;66\n20090812,71;76;80,57;66;79\n20090813,70;72;74,57;63;74\n20090814,69;77;85,56;61;70\n20090815,73;81;89,55;62;76\n20090816,75;83;91,55;62;73\n20090817,77;85;93,55;58;64\n20090818,73;82;91,55;59;65\n20090819,75;83;91,57;59;65\n20090820,76;83;89,56;60;67\n20090821,75;84;92,56;62;78\n20090822,72;79;85,56;59;64\n20090823,75;81;86,55;58;65\n20090824,72;78;84,54;58;64\n20090825,71;79;86,55;60;70\n20090826,74;81;87,55;59;68\n20090827,68;74;80,53;66;87\n20090828,66;70;73,63;76;97\n20090829,67;70;73,58;73;87\n20090830,66;75;83,55;57;62\n20090831,64;68;72,54;59;69\n20090901,59;67;74,58;63;72\n20090902,61;69;77,61;70;90\n20090903,64;71;78,58;67;79\n20090904,65;74;83,54;59;66\n20090905,71;78;85,56;62;70\n20090906,64;69;74,57;62;69\n20090907,61;67;72,56;63;73\n20090908,65;70;75,55;61;71\n20090909,65;71;76,54;58;66\n20090910,61;66;71,55;65;82\n20090911,58;64;69,54;62;76\n20090912,65;67;68,58;60;64\n20090913,67;74;81,59;64;73\n20090914,65;72;79,58;63;69\n20090915,68;75;81,57;63;73\n20090916,63;67;71,58;63;72\n20090917,57;61;65,59;67;79\n20090918,58;68;77,62;70;89\n20090919,55;63;71,58;62;73\n20090920,57;66;75,57;63;76\n20090921,61;69;76,56;61;71\n20090922,66;71;75,55;62;77\n20090923,69;76;82,56;58;65\n20090924,68;75;82,55;58;65\n20090925,59;64;69,55;61;73\n20090926,55;61;66,53;66;87\n20090927,60;65;69,59;68;84\n20090928,60;67;74,56;59;63\n20090929,58;63;68,55;58;64\n20090930,51;56;60,51;58;70\n20091001,51;54;57,52;64;79\n20091002,49;58;66,55;63;77\n20091003,65;68;71,52;57;63\n20091004,59;68;76,50;55;62\n20091005,55;62;68,50;57;68\n20091006,54;61;68,50;60;74\n20091007,59;65;71,53;58;68\n20091008,55;60;64,54;57;62\n20091009,61;66;71,52;56;63\n20091010,54;61;68,51;54;59\n20091011,50;58;65,51;54;59\n20091012,46;51;55,56;60;66\n20091013,47;56;64,58;61;64\n20091014,44;49;53,63;66;76\n20091015,39;44;48,64;67;76\n20091016,39;44;49,59;67;79\n20091017,44;47;50,56;64;74\n20091018,43;45;47,56;59;63\n20091019,41;50;58,57;60;68\n20091020,47;58;68,56;59;67\n20091021,53;61;69,54;60;71\n20091022,55;66;76,57;62;72\n20091023,51;59;66,55;63;75\n20091024,53;60;67,55;61;74\n20091025,53;59;65,54;64;81\n20091026,49;55;61,57;62;71\n20091027,50;54;58,54;59;69\n20091028,51;55;58,53;58;67\n20091029,49;54;58,51;58;67\n20091030,52;56;60,52;59;74\n20091031,56;64;71,53;58;72\n20091101,50;55;60,52;63;77\n20091102,48;52;55,56;66;81\n20091103,46;54;62,56;66;80\n20091104,44;48;52,54;58;65\n20091105,44;49;53,57;61;68\n20091106,41;46;50,53;59;63\n20091107,38;46;53,49;56;65\n20091108,48;60;71,50;57;68\n20091109,48;58;67,49;56;64\n20091110,56;60;64,54;58;66\n20091111,49;54;58,54;58;65\n20091112,48;51;53,51;56;62\n20091113,49;52;55,48;53;60\n20091114,52;55;58,50;54;61\n20091115,54;59;63,44;53;65\n20091116,49;54;59,47;54;66\n20091117,46;51;55,45;54;64\n20091118,43;48;53,48;53;62\n20091119,48;55;61,44;53;63\n20091120,50;56;61,46;52;58\n20091121,47;52;57,47;51;59\n20091122,46;51;56,49;53;59\n20091123,45;53;60,44;54;66\n20091124,49;53;57,48;58;69\n20091125,49;51;53,\n20091126,49;52;54,50;55;67\n20091127,44;47;50,51;54;58\n20091128,44;48;51,\n20091129,42;51;59,49;60;71\n20091130,41;49;57,48;55;64\n20091201,38;43;48,46;52;64\n20091202,40;49;57,45;48;55\n20091203,51;59;66,46;50;58\n20091204,46;49;52,44;48;57\n20091205,37;42;47,\n"
        }
        console.log('data():');
        console.log(data());
        this
            .title('Chart Title')
            .yLabel('Temperature (F)')
            .columns(["Date","NY","SF"])
            .series(["NY","SF"])
            .strokeWidth([1.5,1])
            .showRangeSelector(true)
            .rollPeriod(14)  
            .showRoller(true)
            .customBars(true)    
            .data(data)
    
        this.paletteID("hpcc20");
        
        return this;    
    }
    
    dyChart.prototype.testData3 = function(_) {
        this.columns(["Date","High","Low"])
        this._data = 
            "20070101,62,39\n" + "20070102,62,44\n" + "20070103,62,42\n" + "20070104,57,45\n" + "20070105,54,44\n" + "20070106,55,36\n" + "20070107,62,45\n" + "20070108,66,48\n" + "20070109,63,39\n" + "20070110,57,37\n" + "20070111,50,37\n" + "20070112,48,35\n" + "20070113,48,30\n" + "20070114,48,28\n" + "20070115,53,28\n" + "20070116,50,30\n" + "20070117,57,37\n" + "20070118,61,33\n" + "20070119,55,35\n" + "20070120,61,35\n" + "20070121,64,43\n" + "20070122,61,36\n" + "20070123,57,35\n" + "20070124,60,35\n" + "20070125,55,39\n" + "20070126,54,44\n" + "20070127,57,48\n" + "20070128,59,45\n" + "20070129,63,45\n" + "20070130,59,41\n" + "20070131,55,48\n" + "20070201,53,46\n" + "20070202,55,44\n" + "20070203,59,37\n" + "20070204,66,39\n" + "20070205,64,43\n" + "20070206,61,46\n" + "20070207,61,51\n" + "20070208,60,51\n" + "20070209,61,55\n" + "20070210,62,55\n" + "20070211,61,46\n" + "20070212,59,43\n" + "20070213,57,46\n" + "20070214,61,39\n" + "20070215,64,44\n" + "20070216,71,46\n" + "20070217,73,51\n" + "20070218,60,46\n" + "20070219,63,44\n" + "20070220,57,45\n" + "20070221,59,48\n" + "20070222,55,44\n" + "20070223,55,42\n" + "20070224,57,39\n" + "20070225,55,48\n" + "20070226,57,44\n" + "20070227,53,39\n" + "20070228,53,37\n" + "20070301,54,37\n" + "20070302,61,39\n" + "20070303,66,43\n" + "20070304,70,48\n" + "20070305,68,53\n" + "20070306,69,46\n" + "20070307,62,51\n" + "20070308,61,46\n" + "20070309,60,45\n" + "20070310,68,46\n" + "20070311,79,48\n" + "20070312,80,52\n" + "20070313,73,53\n" + "20070314,64,48\n" + "20070315,78,46\n" + "20070316,78,50\n" + "20070317,62,51\n" + "20070318,66,46\n" + "20070319,64,48\n" + "20070320,60,48\n" + "20070321,66,46\n" + "20070322,73,43\n" + "20070323,78,48\n" + "20070324,68,48\n" + "20070325,64,53\n" + "20070326,66,48\n" + "20070327,57,46\n" + "20070328,66,42\n" + "20070329,73,42\n" + "20070330,72,46\n" + "20070331,69,46\n" + "20070401,64,46\n" + "20070402,69,46\n" + "20070403,71,46\n" + "20070404,69,50\n" + "20070405,71,52\n" + "20070406,64,52\n" + "20070407,68,51\n" + "20070408,71,51\n" + "20070409,66,50\n" + "20070410,72,46\n" + "20070411,63,50\n" + "20070412,64,46\n" + "20070413,70,44\n" + "20070414,57,51\n" + "20070415,68,46\n" + "20070416,75,46\n" + "20070417,62,48\n" + "20070418,61,45\n" + "20070419,57,42\n" + "20070420,64,46\n" + "20070421,61,43\n" + "20070422,63,48\n" + "20070423,70,44\n" + "20070424,66,46\n" + "20070425,66,48\n" + "20070426,69,48\n" + "20070427,82,50\n" + "20070428,81,55\n" + "20070429,70,53\n" + "20070430,77,51\n" + "20070501,70,48\n" + "20070502,66,52\n" + "20070503,63,48\n" + "20070504,64,51\n" + "20070505,73,46\n" + "20070506,88,54\n" + "20070507,91,57\n" + "20070508,84,60\n" + "20070509,73,55\n" + "20070510,57,52\n" + "20070511,64,51\n" + "20070512,64,50\n" + "20070513,72,46\n" + "20070514,66,50\n" + "20070515,63,51\n" + "20070516,70,48\n" + "20070517,68,50\n" + "20070518,73,50\n" + "20070519,70,52\n" + "20070520,73,51\n" + "20070521,78,54\n" + "20070522,81,51\n" + "20070523,86,55\n" + "20070524,78,55\n" + "20070525,69,54\n" + "20070526,69,55\n" + "20070527,69,54\n" + "20070528,73,52\n" + "20070529,69,53\n" + "20070530,66,55\n" + "20070531,64,54\n" + "20070601,66,54\n" + "20070602,64,54\n" + "20070603,70,55\n" + "20070604,73,59\n" + "20070605,68,55\n" + "20070606,70,53\n" + "20070607,75,51\n" + "20070608,70,50\n" + "20070609,75,53\n" + "20070610,75,55\n" + "20070611,75,53\n" + "20070612,79,52\n" + "20070613,90,59\n" + "20070614,89,60\n" + "20070615,86,59\n" + "20070616,72,55\n" + "20070617,79,53\n" + "20070618,79,57\n" + "20070619,73,55\n" + "20070620,71,55\n" + "20070621,77,55\n" + "20070622,79,54\n" + "20070623,77,54\n" + "20070624,77,53\n" + "20070625,82,53\n" + "20070626,71,54\n" + "20070627,73,55\n" + "20070628,73,57\n" + "20070629,77,60\n" + "20070630,75,54\n" + "20070701,78,54\n" + "20070702,82,57\n" + "20070703,72,57\n" + "20070704,84,59\n" + "20070705,84,61\n" + "20070706,75,60\n" + "20070707,73,55\n" + "20070708,78,55\n" + "20070709,73,57\n" + "20070710,73,59\n" + "20070711,78,62\n" + "20070712,75,59\n" + "20070713,79,60\n" + "20070714,73,60\n" + "20070715,78,62\n" + "20070716,75,59\n" + "20070717,77,60\n" + "20070718,75,63\n" + "20070719,80,59\n" + "20070720,79,59\n" + "20070721,77,61\n" + "20070722,75,63\n" + "20070723,79,64\n" + "20070724,73,61\n" + "20070725,72,57\n" + "20070726,75,60\n" + "20070727,78,60\n" + "20070728,77,57\n" + "20070729,73,57\n" + "20070730,80,59\n" + "20070731,75,59\n" + "20070801,75,59\n" + "20070802,73,60\n" + "20070803,79,60\n" + "20070804,77,59\n" + "20070805,71,57\n" + "20070806,71,59\n" + "20070807,73,57\n" + "20070808,71,55\n" + "20070809,77,60\n" + "20070810,77,57\n" + "20070811,73,57\n" + "20070812,72,55\n" + "20070813,75,55\n" + "20070814,73,55\n" + "20070815,75,57\n" + "20070816,79,60\n" + "20070817,80,55\n" + "20070818,78,57\n" + "20070819,77,55\n" + "20070820,80,64\n" + "20070821,82,62\n" + "20070822,82,60\n" + "20070823,82,57\n" + "20070824,78,59\n" + "20070825,73,61\n" + "20070826,73,61\n" + "20070827,78,59\n" + "20070828,86,62\n" + "20070829,88,68\n" + "20070830,90,68\n" + "20070831,80,66\n" + "20070901,87,62\n" + "20070902,89,61\n" + "20070903,78,61\n" + "20070904,78,63\n" + "20070905,89,57\n" + "20070906,82,64\n" + "20070907,75,61\n" + "20070908,73,62\n" + "20070909,71,61\n" + "20070910,73,59\n" + "20070911,71,59\n" + "20070912,72,60\n" + "20070913,77,57\n" + "20070914,75,60\n" + "20070915,73,57\n" + "20070916,72,61\n" + "20070917,72,55\n" + "20070918,73,55\n" + "20070919,66,55\n" + "20070920,71,52\n" + "20070921,77,57\n" + "20070922,64,57\n" + "20070923,68,55\n" + "20070924,78,52\n" + "20070925,84,53\n" + "20070926,87,57\n" + "20070927,75,55\n" + "20070928,66,54\n" + "20070929,73,52\n" + "20070930,75,48\n" + "20071001,71,57\n" + "20071002,81,53\n" + "20071003,73,54\n" + "20071004,69,55\n" + "20071005,64,50\n" + "20071006,73,45\n" + "20071007,77,46\n" + "20071008,79,53\n" + "20071009,72,53\n" + "20071010,69,54\n" + "20071011,70,48\n" + "20071012,64,54\n" + "20071013,70,53\n" + "20071014,66,51\n" + "20071015,68,52\n" + "20071016,66,52\n" + "20071017,66,50\n" + "20071018,73,50\n" + "20071019,72,57\n" + "20071020,66,54\n" + "20071021,73,51\n" + "20071022,81,51\n" + "20071023,84,53\n" + "20071024,79,55\n" + "20071025,66,53\n" + "20071026,68,46\n" + "20071027,66,52\n" + "20071028,75,52\n" + "20071029,63,55\n" + "20071030,63,53\n" + "20071031,63,54\n" + "20071101,66,53\n" + "20071102,77,50\n" + "20071103,80,48\n" + "20071104,77,48\n" + "20071105,66,48\n" + "20071106,62,52\n" + "20071107,61,48\n" + "20071108,59,53\n" + "20071109,63,48\n" + "20071110,66,48\n" + "20071111,63,48\n" + "20071112,68,44\n" + "20071113,72,51\n" + "20071114,75,55\n" + "20071115,69,51\n" + "20071116,63,55\n" + "20071117,66,51\n" + "20071118,64,53\n" + "20071119,66,48\n" + "20071120,63,46\n" + "20071121,64,43\n" + "20071122,64,37\n" + "20071123,70,37\n" + "20071124,60,37\n" + "20071125,60,46\n" + "20071126,63,42\n" + "20071127,63,45\n" + "20071128,64,46\n" + "20071129,62,41\n" + "20071130,55,42\n" + "20071201,57,37\n" + "20071202,61,45\n" + "20071203,66,50\n" + "20071204,61,54\n" + "20071205,60,50\n" + "20071206,57,48\n" + "20071207,55,45\n" + "20071208,53,42\n" + "20071209,57,39\n" + "20071210,57,39\n" + "20071211,57,41\n" + "20071212,55,35\n" + "20071213,59,34\n" + "20071214,55,34\n" + "20071215,55,39\n" + "20071216,55,43\n" + "20071217,57,48\n" + "20071218,57,43\n" + "20071219,59,41\n" + "20071220,55,43\n" + "20071221,53,39\n" + "20071222,53,32\n" + "20071223,55,37\n" + "20071224,57,45\n" + "20071225,57,37\n" + "20071226,53,43\n" + "20071227,48,37\n" + "20071228,48,43\n" + "20071229,57,44\n" + "20071230,52,43\n" + "20071231,57,42\n";
        
        return this;
    }
    
    dyChart.prototype.customOptions = function(obj, overwrite) {
        this._customOptions.overwrite = overwrite || false;
        this._customOptions.options = obj;
    }
    
    function mergeJSON(source1,source2){
        // props from the source1 object will be copied to source2.
        var mergedJSON = Object.create(source2); // Copying Source2 to a new Object
        for (var attrname in source1) {
            if(mergedJSON.hasOwnProperty(attrname)) {
                if(source1[attrname]!=null && source1[attrname].constructor==Object){
                    mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
                } 
            } else {
                mergedJSON[attrname] = source1[attrname];
            }
        }
        return mergedJSON;
    }
    
    return dyChart;
}));
