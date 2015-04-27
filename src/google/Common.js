"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_Common = factory(root.d3, root.common_HTMLWidget);
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

    Common.prototype.publish("chartAreaTop", null, "string", "Chart Area Distance From Top"); // num or string (google default auto)
    Common.prototype.publish("chartAreaLeft", null, "string", "Chart Area Distance From Left");
    
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
    Common.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["linear", "in", "out", "inAndOut"]);
    
    Common.prototype.publish("title", "", "string", "Text to display above the chart"); // does not support alignment (TODO make our own title functons)
    Common.prototype.publish("titlePosition", "out", "set", "Position of title",["in","out","none"]);

    Common.prototype.publish("backgroundColorStroke", "#666", "html-color", "Background Border Color");
    Common.prototype.publish("backgroundColorStrokeWidth", 0, "number", "Background Border Width");
    Common.prototype.publish("backgroundColorFill", "#FFFFFF", "html-color", "Background Color");
   
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
        };
        if(this._smoothLines){
            chartOptions.curveType = "function";
        }
        return chartOptions;
    };
    
    Common.prototype.getNumSeries = function() {
        return this._columns.slice(1).length;
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
    };

    return Common;
}));
