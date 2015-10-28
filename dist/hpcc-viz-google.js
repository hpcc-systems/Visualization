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
        this.data([]);
        this._data_google = google.visualization.arrayToDataTable([["", { role: "annotation" }],["",""]]);

        this._chart = null;
        this._selection = {};
    }
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype.constructor = Common;
    Common.prototype._class += " google_Common";

    Common.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Common.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:["Basic","Shared"]});
    Common.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    Common.prototype.publish("showLegend", false, "boolean", "Show Legend",null,{tags:["Basic","Shared"]});

    // below ones are TODO ... BOLD/ITALTIC needs to be 1 param maybe?
    Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color",null,{tags:["Private"]});
    Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name",null,{tags:["Private"]});
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size",null,{tags:["Private"]});
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold",null,{tags:["Private"]});
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic",null,{tags:["Private"]});

    Common.prototype.publish("chartAreaWidth", null, "string", "Chart Area Width",null,{tags:["Advanced"]}); // num or string
    Common.prototype.publish("chartAreaHeight", null, "string", "Chart Area Height",null,{tags:["Advanced"]});
    Common.prototype.publish("chartAreaTop", null, "string", "Chart Area Distance From Top",null,{tags:["Advanced"]}); // num or string (google default auto)
    Common.prototype.publish("chartAreaLeft", null, "string", "Chart Area Distance From Left",null,{tags:["Advanced"]});

    //TODO: Remove the legend params ... above shared params????
    Common.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["", "start", "center", "end"],{tags:["Private"]});
    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["", "bottom", "labeled", "left", "right", "top"],{tags:["Private"]});

    //TODO:Do these apply to animating between data sets?
    Common.prototype.publish("animationDuration", 0, "number", "Animation Duration",null,{tags:["Advanced"]});
    Common.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup",null,{tags:["Advanced"]});
    Common.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["linear", "in", "out", "inAndOut"],{tags:["Advanced"]});

    Common.prototype.publish("title", "", "string", "Text To Display Above The Chart",null,{tags:["Private"]});
    Common.prototype.publish("titlePosition", "out", "set", "Position of Title",["in","out","none"],{tags:["Private"]});

    // need to see if this is going to be shared these 3 below
    Common.prototype.publish("backgroundColorStroke", null, "html-color", "Background Border Color",null,{tags:["Advanced","Shared"]});
    Common.prototype.publish("backgroundColorStrokeWidth", 0, "number", "Background Border Width",null,{tags:["Advanced","Shared"]});
    Common.prototype.publish("backgroundColorFill", "transparent", "html-color", "Background Color",null,{tags:["Advanced","Shared"]});

    Common.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = null;
            if (this.data().length) {
                data = [this.columns()].concat(this.data().map(function (row, row_idx) {
                    return row.map(function (cell, idx) {
                        if (idx > 0) {
                            if (isNaN(cell)) {
                                console.log("Invalid Data:  " + cell + " (" + row_idx + ", " + idx + ")");
                            }
                            return parseFloat(cell);
                        }
                        return cell;
                    });
                }));
            } else {
                data = [
                    ["", { role: "annotation" }],
                    ["", ""]
                ];
            }
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Common.prototype.getChartOptions = function () {
        var colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
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
        return this.columns().slice(1).length;
    };

    Common.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");

        this._chart = new google.visualization[this._chartType](domNode);

        var context = this;
        google.visualization.events.addListener(this._chart, "select", function () {
            var selectedItem = context._chart.getSelection()[0];
            if (selectedItem) {
                context._selection = {
                    data: context.rowToObj(context.data()[selectedItem.row]),
                    column: context.columns()[selectedItem.column] || null
                };
            } else {
                context._selection = {data: {}, column: null};
            }
            context.click(context._selection.data, context._selection.column, Object.keys(context._selection.data).length !== 0);
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
    CommonND.prototype.constructor = CommonND;
    CommonND.prototype._class += " google_CommonND";
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(),{tags:["Basic","Shared"]});
    CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    CommonND.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
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
    Area.prototype.constructor = Area;
    Area.prototype._class += " google_Area";

    Area.prototype.publish("stacked", false, "boolean", "Stacks The Elements In A Series",null,{tags:["Advanced","Shared"]});
    Area.prototype.publish("fillOpacity", null, "number", "Opacity of The Fill Color",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]});

    Area.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});

    Area.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]});
    Area.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:["Basic","Shared"]});

    Area.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});
    Area.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});
    Area.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});
    Area.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    Area.prototype.publish("smoothLines", true, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic"]});

    Area.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:["Advanced"]});

    Area.prototype.publish("selectionMode", "single", "set", "Select Multiple Data Points", ["single","multiple"],{tags:["Advanced"]});

    Area.prototype.publish("xAxisBaseline", null, "number", "The Baseline For The Horizontal Axis",null,{tags:["Intermediate"]});
    Area.prototype.publish("yAxisBaseline", null, "number", "The Vaseline For The Verical Axis",null,{tags:["Intermediate"]});

    Area.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:["Advanced"]});
    Area.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});
    Area.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});

    Area.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Area.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Area.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]});
    Area.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]});

    Area.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Area.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Area.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});
    Area.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});

    Area.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]});
    Area.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});
    Area.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});

    Area.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]});
    Area.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]});

    Area.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});
    Area.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Area.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});
    Area.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});

    Area.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Area.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Area.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]});

    //Area.prototype.publish("xAxisAllowContainerBoundaryTextCutoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.",null,{tags:["Advanced"]});

    Area.prototype.publish("xAxisMaxAlternation", 2, "number", "Maximum Number of Levels of Horizontal Axis Text",null,{tags:["Advanced"]});
    Area.prototype.publish("xAxisMaxTextLines", null, "number", "Maximum Number of Lines Allowed For the Text Labels",null,{tags:["Advanced"]});
    Area.prototype.publish("xAxisMinTextSpacing", null, "number", "Minimum Horizontal Spacing, In Pixels, Allowed Between Two Adjacent Text Labels",null,{tags:["Advanced"]});

    Area.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.selectionMode = this.selectionMode();
        retVal.dataOpacity = this.dataOpacity();

        retVal.stacked = this.stacked();
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

        retVal.hAxis.format = this.xAxisFormatType();
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

        retVal.vAxis.format = this.yAxisFormatType();
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
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " google_Bar";

    Bar.prototype.publish("stacked", false, "boolean", "Stacks the elements in a series",null,{tags:["Basic","Shared"]});
    //opacity?
    Bar.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]});
    Bar.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]});

    Bar.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    Bar.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});

    Bar.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]});
    Bar.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]});

    Bar.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:["Basic","Shared"]});
    Bar.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:["Basic","Shared"]});

    Bar.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});
    Bar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});

    Bar.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});
    Bar.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    Bar.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});
    Bar.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});

    Bar.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    Bar.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels",null,{tags:["Advanced"]});
    Bar.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:["Intermediate"]});
    Bar.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:["Advanced"]});

    Bar.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});
    Bar.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Bar.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]});
    Bar.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]});

    Bar.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Bar.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});
    Bar.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});

    Bar.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]});

    Bar.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});
    Bar.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});

    Bar.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]});
    Bar.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]});

    Bar.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Bar.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Bar.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});
    Bar.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});

    Bar.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Bar.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Bar.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Bar.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.dataOpacity = this.dataOpacity();
        retVal.stacked = this.stacked();
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

        retVal.hAxis.format = this.xAxisFormatType();
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

        retVal.vAxis.format = this.yAxisFormatType();
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
    Column.prototype.constructor = Column;
    Column.prototype._class += " google_Column";

    Column.prototype.publish("stacked", false, "boolean", "Stacks the elements in a series",null,{tags:["Advanced","Shared"]});

    Column.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]});
    Column.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]});

    Column.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    Column.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});

    Column.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]});
    Column.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]});

    Column.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:["Basic","Shared"]});
    Column.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:["Basic","Shared"]});

    Column.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});
    Column.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});

    Column.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});
    Column.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    Column.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});
    Column.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});

    Column.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    Column.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels",null,{tags:["Advanced"]});
    Column.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points",null,{tags:["Advanced"]});
    //selectionMode

    Column.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:["Intermediate"]});
    Column.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:["Intermediate"]});

    Column.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:["Advanced"]});

    Column.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});
    Column.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});

    Column.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Column.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:["Intermediate"]});

    Column.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]});
    Column.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]});

    Column.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Column.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Column.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});
    Column.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});

    Column.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]});

    Column.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});
    Column.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});

    Column.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]});
    Column.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]});

    Column.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Column.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Column.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});
    Column.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});

    Column.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Column.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Column.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Column.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.dataOpacity = this.dataOpacity();
        retVal.stacked = this.stacked();
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

        retVal.hAxis.format = this.xAxisFormatType();
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

        retVal.vAxis.format = this.yAxisFormatType();
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
    Common2D.prototype.constructor = Common2D;
    Common2D.prototype._class += " google_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Common2D.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

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
    Line.prototype.constructor = Line;
    Line.prototype._class += " google_Line";

    Line.prototype.publish("lineWidth", 2, "number", "Line Width",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("lineDashStyle", [], "array", "Line Dash Style",null,{tags:["Advanced","Shared"]});

    Line.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]});
    Line.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]});

    Line.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});
    Line.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});

    Line.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});
    Line.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    Line.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});
    Line.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});

    Line.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("orientation", "horizontal", "set", "Line Dash Style", ["horizontal","vertical"],{tags:["Advanced"]});

    Line.prototype.publish("pointSize", [], "array", "Diameter of displayed points in pixels",null,{tags:["Private"]});
    Line.prototype.publish("pointShape", [], "array", "The shape of individual data elements",null,{tags:["Advanced"]}); //TODO: Needs example in description

    Line.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis",null,{tags:["Intermediate"]});
    Line.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis",null,{tags:["Intermediate"]});

    Line.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});
    Line.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});

    Line.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Line.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:["Intermediate"]});

    Line.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]});
    Line.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]});

    Line.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Line.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Line.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});
    Line.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});

    Line.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});
    Line.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});

    Line.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]});
    Line.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]});

    Line.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});
    Line.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});

    Line.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Line.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Line.prototype.publish("xAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels",null,{tags:["Advanced"]});
    Line.prototype.publish("xAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text",null,{tags:["Advanced"]});
    Line.prototype.publish("xAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels",null,{tags:["Advanced"]});

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

        retVal.hAxis.format = this.xAxisFormatType();
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

        retVal.vAxis.format = this.yAxisFormatType();
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
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " google_Pie";

    Pie.prototype.publish("is3D", false, "boolean", "Enable 3D",null,{tags:["Basic","Shared"]});

    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size",null,{min:0,max:0.9,step:0.1,tags:["Intermediate"]});
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle",null,{tags:["Advanced"]});

    Pie.prototype.publish("pieSliceText", "percentage", "set", "The Content of The Text Displayed On The Slice" ,["none","label","value","percentage"],{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontColor", null, "html-color", "Specifies The Slice Text Style (Color)",null,{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontFamily", null, "string", "Specifies The Slice Text Style (Font Name)",null,{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontSize", null, "number", "Specifies The Slice Text Style (Font Size)",null,{tags:["Basic"]});

    Pie.prototype.publish("pieSliceBorderColor", null, "html-color", "The Color of The Slice Borders",null,{tags:["Intermediate"]});
    Pie.prototype.publish("pieResidueSliceColor", null, "html-color", "Color For The Combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]});
    Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]});

    Pie.prototype.publish("sliceVisibilityThreshold", 1/720, "number", "The slice relative part, below which a slice will not show individually.",null,{tags:["Advanced"]});

    Pie.prototype.publish("slicesOffset", [], "array", "Per Slice Offset",null,{tags:["Advanced"]});
    Pie.prototype.publish("slicesTextStyle", [], "array", "Per Slice",null,{tags:["Private"]}); // overrides pieSliceTextStyle
    Pie.prototype.publish("slicesColor", [], "array", "Per Slice Color",null,{tags:["Private"]});

    Pie.prototype.getChartOptions = function () {
        var retVal = Common2D.prototype.getChartOptions.apply(this, arguments);

        retVal.colors = this.data().map(function (row) {
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
            if (typeof(retVal.slices[i])==="undefined") {
               retVal.slices[i] = {};
            }
            retVal.slices[i].color = d;
        });
        this.slicesOffset().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==="undefined") {
               retVal.slices[i] = {};
            }
            retVal.slices[i].offset = d;
        });
        this.slicesTextStyle().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==="undefined") {
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Scatter.js',["d3", "./CommonND", "../common/HTMLWidget"], factory);
    } else {
        root.google_Scatter = factory(root.d3, root.google_CommonND, root.common_HTMLWidget);
    }
}(this, function (d3, CommonND, HTMLWidget) {

    function Scatter() {
        CommonND.call(this);
        this._chartType = "ScatterChart";
    }
    Scatter.prototype = Object.create(CommonND.prototype);
    Scatter.prototype.constructor = Scatter;
    Scatter.prototype._class += " google_Scatter";

    Scatter.prototype.publish("aggregationTarget", "auto", "string", "How multiple data selections are rolled up into tooltips: - Group selected data by x-value; - Group selected data by series; - Group selected data by x-value if all selections have the same x-value, and by series otherwise; - Show only one tooltip per selection.  aggregationTarget will often be used in tandem with selectionMode and tooltip.trigger",null,{tags:["Basic"]});

    Scatter.prototype.publish("curveType", "none", "set", "Controls the curve of the lines when the line width is not zero. Can be one of the following:  - Straight lines without curve;  - The angles of the line will be smoothed..",["none", "function"],{tags:["Basic"]});

    Scatter.prototype.publish("pointShape", "circle", "set", "The shape of individual data elements: \"circle\", \"triangle\", \"square\", \"diamond\", \"star\", or \"polygon\".",["circle", "triangle", "square", "diamond", "star", "polygon"],{tags:["Basic"]});
    Scatter.prototype.publish("pointSize", 7, "number", "Diameter of data points, in pixels. Use zero to hide all points.",null,{tags:["Basic"]});
    Scatter.prototype.publish("pointsVisible", true, "boolean", "Determines whether points will be displayed. Set to false to hide all points.",null,{tags:["Basic"]});

    Scatter.prototype.publish("selectionMode", "single", "set", "When selectionMode is , users may select multiple data points.",["single","multiple"],{tags:["Basic"]});

    Scatter.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00', or an object with the following properties.",null,{tags:["Basic"]});

    Scatter.prototype.publish("dataOpacity", 1.0, "number", "The transparency of data points, with 1.0 being completely opaque and 0.0 fully transparent. This refers to the visible data (i.e. dots).",null,{tags:["Basic"]});

    Scatter.prototype.publish("tooltipIsHtml", true, "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips.",null,{tags:["Advanced"]});
    Scatter.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed:  - The tooltip will be displayed when the user hovers over the element;  - The tooltip will not be displayed.",["none", "focus", "selection"],{tags:["Basic"]});

    Scatter.prototype.publish("crosshairTrigger", "both", "set", "The crosshair color, expressed as either a color name (e.g., ) or an RGB value (e.g., '#adf').",["both", "focus", "selection"],{tags:["Basic"]});
    Scatter.prototype.publish("crosshairColor", null, "html-color", "The crosshair color, expressed as either a color name (e.g., ) or an RGB value (e.g., '#adf').",null,{tags:["Basic"]});
    Scatter.prototype.publish("crosshairOpacity", 0.7, "number", "The crosshair opacity, with 0.0 being fully transparent and 1.0 fully opaque.",null,{tags:["Basic"]});
    Scatter.prototype.publish("crosshairOrientation", null, "set", "The crosshair orientation, which can be  for vertical hairs only,  for horizontal hairs only, or  for traditional crosshairs.",["both", "vertical", "horizontal"],{tags:["Basic"]});

    Scatter.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:["Basic","Shared"]});
    Scatter.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:["Basic","Shared"]});

    Scatter.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    Scatter.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});

    Scatter.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:["Intermediate","Shared"]});
    Scatter.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});
    Scatter.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});
    Scatter.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});
    Scatter.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:["Basic","Shared"]});
    Scatter.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:["Basic","Shared"]});

    Scatter.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});
    Scatter.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:["Intermediate"]});

    Scatter.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Scatter.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:["Intermediate"]});

    Scatter.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:["Basic"]});
    Scatter.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:["Basic"]});

    Scatter.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});
    Scatter.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:["Intermediate"]});

    Scatter.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});
    Scatter.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:["Intermediate"]});

    Scatter.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:["Private"]});
    Scatter.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:["Private"]});

    Scatter.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Scatter.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:["Advanced"]});
    Scatter.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:["Advanced"]});

    Scatter.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.aggregationTarget = this.aggregationTarget();
        retVal.curveType = this.curveType();
        retVal.pointShape = this.pointShape();
        retVal.pointSize = this.pointSize();
        retVal.pointsVisible = this.pointsVisible();
        retVal.selectionMode = this.selectionMode();
        retVal.backgroundColor = this.backgroundColor();
        retVal.dataOpacity = this.dataOpacity();
        retVal.tooltipIsHtml = this.tooltipIsHtml();
        retVal.tooltipTrigger = this.tooltipTrigger();

        retVal.crosshair = {
            color: this.crosshairColor(),
            orientation: this.crosshairOrientation(),
            opacity: this.crosshairOpacity(),
            trigger: this.crosshairTrigger()
        };

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
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
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();
        retVal.hAxis.format = this.xAxisFormatType();
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
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
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
        retVal.vAxis.format = this.yAxisFormatType();
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

    Scatter.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Scatter;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/Timeline.js',["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[timeline]"], factory);
    } else {
        root.google_Timeline = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Timeline() {
        HTMLWidget.call(this);

        this._chartType = "Timeline";
        this._tag = "div";
        this._data_google = [];
        this._selection = {};
    }
    Timeline.prototype = Object.create(HTMLWidget.prototype);
    Timeline.prototype.constructor = Timeline;
    Timeline.prototype._class += " google_Timeline";

    Timeline.prototype.publish("tooltipIsHtml", true, "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips. See Customizing Tooltip Content for more details.",null,{tags:["Advanced"]});
    Timeline.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed: focus - The tooltip will be displayed when the user hovers over the element; none - The tooltip will not be displayed.",["none", "focus"],{tags:["Basic"]});
    Timeline.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00'.",null,{tags:["Basic"]});

    Timeline.prototype.publish("avoidOverlappingGridLines", true, "boolean", "Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineColorByRowLabel", false, "boolean", "If set to true, colors every bar on the row the same. The default is to use one color per bar label.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineGroupByRowLabel", true, "boolean", "If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineShowBarLabels", true, "boolean", "If set to false, omits bar labels. The default is to show them.", null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineShowRowLabels", true, "boolean", "If set to false, omits row labels. The default is to show them.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineSingleColor", null, "html-color", "Colors all bars the same. Specified as a hex value (e.g., '#8d8').",null,{tags:["Basic"]});
    Timeline.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time format of the data.",null,{tags:["Basic"]});

    Timeline.prototype.getChartOptions = function () {
        var retVal = [];

        retVal.avoidOverlappingGridLines = this.avoidOverlappingGridLines();
        retVal.backgroundColor = this.backgroundColor();
        retVal.timelineColorByRowLabel = this.timelineColorByRowLabel();
        retVal.timelineGroupByRowLabel = this.timelineGroupByRowLabel();
        retVal.timelineShowBarLabels = this.timelineShowBarLabels();
        retVal.timelineShowRowLabels = this.timelineShowRowLabels();
        retVal.timelineSingleColor = this.timelineSingleColor();
        retVal.tooltipIsHtml = this.tooltipIsHtml();
        retVal.tooltipTrigger = this.tooltipTrigger();
        retVal.width = this.width();
        retVal.height = this.height();
        retVal.timePattern = this.timePattern();

        return retVal;
    };

    Timeline.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data_google = new google.visualization.DataTable();

            this._data_google.addColumn({ type: "string", id: "Label A" });
            this._data_google.addColumn({ type: "string", id: "Label B" });
            this._data_google.addColumn({ type: "date", id: "start" });
            this._data_google.addColumn({ type: "date", id: "end" });

            var start;
            var end;
            var parseDate = d3.time.format(this.timePattern()).parse;

            _.forEach(function(d) {
                start = parseDate(d[2]);
                end = parseDate(d[3]);
                this._data_google.addRows([ [ d[0], d[1], start, end ] ]);
            }, this);
        }
        return retVal;
    };

    Timeline.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    Timeline.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        this._chart = new google.visualization[this._chartType](domNode);

        var context = this;
        google.visualization.events.addListener(this._chart, "select", function () {
            var selectedItem = context._chart.getSelection()[0];
            context._selection = {
                data: context.rowToObj(context.data()[selectedItem.row] || {}),
                column: context.columns()[selectedItem.column] || null
            };
            
            context.click(context._selection.data, context._selection.column, Object.keys(context._selection).length !== 0);
        });
    };

    Timeline.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    };

    return Timeline;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('google/TreeMap.js',["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[treemap]"], factory);
    } else {
        root.google_TreeMap = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function TreeMap() {
        HTMLWidget.call(this);

        this._chartType = "TreeMapChart";
        this._data_google = [];
        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._selection = {};
    }
    TreeMap.prototype = Object.create(HTMLWidget.prototype);
    TreeMap.prototype.constructor = TreeMap;
    TreeMap.prototype._class += " google_TreeMap";

    TreeMap.prototype.publish("headerColor", null, "html-color", "The color of the header section for each node. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("headerHeight", 0, "number", "The height of the header section for each node, in pixels (can be zero).",null,{tags:["Basic"]});
    TreeMap.prototype.publish("headerHighlightColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00', or an object with the following properties.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("hintOpacity", 0.0, "number", "When maxPostDepth is greater than 1, causing nodes below the current depth to be shown, hintOpacity specifies how transparent it should be. It should be between 0 and 1; the higher the value, the fainter the node.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("maxColor", null, "html-color", "The color for a rectangle with a column 3 value of maxColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("maxDepth", 1, "number", "The maximum number of node levels to show in the current view. Levels will be flattened into the current plane. If your tree has more levels than this, you will have to go up or down to see them. You can additionally see maxPostDepth levels below this as shaded rectangles within these nodes.",null,{tags:["Intermediate"]});
    TreeMap.prototype.publish("maxHighlightColor", null, "html-color", "The highlight color to use for the node with the largest value in column 3. Specify an HTML color value or null; If null, this value will be the value of maxColor lightened by 35%",null,{tags:["Basic"]});
    TreeMap.prototype.publish("maxPostDepth", 0, "number", "How many levels of nodes beyond maxDepth to show in  fashion. Hinted nodes are shown as shaded rectangles within a node that is within the maxDepth limit.",null,{tags:["Advanced"]});
    TreeMap.prototype.publish("maxColorValue", null, "number", "The maximum value allowed in column 3. All values greater than this will be trimmed to this value. If set to null, it will be set to the max value in the column.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("midColor", null, "html-color", "The color for a rectangle with a column 3 value midway between maxColorValue and minColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("midHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value near the median of minColorValue and maxColorValue. Specify an HTML color value or null; if null, this value will be the value of midColor lightened by 35%.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("minColor", null, "html-color", "The color for a rectangle with the column 3 value of minColorValue. Specify an HTML color value.",null,{tags:["Basic"]});
    TreeMap.prototype.publish("minHighlightColor", null, "html-color", "The highlight color to use for the node with a column 3 value nearest to minColorValue. Specify an HTML color value or null; if null, this value will be the value of minColor lightened by 35%",null,{tags:["Basic"]});
    TreeMap.prototype.publish("minColorValue", null, "number", "The minimum value allowed in column 3. All values less than this will be trimmed to this value. If set to null, it will be calculated as the minimum value in the column.",{tags:["Basic"]});

    TreeMap.prototype.publish("noColor", null, "html-color", "The color to use for a rectangle when a node has no value for column 3, and that node is a leaf (or contains only leaves). Specify an HTML color value.",{tags:["Basic"]});
    TreeMap.prototype.publish("noHighlightColor", null, "html-color", "The color to use for a rectangle of  color when highlighted. Specify an HTML color value or null; if null, this will be the value of noColor lightened by 35%.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("showScale", true, "boolean", "Whether or not to show a color gradient scale from minColor to maxColor along the top of the chart. Specify true to show the scale.",null,{tags:["Intermediate"]});

    TreeMap.prototype.publish("showTooltips", true, "boolean", "Whether or not to show tooltips.",null,{tags:["Basic"]});

    TreeMap.prototype.publish("useWeightedAverageForAggregation", true, "boolean", "Whether to use weighted averages for aggregation.",null,{tags:["Basic"]});

    TreeMap.prototype.getChartOptions = function () {
        var retVal = [];

        retVal.headerColor = this.headerColor();
        retVal.headerHeight = this.headerHeight();
        retVal.headerHighlightColor = this.headerHighlightColor();
        retVal.hintOpacity = this.hintOpacity();
        retVal.maxColor = this.maxColor();
        retVal.maxDepth = this.maxDepth();
        retVal.maxHighlightColor = this.maxHighlightColor();
        retVal.maxPostDepth = this.maxPostDepth();
        retVal.maxColorValue = this.maxColorValue();
        retVal.midColor = this.midColor();
        retVal.midHighlightColor = this.midHighlightColor();
        retVal.minColor = this.minColor();
        retVal.minHighlightColor = this.minHighlightColor();
        retVal.minColorValue = this.minColorValue();
        retVal.noColor = this.noColor();
        retVal.noHighlightColor = this.noHighlightColor();
        retVal.showScale = this.showScale();
        retVal.showTooltips = this.showTooltips();
        retVal.useWeightedAverageForAggregation = this.useWeightedAverageForAggregation();
        retVal.width = this.width();
        retVal.height = this.height();

        var context = this;
        retVal.generateTooltip = function(a,b,c) {
            return TreeMap.prototype.defaultlTooltip.apply(context, arguments);
        };

        return retVal;
    };

    TreeMap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        this._chart = new google.visualization.TreeMap(element.node());

        var context = this;
        google.visualization.events.addListener(this._chart, "select", function () {
            var selectedItem = context._chart.getSelection()[0];
            context._selection = {
                data: context.rowToObj(context.data()[selectedItem.row]),
                column: context.columns()[selectedItem.column] || null
            };

            context.click(context._selection.data, context._selection.column, Object.keys(context._selection).length !== 0);
        });
    };

    TreeMap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    };

    TreeMap.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var arr = [this.columns()].concat(this.data());
            this._data_google = new google.visualization.arrayToDataTable(arr);
        }
        return retVal;
    };

    TreeMap.prototype.defaultlTooltip = function(row, size, value) {
        var data =  this._data_google;

        return "<div style='background:#ddd; padding:10px; border-style:solid' >" +
            "Label: " + data.getValue(row, 0) + "<br>" +
            "Parent: " + data.getValue(row, 1) + "<br>" +
            "Column 3 Label: " + data.getColumnLabel(2) + ", Value: " + data.getValue(row, 2) + "<br>" +
            "Column 4 Label: " + data.getColumnLabel(3) + ", Value: " + data.getValue(row, 3) + "<br>" +
            "Datatable row #: " + row + "<br>" +
            data.getColumnLabel(2) +" (total value of this cell and its children): " + size + "<br>" +
            data.getColumnLabel(3) + ": " + value + " </div>";
    };

    TreeMap.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return TreeMap;
}));

