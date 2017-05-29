import { brush as d3Brush } from "d3-brush";
import { event as d3Event, select as d3Select } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
import { Icon } from "./Icon";
import { SVGWidget } from "./SVGWidget";

import "../src/SVGZoomWidget.css";

export class SVGZoomWidget extends SVGWidget {

    protected _renderElement;

    protected _zoom;
    protected _zoomElement;
    protected _zoomGrab;
    protected _zoomG;

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
    }

    zoomTo(translate, scale, transitionDuration?) {
        translate = translate || this._zoom.translate();
        scale = scale || this._zoom.scale();
        transitionDuration = transitionDuration === undefined ? this.zoomDuration() : transitionDuration;

        this._zoomElement.transition().duration(transitionDuration)
            .call(this._zoom.transform, d3ZoomIdentity.translate(translate[0], translate[1]).scale(scale))
            ;
    }

    zoomToFit(transitionDuration?) {
        const bbox = this._renderElement.node().getBBox();
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

    enter(domNode, element) {
        super.enter(domNode, element);
        this._zoomElement = element.append("g");
        this._zoomGrab = this._zoomElement.append("rect")
            .attr("class", "background")
            .attr("width", this.width())
            .attr("height", this.height())
            ;
        this._zoomG = element.append("g");
        this._renderElement = this._zoomG.append("g");

        this._zoom = d3Zoom()
            .scaleExtent([0.05, 20])
            .on("zoom end", () => {
                if (this._mouseDownMode === "zoom") {
                    this._zoomG.attr("transform", d3Event.transform);
                }
            })
            ;

        this._brush = d3Brush()
            .on("start brush", function () {
            })
            .on("end", () => {
                this._brush.move(this._zoomElement, null);
            })
            ;

        this._zoomElement
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
                    this._zoomElement.on(".zoom", null);
                    this._zoomElement.select(".overlay")
                        .attr("cursor", "crosshair")
                        ;
                    this._zoomElement.call(this._brush);
                }
            })
            .on("keyup", () => {
                if (this._mouseDownMode === "selection") {
                    this._mouseDownMode = "zoom";
                    this._brush.move(this._zoomElement, null);
                    this._zoomElement.on(".brush", null);
                    this._zoomElement.select(".overlay")
                        .attr("cursor", null)
                        .remove()
                        ;
                    this._zoomElement.select(".selection").remove();
                    this._zoomElement.selectAll(".handle").remove();
                    this._zoomElement.call(this._zoom);
                }
            })
            ;
        this._zoomElement.call(this._zoom);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._zoomGrab
            .attr("width", this.width())
            .attr("height", this.height())
            ;
        const context = this;
        const toolbar = element.selectAll(".toolbar").data(this.zoomToolbar() ? ["dummy"] : []);
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
                        context._zoomElement.transition()
                            .call(context._zoom.scaleBy, 1.33)
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
                        context._zoomElement.transition()
                            .call(context._zoom.scaleBy, 1 / 1.33)
                            ;
                    })
                    ;
                context._buttonLast = context._buttonMinus;
            })
            ;
        if (this.zoomToolbar()) {
            this._buttonToFit
                .x(this.width() - iconDiameter / 2 - 4)
                .y(iconDiameter / 2 + 4)
                .render()
                ;
            this._buttonPlus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonToFit.y() + 4 + iconDiameter)
                .render()
                ;
            this._buttonMinus
                .x(this.width() - iconDiameter / 2 - 4)
                .y(this._buttonPlus.y() + iconDiameter)
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

    zoomToolbar: { (): boolean; (_: boolean): SVGZoomWidget; };
    zoomDuration: { (): number; (_: number): SVGZoomWidget; };
}
SVGZoomWidget.prototype._class += " common_SVGZoomWidget";

SVGZoomWidget.prototype.publish("zoomToolbar", true, "boolean", "Show Zoom Toolbar");
SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");
