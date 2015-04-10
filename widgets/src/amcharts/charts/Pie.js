"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.pie", "../../chart/I2DChart"], factory);
    } else {
        root.Pie = factory(root.d3, root.HTMLWidget, root.amcharts, root.I2DChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, I2DChart) {
    function Pie() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Pie";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Pie.prototype = Object.create(HTMLWidget.prototype);

    Pie.prototype.implements(I2DChart.prototype);
    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch());
    
    Pie.prototype.publish("tooltipText","[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>", "string", "Tooltip Text");
    
    Pie.prototype.publish("3dDepth", 10, "number", "3D Depth (px)");
    Pie.prototype.publish("3dAngle", 15, "number", "3D Angle (Deg)");
    
    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)");
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)");
   
    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");
    
    Pie.prototype.publish("holePercent", 0, "number", "holePercent");
    
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family");
    Pie.prototype.publish("fontSize", 11, "number", "Label Font Size");
    
    Pie.prototype.publish("radius", null, "number", "Radius");
    Pie.prototype.publish("globalPieAlpha", 1, "number", "Global Pie Alpha");
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice");
    
    Pie.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "pie",
            "radius":this._radius,
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "balloonText": this._tooltipText,
            "labelPosition": this._labelPosition,
            "marginLeft": this._marginLeft,
            "marginRight": this._marginRight,
            "depth3D": this._3dDepth,
            "angle": this._3dAngle,
            "innerRadius": this._holePercent+"%",
            "fontFamily": this._fontFamily,
            "fontSize": this._fontSize,
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "chartData":[],
            "pieAlpha": this._globalPieAlpha
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
        this._data.forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        chartOptions.colors = this._colors;
        
        this._pieAlpha.forEach(function(d,i) {
            if (typeof(chartOptions.chartData[i])==='undefined') { 
                chartOptions.chartData[i] = {} 
            }
            chartOptions.chartData[i].alpha = d;
        });
        
        
        return chartOptions;
    };
    
    Pie.prototype.formatData = function(dataArr){
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
    
    Pie.prototype.columns = function(colArr) {
        var context = this;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
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
    Pie.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Pie.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 75],
            ["English", 23],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };
    
    Pie.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Pie.prototype.update = function(domNode, element) {
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

    return Pie;
}));

//chart.validateData();
//chart.invalidateSize();