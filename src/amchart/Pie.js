"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.pie", "../api/I2DChart"], factory);
    } else {
        root.amchart_Pie = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I2DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart) {
    function Pie() {
        HTMLWidget.call(this);
        this._class = "amchart_Pie";
        this._tag = "div";

        this._chart = {};
    }

    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), {tags:['Basic','Shared']});
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family",null,{tags:['Basic','Shared']});
    Pie.prototype.publish("fontSize", 11, "number", "Label Font Size",null,{tags:['Basic','Shared']});
    Pie.prototype.publish("fontColor", null, "html-color", "Label Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Pie.prototype.publish("tooltipTemplate","[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>", "string", "Tooltip Text",null,{tags:['Intermediate']});

    Pie.prototype.publish("Depth3D", 10, "number", "3D Depth (px)",null,{tags:['Basic']});
    Pie.prototype.publish("Angle3D", 15, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:['Intermediate']});

    Pie.prototype.publish("holePercent", 0, "number", "Hole Size (Percent)",null,{tags:['Basic']});

    Pie.prototype.publish("radius", null, "number", "Radius",null,{tags:['Basic']});
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice",null,{tags:['Private']});

    Pie.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"],{tags:['Intermediate']});

    Pie.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.type = "pie";
        this._chart.radius = this.radius();

        this._chart.balloonText = context.tooltipTemplate();

        this._chart.labelPosition = this.labelPosition();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.innerRadius = this.holePercent()+"%";
        this._chart.fontFamily = this.fontFamily();
        this._chart.fontSize = this.fontSize();
        this._chart.fontSize = this.fontSize();
        this._chart.color = this.fontColor();

        this._chart.allLabels = [];
        this._chart.pieAlpha =  this.pieAlpha();

        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];
        var sortingMethod;
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        } else {
        	sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);

        this._chart.dataProvider = this.formatData(this._data);

        this._chart.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        this.pieAlpha().forEach(function(d,i) {
            if (typeof(this._chart.chartData[i])==='undefined') {
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
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    Pie.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
        if (arguments.length) {
            this._valueField = [];
            colArr.slice(1,colArr.length).forEach(function(col){
                context._valueField.push(col);
            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };

    Pie.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            type: "pie",
            theme: "none"
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    Pie.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Pie;
}));