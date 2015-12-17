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
    }
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype.constructor = Cell;
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span",null,{tags:["Private"]});
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span",null,{tags:["Private"]});
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position",null,{tags:["Private"]});
    
    Cell.prototype.publish("indicateTheseIds", [], "array", "Array of DOM Ids to display update-indicators over.",null,{tags:["Private"]});
    
    Cell.prototype.publish("indicatorGlowColor", "#EEEE11", "html-color", "Glow color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorBorderColor", "#F48A00", "html-color", "Border color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorOpacity", 0.8, "number", "Opacity of update-indicator",null,{tags:["Basic"]});

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
        var context = this;
        var offsetMultiple;
        var dragHandles = element.selectAll("#"+this.id()+" > .dragHandle").data(this._dragHandles, function (d) { return d; });
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
    };
    Cell.prototype.onMouseLeave = function () {
        var arr = this.indicateTheseIds();
        for (var i = 0; i < arr.length; i++) {
            d3.selectAll("#" + arr[i] + " > div.update-indicator").remove();
        }
    };

    return Cell;
}));