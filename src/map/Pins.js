"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./Pins"], factory);
    } else {
        root.map_Pins = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Utility, Palette, CommonUtility) {
    function Pins() {
        Layer.call(this);
    }
    Pins.prototype = Object.create(Layer.prototype);
    Pins.prototype.constructor = Pins;
    Pins.prototype._class += " map_Pins";

    Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Pins.prototype.publish("pinShape", "square", "set", "Shape of pin", ["square","circle"]);
    Pins.prototype.publish("pinColor", "#006ccc", "html-color", "Pin Color", null, { optional: true });
    Pins.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    Pins.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._pinsTransform = svgElement;
        this._selection = new CommonUtility.SimpleSelection(this._pinsTransform);
        this.pinsPaths = d3.select(null);
    };

    Pins.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this.pinsPaths = this._pinsTransform.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.pinsPaths.enter().append("path")
            .attr("class", "data")
            .attr("d", function (d) {
                    if(context.pinShape() === "circle"){
                        return "m-24,-31c0,10.8335 6.8925,20.0592 16.53,23.53l8.47,8.47l8.47,-8.47c9.6375,-3.4708 16.53,-12.6965 16.53,-23.53c0,-13.8073 -11.1927,-25 -25,-25c-13.8073,0 -25,11.1927 -25,25z";
                    }
                return "m-23.53906,-54.02734l0,40c0,3.0458 0.9541,4 4,4l10,0l10,10l10,-10l10,0c3.0459,0 4,-0.9542 4,-4l0,-40c0,-3.0458 -0.9541,-4 -4,-4l-40,0c-3.0459,0 -4,0.9542 -4,4z";
            })
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
        ;
        this.pinsPaths
            .style("fill", function (d) {
                if(d[3] && d[3].fillColor){
                    return d[3].fillColor;
                }
                return d[2] && d[2].fillColor ? d[2].fillColor : context.pinColor();
            })
            .style("stroke", function (d) {
                if(d[3] && d[3].strokeColor){
                    return d[3].strokeColor;
                }
                return d[2] && d[2].strokeColor ? d[2].strokeColor : context.pinColor();
            })
        ;
        this.pinsPaths.exit().remove();
    };

    Pins.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.pinsPaths
            .style("display", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    return "none";
                }
                return null;
            })
            .attr("transform", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    pos = [0, 0];
                }
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + 0.5 /* * base._zoom.scale() */ + ")";
            })
            .attr("stroke-width", 1.5 + "px")
        ;
    };

    //  Events  ---
    Pins.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Pins;
}));