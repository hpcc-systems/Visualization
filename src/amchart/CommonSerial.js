"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.serial"], factory);
    } else {
        root.amcharts_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.amcharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
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
    
    CommonSerial.prototype.publish("yAxisTitle", "Axis title", "string", "Y-Axis Title");
    CommonSerial.prototype.publish("xAxisTitle", "Axis title", "string", "X-Axis Title");
    
    CommonSerial.prototype.publish("marginLeft", null, "number", "Margin (Left)");
    CommonSerial.prototype.publish("marginRight", null, "number", "Margin (Right)");
    CommonSerial.prototype.publish("marginTop", null, "number", "Margin (Top)");
    CommonSerial.prototype.publish("marginBottom", null, "number", "Margin (Bottom)");

    CommonSerial.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"]);
    
    CommonSerial.prototype.publish("globalFillAlpha", .7, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); 
    CommonSerial.prototype.publish("globalLineAlpha", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); 
    CommonSerial.prototype.publish("globalLineThickness", 2, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); 
    CommonSerial.prototype.publish("globalBulletSize", 0, "number", "Bullet Size");
    CommonSerial.prototype.publish("globalBulletType", "none", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    CommonSerial.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); 
    CommonSerial.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonSerial.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonSerial.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonSerial.prototype.publish("graphBulletType", [], "array", "Bullet Type");
    
    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");

    CommonSerial.prototype.publish("dataDateFormat", null, "string", "");
    
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

        this._chart.pathToImages = "//cdn.rawgit.com/cdnjs/cdnjs/master/ajax/libs/amcharts/3.13.0/images/";
        this._chart.dataDateFormat = this.dataDateFormat();
        this._chart.type = "serial";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.orientation() === "vertical"; // this messes up the hover over things
        this._chart.categoryField = this._categoryField;
        
        this._chart.categoryAxis = {};
        this._chart.categoryAxis.autoGridCount = this.categoryAxisAutoGridCount();
        this._chart.categoryAxis.gridPosition = "start";
        this._chart.categoryAxis.axisAlpha = this.categoryAxisAxisAlpha();
        this._chart.categoryAxis.gridAlpha = this.categoryAxisGridAlpha();
        this._chart.categoryAxis.startOnAxis = this.startOnAxis();
        this._chart.categoryAxis.labelRotation = this.xAxisLabelRotation();
        this._chart.categoryAxis.title = this.xAxisTitle();
        
        this._chart.titles = [];
        
        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataProvider = this.formatData(this._data); 
            
        // ValueAxis

        for (var i = 1, j = this.numValueAxis(); i < j; i++) {
            this._chart.valueAxes[i].id = this.valueAxesId()[i],
            this._chart.valueAxes[i].title = this.valueAxesTitle()[i];
        }
        this._chart.valueAxes[0].title = this.valueAxesTitle()[0] || this.yAxisTitle();
        
        if (this.chartScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }
        
        return this._chart;
    };
    
       
    CommonSerial.prototype.buildGraphObj = function(gType,i) {
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
        var fieldArr = ['value','open','close','high','low'];
        fieldArr.forEach(function(field){
            if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                gObj[field+'Field'] = context['_'+field+'Field'][i];
            }
        });
        
        if (typeof(context.paletteGrouping) === 'function') {
            if(context.paletteGrouping() === "Main"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }
        }
        try{
            if(context.useImgPatterns()){
                var patternArr = JSON.parse(context.imgPatternArr());
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
    };

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
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
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
        this._palette = this._palette.switch(this.paletteID()); 
    };
    
    return CommonSerial;
}));
