"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.funnel"], factory);
    } else {
        root.amchart_CommonFunnel = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonFunnel() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
        this._data = undefined;
        this._columns = undefined;
        this._valueField = [];
        this._colors = [];
    }

    CommonFunnel.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    CommonFunnel.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonFunnel.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonFunnel.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"],{tags:['Intermediate']});

    CommonFunnel.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:['Private']});

    CommonFunnel.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:['Basic']});
    CommonFunnel.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    CommonFunnel.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.labelPosition = this.labelPosition();

        this.titles = [];
        this.baloon = {};

        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();

        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        // Color Palette
        this._colors = [];
        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;

        // Scroll Bar
        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonFunnel.prototype.formatData = function(dataArr){
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

    CommonFunnel.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
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

    CommonFunnel.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            theme: "none",
            type: "funnel",
            autoResize: true,
            autoMargins: false,
            chartScrollbar: {}
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonFunnel.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());

        switch (this.labelPosition()) {
            case "left":
                this._chart.marginLeft += parseInt(domNode.getBoundingClientRect().width/8);
            break;
            case "right":
                this._chart.marginRight += parseInt(domNode.getBoundingClientRect().width/8);
            break;
        }

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return CommonFunnel;
}));
