import { event as d3Event, mouse as d3Mouse } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
import { SVGWidget } from "./SVGWidget.ts";
import { safeRaise } from "./Utility.ts";
import { Button, IconBar, Spacer, ToggleButton } from "./TitleBar.ts";

import "../src/SVGZoomWidget.css";

export type MouseMode = "zoom" | "marqueeSelection";

export class SVGZoomWidget extends SVGWidget {

    protected _renderElement;

    private _currZoom;
    protected _zoomScale = 1;
    protected _zoomTranslate = [0, 0];
    protected _zoomRoot;
    protected _zoomGrab;
    protected _zoomG;
    private _prevZoomable;

    protected _marqueeSelectionRoot;
    protected _marqueeSelection;

    protected _autoSelectionMode = false;

    protected _toggleMarqueeSelection = new ToggleButton().faChar("fa-square-o").tooltip("Marquee Selection")
        .on("click", () => {
            if (this._toggleMarqueeSelection.selected()) {
                this.mouseMode("marqueeSelection");
            }
            this.updateIconBar();
        })
        ;

    protected _toggleZoom = new ToggleButton().faChar("fa-mouse-pointer").tooltip("Zoom")
        .on("click", () => {
            if (this._toggleZoom.selected()) {
                this.mouseMode("zoom");
            }
            this.updateIconBar();
        })
        ;

    _iconBar = new IconBar()
        .buttons([
            this._toggleMarqueeSelection,
            this._toggleZoom,
            new Spacer().vline(false),
            new Button().faChar("fa-arrows-alt").tooltip("Zoom to fit")
                .on("click", () => {
                    this.zoomToFit();
                }),
            new Spacer().vline(false),
            new Button().faChar("fa-plus").tooltip("Zoom in")
                .on("click", () => {
                    this.zoomPlus();
                }),
            new Button().faChar("fa-minus").tooltip("Zoom out")
                .on("click", () => {
                    this.zoomMinus();
                })
        ])
        ;

    constructor() {
        super();

        this._currZoom = d3Zoom()
            .scaleExtent([0.05, 20])
            .on("zoom end", (evt) => {
                this.onZoomed();
            })
            ;
    }

    getScreenBBox(target: any) {
        let targetel = target;

        while (targetel.getScreenCTM == null && targetel.parentNode == null) {
            targetel = targetel.parentNode;
        }

        const bbox: any = {};
        const matrix = targetel.getScreenCTM();
        const tbbox = targetel.getBBox();
        const width = tbbox.width;
        const height = tbbox.height;
        const x = tbbox.x;
        const y = tbbox.y;
        const point = this._placeholderElement.node().createSVGPoint();
        point.x = x;
        point.y = y;

        bbox.nw = point.matrixTransform(matrix);
        point.x += width;
        bbox.ne = point.matrixTransform(matrix);
        point.y += height;
        bbox.se = point.matrixTransform(matrix);
        point.x -= width;
        bbox.sw = point.matrixTransform(matrix);
        point.y -= height / 2;
        bbox.w = point.matrixTransform(matrix);
        point.x += width;
        bbox.e = point.matrixTransform(matrix);
        point.x -= width / 2;
        point.y -= height / 2;
        bbox.n = point.matrixTransform(matrix);
        point.y += height;
        bbox.s = point.matrixTransform(matrix);

        return {
            x: bbox.nw.x,
            y: bbox.nw.y,
            width: bbox.se.x - bbox.nw.x,
            height: bbox.se.y - bbox.nw.y
        };
    }

    zoomScale(): number {
        return this._zoomScale;
    }

    zoomTranslate(): number[] {
        return this._zoomTranslate;
    }

    zoomExtent(range): void {
        this._currZoom.scaleExtent(range);
    }

    zoomTo(translate?, scale?, transitionDuration = 250) {
        translate = translate || this._zoomTranslate;
        scale = scale || this._zoomScale;
        transitionDuration = transitionDuration === undefined ? this.zoomDuration() : transitionDuration;

        this._zoomRoot.transition().duration(transitionDuration)
            .call(this._currZoom.transform, d3ZoomIdentity.translate(translate[0], translate[1]).scale(scale))
            ;
    }

    zoomPlus() {
        this._zoomRoot.transition()
            .call(this._currZoom.scaleBy, 1.33)
            ;
    }

    zoomMinus() {
        this._zoomRoot.transition()
            .call(this._currZoom.scaleBy, 1 / 1.33)
            ;
    }

    centerOnBBox(bbox, transitionDuration?) {
        if (bbox.width && bbox.height) {
            const x = bbox.x + bbox.width / 2;
            const y = bbox.y + bbox.height / 2;
            const width = this.width();
            const height = this.height();

            const scale = this.zoomScale();
            const translate = [width / 2 - scale * x, height / 2 - scale * y];
            this.zoomTo(translate, scale, transitionDuration);
        }
    }

    getRenderElementBBox() {
        return this._renderElement.node().getBBox();
    }

    calcZoomToBBox(bbox, widthOnly: boolean = false, scale?: number) {
        const width = this.width();
        const height = this.height();
        if (bbox.width && bbox.height) {
            const x = bbox.x + bbox.width / 2;
            const y = bbox.y + bbox.height / 2;
            const dx = bbox.width;
            const dy = bbox.height;

            let newScale = scale || 1 / (widthOnly ? dx / width : Math.max(dx / width, dy / height));
            if (this.zoomToFitLimit_exists() && newScale > this.zoomToFitLimit()) {
                newScale = this.zoomToFitLimit();
            }
            const translate = [width / 2 - newScale * x, height / 2 - newScale * y];
            return { translate, newScale };
        }
        return { translate: [width / 2, height / 2], newScale: scale };
    }

    zoomToBBox(bbox, transitionDuration?, widthOnly: boolean = false, scale?: number) {
        const { translate, newScale } = this.calcZoomToBBox(bbox, widthOnly, scale);
        this.zoomTo(translate, newScale, transitionDuration);
    }

    zoomToScale(scale, transitionDuration?) {
        if (this._renderElement) {
            const bbox = this.getRenderElementBBox();
            this.zoomToBBox(bbox, transitionDuration, undefined, scale);
        }
    }

    zoomToWidth(transitionDuration?) {
        if (this._renderElement) {
            const bbox = this.getRenderElementBBox();
            this.zoomToBBox(bbox, transitionDuration, true);
        }
    }

    zoomToFit(transitionDuration?) {
        if (this._renderElement) {
            const bbox = this.getRenderElementBBox();
            this.zoomToBBox(bbox, transitionDuration);
        }
    }

    onZoomed() {
        if (d3Event && d3Event.transform && this.mouseMode() === "zoom") {
            this.zoomed(d3Event.transform);
        }
    }

    zoomed(transform) {
        this._zoomScale = transform.k;
        this._zoomTranslate = [transform.x, transform.y];
        this._zoomG.attr("transform", transform);
    }

    updateIconBar() {
        this._toggleMarqueeSelection.selected(this.mouseMode() === "marqueeSelection").render();
        this._toggleZoom.selected(this.mouseMode() === "zoom").render();
    }

    mousedownMarqueeSelection() {
        const p = d3Mouse(this._marqueeSelectionRoot.node());
        this._marqueeSelection = this.element().append("rect")
            .attr("class", "marqueeSelection")
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("x", p[0])
            .attr("y", p[1])
            .attr("width", 0)
            .attr("height", 0)
            ;
        this.startMarqueeSelection();
    }

    mousemoveMarqueeSelection() {
        if (this._marqueeSelection) {
            const p = d3Mouse(this._marqueeSelectionRoot.node());
            const d = {
                x: parseInt(this._marqueeSelection.attr("x"), 10),
                y: parseInt(this._marqueeSelection.attr("y"), 10),
                width: parseInt(this._marqueeSelection.attr("width"), 10),
                height: parseInt(this._marqueeSelection.attr("height"), 10)
            };
            const move = {
                x: p[0] - d.x,
                y: p[1] - d.y
            };

            if (move.x < 1 || (move.x * 2 < d.width)) {
                d.x = p[0];
                d.width -= move.x;
            } else {
                d.width = move.x;
            }

            if (move.y < 1 || (move.y * 2 < d.height)) {
                d.y = p[1];
                d.height -= move.y;
            } else {
                d.height = move.y;
            }

            this._marqueeSelection
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", d.width)
                .attr("height", d.height)
                ;

            this.updateMarqueeSelection({
                x: (d.x - this._zoomTranslate[0]) / this._zoomScale,
                y: (d.y - this._zoomTranslate[1]) / this._zoomScale,
                width: d.width / this._zoomScale,
                height: d.height / this._zoomScale
            });
        }
    }

    mouseupMarqueeSelection() {
        if (this._marqueeSelection) {
            this._marqueeSelection.remove();
            delete this._marqueeSelection;
            if (this._autoSelectionMode) {
                this._autoSelectionMode = false;
                this.mouseMode("zoom");
                this.updateIconBar();
            }
            this.endMarqueeSelection();
        }
    }

    enter(domNode, _element) {
        super.enter(domNode, _element);
        _element.style("user-select", "none");

        this._marqueeSelectionRoot = _element.append("rect")
            .attr("class", "zoomBackground")
            .attr("width", this.width())
            .attr("height", this.height())
            .style("fill", "transparent")
            .style("cursor", "crosshair")
            .on("mousedown", () => {
                this.mousedownMarqueeSelection();
            })
            .on("mousemove", () => {
                this.mousemoveMarqueeSelection();
            })
            .on("mouseup mouseout", () => {
                this.mouseupMarqueeSelection();
            })
            ;

        this._zoomRoot = _element.append("g");

        this._zoomGrab = this._zoomRoot.append("rect")
            .attr("class", "zoomBackground")
            .attr("width", this.width())
            .attr("height", this.height())
            .on("mousedown", () => {
                if (d3Event.shiftKey && this.mouseMode() === "zoom") {
                    d3Event.stopPropagation();
                    this.mouseMode("marqueeSelection");
                    this._autoSelectionMode = true;
                    this.mousedownMarqueeSelection();
                }
            })
            ;
        this._zoomG = this._zoomRoot.append("g");
        this._renderElement = this._zoomG.append("g");

        if (this._prevZoomable !== this.zoomable()) {
            if (this.zoomable()) {
                this._zoomRoot.call(this._currZoom);
            } else {
                this._zoomRoot.on(".zoom", null);
            }
            this._prevZoomable = this.zoomable();
        }

        this._iconBar.target(this._zoomRoot.node());
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._zoomGrab
            .attr("width", this.width())
            .attr("height", this.height())
            ;

        this._marqueeSelectionRoot
            .attr("width", this.width())
            .attr("height", this.height())
            ;

        this._iconBar
            .visible(this.zoomable() && this.showToolbar())
            .render((w: IconBar) => {
                const bbox = w.getBBox();
                w.reposition({ x: this.width() - bbox.width - 4, y: -4 });
            })
            ;
    }

    exit(domNode, element) {
        this._iconBar.target(null);
        super.exit(domNode, element);
    }

    //  Events
    startMarqueeSelection() {
    }

    updateMarqueeSelection(rect: { x: number, y: number, width: number, height: number }) {
    }

    endMarqueeSelection() {
    }
}
SVGZoomWidget.prototype._class += " common_SVGZoomWidget";

export interface SVGZoomWidget {
    showToolbar(): boolean;
    showToolbar(_: boolean): this;
    zoomable(): boolean;
    zoomable(_: boolean): this;
    zoomDuration(): number;
    zoomDuration(_: number): this;
    zoomToFitLimit(): number;
    zoomToFitLimit(_: number): this;
    zoomToFitLimit_exists(): boolean;
    mouseMode(_: MouseMode): this;
    mouseMode(): MouseMode;
}
SVGZoomWidget.prototype.publish("showToolbar", true, "boolean", "Show Toolbar");
SVGZoomWidget.prototype.publish("zoomable", true, "boolean", "Enable/Disable Zooming");
SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");
SVGZoomWidget.prototype.publish("zoomToFitLimit", undefined, "number", "Zoom to fit limit", undefined, { optional: true });
SVGZoomWidget.prototype.publish("mouseMode", "zoom", "set", "Mouse Mode (zoom | marqueeSelection)", ["zoom", "marqueeSelection"]);

const _origMouseMode = SVGZoomWidget.prototype.mouseMode;
SVGZoomWidget.prototype.mouseMode = function (_?, transitionDuration?) {
    const retVal = _origMouseMode.apply(this, arguments);
    if (_ !== undefined) {
        if (_ === "zoom") {
            safeRaise(this._zoomRoot.node());
        } else {
            safeRaise(this._marqueeSelectionRoot.node());
        }
        this.updateIconBar();
    }
    return retVal;
};
