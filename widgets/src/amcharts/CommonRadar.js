"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "amcharts.radar", "../chart/INDChart"], factory);
    } else {
        root.amcharts_CommonRadar = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.chart_INDChart);
    }

}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function CommonRadar() {
        HTMLWidget.call(this);
        this._tag = "div";
        
        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    };
    
    CommonRadar.prototype = Object.create(HTMLWidget.prototype);

    CommonRadar.prototype.implements(INDChart.prototype);
    CommonRadar.prototype.publish("paletteID", "Dark2", "set", "Palette ID", CommonRadar.prototype._palette.switch());
    
    CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)");
    CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)");
    CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)");
    CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)");
    
    CommonRadar.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    CommonRadar.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonRadar.prototype.publish("globalFillAlpha", .3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("globalLineAlpha", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("globalLineThickness", 2, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("globalBulletSize", 9, "number", "Bullet Size");
    CommonRadar.prototype.publish("globalBulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    CommonRadar.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonRadar.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonRadar.prototype.publish("graphBulletType", [], "array", "Bullet Type");
    
    CommonRadar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    CommonRadar.prototype.publish("dataDateFormat", null, "string", "");
    
    CommonRadar.prototype.publish("categoryAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size");
    CommonRadar.prototype.publish("categoryAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"]);
    CommonRadar.prototype.publish("categoryAxisAlpha", 1, "number", "Axis opacity");
    CommonRadar.prototype.publish("categoryAxisAxisColor", "#000000", "html-color", "Axis color");
    CommonRadar.prototype.publish("categoryAxisAxisThickness", 1, "number", "Thickness of axis");
    CommonRadar.prototype.publish("categoryAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.");
    CommonRadar.prototype.publish("categoryAxisColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.");
    CommonRadar.prototype.publish("categoryAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.");
    CommonRadar.prototype.publish("categoryAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonRadar.prototype.publish("categoryAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.");
    CommonRadar.prototype.publish("categoryAxisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.");
    CommonRadar.prototype.publish("categoryAxisGridAlpha", 0.2, "number", "Grid alpha.");
    
    CommonRadar.prototype.publish("numValueAxis", 1, "number", "");
    CommonRadar.prototype.publish("valueAxesId", [], "array", "");
    CommonRadar.prototype.publish("valueAxesTitle", [], "array", "");
    CommonRadar.prototype.publish("valueAxesMinimum", [], "array", "");
    CommonRadar.prototype.publish("valueAxesAxisTitleOffset", [], "array", "");
    CommonRadar.prototype.publish("valueAxesAxisAlpha", [], "array", "");
    CommonRadar.prototype.publish("valueAxesDashLength", [], "array", "Length of a dash. 0 means line is not dashed.");
    
    CommonRadar.prototype.publish("circularGrid", true, "boolean", "Circular Grid");
    
    CommonRadar.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        this._chart.dataDateFormat = this._dataDateFormat;
        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this._startDuration;
        this._chart.rotate = this._orientation === "vertical";
        this._chart.categoryField = this._categoryField;
       
        if (this._marginLeft) { this._chart.marginLeft = this._marginLeft; }
        if (this._marginRight) { this._chart.marginRight = this._marginRight; }
        if (this._marginTop) { this._chart.marginTop = this._marginTop; }
        if (this._marginBottom) { this._chart.marginBottom = this._marginBottom; }
       
        this.titles = [];
        
        // Build Graphs
        buildGraphs.call(this,this._gType);
        
        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 
            
        // ValueAxis
        for (var i = 1, j = this._numValueAxis; i < j; i++) {
            this._chart.valueAxes[i].id = this._valueAxesId[i],
            this._chart.valueAxes[i].title = this._valueAxesTitle[i];
        }
        
        //this._chart.valueAxes[i].id = this._valueAxesId[i] // causes issue
        this._chart.valueAxes[0].title = this._valueAxesTitle[0];
        this._chart.valueAxes[0].axisTitleOffset = this._valueAxesAxisTitleOffset[0];
        this._chart.valueAxes[0].minimum = this._valueAxesMinimum[0];
        this._chart.valueAxes[0].axisAlpha = this._valueAxesAxisAlpha[0];
        this._chart.valueAxes[0].dashLength = this._valueAxesDashLength[0];
    
        // Color Palette
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
        if(this._circularGrid){
            this._chart.valueAxes.forEach(function(va,i){
                context._chart.valueAxes[i].gridType = "circles"
            })
        }
        
        // Others
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
        function buildGraphObj(type,vf) {
            switch(type) {
                case "new":
                    var gObj = new AmCharts.AmGraph(); 
                break;
                case "edit":
                    var gObj = {};
                break;
            }

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
    
    CommonRadar.prototype.formatData = function(dataArr){
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
    
    CommonRadar.prototype.columns = function(colArr) {
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
   
    CommonRadar.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            theme: "none",
            type: "radar",
            chartScrollbar: {}
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonRadar.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 
        
        this._palette = this._palette.switch(this._paletteID);
    };
    
    return CommonRadar;
}));
