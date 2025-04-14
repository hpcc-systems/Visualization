import { d3Event, drag as d3Drag, Palette, select as d3Select, Selection, Spacer, SVGGlowFilter, SVGZoomWidget, Button, ToggleButton, Utility, Widget } from "@hpcc-js/common";
import { Graph2 as GraphCollection, hashSum } from "@hpcc-js/util";
import { HTMLTooltip } from "@hpcc-js/html";
import { interpolateNumberArray as d3InterpolateNumberArray } from "d3-interpolate";
import "d3-transition";
import { interpolatePath as d3InterpolatePath } from "d3-interpolate-path";
import { Circle, Dagre, ForceDirected, ForceDirectedAnimated, Graphviz, ILayout, Null } from "./layouts/index.ts";
import { Options as FDOptions } from "./layouts/forceDirectedWorker.ts";
import type { BaseProps, VertexBaseProps, EdgeBaseProps, GraphDataProps, HierarchyBase, SubgraphBaseProps } from "./layouts/placeholders.ts";
import { EdgePlaceholder, SubgraphPlaceholder, VertexPlaceholder, isEdgePlaceholder } from "./layouts/placeholders.ts";
import { Engine, graphviz as gvWorker } from "./layouts/graphvizWorker.ts";
import { Tree, RadialTree, Dendrogram, RadialDendrogram } from "./layouts/tree.ts";

import "./graphT.css";

let scriptDir = (globalThis?.document?.currentScript as HTMLScriptElement)?.src ?? "./dummy.js";
scriptDir = scriptDir.substring(0, scriptDir.replace(/[?#].*/, "").lastIndexOf("/") + 1);

export {
    BaseProps,
    GraphDataProps,
    SubgraphBaseProps,
    VertexBaseProps,
    EdgeBaseProps,
    HierarchyBase
};

type GraphLayoutType = "Hierarchy" | "DOT" | "Tree" | "Dendrogram" | "RadialTree" | "RadialDendrogram" | "ForceDirected" | "ForceDirected2" | "ForceDirectedHybrid" | "Neato" | "FDP" | "Circle" | "TwoPI" | "Circo" | "None";
const GraphLayoutTypeSet = ["Hierarchy", "DOT", "Tree", "Dendrogram", "RadialTree", "RadialDendrogram", "ForceDirected", "ForceDirected2", "ForceDirectedHybrid", "Neato", "FDP", "Circle", "TwoPI", "Circo", "None"];

function dragStart<V extends VertexBaseProps>(n: VertexPlaceholder<V>) {
    n.fx = n.sx = n.x;
    n.fy = n.sy = n.y;
}
function dragTick<V extends VertexBaseProps>(n: VertexPlaceholder<V>, d: VertexPlaceholder<V>) {
    n.fx = n.sx + d.fx - d.sx;
    n.fy = n.sy + d.fy - d.sy;
}
function dragEnd<V extends VertexBaseProps>(n: VertexPlaceholder<V>) {
    n.x = n.fx;
    n.y = n.fy;
    n.fx = n.sx = undefined;
    n.fy = n.sy = undefined;
}

export type RendererT<T> = (props: T, element: SVGGElement) => unknown;

export class GraphT<SG extends SubgraphBaseProps, V extends VertexBaseProps, E extends EdgeBaseProps<V>> extends SVGZoomWidget {

    protected _centroidFilter: SVGGlowFilter;

    private _toggleHierarchy = new ToggleButton().faChar("fa-sitemap").tooltip("Hierarchy").on("click", () => this.layoutClick("Hierarchy"));
    private _toggleForceDirected = new ToggleButton().faChar("fa-expand").tooltip("Force Directed").on("click", () => this.layoutClick("ForceDirected"));
    private _toggleForceDirected2 = new ToggleButton().faChar("fa-arrows").tooltip("Spring").on("click", () => this.layoutClick("ForceDirected2"));
    private _toggleCircle = new ToggleButton().faChar("fa-circle-o").tooltip("Circle").on("click", () => this.layoutClick("Circle"));
    private _toggleDot = new ToggleButton().faChar("fa-angle-double-down").tooltip("DOT").on("click", () => this.layoutClick("DOT"));
    private _toggleNeato = new ToggleButton().faChar("fa-sun-o").tooltip("Neato").on("click", () => this.layoutClick("Neato"));
    private _toggleFDP = new ToggleButton().faChar("fa-asterisk").tooltip("FDP").on("click", () => this.layoutClick("FDP"));
    private _toggleTwoPI = new ToggleButton().faChar("fa-bullseye").tooltip("TwoPI").on("click", () => this.layoutClick("TwoPI"));
    private _toggleCirco = new ToggleButton().faChar("fa-cogs").tooltip("Circo").on("click", () => this.layoutClick("Circo"));
    private _toggleT = new ToggleButton().faChar("fa-sitemap fa-rotate-270").tooltip("Tree").on("click", () => this.layoutClick("Tree"));
    private _toggleRT = new ToggleButton().faChar("fa-sun-o").tooltip("Radial Tree").on("click", () => this.layoutClick("RadialTree"));
    private _toggleD = new ToggleButton().faChar("fa-sitemap fa-rotate-270").tooltip("Dendrogram").on("click", () => this.layoutClick("Dendrogram"));
    private _toggleRD = new ToggleButton().faChar("fa-asterisk").tooltip("Radial Dendrogram").on("click", () => this.layoutClick("RadialDendrogram"));

    protected _graphData = new GraphCollection<VertexPlaceholder<V>, EdgePlaceholder<V, E>, SubgraphPlaceholder<SG>>()
        .idFunc(d => d.id)
        .sourceFunc(e => e.source.id)
        .targetFunc(e => e.target.id)
        .updateFunc((b: VertexPlaceholder<V> | EdgePlaceholder<V, E> | SubgraphPlaceholder<SG>, a: VertexPlaceholder<V> | EdgePlaceholder<V, E> | SubgraphPlaceholder<SG>) => {
            b.props = a.props;
            if (isEdgePlaceholder(a) && isEdgePlaceholder(b)) {
                b.source = a.source;
                b.target = a.target;
            }
            return b;
        })
        ;

    protected _prevDoClickTime: number = 0;

    protected _svgDefsAnn: any;
    protected _svgDefsCat: any;
    protected _subgraphG: Selection<SVGGElement, any, SVGGElement, any>;
    protected _edgeG: Selection<SVGGElement, any, SVGGElement, any>;
    protected _vertexG: Selection<SVGGElement, any, SVGGElement, any>;

    protected _tooltip: HTMLTooltip = new HTMLTooltip();

    protected _selection = new Utility.Selection(this);
    private _dragHandler = d3Drag<SVGGElement, VertexPlaceholder<V>, SVGGElement>();

    protected _catPalette = Palette.ordinal("hpcc10");
    _svgDefs: any;

    constructor(subgraphRenderer: RendererT<SG>, vertexRenderer: RendererT<V>, edgeRenderer: RendererT<E>) {
        super();
        this._subgraphRenderer = subgraphRenderer;
        this._vertexRenderer = vertexRenderer;
        this._edgeRenderer = edgeRenderer;
        const context = this;
        this._drawStartPos = "origin";

        const buttons: Widget[] = [
            this._toggleHierarchy,
            this._toggleForceDirected,
            this._toggleForceDirected2,
            this._toggleCircle,
            new Spacer(),
            this._toggleDot,
            this._toggleNeato,
            this._toggleFDP,
            this._toggleTwoPI,
            this._toggleCirco,
            new Spacer(),
            this._toggleT,
            this._toggleRT,
            this._toggleD,
            this._toggleRD,
            new Spacer()
        ];
        this._iconBar.buttons(buttons.concat(this._iconBar.buttons()));

        this.selectionGlowColor("navy");

        this._dragHandler
            .on("start", function (d) {
                if (context.allowDragging()) {
                    d3Select(this).classed("grabbed", true);
                    dragStart(d);
                    Utility.safeRaise(this);
                    context.moveVertexPlaceholder(d, false, true);

                    const selection = context.selection();
                    const isSelected = context.selected(d.props, selection as V[]);
                    if (isSelected) {
                        selection
                            .filter(v => v.id !== d.props.id)
                            .forEach(v => {
                                const n = context._graphData.vertex(v.id);
                                dragStart(n);
                            });
                    } else if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(n => {
                            dragStart(n);
                        });
                    }
                }
            })
            .on("drag", function (d) {
                if (context.allowDragging()) {
                    d.fx = d.sx + context.rproject(d3Event().x - d.sx);
                    d.fy = d.sy + context.rproject(d3Event().y - d.sy);
                    context._graphData.vertexEdges(d.id).forEach(e => delete e.points);
                    context.moveVertexPlaceholder(d, false, true);
                    const selection = context.selection();
                    const isSelected = context.selected(d.props, selection as V[]);

                    if (isSelected) {
                        selection
                            .filter(v => v.id !== d.props.id)
                            .forEach(v => {
                                const n = context._graphData.vertex(v.id);
                                dragTick(n, d);
                                context.moveVertexPlaceholder(n, false, true);
                            });
                    } else if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(n => {
                            dragTick(n, d);
                            context.moveVertexPlaceholder(n, false, true);
                        });
                    }
                }
            })
            .on("end", function (d) {
                let doClick = true;
                if (context.allowDragging()) {
                    doClick = Math.abs(d.sx - d.fx) < 1 && Math.abs(d.sy - d.fy) < 1;
                    dragEnd(d);

                    const selection = context.selection();
                    const isSelected = context.selected(d.props, selection as V[]);
                    if (isSelected) {
                        selection
                            .filter(v => v.id !== d.props.id)
                            .forEach(v => {
                                const n = context._graphData.vertex(v.id);
                                dragEnd(n);
                            });
                    } else if (context.dragSingleNeighbors()) {
                        context._graphData.singleNeighbors(d.id).forEach(dragEnd);
                    }

                    d3Select(this).classed("grabbed", false);
                }
                if (doClick) {
                    const event = d3Event();
                    context._selection.click({
                        _id: String(d.id),
                        element: () => d.element as any
                    }, event.sourceEvent);
                    context.selectionChanged();
                    const selected = d.element.classed("selected");
                    const eventOrigin = context.resolveEventOrigin();
                    if (event?.sourceEvent?.button === 2) {
                        context.vertex_contextmenu(d.props.origData || d.props, "", selected, eventOrigin);
                    } else {
                        context.vertex_click(d.props.origData || d.props, "", selected, eventOrigin);
                    }
                    const doClickTime = Date.now();
                    if (doClickTime - context._prevDoClickTime < context.doubleClickMaxDelay()) {
                        context.vertex_dblclick(d.props.origData || d.props, "", selected, eventOrigin);
                    }
                    context._prevDoClickTime = doClickTime;
                }
            })
            .filter(() => true)
            ;
    }

    resolveEventOrigin(): { origin: string, data?: SG | V | E } {
        const d3evt = d3Event();
        const eventPath = d3evt?.sourceEvent?.path ?? d3evt?.sourceEvent?.composedPath() ?? d3evt?.path ?? d3evt?.composedPath();
        const element = eventPath?.find(n => n?.hasAttribute && n?.hasAttribute("data-click"));
        const origin = element ? element.getAttribute("data-click") : "";
        const dataStr = element ? element.getAttribute("data-click-data") : "";
        let data = undefined;
        if (dataStr) {
            try {
                data = JSON.parse(dataStr);
            } catch (e) {
                console.warn("Unexpected annotation data:", dataStr);
            }
        }

        return {
            origin,
            data
        };
    }

    iconBarButtons(): Widget[] {
        return this._iconBar.buttons();
    }

    private _origData: GraphDataProps<SG, V, E> = {
        subgraphs: [],
        vertices: [],
        edges: [],
        hierarchy: []
    };
    data(): GraphDataProps<SG, V, E>;
    data(_: GraphDataProps<SG, V, E>, merge?: boolean): this;
    data(_?: GraphDataProps<SG, V, E>, merge?: boolean): GraphDataProps<SG, V, E> | this {
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

    selected(vertex: V, _?: Array<V>): boolean {
        return (_ || this.selection()).some(n => n.id === vertex.id);
    }

    selection(_: Array<V | SG | E>): this;
    selection(): Array<V | SG | E>;
    selection(_?: Array<V | SG | E>): Array<SG | V | E> | this {
        if (!arguments.length) return this._selection.get().map(item => this._graphData.item(item._id).props);
        this._selection.set(_.map(item => {
            const vp = this._graphData.item(item.id);
            return {
                _id: String(vp.id),
                element: () => vp.element as any
            };
        }));
        return this;
    }

    graphData(): GraphCollection<VertexPlaceholder<V>, EdgePlaceholder<V, E>> {
        return this._graphData;
    }

    resetLayout() {
        delete this._prevLayout;
        return this;
    }

    layoutRunning() {
        return this._layoutAlgo && this._layoutAlgo.running();
    }

    protected _layoutAlgo: ILayout = new Null(this);
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
                    this.zoomToFit(this.transitionDuration());
                }, this.transitionDuration());
            }
        });
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

    updateIconBarItem(tb: ToggleButton, tbLayout: GraphLayoutType) {
        const layout = this.layout();
        const running = this._layoutAlgo && this._layoutAlgo.running();
        tb.enabled(!running || layout === tbLayout).selected(running && layout === tbLayout).render();
    }

    updateIconBar() {
        super.updateIconBar();
        this.updateIconBarItem(this._toggleHierarchy, "Hierarchy");
        this.updateIconBarItem(this._toggleDot, "DOT");
        this.updateIconBarItem(this._toggleForceDirected, "ForceDirected");
        this.updateIconBarItem(this._toggleNeato, "Neato");
        this.updateIconBarItem(this._toggleFDP, "FDP");
        this.updateIconBarItem(this._toggleForceDirected2, "ForceDirected2");
        this.updateIconBarItem(this._toggleCircle, "Circle");
        this.updateIconBarItem(this._toggleTwoPI, "TwoPI");
        this.updateIconBarItem(this._toggleCirco, "Circo");
        this.updateIconBarItem(this._toggleT, "Tree");
        this.updateIconBarItem(this._toggleRT, "RadialTree");
        this.updateIconBarItem(this._toggleD, "Dendrogram");
        this.updateIconBarItem(this._toggleRD, "RadialDendrogram");
    }

    getNeighborMap(vertex: VertexPlaceholder<V>) {
        const vertices = {};
        const edges = {};

        if (vertex) {
            const nedges = this._graphData.vertexEdges(vertex.id);
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
        const vertexElements = this._vertexG.selectAll<SVGGElement, VertexPlaceholder<V>>(".graphVertex");
        const forceLabelOnHighlight = !context.showVertexLabels() && context.showVertexLabelsOnHighlight();
        vertexElements
            .classed("graphVertex-highlighted", d => !vertexMap || vertexMap[d.id])
            .style("filter", d => vertexMap && vertexMap[d.id] ? "url(#" + this.id() + "_glow)" : null)
            .each(function (d) {
                if (forceLabelOnHighlight) {
                    const props = context.calcProps(
                        {
                            showLabel: !!(vertexMap && vertexMap[d.id]),
                            ...context.vertexMapper(d.props, d.props.origData)
                        }
                    );
                    d.renderResult = context._vertexRenderer(props, this);
                }
            })
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

    highlightEdges(edgeMap?: { [id: string]: boolean }) {
        const context = this;
        const edgeElements = this._edgeG.selectAll<SVGGElement, EdgePlaceholder<V, E>>(".graphEdge");
        edgeElements
            .classed("graphEdge-highlighted", d => !edgeMap || edgeMap[d.id])
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

    highlightVertex(_element, d?: VertexPlaceholder<V>) {
        if (this.highlightOnMouseOverVertex()) {
            if (d) {
                const highlight = this.getNeighborMap(d);
                highlight.vertices[d.id] = d;
                this.highlightVerticies(highlight.vertices);
                this.highlightEdges(highlight.edges);
            } else {
                this.highlightVerticies();
                this.highlightEdges();
            }
        }
    }

    highlightEdge(_element, d?: EdgePlaceholder<V, E>) {
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
                this.highlightVerticies();
                this.highlightEdges();
            }
        }
    }

    moveSubgraphPlaceholder(sp: SubgraphPlaceholder<SG>, transition: boolean): this {
        const context = this;
        const x = this.project(sp.x);
        const y = this.project(sp.y);
        const width = this.project(sp.props.width, true);
        const height = this.project(sp.props.height, true);
        if (sp.element) {
            sp.element.transition().duration(transition ? this.transitionDuration() : 0)
                .attr("transform", `translate(${x} ${y})`)
                .each(function (d) {
                    context._subgraphRenderer({ ...d.props, width, height }, this);
                })
                ;
        }
        return this;
    }

    moveEdgePlaceholder(ep: EdgePlaceholder<V, E>, transition: boolean): this {
        const edgeLayout = {
            ...this._layoutAlgo.edgePath(ep as any, this.edgeArcDepth()),
        };
        const context = this;
        if (this._edgeRenderer && ep.element) {
            const previousEdgeLayout = (ep as any).previousEdgeLayout ?? edgeLayout;
            (ep as any).previousEdgeLayout = edgeLayout;
            const pathInterpolator = d3InterpolatePath(previousEdgeLayout.path, edgeLayout.path);
            const labelPosInterpolator = d3InterpolateNumberArray(previousEdgeLayout.labelPos, edgeLayout.labelPos);
            ep.element.transition().duration(transition ? this.transitionDuration() : 0)
                .tween("some.path", function () {
                    return function (t) {
                        const updated = {
                            path: pathInterpolator(t),
                            labelPos: labelPosInterpolator(t),
                            strokeWidth: ep.props.strokeWidth ?? context.edgeStrokeWidth(),
                            color: ep.props.stroke ?? context.edgeColor()
                        };
                        ep.renderResult = context._edgeRenderer({ graphInstance: context, ...edgeLayout, ...ep.props, ...updated }, ep.element.node());
                    };
                });
        }
        return this;
    }

    moveVertexPlaceholder(vp: VertexPlaceholder<V>, transition: boolean, moveNeighbours: boolean): this {
        const { x, y } = this.projectPlacholder(vp);
        if (vp.element) {
            (transition ? vp.element.transition().duration(this.transitionDuration()) as unknown as Selection<SVGPathElement, EdgePlaceholder<V, E>, SVGGElement, any> : vp.element)
                .attr("transform", `translate(${x} ${y})`)
                ;
        }
        if (moveNeighbours) {
            this._graphData.vertexEdges(vp.id).forEach(e => this.moveEdgePlaceholder(e, transition));
        }
        return this;
    }

    moveSubgraphs(transition: boolean): this {
        this._graphData.allSubgraphs().forEach(s => this.moveSubgraphPlaceholder(s, transition));
        return this;
    }

    moveEdges(transition: boolean): this {
        this._graphData.allEdges().forEach(e => this.moveEdgePlaceholder(e, transition));
        return this;
    }

    moveVertices(transition: boolean): this {
        this._graphData.allVertices().forEach(v => this.moveVertexPlaceholder(v, transition, false));
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
                scale = this.minScale() - (this._transformScale - this.minScale()) / 13;
            }
        }
        return Math.round(pos * scale * rf) / rf;
    }

    rproject(pos: number) {
        const rf = 10;
        pos = pos !== undefined ? pos : 0;
        return Math.round(pos / this._transformScale * rf) / rf;
    }

    projectPlacholder(vp: VertexPlaceholder<V>) {
        return {
            x: this.project(vp.fx !== undefined ? vp.fx : vp.x),
            y: this.project(vp.fy !== undefined ? vp.fy : vp.y),
        };
    }

    rprojectPlacholder(vp: VertexPlaceholder<V>) {
        return {
            x: this.rproject(vp.fx !== undefined ? vp.fx : vp.x),
            y: this.rproject(vp.fy !== undefined ? vp.fy : vp.y),
        };
    }

    categoryID(id: string | number, prefix: "cat" | "ann" = "cat"): string {
        return id === undefined || id === "" ? "" : `${prefix}${this.id()}_${id}`;
    }

    updateCategories() {
    }

    updateAnnotations() {
    }

    private _edgeRenderer: RendererT<E>;
    edgeRenderer(): RendererT<E>;
    edgeRenderer(_: RendererT<E>): this;
    edgeRenderer(_?: RendererT<E>): this | RendererT<E> {
        if (!arguments.length) return this._edgeRenderer;
        this._edgeRenderer = _;
        return this;
    }

    updateEdges(): this {
        const context = this;
        this._edgeG.selectAll(".graphEdge")
            .data(this._graphData.allEdges(), d => (d as EdgePlaceholder<V, E>).id)
            .join(
                enter => enter.append("g")
                    .attr("class", "graphEdge")
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: String(d.id),
                            element: () => d.element as any
                        }, d3Event());
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.edge_click(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseover", function (d) {
                        Utility.safeRaise(this);
                        context.edge_mouseover(d3Select(this), d);
                    })
                    .on("mouseout", function (d) {
                        context.edge_mouseout(d3Select(this), d);
                    })
                    .each(function (d) {
                        d.element = d3Select(this);
                        if (!context._edgeRenderer) {
                            d.elementPath = d.element.append("path");
                            d.elementText = d.element.append("text")
                                .attr("text-anchor", "middle")
                                ;
                        }
                    })
                ,
                update => update
                    .attr("opacity", d => d.source.props.hidden || d.target.props.hidden ? 0 : 1)
                    .classed("hide-text", !context.showEdgeLabels())
                ,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            ;
        return this;
    }

    private _vertexRenderer: RendererT<V>;
    vertexRenderer(): RendererT<V>;
    vertexRenderer(_: RendererT<V>): this;
    vertexRenderer(_?: RendererT<V>): this | RendererT<V> {
        if (!arguments.length) return this._vertexRenderer;
        this._vertexRenderer = _;
        return this;
    }

    vertexMapper(props: V, origRow: V): V {
        return {
            ...props,
            categoryID: this.categoryID(props.categoryID),
            annotationIDs: props.annotationIDs ? props.annotationIDs.map(a => this.categoryID(a, "ann")) : []
        };
    }

    updateVertices(): this {
        const context = this;
        this._vertexG.selectAll(".graphVertex")
            .data(this._graphData.allVertices(), d => (d as VertexPlaceholder<V>).id)
            .join(
                enter => enter.append("g")
                    .attr("class", "graphVertex")
                    .on("dblclick", function (this: SVGElement, d) {
                        d3Event().stopPropagation();
                    })
                    .on("contextmenu", function (this: SVGElement, d) {
                        d3Event().preventDefault();
                    })
                    .on("mousein", function (d) {
                        Utility.safeRaise(this);
                        context.highlightVertex(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        const eventOrigin = context.resolveEventOrigin();
                        context.vertex_mousein(d.props.origData || d.props, "", selected, eventOrigin);
                    })
                    .on("mouseover", function (d) {
                        Utility.safeRaise(this);
                        context.highlightVertex(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        if (d.props.tooltip) {
                            context._tooltip
                                .tooltipHTML(context.tooltipHTML.bind(context))
                                .triggerElement(d.element)
                                .tooltipWidth(context.tooltipWidth())
                                .tooltipHeight(context.tooltipHeight())
                                .enablePointerEvents(context.enableTooltipPointerEvents())
                                .closeDelay(context.tooltipCloseDelay())
                                .direction("n")
                                .data(d)
                                .visible(true)
                                .render()
                                ;
                        }
                        const eventOrigin = context.resolveEventOrigin();
                        context.vertex_mouseover(d.props.origData || d.props, "", selected, eventOrigin);
                    })
                    .on("mouseout", function (d) {
                        context.highlightVertex(null, null);
                        const selected = d.element.classed("selected");
                        const eventOrigin = context.resolveEventOrigin();
                        context.vertex_mouseout(d.props.origData || d.props, "", selected, eventOrigin);
                        if (d.props.tooltip) {
                            context._tooltip.mouseout();
                        }
                    })
                    .call((sel) => this._dragHandler(sel))
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
            .classed("centroid", d => d.props.centroid)
            .attr("opacity", d => d.props.hidden ? 0 : 1)
            .attr("filter", d => d.props.centroid ? "url(#" + this.id() + "_glow)" : null)
            .each(function (this: any, d) {
                const props = context.calcProps(
                    {
                        showLabel: context.showVertexLabels(),
                        ...context.vertexMapper(d.props, d.props.origData)
                    }
                );
                d.renderResult = context._vertexRenderer(props, this);
            })
            ;
        return this;
    }

    calcProps(props: V): V {
        return { ...props };
    }

    hasSubgraphs() {
        switch (this.layout()) {
            case "DOT":
            case "Hierarchy":
                return true;
        }
        return false;
    }

    private _subgraphRenderer: RendererT<SG>;
    subgraphRenderer(): RendererT<SG>;
    subgraphRenderer(_: RendererT<SG>): this;
    subgraphRenderer(_?: RendererT<SG>): this | RendererT<SG> {
        if (!arguments.length) return this._subgraphRenderer;
        this._subgraphRenderer = _;
        return this;
    }

    updateSubgraphs(): this {
        const context = this;
        this._subgraphG.selectAll(".subgraphPlaceholder")
            .data(this.hasSubgraphs() ? this._graphData.allSubgraphs() : [], d => (d as SubgraphPlaceholder<SG>).id)
            .join(
                enter => enter.append("g")
                    .attr("class", "subgraphPlaceholder")
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: String(d.id),
                            element: () => d.element as any
                        }, d3Event());
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.subgraph_click(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseover", function () {
                        Utility.safeRaise(this);
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

        this._tooltip.target(domNode);

        this.on("startMarqueeSelection", () => {
        }).on("updateMarqueeSelection", rect => {
            const vertices: VertexPlaceholder<V>[] = this._graphData.allVertices().filter(v => v.x >= rect.x && v.x <= rect.x + rect.width && v.y >= rect.y && v.y <= rect.y + rect.height);
            this.selection(vertices.map(v => v.props));
        }).on("endMarqueeSelection", () => {
            this.selectionChanged();
        });
    }

    protected forceDirectedOptions(): FDOptions {
        return {
            alpha: this.forceDirectedAlpha(),
            alphaMin: this.forceDirectedAlphaMin(),
            alphaDecay: this.forceDirectedAlphaDecay(),
            velocityDecay: this.forceDirectedVelocityDecay(),
            repulsionStrength: this.forceDirectedRepulsionStrength(),
            iterations: this.forceDirectedIterations(),
            linkDistance: this.forceDirectedLinkDistance(),
            linkStrength: this.forceDirectedLinkStrength(),
            pinCentroid: this.forceDirectedPinCentroid(),
            forceStrength: this.forceDirectedForceStrength(),
            distanceMin: this.forceDirectedMinDistance(),
            distanceMax: this.forceDirectedMaxDistance(),
        };
    }

    private layoutOptions(layout: GraphLayoutType) {
        switch (layout) {
            case "ForceDirected":
            case "ForceDirected2":
            case "ForceDirectedHybrid":
                return this.forceDirectedOptions();
            case "Hierarchy":
                return {
                    rankdir: this.hierarchyRankDirection(),
                    nodesep: this.hierarchyNodeSeparation(),
                    edgesep: this.hierarchyEdgeSeparation(),
                    ranksep: this.hierarchyRankSeparation(),
                    digraph: this.hierarchyDigraph()
                };
            case "Tree":
            case "Dendrogram":
                return { rankdir: this.treeRankDirection() };
            case "DOT":
            case "Neato":
            case "FDP":
            case "TwoPI":
            case "Circo":
                return new URL(this.wasmFolder() || scriptDir, document.baseURI).href;
            case "None":
            case "Circle":
            case "RadialTree":
            case "RadialDendrogram":
            default:
                return undefined;
        }
    }

    private _prevLayout: string;
    updateLayout() {
        const layout = this.layout();
        const options: any = this.layoutOptions(layout);
        const hash = hashSum([layout, options]);
        if (this._prevLayout !== hash) {
            this._prevLayout = hash;
            switch (layout) {
                case "None":
                    this.layoutAlgo(new Null(this));
                    break;
                case "Circle":
                    this.layoutAlgo(new Circle(this));
                    break;
                case "ForceDirected":
                    this.layoutAlgo(new ForceDirected(this, options));
                    break;
                case "ForceDirected2":
                    this.layoutAlgo(new ForceDirectedAnimated(this, options));
                    break;
                case "ForceDirectedHybrid":
                    this.layoutAlgo(new ForceDirected(this, options)).then(() => {
                        this.layoutAlgo(new ForceDirectedAnimated(this, options));
                    });
                    break;
                case "Hierarchy":
                    this.layoutAlgo(new Dagre(this, options));
                    break;
                case "DOT":
                    this.layoutAlgo(new Graphviz(this, "dot", options));
                    break;
                case "Tree":
                    this.layoutAlgo(new Tree(this, options));
                    break;
                case "RadialTree":
                    this.layoutAlgo(new RadialTree(this));
                    break;
                case "Dendrogram":
                    this.layoutAlgo(new Dendrogram(this, options));
                    break;
                case "RadialDendrogram":
                    this.layoutAlgo(new RadialDendrogram(this));
                    break;
                case "Neato":
                    this.layoutAlgo(new Graphviz(this, "neato", options));
                    break;
                case "FDP":
                    this.layoutAlgo(new Graphviz(this, "fdp", options));
                    break;
                case "TwoPI":
                    this.layoutAlgo(new Graphviz(this, "twopi", options));
                    break;
                case "Circo":
                    this.layoutAlgo(new Graphviz(this, "circo", options));
                    break;
            }
        }
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._renderElement.classed("allowDragging", this.allowDragging());
        if (this._centroidFilter) {
            this._centroidFilter.update(this.selectionGlowColor());
        }

        this.updateCategories();
        this.updateAnnotations();

        this.updateSubgraphs();
        this.updateVertices();
        this.updateEdges();
        this.moveEdges(false);

        this.updateLayout();

        this.updateIconBar();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
        this._tooltip.target(null);
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
    centroids(): VertexPlaceholder<V>[] {
        return this._graphData.allVertices().filter(vp => !!vp.props.centroid);
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

    tooltipHTML(data) {
        return data.props.tooltip;
    }

    subgraph_click(row, _col, sel) {
    }

    vertex_click(row, _col, sel, data) {
    }

    vertex_dblclick(row, _col, sel, data) {
    }

    vertex_contextmenu(row, _col, sel, data) {
    }

    vertex_mousein(row, _col, sel, data) {
    }

    vertex_mouseover(row, _col, sel, data) {
    }

    vertex_mouseout(row, _col, sel, data) {
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
GraphT.prototype._class += " graph_GraphT";

export interface GraphT<SG extends SubgraphBaseProps = any, V extends VertexBaseProps = any, E extends EdgeBaseProps<V> = any> {
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

    highlightSelectedPathToCentroid(): boolean;
    highlightSelectedPathToCentroid(_: boolean): this;
    edgeArcDepth(): number;
    edgeArcDepth(_: number): this;
    minScale(): number;
    minScale(_: number): this;
    maxScale(): number;
    maxScale(_: number): this;
    showEdgeLabels(): boolean;
    showEdgeLabels(_: boolean): this;
    showEdgeLabelsOnHighlight(): boolean;
    showEdgeLabelsOnHighlight(_: boolean): this;
    showVertexLabels(): boolean;
    showVertexLabels(_: boolean): this;
    showVertexLabelsOnHighlight(): boolean;
    showVertexLabelsOnHighlight(_: boolean): this;

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
    forceDirectedPinCentroid(): boolean;
    forceDirectedPinCentroid(_: boolean): this;
    forceDirectedForceStrength(): number;
    forceDirectedForceStrength(_: number): this;
    forceDirectedMinDistance(): number;
    forceDirectedMinDistance(_: number): this;
    forceDirectedMaxDistance(): number;
    forceDirectedMaxDistance(_: number): this;

    treeRankDirection(): "TB" | "LR";
    treeRankDirection(_: "TB" | "LR"): this;

    edgeColor(): string;
    edgeColor(_: string): this;
    edgeStrokeWidth(): number;
    edgeStrokeWidth(_: number): this;
    tooltipWidth(): number;
    tooltipWidth(_: number): this;
    tooltipHeight(): number;
    tooltipHeight(_: number): this;
    enableTooltipPointerEvents(): boolean;
    enableTooltipPointerEvents(_: boolean): this;
    tooltipCloseDelay(): number;
    tooltipCloseDelay(_: number): this;
    doubleClickMaxDelay(): number;
    doubleClickMaxDelay(_: number): this;

    wasmFolder(): string;
    wasmFolder(_: string): this;
}

GraphT.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices");
GraphT.prototype.publish("dragSingleNeighbors", true, "boolean", "Dragging a Vertex also moves its singleton neighbors");
GraphT.prototype.publish("layout", "ForceDirectedHybrid", "set", "Default Layout", GraphLayoutTypeSet);
GraphT.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"]);
GraphT.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout");
GraphT.prototype.publish("highlightOnMouseOverVertex", true, "boolean", "Highlight Vertex on Mouse Over");
GraphT.prototype.publish("highlightOnMouseOverEdge", true, "boolean", "Highlight Edge on Mouse Over");
GraphT.prototype.publish("transitionDuration", 250, "number", "Transition Duration");
GraphT.prototype.publish("showEdges", true, "boolean", "Show Edges");
GraphT.prototype.publish("showEdgeLabels", true, "boolean", "Show Edge labels");
GraphT.prototype.publish("showEdgeLabelsOnHighlight", true, "boolean", "Show Edge labels when highlighted");
GraphT.prototype.publish("showVertexLabels", true, "boolean", "Show Vertex labels");
GraphT.prototype.publish("showVertexLabelsOnHighlight", true, "boolean", "Show Vertex labels when highlighted");
GraphT.prototype.publish("snapToGrid", 0, "number", "Snap to Grid");
GraphT.prototype.publish("selectionClearOnBackgroundClick", false, "boolean", "Clear selection on background click");
GraphT.prototype.publish("edgeArcDepth", 8, "number", "Edge Arc Depth");
GraphT.prototype.publish("edgeColor", null, "html-color", "Edge line stroke color", null, { optional: true });
GraphT.prototype.publish("edgeStrokeWidth", 1, "number", "Edge line stroke width (pixels)");
GraphT.prototype.publish("minScale", 0.6, "number", "Min scale size for text");
GraphT.prototype.publish("maxScale", 1.0, "number", "Max scale size for text");
GraphT.prototype.publish("tooltipWidth", 256, "number", "Tooltip width (pixels)");
GraphT.prototype.publish("tooltipHeight", 128, "number", "Tooltip width (pixels)");
GraphT.prototype.publish("enableTooltipPointerEvents", false, "boolean", "If true, tooltip will use the style: 'pointer-events: all'");
GraphT.prototype.publish("tooltipCloseDelay", 0, "number", "Number of milliseconds to wait before closing tooltip (cancelled on tooltip mouseover event)");
GraphT.prototype.publish("doubleClickMaxDelay", 300, "number", "Number of milliseconds to wait before a subsequent click is not considered a double click");
GraphT.prototype.publish("highlightSelectedPathToCentroid", true, "boolean", "Highlight path to Center Vertex (for selected vertices)");

GraphT.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"], { disable: (w: GraphT) => w.layout() !== "Hierarchy" });
GraphT.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout", null, { disable: (w: GraphT) => w.layout() !== "Hierarchy" });
GraphT.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout", null, { disable: (w: GraphT) => w.layout() !== "Hierarchy" });
GraphT.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout", null, { disable: (w: GraphT) => w.layout() !== "Hierarchy" });
GraphT.prototype.publish("hierarchyDigraph", true, "boolean", "Directional GraphBase", null, { disable: (w: GraphT) => w.layout() !== "Hierarchy" });

GraphT.prototype.publish("forceDirectedAlpha", 1, "number", "Alpha", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedAlphaMin", 0.001, "number", "Min Alpha", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedAlphaDecay", 0.0228, "number", "Defaults to 1 - pow(alphaMin, 1 / 300)", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedRepulsionStrength", -350, "number", "Charge strength ", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedVelocityDecay", 0.4, "number", "Velocity Decay ", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedIterations", 300, "number", "Iterations", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedLinkDistance", 300, "number", "Target distance between linked nodes", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedLinkStrength", 1, "number", "Strength (rigidity) of links", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedPinCentroid", false, "boolean", "Pin centroid to center", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedForceStrength", 0, "number", "Strength of center force", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedMinDistance", 1, "number", "Min distance between nodes", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });
GraphT.prototype.publish("forceDirectedMaxDistance", Infinity, "number", "Max distance between nodes", null, { disable: (w: GraphT) => w.layout().indexOf("ForceDirected") !== 0 });

GraphT.prototype.publish("treeRankDirection", "LR", "set", "Direction for Rank Nodes", ["TB", "LR"], { disable: (w: GraphT) => w.layout() !== "Tree" && w.layout() !== "Dendrogram" });

GraphT.prototype.publish("wasmFolder", null, "string", "WASM Folder", null, { optional: true, disable: (w: GraphT) => ["DOT", "Neato", "FDP", "TwoPI", "Circo"].indexOf(w.layout()) < 0 });

const _origScale = GraphT.prototype.scale;
//  @ts-ignore  ---
GraphT.prototype.scale = function (_?, transitionDuration?) {
    const retVal = _origScale.apply(this, arguments as any);
    if (arguments.length) {
        this.zoomTo(_, transitionDuration);
    }
    return retVal;
};

export function graphviz(dot: string, engine: Engine = "dot", _scriptDir: string = scriptDir) {

    return gvWorker({
        items: [],
        links: [],
        raw: dot
    }, {
        engine: engine
    });
}
