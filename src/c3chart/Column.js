/**
 * @file c3 Chart Column
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Column = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    /**
     * @class c3chart_Column
     * @extends c3chart_CommonND
     */
    function Column(target) {
        CommonND.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Column
         * @private
         */
        this._type = "bar";
    }
    Column.prototype = Object.create(CommonND.prototype);
    Column.prototype.constructor = Column;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Column
     * @private
     */
    Column.prototype._class += " c3chart_Column";

    Column.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @memberof c3chart_Column
     * @instance
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Column
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this._columns.slice(1, this._columns.length)]);
        } else {
            this.c3Chart.groups([]);
        }
    };

    return Column;
}));
