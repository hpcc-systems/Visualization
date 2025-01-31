import { d3Event, HTMLWidget, zoom as d3Zoom } from "@hpcc-js/common";

export class LiteSVGZoomWidget extends HTMLWidget {

    protected _svgElement: any;
    protected _svgDefs: any;
    protected _zoomElement: any;
    protected _zoom = d3Zoom();
    protected _zoomScale = 1;
    protected _zoomTranslate = [0, 0];

    constructor() {
        super();
        this._tag = "div";
        this._drawStartPos = "origin";
    }

    resize(size?) {
        const retVal = super.resize(size);
        if (this._svgElement) {
            this._svgElement
                .style("width", this._size.width + "px")
                .style("height", this._size.height + "px")
                ;
        }
        return retVal;
    }

    zoomed(transform) {
        this._zoomScale = transform.k;
        this._zoomTranslate = [transform.x, transform.y];
        this._zoomElement.attr("transform", transform);
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        element
            .style("position", "relative")
            ;

        this._svgElement = element.append("svg");
        this._svgDefs = this._svgElement.append("defs");
        this._zoomElement = this._svgElement.append("g");

        this.resize();

        this._zoom.on("zoom", () => this.zoomed(d3Event().transform));
        this._svgElement.call(this._zoom);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

}
LiteSVGZoomWidget.prototype._class += " graph_SVGZoomLiteWidget";
