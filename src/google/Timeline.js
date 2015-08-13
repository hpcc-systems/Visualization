"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[timeline]"], factory);
    } else {
        root.Timeline = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Timeline() {
        HTMLWidget.call(this);

        this._chartType = "Timeline";
        this._tag = "div";
        this._data_google = [];
    }
    Timeline.prototype = Object.create(HTMLWidget.prototype);
    Timeline.prototype.constructor = Timeline;
    Timeline.prototype._class += " google_Timeline";

    Timeline.prototype.publish("tooltipIsHtml", true, "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips. See Customizing Tooltip Content for more details.",null,{tags:["Advanced"]});
    Timeline.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed: - The tooltip will be displayed when the user hovers over the element;  - The tooltip will not be displayed.",["none", "focus"],{tags:["Basic"]});
    Timeline.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example:  or '#00cc00'.",null,{tags:["Basic"]});

    Timeline.prototype.publish("avoidOverlappingGridLines", true, "boolean", "Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineColorByRowLabel", false, "boolean", "If set to true, colors every bar on the row the same. The default is to use one color per bar label.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineGroupByRowLabel", true, "boolean", "If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineShowBarLabels", true, "boolean", "If set to false, omits bar labels. The default is to show them.", null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineShowRowLabels", true, "boolean", "If set to false, omits row labels. The default is to show them.",null,{tags:["Basic"]});
    Timeline.prototype.publish("timelineSingleColor", null, "string", "Colors all bars the same. Specified as a hex value (e.g., '#8d8').",null,{tags:["Basic"]});

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

        return retVal;
    };

    Timeline.prototype.data = function (_) {
        var context = this;
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._data = _;
            this._data_google = new google.visualization.DataTable();

            this._data_google.addColumn({ type: "string", id: "Label A" });
            this._data_google.addColumn({ type: "string", id: "Label B" });
            this._data_google.addColumn({ type: "date", id: "start" });
            this._data_google.addColumn({ type: "date", id: "end" });

            var start;
            var end;
            var parseDate = d3.time.format("%Y-%m-%d").parse;

            _.forEach(function(d) {
                start = parseDate(d[2]);
                end = parseDate(d[3]);
                context._data_google.addRows([ [ d[0], d[1], start, end ] ]);
            });
        }
        return retVal;
    };

    Timeline.prototype.testData = function () {
        this.columns(["Row Label", "Bar Label", "Start", "End"]);
        this.data([
            ["Geography", "", "1789-03-29", "1797-02-03"],
            ["English", "", "1797-02-03", "1801-02-03"],
            ["Math", "", "1801-02-03", "1809-02-03"]
        ]);
        return this;
    };

    Timeline.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        this._chart = new google.visualization[this._chartType](domNode);
    };

    Timeline.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    };

    return Timeline;
}));
