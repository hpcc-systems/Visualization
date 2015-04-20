"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.xy", "../../chart/INDChart"], factory);
    } else {
        root.CommonXY = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function CommonXY() {
        HTMLWidget.call(this);

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    };

    CommonXY.prototype = Object.create(HTMLWidget.prototype);

    CommonXY.prototype.implements(INDChart.prototype);
    CommonXY.prototype.publish("paletteID", "default", "set", "Palette ID", CommonXY.prototype._palette.switch());

    CommonXY.prototype.publish("yAxisTitle", "Axis title", "string", "Y-Axis Title");
    CommonXY.prototype.publish("xAxisTitle", "Axis title", "string", "X-Axis Title");

    // need to figure out this with gType and figure how how to do it cleanly
    //CommonSerial.prototype.publish("typeArr", [], "array", "Graph Type Array");

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)");
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)");
    CommonXY.prototype.publish("marginTop", 10, "number", "Margin (Top)");
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)");

    CommonXY.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    CommonXY.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");

    CommonXY.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);

    CommonXY.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text"); //x:[[x]] y:[[y]]
    CommonXY.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");

    CommonXY.prototype.publish("globalFillAlpha", 0, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("globalLineAlpha", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("globalLineThickness", 0, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("globalBulletSize", 8, "number", "Bullet Size");
    CommonXY.prototype.publish("globalBulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);

    CommonXY.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonXY.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonXY.prototype.publish("graphBulletType", [], "array", "Bullet Type");

    CommonXY.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");

    CommonXY.prototype.publish("showGuides", false, "boolean", "Show Guides");

    //make guide into an array of objects
    CommonXY.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Area Guides");

    // TODO break this out into its own FILE common.js
    CommonXY.prototype.publish("dataDateFormat", null, "string", "Show Guides");

    CommonXY.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    CommonXY.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    CommonXY.prototype.publish("categoryAxisAxisAlpha", 1, "number", "Axis opacity");
    //
    CommonXY.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    CommonXY.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    CommonXY.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    CommonXY.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    CommonXY.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    // dateFormats
    // equalSpacing
    CommonXY.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonXY.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonXY.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    // forceShowField
    CommonXY.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");

    CommonXY.prototype.publish("numValueAxis", 1, "number", "Grid alpha.");
    CommonXY.prototype.publish("valueAxesId", [], "array", "");
    CommonXY.prototype.publish("valueAxesTitle", [], "array", "");
    CommonXY.prototype.publish("valueAxesMinimum", [], "array", "");
    CommonXY.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    CommonXY.prototype.publish("valueAxesAxisAxisAlpha", [], "array", "");

    CommonXY.prototype.publish("xAxisLabelRotation", 30, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range'});
    CommonXY.prototype.publish("startOnAxis", true, "boolean", "Draw chart starting on axis.");

    // we will have these but not used.. perfer manual settting of margins
    CommonXY.prototype.publish("autoMargins", true, "boolean", "");
    CommonXY.prototype.publish("marginsUpdated", true, "boolean", "");
    CommonXY.prototype.publish("autoMarginOffset", 30, "number", "");

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";
        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";

        // we will have these but not used.. perfer manual settting of margins
        //this._chart.autoMargins = this._autoMargins;
        //this._chart.autoMarginOffset = this._autoMarginOffset;
        //this._chart.marginsUpdated = this._marginsUpdated;

        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRgight = this._marginRight;
        this._chart.marginTop = this._marginTop;
        this._chart.marginBottom = this._marginBottom;

        this._chart.dataDateFormat = this._dataDateFormat;

        this._chart.valueAxes[0].position = "bottom";
        this._chart.valueAxes[0].axisAlpha = 0;
        this._chart.valueAxes[0].dashLength = 1;
        this._chart.valueAxes[0].title = this._xAxisTitle;

        this._chart.valueAxes[1].position = "left";
        this._chart.valueAxes[1].axisAlpha = 0;
        this._chart.valueAxes[1].dashLength = 1;
        this._chart.valueAxes[1].title = this._yAxisTitle;

        buildGraphs.call(this,undefined);

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 

        // Scroll Bar
        if (this._chartScrollbar) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }


        return this._chart;
    };

    function buildGraphs(gType) {
        var context = this;
        function buildGraphObj(type,vf) {
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
            gObj.lineThickness = context._graphLineThickness[i] || context._globalLineThickness;
            gObj.bullet = context._graphBulletType[i] || context._globalBulletType;
            gObj.bulletSize = context._graphBulletSize[i] || context._globalBulletSize;

            gObj.type = gType;
            gObj.columnWidth = context._columnWidth;

            gObj.xField = "Calories";
            gObj.yField = "Sugars";

            if(context._cylinderBars){
                gObj.topRadius = context._circleRadius;
            } else {
                gObj.topRadius = undefined;
            }

            gObj.title = vf;
            //gObj.valueField = vf;
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }

            gObj.lineColor = "#FF6600";     

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
                    var gObj = buildGraphObj("edit",vf);
                    for (var key in gObj) {
                        this._chart.graphs[i][key] = gObj[key];
                    }
                } else {
                    console.log('creating new graph:'+i);
                    var gObj = buildGraphObj("new",vf);
                    this._chart.addGraph(gObj);
                }
            } 
            else {
                console.log('deleting graph:'+i);
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }
    };

    CommonXY.prototype.formatData = function(dataArr) {
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow) {
            //console.log(dataRow);
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            })
            dataObjArr.push(dataObj);
        });
        console.log(dataObjArr);
        return dataObjArr;
    }

    CommonXY.prototype.columns = function(colArr) {
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

    CommonXY.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            theme: "none",
            type: "xy",
            pathToImages: "//www.amcharts.com/lib/3/images/",
            autoMargins: false,
            //autoMarginOffset:25,
            //marginsUpdated: false,            
            marginLeft:50,
            marginRight:10,
            marginTop:10,
            marginBottom:50,          
            chartScrollbar: {},
            valueAxes: [       
                {position:"bottom",title:" "},
                {position:"left",title:" "}
            ],
            graphs: [{}], // might need 2
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
        };
        
        this._chart = AmCharts.makeChart(domNode, initObj);        
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 


        this._palette = this._palette.switch(this._paletteID);

    };



    return CommonXY;
}));