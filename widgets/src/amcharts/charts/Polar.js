"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.radar", "../../chart/INDChart"], factory);
    } else {
        root.Bar = factory(root.d3, root.HTMLWidget, root.amcharts, root.INDChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, INDChart) {
    function Polar() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Polar";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._columns;
        this._valueField;
        this._categoryField;
        this._colors = [];
    }
    ;
    Polar.prototype = Object.create(HTMLWidget.prototype);

    Polar.prototype.implements(INDChart.prototype);
    Polar.prototype.publish("paletteID", "Dark2", "set", "Palette ID", Polar.prototype._palette.switch());
    
    Polar.prototype.publish("tooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Polar.prototype.publish("bulletSize", 9, "number", "Bullet Size");
    Polar.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"]);
    
    Polar.prototype.publish("fillAlpha", 0.3, "number", "Bar Opacity", null, {min:0,max:1,step:0.1,inputType:'range'});
    Polar.prototype.publish("lineAlpha", 1, "number", "Bar Border Opacity", null, {min:0,max:1,step:0.1,inputType:'range'});
    
    Polar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)");
    
    Polar.prototype.publish("circularGrid", true, "boolean", "Circular Grid");
    
    Polar.prototype.publish("showGuides", false, "boolean", "Show Guides");
    Polar.prototype.publish("guides", [["min",20,true,true,"#ee00ff"],["med",40,true,true,"#ccccff"],["max",60,true,true,"#ff00cc"]], "array", "Bar Guides",null,{inputType:"textarea"});
    
    Polar.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "radar",
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "categoryField": "Subject",
            "startDuration": this._startDuration,
            "graphs": this.buildGraphsArr(),
            "guides": [],
            "valueAxes": [
                {
                    "axisTitleOffset": 20,
                    "id": "ValueAxis-1",
                    "minimum": 0,
                    "axisAlpha": 0.15,
                    "dashLength": 3
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
        };
        chartOptions.dataProvider = this.formatData(this._data);
        this._colors = [];
        this._columns.slice(1,this._columns.length).forEach(function(dataPoint,i){
            context._colors.push(context._palette(i));
        });
        chartOptions.colors = this._colors;
        if(this._circularGrid){
            chartOptions.valueAxes.forEach(function(va,i){
                chartOptions.valueAxes[i].gridType = "circles"
            })
        }
        return chartOptions;
    };
    
    Polar.prototype.buildGuides = function(guideArr){
        var retArr = [];
        guideArr.forEach(function(guide){
            retArr.push({
                "above": guide[3],
                "dashLength": 5,
                "id": "Guide-1",
                "inside": guide[2],
                "label": guide[0],
                "labelRotation": 90,
                "lineAlpha": 1,
                "lineColor": guide[4],
                "value": guide[1]
            });
        })
        return retArr;
    }
    
    //Format our standard data/columns format into the format that AMCharts expects
    Polar.prototype.buildGraphsArr = function(){
        var context = this;
        var graphsArr = [];
        this._valueField.forEach(function(vf,i){
            var gObj = {
//                "animationPlayed": true,
                "balloonText": context._tooltipText,
                "fillAlphas": context._fillAlpha,
                "lineAlpha": context._lineAlpha,
                "lineThickness": 2,
                "bullet": context._bulletType,
                "bulletSize": context._bulletSize,
                "title": vf,
                "type": "column",
                "valueField": vf,
                "columnWidth": context._columnWidth
            };
            if(context._paletteGrouping === "Main"){
                gObj.colorField = "color";
            }
            if(context._cylinderBars){
                gObj.topRadius = context._circleRadius;
            }
            graphsArr.push(gObj);
        });
        return graphsArr;
    }
    Polar.prototype.formatData = function(dataArr){
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
    
    Polar.prototype.columns = function(colArr) {
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
    Polar.prototype.data = function(dataArr) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = dataArr;
        }
        return retVal;
    };
    Polar.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"]);
        this.data([
            ["English", 5, 43, 41, 92],
            ["English II", 7, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 6, 73, 52, 83],
            ["Geography III", 6, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8],
        ]);
        return this;
    };
    
    Polar.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };

    Polar.prototype.update = function(domNode, element) {
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
    
    return Polar;
}));

//chart.validateData();
//chart.invalidateSize();