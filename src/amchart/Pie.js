"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.pie", "../api/I2DChart", "require"], factory);
    } else {
        root.amchart_Pie = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I2DChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart, require) {
    function Pie() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._chart = {};

        this._selected = null;
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
            this._chart.radius = "45%";
            this._chart.labelRadius = 20;
            this._chart.pullOutRadius = "20%";
        }

        this._chart.labelFunction = function(d) {
            return d.title;
        };
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

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
        this.data(this.data().sort(sortingMethod));

        this._chart.colorField = "sliceColor";

        this._chart.dataProvider = this.formatData(this.data());

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
            initObj.pathToImages = require.toUrl("amchartsImg");
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
                        data: data
                    };
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

    return Pie;
}));