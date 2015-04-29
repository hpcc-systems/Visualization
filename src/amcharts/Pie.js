"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts/pie", "../chart/I2DChart"], factory);
    } else {
        root.amcharts_Pie = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.chart_I2DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart) {
    function Pie() {
        HTMLWidget.call(this);
        this._class = "amcharts_Pie";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    };
    
    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.implements(I2DChart.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch());
    
    Pie.prototype.publish("globalTooltipText","[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span", "string", "Tooltip Text");
    
    Pie.prototype.publish("tooltipText","[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>", "string", "Tooltip Text");
    
    Pie.prototype.publish("3dDepth", 10, "number", "3D Depth (px)");
    Pie.prototype.publish("3dAngle", 15, "number", "3D Angle (Deg)");
    
    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)");
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)");
    Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)");
    Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)");
   
    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");
    
    Pie.prototype.publish("holePercent", 0, "number", "holePercent");
    
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family");
    Pie.prototype.publish("fontSize", 11, "number", "Label Font Size");
    
    Pie.prototype.publish("radius", null, "number", "Radius");
    Pie.prototype.publish("globalPieAlpha", 1, "number", "Global Pie Alpha");
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice");
    
    Pie.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.type = "pie";
        this._chart.radius = this._radius;
        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";

        this._chart.balloonText = context._globalTooltipText;
        
        this._chart.labelPosition = this._labelPosition;
        
        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRight = this._marginRight;
        this._chart.marginTop = this._marginTop;
        this._chart.marginBottom = this._marginBottom; 
        
        this._chart.depth3D = this._3dDepth;
        this._chart.angle = this._3dAngle;
        this._chart.innerRadius = this._holePercent+"%";
        this._chart.fontFamily = this._fontFamily;
        this._chart.fontSize = this._fontSize;
        this._chart.allLabels = [];
        this._chart.pieAlpha =  this._globalPieAlpha;

        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];
        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this._reverseDataSorting){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);
        
        this._chart.dataProvider = this.formatData(this._data);
        
        this._colors = [];
        this._data.forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        this._chart.colors = this._colors;
        
        this._pieAlpha.forEach(function(d,i) {
            if (typeof(this._chart.chartData[i])==='undefined') { 
                this._chart.chartData[i] = {} 
            }
            this._chart.chartData[i].alpha = d;
        });
        
        return this._chart;
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
    
    Pie.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            type: "pie",
            theme: "none"
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    Pie.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Pie;
}));
