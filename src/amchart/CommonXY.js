"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.xy"], factory);
    } else {
        root.amchart_CommonXY = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }
}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }
    CommonXY.prototype = Object.create(HTMLWidget.prototype);
    CommonXY.prototype.constructor = CommonXY;
    CommonXY.prototype._class += " amchart_CommonXY";

    /**
     * Publish Params Common To Other Libraries
     */

    CommonXY.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:'range',tags:['Basic','Shared']});
    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Basic','Shared']});

    CommonXY.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:['Advanced','Shared']});

    CommonXY.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal axis text style (Color)",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisFontColor", null, "html-color", "Vertical axis text style (Color)",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:['Intermediate','Shared']});

    CommonXY.prototype.publish("xAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range',tags:['Intermediate','Shared']});

    CommonXY.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonXY.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:['Intermediate']});

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("dataDateFormat", null, "string", "",null,{tags:['Private']});

    CommonXY.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});

    CommonXY.prototype.publish("xAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});

    CommonXY.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});

    //CommonXY.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:['Intermediate','Shared']});

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataDateFormat = this.dataDateFormat();

        this._chart.valueAxes[0].position = "bottom";
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].title = this.xAxisTitle();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].axisColor = this.xAxisBaselineColor();
        this._chart.valueAxes[0].color = this.xAxisFontColor();
        this._chart.valueAxes[0].titleFontSize = this.xAxisTitleFontSize();
        this._chart.valueAxes[0].titleColor = this.xAxisTitleFontColor();
        this._chart.valueAxes[0].labelRotation = this.xAxisLabelRotation();
        this._chart.valueAxes[0].autoGridCount = this.xAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.xAxisGridPosition();
        this._chart.valueAxes[0].fillAlpha = this.xAxisFillAlpha();
        this._chart.valueAxes[0].fillColor = this.xAxisFillColor();
        this._chart.valueAxes[0].gridAlpha = this.xAxisGridAlpha();
        this._chart.valueAxes[0].dashLength = this.xAxisDashLength();

        this._chart.valueAxes[1].position = "left";
        this._chart.valueAxes[1].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[1].title = this.yAxisTitle();
        this._chart.valueAxes[1].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[1].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[1].color = this.yAxisFontColor();
        this._chart.valueAxes[1].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[1].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[1].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[1].gridPosition = this.yAxisGridPosition();
        this._chart.valueAxes[1].fillAlpha = this.yAxisFillAlpha();
        this._chart.valueAxes[1].fillColor = this.yAxisFillColor();
        this._chart.valueAxes[1].gridAlpha = this.yAxisGridAlpha();
        this._chart.valueAxes[1].dashLength = this.yAxisDashLength();
        this._chart.valueAxes[1].axisTitleOffset = this.yAxisTitleOffset();

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(dataPoint[context._columns[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context._columns[2]]);
        });
        this._chart.colors = [];

        // Scroll Bar
        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonXY.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonText = context.tooltipTemplate();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();

        gObj.type = gType;

        gObj.colorField = "color";
        gObj.lineColorField = "linecolor";

        // XY Values
        gObj.xField = context._columns[1];
        gObj.yField = context._columns[2];

        return gObj;
    };

    CommonXY.prototype.formatData = function(dataArr) {
        var context = this;
        var dataObjArr = [];
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonXY.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
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
        var context = this;
        var initObj = {
            theme: "none",
            type: "xy",
            automargins: false,
            chartScrollbar: {},
            valueAxes: [
                {position:"bottom",title:" "},
                {position:"left",title:" "}
            ],
            graphs: [{}],
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
        };

        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            context.click(context.rowToObj(context._data[e.index]), context._columns[e.target.columnIndex+1]);
        });
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    return CommonXY;
}));