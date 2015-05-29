if (typeof define === "function" && define.amd) {
  define('goog',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Common.js',["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_Common = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Common(tget) {
        HTMLWidget.call(this);

        this._tag = "div";

        this.columns([]);
        this.data([],{tags:['Advanced']});
        this._data_google = [];

        this._chart = null;
    }
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype._class += " google_Common";

    /**
     * Publish Params Common To Other Libraries
     */
    Common.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    Common.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared']});
    Common.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    Common.prototype.publish("showLegend", false, "boolean", "Show Legend",null,{tags:['Basic','Shared']});

    // below ones are TODO ... BOLD/ITALTIC needs to be 1 param maybe?
    Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color",null,{tags:['Private']});
    Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name",null,{tags:['Private']});
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size",null,{tags:['Private']});
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold",null,{tags:['Private']});
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic",null,{tags:['Private']});

    /**
     * Publish Params Unique To This Widget
     */
    Common.prototype.publish("chartAreaWidth", null, "string", "Chart Area Width",null,{tags:['Advanced']}); // num or string
    Common.prototype.publish("chartAreaHeight", null, "string", "Chart Area Height",null,{tags:['Advanced']});
    Common.prototype.publish("chartAreaTop", null, "string", "Chart Area Distance From Top",null,{tags:['Advanced']}); // num or string (google default auto)
    Common.prototype.publish("chartAreaLeft", null, "string", "Chart Area Distance From Left",null,{tags:['Advanced']});

    //TODO: Remove the legend params ... above shared params????
    Common.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["", "start", "center", "end"],{tags:['Private']});
    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["", "bottom", "labeled", "left", "right", "top"],{tags:['Private']});

    //TODO:Do these apply to animating between data sets?
    Common.prototype.publish("animationDuration", 0, "number", "Animation Duration",null,{tags:['Advanced']});
    Common.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup",null,{tags:['Advanced']});
    Common.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["linear", "in", "out", "inAndOut"],{tags:['Advanced']});

    Common.prototype.publish("title", "", "string", "Text To Display Above The Chart",null,{tags:['Private']});
    Common.prototype.publish("titlePosition", "out", "set", "Position of Title",["in","out","none"],{tags:['Private']});

    // need to see if this is going to be shared these 3 below
    Common.prototype.publish("backgroundColorStroke", null, "html-color", "Background Border Color",null,{tags:['Advanced','Shared']});
    Common.prototype.publish("backgroundColorStrokeWidth", 0, "number", "Background Border Width",null,{tags:['Advanced','Shared']});
    Common.prototype.publish("backgroundColorFill", "transparent", "html-color", "Background Color",null,{tags:['Advanced','Shared']});

    Common.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = null;
            if (this._data.length) {
                data = [this._columns].concat(this._data);
            } else {
                data = [
                    ['', { role: 'annotation' }],
                    ['', '']
                ];
            }
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Common.prototype.getChartOptions = function () {
        var colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        var chartOptions =  {
            backgroundColor: {
                stroke: this.backgroundColorStroke(),
                strokeWidth: this.backgroundColorStrokeWidth(),
                fill: this.backgroundColorFill()
            },
            width: this.width(),
            height: this.height(),
            colors: colors,
            fontSize: this.fontSize(),
            fontName: this.fontFamily(),
            fontColor: this.fontColor(),
            title: this.title(),
            titlePosition: this.titlePosition(),

            chartArea: {
                width: this.chartAreaWidth(),
                height: this.chartAreaHeight(),
                left: this.chartAreaLeft(),
                top: this.chartAreaTop()
            },
            animation: {
                duration: this.animationDuration(),
                startup: this.animationOnStartup(),
                easing: this.animationEasing()
            },
            legend: {
                alignment: this.legendAlignment(),
                position: this.showLegend ()? this.legendPosition (): "none",
                maxLines: 2,
                textStyle: {
                    color: this.legendFontColor(),
                    fontName: this.legendFontFamily(),
                    fontSize: this.legendFontSize(),
                    bold: this.legendFontBold(),
                    italic: this.legendFontItalic()
                }
            }
        };
        return chartOptions;
    };
    
    Common.prototype.getNumSeries = function () {
        return this._columns.slice(1).length;
    };

    Common.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");

        this._chart = new google.visualization[this._chartType](domNode);

        var context = this;
        google.visualization.events.addListener(this._chart, "select", function () {
            var selectedItem = context._chart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[selectedItem.column]);
            }
        });
    };

    Common.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    };

    return Common;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/CommonND.js',["d3", "../google/Common", "../api/INDChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_CommonND = factory(root.d3, root.google_Common, root.api_INDChart);
    }
}(this, function (d3, Common, INDChart) {

    function CommonND() {
        Common.call(this);
        INDChart.call(this);
    }
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype._class += " google_CommonND";
    CommonND.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(),{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };
    
    CommonND.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }

    return CommonND;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Area.js',["d3", "./CommonND"], factory);
    } else {
        root.google_Area = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Area() {
        CommonND.call(this);

        this._chartType = "AreaChart";
    }
    Area.prototype = Object.create(CommonND.prototype);
    Area.prototype._class += " google_Area";

    /**
     * Publish Params Common To Other Libraries
     */
    Area.prototype.publish("isStacked", false, "boolean", "Stacks The Elements In A Series",null,{tags:['Advanced','Shared']});
    Area.prototype.publish("fillOpacity", null, "number", "Opacity of The Fill Color",null,{tags:['Intermediate','Shared']});

    Area.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:['Basic','Shared']});
    Area.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:['Basic','Shared']});

    Area.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    Area.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});

    Area.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:['Intermediate','Shared']});
    Area.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:['Intermediate','Shared']});

    Area.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:['Basic','Shared']});
    Area.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:['Basic','Shared']});

    Area.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});
    Area.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});

    Area.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});
    Area.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});

    Area.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});
    Area.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});

    Area.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Area.prototype.publish("smoothLines", true, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic']});

    Area.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:['Advanced']});

    Area.prototype.publish("selectionMode", "single", "set", "Select Multiple Data Points", ["single","multiple"],{tags:['Advanced']});

    Area.prototype.publish("xAxisBaseline", null, "number", "The Baseline For The Horizontal Axis",null,{tags:['Intermediate']});
    Area.prototype.publish("yAxisBaseline", null, "number", "The Vaseline For The Verical Axis",null,{tags:['Intermediate']});

    Area.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:['Advanced']});
    Area.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});
    Area.prototype.publish("yAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});

    Area.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Area.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Area.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:['Basic']});
    Area.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:['Basic']});

    Area.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Area.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Area.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});
    Area.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});

    Area.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:['Advanced']});
    Area.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});
    Area.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});

    Area.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:['Private']});
    Area.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:['Private']});

    Area.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});
    Area.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Area.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});
    Area.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});

    Area.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Area.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Area.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:['Advanced']});

    //Area.prototype.publish("xAxisAllowContainerBoundaryTextCutoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.",null,{tags:['Advanced']});

    Area.prototype.publish("xAxisMaxAlternation", 2, "number", "Maximum Number of Levels of Horizontal Axis Text",null,{tags:['Advanced']});
    Area.prototype.publish("xAxisMaxTextLines", null, "number", "Maximum Number of Lines Allowed For the Text Labels",null,{tags:['Advanced']});
    Area.prototype.publish("xAxisMinTextSpacing", null, "number", "Minimum Horizontal Spacing, In Pixels, Allowed Between Two Adjacent Text Labels",null,{tags:['Advanced']});

    Area.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.selectionMode = this.selectionMode();
        retVal.dataOpacity = this.dataOpacity();

        retVal.isStacked = this.isStacked();
        retVal.areaOpacity = this.fillOpacity();

        retVal.hAxis = {};
        retVal.vAxis = {};

        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();

        //retVal.hAxis.allowContainerBoundaryTextCufoff = this.xAxisAllowContainerBoundaryTextCutoff();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();
        retVal.hAxis.maxAlternation = this.xAxisMaxAlternation();
        retVal.hAxis.maxTextLines = this.xAxisMaxTextLines();
        retVal.hAxis.minTextSpacing = this.xAxisMinTextSpacing();

        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };

        //vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();

        retVal.vAxis.format = this.yAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        if (this.smoothLines()) {
            retVal.curveType = "function";
        }

        return retVal;
    };

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Area;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Bar.js',["d3", "./CommonND"], factory);
    } else {
        root.google_Bar = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Bar() {
        CommonND.call(this);

        this._chartType = "BarChart";
    }
    Bar.prototype = Object.create(CommonND.prototype);
    Bar.prototype._class += " google_Bar";

    /**
     * Publish Params Common To Other Libraries
     */
    Bar.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series",null,{tags:['Basic','Shared']});
    //opacity?
    Bar.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:['Basic','Shared']});
    Bar.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:['Basic','Shared']});

    Bar.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    Bar.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});

    Bar.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:['Intermediate','Shared']});
    Bar.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:['Intermediate','Shared']});

    Bar.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:['Basic','Shared']});
    Bar.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:['Basic','Shared']});

    Bar.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});
    Bar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});

    Bar.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});
    Bar.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});

    Bar.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});
    Bar.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});

    Bar.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Bar.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels",null,{tags:['Advanced']});
    Bar.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:['Intermediate']});

    Bar.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:['Intermediate']});
    Bar.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:['Intermediate']});

    Bar.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:['Advanced']});

    Bar.prototype.publish("xAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});
    Bar.prototype.publish("yAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});

    Bar.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Bar.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:['Intermediate']});

    Bar.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:['Basic']});
    Bar.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:['Basic']});

    Bar.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Bar.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Bar.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});
    Bar.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});

    Bar.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:['Advanced']});

    Bar.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});
    Bar.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});

    Bar.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:['Private']});
    Bar.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:['Private']});

    Bar.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Bar.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Bar.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});
    Bar.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});

    Bar.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:['Advanced']});

    Bar.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Bar.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:['Advanced']});

    Bar.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.dataOpacity = this.dataOpacity();
        retVal.isStacked = this.isStacked();
        retVal.bar = {
            groupWidth: this.groupWidth()
        };

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();

        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()

        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };

        // vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();

        retVal.vAxis.format = this.yAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };
        return retVal;
    };

    Bar.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Bar;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Column.js',["d3", "./CommonND"], factory);
    } else {
        root.google_Column = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Column() {
        CommonND.call(this);

        this._chartType = "ColumnChart";
    }
    Column.prototype = Object.create(CommonND.prototype);
    Column.prototype._class += " google_Column";

    /**
     * Publish Params Common To Other Libraries
     */
    Column.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series",null,{tags:['Advanced','Shared']});

    Column.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:['Basic','Shared']});
    Column.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:['Basic','Shared']});

    Column.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    Column.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});

    Column.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:['Intermediate','Shared']});
    Column.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:['Intermediate','Shared']});

    Column.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:['Basic','Shared']});
    Column.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:['Basic','Shared']});

    Column.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});
    Column.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});

    Column.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});
    Column.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});

    Column.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});
    Column.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});

    Column.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Column.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels",null,{tags:['Advanced']});
    Column.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:['Advanced']});
    //selectionMode

    Column.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:['Intermediate']});
    Column.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:['Intermediate']});

    Column.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:['Advanced']});

    Column.prototype.publish("xAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});
    Column.prototype.publish("yAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});

    Column.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Column.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:['Intermediate']});

    Column.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:['Basic']});
    Column.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:['Basic']});

    Column.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Column.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Column.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});
    Column.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});

    Column.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:['Advanced']});

    Column.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});
    Column.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});

    Column.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:['Private']});
    Column.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:['Private']});

    Column.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Column.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Column.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});
    Column.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});

    Column.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:['Advanced']});

    Column.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Column.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:['Advanced']});

    Column.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.dataOpacity = this.dataOpacity();
        retVal.isStacked = this.isStacked();
        retVal.bar = {
            groupWidth: this.groupWidth()
        };

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();

        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };
        // vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();

        retVal.vAxis.format = this.yAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        return retVal;
    };

    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Column;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Common2D',["d3", "../google/Common", "../api/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_Common2D = factory(root.d3, root.google_Common, root.api_I2DChart);
    }
}(this, function (d3, Common, I2DChart) {

    function Common2D() {
        Common.call(this);
        I2DChart.call(this);
    }
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype._class += " google_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(),{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    Common2D.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }

    return Common2D;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Line.js',["d3", "./CommonND"], factory);
    } else {
        root.google_Line = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Line() {
        CommonND.call(this);

        this._chartType = "LineChart";
    }
    Line.prototype = Object.create(CommonND.prototype);
    Line.prototype._class += " google_Line";

    /**
     * Publish Params Common To Other Libraries
     */
    Line.prototype.publish("lineWidth", 2, "number", "Line Width",null,{tags:['Basic','Shared']});
    Line.prototype.publish("lineDashStyle", [], "array", "Line Dash Style",null,{tags:['Advanced','Shared']});

    Line.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:['Basic','Shared']});
    Line.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:['Basic','Shared']});

    Line.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    Line.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});

    Line.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:['Intermediate','Shared']});
    Line.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:['Intermediate','Shared']});

    Line.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:['Basic','Shared']});
    Line.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:['Basic','Shared']});

    Line.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});
    Line.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});

    Line.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});
    Line.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});

    Line.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});
    Line.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});

    Line.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Line.prototype.publish("orientation", "horizontal", "set", "Line Dash Style", ["horizontal","vertical"],{tags:['Advanced']});

    Line.prototype.publish("pointSize", [], "array", "Diameter of displayed points in pixels",null,{tags:['Private']});
    Line.prototype.publish("pointShape", [], "array", "The shape of individual data elements",null,{tags:['Advanced']}); //TODO: Needs example in description

    Line.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:['Intermediate']});
    Line.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:['Intermediate']});

    Line.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});
    Line.prototype.publish("yAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});

    Line.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Line.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:['Intermediate']});

    Line.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:['Basic']});
    Line.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:['Basic']});

    Line.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Line.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Line.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});
    Line.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});

    Line.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});
    Line.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});

    Line.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:['Private']});
    Line.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:['Private']});

    Line.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});
    Line.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});

    Line.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Line.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:['Advanced']});

    Line.prototype.publish("xAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels",null,{tags:['Advanced']});
    Line.prototype.publish("xAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text",null,{tags:['Advanced']});
    Line.prototype.publish("xAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels",null,{tags:['Advanced']});

    Line.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.lineWidth = this.lineWidth();
        retVal.lineDashStyle = this.lineDashStyle();
        retVal.orientation = this.orientation();
        retVal.pointShape = this.pointShape();
        retVal.pointSize = this.pointSize();

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();

        //retVal.hAxis.allowContainerBoundaryTextCutoff = this.xAxisAllowContainerBoundaryTextCutoff();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();
        retVal.hAxis.maxAlternation = this.xAxisMaxAlternation();
        retVal.hAxis.maxTextLines = this.xAxisMaxTextLines();
        retVal.hAxis.minTextSpacing = this.xAxisMinTextSpacing();

        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor() ? this.xAxisFontColor() : this.fontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor() ? this.xAxisTitleFontColor() : this.fontColor(),
            fontName: this.xAxisTitleFontFamily() ? this.xAxisTitleFontFamily() : this.fontFamily(),
            fontSize: this.xAxisTitleFontSize() ? this.xAxisTitleFontSize() : this.fontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };

        // vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();

        retVal.vAxis.format = this.yAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor() ? this.yAxisTitleFontColor() : this.fontColor(),
            fontName: this.yAxisTitleFontFamily() ? this.yAxisTitleFontFamily() : this.fontFamily(),
            fontSize: this.yAxisTitleFontSize() ? this.yAxisTitleFontSize() : this.fontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        this.lineDashStyle().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {};
            }
            retVal.series[i].lineDashStyle = d;
        });

        this.pointShape().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {};
            }
            retVal.series[i].pointShape = d;
        });

        this.pointSize().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {};
            }
            retVal.series[i].pointSize = d;
        });

        if (this.smoothLines()) {
            retVal.curveType = "function";
        }

        return retVal;
    };

    Line.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Line.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Line;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Pie.js',["d3", "./Common2D"], factory);
    } else {
        root.google_Pie = factory(root.d3, root.google_Common2D);
    }
}(this, function (d3, Common2D) {

    function Pie() {
        Common2D.call(this);

        this._chartType = "PieChart";
    }
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype._class += " google_Pie";

    /**
     * Publish Params Common To Other Libraries
     */
    Pie.prototype.publish("is3D", false, "boolean", "Enable 3D",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size",null,{min:0,max:0.9,step:0.1,tags:['Intermediate']});
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle",null,{tags:['Advanced']});

    Pie.prototype.publish("pieSliceText", "percentage", "set", "The Content of The Text Displayed On The Slice" ,["none","label","value","percentage"],{tags:['Basic']});
    Pie.prototype.publish("pieSliceFontColor", null, "html-color", "Specifies The Slice Text Style (Color)",null,{tags:['Basic']});
    Pie.prototype.publish("pieSliceFontFamily", null, "string", "Specifies The Slice Text Style (Font Name)",null,{tags:['Basic']});
    Pie.prototype.publish("pieSliceFontSize", null, "number", "Specifies The Slice Text Style (Font Size)",null,{tags:['Basic']});

    Pie.prototype.publish("pieSliceBorderColor", null, "html-color", "The Color of The Slice Borders",null,{tags:['Intermediate']});
    Pie.prototype.publish("pieResidueSliceColor", null, "html-color", "Color For The Combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:['Advanced']});
    Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:['Advanced']});

    Pie.prototype.publish("sliceVisibilityThreshold", 1/720, "number", "The slice relative part, below which a slice will not show individually.",null,{tags:['Advanced']});

    Pie.prototype.publish("slicesOffset", [], "array", "Per Slice Offset",null,{tags:['Advanced']});
    Pie.prototype.publish("slicesTextStyle", [], "array", "Per Slice",null,{tags:['Private']}); // overrides pieSliceTextStyle
    Pie.prototype.publish("slicesColor", [], "array", "Per Slice Color",null,{tags:['Private']});

    Pie.prototype.getChartOptions = function () {
        var retVal = Common2D.prototype.getChartOptions.apply(this, arguments);

        retVal.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        retVal.is3D = this.is3D();
        retVal.pieHole = this.pieHole();
        retVal.pieStartAngle = this.pieStartAngle();
        retVal.pieSliceText = this.pieSliceText();
        retVal.pieSliceTextStyle = {
            color: this.pieSliceFontColor(),
            fontName: this.pieSliceFontFamily(),
            fontSize: this.pieSliceFontSize()
        };
        retVal.pieSliceBorderColor = this.pieSliceBorderColor();
        retVal.pieResidueSliceColor = this.pieResidueSliceColor();
        retVal.pieResidueSliceLabel = this.pieResidueSliceLabel();
        retVal.sliceVisibilityThreshold = this.sliceVisibilityThreshold();

        retVal.slices = initSlices(this.getNumSlices());

        this.slicesColor().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {};
            }
            retVal.slices[i].color = d;
        });
        this.slicesOffset().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {};
            }
            retVal.slices[i].offset = d;
        });
        this.slicesTextStyle().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {};
            }
            retVal.slices[i].textStyle = d;
        });
        return retVal;
    };

    Pie.prototype.getNumSlices = function () {
        return this.data().length;
    };

    function initSlices(num) {
        var slices = [];
        for (var i = 0; i < num; i++) {
            slices.push({});
        }
        return slices;
    }

    Pie.prototype.enter = function (domNode, element) {
        Common2D.prototype.enter.apply(this, arguments);
    };

    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    return Pie;
}));

