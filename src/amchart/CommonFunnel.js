"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.funnel"], factory);
    } else {
        root.amchart_CommonFunnel = factory(root.d3, root.common_HTMLWidget, root.amcharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonFunnel() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._colors = [];
    };
    
    CommonFunnel.prototype = Object.create(HTMLWidget.prototype);
    
    CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart");
    CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");
    
    CommonFunnel.prototype.publish("marginLeft", null, "number", "Margin (Left)");
    CommonFunnel.prototype.publish("marginRight", 150, "number", "Margin (Right)");
    CommonFunnel.prototype.publish("marginTop", null, "number", "Margin (Top)");
    CommonFunnel.prototype.publish("marginBottom", null, "number", "Margin (Bottom)");
    
    CommonFunnel.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"]);
    
    CommonFunnel.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    CommonFunnel.prototype.publish("Depth3D", 0, "number", "3D Depth (px)");
    CommonFunnel.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)");
    
    CommonFunnel.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.pathToImages = "//cdn.rawgit.com/cdnjs/cdnjs/master/ajax/libs/amcharts/3.13.0/images/";
        this._chart.theme = "none";
        this._chart.type = "funnel";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();
        
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
        if (this.chartScrollbar()) {
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
            })
            dataObjArr.push(dataObj);
        })
        return dataObjArr;
    }
    
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
            chartScrollbar: {}
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonFunnel.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 
        
        this._palette = this._palette.switch(this.paletteID()); 
    };
    
    return CommonFunnel;
}));
