import { select as d3Select } from "d3-selection";
import { Widget } from "./Widget";

export class HTMLWidget extends Widget {

    private observer;
    protected _drawStartPos;
    protected _boundingBox;

    constructor() {
        super();

        this._drawStartPos = "origin";
        this._tag = "div";
        this._boundingBox = null;
    }

    calcFrameWidth(element) {
        const retVal = parseFloat(element.style("padding-left")) +
            parseFloat(element.style("padding-right")) +
            parseFloat(element.style("margin-left")) +
            parseFloat(element.style("margin-right")) +
            parseFloat(element.style("border-left-width")) +
            parseFloat(element.style("border-right-width"))
            ;
        return retVal;
    }

    calcWidth(element) {
        return parseFloat(element.style("width")) - this.calcFrameWidth(element);
    }

    calcFrameHeight(element) {
        const retVal = parseFloat(element.style("padding-top")) +
            parseFloat(element.style("padding-bottom")) +
            parseFloat(element.style("margin-top")) +
            parseFloat(element.style("margin-bottom")) +
            parseFloat(element.style("border-top-width")) +
            parseFloat(element.style("border-bottom-width"))
            ;
        return retVal;
    }

    calcHeight(element) {
        return parseFloat(element.style("height")) + this.calcFrameHeight(element);
    }

    hasHScroll(element) {
        element = element || this._element;
        return element.property("scrollWidth") > element.property("clientWidth");
    }

    hasVScroll(element) {
        element = element || this._element;
        return element.property("scrollHeight") > element.property("clientHeight");
    }

    clientWidth() {
        return this._size.width - this.calcFrameWidth(this._element);
    }

    clientHeight() {
        return this._size.height - this.calcFrameHeight(this._element);
    }

    getBBox(refresh = false, round = false) {
        if (refresh || this._boundingBox === null) {
            const domNode = this._element.node() ? this._element.node().firstElementChild : null;   //  Needs to be first child, as element has its width/height forced onto it.
            if (domNode instanceof Element) {
                const rect = domNode.getBoundingClientRect();
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
            x: (round ? Math.round(this._boundingBox.x) : this._boundingBox.x) * this._widgetScale,
            y: (round ? Math.round(this._boundingBox.y) : this._boundingBox.y) * this._widgetScale,
            width: (round ? Math.round(this._boundingBox.width) : this._boundingBox.width) * this._widgetScale,
            height: (round ? Math.round(this._boundingBox.height) : this._boundingBox.height) * this._widgetScale
        };
    }

    resize(size?) {
        const retVal = super.resize(size);
        this._placeholderElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
            ;
        return retVal;
    }

    //  Properties  ---
    target(): null | HTMLElement | SVGElement;
    target(_: null | string | HTMLElement | SVGElement): this;
    target(_?: null | string | HTMLElement | SVGElement): null | HTMLElement | SVGElement | this {
        const retVal = super.target.apply(this, arguments);
        if (arguments.length) {
            if (this._target instanceof SVGElement) {
                //  Target is a SVG Node, so create an item in the Overlay and force it "over" the overlay element (cough)  ---
                const overlay = this.locateOverlayNode();
                this._placeholderElement = overlay.append("div")
                    .style("position", "absolute")
                    .style("top", 0)
                    .style("left", 0)
                    .style("overflow", "hidden")
                    ;
                this._overlayElement = d3Select(this._target);

                this._prevPos = null;
                this.observer = new MutationObserver(_mutation => {
                    this.syncOverlay();
                });

                let domNode = this._overlayElement.node();
                while (domNode) {
                    this.observer.observe(domNode, { attributes: true });
                    domNode = domNode.parentNode;
                }
            } else if (this._target) {  //  HTMLElement
                this._placeholderElement = d3Select(this._target);
                if (!this._size.width && !this._size.height) {
                    const width = parseFloat(this._placeholderElement.style("width"));
                    const height = parseFloat(this._placeholderElement.style("height"));
                    this.size({
                        width,
                        height
                    });
                }
                this._placeholderElement = d3Select(this._target).append("div");
            }
        }
        return retVal;
    }

    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        if (this._drawStartPos === "origin") {
            this._element
                .style("position", "relative")
                .style("left", this._pos.x + "px")
                .style("top", this._pos.y + "px")
                ;
        } else {
            const bbox = this.getBBox(true);
            this._element
                .style("position", "relative")
                .style("float", "left")
                .style("left", this._pos.x + (this._size.width - bbox.width) / 2 + "px")
                .style("top", this._pos.y + (this._size.height - bbox.height) / 2 + "px")
                ;
        }
    }

    exit(domNode?, element?) {
        if (this.observer) {
            this.observer.disconnect();
        }
        this._prevPos = null;
        if (this._placeholderElement) {
            this._placeholderElement.remove();
        }
        super.exit(domNode, element);
    }
}
HTMLWidget.prototype._class += " common_HTMLWidget";
