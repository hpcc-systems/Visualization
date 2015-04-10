"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.funnel", "../../chart/INDChart"], factory);
    } else {
        root.Pyramid = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Pyramid() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Pyramid";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Pyramid.prototype = Object.create(HTMLWidget.prototype);

    Pyramid.prototype.implements(INDChart.prototype);
    Pyramid.prototype.publish("paletteID", "default", "set", "Palette ID", Pyramid.prototype._palette.switch());
    
    Pyramid.prototype.publish("tooltipText","[[title]]:<b>[[value]]</b>", "string", "Tooltip Text");
    
    Pyramid.prototype.publish("marginLeft", 15, "number", "Margin (Left)");
    Pyramid.prototype.publish("marginRight", 150, "number", "Margin (Right)");
    
    Pyramid.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"]);
    
    Pyramid.prototype.publish("neckHeightPercent", 0, "number", "Neck Height %");
    Pyramid.prototype.publish("neckWidthPercent", 0, "number", "Neck Width %");
    
    Pyramid.prototype.publish("flip", true, "boolean", "Flip Chart");
    Pyramid.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");

    Pyramid.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "funnel",
            "rotate":this._flip,
            "neckHeight": this._neckHeightPercent+"%",
            "neckWidth": this._neckWidthPercent+"%",
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "balloonText": this._tooltipText,
            "labelPosition": this._labelPosition,
            "marginLeft": this._marginLeft,
            "marginRight": this._marginRight,
            "allLabels": [],
            "balloon": {},
            "titles": [],
        };
        chartOptions.titleField = this._columns[0];
        chartOptions.valueField = this._columns[1];
        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this._reverseDataSorting){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);
        chartOptions.dataProvider = this.formatData(this._data);
        
        this._colors = [];
        chartOptions.dataProvider.forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        chartOptions.colors = this._colors;
        return chartOptions;
    };
    
    Pyramid.prototype.formatData = function(dataArr){
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
    
    Pyramid.prototype.columns = function(colArr) {
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
    Pyramid.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Pyramid.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 75],
            ["English", 23],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };
    
    Pyramid.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Pyramid.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        mergeJSON(chartOptions,this._chart);
        
        this._chart.validateNow();
        this._chart.validateData();
        
        //TODO: REMOVE THIS when we're using the licensed version...
        document.getElementsByTagName('svg')[0].nextElementSibling.innerHTML = '';
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
    
    return Pyramid;
}));

//chart.validateData();
//chart.invalidateSize();