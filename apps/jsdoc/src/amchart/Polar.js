/**
 * @file AmChart Polar
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonRadar", "amcharts.radar", "../api/INDChart"], factory);
    } else {
        root.amchart_Polar = factory(root.d3, root.amchart_CommonRadar, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonRadar, AmCharts, INDChart) {
    /**
     * @class amchart_Polar
     * @extends amchart_CommonRadar
     * @implements api_INDChart
     */
    function Polar() {
        CommonRadar.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof amchart_Polar
         * @private
         */
        this._tag = "div";
        /**
         * Specifies the graph type of the AmChart Widget.
         * @member {string} _gType
         * @memberof amchart_Polar
         * @private
         */
        this._gType = "column";
    }
    Polar.prototype = Object.create(CommonRadar.prototype);
    Polar.prototype.constructor = Polar;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof amchart_Polar
     * @private
     */
    Polar.prototype._class += " amchart_Polar";
    Polar.prototype.implements(INDChart.prototype);

    Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Polar.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]", "string", "Tooltip Text",null,{tags:["Intermediate"]});

    /**
     * Populates Data and Columns with testData.
     * @method testData
     * @memberof amchart_Polar
     * @instance
     * @public
     * @returns {Widget}
     */
    Polar.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"]);
        this.data([
            ["English", 5, 43, 41, 92],
            ["English II", 7, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 6, 73, 52, 83],
            ["Geography III", 6, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8],
        ]);
        this.yAxisTitleOffset([20]);
        this.yAxisMinimum([0]);
        this.axisAlpha([0.15]);
        this.yAxisDashLength([3]);
        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof amchart_Polar
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Polar.prototype.enter = function(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    };

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @memberof amchart_Polar
     * @instance
     * @private
     * @returns {Object}
     */
    Polar.prototype.updateChartOptions = function() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    /**
     * Builds AmChart graph object that becomes a property of the AmChart widget object.
     * @method buildGraphs
     * @private
     * @instance
     * @memberof amchart_Polar
     * @param {string} gType Value from this._gType.
     */
    Polar.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === "undefined") { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);
        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== "undefined" && typeof(this._valueField[i]) !== "undefined")) { //mark
                var gRetVal = CommonRadar.prototype.buildGraphObj.call(this,gType,i);
                var gObj = buildGraphObj.call(this,gRetVal,this._valueField[i]);
                if (typeof(this._chart.graphs[i]) !== "undefined") {
                    for (var key in gObj) { this._chart.graphs[i][key] = gObj[key]; }
                } else {
                    this._chart.addGraph(gObj);
                }
            } else {
                this._chart.removeGraph(this._chart.graphs[i]);
            }
        }

        function buildGraphObj(gObj,valueField) {
            gObj.valueField = valueField;
            return gObj;
        }
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_Polar
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Polar.prototype.update = function(domNode, element) {
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Polar;
}));
