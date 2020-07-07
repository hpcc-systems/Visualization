import { d3Event, drag as d3Drag, Palette, select as d3Select, Selection, Spacer, SVGGlowFilter, SVGZoomWidget, ToggleButton, Utility, Widget } from "@hpcc-js/common";
import { IconEx, Icons, React, render, Subgraph, Vertex } from "@hpcc-js/react";
import { getScriptSrc, Graph2 as GraphCollection } from "@hpcc-js/util";
import { curveBasis as d3CurveBasis, curveCardinal as d3CurveCardinal, Line, line as d3Line } from "d3-shape";
import "d3-transition";
import { Circle, Dagre, ForceDirected, ForceDirectedAnimated, Graphviz, ILayout, Null } from "./layouts/index";
import { EdgePlaceholder, IEdge, IGraphData2, IHierarchy, ISubgraph, IVertex, SubgraphPlaceholder, VertexPlaceholder } from "./layouts/placeholders";
import { Tree, RadialTree, Dendrogram, RadialDendrogram } from './layouts/tree';

import "../../src/graph2/graph.css";

const wasmFolder = `${getScriptSrc("/graph/lib-umd/graph2/graph") || getScriptSrc("/graph/dist/index") || "."}/graph/dist`;

export {
    IGraphData2,
    ISubgraph,
    IVertex,
    IEdge,
    IHierarchy
};

type GraphLayoutType = "Hierarchy" | "DOT" | "Tree" | "Dendrogram" | "RadialTree" | "RadialDendrogram" | "ForceDirected" | "ForceDirected2" | "ForceDirectedHybrid" | "Neato" | "FDP" | "Circle" | "TwoPI" | "Circo" | "None";
const GraphLayoutTypeSet = ["Hierarchy", "DOT", "Tree", "Dendrogram", "RadialTree", "RadialDendrogram", "ForceDirected", "ForceDirected2", "ForceDirectedHybrid", "Neato", "FDP", "Circle", "TwoPI", "Circo", "None"];

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
        .updateFunc((b: any, a: any) => {
            b.props = a.props;
            return b;
        })
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
        this.zoomToFitLimit(1);
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

    private _origData: IGraphData2 = {
        subgraphs: [],
        vertices: [],
        edges: [],
        hierarchy: []
    };
    data(): IGraphData2;
    data(_: IGraphData2, merge?: boolean): this;
    data(_?: IGraphData2, merge?: boolean): IGraphData2 | this {
        if (_ === void 0) return this._origData;
        this._origData = _;

        this._graphData.mergeSubgraphs((_.subgraphs || []).map(sg => ({
            id: sg.id,
            props: sg
        })));

        this._graphData.mergeVertices((_.vertices || []).map(v => ({
            id: v.id,
            centroid: v.centroid,
            props: v
        })));

        this._graphData.mergeEdges(
            (_.edges || [])
                .filter(e => {
                    return this._graphData.vertexExists(e.source.id) && this._graphData.vertexExists(e.target.id);
                })
                .map(e => ({
                    id: e.id,
                    props: e,
                    source: this._graphData.vertex(e.source.id),
                    target: this._graphData.vertex(e.target.id)
                }))
        );

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

    selection(_: Array<IVertex | ISubgraph | IEdge>): this;
    selection(): Array<IVertex | ISubgraph | IEdge>;
    selection(_?: Array<IVertex | ISubgraph | IEdge>): Array<IVertex | ISubgraph | IEdge> | this {
        if (!arguments.length) return this._selection.get().map(item => this._graphData.item(item._id).props);
        this._selection.set(_.map(item => {
            const vp = this._graphData.item(item.id);
            return {
                _id: vp.id,
                element: () => vp.element
            };
        }));
        return this;
    }

    graphData(): GraphCollection<VertexPlaceholder, EdgePlaceholder> {
        return this._graphData;
    }

    resetLayout() {
        delete this._prevLayout;
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
        return this._layoutAlgo.start().then(() => {
            this.updateIconBar();
            if (this.applyScaleOnLayout()) {
                //  Wait for any transitions to finish  ---
                setTimeout(() => {
                    this.zoomToFit();
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

    centerOnItem(id: string) {
        const item = this._graphData.item(id);
        let x;
        let y;
        if (this._graphData.isSubgraph(item) || this._graphData.isVertex(item)) {
            x = item.x;
            y = item.y;
        }
        if (this._graphData.isEdge(item)) {
            [x, y] = [0, 0]; // center(item.points);
        }
        if (x !== undefined && y !== undefined) {
            const bbox = item.element.node().getBBox();
            if (this._graphData.isVertex(item)) {
                const proj = this.projectPlacholder(item);
                x = proj.x;
                y = proj.y;
            } else if (this._graphData.isSubgraph(item)) {
                x = this.project(item.x);
                y = this.project(item.y);
            }
            const deltaX = bbox.x + bbox.width / 2;
            const deltaY = bbox.y + bbox.height / 2;
            const itemBBox = {
                x: x + deltaX - bbox.width / 2,
                y: y + deltaY - bbox.height / 2,
                width: bbox.width,
                height: bbox.height
            };
            this.centerOnBBox(itemBBox);
        }
    }

    hideVertex(id: string): this {
        const item = this._graphData.item(id);
        if (this._graphData.isVertex(item)) {
            item.props.hidden = true;
        }
        return this;
    }

    showVertex(id: string): this {
        const item = this._graphData.item(id);
        if (this._graphData.isVertex(item)) {
            item.props.hidden = false;
        }
        return this;
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
                if (d.props.hidden) return 0;
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
                return context.edgeStrokeWidth() + "px";
            }).transition().duration(this.transitionDuration())
            .style("opacity", function (o) {
                if (o.source.props.hidden || o.target.props.hidden) return 0;
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
                render(Subgraph, { ...d.props, width, height }, this);
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
            .attr("stroke-dasharray", d => d.props.strokeDasharray)
            ;

        const c = center(pts);

        ep.elementText && (transition ? ep.elementText.transition() : ep.elementText)
            .attr("transform", `translate(${c[0]} ${c[1]})`)
            .attr("font-family", d => d.props.fontFamily || null)
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
            if (this._transformScale > this.maxScale() + (this._transformScale - this.maxScale()) / 2) {
                scale = this.maxScale() + (this._transformScale - this.maxScale()) / 2;
            } else if (this._transformScale < this.minScale() - (this._transformScale - this.minScale()) / 13) {
                // scale = this.minScale() - (this._transformScale - this.minScale()) / 13;
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
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: d.id,
                            element: () => d.element
                        }, d3Event);
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.edge_click(d.props.origData || d.props, "", selected);
                    })
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
                update => update
                    .attr("opacity", d => d.source.props.hidden || d.target.props.hidden ? 0 : 1),
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            .style("stroke", this.edgeColor())
            .style("stroke-width", this.edgeStrokeWidth() + "px")
            ;
        return this;
    }

    private _centroidRenderer: React.FunctionComponent<Vertex> = Vertex;
    centroidRenderer(): React.FunctionComponent;
    centroidRenderer(_: React.FunctionComponent): this;
    centroidRenderer(_?: React.FunctionComponent): this | React.FunctionComponent {
        if (!arguments.length) return this._centroidRenderer;
        this._centroidRenderer = _;
        return this;
    }

    private _vertexRenderer: React.FunctionComponent<Vertex> = Vertex;
    vertexRenderer(): React.FunctionComponent;
    vertexRenderer(_: React.FunctionComponent): this;
    vertexRenderer(_?: React.FunctionComponent): this | React.FunctionComponent {
        if (!arguments.length) return this._vertexRenderer;
        this._vertexRenderer = _;
        return this;
    }

    vertexMapper(props: IVertex, origRow: any): Vertex {
        return {
            ...props,
            categoryID: this.categoryID(props.categoryID),
            annotationIDs: props.annotationIDs ? props.annotationIDs.map(a => this.categoryID(a, "ann")) : []
        };
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
                    .on("dblclick", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.vertex_dblclick(d.props.origData || d.props, "", selected);
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
                    }),
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            .classed("centroid", d => d.centroid)
            .attr("opacity", d => d.props.hidden ? 0 : 1)
            .attr("filter", d => d.centroid ? "url(#" + this.id() + "_glow)" : null)
            .each(function (this: SVGGElement, d) {
                render(
                    d.centroid ? context._centroidRenderer : context._vertexRenderer,
                    {
                        showLabel: context.showVertexLabels(),
                        ...context.vertexMapper(d.props, d.props.origData)
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
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: d.id,
                            element: () => d.element
                        }, d3Event);
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.subgraph_click(d.props.origData || d.props, "", selected);
                    })
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

    protected forceDirectedOptions() {
        return {
            alpha: this.forceDirectedAlpha(),
            alphaMin: this.forceDirectedAlphaMin(),
            alphaDecay: this.forceDirectedAlphaDecay(),
            velocityDecay: this.forceDirectedVelocityDecay(),
            repulsionStrength: this.forceDirectedRepulsionStrength(),
            iterations: this.forceDirectedIterations(),
            linkDistance: this.forceDirectedLinkDistance(),
            linkStrength: this.forceDirectedLinkStrength()
        };
    }

    private _prevLayout: GraphLayoutType;
    updateLayout() {
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
                    this.layoutAlgo(new ForceDirected(this, this.forceDirectedOptions()));
                    break;
                case "ForceDirected2":
                    this.layoutAlgo(new ForceDirectedAnimated(this, this.forceDirectedOptions()));
                    break;
                case "ForceDirectedHybrid":
                    const options = this.forceDirectedOptions();
                    this.layoutAlgo(new ForceDirected(this, options)).then(() => {
                        this.layoutAlgo(new ForceDirectedAnimated(this, options));
                    });
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
                    this.layoutAlgo(new Graphviz(this, "dot", this.wasmFolder() || wasmFolder));
                    break;
                case "Tree":
                    this.layoutAlgo(new Tree(this, { rankdir: "LR" }));
                    break;
                case "RadialTree":
                    this.layoutAlgo(new RadialTree(this));
                    break;
                case "Dendrogram":
                    this.layoutAlgo(new Dendrogram(this, { rankdir: "LR" }));
                    break;
                case "RadialDendrogram":
                    this.layoutAlgo(new RadialDendrogram(this));
                    break;
                case "Neato":
                    this.layoutAlgo(new Graphviz(this, "neato", this.wasmFolder() || wasmFolder));
                    break;
                case "FDP":
                    this.layoutAlgo(new Graphviz(this, "fdp", this.wasmFolder() || wasmFolder));
                    break;
                case "TwoPI":
                    this.layoutAlgo(new Graphviz(this, "twopi", this.wasmFolder() || wasmFolder));
                    break;
                case "Circo":
                    this.layoutAlgo(new Graphviz(this, "circo", this.wasmFolder() || wasmFolder));
                    break;
            }
        }
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._centroidFilter.update(this.centroidColor());
        this._renderElement.classed("allowDragging", this.allowDragging());

        this.updateCategories();
        this.updateAnnotations();

        this.updateSubgraphs();
        this.updateVertices();
        this.updateEdges();

        this.updateLayout();

        this.updateIconBar();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        this.progress("start");
        super.render(w => {
            this.progress("stop");
            if (callback) {
                callback(w);
            }
        });
        return this;
    }

    private _prevWidth;
    private _prevHeight;
    private _prevTransformScale;
    private _transformScale = 1;
    zoomed(transform) {
        super.zoomed(transform);
        const { width, height } = this.size();

        if (transform.k < this.minScale()) {
            this._edgeG.attr("transform", `scale(${this.minScale() / transform.k})`);
            this._subgraphG.attr("transform", `scale(${this.minScale() / transform.k})`);
            this._vertexG.attr("transform", `scale(${this.minScale() / transform.k})`);
            this._transformScale = transform.k / this.minScale();
        } else if (transform.k > this.maxScale()) {
            this._edgeG.attr("transform", `scale(${this.maxScale() / transform.k})`);
            this._subgraphG.attr("transform", `scale(${this.maxScale() / transform.k})`);
            this._vertexG.attr("transform", `scale(${this.maxScale() / transform.k})`);
            this._transformScale = transform.k / this.maxScale();
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
                    const { ids, len } = this._graphData.dijkstra(centroid.id, selection.id);
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

    subgraph_click(row, _col, sel) {
    }

    vertex_click(row, _col, sel) {
    }

    vertex_dblclick(row, _col, sel) {
    }

    vertex_mousein(row, _col, sel) {
    }

    vertex_mouseover(row, _col, sel) {
    }

    vertex_mouseout(row, _col, sel) {
    }

    edge_click(row, _col, sel) {
    }

    edge_mouseover(element, d) {
        this.highlightEdge(element, d);
    }

    edge_mouseout(_element, _d) {
        this.highlightEdge(null, null);
    }

    progress(what: "start" | "stop" | "layout-start" | "layout-tick" | "layout-stop") {
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
    minScale(): number;
    minScale(_: number): this;
    maxScale(): number;
    maxScale(_: number): this;
    showVertexLabels(): boolean;
    showVertexLabels(_: boolean): this;
    
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
    edgeColor(): string;
    edgeColor(_: string): this;
    edgeStrokeWidth(): number;
    edgeStrokeWidth(_: number): this;

    wasmFolder(): string;
    wasmFolder(_: string): this;
}

Graph2.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices", null, { tags: ["Advanced"] });
Graph2.prototype.publish("dragSingleNeighbors", true, "boolean", "Dragging a Vertex also moves its singleton neighbors", null, { tags: ["Advanced"] });
Graph2.prototype.publish("layout", "ForceDirectedHybrid", "set", "Default Layout", GraphLayoutTypeSet, { tags: ["Basic"] });
Graph2.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"], { tags: ["Basic"] });
Graph2.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout", null, { tags: ["Basic"] });
Graph2.prototype.publish("highlightOnMouseOverVertex", true, "boolean", "Highlight Vertex on Mouse Over", null, { tags: ["Basic"] });
Graph2.prototype.publish("highlightOnMouseOverEdge", true, "boolean", "Highlight Edge on Mouse Over", null, { tags: ["Basic"] });
Graph2.prototype.publish("transitionDuration", 250, "number", "Transition Duration", null, { tags: ["Intermediate"] });
Graph2.prototype.publish("showEdges", true, "boolean", "Show Edges", null, { tags: ["Intermediate"] });
Graph2.prototype.publish("showVertexLabels", true, "boolean", "Show Vertex labels", null, { tags: ["Intermediate"] });
Graph2.prototype.publish("snapToGrid", 0, "number", "Snap to Grid", null, { tags: ["Private"] });
Graph2.prototype.publish("selectionClearOnBackgroundClick", false, "boolean", "Clear selection on background click");
Graph2.prototype.publish("edgeArcDepth", 8, "number", "Edge Arc Depth");
Graph2.prototype.publish("edgeColor", null, "html-color", "Edge line stroke color", null, { optional: true });
Graph2.prototype.publish("edgeStrokeWidth", 1, "number", "Edge line stroke width (pixels)");
Graph2.prototype.publish("minScale", 0.6, "number", "Min scale size for text");
Graph2.prototype.publish("maxScale", 1.0, "number", "Max scale size for text");

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

Graph2.prototype.publish("wasmFolder", null, "string", "WASM Folder", null, { optional: true });

const _origScale = Graph2.prototype.scale;
Graph2.prototype.scale = function (_?, transitionDuration?) {
    const retVal = _origScale.apply(this, arguments);
    if (arguments.length) {
        this.zoomTo(_, transitionDuration);
    }
    return retVal;
};
