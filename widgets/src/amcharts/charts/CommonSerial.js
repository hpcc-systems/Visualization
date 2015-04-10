"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.CommonSerial = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }

}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";
        
        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    };
    
    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    CommonSerial.prototype.implements(INDChart.prototype);
    CommonSerial.prototype.publish("paletteID", "Dark2", "set", "Palette ID", CommonSerial.prototype._palette.switch());
    
    CommonSerial.prototype.publish("yAxisTitle", "Axis title", "string", "Y-Axis Title");
    CommonSerial.prototype.publish("xAxisTitle", "Axis title", "string", "X-Axis Title");
    
    CommonSerial.prototype.publish("marginLeft", 0, "number", "Margin (Left)");
    CommonSerial.prototype.publish("marginRight", 0, "number", "Margin (Right)");
    CommonSerial.prototype.publish("marginTop", 0, "number", "Margin (Top)");
    CommonSerial.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)");

    CommonSerial.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);
    
    CommonSerial.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    CommonSerial.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text Array");
    
    CommonSerial.prototype.publish("globalFillAlpha", .7, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("globalLineAlpha", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("globalLineThickness", 2, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("globalBulletSize", 0, "number", "Bullet Size");
    CommonSerial.prototype.publish("globalBulletType", "none", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    CommonSerial.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonSerial.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonSerial.prototype.publish("graphBulletType", [], "array", "Bullet Type");
    
    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    CommonSerial.prototype.publish("showGuides", false, "boolean", "Show Guides");
    
    CommonSerial.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Area Guides");
    
    CommonSerial.prototype.publish("dataDateFormat", null, "string", "Show Guides");
    
    CommonSerial.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    CommonSerial.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    CommonSerial.prototype.publish("categoryAxisAxisAlpha", 1, "number", "Axis opacity");
    CommonSerial.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    CommonSerial.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    CommonSerial.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    CommonSerial.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    CommonSerial.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    CommonSerial.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonSerial.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonSerial.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    CommonSerial.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");
    //CommonSerial.prototype.publish("categoryAxisTitle", 'X-Axis', "string", ""); -----> xAxisTitle
    
    CommonSerial.prototype.publish("numValueAxis", 1, "number", "Grid alpha.");
    CommonSerial.prototype.publish("valueAxesId", [], "array", "");
    CommonSerial.prototype.publish("valueAxesTitle", [], "array", "");
    CommonSerial.prototype.publish("valueAxesMinimum", [], "array", "");
    CommonSerial.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    CommonSerial.prototype.publish("valueAxesAxisAxisAlpha", [], "array", "");
    
    CommonSerial.prototype.publish("xAxisLabelRotation", 30, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range'});
    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw chart starting on axis.");
    
    CommonSerial.prototype.publish("useImgPatterns", false, "boolean", "Enable Image Pattern backgrounds");
    CommonSerial.prototype.publish("imgPatternArr", '["../ampatterns/black/pattern2.png"]', "string", "Background Pattern Images (Not used if '[]')",null,{inputType:'textarea'});
    
    CommonSerial.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines");
    
    CommonSerial.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        this._chart.dataDateFormat = this._dataDateFormat;
        this._chart.type = "serial";
        this._chart.startDuration = this._startDuration;
        this._chart.rotate = this._orientation === "vertical"; // this messes up the hover over things
        this._chart.categoryField = this._categoryField;
        
        this._chart.categoryAxis = {};
        this._chart.categoryAxis.autoGridCount = this._categoryAxisAutoGridCount;
        this._chart.categoryAxis.gridPosition = "start";
        this._chart.categoryAxis.axisAlpha = this._categoryAxisAxisAlpha;
        this._chart.categoryAxis.gridAlpha = this._categoryAxisGridAlpha;
        this._chart.categoryAxis.startOnAxis = this._startOnAxis;
        this._chart.categoryAxis.labelRotation = this._xAxisLabelRotation;
        this._chart.categoryAxis.title = this._xAxisTitle;
                
        this._chart.guides = buildGuides(this._guides)
        
        this._chart.titles = [];
        
        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRight = this._marginRight;
        this._chart.marginTop = this._marginTop;
        this._chart.marginBottom = this._marginBottom;
        
        buildGraphs.call(this,this._gType);
      
        this._chart.dataProvider = this.formatData(this._data); 
            
        // ValueAxis
        for (var i = 1, j = this._numValueAxis; i < j; i++) {
            this._chart.valueAxes[i].id = this._valueAxesId[i],
            this._chart.valueAxes[i].title = this._valueAxesTitle[i];
        }
        this._chart.valueAxes[0].title = this._valueAxesTitle[0] || this._yAxisTitle;

        
        // Color Palette
        if(this._paletteGrouping === "Main"){
            this._chart.dataProvider.forEach(function(dataPoint,i){
                context._chart.dataProvider[i].color = context._palette(i);
                context._chart.dataProvider[i].linecolor = context._lineColor !== null ? context._lineColor : context._palette(i);
            });
            this._chart.colors = [];
        } else if (this._paletteGrouping === "Columns") {
            this._colors = [];
            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                context._colors.push(context._palette(i));
            });
            this._chart.colors = this._colors;
        } else { // stick this per chart?
            this._colors = [];
            this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
                context._colors.push(context._palette(i));
            });
            this._chart.colors = this._colors;
        }
        
        // Stacked
        if(this._isStacked){
            this._chart.valueAxes[0].stackType = this._stackType;
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }
        
        if (this._chartScrollbar) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }
        
        return this._chart;
    };
    
    function buildGraphs(gType) {
        var context = this;
        
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length; 
        var buildGraphCount = Math.max(currentGraphCount, typeof (this._openField) !== 'undefined' ? this._openField.length : this._valueField.length);
        
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined') 
                    || (typeof(this._openField) !== 'undefined' && typeof(this._openField[i]) !== 'undefined')) {
                var gObj = buildGraphObj();
                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }
        
        function buildGraphObj() {
            var gObj = {}; 

            gObj.balloonText = context._graphTooltipText[i] || context._globalTooltipText;
            gObj.fillAlphas = context._graphFillAlpha[i] || context._globalFillAlpha;
            gObj.lineAlpha = context._graphLineAlpha[i] || context._globalLineAlpha;
            gObj.lineThickness = context._graphLineThickness[i] || context._globalLineThickness;
            gObj.bullet = context._graphBulletType[i] || context._globalBulletType;
            gObj.bulletSize = context._graphBulletSize[i] || context._globalBulletSize;
            
            gObj.type = gType;

            gObj.columnWidth = context._columnWidth;
            
            if(context._cylinderBars){
                gObj.topRadius = context._circleRadius;
            } else {
                gObj.topRadius = undefined;
            }
            
            gObj.title = 'temp title';
            var fieldArr = ['value','open','close','high','low'];
            fieldArr.forEach(function(field){
                if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                    gObj[field+'Field'] = context['_'+field+'Field'][i];
                }
            });
            
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }
            
            try{
                if(context._useImgPatterns){
                    var patternArr = JSON.parse(context._imgPatternArr);
                    if(typeof (patternArr[i]) !== 'undefined'){
                        gObj.pattern = patternArr[i];
                    }
                } else {
                    gObj.pattern = '';
                }
            }catch(e){
                console.log('e:');
                console.log(e);
            }
            return gObj;
        }
    };
    
    
    function buildGuides(guideArr){
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

    CommonSerial.prototype.formatData = function(dataArr) {
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonSerial.prototype.columns = function(colArr) {
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

    CommonSerial.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            type: "serial",
            chartScrollbar: {},
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonSerial.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 
        this._palette = this._palette.switch(this._paletteID);
    };
    
    return CommonSerial;
}));
