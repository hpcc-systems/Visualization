"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.CommonFunnel = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }

}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
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
    CommonFunnel.prototype.implements(INDChart.prototype);
    
    CommonFunnel.prototype.publish("paletteID", "default", "set", "Palette ID", CommonFunnel.prototype._palette.switch());
    
    CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart");
    CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting");
    
    CommonFunnel.prototype.publish("marginLeft", 0, "number", "Margin (Left)");
    CommonFunnel.prototype.publish("marginRight", 0, "number", "Margin (Right)");
    CommonFunnel.prototype.publish("marginTop", 0, "number", "Margin (Top)");
    CommonFunnel.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)");
    
    CommonFunnel.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"]);
    
    CommonFunnel.prototype.publish("chartCursor", true, "boolean", "Chart Cursor");
    CommonFunnel.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");
    
    CommonFunnel.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    CommonFunnel.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    CommonFunnel.prototype.publish("globalFillAlpha", .3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("globalLineAlpha", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("globalLineThickness", 2, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("globalBulletSize", 9, "number", "Bullet Size");
    CommonFunnel.prototype.publish("globalBulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    CommonFunnel.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'}); // todo per graph
    CommonFunnel.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonFunnel.prototype.publish("graphBulletType", [], "array", "Bullet Type");
    
    CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    CommonFunnel.prototype.publish("dataDateFormat", null, "string", "Show Guides");
    
    CommonFunnel.prototype.publish("3dDepth", 0, "number", "3D Depth (px)");
    CommonFunnel.prototype.publish("3dAngle", 0, "number", "3D Angle (Deg)");
    
    CommonFunnel.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        this._chart.dataDateFormat = this._dataDateFormat;
        this._chart.theme = "none";
        this._chart.type = "funnel";
        this._chart.startDuration = this._startDuration;
        this._chart.rotate = this._flip;
        
        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRight = this._marginRight;
        this._chart.marginTop = this._marginTop;
        this._chart.marginBottom = this._marginBottom;
        
        this._chart.labelPosition = this._labelPosition;
                
        this.titles = [];
        this.baloon = {};
        
        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];
        
        this._chart.depth3D = this._3dDepth;
        this._chart.angle = this._3dAngle;
        
        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this._reverseDataSorting){
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
        if (this._chartScrollbar) {
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
        
        this._palette = this._palette.switch(this._paletteID);
        
    };
    
    return CommonFunnel;
}));
