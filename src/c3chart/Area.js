"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Area = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Area(target) {
        CommonND.call(this);
        this._class = "c3chart_Area";

        this._type = "area";
    };
    Area.prototype = Object.create(CommonND.prototype);
    
    Area.prototype.publish("isStacked", false, "boolean", "Show SubChart");
    Area.prototype.publish("lineWidth", 1.0, "number", "LineWidth");
    Area.prototype.publish("dashedLine", [], "array", "Dashed Lines");
    Area.prototype.publish("lineOpacity", 1.0, "number", "LineWidth");

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this,arguments);
    }
    
    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this._columns.slice(1,this._columns.length)]);
        } else {
            this.c3Chart.groups([]);
        }
        
        element.selectAll(".c3-line").style({ 
            "stroke-width": this.lineWidth()+"px", 
            "stroke-opacity": this.lineOpacity(), 
            "stroke-dasharray": this.dashedLine().toString(), 
        });
    }
    
    return Area;
}));
