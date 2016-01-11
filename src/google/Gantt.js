"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1.1,packages:[gantt]"], factory);
    } else {
        root.google_Gantt = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Gantt() {
        HTMLWidget.call(this);

        this._chartType = "GanttChart";
        this._tag = "div";
        this._data_google = [];
        this._selection = {};
    }

    Gantt.prototype = Object.create(HTMLWidget.prototype);
    Gantt.prototype.constructor = Gantt;
    Gantt.prototype._class += " google_Gantt";

    Gantt.prototype.publish("backgroundColor", "#ffffff", "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00'.",null,{tags:["Basic"]});

    Gantt.prototype.publish("arrowAngle", 45, "number", "Angle of the head of the arrows connecting tasks.",null,{tags:["Basic"]});
    Gantt.prototype.publish("arrowColor", "#000000", "html-color", "Color of the path arrow.",null,{tags:["Basic"]});
    Gantt.prototype.publish("arrowLength", 8, "number", "Length of the head of the path arrow.",null,{tags:["Basic"]});
    Gantt.prototype.publish("arrowRadius", 15, "number", "The radius for defining the curve of the arrow between two tasks.",null,{tags:["Basic"]});
    Gantt.prototype.publish("arrowSpaceAfter", 4, "number", "The amount of whitespace between the head of an arrow and the task to which it points.",null,{tags:["Basic"]});
    Gantt.prototype.publish("arrowWidth", 1.4, "number", "The width of the arrows.",null,{tags:["Basic"]});
    Gantt.prototype.publish("barCornerRadius", null, "number", "The radius for defining the curve of a bar's corners.",null,{tags:["Basic"]});
    Gantt.prototype.publish("barHeight", null, "number", "The height of the bars for tasks.",null,{tags:["Basic"]});
    Gantt.prototype.publish("criticalPathEnabled", true, "boolean", "If true any arrows on the critical path will be styled differently.",null,{tags:["Basic"]});

    Gantt.prototype.publish("criticalPathColor", "#ff0000", "html-color", "The color of any critical path arrows.",null,{tags:["Basic"]});
    Gantt.prototype.publish("criticalPathStrokeWidth", 2.0, "number", "The color of any critical path arrows.",null,{tags:["Basic"]});
    Gantt.prototype.publish("datePattern", "%Y-%m-%d", "string", "Format for the date columns",null,{tags:["Basic"]});
    Gantt.prototype.publish("defaultStartDate", null, "number", "If the start date cannot be computed from the values in the DataTable, the start date will be set to this. Accepts a date value (new Date(YYYY, M, D)) or a number, which is the number of milliseconds to use.",null,{tags:["Basic"]});
    Gantt.prototype.publish("durationUnit", "day", "set", "Units of the duration, day, hour, minute, second, millisecons",["day", "hour", "minute","second", "millisecond"],{tags:["Basic"]});
    Gantt.prototype.publish("innerGridLineColor", null, "html-color", "The color of the inner horizontal grid lines.",null,{tags:["Basic"]});
    Gantt.prototype.publish("innerGridLineWidth", null, "number", "The width of the inner horizontal grid lines.",null,{tags:["Basic"]});
    Gantt.prototype.publish("trackColor", null, "html-color", "The fill color of the inner grid track.",null,{tags:["Basic"]});
    Gantt.prototype.publish("trackZebraColor", "", "html-color", "The fill color of the alternate, dark inner grid track.",null,{tags:["Basic"]});
    Gantt.prototype.publish("labelMaxWidth", 300, "number", "The maximum amount of space allowed for each task label.",null,{tags:["Basic"]});
    Gantt.prototype.publish("percentEnabled", true, "boolean", "Fills the task bar based on the percentage completed for the task.",null,{tags:["Basic"]});
    Gantt.prototype.publish("percentFillColor", null, "html-color", "The color of the percentage completed portion of a task bar.",null,{tags:["Basic"]});
    Gantt.prototype.publish("shadowEnabled", true, "boolean", "If set to true, draws a shadow under each task bar which has dependencies.",null,{tags:["Basic"]});
    Gantt.prototype.publish("shadowColor", "#000000", "html-color", "Defines the color of the shadows under any task bar which has dependencies.",null,{tags:["Basic"]});
    Gantt.prototype.publish("shadowOffset", 1, "number", "Defines the offset, in pixels, of the shadows under any task bar which has dependencies.",null,{tags:["Basic"]});
    Gantt.prototype.publish("trackHeight", null, "number", "The height of the tracks.",null,{tags:["Basic"]});
    Gantt.prototype.publish("xAxisHeight", 50, "number", "Height of the text area for the x-axis",null,{tags:["Basic"]});

    Gantt.prototype.publish("labelFontSize", null, "number", "Label Font Size",null,{tags:["Basic","Shared"]});
    Gantt.prototype.publish("labelFontFamily", null, "string", " Label Font Name",null,{tags:["Basic","Shared"]});

    Gantt.prototype.getChartOptions = function () {
        var retVal = [];

        retVal.height = this.height();
        retVal.backgroundColor = {fill : this.backgroundColor()};
        retVal.gantt = {
            trackHeight: (this.height() - this.xAxisHeight()) / this.data().length,
            arrow: {
                angle: this.arrowAngle(),
                color: this.arrowColor(),
                length: this.arrowLength(),
                radius: this.arrowRadius(),
                spaceAfter: this.arrowSpaceAfter(),
                width: this.arrowWidth()
            },
            barCornerRadius: this.barCornerRadius(),
            barHeight: this.barHeight(),
            criticalPathEnabled: this.criticalPathEnabled(),
            criticalPathStyle: {
                stroke: this.criticalPathColor(),
                strokeWidth: this.criticalPathStrokeWidth()
            },
            defaultStartDate: this.defaultStartDate(),
            innerGridHorizLine: {
                stroke: this.innerGridLineColor(),
                strokeWidth: this.innerGridLineWidth()
            },
            innerGridTrack: {fill: this.trackColor()},
            innerGridDarkTrack: {fill: this.trackZebraColor()},
            labelMaxWidth: this.labelMaxWidth(),
            labelStyle: {
                fontName: this.labelFontFamily(),
                fontSize: this.labelFontSize(),
            },
            percentEnabled: this.percentEnabled(),
            percentStyle: {fill: this.percentFillColor()},
            shadowEnabled: this.shadowEnabled(),
            shadowColor: this.shadowColor(),
            shadowOffset: this.shadowOffset()
        };

        return retVal;
    };

    Gantt.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data_google = new google.visualization.DataTable();

            this._data_google.addColumn('string', this.columns()[0]);
            this._data_google.addColumn('string', this.columns()[3]);
            this._data_google.addColumn('string', this.columns()[4]);
            this._data_google.addColumn('date', 'Start');
            this._data_google.addColumn('date', 'End');
            this._data_google.addColumn('number', this.columns()[2]);
            this._data_google.addColumn('number', this.columns()[5]);
            this._data_google.addColumn('string', this.columns()[6]);

            var parseDate = d3.time.format(this.datePattern()).parse;
            
            _.forEach(function(d) {
                var label = d[0];
                var start = parseDate(d[1][0]);
                var end = parseDate(d[1][1]);
                var duration = d[2] || (end - start) || null;
                var id = d[3] || d[0];
                var resource = d[4];
                var completeness = d[5];
                var dependency = d[6];

                if (duration) {
                    switch (this.durationUnit()) {
                        case "day":
                            duration *= 24 * 60 * 60 * 1000;
                            break;
                        case "hour":
                            duration *= 60 * 60 * 1000;
                            break;
                        case "minute":
                            duration *= 60 * 1000;
                            break;
                        case "second":
                            duration *= 1000;
                            break;
                        default:
                            break;
                    }
                }
                
                this._data_google.addRows([ [id, label, resource, start, end, duration, completeness, dependency] ]);
            }, this);
        }
        return retVal;
    };

    Gantt.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    Gantt.prototype.enter = function (domNode, element) {
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

    Gantt.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    };

    return Gantt;
}));
