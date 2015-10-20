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

        this._type = "line";
    }
    Line.prototype = Object.create(CommonND.prototype);
    Line.prototype.constructor = Line;
    Line.prototype._class += " c3chart_Line";

    Line.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("connectNull", true, "boolean", "Connect null data points in line",null,{tags:["Basic","Shared"]});

    Line.prototype.enter = function (domNode, element) {
        this._config.line = {
            connectNull : this.connectNull()
        };
        CommonND.prototype.enter.apply(this, arguments);
    };


    Line.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        element.selectAll(".c3-line").style({
            "stroke-width": this.lineWidth()+"px",
            "stroke-opacity": this.lineOpacity(),
            "stroke-dasharray": this.lineDashStyle().toString(),
        });
    };

    return Line;
}));
