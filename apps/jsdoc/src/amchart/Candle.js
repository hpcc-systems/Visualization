/**
 * @file AmChart Candle
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Candle = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    /**
     * @class amchart_Candle
     * @extends amchart_CommonSerial
     * @implements api_INDChart
     */
    function Candle() {
        CommonSerial.call(this);

        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof amchart_Candle
         * @private
         */
        this._tag = "div";
        /**
         * Specifies the graph type of the AmChart Widget.
         * @member {string} _gType
         * @memberof amchart_Candle
         * @private
         */
        this._gType = "candlestick";
    }
    Candle.prototype = Object.create(CommonSerial.prototype);
    Candle.prototype.constructor = Candle;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof amchart_Candle
     * @private
     */
    Candle.prototype._class += " amchart_Candle";
    Candle.prototype.implements(INDChart.prototype);

    Candle.prototype.publish("paletteID", "default", "set", "Palette ID", Candle.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Candle.prototype.publish("isStacked", true, "boolean", "Stack CHart", null, {tags:["Basic","Shared"]});
    Candle.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});

    Candle.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:["Basic"]});

    Candle.prototype.publish("tooltipTemplate","<div style='text-align:left;'><b>[[category]]</b><br/> Open:<b>[[open]]</b> Close:<b>[[close]]</b><br/>Low:<b>[[low]]</b> High:<b>[[high]]</b></div>", "string", "Tooltip Text",null,{tags:["Intermediate"]});

    Candle.prototype.publish("columnWidth", 0.62, "number", "Bar Width",null,{tags:["Basic"]});

    Candle.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:["Basic"]});
    Candle.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines",null,{tags:["Intermediate"]});

    /**
     * Populates Data and Columns with testData.
     * @method testData
     * @memberof amchart_Candle
     * @instance
     * @public
     * @returns {Widget}
     */
    Candle.prototype.testData = function() {
        this.columns(["Subject", "low", "open", "close", "high"]);
        this.data([
            ["Geography", 10, 15, 35, 40],
            ["English", 20, 25, 45, 55],
        ]);
        return this;
    };

    /**
     * Sets the columns for the data being passed into the widget via .data() method.
     * @method columns
     * @memberof amchart_Candle
     * @instance
     * @public
     * @param {String[]} _ An array of strings representing the column names for data passed to widget.
     * @returns {Widget}
     * @example widget
     * .columns(["ID", "Year 1", "Year 2"])
     * .data([ [40, 66, 60], [30, 98, 92]  ])
     * .render();
     */
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

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @instance
     * @memberof amchart_Candle
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Candle.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @memberof amchart_Candle
     * @instance
     * @private
     * @returns {Object}
     */
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

    /**
     * Builds AmChart graph object that becomes a property of the AmChart widget object.
     * @method buildGraphs
     * @private
     * @instance
     * @memberof amchart_Candle
     * @param {string} gType Value from this._gType.
     */
    Candle.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === "undefined") { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._openField) !== "undefined" && typeof(this._openField[i]) !== "undefined")) { //mark
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

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_Candle
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Candle.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Candle;
}));