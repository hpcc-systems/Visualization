/**
 * @file AmChart Line
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "../api/INDChart"], factory);
    } else {
        root.amchart_Line = factory(root.d3, root.amchart_CommonSerial, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, INDChart) {
    /**
     * @class amchart_Line
     * @extends amchart_CommonSerial
     * @implements api_INDChart
     */
    function Line() {
        CommonSerial.call(this);

        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof amchart_Line
         * @private
         */
        this._tag = "div";
        /**
         * Specifies the graph type of the AmChart Widget.
         * @member {string} _gType
         * @memberof amchart_Line
         * @private
         */
        this._gType = "line";
    }
    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.constructor = Line;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof amchart_Line
     * @private
     */
    Line.prototype._class += " amchart_Line";
    Line.prototype.implements(INDChart.prototype);

    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("stepLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic"]});
    Line.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Basic"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @instance
     * @memberof amchart_Line
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Line.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @memberof amchart_Line
     * @instance
     * @private
     * @returns {Object}
     */
    Line.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        // Color Palette
        this._chart.colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    /**
     * Builds AmChart graph object that becomes a property of the AmChart widget object.
     * @method buildGraphs
     * @memberof amchart_Line
     * @instance
     * @private
     * @param {string} gType Value from this._gType.
     */
    Line.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === "undefined") { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== "undefined" && typeof(this._valueField[i]) !== "undefined")) { //mark
                var gRetVal = CommonSerial.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal);

                if (typeof(this._chart.graphs[i]) !== "undefined") {
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
                gObj.type = "step";
            } else if (this.smoothLines()) {
                gObj.type = "smoothedLine";
            } else {
                gObj.type = "line";
            }

            return gObj;
        }
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_Line
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Line.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Line;
}));
