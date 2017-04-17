/**
 * @file c3 Chart Bar
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Column"], factory);
    } else {
        root.c3chart_Bar = factory(root.c3chart_Column);
    }
}(this, function (Column) {
    /**
     * @class c3chart_Bar
     * @extends c3chart_Column
     */
    function Bar(target) {
        Column.call(this);

        this._config.axis.rotated = true;
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " c3chart_Bar";
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Bar
     * @private
     */

    return Bar;
}));
