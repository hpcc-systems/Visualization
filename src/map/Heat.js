"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "../other/HeatMap", "../common/Palette", "css!./Heat"], factory);
    } else {
        root.map_Heat = factory(root.d3, root.topojson, root.map_Layer, root.other_HeatMap, root.common_Palette);
    }
}(this, function (d3, topojson, Layer, HeatMap, Palette) {
    function Heat() {
        Layer.call(this);
    }
    Heat.prototype = Object.create(Layer.prototype);
    Heat.prototype.constructor = Heat;
    Heat.prototype._class += " map_Heat";

    Heat.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Heat.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    Heat.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    Heat.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);
        this._parentOverlay.style("pointer-events", "none");
        this._heatTransform = domElement
            .style("pointer-events", "none")
            .append("div")
                .attr("class", this.classID())
                .style("width", base.width() + "px")
                .style("height", base.height() + "px")
        ;
        this.heat = new HeatMap()
            .target(this._heatTransform.node())
        ;
    };

    Heat.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._heatTransform
            .style("opacity", this.opacity())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
        ;
        this.heat.resize(base.size());

        this.heat
            .columns(this.columns())
            .data(this.data().map(function (row) {
                var pos = base.project(row[0], row[1]);
                return [pos[0], pos[1], row[4]];
            }))
            .render()
        ;
    };

    Heat.prototype.layerExit = function (base) {
        delete this._prevProjection;
        this.heat.target(null);
        delete this.heat;
    };

    Heat.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.heat
            .columns(this.columns())
            .data(this.visible() ? this.data().map(function (row) {
                var pos = base.project(row[0], row[1]);
                return [pos[0], pos[1], row[4]];
            }) : [])
            .render()
        ;
    };

    return Heat;
}));