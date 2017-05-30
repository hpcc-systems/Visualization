import { brush as d3Brush } from "d3-brush";
import { event as d3Event, select as d3Select } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
import { Icon } from "./Icon";
import { SVGWidget } from "./SVGWidget";

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

    constructor() {
        super();

        this._currZoom = d3Zoom()
            .scaleExtent([0.05, 20])
            .on("zoom end", (evt) => {
                this.onZoomed();
            })
            ;
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

    zoomTo(translate, scale, transitionDuration = 250) {
        translate = translate || this._zoomTranslate;
        scale = scale || this._zoomScale;
        transitionDuration = transitionDuration === undefined ? this.zoomDuration() : transitionDuration;

        this.element().transition().duration(transitionDuration)
            .call(this._currZoom.transform, d3ZoomIdentity.translate(translate[0], translate[1]).scale(scale))
            ;
    }

    zoomToBBox(bbox, transitionDuration?) {
        if (bbox.width && bbox.height) {
            const x = bbox.x + bbox.width / 2;
            const y = bbox.y + bbox.height / 2;
            const dx = bbox.width;
            const dy = bbox.height;
            const width = this.width();
            const height = this.height();

            const scale = 1 / Math.max(dx / width, dy / height);
            const translate = [width / 2 - scale * x, height / 2 - scale * y];
            this.zoomTo(translate, scale, transitionDuration);
        }
    }

    zoomToFit(transitionDuration?) {
        const bbox = this._renderElement.node().getBBox();
        this.zoomToBBox(bbox);
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
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._zoomGrab
            .attr("width", this.width())
            .attr("height", this.height())
            ;
        const context = this;
        const toolbar = element.selectAll(".toolbar").data((this.zoomable() && this.zoomToolbar()) ? ["dummy"] : []);
        const iconDiameter = 24;
        const faCharHeight = 14;
        toolbar.enter().append("g")
            .attr("class", "toolbar")
            .each(function () {
                context._buttonToFit = new Icon()
                    .target(this)
                    .faChar("\uf0b2")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.zoomToFit();
                    })
                    ;
                context._buttonPlus = new Icon()
                    .target(this)
                    .faChar("\uf067")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.element().transition()
                            .call(context._currZoom.scaleBy, 1.33)
                            ;
                    })
                    ;
                context._buttonMinus = new Icon()
                    .target(this)
                    .faChar("\uf068")
                    .shape("square")
                    .diameter(iconDiameter)
                    .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                    .on("click", function () {
                        context.element().transition()
                            .call(context._currZoom.scaleBy, 1 / 1.33)
                            ;
                    })
                    ;
                context._buttonLast = context._buttonMinus;
            })
            ;
        if (this.zoomable() && this.zoomToolbar()) {
            this._buttonMinus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this.height() - iconDiameter / 2 - 4)
                .render()
                ;
            this._buttonPlus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonMinus.y() - iconDiameter)
                .render()
                ;
            this._buttonToFit
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonPlus.y() - iconDiameter - 4)
                .render()
                ;
        }
        toolbar.exit()
            .each(function () {
                context._buttonToFit
                    .target(null)
                    .render()
                    ;
                delete context._buttonToFit;
            })
            .remove()
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    zoomable: { (): boolean; (_: boolean): SVGZoomWidget; };
    zoomToolbar: { (): boolean; (_: boolean): SVGZoomWidget; };
    zoomDuration: { (): number; (_: number): SVGZoomWidget; };
}
SVGZoomWidget.prototype._class += " common_SVGZoomWidget";

SVGZoomWidget.prototype.publish("zoomable", true, "boolean", "Enable/Disable Zooming");
SVGZoomWidget.prototype.publish("zoomToolbar", true, "boolean", "Show Zoom Toolbar");
SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");
