"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.funnel", "../../chart/INDChart"], factory);
    } else {
        root.Funnel = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Funnel() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Funnel";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Funnel.prototype = Object.create(HTMLWidget.prototype);

    Funnel.prototype.implements(INDChart.prototype);
    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch());
    
    Funnel.prototype.publish("tooltipText","[[title]]:<b>[[value]]</b>", "string", "Tooltip Text");
    
    Funnel.prototype.publish("marginLeft", 15, "number", "Margin (Left)");
    Funnel.prototype.publish("marginRight", 150, "number", "Margin (Right)");
    
    Funnel.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"]);
    
    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %");
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %");
    
    Funnel.prototype.publish("flip", false, "boolean", "Flip Chart");
    Funnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");

    Funnel.prototype.getChartOptions = function() {
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
    
    Funnel.prototype.formatData = function(dataArr){
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
    
    Funnel.prototype.columns = function(colArr) {
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
    Funnel.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Funnel.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 300],
            ["English", 120],
            ["Math", 98],
            ["Science", 72]
        ]);
        return this;
    };
    
    Funnel.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Funnel.prototype.update = function(domNode, element) {
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
    
    return Funnel;
}));

//chart.validateData();
//chart.invalidateSize();