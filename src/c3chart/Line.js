"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Line = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Line(target) {
        CommonND.call(this);
        this._class = "c3chart_Line";

        this._type = "line";
    };
    Line.prototype = Object.create(CommonND.prototype);

    Line.prototype.publish("lineWidth", 1.0, "number", "LineWidth");
    Line.prototype.publish("dashedLine", [5,5], "array", "Dashed Lines");
    Line.prototype.publish("lineOpacity", 1.0, "number", "LineWidth");

    Line.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this,arguments);
    }
    
    Line.prototype.update = function (domNode, element) {      
        CommonND.prototype.update.apply(this, arguments);
        this.updateStyles.call(this,element);
    }
    
    Line.prototype.updateStyles = function(element) {
        CommonND.prototype.updateStyles.call(this,element);
        this.updateStyle(element,".c3-line","stroke-width",this.lineWidth()+"px");
        this.updateStyle(element,".c3-line","stroke-opacity",this.lineOpacity());
        this.updateStyle(element,".c3-line","stroke-dasharray",this.dashedLine().toString());
    }

    return Line;
}));
