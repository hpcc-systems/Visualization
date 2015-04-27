"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.radar"], factory);
    } else {
        root.amcharts_CommonRadar = factory(root.d3, root.common_HTMLWidget, root.amcharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
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

    CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)");
    CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)");
    CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)");
    CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)");
    
    CommonRadar.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonRadar.prototype.publish("globalFillAlpha", .3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonRadar.prototype.publish("globalLineAlpha", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); 
    CommonRadar.prototype.publish("globalLineThickness", 2, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); 
    CommonRadar.prototype.publish("globalBulletSize", 9, "number", "Bullet Size");
    CommonRadar.prototype.publish("globalBulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    CommonRadar.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); 
    CommonRadar.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); 
    CommonRadar.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'});
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
    
    CommonRadar.prototype.publish("circularGrid", false, "boolean", "Circular Grid"); // not dynamic
    
    CommonRadar.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.pathToImages = "//cdn.rawgit.com/cdnjs/cdnjs/master/ajax/libs/amcharts/3.13.0/images/";
        this._chart.dataDateFormat = this._dataDateFormat;
        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this.startDuration();
        this._chart.categoryField = this._categoryField;
       
        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }
       
        this.titles = [];
        
        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 
            
        // ValueAxis
        for (var i = 1, j = this.numValueAxis(); i < j; i++) {
            this._chart.valueAxes[i].id = this.valueAxesId()[i],
            this._chart.valueAxes[i].title = this.valueAxesTitle()[i];
        }
        
        //this._chart.valueAxes[i].id = this._valueAxesId[i] // causes issue
        this._chart.valueAxes[0].title = this.valueAxesTitle()[0];
        this._chart.valueAxes[0].axisTitleOffset = this.valueAxesAxisTitleOffset()[0];
        this._chart.valueAxes[0].minimum = this.valueAxesMinimum()[0];
        this._chart.valueAxes[0].axisAlpha = this.valueAxesAxisAlpha()[0];
        this._chart.valueAxes[0].dashLength = this.valueAxesDashLength()[0];
    
        // Color Palette
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
        if(this.circularGrid()){ // not dynamic
            this._chart.valueAxes.forEach(function(va,i){
                context._chart.valueAxes[i].gridType = "circles"
            })
        }
        
        if (this.chartScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }
        
        return this._chart;
    };
    
    CommonRadar.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {}; 

        gObj.balloonText = context.graphTooltipText()[i] || context.globalTooltipText();
        gObj.fillAlphas = context.graphFillAlpha()[i] || context.globalFillAlpha();
        gObj.lineAlpha = context.graphLineAlpha()[i] || context.globalLineAlpha();
        gObj.lineThickness = context.graphLineThickness()[i] || context.globalLineThickness();
        gObj.bullet = context.graphBulletType()[i] || context.globalBulletType();
        gObj.bulletSize = context.graphBulletSize()[i] || context.globalBulletSize();
        
        gObj.type = gType;

        gObj.title = 'temp title';
        
        gObj.colorField = "color";
        gObj.lineColorField = "linecolor";

        return gObj;
    };
    
    CommonRadar.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    }
    
    CommonRadar.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
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
        
        this._palette = this._palette.switch(this.paletteID()); 
    };
    
    return CommonRadar;
}));
