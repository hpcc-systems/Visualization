"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/CanvasWidget", "simpleheat"], factory);
    } else {
        root.other_HeatMap = factory(root.d3, root.common_CanvasWidget, root.simpleheat);
    }
}(this, function (d3, CanvasWidget, simpleheat) {
    function HeatMap() {
        CanvasWidget.call(this);
    }
    HeatMap.prototype = Object.create(CanvasWidget.prototype);
    HeatMap.prototype.constructor = HeatMap;
    HeatMap.prototype._class += " other_HeatMap";
    
    HeatMap.prototype.publish("radius", 25, "number", "Set point radius", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("blur", 15, "number", "Set point blur", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("max", 1, "number", "Set max data value", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("gradient", [], "array", "Set gradient colors", null, { tags: ["Basic"] });

    HeatMap.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        // canvas size needs to be set before render
        this.resize(this._size);
        this._heat = simpleheat(domNode);
    };

    HeatMap.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);
        if (this.data().length === 4) {
            this.data().map(function(a) { return a.splice(0,3); });
        }
        this._heat.data(this.data());

        if(this.radius()){
            this._heat.radius(this.radius(), this.blur());
        }

        this._heat.draw();    
    };

    HeatMap.prototype.exit = function(domNode, element) {
        delete this._heat;
        CanvasWidget.prototype.exit.apply(this, arguments);
    };
 
    return HeatMap;
}));
