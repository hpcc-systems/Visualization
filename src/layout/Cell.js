"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Surface"], factory);
    } else {
        root.layout_Cell = factory(root.d3, root.layout_Surface);
    }
}(this, function (d3, Surface) {
    function Cell() {
        Surface.call(this);
        this._dragHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
        this._indicateTheseIds = [];
    }
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype.constructor = Cell;
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span",null,{tags:["Private"]});
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span",null,{tags:["Private"]});
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position",null,{tags:["Private"]});
    
    Cell.prototype.publish("indicatorGlowColor", "#EEEE11", "html-color", "Glow color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorBorderColor", "#F48A00", "html-color", "Border color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorOpacity", 0.8, "number", "Opacity of update-indicator",null,{tags:["Basic"]});

    Cell.prototype.indicateTheseIds = function (_) {
        if (!arguments.length) return this._indicateTheseIds;
        this._indicateTheseIds = _;
        return this;
    };

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        var context = this;
        element
            .classed("layout_Surface", true)
            .on("mouseenter", function (d) { context.onMouseEnter(); })
            .on("mouseleave", function (d) { context.onMouseLeave(); })
        ;
    };

    Cell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);

        var dragHandles = element.selectAll("#"+this.id()+" > .dragHandle").data(this._dragHandles, function (d) { return d; });
        dragHandles.enter().append("div")
            .attr("class", function (d) { return "dragHandle dragHandle_" + d; })
            .style({
                padding:"0px",
                margin:"0px",
                position: "absolute"
            })
            .each(function(d){
                switch(d){
                    case "nw":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"0px",
                            top:"0px",
                            "z-index":1000
                        });
                        break;
                    case "ne":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"calc(100% - 6px)",
                            top:"0px",
                            "z-index":1000
                        });
                        break;
                    case "se":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"calc(100% - 6px)",
                            top:"calc(100% - 6px)",
                            "z-index":1000
                        });
                        break;
                    case "sw":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"0px",
                            top:"calc(100% - 6px)",
                            "z-index":1000
                        });
                        break;
                    case "n":
                        d3.select(this).style({
                            width:"100%",
                            height:"6px",
                            left:"0px",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                    case "e":
                        d3.select(this).style({
                            width:"6px",
                            height:"100%",
                            left:"calc(100% - 6px)",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                    case "s":
                        d3.select(this).style({
                            width:"100%",
                            height:"6px",
                            left:"0px",
                            top:"calc(100% - 6px)",
                            "z-index":900
                        });
                        break;
                    case "w":
                        d3.select(this).style({
                            width:"6px",
                            height:"100%",
                            left:"0px",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                }
            })
        ;

        dragHandles.exit().remove();
    };

    Cell.prototype.onMouseEnter = function (widgetArr){
        var arr = this.indicateTheseIds();
        var opacity = this.indicatorOpacity();
        var indicatorBorderColor = this.indicatorBorderColor();
        var indicatorGlowColor = this.indicatorGlowColor();
        for (var i = 0; i < arr.length; i++) {
            var otherElement = d3.select("#" + arr[i]);
            if (otherElement.node()) {
                var rect = otherElement.node().getBoundingClientRect();
                otherElement.append("div")
                    .classed("update-indicator", true)
                    .style({
                        "box-sizing": "border-box",
                        position: "fixed",
                        top: rect.top + "px",
                        left: rect.left + "px",
                        width: rect.width + "px",
                        height: rect.height + "px",
                        opacity: opacity,
                        padding: "0px",
                        "z-index": 1000,
                        "border": "4px solid " + indicatorBorderColor,
                        "-webkit-box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                        "-moz-box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                        "box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                    })
                ;
            }
        }
    };
    Cell.prototype.onMouseLeave = function () {
        var arr = this.indicateTheseIds();
        for (var i = 0; i < arr.length; i++) {
            d3.selectAll("#" + arr[i] + " > div.update-indicator").remove();
        }
    };

    return Cell;
}));