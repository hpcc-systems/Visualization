"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.xy"], factory);
    } else {
        root.amcharts_CommonXY = factory(root.d3, root.common_HTMLWidget, root.amcharts);
    }
}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";
        
        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    };

    CommonXY.prototype = Object.create(HTMLWidget.prototype);

    CommonXY.prototype.publish("yAxisTitle", "Axis title", "string", "Y-Axis Title");
    CommonXY.prototype.publish("xAxisTitle", "Axis title", "string", "X-Axis Title");

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)");
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)");
    CommonXY.prototype.publish("marginTop", 10, "number", "Margin (Top)");
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)");

    CommonXY.prototype.publish("chartScrollbar", false, "boolean", "Chart Scrollbar");

    CommonXY.prototype.publish("globalTooltipText","x:[[x]] y:[[y]]", "string", "Tooltip Text"); // x:[[x]] y:[[y]]
    CommonXY.prototype.publish("graphTooltipText",["x:[[x]] y:[[y]]","x:[[x]] y:[[y]]"], "array", "Tooltip Text"); // [[category]]([[title]]): [[value]

    CommonXY.prototype.publish("globalFillAlpha", 0, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonXY.prototype.publish("globalLineAlpha", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonXY.prototype.publish("globalLineThickness", 0, "number", "Line Thickness", null, {min:0,max:10,step:0.1,inputType:'range'})
    CommonXY.prototype.publish("globalBulletSize", 8, "number", "Bullet Size");
    CommonXY.prototype.publish("globalBulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);

    CommonXY.prototype.publish("graphFillAlpha", [], "array", "Area Opacity", null, {min:0, max:1,step:0.001,inputType:'range'});
    CommonXY.prototype.publish("graphLineAlpha", [], "array", "Area Border Opacity", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonXY.prototype.publish("graphLineThickness", [], "array", "Line Thickness", null, {min:0,max:1,step:0.001,inputType:'range'});
    CommonXY.prototype.publish("graphBulletSize", [], "number", "Bullet Size");
    CommonXY.prototype.publish("graphBulletType", [], "array", "Bullet Type");

    CommonXY.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");

    CommonXY.prototype.publish("dataDateFormat", null, "string", "");

    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines");

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";
        this._chart.pathToImages = "//cdn.rawgit.com/cdnjs/cdnjs/master/ajax/libs/amcharts/3.13.0/images/";

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataDateFormat = this.dataDateFormat();

        this._chart.valueAxes[0].position = "bottom";
        this._chart.valueAxes[0].axisAlpha = 0;
        this._chart.valueAxes[0].dashLength = 1;
        this._chart.valueAxes[0].title = this.xAxisTitle();

        this._chart.valueAxes[1].position = "left";
        this._chart.valueAxes[1].axisAlpha = 0;
        this._chart.valueAxes[1].dashLength = 1;
        this._chart.valueAxes[1].title = this.yAxisTitle();

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 

        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(dataPoint[context._columns[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context._columns[2]]);
        });
        this._chart.colors = [];
            
        // Scroll Bar
        if (this.chartScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonXY.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {}; 

        gObj.balloonText = context.graphTooltipText()[i] || context.globalTooltipText();
        gObj.fillAlphas = context.graphFillAlpha()[i] || context.globalFillAlpha();
        gObj.lineAlpha = context.graphLineAlpha()[i] || context.globalLineAlpha();
        gObj.lineThickness = context.graphLineThickness()[i] || context.globalLineThickness();
        gObj.bullet = context.graphBulletType()[i] || context.globalBulletType();
        gObj.bulletSize = context.graphBulletSize()[i] || context.globalBulletSize();
        
        gObj.type = gType;

        gObj.colorField = "color";
        gObj.lineColorField = "linecolor";
        
        // XY Values
        gObj.xField = context._columns[1];
        gObj.yField = context._columns[2];
        
        return gObj;
    };    
    
    CommonXY.prototype.formatData = function(dataArr) {
        var context = this;
        var dataObjArr = [];
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            })
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    }

    CommonXY.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var context = this;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (arguments.length) {
            this._categoryField = colArr[0];
            this._valueField = [];
            colArr.slice(1, colArr.length).forEach(function(col) {
                context._valueField.push(col);
            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };

    CommonXY.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            theme: "none",
            type: "xy",
            pathToImages: "//www.amcharts.com/lib/3/images/",
            automargins: false,        
            chartScrollbar: {},
            valueAxes: [       
                {position:"bottom",title:" "},
                {position:"left",title:" "}
            ],
            graphs: [{}],
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
        };
        
        this._chart = AmCharts.makeChart(domNode, initObj);        
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px'; 

        this._palette = this._palette.switch(this.paletteID()); 
    };

    return CommonXY;
}));