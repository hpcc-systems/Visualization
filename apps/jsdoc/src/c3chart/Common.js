/**
 * @file c3 Chart Common
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "c3", "../common/HTMLWidget", "css!c3"], factory);
    } else {
        root.c3chart_Common = factory(root.d3, root.c3, root.common_HTMLWidget);
    }
}(this, function (d3, c3, HTMLWidget) {
    /**
     * @class c3chart_Common
     * @abstract
     * @extends common_HTMLWidget
     * @noinit
     */
    function Common(target) {
        HTMLWidget.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof c3chart_Common
         * @private
         */
        this._tag = "div";
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Common
         * @private
         */
        this._type = "unknown";
        /**
         * c3 chart config object.
         * @member {Object} _config
         * @memberof c3chart_Common
         * @private
         */
        this._config = {
            axis: {
            },
            legend: {
                position: "bottom",
                show: true
            },
            data: {
                columns: [],
                rows: []
            }
        };
        /**
         * Temporary storage for previous column ids.
         * @member {Array} _prevColumnIDs
         * @memberof c3chart_Common
         * @private
         */
        this._prevColumnIDs = [];
    }
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype.constructor = Common;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Common
     * @private
     */
    Common.prototype._class += " c3chart_Common";

    Common.prototype.publish("showLegend", false, "boolean", "Show/Hide Legend",null,{tags:["Basic","Shared"]});
    Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color",null,{tags:["Intermediate","Shared"]});
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size",null,{tags:["Intermediate","Shared"]});
    Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name",null,{tags:["Private","Shared"]});
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold",null,{tags:["Private","Shared"]});
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic",null,{tags:["Private","Shared"]});

    Common.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Common.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    Common.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["bottom", "right"],{tags:["Intermediate"]});
    Common.prototype.publish("animationDuration", 0, "number", "Animation Duration",null,{tags:["Advanced"]});

    /**
     * Function that registers or returns widget type via this._type.
     * @method type
     * @private
     * @memberof c3chart_Common
     * @instance
     * @param {String} _ Chart type.
     * @returns {Widget|String}
     */
    Common.prototype.type = function (_) {
        if (!arguments.length) return this._type;
        this._type = _;
        return this;
    };

    /**
     *
     * @method getC3Series
     * @private
     * @memberof c3chart_Common
     * @instance
     * @returns {Widget}
     */
    Common.prototype.getC3Series = function() {
        return this._columns.filter(function (d, i) { return i > 0;});
    };

    /**
     *
     * @method getC3Rows
     * @private
     * @memberof c3chart_Common
     * @instance
     * @returns {Widget}
     */
    Common.prototype.getC3Rows = function () {
        var retVal = [this._columns.filter(function (item, idx) { return idx > 0; })].concat(this._data.map(function (row) {
            return row.filter(function (cell, idx) {
                return idx > 0;
            });
        }));
        return retVal;
    };

    /**
     *
     * @method getC3Categories
     * @private
     * @memberof c3chart_Common
     * @instance
     * @returns {Widget}
     */
    Common.prototype.getC3Categories = function () {
        var retVal = this._data.map(function (row, idx) { return row[0]; });
        return retVal;
    };

    /**
     *
     * @method getC3Column
     * @private
     * @memberof c3chart_Common
     * @instance
     * @returns {Widget}
     */
    Common.prototype.getC3Column = function (colNum) {
        var retVal = [this._columns[colNum]].concat(this._data.map(function (row, idx) { return row[colNum]; }));
        return retVal;
    };

    /**
     *
     * @method getC3Columns
     * @private
     * @memberof c3chart_Common
     * @instance
     * @returns {Widget}
     */
    Common.prototype.getC3Columns = function (total) {
        if (!this._data.length) {
            return [];
        }
        total = total || this._columns.length;
        var retVal = [];
        for (var i = 1; i < total; ++i) {
            retVal.push(this.getC3Column(i));
        }
        return retVal;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @memberof c3chart_Common
     * @instance
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Common.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");

        this._config.size = {
            width: this.width(),
            height: this.height()
        };
        this._config.transition = {
            duration: this.animationDuration()
        };
        this._config.data.type = this._type;
        if (this._type !== "gauge") {
            this._config.legend = {
                position: this.legendPosition()
            };
        }
        this._config.bindto = element.append("div").datum(null);
        this.c3Chart = c3.generate(this._config);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Common
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Common.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (this.showLegend()) {
            this.c3Chart.legend.show();
        } else {
            this.c3Chart.legend.hide();
        }

        this.c3Chart.resize({
            width: this.width(),
            height: this.height()
        });

        var options = this.getChartOptions();
        var columnIDs = options.columns.map(function (row) { return row[0]; });
        options.unload = this._prevColumnIDs.filter(function (i) { return columnIDs.indexOf(i) < 0; });
        this.c3Chart.load(options);
        this._prevColumnIDs = columnIDs;

        element.selectAll(".c3 text")
                .style({
                    "stroke": this.fontColor(),
                    "fill": this.fontColor(),
                    "font-size": this.fontSize()+"px",
                    "font-family": this.fontFamily(),
                })
                .attr("font-family",this.fontFamily());

        element.selectAll(".c3 .c3-legend-item text")
                .style({
                    "fill": this.legendFontColor(),
                    "font-size": this.legendFontSize()+"px",
                    "font-family": this.legendFontFamily(),
                    "font-weight": this.legendFontBold() ? "bold" : "normal",
                    "font-style": this.legendFontItalic() ? "italic" : "normal"
                })
                .attr("font-family",this.legendFontFamily());
    };

    /**
     * Returns an empty Object used for storing c3chart options before rendering.
     * @method getChartOptions
     * @memberof c3chart_Common
     * @instance
     * @returns {Object}
     */
    Common.prototype.getChartOptions = function () {
        return {};
    };

    return Common;
}));
