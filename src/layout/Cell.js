"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Surface"], factory);
    } else {
        root.layout_Cell = factory(root.layout_Surface, root.chart_Pie, root.c3_Column, root.c3_Line);
    }
}(this, function (Surface, Pie, Column, Line) {
    function Cell() {
        Surface.call(this);
        //this._dragHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
        this._dragHandles = ["se"];
    };
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position");
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position");
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span");
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span");
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position");

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        element.classed("layout_Surface", true);
    };

    Cell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        var context = this;

        var dragHandles = element.selectAll(".dragHandle").data(this._dragHandles, function (d) { return d; });
        dragHandles.enter().append("div")
            .attr("class", function (d) { return "dragHandle dragHandle_" + d; })
            .style("position", "absolute")
        ;

        dragHandles
            .style({
                padding: "0px",
                margin: "0px",
                left: function (d) {
                    switch (d) {
                        case "ne":
                        case "e":
                        case "se":
                            return context._size.width - context.handleSize() + "px";
                        case "nw":
                        case "w":
                        case "sw":
                            return "0px";
                        default:
                            return context._size.width / 2 - context.handleSize() / 2 + "px";
                    }
                },
                top: function (d) {
                    switch (d) {
                        case "nw":
                        case "n":
                        case "ne":
                            return "0px";
                        case "sw":
                        case "s":
                        case "se":
                            return context._size.height - context.handleSize() + "px";
                        default:
                            return context._size.height / 2 - context.handleSize() / 2 + "px";
                    }
                },
                width: context.handleSize() + "px",
                height: context.handleSize() + "px"
            })
            .on("dragstart", function (d) {
                //d3.event.stopPropagation();
                var element = d3.select(this);
                context._dragHandle = d;
                console.log("dragstart:  " + d);
            })
            .on("dragend", function (targetElement) {
                //d3.event.stopPropagation();
                console.log("dragend:  " + (context._dragHandle ? context._dragHandle : ""));
                context._dragHandle = null;
            })
        ;
        dragHandles.exit().remove();
    };

    return Cell;
}));
