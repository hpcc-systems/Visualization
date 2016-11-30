"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts-gantt", "../api/INDChart", "require"], factory);
    } else {
        root.amchart_Gantt = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_INDChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, INDChart, require) {
    function Gantt() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._chart = {};
        
        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
    }
    Gantt.prototype = Object.create(HTMLWidget.prototype);
    Gantt.prototype.constructor = Gantt;
    Gantt.prototype._class += " amchart_Gantt";
    Gantt.prototype.implements(INDChart.prototype); // 2d?

    Gantt.prototype.publish("paletteID", "default", "set", "Palette ID", Gantt.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Gantt.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family",null,{tags:["Basic","Shared"]});
    Gantt.prototype.publish("fontSize", 11, "number", "Label Font Size",null,{tags:["Basic","Shared"]});
    Gantt.prototype.publish("fontColor", "#000000", "html-color", "Label Font Color",null,{tags:["Basic","Shared"]});

    Gantt.prototype.publish("depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Gantt.prototype.publish("angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Gantt.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    Gantt.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    Gantt.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern");

    Gantt.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});

    Gantt.prototype.publish("brightnessStep", 0, "number", "Brightness step",null,{tags:["Basic"]});
    Gantt.prototype.publish("columnWidth", 0.5, "number", "column width",null,{tags:["Basic"]});
    Gantt.prototype.publish("minPeriod", "DD", "string", "Value axis minimum period",null,{tags:["Basic"]});

    Gantt.prototype.publish("guides", [], "array", "Vertical lines",null,{tags:["Intermediate"]});

    var timePattern = Gantt.prototype.timePattern;
    Gantt.prototype.timePattern = function (_) {
        var retVal = timePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserData = d3.time.format(_).parse;
        }
        return retVal;
    };

    Gantt.prototype.updateChartOptions = function() {
        var context = this;
        
        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.depth3D = this.depth3D();
        this._chart.angle = this.angle3D();

        if (this._dataUpdated > this._prevDataUpdated || this._prevTimePattern !== this.timePattern()) {
            this._chart.dataProvider = [];
            var data = this.amFormattedData();
            for (var key in data) {
                var obj = {};
                obj.category = key;
                obj.segments = [];
                data[key].forEach(function (range) {
                    var segment = { "start": context._dateParserData(range[0]), "end": context._dateParserData(range[1]) };
                    obj.segments.push(segment);
                });
                this._chart.dataProvider.push(obj); 
            }
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevTimePattern = this.timePattern();
        
        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(i);
        });

        this._chart.columnWidth = this.columnWidth();
        this._chart.colorField = "color";

        this._chart.valueAxes[0].type = "date";
        this._chart.valueAxes[0].minPeriod = this.minPeriod();

        this._chart.brightnessStep = this.brightnessStep() || undefined;

        this._chart.categoryField = "category";
        this._chart.segmentsField = "segments";
        this._chart.startDateField = "start";
        this._chart.endDateField = "end";

        this._chart.guides = this.guides();
    };

    Gantt.prototype.amFormattedData = function() {
        var obj = {};
        this.data().forEach(function (row) {
            if (!obj[row[0]]) {
                obj[row[0]] = [];
            }
            row.forEach(function (data, idx) {
                if (idx === 0) {
                    return;
                }
                obj[row[0]].push(data);
            });
        });
        return obj;
    };

    Gantt.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;

        var initObj = {
            "type": "gantt",
            "theme": "none",
            "autoMargins": true,
            "valueAxis": {},
            "graph": {
                "fillAlphas": 1,
                "balloonText": "<b>[[category]]</b>: [[open]] - [[value]]" // TODO replace with balloon function
            },
            "rotate": true,
            "dataProvider": [],
            "chartScrollbar": {},
            "export": {
                "enabled": true
             }
        };

        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amcharts-images");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);  
         
        this._chart.addListener("clickGraphItem", function(e) {        
            var data  = e.graph.segmentData;
            var field = "color";

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        colIndex: e.target.columnIndex,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex + 1], context._selected !== null);
        });
    };

    Gantt.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    Gantt.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    Gantt.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    Gantt.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return Gantt;
}));

