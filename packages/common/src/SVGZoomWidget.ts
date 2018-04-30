import { brush as d3Brush } from "d3-brush";
import { event as d3Event, select as d3Select } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
import { SVGWidget } from "./SVGWidget";
import { Button, IconBar, Spacer } from "./TitleBar";

import "../src/SVGZoomWidget.css";

export class SVGZoomWidget extends SVGWidget {

    protected _renderElement;

    private _currZoom;
    protected _zoomScale = 1;
    protected _zoomTranslate = [0, 0];
    private _zoomGrab;
    private _zoomG;
    private _prevZoomable;

    protected _brush;

    protected _mouseCapture = false;
    protected _mouseDownMode: "zoom" | "selection" = "zoom";
    protected _mouseDownTransform;

    protected _buttonToFit;
    protected _buttonPlus;
    protected _buttonMinus;
    protected _buttonLast;

    protected _iconBar = new IconBar()
        .buttons([
            new Button("fa-arrows-alt", "Zoom to fit")
                .on("click", () => {
                    this.zoomToFit();
                }),
            new Spacer().vline(false),
            new Button("fa-plus", "Zoom in")
                .on("click", () => {
                    this.element().transition()
                        .call(this._currZoom.scaleBy, 1.33)
                        ;
                }),
            new Button("fa-minus", "Zoom out")
                .on("click", () => {
                    this.element().transition()
                        .call(this._currZoom.scaleBy, 1 / 1.33)
                        ;
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

        this.element().transition().duration(transitionDuration)
            .call(this._currZoom.transform, d3ZoomIdentity.translate(translate[0], translate[1]).scale(scale))
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

    zoomToBBox(bbox, transitionDuration?) {
        if (bbox.width && bbox.height) {
            const x = bbox.x + bbox.width / 2;
            const y = bbox.y + bbox.height / 2;
            const dx = bbox.width;
            const dy = bbox.height;
            const width = this.width();
            const height = this.height();

            let scale = 1 / Math.max(dx / width, dy / height);
            if (this.zoomToFitLimit_exists() && scale > this.zoomToFitLimit()) {
                scale = this.zoomToFitLimit();
            }
            const translate = [width / 2 - scale * x, height / 2 - scale * y];
            this.zoomTo(translate, scale, transitionDuration);
        }
    }

    zoomToFit(transitionDuration?) {
        if (this._renderElement) {
            const bbox = this._renderElement.node().getBBox();
            this.zoomToBBox(bbox);
        }
    }

    onZoomed() {
        if (d3Event && d3Event.transform && this._mouseDownMode === "zoom") {
            this._zoomScale = d3Event.transform.k;
            this._zoomTranslate = [d3Event.transform.x, d3Event.transform.y];
            this._zoomG.attr("transform", d3Event.transform);
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._zoomGrab = element.append("rect")
            .attr("class", "zoomBackground")
            .attr("width", this.width())
            .attr("height", this.height())
            ;
        this._zoomG = element.append("g");
        this._renderElement = this._zoomG.append("g");

        this._brush = d3Brush()
            .on("start brush", function () {
            })
            .on("end", () => {
                this._brush.move(element, null);
            })
            ;

        element
            .on("mousein mouseover", () => {
                this._mouseCapture = true;
            })
            .on("mouseout", () => {
                this._mouseCapture = false;
            })
            ;

        d3Select(window)
            .on("keydown", () => {
                if (this._mouseCapture && d3Event.ctrlKey) {
                    this._mouseDownMode = "selection";
                    element.on(".zoom", null);
                    element.select(".overlay")
                        .attr("cursor", "crosshair")
                        ;
                    element.call(this._brush);
                }
            })
            .on("keyup", () => {
                if (this._mouseDownMode === "selection") {
                    this._mouseDownMode = "zoom";
                    this._brush.move(element, null);
                    element.on(".brush", null);
                    element.select(".overlay")
                        .attr("cursor", null)
                        .remove()
                        ;
                    element.select(".selection").remove();
                    element.selectAll(".handle").remove();
                    element.call(this._currZoom);
                }
            })
            ;
        if (this._prevZoomable !== this.zoomable()) {
            if (this.zoomable()) {
                element.call(this._currZoom);
            } else {
                element.on(".zoom", null);
            }
            this._prevZoomable = this.zoomable();
        }

        this._iconBar.target(element.node());
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._zoomGrab
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
        super.exit(domNode, element);
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
}
SVGZoomWidget.prototype.publish("showToolbar", true, "boolean", "Show Toolbar");
SVGZoomWidget.prototype.publish("zoomable", true, "boolean", "Enable/Disable Zooming");
SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");
SVGZoomWidget.prototype.publish("zoomToFitLimit", undefined, "number", "Zoom to fit limit", undefined, { optional: true });
