/**
* @file WidgetArray Class File
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Widget"], factory);
    } else {
        root.common_WidgetArray = factory(root.common_Widget);
    }
}(this, function (Widget) {
    /**
     * @class common_WidgetArray
     * @extends common_Widget
     */
    function WidgetArray() {
        Widget.call(this);
    }
    WidgetArray.prototype = Object.create(Widget.prototype);
    WidgetArray.prototype.constructor = WidgetArray;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_WidgetArray
     * @private
     */
    WidgetArray.prototype._class += " common_WidgetArray";

    WidgetArray.prototype.publish("content", [], "widgetArray", "Widget Array");

    return WidgetArray;
}));
