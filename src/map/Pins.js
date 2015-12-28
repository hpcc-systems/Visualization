"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "../common/Text", "css!./Pins"], factory);
    } else {
        root.map_Pins = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility, root.common_Text);
    }
}(this, function (d3, topojson, Layer, Utility, Palette, CommonUtility, Text) {

    function Pins() {
        Layer.call(this);
    }
    Pins.prototype = Object.create(Layer.prototype);
    Pins.prototype.constructor = Pins;
    Pins.prototype._class += " map_Pins";

    Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Pins.prototype.publish("pinShape", "pin", "set", "Shape of pin", ["square","circle","pin"]);
    Pins.prototype.publish("pinColor", "#006ccc", "html-color", "Pin Color", null, { optional: true });
    Pins.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
    Pins.prototype.publish("scale", 0.5, "number", "Pine Scale/Size");
    Pins.prototype.publish("strokeWidth", 1.5, "number", "Pin Stroke Width");

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
        this.pinsPaths.enter().append("g").each(function(d) {

            d3.select(this).style("opacity", d[2] && d[2].opacity ? d[2].opacity : context.opacity()); // might need to rework this from where it was using pinstransform?

            if (!d[2] || d[2].pinShape !== "none") {
                var path = d3.select(this).append("path")
                    .attr("class", "data")
                    .attr("d", function (d) {
                        var pinShape = context.pinShape();
                        if (d[2] && d[2].pinShape) {
                            pinShape = d[2].pinShape;
                        }
                        switch (pinShape) {
                            case "circle":
                                return "m-24,-31c0,10.8335 6.8925,20.0592 16.53,23.53l8.47,8.47l8.47,-8.47c9.6375,-3.4708 16.53,-12.6965 16.53,-23.53c0,-13.8073 -11.1927,-25 -25,-25c-13.8073,0 -25,11.1927 -25,25z";
                            case "square":
                                return "m-23.53906,-54.02734l0,40c0,3.0458 0.9541,4 4,4l10,0l10,10l10,-10l10,0c3.0459,0 4,-0.9542 4,-4l0,-40c0,-3.0458 -0.9541,-4 -4,-4l-40,0c-3.0459,0 -4,0.9542 -4,4z";
                            default:
                                return "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30";
                        }
                    });

                path
                    .call(context._selection.enter.bind(this._selection))
                    .on("click", function (d) {
                        context.click(context.rowToObj(d), "weight", context._selection.selected(this));
                    })
                    .attr("stroke-width", function(d) {
                        if (d[2] && d[2].strokeWidth) {
                            return d[2].strokeWidth + "px";
                        }
                        return context.strokeWidth() + "px";
                    })
                    .style("fill", function (d) {
                        if(d[2] && d[2].fillColor){
                            return d[2].fillColor;
                        }
                        return d[2] && d[2].fillColor ? d[2].fillColor : context.pinColor();
                    })
                    .style("stroke", function (d) {
                        if (d[2] && d[2].strokeColor) {
                            return d[2].strokeColor;
                        }
                        return d[2] && d[2].strokeColor ? d[2].strokeColor : context.pinColor();
                    })
                ;

                //var pathBBox = path.node().getBBox();

                // text
                if (d[2] && d[2].text) {
                    var pinTextOffset = -(d[2].yTextOffset) || 0;
                    var pinTextWidget = new Text()
                        .class("pin-text")
                        .target(this)
                        .width(10)
                        .text(d[2].text)
                        .anchor("middle")
                        .fontFamily(d[2].textFontFamily || "")
                        .fontSize(d[2].textFontSize || "10px")
                        .fontWeight(d[2].textFontWeight || "normal")
                        .colorFill(d[2].textFillColor || "#000000")
                        .render()
                    ;
                    pinTextWidget
                        .y(pinTextOffset)
                        .render()
                    ;
                }
                // icon
                if (d[2] && d[2].icon) {
                    var pinTextIconOffset = -d[2].yIconOffset || 0;
                    var pinTextIconAnchor =  (function() {
                            if (d[2].iconTextAnchor) {
                                return d[2].iconTextAnchor;
                            }
                            return "middle";
                        })();
                    var pinTextIconWidget = new Text()
                        .class("pin-text-icon")
                        .target(this)
                        .text(d[2].icon)
                        .anchor(pinTextIconAnchor)
                        .fontFamily(d[2].iconFontFamily || "")
                        .fontSize(d[2].iconFontSize || "10px")
                        .fontWeight(d[2].iconFontWight || "normal")
                        .colorFill(d[2].iconFillColor || "#000000")
                        .render()
                    ;
                    pinTextIconWidget
                        .y(pinTextIconOffset)
                        .render()
                    ;
                }
            }
            // img
            if (d[2] && d[2].imgPath) {
                d3.select(this).append("svg:image")
                    .attr("class","pin-image")
                    .attr('width', d[2].imgWidth + "px")
                    .attr('height', d[2].imgHeight + "px")
                    .attr("xlink:href", d[2].imgPath)
                    .attr("transform", function(d) {
                        var yOffset, xOffset;
                        if (d[2].iconOffset) {
                            xOffset = d[2].iconOffset[0];
                            yOffset = d[2].iconOffset[1];
                        } else {
                            yOffset = d3.select(this).node().getBBox().height;
                            xOffset = d3.select(this).node().getBBox().width / 2;
                        }
                        return "translate(" + (-xOffset) + "," + (-yOffset) + ")";
                    })
                ;
            }
        });

        this.pinsPaths.exit().remove();
    };

    Pins.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        var context = this;
        this.pinsPaths
            .attr("transform", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    pos = [0, 0];
                }

                var pinScale = context.scale();
                if (d[2] && d[2].pinScale) {
                    pinScale = d[2].pinScale;
                }
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + pinScale + ")";
            })
        ;
    };

    //  Events  ---
    Pins.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Pins;
}));