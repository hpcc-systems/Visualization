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

        this._type = "area";
    }
    Area.prototype = Object.create(CommonND.prototype);
    Area.prototype.constructor = Area;
    Area.prototype._class += " c3chart_Area";

    Area.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color", null, { tags: ["Basic", "Shared"] });

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this.columns().slice(1, this.columns().length)]);
        } else {
            this.c3Chart.groups([]);
        }

        element.selectAll(".c3-line").style({
            "stroke-width": this.lineWidth()+"px",
            "stroke-opacity": this.lineOpacity(),
            "stroke-dasharray": this.lineDashStyle().toString()
        });

        element.selectAll(".c3-area").style({
            "opacity": this.fillOpacity()
        });
    };

    return Area;
}));
