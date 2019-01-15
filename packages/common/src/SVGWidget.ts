import { rgb as d3Rgb } from "d3-color";
import { select as d3Select } from "d3-selection";
import { svgMarkerGlitch } from "./Platform";
import { Transition } from "./Transition";
import { debounce, downloadBlob2 } from "./Utility";
import { ISize, Widget } from "./Widget";

const lerp = function (point, that, t) {
    //  From https://github.com/thelonious/js-intersections
    return {
        x: point.x + (that.x - point.x) * t,
        y: point.y + (that.y - point.y) * t
    };
};

const intersectLineLine = function (a1, a2, b1, b2) {
    //  From https://github.com/thelonious/js-intersections
    const result = { type: "", points: [] };
    const uaT = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    const ubT = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    const uB = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (uB !== 0) {
        const ua = uaT / uB;
        const ub = ubT / uB;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result.type = "Intersection";
            result.points.push({
                x: a1.x + ua * (a2.x - a1.x),
                y: a1.y + ua * (a2.y - a1.y)
            });
        } else {
            result.type = "No Intersection";
        }
    } else {
        if (uaT === 0 || ubT === 0) {
            result.type = "Coincident";
        } else {
            result.type = "Parallel";
        }
    }

    return result;
};

const intersectCircleLine = function (c, r, a1, a2) {
    //  From https://github.com/thelonious/js-intersections
    const result = { type: "", points: [] };
    const a = (a2.x - a1.x) * (a2.x - a1.x) +
        (a2.y - a1.y) * (a2.y - a1.y);
    const b = 2 * ((a2.x - a1.x) * (a1.x - c.x) +
        (a2.y - a1.y) * (a1.y - c.y));
    const cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y -
        2 * (c.x * a1.x + c.y * a1.y) - r * r;
    const deter = b * b - 4 * a * cc;

    if (deter < 0) {
        result.type = "Outside";
    } else if (deter === 0) {
        result.type = "Tangent";
        // NOTE: should calculate this point
    } else {
        const e = Math.sqrt(deter);
        const u1 = (-b + e) / (2 * a);
        const u2 = (-b - e) / (2 * a);

        if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
            if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                result.type = "Outside";
            } else {
                result.type = "Inside";
            }
        } else {
            result.type = "Intersection";

            if (0 <= u1 && u1 <= 1)
                result.points.push(lerp(a1, a2, u1));

            if (0 <= u2 && u2 <= 1)
                result.points.push(lerp(a1, a2, u2));
        }
    }

    return result;
};

export class SVGGlowFilter {
    protected filter;
    protected feOffset;
    protected feColorMatrix;
    protected feGaussianBlur;
    protected feBlend;

    constructor(target, id: string) {
        this.filter = target.append("filter")
            .attr("id", id)
            .attr("width", "130%")
            .attr("height", "130%");
        this.feOffset = this.filter.append("feOffset")
            .attr("result", "offOut")
            .attr("in", "SourceGraphic")
            .attr("dx", "0")
            .attr("dy", "0");
        this.feColorMatrix = this.filter.append("feColorMatrix")
            .attr("result", "matrixOut")
            .attr("in", "offOut")
            .attr("type", "matrix")
            ;
        this.feGaussianBlur = this.filter.append("feGaussianBlur")
            .attr("result", "blurOut")
            .attr("in", "matrixOut")
            .attr("stdDeviation", "3")
            ;
        this.feBlend = this.filter.append("feBlend")
            .attr("in", "SourceGraphic")
            .attr("in2", "blurOut")
            .attr("mode", "normal")
            ;
    }

    rgb2ColorMatrix(color: string): string {
        const rgb = d3Rgb(color);
        return [
            rgb.r / 255, 0, 0, 0, rgb.r ? 1 : 0,
            0, rgb.g / 255, 0, 0, rgb.g ? 1 : 0,
            0, 0, rgb.b / 255, 0, rgb.b ? 1 : 0,
            0, 0, 0, 1, 0
        ].join(" ");
    }

    update(color: string) {
        this.feColorMatrix.attr("values", this.rgb2ColorMatrix(color));
    }
}

export class SVGWidget extends Widget {
    static _class = "common_SVGWidget";

    _tag;

    protected _boundingBox;
    protected transition;
    protected _drawStartPos: "center" | "origin";
    protected _svgSelectionFilter;
    protected _parentRelativeDiv;
    protected _parentOverlay;

    constructor() {
        super();

        this._tag = "g";

        this._boundingBox = null;

        this.transition = new Transition(this);

        this._drawStartPos = "center";
    }

    //  Properties  ---
    move(_, transitionDuration?) {
        const retVal = this.pos(_);
        if (arguments.length) {
            (transitionDuration ? this._element.transition().duration(transitionDuration) : this._element)
                .attr("transform", `translate(${_.x} ${_.y})scale(${this._widgetScale})`)
                ;
        }
        return retVal;
    }

    _enableOverflow = false;
    enableOverflow(): boolean;
    enableOverflow(_: boolean): this;
    enableOverflow(_?: boolean): boolean | this {
        if (!arguments.length) return this._enableOverflow;
        this._enableOverflow = _;
        return this;
    }

    size(): ISize;
    size(_): this;
    size(_?): ISize | this {
        const retVal = super.size.apply(this, arguments);
        if (arguments.length) {
            this._boundingBox = null;
        }
        return retVal;
    }

    resize(_size?: { width: number, height: number }) {
        const retVal = super.resize.apply(this, arguments);
        if (this._parentRelativeDiv) {
            this._parentRelativeDiv
                .style("width", this._size.width + "px")
                .style("height", this._size.height + "px")
                ;
            switch (this._drawStartPos) {
                case "origin":
                    this.pos({
                        x: 0,
                        y: 0
                    });
                    break;
                case "center":
                /* falls through */
                default:
                    this.pos({
                        x: this._size.width / 2,
                        y: this._size.height / 2
                    });
                    break;
            }
        }
        if (!isNaN(this._size.width)) this._placeholderElement.attr("width", this._size.width);
        if (!isNaN(this._size.height)) this._placeholderElement.attr("height", this._size.height);
        return retVal;
    }
    //  Glow Highlighting  ---
    svgGlowID(): string {
        return `sel${this.id()}_glow`;
    }

    target(): null | HTMLElement | SVGElement;
    target(_: null | string | HTMLElement | SVGElement): this;
    target(_?: null | string | HTMLElement | SVGElement): null | HTMLElement | SVGElement | this {
        const retVal = super.target.apply(this, arguments);
        if (arguments.length) {
            if (this._target instanceof SVGElement) {
                this._isRootNode = false;
                this._placeholderElement = d3Select(this._target);
                this._parentWidget = this._placeholderElement.datum();
                if (!this._parentWidget || this._parentWidget._id === this._id) {
                    this._parentWidget = this.locateParentWidget(this._target.parentNode);
                }
                this._parentOverlay = this.locateOverlayNode();
                const svg = this.locateSVGNode(this._target);
                const svgDefs = d3Select(svg).select<SVGDefsElement>("defs");
                this._svgSelectionFilter = new SVGGlowFilter(svgDefs, this.svgGlowID());
            } else if (this._target) {
                //  Target is a DOM Node, so create a SVG Element  ---
                this._parentRelativeDiv = d3Select(this._target).append("div")
                    .style("position", "relative")
                    ;
                this._placeholderElement = this._parentRelativeDiv.append("svg")
                    .style("position", "absolute")
                    .style("top", 0)
                    .style("left", 0)
                    ;
                const svgDefs = this._placeholderElement.append("defs");
                this._svgSelectionFilter = new SVGGlowFilter(svgDefs, this.svgGlowID());
                this._parentOverlay = this._parentRelativeDiv.append("div")
                    .style("position", "absolute")
                    .style("top", 0)
                    .style("left", 0)
                    ;
                if (this._size.width && this._size.height) {
                    this.resize(this._size);
                } else {
                    this.resize({ width: 0, height: 0 });
                }
            }
        }
        return retVal;
    }

    parentOverlay() {
        return this._parentOverlay;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        if (this._svgSelectionFilter) {
            this._svgSelectionFilter.update(this.selectionGlowColor());
        }
    }

    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        let transX;
        let transY;
        if (this._drawStartPos === "origin" && this._target instanceof SVGElement) {
            transX = (this._pos.x - this._size.width / 2);
            transY = (this._pos.y - this._size.height / 2);
            this._element.attr("transform", "translate(" + transX + "," + transY + ")scale(" + this._widgetScale + ")");
        } else {
            transX = this._pos.x;
            transY = this._pos.y;
            if (this._enableOverflow) {
                //  Individual Widgets will need to size and position themselves corrrectly (and have calculated a BBox) ---
                if ((transX < 0 || transY < 0) && this._boundingBox) {
                    transX = transX < 0 ? 0 : transX;
                    transY = transY < 0 ? 0 : transY;
                    this._parentRelativeDiv.style("overflow", "scroll");
                    this._placeholderElement.attr("width", this._boundingBox.width);
                    this._placeholderElement.attr("height", this._boundingBox.height);
                } else {
                    this._parentRelativeDiv.style("overflow", null);
                }
            }
            this._element.attr("transform", "translate(" + transX + "," + transY + ")scale(" + this._widgetScale + ")");
        }
    }

    exit(domNode?, element?) {
        if (this._parentRelativeDiv) {
            this._parentOverlay.remove();
            this._placeholderElement.remove();
            this._parentRelativeDiv.remove();
        }
        super.exit(domNode, element);
    }

    getOffsetPos() {
        let retVal = { x: 0, y: 0 };
        if (this._parentWidget) {
            retVal = this._parentWidget.getOffsetPos();
            retVal.x += this._pos.x;
            retVal.y += this._pos.y;
            return retVal;
        }
        return retVal;
    }

    getBBox(refresh = false, round = false) {
        if (refresh || this._boundingBox === null) {
            const svgNode: SVGElement = this._element.node();
            if (svgNode instanceof SVGElement) {
                this._boundingBox = (svgNode as any).getBBox();
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

    //  Intersections  ---
    contains(point): boolean {
        return this.containsRect(point);
    }

    containsRect(point): boolean {
        const size = this.getBBox();
        return point.x >= size.x && point.x <= size.x + size.width && point.y >= size.y && point.y <= size.y + size.height;
    }

    containsCircle(radius, point) {
        const center = this.getOffsetPos();
        return this.distance(center, point) <= radius;
    }

    intersection(pointA, pointB) {
        return this.intersectRect(pointA, pointB);
    }

    intersectRect(pointA, pointB) {
        const center = this.getOffsetPos();
        const size = this.getBBox();
        if (pointA.x === pointB.x && pointA.y === pointB.y) {
            return pointA;
        }
        const TL = { x: center.x - size.width / 2, y: center.y - size.height / 2 };
        const TR = { x: center.x + size.width / 2, y: center.y - size.height / 2 };
        const BR = { x: center.x + size.width / 2, y: center.y + size.height / 2 };
        const BL = { x: center.x - size.width / 2, y: center.y + size.height / 2 };
        let intersection = intersectLineLine(TL, TR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(TR, BR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BR, BL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BL, TL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    }

    intersectCircle(radius, pointA, pointB) {
        const center = this.getOffsetPos();
        const intersection = intersectCircleLine(center, radius, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    }

    distance(pointA, pointB) {
        return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
    }

    //  Download  ---
    private serializeSVG(svg?: Element): Blob {
        svg = svg || this.locateSVGNode(this._element.node());
        (Array as any).from(svg.querySelectorAll("*")).forEach(elm => {
            const styles = window.getComputedStyle(elm);
            elm.style.font = styles.getPropertyValue("font");
            elm.style.fill = styles.getPropertyValue("fill");
            elm.style.stroke = styles.getPropertyValue("stroke");
            elm.style.strokeWidth = styles.getPropertyValue("stroke-width");
            elm.style.strokeDasharray = styles.getPropertyValue("stroke-dasharray");
            elm.style.shapeRendering = styles.getPropertyValue("shape-rendering");
            elm.style.opacity = styles.getPropertyValue("opacity");
        });
        const xmlns = "http://www.w3.org/2000/xmlns/";
        const xlinkns = "http://www.w3.org/1999/xlink";
        const svgns = "http://www.w3.org/2000/svg";
        const fragment = window.location.href + "#";
        const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT, null, false);
        while (walker.nextNode()) {
            for (const attr of (walker.currentNode as any).attributes) {
                if (attr.value.includes(fragment)) {
                    attr.value = attr.value.replace(fragment, "#");
                }
            }
        }
        svg.setAttributeNS(xmlns, "xmlns", svgns);
        svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
        const serializer = new XMLSerializer();
        const string = serializer.serializeToString(svg);
        return new Blob([string], { type: "image/svg+xml" });
    }

    private rasterize(): Promise<Blob> {
        const svg = this.locateSVGNode(this._element.node());
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onerror = reject;
            image.onload = () => {
                const rect = svg.getBoundingClientRect();
                const canvas = document.createElement("canvas");
                canvas.width = rect.width;
                canvas.height = rect.height;
                canvas.style.width = rect.width + "px";
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, rect.width, rect.height);
                ctx.fillStyle = "transparent";
                ctx.drawImage(image, 0, 0, rect.width, rect.height);
                ctx.canvas.toBlob(resolve);
            };
            image.src = URL.createObjectURL(this.serializeSVG(svg));
        });
    }

    downloadSVG() {
        downloadBlob2(this.serializeSVG());
    }

    downloadPNG() {
        this.rasterize().then(downloadBlob2);
    }

    //  IE Fixers  ---
    _pushMarkers(element?) {
        if (svgMarkerGlitch) {
            element = element || this._element;
            element.selectAll("path[marker-start],path[marker-end]")
                .attr("fixme-start", function () { return this.getAttribute("marker-start"); })
                .attr("fixme-end", function () { return this.getAttribute("marker-end"); })
                .attr("marker-start", null)
                .attr("marker-end", null)
                ;
        }
    }

    _popMarkers(element?) {
        if (svgMarkerGlitch) {
            element = element || this._element;
            element.selectAll("path[fixme-start],path[fixme-end]")
                .attr("marker-start", function () {
                    return this.getAttribute("fixme-start");
                })
                .attr("marker-end", function () { return this.getAttribute("fixme-end"); })
                .attr("fixme-start", null)
                .attr("fixme-end", null)
                ;
        }
    }

    _popMarkersDebounced = debounce(function (element) {
        if (svgMarkerGlitch) {
            this._popMarkers(element);
        }
    }, 250);

    _fixIEMarkers(element?) {
        if (svgMarkerGlitch) {
            this._pushMarkers(element);
            this._popMarkersDebounced(element);
        }
    }
}
SVGWidget.prototype._class += " common_SVGWidget";

export interface SVGWidget {
    selectionGlowColor(): string;
    selectionGlowColor(_: string): this;
}

SVGWidget.prototype.publish("selectionGlowColor", "red", "html-color", "Selection Glow Color");
