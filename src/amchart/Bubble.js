/**
 * @file AmChart Bubble
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonXY", "amcharts.xy", "../api/INDChart", "css!./Bar"], factory);
    } else {
        root.amchart_Bubble = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    /**
     * @class amchart_Bubble
     * @extends amchart_CommonXY
     * @implements api_INDChart
     */
    function Bubble() {
        CommonXY.call(this);

        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof amchart_Bubble
         * @private
         */
        this._tag = "div";
        /**
         * Specifies the widget type of the AmChart Widget/HPCC Widget.
         * @member {string} _type
         * @memberof amchart_Bubble
         * @private
         */
        this._type = "Bubble";
        /**
         * Specifies the graph type of the AmChart Widget.
         * @member {string} _gType
         * @memberof amchart_Bubble
         * @private
         */
        this._gType = "column";
    }
    Bubble.prototype = Object.create(CommonXY.prototype);
    Bubble.prototype.constructor = Bubble;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof amchart_Bubble
     * @private
     */
    Bubble.prototype._class += " amchart_Bubble";
    Bubble.prototype.implements(INDChart.prototype);

    Bubble.prototype.publish("paletteID", "default", "set", "Palette ID", Bubble.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Bubble.prototype.publish("tooltipTemplate","x:[[x]] y:[[y]]", "string", "Tooltip Text");

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @instance
     * @memberof amchart_Bubble
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Bubble.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @private
     * @instance
     * @memberof amchart_Bubble
     * @returns {Object}
     */
    Bubble.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        this.buildGraphs(this._gType);
        return this._chart;
    };

    /**
     * Builds AmChart graph object that becomes a property of the AmChart widget object.
     * @method buildGraphs
     * @private
     * @instance
     * @memberof amchart_Bubble
     * @param {string} gType Value from this._gType.
     */
    Bubble.prototype.buildGraphs = function(gType) {
        if (typeof(this._chart.graphs) === "undefined") { this._chart.graphs = []; }
        var currentGraphCount = this._chart.graphs.length;
        var buildGraphCount = Math.max(currentGraphCount, this._valueField.length);

        for(var i = 0; i < buildGraphCount; i++) {
            if ((typeof(this._valueField) !== "undefined" && typeof(this._valueField[i]) !== "undefined")) { //mark
                var gRetVal = CommonXY.prototype.buildGraphObj.call(this,gType,i);
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
            if (this._type === "Bubble") {
                var fieldArr = ["value"];
                var context = this;
                fieldArr.forEach(function(field){
                    //if(typeof(context["_"+field+"Field"]) !== "undefined" && typeof(context["_"+field+"Field"][i]) !== "undefined"){
                        gObj[field+"Field"] = context["_"+field+"Field"][i]; //for bubble
                    //}
                });
            }
            return gObj;
        }
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_Bubble
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Bubble.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Bubble;
}));