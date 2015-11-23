"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget"], factory);
    } else {
        root.amchart_Axis = factory(root.common_Widget);
    }
}(this, function(Widget) {
    function Axis() {
        Widget.call(this);
    }
    Axis.prototype = Object.create(Widget.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype._class += " amchart_Axis";

    Axis.prototype.publish("type", null, "set", "X/Y Axis Text Font Size",["x","y"],{tags:["Basic","Shared"]}); //just incase we need it

    return Axis;
}));
