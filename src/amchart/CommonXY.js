"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.xy", "require", "./XYAxis"], factory);
    } else {
        root.amchart_CommonXY = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.amchart_SerialAxis);
    }
}(this, function(d3, HTMLWidget, AmCharts, require, Axis) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }
    CommonXY.prototype = Object.create(HTMLWidget.prototype);
    CommonXY.prototype.constructor = CommonXY;
    CommonXY.prototype._class += " amchart_CommonXY";

    CommonXY.prototype.publish("xAxes", [], "propertyArray", "widgets", null, { max: 1, tags: ["Basic"] }); // max number of xAxes
    CommonXY.prototype.publish("yAxes", [], "propertyArray", "widgets", null, { tags: ["Basic"] });

    CommonXY.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonXY.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonXY.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:["Advanced","Shared"]});

    CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Intermediate"]});

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonXY.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    // Axes
    var xAxes = CommonXY.prototype.xAxes;
    var yAxes = CommonXY.prototype.yAxes;
    CommonXY.prototype.Axes = function (type, idx) {
        var axe = type === "x" ? xAxes : yAxes;

        if (idx === undefined) {
            var context = this;
            var axes = axe.call(this);
            axes.forEach(function(axis) {
                axis._context = context;
            });
            return axes;
        }

        var axis;

        axis = axe.call(this)[idx];
        if (axis) {
             axis._context = this;
             return axis;
        }

        axis = new Axis();
        axis._context = this;
        var currentAxes = axe.call(this);
        currentAxes.push(axis);
        axe.call(this, currentAxes);
        return axis;
    };

    CommonXY.prototype.xAxis = function (idx) {
        return this.Axes("x", idx);
    };

    CommonXY.prototype.yAxis = function (idx) {
        return this.Axes("y", idx);
    };

    CommonXY.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        // left vAxis must always be 0 and bottom 1 !!

        var vAxisCount = 0;

        for (var iy = 0; iy < this.yAxes().length; iy++) {
            var yAxis = this.yAxis()[iy];

            this._chart.valueAxes[vAxisCount].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[vAxisCount].axisAlpha = yAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = yAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = yAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = yAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = yAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = yAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = yAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].autoGridCount = yAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = yAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = yAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = yAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = yAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = yAxis.axisDashLength();
            
            this._chart.valueAxes[vAxisCount].labelFunction = function(d) {
                return d3.format(yAxis.axisTickFormat())(d);
            };

            vAxisCount++;
        }

        for (var ix = 0; ix < this.xAxes().length; ix++) {
            var xAxis = this.xAxis()[ix];

            this._chart.valueAxes[vAxisCount].position = xAxis.position() ? xAxis.position() : "bottom";
            this._chart.valueAxes[vAxisCount].axisAlpha = xAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = xAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = xAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = xAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = xAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = xAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = xAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].labelRotation = xAxis.axisLabelRotation();
            this._chart.valueAxes[vAxisCount].autoGridCount = xAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = xAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = xAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = xAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = xAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = xAxis.axisDashLength();

            if (xAxis.axisType() === "ordinal") {
                this._chart.valueAxes[vAxisCount].integersOnly = true;
                //this._chart.valueAxes[vAxisCount].maximum = this.data().length; // (off for now)
                this._chart.valueAxes[vAxisCount].labelFunction = function(a, b) {
                    if (b > context.data().length) {
                        return ""; // so the the last dots arent on the edge
                    }
                    return context.data().length && b > 0 ? context.data()[b-1][0] : "";
                };
            } else {
                this._chart.valueAxes[vAxisCount].labelFunction = function(d) {
                    return d3.format(xAxis.axisTickFormat())(d);
                };
            }

            vAxisCount++;
        }

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.dataProvider.forEach(function(dataPoint,i) {
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
            this._chart.precision = this.xAxis(0).axisType() === "ordinal" ? 1 : undefined; // so ordinal will work with labelfunction 
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

        gObj.colorField = "color" + i;
        gObj.lineColorField = "linecolor";

        // XY Values
        if (this.xAxis()[0].axisType() === "ordinal") {
            gObj.xField = "idx";
            gObj.yField = context.columns()[i];
        }
        if (this.xAxis()[0].axisType() === "linear") {
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
                        data: data,
                        cIdx: e.target.index,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index], context._selected !== null);
        });
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (!this.xAxis().length) {
            this.xAxis(0);
        }
        if (!this.yAxis().length) {
            this.yAxis(0);
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    CommonXY.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonXY.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };
    
    CommonXY.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return CommonXY;
}));