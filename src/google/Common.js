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
