"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.xy", "require"], factory);
    } else {
        root.amchart_CommonXY = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, require) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
    }
    CommonXY.prototype = Object.create(HTMLWidget.prototype);
    CommonXY.prototype.constructor = CommonXY;
    CommonXY.prototype._class += " amchart_CommonXY";

    CommonXY.prototype.publish("xAxisType", "ordinal", "set", "X Axis Type", ["linear", "ordinal"],{tags:["Intermediate"]});

    CommonXY.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonXY.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonXY.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:["Advanced","Shared"]});

    CommonXY.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("xAxisBaselineColor", "#000000", "html-color", "Axis color",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("yAxisBaselineColor", "#000000", "html-color", "Axis color",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal axis text style (Color)",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("yAxisFontColor", null, "html-color", "Vertical axis text style (Color)",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("xAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Intermediate"]});

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:["Advanced"]});
    CommonXY.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:["Advanced"]});

    CommonXY.prototype.publish("xAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:["Advanced"]});
    CommonXY.prototype.publish("yAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:["Advanced"]});

    CommonXY.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("xAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    CommonXY.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});

    //CommonXY.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("yAxisTickFormat", null, "string", "Y-Axis Tick Format", null, { optional: true });
    CommonXY.prototype.publish("xAxisTickFormat", null, "string", "X-Axis Tick Format", null, { optional: true });

    CommonXY.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonXY.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    CommonXY.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

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

        
        // left vAxis must always be 0 and bottom 1

        this._chart.valueAxes[1].position = "bottom";
        this._chart.valueAxes[1].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[1].title = this.xAxisTitle();
        this._chart.valueAxes[1].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[1].axisColor = this.xAxisBaselineColor();
        this._chart.valueAxes[1].color = this.xAxisFontColor();
        this._chart.valueAxes[1].titleFontSize = this.xAxisTitleFontSize();
        this._chart.valueAxes[1].titleColor = this.xAxisTitleFontColor();
        this._chart.valueAxes[1].labelRotation = this.xAxisLabelRotation();
        this._chart.valueAxes[1].autoGridCount = this.xAxisAutoGridCount();
        this._chart.valueAxes[1].gridPosition = this.xAxisGridPosition();
        this._chart.valueAxes[1].fillAlpha = this.xAxisFillAlpha();
        this._chart.valueAxes[1].fillColor = this.xAxisFillColor();
        this._chart.valueAxes[1].gridAlpha = this.xAxisGridAlpha();
        this._chart.valueAxes[1].dashLength = this.xAxisDashLength();

        this._chart.dataProvider = this.formatData(this.data());

        if (this.xAxisType() === "ordinal") {
            this._chart.valueAxes[1].integersOnly = true;
            this._chart.valueAxes[1].maximum = this.data().length;
            this._chart.valueAxes[1].labelFunction = function(a, b) {
                if (b > context.data().length) {
                    return ""; // so the the last dots arent on the edge
                }
                return context.data().length && b > 0 ? context.data()[b-1][0] : "";
            };
        } else {
            this._chart.valueAxes[1].labelFunction = function(d) {
                return d3.format(context.xAxisTickFormat())(d);
            };
        }

        this._chart.valueAxes[0].position = "left";
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].color = this.yAxisFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.yAxisGridPosition();
        this._chart.valueAxes[0].fillAlpha = this.yAxisFillAlpha();
        this._chart.valueAxes[0].fillColor = this.yAxisFillColor();
        this._chart.valueAxes[0].gridAlpha = this.yAxisGridAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();

        this._chart.valueAxes[0].labelFunction = function(a, b) {
            return d3.format(context.yAxisTickFormat())(b);
        };

        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(dataPoint[context.columns()[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context.columns()[2]]);
        });

        this._chart.colors = [];

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        if (this.showCursor()) {
            this._chart.precision = this.xAxisType() === "ordinal" ? 1 : undefined; // so ordinal will work with labelfunction
            this._chart.chartCursor.enabled = true;
            this._chart.chartCursor.valueLineEnabled = true;
            this._chart.chartCursor.valueLineBalloonEnabled = true;
            this._chart.chartCursor.categoryBalloonEnabled = true;
        } else {
            this._chart.precision = undefined; // so ordinal will work with labelfunction
            this._chart.chartCursor.enabled = false;
            this._chart.chartCursor.valueLineEnabled = false;
            this._chart.chartCursor.valueLineBalloonEnabled = false;
            this._chart.chartCursor.categoryBalloonEnabled = false;
        }

        return this._chart;
    };

    CommonXY.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonFunction = function(d) {
            var balloonText = context.columns()[d.graph.index]  + ": " + context.data()[d.index][d.graph.index];
            return balloonText;
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();

        gObj.type = gType;

        gObj.colorField = "selected" + i;
        gObj.lineColorField = "linecolor";

        // XY Values
        if (this.xAxisType() === "ordinal") {
            gObj.xField = "idx";
            gObj.yField = context.columns()[i];
        }
        if (this.xAxisType() === "linear") {
            gObj.xField = context.columns()[0];
            gObj.yField = context.columns()[1];
        }
        return gObj;
    };

    CommonXY.prototype.formatData = function(dataArr) {
        var context = this;
        var dataObjArr = [];
        dataArr.forEach(function(dataRow, i) {
            var dataObj = {};
            context.columns().forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
                dataObj["idx"] = i + 1;
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonXY.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "xy",
            addClassNames: true,
            autoMargins: true,
            chartScrollbar: {},
            valueAxes: [],
            chartCursor: {
                "enabled": false,
                "valueLineEnabled": false,
                "valueLineBalloonEnabled": false,
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2,
                "oneBalloonOnly": true,
                "balloonPointerOrientation": "vertical",
                "valueBalloonsEnabled": false //always set false
            },
            graphs: [{}],
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field = graph.colorField;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data
                    };
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index], context._selected !== null);
        });
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    return CommonXY;
}));