
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonSerial.js',["d3", "../common/HTMLWidget", "amcharts.serial"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }

    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    CommonSerial.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared','Shared']});
    CommonSerial.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("lineWidth", 1, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:'range',tags:['Basic','Shared']});
    CommonSerial.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Basic','Shared']});

    CommonSerial.prototype.publish("dashedLineStyle", 0, "number", "Length of Dashed Line. 0 = none",null,{tags:['Advanced','Shared']});

    CommonSerial.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("xAxisBaselineColor", null, "html-color", "X Axis Baseline Color",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("yAxisBaselineColor", null, "html-color", "Y Axis baseline Color",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal Axis Text Style (Color)",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("yAxisFontColor", null, "html-color", "Vertical Axis Text Style (Color)",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:['Intermediate','Shared']});

    CommonSerial.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Basic','Shared']});
    CommonSerial.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Basic','Shared']});

    CommonSerial.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range',tags:['Intermediate','Shared']});

    CommonSerial.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonSerial.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:['Intermediate']}); // share?

    CommonSerial.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:['Intermediate','Shared']});

    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"],{tags:['Intermediate']});

    CommonSerial.prototype.publish("bulletSize", 0, "number", "Bullet Size",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("bulletType", "none", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:['Basic']});

    CommonSerial.prototype.publish("dataDateFormat", null, "string", "",null,{tags:['Private']});

    CommonSerial.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:['Advanced']});
    CommonSerial.prototype.publish("xAxisGridPosition", "middle", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:['Advanced']});

    CommonSerial.prototype.publish("xAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});
    CommonSerial.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});

    CommonSerial.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("xAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});

    //CommonSerial.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:['Intermediate']});
    CommonSerial.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:['Intermediate']});

    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:['Private']});
    CommonSerial.prototype.publish("useImgPatterns", false, "boolean", "Enable Image Pattern backgrounds",null,{tags:['Private']});
    CommonSerial.prototype.publish("imgPatternArr", '["../ampatterns/black/pattern2.png"]', "string", "Background Pattern Images (Not used if '[]')",null,{inputType:'textarea',tags:['Private']});

    CommonSerial.prototype.updateChartOptions = function() {

        this._chart.dataDateFormat = this.dataDateFormat();
        this._chart.type = "serial";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.orientation() === "vertical"; // this messes up the hover over things
        this._chart.categoryField = this._categoryField;

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.categoryAxis = {};
        this._chart.categoryAxis.autoGridCount = this.xAxisAutoGridCount();
        this._chart.categoryAxis.gridPosition = this.xAxisGridPosition();
        this._chart.categoryAxis.axisAlpha = this.axisAlpha();
        this._chart.categoryAxis.gridAlpha = this.xAxisGridAlpha();
        this._chart.categoryAxis.startOnAxis = this.startOnAxis();
        this._chart.categoryAxis.labelRotation = this.xAxisLabelRotation();
        this._chart.categoryAxis.title = this.xAxisTitle();

        this._chart.categoryAxis.axisColor = this.xAxisBaselineColor();
        this._chart.categoryAxis.axisThickness = this.axisLineWidth();
        this._chart.categoryAxis.boldPeriodBeginning = this.xAxisBoldPeriodBeginning();
        this._chart.categoryAxis.dashLength = this.xAxisDashLength();
        this._chart.categoryAxis.fillAlpha = this.xAxisFillAlpha();
        this._chart.categoryAxis.fillColor = this.xAxisFillColor();
        this._chart.categoryAxis.fontSize = this.axisFontSize();
        this._chart.categoryAxis.color = this.xAxisFontColor();
        this._chart.categoryAxis.titleColor = this.xAxisTitleFontColor();
        this._chart.categoryAxis.titleFontSize = this.xAxisTitleFontSize();

        this._chart.titles = [];

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataProvider = this.formatData(this._data);

        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].color = this.yAxisFontColor();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].fillColor = this.yAxisFillColor();
        this._chart.valueAxes[0].fillAlpha = this.yAxisFillAlpha();

        this._chart.valueAxes[0].gridAlpha = this.yAxisGridAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength();
        this._chart.valueAxes[0].boldPeriodBeginning = this.yAxisBoldPeriodBeginning();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonSerial.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonText = context.tooltipTemplate();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = '';
        var fieldArr = ['value','open','close','high','low'];
        fieldArr.forEach(function(field){
            if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                gObj[field+'Field'] = context['_'+field+'Field'][i];
            }
        });

        try {
            if(context.useImgPatterns()) {
                var patternArr = JSON.parse(context.imgPatternArr());
                if(typeof (patternArr[i]) !== 'undefined'){
                    gObj.pattern = patternArr[i];
                }
            } else {
                gObj.pattern = '';
            }
        } catch(e) {
            console.log('e:');
            console.log(e);
        }

        return gObj;
    };

    CommonSerial.prototype.formatData = function(dataArr) {
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            context._columns.forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonSerial.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
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

    CommonSerial.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            type: "serial",
            chartScrollbar: {},
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonSerial.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        this._palette = this._palette.switch(this.paletteID());
    };

    return CommonSerial;
}));

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Area.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Area"], factory);
    } else {
        root.amchart_Area = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Area() {
        CommonSerial.call(this);
        this._class = "amchart_Area";
        this._tag = "div";

        this._gType = "line";
    }

    Area.prototype = Object.create(CommonSerial.prototype);
    Area.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch(),{tags:['Basic','Shared']});
    Area.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
    Area.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});


    /**
     * Publish Params Unique To This Widget
     */
    Area.prototype.publish("tooltipTemplate","[[category]]: [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});

    Area.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Area.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        // Stacked
        if(this.isStacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Area.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            // Area Specific Options
            gObj.fillAlphas = this.fillOpacity();
            return gObj;
        }
    };

    Area.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Area;
}));



(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Bar.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Bar = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Bar() {
        CommonSerial.call(this);
        this._class = "amchart_Bar";
        this._tag = "div";

        this._gType = "column";
    }
    Bar.prototype = Object.create(CommonSerial.prototype);
    Bar.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Bar.prototype.publish("paletteID", "default", "set", "Palette ID", Bar.prototype._palette.switch(),{tags:['Basic','Shared']});
    Bar.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
    Bar.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Bar.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:['Basic']});

    Bar.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars",null,{tags:['Basic']});
    Bar.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars",null,{tags:['Basic']});

    Bar.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:['Basic']});

    Bar.prototype.publish("Depth3D", 20, "number", "3D Depth (px)",null,{tags:['Basic']});
    Bar.prototype.publish("Angle3D", 45, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    Bar.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});

    Bar.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});

    Bar.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // Stacked
        if(this.isStacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        // Color Palette
        switch(this.paletteGrouping()) {
            case "By Category":
                this._chart.dataProvider.forEach(function(dataPoint,i){
                    context._chart.dataProvider[i].color = context._palette(i);
                    context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(i);
                });
                this._chart.colors = [];
            break;
            case "By Column":
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
            default:
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Bar.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if (this.cylinderBars()) {
                 gObj.topRadius = this.circleRadius();
            } else {
                 gObj.topRadius = undefined;
            }

            if(this.paletteGrouping() === "By Category"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    Bar.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bar;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonXY.js',["d3", "../common/HTMLWidget", "amcharts.xy"], factory);
    } else {
        root.amchart_CommonXY = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }
}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }
    CommonXY.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */

    CommonXY.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:'range',tags:['Basic','Shared']});
    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Basic','Shared']});

    CommonXY.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:['Advanced','Shared']});

    CommonXY.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal axis text style (Color)",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisFontColor", null, "html-color", "Vertical axis text style (Color)",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)",null,{tags:['Intermediate','Shared']});

    CommonXY.prototype.publish("xAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});
    CommonXY.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});

    CommonXY.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:'range',tags:['Intermediate','Shared']});

    CommonXY.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonXY.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:['Intermediate']});

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("dataDateFormat", null, "string", "",null,{tags:['Private']});

    CommonXY.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});

    CommonXY.prototype.publish("xAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});

    CommonXY.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});

    CommonXY.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});
    CommonXY.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});

    //CommonXY.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:['Intermediate']});
    CommonXY.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:['Intermediate']});

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataDateFormat = this.dataDateFormat();

        this._chart.valueAxes[0].position = "bottom";
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].title = this.xAxisTitle();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].axisColor = this.xAxisBaselineColor();
        this._chart.valueAxes[0].color = this.xAxisFontColor();
        this._chart.valueAxes[0].titleFontSize = this.xAxisTitleFontSize();
        this._chart.valueAxes[0].titleColor = this.xAxisTitleFontColor();
        this._chart.valueAxes[0].labelRotation = this.xAxisLabelRotation();
        this._chart.valueAxes[0].autoGridCount = this.xAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.xAxisGridPosition();
        this._chart.valueAxes[0].fillAlpha = this.xAxisFillAlpha();
        this._chart.valueAxes[0].fillColor = this.xAxisFillColor();
        this._chart.valueAxes[0].gridAlpha = this.xAxisGridAlpha();
        this._chart.valueAxes[0].dashLength = this.xAxisDashLength();

        this._chart.valueAxes[1].position = "left";
        this._chart.valueAxes[1].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[1].title = this.yAxisTitle();
        this._chart.valueAxes[1].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[1].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[1].color = this.yAxisFontColor();
        this._chart.valueAxes[1].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[1].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[1].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[1].gridPosition = this.yAxisGridPosition();
        this._chart.valueAxes[1].fillAlpha = this.yAxisFillAlpha();
        this._chart.valueAxes[1].fillColor = this.yAxisFillColor();
        this._chart.valueAxes[1].gridAlpha = this.yAxisGridAlpha();
        this._chart.valueAxes[1].dashLength = this.yAxisDashLength();
        this._chart.valueAxes[1].axisTitleOffset = this.yAxisTitleOffset();

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(dataPoint[context._columns[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context._columns[2]]);
        });
        this._chart.colors = [];

        // Scroll Bar
        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonXY.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonText = context.tooltipTemplate();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();

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
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

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

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());
    };

    return CommonXY;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Bubble.js',["d3", "./CommonXY", "amcharts.xy", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Bubble = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Bubble() {
        CommonXY.call(this);
        this._class = "amchart_Bubble";
        this._tag = "div";

        this._type = "Bubble";
        this._gType = "column";
    }
    Bubble.prototype = Object.create(CommonXY.prototype);
    Bubble.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Bubble.prototype.publish("paletteID", "default", "set", "Palette ID", Bubble.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Bubble.prototype.publish("tooltipTemplate","x:[[x]] y:[[y]]", "string", "Tooltip Text");

    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        this.buildGraphs(this._gType);
        return this._chart;
    };

    Bubble.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonXY.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this._type === "Bubble") {
                var fieldArr = ['value'];
                var context = this;
                fieldArr.forEach(function(field){
                    //if(typeof(context['_'+field+'Field']) !== 'undefined' && typeof(context['_'+field+'Field'][i]) !== 'undefined'){
                        gObj[field+'Field'] = context['_'+field+'Field'][i]; //for bubble
                    //}
                });
            }
            return gObj;
        }
    };
    
    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bubble;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Candle.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Candle = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Candle() {
        CommonSerial.call(this);
        this._class = "amchart_Candle";
        this._tag = "div";

        this._gType = "candlestick";
    }

    Candle.prototype = Object.create(CommonSerial.prototype);
    Candle.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Candle.prototype.publish("paletteID", "default", "set", "Palette ID", Candle.prototype._palette.switch(), {tags:['Basic','Shared']});
    Candle.prototype.publish("isStacked", true, "boolean", "Stack CHart", null, {tags:['Basic','Shared']});
    Candle.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});
    /**
     * Publish Params Unique To This Widget
     */
    Candle.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:['Basic']});

    Candle.prototype.publish("tooltipTemplate",'<div style="text-align:left;"><b>[[category]]</b><br/> Open:<b>[[open]]</b> Close:<b>[[close]]</b><br/>Low:<b>[[low]]</b> High:<b>[[high]]</b></div>', "string", "Tooltip Text",null,{tags:['Intermediate']});

    Candle.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:['Basic']});

    Candle.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});
    Candle.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines",null,{tags:['Intermediate']});

    Candle.prototype.testData = function() {
        this.columns(["Subject", "low", "open", "close", "high"]);
        this.data([
            ["Geography", 10, 15, 35, 40],
            ["English", 20, 25, 45, 55],
        ]);
        return this;
    };

    Candle.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var context = this;
        var retVal = CommonSerial.prototype.columns.apply(this, arguments);
        this._categoryField = colArr[0];
        this._lowField = [];
        this._openField = [];
        this._highField = [];
        this._closeField = [];
        colArr.slice(1,colArr.length).forEach(function(col,colIdx){
            switch(colIdx % 4) {
                case 0:
                    context._lowField.push(col);
                    break;
                case 1:
                    context._openField.push(col);
                    break;
                case 2:
                    context._closeField.push(col);
                    break;
                case 3:
                    context._highField.push(col);
                    break;
            }
        });
        this._columns = colArr;
        return retVal;
    };

    Candle.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Candle.prototype.updateChartOptions = function() {
        var context = this;
        this._gType = this.useOhlcLines() ? "ohlc" : "candlestick";
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue

        // Color Palette
        switch(this.paletteGrouping()) {
            case "By Category":
                this._chart.dataProvider.forEach(function(dataPoint,i){
                    context._chart.dataProvider[i].color = context._palette(i);
                    context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(i);
                });
                this._chart.colors = [];
            break;
            case "By Column":
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
            default:
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
        }

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Candle.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._openField) !== 'undefined' && typeof(this._openField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if(this.paletteGrouping() === "By Category"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    Candle.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Candle;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonFunnel',["d3", "../common/HTMLWidget", "amcharts.funnel"], factory);
    } else {
        root.amchart_CommonFunnel = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonFunnel() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }

    CommonFunnel.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    CommonFunnel.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonFunnel.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonFunnel.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonFunnel.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("labelPosition", "center", "set", "Label Position", ["left","right","center"],{tags:['Intermediate']});

    CommonFunnel.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:['Intermediate']});

    CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:['Private']});

    CommonFunnel.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:['Basic']});
    CommonFunnel.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    CommonFunnel.prototype.updateChartOptions = function() {

        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

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
        this._chart.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        // Scroll Bar
        if (this.showScrollbar()) {
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
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

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
            autoResize: true,
            autoMargins: true,
            chartScrollbar: {}
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonFunnel.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return CommonFunnel;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonRadar',["d3", "../common/HTMLWidget", "amcharts.radar"], factory);
    } else {
        root.amchart_CommonRadar = factory(root.d3, root.common_HTMLWidget, root.AmCharts);
    }

}(this, function(d3, HTMLWidget, AmCharts) {
    function CommonRadar() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }

    CommonRadar.prototype = Object.create(HTMLWidget.prototype);

    // NO X-Axis  !!!

    /**
     * Publish Params Common To Other Libraries
     */
    CommonRadar.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("lineWidth", 2, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:'range',tags:['Basic','Shared']});
    CommonRadar.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Basic','Shared']});
    CommonRadar.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:['Advanced','Shared']});

    CommonRadar.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color",null,{tags:['Intermediate','Shared']});

    CommonRadar.prototype.publish("axisFontSize", null, "number", "Size of value labels text. Will use chart's fontSize if not set.",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisFontColor", null, "string", "Font Name",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});
    CommonRadar.prototype.publish("yAxisTitleFontSize", null, "html-color", "Font Size of axis value labels. Will use chart's color if not set.",null,{tags:['Basic','Shared']});

    CommonRadar.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:['Private']});

    CommonRadar.prototype.publish("dataDateFormat", null, "string", "Date Format String",null,{tags:['Private']});

    CommonRadar.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:['Advanced']});

    //CommonRadar.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:['Advanced']});
    //CommonRadar.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    //CommonRadar.prototype.publish("yAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:['Intermediate']});
    //CommonRadar.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("yAxisMinimum", [], "array", "",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisTitleOffset", [], "array", "",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("yAxisDashLength", [], "array", "Length of a dash. 0 means line is not dashed.",null,{tags:['Advanced']});
    CommonRadar.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:['Intermediate']});

    CommonRadar.prototype.publish("circularGrid", false, "boolean", "Circular Grid",null,{tags:['Intermediate']}); // not dynamic

    CommonRadar.prototype.publish("bulletSize", 9, "number", "Bullet Size",null,{tags:['Intermediate']});
    CommonRadar.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:['Intermediate']});

    CommonRadar.prototype.publish("fillOpacity", 0.3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate']});

    CommonRadar.prototype.updateChartOptions = function() {
        var context = this;

        if (this.dataDateFormat()) { this._chart.dataDateFormat = this.dataDateFormat(); }
        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this.startDuration();
        this._chart.categoryField = this._categoryField;

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this.titles = [];

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        // ValueAxis
        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();
        this._chart.valueAxes[0].minimum = this.yAxisMinimum();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength() || this.dashedLineStyle();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].color = this.yAxisFontColor();

        this._chart.valueAxes[0].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.yAxisGridPosition();

        // Color Palette
        this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        if(this.circularGrid()){ // not dynamic
            this._chart.valueAxes.forEach(function(va,i){
                context._chart.valueAxes[i].gridType = "circles";
            });
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonRadar.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonText = context.tooltipTemplate();
        gObj.fillAlphas = context.fillOpacity();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = '';

        return gObj;
    };

    CommonRadar.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonRadar.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
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

    CommonRadar.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var initObj = {
            theme: "none",
            type: "radar",
            chartScrollbar: {}
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    CommonRadar.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this._palette = this._palette.switch(this.paletteID());
    };

    return CommonRadar;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/FloatingColumn.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_FloatingColumn = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function FloatingColumn() {
        CommonSerial.call(this);
        this._class = "amchart_FloatingColumn";
        this._tag = "div";

        this._gType = "column";
    }

    FloatingColumn.prototype = Object.create(CommonSerial.prototype);
    FloatingColumn.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    FloatingColumn.prototype.publish("paletteID", "Dark2", "set", "Palette ID", FloatingColumn.prototype._palette.switch(), {tags:['Basic','Shared']});
    FloatingColumn.prototype.publish("isStacked", true, "boolean", "Stacked", null, {tags:['Basic','Shared']});
    FloatingColumn.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:'range',tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    FloatingColumn.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:['Intermediate']});

    FloatingColumn.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:['Basic']});

    FloatingColumn.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:['Basic']});
    FloatingColumn.prototype.publish("Angle3D", 45, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    FloatingColumn.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:['Basic']});
    FloatingColumn.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});

    FloatingColumn.prototype.testData = function() {
        this.columns(["Subject", "open", "close"]);
        this.data([
            ["Geography", 15, 35],
            ["English", 25, 45],
            ["Math", 10, 35],
            ["Science", 45, 60]
        ]);
        return this;
    };

    FloatingColumn.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var context = this;
        this._categoryField = colArr[0];
        this._openField = [];
        this._closeField = [];
        this._valueField = [];
        colArr.slice(1,colArr.length).forEach(function(col,colIdx){
            if(colIdx % 2) {
                context._closeField.push(col);
                context._valueField.push(col);
            } else {
                context._openField.push(col);
            }
        });
        this._columns = colArr;
        
        return this;
    };

    FloatingColumn.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    FloatingColumn.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
        var context = this;

        // Color Palette
        switch(this.paletteGrouping()) {
            case "By Category":
                this._chart.dataProvider.forEach(function(dataPoint,i){
                    context._chart.dataProvider[i].color = context._palette(i);
                    context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(i);
                });
                this._chart.colors = [];
            break;
            case "By Column":
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
            default:
                this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
                    return this._palette(row);
                }, this);
            break;
        }

        this.buildGraphs(this._gType);
    };

    FloatingColumn.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._openField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._openField) !== 'undefined' && typeof(this._openField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if(this.paletteGrouping() === "By Category"){
                gObj.colorField = "color";
                gObj.lineColorField = "linecolor";
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    FloatingColumn.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return FloatingColumn;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Funnel.js',["d3", "./CommonFunnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Funnel = factory(root.d3, root.amchart_CommonFunnel, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, I2DChart) {
    function Funnel() {
        CommonFunnel.call(this);
        this._class = "amchart_Funnel";
    }

    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %",null,{tags:['Basic']});
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %",null,{tags:['Basic']});

    //TODO
    Funnel.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Basic']});

    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);

        this._chart.balloonText = this.tooltipTemplate();
        this._chart.neckHeight = this.neckHeightPercent()+"%";
        this._chart.neckWidth = this.neckWidthPercent()+"%";
    };

    Funnel.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Funnel;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Gauge.js',["d3", "../common/HTMLWidget", "amcharts.gauge", "../api/I1DChart"], factory);
    } else {
        root.amchart_Gauge = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I1DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I1DChart) {
    function Gauge() {
        HTMLWidget.call(this);
        this._class = "amchart_Gauge";
        this._tag = "div";

        this._chart = {};
    }

    Gauge.prototype = Object.create(HTMLWidget.prototype);
    Gauge.prototype.implements(I1DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch(), {tags:['Basic','Shared']});
    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound", null, {tags:['Intermediate','Shared']});
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound", null, {tags:['Intermediate','Shared']});

    Gauge.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    Gauge.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared','Shared']});
    Gauge.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Gauge.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Intermediate']});

    Gauge.prototype.publish("colorType", "a", "set", "", ["a","b","c"],{tags:['Basic']});

    Gauge.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    Gauge.prototype.publish("numBands", null, "number", "",null,{tags:['Intermediate']});
    Gauge.prototype.publish("bandsColor", [], "array", "Bands Color",null,{tags:['Basic']});
    Gauge.prototype.publish("bandsStartValue", [], "array", "Bands Start Value",null,{tags:['Advanced']});
    Gauge.prototype.publish("bandsEndValue", [], "array", "Bands End Value",null,{tags:['Advanced']});
    Gauge.prototype.publish("bandsInnerRadius", [], "array", "Bands Inner Radius",null,{tags:['Advanced']});

    Gauge.prototype.publish("axisAlpha", 0.2, "number", "Axis Alpha",null,{tags:['Intermediate']});
    Gauge.prototype.publish("tickAlpha", 0.2, "number", "Tick Alpha",null,{tags:['Intermediate']});
    Gauge.prototype.publish("valueInterval", 20, "number", "Value Interval",null,{tags:['Advanced']});
    Gauge.prototype.publish("bottomText", "", "string", "Text Along Bottom",null,{tags:['Intermediate']});
    Gauge.prototype.publish("bottomTextYOffset", -20, "number", "Bottom Text Vertical Offset",null,{tags:['Intermediate']});

    Gauge.prototype.publish("animatationDuration", 2, "number", "Animation Duration (sec)",null,{tags:['Intermediate']});

    Gauge.prototype.updateChartOptions = function() {
        this._chart.type = "gauge";
        this._chart.theme = "none";

        this._chart.startDuration = this.animatationDuration();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.titles = [];
        this._chart.allLabels = [];

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.axes[0].axisThickness = this.axisLineWidth();
        this._chart.axes[0].axisAlpha = this.axisAlpha();
        this._chart.axes[0].tickAlpha = this.tickAlpha();
        this._chart.axes[0].valueInterval = this.valueInterval();
        this._chart.axes[0].bands = [];
        this._chart.axes[0].bottomText = this.bottomText();
        this._chart.axes[0].bottomTextYOffset = this.bottomTextYOffset();
        this._chart.axes[0].endValue = this.high();
        this._chart.axes[0].startValue = this.low();

        // 3 Color Methods
        var i, l;
        if (this.colorType() === 'a') {
            for (i = 0, l = this.numBands(); i < l; i++) {
                var a_band = {
                    color: this.bandsColor()[i],
                    startValue: this.bandsStartValue()[i],
                    endValue: this.bandsEndValue()[i],
                    innerRadius: this.bandsInnerRadius()[i],
                };
                this._chart.axes[0].bands.push(a_band);
            }
        }
        if (this.colorType() === 'b') {
            for (i = 0, l = this.high() ; i < l; i++) {
                var b_band = {
                    color: this._palette(i, this.low(), this.high()),
                    startValue: i,
                    endValue: i+1,
                    //innerRadius: this._bandsInnerRadius[i] || '', // this has a cool effect might be useful?
                    innerRadius: this.bandsInnerRadius()[0]
                };
                this._chart.axes[0].bands.push(b_band);
            }
        }
        if (this.colorType() === 'c') {
            var c_band = {
                color: this._palette(this._data, this.low(), this.high()),
                startValue: this.low(),
                endValue: this.high(),
                innerRadius: this.bandsInnerRadius()[0]
            };
            this._chart.axes[0].bands.push(c_band);
        }

        this._chart.axes[0].bottomText = this.bottomText().replace("[[data]]",this._data);

        return this._chart;
    };

    Gauge.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this.updateChartOptions();
        this._chart.arrows[0].setValue(this._data);

        this._chart.validateNow();
        this._chart.validateData();
    };

    Gauge.prototype.enter = function(domNode, element) {
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        var initObj = {
            theme: "none",
            type: "gauge",
            axes: [{}],
            arrows:[{}]
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    Gauge.prototype.testData = function() {
        this.numBands(3);
        this.bandsColor(["#84b761","#fdd400","#cc4748"]);
        this.bandsEndValue([90,130,220]);
        this.bandsStartValue([0,90,130]);
        this.bandsInnerRadius([null, null, "95%"]);
        this.bottomText("[[data]] km/h");
        this.high(220);
        this.low(0);
        this.data(100);
        this.axisLineWidth(1);
        this.axisAlpha(0.2);
        this.tickAlpha(0.2);
        this.valueInterval(20);

        return this;
    };

    return Gauge;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Line.js',["d3", "./CommonSerial", "../api/INDChart"], factory);
    } else {
        root.amchart_Line = factory(root.d3, root.amchart_CommonSerial, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, INDChart) {
    function Line() {
        CommonSerial.call(this);
        this._class = "amchart_Line";
        this._tag = "div";

        this._gType = "line";
    }

    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(), {tags:['Basic','Shared']});
    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Line.prototype.publish("stepLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic']});
    Line.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Basic']});

    Line.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Line.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        // Color Palette
        this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Line.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            if (this.stepLines()) {
                gObj.type = 'step';
            } else if (this.smoothLines()) {
                gObj.type = 'smoothedLine';
            } else {
                gObj.type = 'line';
            }

            return gObj;
        }
    };

    Line.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Line;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Pie.js',["d3", "../common/HTMLWidget", "amcharts.pie", "../api/I2DChart"], factory);
    } else {
        root.amchart_Pie = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I2DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart) {
    function Pie() {
        HTMLWidget.call(this);
        this._class = "amchart_Pie";
        this._tag = "div";

        this._chart = {};
    }

    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), {tags:['Basic','Shared']});
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family",null,{tags:['Basic','Shared']});
    Pie.prototype.publish("fontSize", 11, "number", "Label Font Size",null,{tags:['Basic','Shared']});
    Pie.prototype.publish("fontColor", null, "html-color", "Label Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Pie.prototype.publish("tooltipTemplate","[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>", "string", "Tooltip Text",null,{tags:['Intermediate']});

    Pie.prototype.publish("Depth3D", 10, "number", "3D Depth (px)",null,{tags:['Basic']});
    Pie.prototype.publish("Angle3D", 15, "number", "3D Angle (Deg)",null,{tags:['Basic']});

    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)",null,{tags:['Intermediate']});
    Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:['Intermediate']});

    Pie.prototype.publish("holePercent", 0, "number", "Hole Size (Percent)",null,{tags:['Basic']});

    Pie.prototype.publish("radius", null, "number", "Radius",null,{tags:['Basic']});
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice",null,{tags:['Private']});

    Pie.prototype.publish("labelPosition", "right", "set", "Label Position", ["left","right"],{tags:['Intermediate']});

    Pie.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.type = "pie";
        this._chart.radius = this.radius();

        this._chart.balloonText = context.tooltipTemplate();

        this._chart.labelPosition = this.labelPosition();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.innerRadius = this.holePercent()+"%";
        this._chart.fontFamily = this.fontFamily();
        this._chart.fontSize = this.fontSize();
        this._chart.fontSize = this.fontSize();
        this._chart.color = this.fontColor();

        this._chart.allLabels = [];
        this._chart.pieAlpha =  this.pieAlpha();

        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];
        var sortingMethod;
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        } else {
        	sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);

        this._chart.dataProvider = this.formatData(this._data);

        this._chart.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        this.pieAlpha().forEach(function(d,i) {
            if (typeof(this._chart.chartData[i])==='undefined') {
                this._chart.chartData[i] = {};
            }
            this._chart.chartData[i].alpha = d;
        },this);

        return this._chart;
    };

    Pie.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    Pie.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
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
        this._palette = this._palette.switch(this.paletteID());

        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Pie;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Polar.js',["d3", "./CommonRadar", "amcharts.radar", "../api/INDChart"], factory);
    } else {
        root.amchart_Polar = factory(root.d3, root.amchart_CommonRadar, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonRadar, AmCharts, INDChart) {
    function Polar() {
        CommonRadar.call(this);
        this._class = "amchart_Polar";
        this._tag = "div";
        this._gType = "column";
    }

    Polar.prototype = Object.create(CommonRadar.prototype);
    Polar.prototype.implements(INDChart.prototype);
    /**
     * Publish Params Common To Other Libraries
     */
    Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Polar.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});

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
        this.yAxisTitleOffset([20]);
        this.yAxisMinimum([0]);
        this.axisAlpha([0.15]);
        this.yAxisDashLength([3]);
        return this;
    };

    Polar.prototype.enter = function(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    };

    Polar.prototype.updateChartOptions = function() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Polar.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonRadar.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal,this._valueField[i]);
                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj,valueField) {
            gObj.valueField = valueField;
            return gObj;
        }
    };

    Polar.prototype.update = function(domNode, element) {
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Polar;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Pyramid.js',["d3", "./CommonFunnel", "amcharts.funnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Pyramid = factory(root.d3, root.amchart_CommonFunnel, root.amcharts, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, I2DChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._class = "amchart_Pyramid";
        this._tag = "div";
    }

    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Pyramid.prototype.publish("paletteID", "default", "set", "Palette ID", Pyramid.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Pyramid.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:['Intermediate']});

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
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Pyramid.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
    };

    Pyramid.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);
    };

    return Pyramid;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Scatter.js',["d3", "./CommonXY", "amcharts.xy", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Scatter = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Scatter() {
        CommonXY.call(this);
        this._class = "amchart_Scatter";
        this._tag = "div";

        this._type = "Scatter";
        this._gType = "column";
    }
    Scatter.prototype = Object.create(CommonXY.prototype);
    Scatter.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Scatter.prototype.publish("tooltipTemplate","x:[[x]] y:[[y]]", "string", "Tooltip Text");

    Scatter.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Scatter.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === 'undefined') { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== 'undefined' && typeof(this._valueField[i]) !== 'undefined')) { //mark
                var gRetVal = CommonXY.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== 'undefined') {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj) {
            // TODO: Scatter Specific Options
            return gObj;
        }
    };

    Scatter.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Scatter;
}));
