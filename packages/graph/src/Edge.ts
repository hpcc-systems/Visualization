import { Platform, SVGWidget, TextBox } from "@hpcc-js/common";
import { curveBundle as d3CurveBundle, line as d3Line } from "d3-shape";
import { Vertex } from "./Vertex";

import "../src/Edge.css";

export class Edge extends SVGWidget {
    protected _points: any[];
    protected _weight: number;
    protected _strokeDasharray: number[];
    protected _hidden: boolean;
    protected _textBox: TextBox;
    protected _sourceVertex: Vertex;
    protected _targetVertex: Vertex;
    protected _elementPath;
    protected _tooltipElement;
    protected _graphID;

    constructor() {
        super();

        this._points = [];
        this._weight = 100;
        this._strokeDasharray = null;
        this._hidden = false;

        this._textBox = new TextBox()
            .padding(0)
            ;
    }

    graphID(_) {
        if (!arguments.length) return this._graphID;
        this._graphID = _;
        return this;
    }

    sourceVertex(): Vertex;
    sourceVertex(_: Vertex): Edge;
    sourceVertex(_?: Vertex): Vertex | Edge {
        if (!arguments.length) return this._sourceVertex;
        this._sourceVertex = _;
        return this;
    }

    targetVertex(): Vertex;
    targetVertex(_: Vertex): Edge;
    targetVertex(_?: Vertex): Vertex | Edge {
        if (!arguments.length) return this._targetVertex;
        this._targetVertex = _;
        return this;
    }

    weight(): number;
    weight(_: number): Edge;
    weight(_?: number): number | Edge {
        if (!arguments.length) return this._weight;
        this._weight = _;
        return this;
    }

    points(_, transitionDuration, skipPushMarkers) {
        if (!arguments.length) return this._points;
        this._points = _;
        if (this._elementPath) {
            this.update(null, this._element, transitionDuration, skipPushMarkers);
        }
        return this;
    }

    hidden(_) {
        if (!arguments.length) return this._hidden;
        this._hidden = _;
        return this;
    }

    text(): string;
    text(_: string): Edge;
    text(_?: string): string | Edge {
        if (!arguments.length) return this._textBox.text();
        this._textBox.text(_);
        return this;
    }

    enter(domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._elementPath = element.append("path");
        this._tooltipElement = this._elementPath.append("title");

        if (this._textBox.text()) {
            this._textBox
                .target(domNode)
                .tooltip(this.tooltip())
                .render()
                ;
        }
    }

    update(_domNode, element, transitionDuration?, skipPushMarkers?) {
        SVGWidget.prototype.update.apply(this, arguments);
        const context = this;
        if (Platform.svgMarkerGlitch && !skipPushMarkers) {
            element.transition().duration((transitionDuration ? transitionDuration : 0) + 100)
                .each("start", function () {
                    context._pushMarkers(element);
                })
                .each("end", function () {
                    context._popMarkers(element);
                })
                ;
        }
        const points = context._calculateEdgePoints(this._sourceVertex, this._targetVertex, this._points);
        const line = d3Line()
            .x(function (d: any) { return d.x; })
            .y(function (d: any) { return d.y; })
            .curve(d3CurveBundle)
            // .tension(0.75)
            (points)
            ;
        let pathElements = this._elementPath;
        if (transitionDuration) {
            pathElements = pathElements.transition().duration(transitionDuration);
        }
        pathElements
            .attr("opacity", this._hidden ? 0 : 1)
            .attr("marker-start", !(Platform.svgMarkerGlitch && skipPushMarkers) && this.sourceMarker_exists() ? "url(#" + this._graphID + "_" + this.sourceMarker() + "Foot)" : null)
            .attr("marker-end", !(Platform.svgMarkerGlitch && skipPushMarkers) && this.targetMarker_exists() ? "url(#" + this._graphID + "_" + this.targetMarker() + "Head)" : null)
            .attr("stroke", this.strokeColor_exists() ? this.strokeColor() : null)
            .attr("stroke-dasharray", this.strokeDasharray_exists() ? this.strokeDasharray() : null)
            .attr("d", line)
            ;
        this._tooltipElement.text(this.tooltip());

        if (this._textBox.text()) {
            this._textBox
                .tooltip(this.tooltip())
                .move(this._findMidPoint(points), transitionDuration)
                ;
        }
    }

    _findMidPoint(points) {
        const midIdx = points.length / 2;
        if (points.length % 2) {
            return points[Math.floor(midIdx)];
        } else if (points.length) {
            const p0 = points[midIdx - 1];
            const p1 = points[midIdx];
            return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        }
        return { x: 0, y: 0 };
    }

    _calculateEdgePoints(source, target, _points) {
        if (!source || !target) {
            return [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        }
        let points = _points ? _points.slice() : [];
        const p0 = points.length === 0 ? target.pos() : points[0];
        const p1 = points.length === 0 ? source.pos() : points[points.length - 1];

        points.unshift(source.intersection(source._pos, p0));
        points.push(target.intersection(target._pos, p1));
        if (!points[0]) {
            points[0] = source._pos;
        }
        if (!points[points.length - 1]) {
            points[points.length - 1] = target._pos;
        }

        if (points.length === 2 && points[0] && points[1]) {
            const dx = points[0].x - points[1].x;
            const dy = points[0].y - points[1].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist) {
                if (this.showArc()) {
                    const midX = (points[0].x + points[1].x) / 2 - dy * this.arcDepth() / 100;
                    const midY = (points[0].y + points[1].y) / 2 + dx * this.arcDepth() / 100;
                    points = [{ x: points[0].x, y: points[0].y }, { x: midX, y: midY }, { x: points[1].x, y: points[1].y }];
                } else {
                    points = [{ x: points[0].x, y: points[0].y }, { x: points[1].x, y: points[1].y }];
                }
            }
        }
        return points;
    }

    arcDepth: { (): number; (_: number): Edge; };
    showArc: { (): boolean; (_: boolean): Edge; };
    tooltip: { (): string; (_: string): Edge; };

    sourceMarker: { (): string; (_: string): Edge; };
    sourceMarker_exists: () => boolean;
    targetMarker: { (): string; (_: string): Edge; };
    targetMarker_exists: () => boolean;
    strokeDasharray: { (): string; (_: string): Edge; };
    strokeDasharray_exists: () => boolean;
    strokeColor: { (): string; (_: string): Edge; };
    strokeColor_exists: () => boolean;
}
Edge.prototype._class += " graph_Edge";

Edge.prototype.publish("arcDepth", 16, "number", "Arc Depth", null, { tags: ["Basic"] });
Edge.prototype.publish("showArc", true, "boolean", "Show/Hide Arc", null, { tags: ["Basic"] });
Edge.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

Edge.prototype.publish("sourceMarker", "circle", "set", "Source Marker", ["none", "circle"], { optional: true });
Edge.prototype.publish("targetMarker", "arrow", "set", "Source Marker", ["none", "arrow", "circle"], { optional: true });
Edge.prototype.publish("strokeDasharray", null, "string", "Stroke Dash Array", null, { optional: true });
Edge.prototype.publish("strokeColor", null, "html-color", "Stroke Color", null, { optional: true });
