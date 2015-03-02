"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Line = factory(root.d3, root.Common);
    }
}(this, function (d3, CommonND) {

    function Line() {
        CommonND.call(this);
        this._class = "google_Line";
        this._type = "line";
    };

    Line.prototype = Object.create(CommonND.prototype);

    Line.prototype.enter = function (domNode, element) {
        var context = this;
        CommonND.prototype.enter.apply(this, arguments);
    };

    Line.prototype.update = function (domNode, element) {
        var context = this;      
        CommonND.prototype.update.apply(this, arguments);
    };
    
    return Line;
}));
