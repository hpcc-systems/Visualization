/**
 * @file Base HTMLWidget Class
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Widget", "./Transition"], factory);
    } else {
        root.common_HTMLWidget = factory(root.d3, root.common_Widget, root.common_Transition);
    }
}(this, function (d3, Widget, Transition) {
    /**
     * @class common_HTMLWidget
     * @extends common_Widget
     * @abstract
     * @noinit
     */
    function HTMLWidget() {
        Widget.call(this);

        this._drawStartPos = "origin";
    }
    HTMLWidget.prototype = Object.create(Widget.prototype);
    HTMLWidget.prototype.constructor = HTMLWidget;
    HTMLWidget.prototype._class += " common_HTMLWidget";

    /**
     * Returns the border/frame width of an element (d3 selection). width = padding + margin + border.
     * @method calcFrameWidth
     * @memberof common_HTMLWidget
     * @instance
     * @public
     * @param {D3Selection} element d3 selection object of widget.
     */
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

    /**
     * Returns the true width of an element by returning css width - (minus) calcFrameWidth().
     * @method calcWidth
     * @memberof common_HTMLWidget
     * @instance
     * @public
     * @param {D3Selection} element d3 selection object of widget.
     */
    HTMLWidget.prototype.calcWidth = function (element) {
        return parseFloat(element.style("width")) - this.calcFrameWidth(element);
    };

    /**
     * Returns the border/frame height of an element (d3 selection). height = padding + margin + border.
     * @method calcFrameHeight
     * @memberof common_HTMLWidget
     * @instance
     * @public
     * @param {D3Selection} element d3 selection object of widget.
     */
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

    /**
     * Returns the true height of an element by returning css height - (minus) calcFrameHeight().
     * @method calcHeight
     * @memberof common_HTMLWidget
     * @instance
     * @public
     * @param {D3Selection} element d3 selection object of widget.
     */
    HTMLWidget.prototype.calcHeight = function (element) {
        return parseFloat(element.style("height")) + this.calcFrameHeight(element);
    };

    /**
     * Returns the true width of the current widget by returning this._size.width - (minus) calcFrameWidth().
     * @method clientWidth
     * @memberof common_HTMLWidget
     * @instance
     * @public
     */
    HTMLWidget.prototype.clientWidth = function () {
        return this._size.width - this.calcFrameWidth(this._element);
    };

    /**
     * Returns the true height of the current widget by returning this._size.height - (minus) calcFrameHeight().
     * @method clientHeight
     * @memberof common_HTMLWidget
     * @instance
     * @public
     */
    HTMLWidget.prototype.clientHeight = function () {
        return this._size.height - this.calcFrameHeight(this._element);
    };

    HTMLWidget.prototype.getBBox = function (refresh, round) {
        if (refresh || this._boundingBox === null) {
            var domNode = this._element.node();
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

    /**
     * Resizes widget. If no argument is passed, it will resize to the maximum container width and height.
     * @method resize
     * @memberof common_HTMLWidget
     * @instance
     * @param {Object} [size] An object with the properties "width" and "height".
     * @param {Mixed} [size.width] Width in pixels.
     * @param {Mixed} [size.height] Height in pixels.
     * @returns {Widget}
     * @example <caption>Example with specific height and width in pixels.</caption>
     * widget.resize({width:"100",height:"100"}).render();
     * @example <caption>Example resize to maximum container dimensions</caption>
     * widget.resize().render();
     */
    HTMLWidget.prototype.resize = function (size) {
        var retVal = Widget.prototype.resize.apply(this, arguments);
        this._parentElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
        ;
        return retVal;
    };

    /**
     * Sets or returns the target container of the widget.
     * @method target
     * @memberof common_HTMLWidget
     * @param [String|HTMLElement|SVGElement] - String ID or Dom Node of container to render widget in.
     * @instance
     * @public
     * @example widget
     * .target("div-container-id")
     * .render();
     */
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

    HTMLWidget.prototype.postUpdate = function (domeNode, element) {
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

    /**
     * The function that is executed after render. It is used for doing destroying/cleanup.
     * @method exit
     * @memberof common_HTMLWidget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    HTMLWidget.prototype.exit = function (domeNode, element) {
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
