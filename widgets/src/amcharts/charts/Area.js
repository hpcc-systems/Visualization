"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common", "amcharts.serial", "../../chart/INDChart", "css!./Area"], factory);
    } else {
        root.Area = factory(root.d3, root.Common, root.amcharts, root.INDChart);
    }
}(this, function(d3, Common, AmCharts, INDChart) {
    function Area() {
        Common.call(this);
        this._class = "amcharts_charts_Area";
        this._tag = "div";

        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
        
        this.flag = 0;
    };
    
    Area.prototype = Object.create(Common.prototype);

    Area.prototype.implements(INDChart.prototype);

    Area.prototype.enter = function(domNode, element) {
        var initObj = {
            "theme": "none",
            "type": "serial",
        }
        
        this._chart = AmCharts.makeChart(domNode, initObj);
        
        Common.prototype.enter.apply(this, arguments);
    };

    Area.prototype.update = function(domNode, element) {
        Common.prototype.update.apply(this, arguments);
        var context = this;
        
    };

    Area.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            })
            dataObjArr.push(dataObj);
        })
        return dataObjArr;
    }
    
    Area.prototype.columns = function(colArr) {
        var context = this;
        var retVal = Common.prototype.columns.apply(this, arguments);
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

    Area.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, 52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 66]
        ]);
        return this;
    };
    
    function mergeJSON(source1,source2){
        var mergedJSON = source2;
        for (var attrname in source1) {
            if(mergedJSON.hasOwnProperty(attrname)) {
                if(source1[attrname] != null && typeof(source1[attrname]) === 'object'){
                    mergeJSON(source1[attrname], mergedJSON[attrname]);
                } else {
                    mergedJSON[attrname] = source1[attrname];
                }
            } else {
                mergedJSON[attrname] = source1[attrname];
            }
        }
    }
    
    return Area;
}));
