"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Widget", "./Transition"], factory);
    } else {
        root.common_HTMLWidget = factory(root.d3, root.common_Widget, root.common_Transition);
    }
}(this, function (d3, Widget, Transition) {
    function HTMLWidget() {
        Widget.call(this);

        this._drawStartPos = "origin";
        this._tag = "div";
        this._boundingBox = null;
    }
    HTMLWidget.prototype = Object.create(Widget.prototype);
    HTMLWidget.prototype.constructor = HTMLWidget;
    HTMLWidget.prototype._class += " common_HTMLWidget";

    HTMLWidget.prototype.calcFrameWidth = function (element) {
        var retVal = parseFloat(element.style("padding-left")) +
            parseFloat(element.style("padding-right")) +
            parseFloat(element.style("margin-left")) +
            parseFloat(element.style("margin-right")) +
            parseFloat(element.style("border-left-width")) +
            parseFloat(element.style("border-right-width"))
        ;
        return retVal;
    };

    HTMLWidget.prototype.calcWidth = function (element) {
        return parseFloat(element.style("width")) - this.calcFrameWidth(element);
    };

    HTMLWidget.prototype.calcFrameHeight = function (element) {
        var retVal = parseFloat(element.style("padding-top")) +
            parseFloat(element.style("padding-bottom")) +
            parseFloat(element.style("margin-top")) +
            parseFloat(element.style("margin-bottom")) +
            parseFloat(element.style("border-top-width")) +
            parseFloat(element.style("border-bottom-width"))
        ;
        return retVal;
    };

    HTMLWidget.prototype.calcHeight = function (element) {
        return parseFloat(element.style("height")) + this.calcFrameHeight(element);
    };

    HTMLWidget.prototype.hasHScroll = function (element) {
        element = element || this._element;
        return element.property("scrollWidth") > element.property("clientWidth");
    };

    HTMLWidget.prototype.hasVScroll = function (element) {
        element = element || this._element;
        return element.property("scrollHeight") > element.property("clientHeight");
    };

    HTMLWidget.prototype.clientWidth = function () {
        return this._size.width - this.calcFrameWidth(this._element);
    };

    HTMLWidget.prototype.clientHeight = function () {
        return this._size.height - this.calcFrameHeight(this._element);
    };

    HTMLWidget.prototype.getBBox = function (refresh, round) {
        if (refresh || this._boundingBox === null) {
            var domNode = this._element.node() ? this._element.node().firstElementChild : null;   //  Needs to be first child, as element has its width/height forced onto it.
            if (domNode instanceof Element) {
                var rect = domNode.getBoundingClientRect();
                this._boundingBox = {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                };
            }
        }
        if (this._boundingBox === null) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        return {
            x: (round ? Math.round(this._boundingBox.x) : this._boundingBox.x) * this._scale,
            y: (round ? Math.round(this._boundingBox.y) : this._boundingBox.y) * this._scale,
            width: (round ? Math.round(this._boundingBox.width) : this._boundingBox.width) * this._scale,
            height: (round ? Math.round(this._boundingBox.height) : this._boundingBox.height) * this._scale
        };
    };

    HTMLWidget.prototype.resize = function (size) {
        var retVal = Widget.prototype.resize.apply(this, arguments);
        this._parentElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
        ;
        return retVal;
    };

    //  Properties  ---
    HTMLWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _) {
            throw "Target can only be assigned once.";
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === "string" || this._target instanceof String) {
            this._target = document.getElementById(this._target);
        }

        if (this._target instanceof SVGElement) {
            //  Target is a SVG Node, so create an item in the Overlay and force it "over" the overlay element (cough)  ---
            var overlay = this.locateOverlayNode();
            this._parentElement = overlay.append("div")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                })
            ;
            this._overlayElement = d3.select(this._target);

            var context = this;
            this.oldPos = null;
            this.observer = new this.MutationObserver(function (mutation) {
                context.syncOverlay();
            });

            var domNode = this._overlayElement.node();
            while (domNode) {
                this.observer.observe(domNode, { attributes: true });
                domNode = domNode.parentNode;
            }
        } else if (this._target) {
            this._parentElement = d3.select(this._target);
            if (!this._size.width && !this._size.height) {
                var width = parseFloat(this._parentElement.style("width"));
                var height = parseFloat(this._parentElement.style("height"));
                this.size({
                    width: width,
                    height: height
                });
            }
            this._parentElement = d3.select(this._target).append("div");
        } else {
            this.exit();
        }
        return this;
    };

    HTMLWidget.prototype.postUpdate = function (domNode, element) {
        Widget.prototype.postUpdate.apply(this, arguments);
        if (this._drawStartPos === "origin") {
            this._element.style({
                position: "relative",
                left: this._pos.x + "px",
                top: this._pos.y + "px"
            });
        } else {
            var bbox = this.getBBox(true);
            this._element.style({
                position: "relative",
                float: "left",
                left: this._pos.x + (this._size.width - bbox.width) / 2 + "px",
                top: this._pos.y + (this._size.height - bbox.height) / 2 + "px"
            });
        }
    };

    HTMLWidget.prototype.exit = function (domNode, element) {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.oldPos = null;
        if (this._parentElement) {
            this._parentElement.remove();
        }
        Widget.prototype.exit.apply(this, arguments);
    };

    return HTMLWidget;
}));
