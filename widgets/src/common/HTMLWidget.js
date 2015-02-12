"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Widget", "./Transition", "d3/d3"], factory);
    } else {
        root.HTMLWidget = factory(root.Widget, root.Transition, root.d3);
    }
}(this, function (Widget, Transition, d3) {
    function HTMLWidget() {
        Widget.call(this);
    };
    HTMLWidget.prototype = Object.create(Widget.prototype);

    //  Properties  ---
    HTMLWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _) {
            throw "Target can only be assigned once."
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === 'string' || this._target instanceof String) {
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
                    overflow: "auto"
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
                domNode = domNode.parentNode
            }
        } else if (this._target) {
            var style = window.getComputedStyle(this._target, null);
            if (!this._size.width && !this._size.height) {
                var width = parseInt(style.getPropertyValue("width"));
                var height = parseInt(style.getPropertyValue("height"));
                this.size({
                    width: width,
                    height: height
                });
            }
            this._parentElement = d3.select(this._target);
        } else {
            if (this._overlayElement) {
                this.observer.disconnect();
                this.oldPos = null;
                this._parentElement.remove();
            }
        }
        return this;
    };

    return HTMLWidget;
}));
