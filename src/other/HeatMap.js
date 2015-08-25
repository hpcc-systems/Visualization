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
 
    HeatMap.prototype.testData = function () {
        this
            .columns(["x", "y","Weight"])
            .data([[340, 280, 0.22532552290509789], [279, 78, 0.17218748760882907], [328, 336, 0.09651770381968094], [44, 263, 0.3316061590758984], [214, 477, 0.34511952287135683], [195, 485, 0.47588339388219036], [374, 396, 0.271679226500542], [360, 148, 0.18736486936235697], [80, 333, 0.8888903185554132], [202, 439, 0.8072545133759657], [347, 326, 0.7121907931949589], [214, 93, 0.8450257030767434], [427, 54, 0.9070942314279923], [338, 375, 0.7678188486462785], [135, 350, 0.748831574602582], [414, 146, 0.17446160174067626], [134, 454, 0.3971279668693425], [76, 166, 0.24240573560820156], [103, 1, 0.9879741685278576], [271, 438, 0.05501944785473689]])
        ;
        return this;
    };

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
