"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.radar"], factory);
    } else {
        root.amchart_CommonRadar = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonRadar() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
        this._data = undefined;
        this._columns = undefined;
        this._valueField = [];
        this._categoryField = undefined;
        this._colors = [];
    }

    CommonRadar.prototype = Object.create(HTMLWidget.prototype);

    // NO X-Axis  !!!

    /**
     * Publish Params Common To Other Libraries
     */
    CommonRadar.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("lineWidth", 2, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:'range',tags:['Basic','Shared']});
    CommonRadar.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Basic','Shared']});
    CommonRadar.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:['Advanced','Shared']});

    CommonRadar.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Intermediate','Shared']});

    CommonRadar.prototype.publish("axisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisFontColor", null, "string", "Font Name",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisTitleFontSize", null, "html-color", "Font Size of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:['Private']});

    CommonRadar.prototype.publish("dataDateFormat", null, "string", "Date Format String",null,{tags:['Private']});

    CommonRadar.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});

    //CommonRadar.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:['Advanced']});
    //CommonRadar.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    //CommonRadar.prototype.publish("yAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    //CommonRadar.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("yAxisMinimum", [], "array", "",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisTitleOffset", [], "array", "",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisDashLength", [], "array", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("circularGrid", false, "boolean", "Circular Grid",null,{tags:['Intermediate']}); // not dynamic

    CommonRadar.prototype.publish("bulletSize", 9, "number", "Bullet Size",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:['Intermediate']});

    CommonRadar.prototype.publish("fillOpacity", 0.3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate']});

    CommonRadar.prototype.updateChartOptions = function() {
        var context = this;

        if (this.dataDateFormat()) { this._chart.dataDateFormat = this.dataDateFormat(); }
        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this.startDuration();
        this._chart.categoryField = this._categoryField;

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this.titles = [];

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        // ValueAxis
        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();
        this._chart.valueAxes[0].minimum = this.yAxisMinimum();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength() || this.dashedLineStyle();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].color = this.yAxisFontColor();

        this._chart.valueAxes[0].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.yAxisGridPosition();

        // Color Palette
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
        if(this.circularGrid()){ // not dynamic
            this._chart.valueAxes.forEach(function(va,i){
                context._chart.valueAxes[i].gridType = "circles";
            });
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonRadar.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonText = context.tooltipTemplate();
        gObj.fillAlphas = context.fillOpacity();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop


        gObj.type = gType;

        gObj.title = '';

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
    };
    
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
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonRadar.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());
    };

    return CommonRadar;
}));
