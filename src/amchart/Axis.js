"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/PropertyExt","../common/Class"], factory);
    } else {
        root.amchart_Axis = factory(root.common_PropertyExt, root.common_Class);
    }
}(this, function(PropertyExt, Class) {
    function Axis() {
        Class.call(this);
        PropertyExt.call(this);
    }
    Axis.prototype = Object.create(Class.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype.mixin(PropertyExt);

    Axis.prototype.constructor = Axis;
    Axis.prototype._class += " amchart_Axis";

    Axis.prototype.publish("type", null, "set", "X/Y Axis Text Font Size",["x","y"],{tags:["Basic","Shared"]}); //just incase we need it

    Axis.prototype.id = function (_) {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    };

    Axis.prototype.render = function (callback) {
        this._owningWidget.render(callback);
    };

    return Axis;
}));
