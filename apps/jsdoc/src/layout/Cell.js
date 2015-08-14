"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Surface"], factory);
    } else {
        root.layout_Cell = factory(root.layout_Surface);
    }
}(this, function (Surface) {
    /**
     * @class layout_Cell
     * @extends common_Surface
     */
    function Cell() {
        Surface.call(this);
        this._dragHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
    }
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype.constructor = Cell;
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span",null,{tags:["Private"]});
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span",null,{tags:["Private"]});
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position",null,{tags:["Private"]});

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        element.classed("layout_Surface", true);
    };

    Cell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        var context = this;
        var offsetMultiple;

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
                        case "n":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("nw") !== -1){
                                offsetMultiple++;
                            }
                            return context.handleSize()*offsetMultiple + "px";
                        case "s":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("sw") !== -1){
                                offsetMultiple++;
                            }
                            return context.handleSize()*offsetMultiple + "px";
                    }
                },
                top: function (d) {
                    switch (d) {
                        case "nw":
                        case "n":
                        case "ne":
                            return "0px";
                        case "e":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("ne") !== -1){
                                offsetMultiple++;
                            }
                            return context.handleSize()*offsetMultiple + "px";
                        case "w":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("nw") !== -1){
                                offsetMultiple++;
                            }
                            return context.handleSize()*offsetMultiple + "px";
                        case "sw":
                        case "s":
                        case "se":
                            return context._size.height - context.handleSize() + "px";
                    }
                },
                width: function (d) {
                    switch (d) {
                        case "n":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("ne") !== -1){
                                offsetMultiple++;
                            }
                            if(context._dragHandles.indexOf("nw") !== -1){
                                offsetMultiple++;
                            }
                            return context._size.width - (context.handleSize()*offsetMultiple) + "px";
                        case "s":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("se") !== -1){
                                offsetMultiple++;
                            }
                            if(context._dragHandles.indexOf("sw") !== -1){
                                offsetMultiple++;
                            }
                            return context._size.width - (context.handleSize()*offsetMultiple) + "px";
                        default:
                            return context.handleSize() + "px";
                    }
                },
                height: function (d) {
                    switch (d) {
                        case "w":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("nw") !== -1){
                                offsetMultiple++;
                            }
                            if(context._dragHandles.indexOf("sw") !== -1){
                                offsetMultiple++;
                            }
                            return context._size.height - (context.handleSize()*offsetMultiple) + "px";
                        case "e":
                            offsetMultiple = 0;
                            if(context._dragHandles.indexOf("ne") !== -1){
                                offsetMultiple++;
                            }
                            if(context._dragHandles.indexOf("se") !== -1){
                                offsetMultiple++;
                            }
                            return context._size.height - (context.handleSize()*offsetMultiple) + "px";
                        default:
                            return context.handleSize() + "px";
                    }
                },
            })
        ;
        dragHandles.exit().remove();
    };

    return Cell;
}));
