﻿import { d3Event, drag as d3Drag, Palette, select as d3Select, Selection, Spacer, SVGGlowFilter, SVGZoomWidget, ToggleButton, Utility, Widget } from "@hpcc-js/common";
import { FunctionComponent, IconEx, Icons, render, Subgraph, Vertex } from "@hpcc-js/react";
import { Graph2 as GraphCollection } from "@hpcc-js/util";
import { curveBasis as d3CurveBasis, curveCardinal as d3CurveCardinal, Line, line as d3Line } from "d3-shape";
import "d3-transition";
import { Circle, Dagre, ForceDirected, ForceDirectedAnimated, Graphviz, ILayout, Null } from "./layouts/index";
import { EdgePlaceholder, IGraphData2, SubgraphPlaceholder, VertexPlaceholder } from "./layouts/placeholders";

import "../../src/graph2/graph.css";

type GraphLayoutType = "Hierarchy" | "DOT" | "ForceDirected" | "ForceDirected2" | "Neato" | "FDP" | "Circle" | "TwoPI" | "Circo" | "None";
const GraphLayoutTypeSet = ["Hierarchy", "DOT", "ForceDirected", "ForceDirected2", "Neato", "FDP", "Circle", "TwoPI", "Circo", "None"];

type Point = [number, number];

const lineBasis = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveBasis)
    ;

const lineCardinal = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveCardinal)
    ;

function calcArc(points: Point[], curveDepth: number): [Point[], Line<Point>] {
    if (points.length === 2 && curveDepth) {
        const dx = points[0][0] - points[1][0];
        const dy = points[0][1] - points[1][1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist) {
            const midX = (points[0][0] + points[1][0]) / 2 - dy * curveDepth / 100;
            const midY = (points[0][1] + points[1][1]) / 2 + dx * curveDepth / 100;
            return [[points[0], [midX, midY], points[1]], lineCardinal];
        }
    }
    return [points, lineBasis];
}

function center(points: Point[]): Point {
    if (points.length % 2 === 1) {
        return points[Math.floor(points.length / 2)];
    }
    const p1 = points[points.length / 2 - 1];
    const p2 = points[points.length / 2];
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

function safeRaise(domNode: Element) {
    const target = domNode;
    let nextSibling = target.nextSibling;
    while (nextSibling) {
        target.parentNode.insertBefore(nextSibling, target);
        nextSibling = target.nextSibling;
    }
}

export class Graph2 extends SVGZoomWidget {

    private _toggleHierarchy = new ToggleButton().faChar("fa-sitemap").tooltip("Hierarchy").on("click", () => this.layoutClick("Hierarchy"));
    private _toggleDot = new ToggleButton().faChar("fa-angle-double-down").tooltip("DOT").on("click", () => this.layoutClick("DOT"));
    private _toggleForceDirected = new ToggleButton().faChar("fa-expand").tooltip("Force Directed").on("click", () => this.layoutClick("ForceDirected"));
    private _toggleNeato = new ToggleButton().faChar("fa-sun-o").tooltip("Neato").on("click", () => this.layoutClick("Neato"));
    private _toggleFDP = new ToggleButton().faChar("fa-asterisk").tooltip("FDP").on("click", () => this.layoutClick("FDP"));
    private _toggleForceDirected2 = new ToggleButton().faChar("fa-arrows").tooltip("Spring").on("click", () => this.layoutClick("ForceDirected2"));
    private _toggleCircle = new ToggleButton().faChar("fa-circle-o").tooltip("Circle").on("click", () => this.layoutClick("Circle"));
    private _toggleTwoPI = new ToggleButton().faChar("fa-bullseye").tooltip("TwoPI").on("click", () => this.layoutClick("TwoPI"));
    private _toggleCirco = new ToggleButton().faChar("fa-cogs").tooltip("Circo").on("click", () => this.layoutClick("Circo"));

    protected _graphData = new GraphCollection<VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder>()
        .idFunc(d => d.id)
        .sourceFunc(e => e.source.id)
        .targetFunc(e => e.target.id)
        ;

    protected _centroidFilter: SVGGlowFilter;

    protected _svgDefsAnn: any;
    protected _svgDefsCat: any;
    protected _subgraphG: Selection<SVGGElement, any, SVGGElement, any>;
    protected _edgeG: Selection<SVGGElement, any, SVGGElement, any>;
    protected _vertexG: Selection<SVGGElement, any, SVGGElement, any>;

    protected _selection = new Utility.Selection(this);
    private _dragHandler = d3Drag<Element, VertexPlaceholder>();

    protected _catPalette = Palette.ordinal("hpcc10");
    _svgDefs: any;

    constructor() {
        super();
        const context = this;
        this._drawStartPos = "origin";

        const buttons: Widget[] = [
            this._toggleHierarchy,
            this._toggleDot,
            this._toggleForceDirected,
            this._toggleNeato,
            this._toggleFDP,
            this._toggleForceDirected2,
            this._toggleCircle,
            this._toggleTwoPI,
            this._toggleCirco,
            new Spacer()];
        this._iconBar.buttons(buttons.concat(this._iconBar.buttons()));

        this._dragHandler
            .on("start", function (d) {
                if (context.allowDragging()) {
                    d3Select(this).classed("grabbed", true);
                    d.fx = d.sx = d.x;
                    d.fy = d.sy = d.y;
                    safeRaise(this);
                    context.moveVertexPlaceholder(d, false, true);
                    if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(n => {
                            n.fx = n.sx = n.x;
                            n.fy = n.sy = n.y;
                        });
                    }
                }
            })
            .on("drag", d => {
                if (context.allowDragging()) {
                    d.fx = d.sx + context.rproject(d3Event().x - d.sx);
                    d.fy = d.sy + context.rproject(d3Event().y - d.sy);
                    this._graphData.edges(d.id).forEach(e => delete e.points);
                    context.moveVertexPlaceholder(d, false, true);
                    if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(n => {
                            n.fx = n.sx + d.fx - d.sx;
                            n.fy = n.sy + d.fy - d.sy;
                            context.moveVertexPlaceholder(n, false, true);
                        });
                    }
                }
            })
            .on("end", function (d) {
                if (context.allowDragging()) {
                    d.x = d.fx;
                    d.y = d.fy;
                    d.fx = d.sx = undefined;
                    d.fy = d.sy = undefined;
                    if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(n => {
                            n.x = n.fx;
                            n.y = n.fy;
                            n.fx = n.sx = undefined;
                            n.fy = n.sy = undefined;
                        });
                    }
                    d3Select(this).classed("grabbed", false);
                }
            })
            ;
    }

    iconBarButtons(): Widget[] {
        return this._iconBar.buttons();
    }

    protected _categories: IconEx[] = [];
    categories(): IconEx[];
    categories(_: IconEx[]): this;
    categories(_?: IconEx[]): IconEx[] | this {
        if (_ === void 0) return this._categories;
        this._categories = _;
        return this;
    }

    protected _annotations: IconEx[] = [];
    annotations(): IconEx[];
    annotations(_: IconEx[]): this;
    annotations(_?: IconEx[]): IconEx[] | this {
        if (_ === void 0) return this._annotations;
        this._annotations = _;
        return this;
    }

    data(): IGraphData2;
    data(_: IGraphData2, merge?: boolean): this;
    data(_?: IGraphData2, merge?: boolean): IGraphData2 | this {
        if (_ === void 0) {
            return {
                subgraphs: this._graphData.subgraphs().map(d => ({ ...d.props, id: d.id })),
                vertices: this._graphData.vertices().map(d => ({ ...d.props, id: d.id, centroid: d.centroid })),
                edges: this._graphData.edges().map(d => ({ ...d.props, id: d.id })),
                hierarchy: [
                    ...this._graphData.subgraphs().filter(s => !!this._graphData.subgraphParent(s.id)).map(s => ({ parent: this._graphData.subgraphParent(s.id).props, child: s.props })),
                    ...this._graphData.vertices().filter(v => !!this._graphData.vertexParent(v.id)).map(v => ({ parent: this._graphData.vertexParent(v.id).props, child: v.props }))
                ]
            };
        }

        this._graphData.mergeSubgraphs((_.subgraphs || []).map(sg => ({
            id: sg.id,
            props: sg
        })));

        this._graphData.mergeVertices(_.vertices.map(v => ({
            id: v.id,
            centroid: v.centroid,
            props: v
        })));

        this._graphData.mergeEdges(_.edges.map(e => ({
            id: e.id,
            props: e,
            source: this._graphData.vertex(e.source.id),
            target: this._graphData.vertex(e.target.id)
        })));

        this._graphData.clearParents();
        (_.hierarchy ? _.hierarchy : []).forEach(h => {
            if (this._graphData.subgraphExists(h.child.id)) {
                this._graphData.subgraphParent(h.child.id, h.parent.id);
            } else if (this._graphData.vertexExists(h.child.id)) {
                this._graphData.vertexParent(h.child.id, h.parent.id);
            }
        });

        return this;
    }

    selection(_: any[]): this;
    selection(): any[];
    selection(_?: any[]): any[] | this {
        if (!arguments.length) return this._selection.get();
        this._selection.set(_);
        return this;
    }

    graphData(): GraphCollection<VertexPlaceholder, EdgePlaceholder> {
        return this._graphData;
    }

    layoutRunning() {
        return this._layoutAlgo && this._layoutAlgo.running();
    }

    protected _layoutAlgo: ILayout;
    layoutAlgo(layout: ILayout) {
        if (this._layoutAlgo) {
            this._layoutAlgo.stop();
        }
        this._layoutAlgo = layout;
        this._layoutAlgo.start().then(() => {
            this.updateIconBar();
            if (this.applyScaleOnLayout()) {
                //  Wait for any transitions to finish  ---
                setTimeout(() => {
                    this.zoomToFit(0, this.scaleMultiplier());
                }, this.transitionDuration());
            }
        });
        this.updateIconBar();
    }

    layoutClick(layout: GraphLayoutType) {
        if (this.layoutRunning()) {
            this._layoutAlgo.stop();
            this.updateIconBar();
        } else {
            delete this._prevLayout;
            this
                .layout(layout)
                .render()
                ;
        }
    }

    updateIconBar() {
        const layout = this.layout();
        const running = this._layoutAlgo && this._layoutAlgo.running();

        this._toggleHierarchy.enabled(!running || layout === "Hierarchy").selected(running && layout === "Hierarchy").render();
        this._toggleDot.enabled(!running || layout === "DOT").selected(running && layout === "DOT").render();
        this._toggleForceDirected.enabled(!running || layout === "ForceDirected").selected(running && layout === "ForceDirected").render();
        this._toggleNeato.enabled(!running || layout === "Neato").selected(running && layout === "Neato").render();
        this._toggleFDP.enabled(!running || layout === "FDP").selected(running && layout === "FDP").render();
        this._toggleForceDirected2.enabled(!running || layout === "ForceDirected2").selected(running && layout === "ForceDirected2").render();
        this._toggleCircle.enabled(!running || layout === "Circle").selected(running && layout === "Circle").render();
        this._toggleTwoPI.enabled(!running || layout === "TwoPI").selected(running && layout === "TwoPI").render();
        this._toggleCirco.enabled(!running || layout === "Circo").selected(running && layout === "Circo").render();
    }

    getNeighborMap(vertex: VertexPlaceholder) {
        const vertices = {};
        const edges = {};

        if (vertex) {
            const nedges = this._graphData.edges(vertex.id);
            for (let i = 0; i < nedges.length; ++i) {
                const edge = this._graphData.edge(nedges[i].id);
                edges[edge.id] = edge;
                if (edge.source.id !== vertex.id) {
                    vertices[edge.source.id] = edge.source;
                }
                if (edge.target.id !== vertex.id) {
                    vertices[edge.target.id] = edge.target;
                }
            }
        }

        return {
            vertices,
            edges
        };
    }

    protected highlight = {
        zoom: 1.1,
        opacity: 0.33,
        edge: "1.25px"
    };

    highlightVerticies(vertexMap?: { [id: string]: boolean }) {
        const context = this;
        const vertexElements = this._vertexG.selectAll<SVGGElement, VertexPlaceholder>(".graphVertex");
        vertexElements
            .classed("graphVertex-highlighted", d => !vertexMap || vertexMap[d.id])
            .style("filter", d => vertexMap && vertexMap[d.id] ? "url(#" + this.id() + "_glow)" : null)
            .transition().duration(this.transitionDuration())
            .on("end", function (d) {
                if (vertexMap && vertexMap[d.id]) {
                    if (d.element.node() && d.element.node().parentNode) {
                        d.element.node().parentNode.appendChild(d.element.node());
                    }
                }
            })
            .style("opacity", function (d) {
                if (!vertexMap || vertexMap[d.id]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
            ;
        return this;
    }

    highlightEdges(edgeMap) {
        const context = this;
        const edgeElements = this._edgeG.selectAll<SVGGElement, EdgePlaceholder>(".graphEdge");
        edgeElements
            .classed("graphEdge-highlighted", function (d) { return !edgeMap || edgeMap[d.id]; })
            .style("stroke-width", function (o) {
                if (edgeMap && edgeMap[o.id]) {
                    return context.highlight.edge;
                }
                return "1px";
            }).transition().duration(this.transitionDuration())
            .style("opacity", function (o) {
                if (!edgeMap || edgeMap[o.id]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
            ;
        return this;
    }

    highlightVertex(_element, d: VertexPlaceholder) {
        if (this.highlightOnMouseOverVertex()) {
            if (d) {
                const highlight = this.getNeighborMap(d);
                highlight.vertices[d.id] = d;
                this.highlightVerticies(highlight.vertices);
                this.highlightEdges(highlight.edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    }

    highlightEdge(_element, d: EdgePlaceholder) {
        if (this.highlightOnMouseOverEdge()) {
            if (d) {
                const vertices = {};
                vertices[d.source.id] = d.source;
                vertices[d.target.id] = d.target;
                const edges = {};
                edges[d.id] = d;
                this.highlightVerticies(vertices);
                this.highlightEdges(edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    }

    moveSubgraphPlaceholder(sp: SubgraphPlaceholder, transition: boolean): this {
        const x = this.project(sp.x);
        const y = this.project(sp.y);
        const width = this.project(sp.props.width, true);
        const height = this.project(sp.props.height, true);
        sp.element && (transition ? sp.element.transition() : sp.element)
            .attr("transform", `translate(${x} ${y})`)
            .each(function (d) {
                render(Subgraph, { text: d.props.text, width, height }, this);
            })
            ;
        return this;
    }

    moveEdgePlaceholder(ep: EdgePlaceholder, transition: boolean): this {
        let points = [];
        let hasNaN = false;
        if (ep.points) {
            points = ep.points.map(p => {
                const x = this.project(p[0]);
                const y = this.project(p[1]);
                if (isNaN(x) || isNaN(y)) {
                    hasNaN = true;
                }
                return [x, y];
            });
        }
        if (hasNaN || points.length < 2) {
            const sPos = this.projectPlacholder(ep.source);
            const tPos = this.projectPlacholder(ep.target);
            points = [[sPos.x, sPos.y], [tPos.x, tPos.y]];
        }
        const [pts, line] = calcArc(points, this.edgeArcDepth());
        ep.elementPath && (transition ? ep.elementPath.transition() : ep.elementPath)
            .attr("d", line(pts))
            ;

        const c = center(pts);

        ep.elementText && (transition ? ep.elementText.transition() : ep.elementText)
            .attr("transform", `translate(${c[0]} ${c[1]})`)
            .text(d => d.props.label)
            ;
        return this;
    }

    moveVertexPlaceholder(vp: VertexPlaceholder, transition: boolean, moveNeighbours: boolean): this {
        const { x, y } = this.projectPlacholder(vp);
        vp.element && (transition ? vp.element.transition() : vp.element)
            .attr("transform", `translate(${x} ${y})`)
            ;
        if (moveNeighbours) {
            this._graphData.edges(vp.id).forEach(e => this.moveEdgePlaceholder(e, transition));
        }
        return this;
    }

    moveSubgraphs(transition: boolean): this {
        this._graphData.subgraphs().forEach(s => this.moveSubgraphPlaceholder(s, transition));
        return this;
    }

    moveEdges(transition: boolean): this {
        this._graphData.edges().forEach(e => this.moveEdgePlaceholder(e, transition));
        return this;
    }

    moveVertices(transition: boolean): this {
        this._graphData.vertices().forEach(v => this.moveVertexPlaceholder(v, transition, false));
        return this;
    }

    project(pos: number, clip: boolean = false) {
        const rf = 10;
        pos = pos !== undefined ? pos : 0;
        let scale = this._transformScale;
        if (clip) {
            if (this._transformScale > this._maxScale + (this._transformScale - this._maxScale) / 2) {
                scale = this._maxScale + (this._transformScale - this._maxScale) / 2;
            } else if (this._transformScale < this._minScale - (this._transformScale - this._minScale) / 13) {
                // scale = this._minScale - (this._transformScale - this._minScale) / 13;
            }
        }
        return Math.round(pos * scale * rf) / rf;
    }

    rproject(pos: number) {
        const rf = 10;
        pos = pos !== undefined ? pos : 0;
        return Math.round(pos / this._transformScale * rf) / rf;
    }

    projectPlacholder(vp: VertexPlaceholder) {
        return {
            x: this.project(vp.fx !== undefined ? vp.fx : vp.x),
            y: this.project(vp.fy !== undefined ? vp.fy : vp.y)
        };
    }

    categoryID(id: string | number, prefix: "cat" | "ann" = "cat"): string {
        return id === undefined || id === "" ? "" : `${prefix}${this.id()}_${id}`;
    }

    updateCategories() {
        render(Icons, {
            icons: this._categories.map((c): IconEx => ({
                ...c,
                id: this.categoryID(c.id),
                fill: c.fill || "transparent",
                imageCharFill: c.imageCharFill || this._catPalette(c.id)
            }))
        }, this._svgDefsCat.node());
    }

    updateAnnotations() {
        render(Icons, {
            icons: this._annotations.map((c): IconEx => ({
                ...c,
                id: this.categoryID(c.id, "ann"),
                shape: c.shape || "square",
                height: c.height || 12,
                fill: c.fill || this._catPalette(c.id)
            }))
        }, this._svgDefsAnn.node());
    }

    updateEdges(): this {
        const context = this;
        this._edgeG.selectAll(".graphEdge")
            .data(this._graphData.edges(), (d: EdgePlaceholder) => d.id)
            .join(
                enter => enter.append("g")
                    .attr("class", "graphEdge")
                    .on("mouseover", function (d) {
                        safeRaise(this);
                        context.edge_mouseover(d3Select(this), d);
                    })
                    .on("mouseout", function (d) {
                        context.edge_mouseout(d3Select(this), d);
                    })
                    .each(function (d) {
                        d.element = d3Select(this);
                        d.elementPath = d.element.append("path");
                        d.elementText = d.element.append("text");
                    })
                ,
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            ;
        return this;
    }

    private _vertexRenderer: FunctionComponent<Vertex> = Vertex;
    vertexRenderer(): FunctionComponent;
    vertexRenderer(_: FunctionComponent): this;
    vertexRenderer(_?: FunctionComponent): this | FunctionComponent {
        if (!arguments.length) return this._vertexRenderer;
        this._vertexRenderer = _;
        return this;
    }

    updateVertices(): this {
        const context = this;
        this._vertexG.selectAll(".graphVertex")
            .data(this._graphData.vertices(), (d: VertexPlaceholder) => d.id)
            .join(
                enter => enter.append("g")
                    .attr("class", "graphVertex")
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: d.id,
                            element: () => d.element
                        }, d3Event);
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.vertex_click(d.props.origData || d.props, "", selected);
                    })
                    .on("mousein", function (d) {
                        safeRaise(this);
                        context.highlightVertex(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.vertex_mousein(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseover", function (d) {
                        safeRaise(this);
                        context.highlightVertex(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.vertex_mouseover(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseout", function (d) {
                        context.highlightVertex(null, null);
                        const selected = d.element.classed("selected");
                        context.vertex_mouseout(d.props.origData || d.props, "", selected);
                    })
                    .call(this._dragHandler)
                    .each(function (d) {
                        d.element = d3Select(this);
                    })
                ,
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            .classed("centroid", d => d.centroid)
            .attr("filter", d => d.centroid ? "url(#" + this.id() + "_glow)" : null)
            .each(function (this: SVGGElement, d) {
                render(
                    context._vertexRenderer,
                    {
                        ...d.props,
                        categoryID: context.categoryID(d.props.categoryID),
                        annotations: d.props.annotations ? d.props.annotations.map(a => context.categoryID(a, "ann")) : []
                    },
                    this
                );
            })
            ;
        return this;
    }

    hasSubgraphs() {
        switch (this.layout()) {
            case "DOT":
            case "Hierarchy":
                return true;
        }
        return false;
    }

    updateSubgraphs(): this {
        const context = this;
        this._subgraphG.selectAll(".subgraphPlaceholder")
            .data(this.hasSubgraphs() ? this._graphData.subgraphs() : [], (d: SubgraphPlaceholder) => d.id)
            .join(
                enter => enter.append("g")
                    .attr("class", "subgraphPlaceholder")
                    .on("mouseover", function () {
                        safeRaise(this);
                    })
                    .each(function (d) {
                        d.element = d3Select(this);
                    })
                ,
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .transition()
                    .style("opacity", 0)
                    .remove()
            )
            .each(function (d) {
                context.moveSubgraphPlaceholder(d, false);
            })
            ;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        const svg = this.locateSVGNode(domNode);
        this._svgDefs = d3Select(svg).select<SVGDefsElement>("defs");
        this._centroidFilter = new SVGGlowFilter(this._svgDefs, this._id + "_glow");

        this._svgDefsCat = this._svgDefs.append("g");
        this._svgDefsAnn = this._svgDefs.append("g");
        this._subgraphG = this._renderElement.append("g");
        this._edgeG = this._renderElement.append("g");
        this._vertexG = this._renderElement.append("g");
    }

    private _prevLayout: GraphLayoutType;
    update(domNode, element) {
        super.update(domNode, element);

        this.updateIconBar();
        this._centroidFilter.update(this.centroidColor());

        //  Graph  ---
        this._renderElement.classed("allowDragging", this.allowDragging());
        this.updateCategories();
        this.updateAnnotations();

        this.updateSubgraphs();
        this.updateVertices();
        this.updateEdges();

        const layout = this.layout();
        if (this._prevLayout !== layout) {
            this._prevLayout = layout;
            switch (this._prevLayout) {
                case "None":
                    this.layoutAlgo(new Null(this));
                    break;
                case "Circle":
                    this.layoutAlgo(new Circle(this));
                    break;
                case "ForceDirected":
                    this.layoutAlgo(new ForceDirected(this, {
                        alpha: this.forceDirectedAlpha(),
                        alphaMin: this.forceDirectedAlphaMin(),
                        alphaDecay: this.forceDirectedAlphaDecay(),
                        velocityDecay: this.forceDirectedVelocityDecay(),
                        repulsionStrength: this.forceDirectedRepulsionStrength(),
                        iterations: this.forceDirectedIterations(),
                        linkDistance: this.forceDirectedLinkDistance(),
                        linkStrength: this.forceDirectedLinkStrength()
                    }));
                    break;
                case "ForceDirected2":
                    this.layoutAlgo(new ForceDirectedAnimated(this, {
                        alpha: this.forceDirectedAlpha(),
                        alphaMin: this.forceDirectedAlphaMin(),
                        alphaDecay: this.forceDirectedAlphaDecay(),
                        velocityDecay: this.forceDirectedVelocityDecay(),
                        repulsionStrength: this.forceDirectedRepulsionStrength(),
                        iterations: this.forceDirectedIterations(),
                        linkDistance: this.forceDirectedLinkDistance(),
                        linkStrength: this.forceDirectedLinkStrength()
                    }));
                    break;
                case "Hierarchy":
                    this.layoutAlgo(new Dagre(this, {
                        rankdir: this.hierarchyRankDirection(),
                        nodesep: this.hierarchyNodeSeparation(),
                        edgesep: this.hierarchyEdgeSeparation(),
                        ranksep: this.hierarchyRankSeparation(),
                        digraph: this.hierarchyDigraph()
                    }));
                    break;
                case "DOT":
                    this.layoutAlgo(new Graphviz(this, "dot"));
                    break;
                case "Neato":
                    this.layoutAlgo(new Graphviz(this, "neato"));
                    break;
                case "FDP":
                    this.layoutAlgo(new Graphviz(this, "fdp"));
                    break;
                case "TwoPI":
                    this.layoutAlgo(new Graphviz(this, "twopi"));
                    break;
                case "Circo":
                    this.layoutAlgo(new Graphviz(this, "circo"));
                    break;
            }
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    private _minScale = 0.66;
    private _maxScale = 1.0;
    private _prevWidth;
    private _prevHeight;
    private _prevTransformScale;
    private _transformScale = 1;
    zoomed(transform) {
        super.zoomed(transform);
        const { width, height } = this.size();

        if (transform.k < this._minScale) {
            this._edgeG.attr("transform", `scale(${this._minScale / transform.k})`);
            this._subgraphG.attr("transform", `scale(${this._minScale / transform.k})`);
            this._vertexG.attr("transform", `scale(${this._minScale / transform.k})`);
            this._transformScale = transform.k / this._minScale;
        } else if (transform.k > this._maxScale) {
            this._edgeG.attr("transform", `scale(${this._maxScale / transform.k})`);
            this._subgraphG.attr("transform", `scale(${this._maxScale / transform.k})`);
            this._vertexG.attr("transform", `scale(${this._maxScale / transform.k})`);
            this._transformScale = transform.k / this._maxScale;
        } else {
            this._transformScale = 1;
            this._edgeG.attr("transform", null);
            this._subgraphG.attr("transform", null);
            this._vertexG.attr("transform", null);
        }

        if (this._prevTransformScale !== this._transformScale ||
            this._prevWidth !== width ||
            this._prevHeight !== height) {
            this._prevTransformScale = this._transformScale;
            this._prevWidth = width;
            this._prevHeight = height;
            this
                .moveSubgraphs(false)
                .moveVertices(false)
                .moveEdges(false)
                ;
        }
    }

    // Events  ---
    centroids(): VertexPlaceholder[] {
        return this._graphData.vertices().filter(vp => !!vp.centroid);
    }

    selectionChanged() {
        if (this.highlightSelectedPathToCentroid()) {
            const highlightedVertices = {};
            this.centroids().forEach(centroid => {
                this.selection().forEach(selection => {
                    const { ids, len } = this._graphData.dijkstra(centroid.id, selection._id);
                    if (len) {
                        ids.forEach(id => {
                            highlightedVertices[id] = true;
                        });
                    }
                });
            });
            this._edgeG.selectAll(".graphEdge")
                // .classed("shortest-path", d => highlightedEdges[d.id()] === true)
                ;
        }
    }

    vertex_click(row, _col, sel) {
    }

    vertex_mousein(row, _col, sel) {
    }

    vertex_mouseover(row, _col, sel) {
    }

    vertex_mouseout(row, _col, sel) {
    }

    edge_mouseover(element, d) {
        this.highlightEdge(element, d);
    }

    edge_mouseout(_element, _d) {
        this.highlightEdge(null, null);
    }
}
Graph2.prototype._class += " graph_Graph2";

export interface Graph2 {
    allowDragging(): boolean;
    allowDragging(_: boolean): this;
    dragSingleNeighbors(): boolean;
    dragSingleNeighbors(_: boolean): this;
    layout(): GraphLayoutType;
    layout(_: GraphLayoutType): this;
    applyScaleOnLayout(): boolean;
    applyScaleOnLayout(_: boolean): this;
    highlightOnMouseOverVertex(): boolean;
    highlightOnMouseOverVertex(_: boolean): this;
    highlightOnMouseOverEdge(): boolean;
    highlightOnMouseOverEdge(_: boolean): this;
    transitionDuration(): number;
    transitionDuration(_: number): this;
    scaleMultiplier(): number;
    scaleMultiplier(_: number): this;
    /*
    showEdges(): boolean;
    showEdges(_: boolean): this;
    snapToGrid(): number;
    snapToGrid(_: number): this;
    selectionClearOnBackgroundClick(): boolean;
    selectionClearOnBackgroundClick(_: boolean): this;
    */
    centroidColor(): string;
    centroidColor(_: string): this;
    highlightSelectedPathToCentroid(): boolean;
    highlightSelectedPathToCentroid(_: boolean): this;
    edgeArcDepth(): number;
    edgeArcDepth(_: number): this;

    hierarchyRankDirection(): "TB" | "BT" | "LR" | "RL";
    hierarchyRankDirection(_: "TB" | "BT" | "LR" | "RL"): this;
    hierarchyNodeSeparation(): number;
    hierarchyNodeSeparation(_: number): this;
    hierarchyEdgeSeparation(): number;
    hierarchyEdgeSeparation(_: number): this;
    hierarchyRankSeparation(): number;
    hierarchyRankSeparation(_: number): this;
    hierarchyDigraph(): boolean;
    hierarchyDigraph(_: boolean): this;

    forceDirectedAlpha(): number;
    forceDirectedAlpha(_: number): this;
    forceDirectedAlphaMin(): number;
    forceDirectedAlphaMin(_: number): this;
    forceDirectedAlphaDecay(): number;
    forceDirectedAlphaDecay(_: number): this;
    forceDirectedRepulsionStrength(): number;
    forceDirectedRepulsionStrength(_: number): this;
    forceDirectedVelocityDecay(): number;
    forceDirectedVelocityDecay(_: number): this;
    forceDirectedIterations(): number;
    forceDirectedIterations(_: number): this;
    forceDirectedLinkDistance(): number;
    forceDirectedLinkDistance(_: number): this;
    forceDirectedLinkStrength(): number;
    forceDirectedLinkStrength(_: number): this;
}

Graph2.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices", null, { tags: ["Advanced"] });
Graph2.prototype.publish("dragSingleNeighbors", true, "boolean", "Dragging a Vertex also moves its singleton neighbors", null, { tags: ["Advanced"] });
Graph2.prototype.publish("layout", "Circle", "set", "Default Layout", GraphLayoutTypeSet, { tags: ["Basic"] });
Graph2.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"], { tags: ["Basic"] });
Graph2.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout", null, { tags: ["Basic"] });
Graph2.prototype.publish("scaleMultiplier", 1.1, "number", "Multiplier applied to scaled layout", null, {disable: (w: any) => !w.applyScaleOnLayout() });
Graph2.prototype.publish("highlightOnMouseOverVertex", true, "boolean", "Highlight Vertex on Mouse Over", null, { tags: ["Basic"] });
Graph2.prototype.publish("highlightOnMouseOverEdge", true, "boolean", "Highlight Edge on Mouse Over", null, { tags: ["Basic"] });
Graph2.prototype.publish("transitionDuration", 250, "number", "Transition Duration", null, { tags: ["Intermediate"] });
Graph2.prototype.publish("showEdges", true, "boolean", "Show Edges", null, { tags: ["Intermediate"] });
Graph2.prototype.publish("snapToGrid", 0, "number", "Snap to Grid", null, { tags: ["Private"] });
Graph2.prototype.publish("selectionClearOnBackgroundClick", false, "boolean", "Clear selection on background click");
Graph2.prototype.publish("edgeArcDepth", 8, "number", "Edge Arc Depth");

Graph2.prototype.publish("centroidColor", "#00A000", "html-color", "Centroid Color", null, { tags: ["Basic"] });
Graph2.prototype.publish("highlightSelectedPathToCentroid", true, "boolean", "Highlight path to Center Vertex (for selected vertices)", null, { tags: ["Basic"] });

Graph2.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"], { tags: ["Advanced"] });
Graph2.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout", null, { tags: ["Advanced"] });
Graph2.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout", null, { tags: ["Advanced"] });
Graph2.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout", null, { tags: ["Advanced"] });
Graph2.prototype.publish("hierarchyDigraph", true, "boolean", "Directional Graph2", null, { tags: ["Advanced"] });

Graph2.prototype.publish("forceDirectedAlpha", 1, "number", "Alpha");
Graph2.prototype.publish("forceDirectedAlphaMin", 0.001, "number", "Min Alpha");
Graph2.prototype.publish("forceDirectedAlphaDecay", 0.0228, "number", "Defaults to 1 - pow(alphaMin, 1 / 300)");
Graph2.prototype.publish("forceDirectedRepulsionStrength", -350, "number", "Charge strength ", null, { tags: ["Advanced"] });
Graph2.prototype.publish("forceDirectedVelocityDecay", 0.4, "number", "Velocity Decay ", null, { tags: ["Advanced"] });
Graph2.prototype.publish("forceDirectedIterations", 300, "number", "Iterations", null, { tags: ["Advanced"] });
Graph2.prototype.publish("forceDirectedLinkDistance", 300, "number", "Target distance between linked nodes", null, { tags: ["Advanced"] });
Graph2.prototype.publish("forceDirectedLinkStrength", 1, "number", "Strength (rigidity) of links", null, { tags: ["Advanced"] });

const _origScale = Graph2.prototype.scale;
Graph2.prototype.scale = function (_?, transitionDuration?) {
    const retVal = _origScale.apply(this, arguments);
    if (arguments.length) {
        this.zoomTo(_, transitionDuration);
    }
    return retVal;
};
