"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.Common = factory(root.d3, root.HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Common(tget) {
        HTMLWidget.call(this);
        this._class = "google_Common";

        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._data_google = [];

        this._chart = null;
    };
    Common.prototype = Object.create(HTMLWidget.prototype);

    Common.prototype.publish("chartAreaWidth", "80%", "string", "Chart Area Width"); // num or string
    Common.prototype.publish("chartAreaHeight", "80%", "string", "Chart Area Height");

    Common.prototype.publish("chartAreaTop", "auto", "string", "Chart Area Distance From Top"); // num or string
    Common.prototype.publish("chartAreaLeft", "auto", "string", "Chart Area Distance From Left");
    
    Common.prototype.publish("fontSize", null, "number", "Font Size");
    Common.prototype.publish("fontName", null, "string", "Font Name");
    Common.prototype.publish("fontColor", null, "html-color", "Font Color");

    Common.prototype.publish("legendShow", true, "boolean", "Show Legend");
    Common.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["", "start", "center", "end"]);
    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["", "bottom", "labeled", "left", "right", "top"]);
    Common.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Common.prototype.publish("legendFontName", null, "string", "Legend Font Name");
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size");
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold");
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic");

    Common.prototype.publish("animationDuration", 0, "number", "Animation Duration");
    Common.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup");
    Common.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["", "linear", "in", "out", "inAndOut"]);
    
    Common.prototype.publish("title", "", "string", "Text to display above the chart"); // does not support alignment (TODO make our own title functons)
    Common.prototype.publish("titlePosition", null, "number", "Legend Font Size");

    Common.prototype.publish("backgroundColorStroke", "#666", "html-color", "Background Border Color");
    Common.prototype.publish("backgroundColorStrokeWidth", 0, "number", "Background Border Width");
    Common.prototype.publish("backgroundColorFill", "#FFFFFF", "html-color", "Background Color");
    
    Common.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points");
    Common.prototype.publish("selectionMode", "single", "set", "Select Multiple Data Points", ["single","multiple"]);
    
    
    // hAxis ???
    // vAxis ???
    
    // trendlines ??
    // tooltip ??
    // annotations ??
    
    Common.prototype.publish("hAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Common.prototype.publish("hAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Common.prototype.publish("hAxisDirection", 1, "number", "The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.");
    Common.prototype.publish("hAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Common.prototype.publish("hAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");
    Common.prototype.publish("hAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Common.prototype.publish("hAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Common.prototype.publish("hAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    Common.prototype.publish("hAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Common.prototype.publish("hAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Common.prototype.publish("hAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Common.prototype.publish("hAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    

    Common.prototype.publish("vAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Common.prototype.publish("vAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Common.prototype.publish("vAxisDirection", 1, "number", "The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.");
    Common.prototype.publish("vAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Common.prototype.publish("vAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Common.prototype.publish("vAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Common.prototype.publish("vAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Common.prototype.publish("vAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    Common.prototype.publish("vAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Common.prototype.publish("vAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Common.prototype.publish("vAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Common.prototype.publish("vAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");
    
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

        return {
            backgroundColor: {
                stroke: this._backgroundColorStroke,
                strokeWidth: this._backgroundColorStrokeWidth,
                fill: this._backgroundColorFill,
            },
            width: this.width(),
            height: this.height(),
            colors: colors,
            fontSize: this._fontSize,
            fontName: this._fontName,
            fontColor: this._fontColor,
            title: this._title,
            titlePosition: this._titlePosition,
            dataOpacity: this._dataOpacity,
            selectionMode: this._selectionMode,
            
            // not sure if these apply globally or just for area
            
            chartArea: {
                width: this._chartAreaWidth,
                height: this._chartAreaHeight,
                left: this._chartAreaLeft,
                top: this._chartAreaTop
            },
            animation: {
                duration: this._animationDuration,
                startup: this._animationOnStartup,
                easing: this._animationEasing
            },
            legend: {
                alignment: this._legendAlignment,
                position: this._legendShow ? this._legendPosition : "none",
                maxLines: 2,
                textStyle: {
                    color: this._legendFontColor,
                    fontName: this._legendFontName,
                    fontSize: this._legendFontSize,
                    bold: this._legendFontBold,
                    italic: this._legendFontItalic
                }
            },
            hAxis: {
                baseline: this._hAxisBaseline,
                baselineColor: this._hAxisBaselineColor,
                direction: this._hAxisDirection,
                gridlines: {
                    count: this._hAxisGridlinesCount,
                    color: this._hAxisGridlinesColor
                },
                minorGridlines: {
                    count: this._hAxisMinorGridlinesCount,
                    color: this._hAxisMinorGridlinesColor
                },
                logScale: this._hAxisLogScale,
                textPosition: this._hAxisTextPosition,
                title: this._hAxisTitle,
                minValue: this._hAxisMinValue,
                maxValue: this._hAxisMaxValue
                
                
            },
            vAxis: {
                baseline: this._vAxisBaseline,
                baselineColor: this._vAxisBaselineColor,
                direction: this._vAxisDirection,
                gridlines: {
                    count: this._vAxisGridlinesCount,
                    color: this._vAxisGridlinesColor
                },
                minorGridlines: {
                    count: this._vAxisMinorGridlinesCount,
                    color: this._vAxisMinorGridlinesColor
                },
                logScale: this._vAxisLogScale,
                textPosition: this._vAxisTextPosition,
                title: this._vAxisTitle,
                minValue: this._vAxisMinValue,
                maxValue: this._vAxisMaxValue                
            },
            series: initSeries(this.getNumSeries()),
            //series: [
                
            //],
            axes: {
                // todo
            }
            
        };
    };
    
    Common.prototype.getNumSeries = function() {
        return this._columns.slice(1).length;
    }

    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({}); // init
        }
        return series;
    }    

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
    }

    Common.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        console.log('chartOptions:');
        console.log(this.getChartOptions());
        
        this._chart.draw(this._data_google, this.getChartOptions());
    };
    
    return Common;
}));
