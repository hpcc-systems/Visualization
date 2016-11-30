"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts-pie", "../api/I2DChart", "require"], factory);
    } else {
        root.amchart_Pie = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I2DChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart, require) {
    function Pie() {
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
    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " amchart_Pie";
    Pie.prototype.implements(I2DChart.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Pie.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    Pie.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    Pie.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Pie.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:["Intermediate"]});

    Pie.prototype.publish("holePercent", 0, "number", "Hole Size (Percent)",null,{tags:["Basic"]});

    Pie.prototype.publish("radius", null, "number", "Radius",null,{tags:["Basic"]});
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice",null,{tags:["Private"]});

    Pie.prototype.publish("labelPosition", "outside", "set", "Label Position", ["inside","outside"],{tags:["Intermediate"]});

    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Pie.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
    Pie.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});

    Pie.prototype.calcRadius = function (_) {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    };

    Pie.prototype.updateChartOptions = function() {
        this._chart.type = "pie";
        
        this._chart.labelsEnabled = true;
        if (this.labelPosition()==="inside") {
            this._chart.radius = "50%";
            this._chart.labelRadius = -40;
            this._chart.pullOutRadius = "20%";
        } else {
            this._chart.radius = this.calcRadius();
            this._chart.labelRadius = 20;
            this._chart.pullOutRadius = "20%";
        }

        this._chart.labelFunction = function(d) {
            return d.title;
        };

        this._chart.marginRight = this.marginRight();
        this._chart.marginLeft = this.marginLeft();
        this._chart.marginTop = this.marginTop();
        this._chart.marginBottom = this.marginBottom();

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.innerRadius = this.holePercent()+"%";
        this._chart.fontFamily = this.fontFamily();
        this._chart.fontSize = this.fontSize();
        this._chart.fontSize = this.fontSize();
        this._chart.color = this.fontColor();

        this._chart.titleField = this.columns()[0];
        this._chart.valueField = this.columns()[1];

        var sortingMethod;
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        } else {
            sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        }
        this.data().sort(sortingMethod);

        this._chart.colorField = "sliceColor";

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.colors = this.data().map(function (row) {
            return this._palette(row[0]);
        }, this);
        this._chart.pullOutOnlyOne = this.selectionMode() === "simple";

        this.pieAlpha().forEach(function(d,i) {
            if (typeof(this._chart.chartData[i])==="undefined") {
                this._chart.chartData[i] = {};
            }
            this._chart.chartData[i].alpha = d;
        },this);

        return this._chart;
    };

    Pie.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context.columns().forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    Pie.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "pie",
            addClassNames: true,
            theme: "none"
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amcharts-images");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickSlice", function(e) {
            var field = e.chart.colorField;
            var data = e.dataItem.dataContext;

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
                        cIdx: 1,
                        dIdx: e.dataItem.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.dataItem.index]), context.columns()[1], context._selected !== null);
        });
    };

    Pie.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    Pie.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
   };

    Pie.prototype.postUpdate = function (domNode, element) {
        var context = this;

        var containerBoundingClientRect = context._element.select("svg").node().getBoundingClientRect(); // might need to change this selection (could get a bit more accurate results?)
        this.d3LabelSelection = element.selectAll(".amcharts-pie-label");

        var left = [];
        var right = [];
        var top = [];
        var bottom = [];

        this.d3LabelSelection.each(function(d, i) {
            var boundingRect = d3.select(this).node().getBoundingClientRect();

            var labelTopPos = boundingRect.top;
            if (labelTopPos < containerBoundingClientRect.top) {
                top.push(labelTopPos - containerBoundingClientRect.top);
            }

            var labelBottomPos = boundingRect.bottom;
            if (labelBottomPos > containerBoundingClientRect.bottom) {
                bottom.push(containerBoundingClientRect.bottom - labelTopPos);

            }
            
            var labelRightPos = boundingRect.right; 
            if (labelRightPos > containerBoundingClientRect.right) {
                right.push(containerBoundingClientRect.right - labelRightPos);
            }

            var labelLeftPos = boundingRect.left;
            if (labelLeftPos < containerBoundingClientRect.left) {
                left.push(labelLeftPos - containerBoundingClientRect.left);
            }
        });

        var topOffset = top.length ? d3.min(top) : 0;
        var bottomOffset = bottom.length ? d3.min(bottom) : 0;
        var rightOffset = right.length ? d3.min(right) : 0;
        var leftOffset = left.length ? d3.min(left) : 0;

        var smallerOffset = 0;

        if (topOffset < 0){
            smallerOffset += topOffset;
        }
        if (bottomOffset < 0){
            smallerOffset += bottomOffset;
        }
        if (rightOffset < 0){
            smallerOffset += rightOffset;
        }
        if (leftOffset < 0){
            smallerOffset += leftOffset;
        }

        if (this.calcRadius() + smallerOffset - 20 < this.calcRadius()) {
            this._chart.radius = this.calcRadius() + smallerOffset - 20; // 20 for the label line lengths
            this._chart.validateNow();
        }
    };

    Pie.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    Pie.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return Pie;
}));