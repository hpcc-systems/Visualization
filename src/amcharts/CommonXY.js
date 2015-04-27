"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts/xy", "../chart/INDChart"], factory);
    } else {
        root.amcharts_CommonXY = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
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

    CommonXY.prototype.implements(INDChart.prototype);
    CommonXY.prototype.publish("paletteID", "default", "set", "Palette ID", CommonXY.prototype._palette.switch());

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

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";
        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";

        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRgight = this._marginRight;
        this._chart.marginTop = this._marginTop;
        this._chart.marginBottom = this._marginBottom;

        this._chart.dataDateFormat = this._dataDateFormat;

        this._chart.valueAxes[0].position = "bottom";
        this._chart.valueAxes[0].axisAlpha = 0;
        this._chart.valueAxes[0].dashLength = 1;
        this._chart.valueAxes[0].title = this._xAxisTitle;

        this._chart.valueAxes[1].position = "left";
        this._chart.valueAxes[1].axisAlpha = 0;
        this._chart.valueAxes[1].dashLength = 1;
        this._chart.valueAxes[1].title = this._yAxisTitle;

        buildGraphs.call(this,undefined);

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data); 

        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(dataPoint[context._columns[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context._lineColor !== null ? context._lineColor : context._palette(dataPoint[context._columns[2]]);
        });
        this._chart.colors = [];
            
        // Scroll Bar
        if (this._chartScrollbar) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    function buildGraphs(gType) {
        var context = this;
        
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length; 
        var buildGraphCount = Math.max(currentGraphCount, typeof (this._openField) !== 'undefined' ? this._openField.length : this._valueField.length);
        
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined') 
                    || (typeof(this._openField) !== 'undefined' && typeof(this._openField[i]) !== 'undefined')) {
                var gObj = buildGraphObj();

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }
        
        function buildGraphObj() {
            var gObj = {}; 

            gObj.balloonText = context._graphTooltipText[i] || context._globalTooltipText;
            gObj.lineAlpha = context._graphLineAlpha[i] || context._globalLineAlpha;
            gObj.lineThickness = context._graphLineThickness[i] || context._globalLineThickness;
            gObj.bullet = context._graphBulletType[i] || context._globalBulletType;
            gObj.bulletSize = context._graphBulletSize[i] || context._globalBulletSize;
            
            gObj.type = gType;
            
            //gObj.title = '';
            
            if (context._type == "Bubble") {
                var fieldArr = ['value','open','close','high','low'];
                fieldArr.forEach(function(field){
                    if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                        gObj[field+'Field'] = context['_'+field+'Field'][i]; //for bubble
                    }
                });
            }

            gObj.colorField = "color";
            gObj.lineColorField = "linecolor";
            
            // XY Values
            gObj.xField = context._columns[1];
            gObj.yField = context._columns[2];
            
            try{
                if(context._useImgPatterns){
                    var patternArr = JSON.parse(context._imgPatternArr);
                    if(typeof (patternArr[i]) !== 'undefined'){
                        gObj.pattern = patternArr[i];
                    }
                } else {
                    gObj.pattern = '';
                }
            }catch(e){
                console.log('e:');
                console.log(e);
            }
            return gObj;
        }
    };
    
    CommonXY.prototype.formatData = function(dataArr) {
        var dataObjArr = [];
        var context = this;
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

        this._palette = this._palette.switch(this._paletteID);
    };

    return CommonXY;
}));