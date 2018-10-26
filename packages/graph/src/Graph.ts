import { IGraph, ITooltip } from "@hpcc-js/api";
import { ISize, Platform, Spacer, SVGZoomWidget, ToggleButton, Utility, Widget } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { event as d3Event, select as d3Select } from "d3-selection";
import "d3-transition";
import { Edge } from "./Edge";
import { GraphData } from "./GraphData";
import * as GraphLayouts from "./GraphLayouts";
import { Subgraph } from "./Subgraph";
import { Vertex } from "./Vertex";

import "../src/Graph.css";

export interface Lineage {
    parent: Widget;
    child: Widget;
}
export interface IGraphData {
    subgraphs?: Widget[];
    vertices: Widget[];
    edges: Edge[];
    hierarchy?: Lineage[];
}
export type GraphLayoutType = "Hierarchy" | "ForceDirected" | "ForceDirected2" | "Circle" | "None";

export class Graph extends SVGZoomWidget {
    static Subgraph = Subgraph;
    static Vertex = Vertex;
    static Edge = Edge;

    private _toggleHierarchy = new ToggleButton("fa-sitemap", "Hierarchy").on("click", () => this.layoutClick("Hierarchy"));
    private _toggleForceDirected = new ToggleButton("fa-expand", "Force Directed").on("click", () => this.layoutClick("ForceDirected"));
    private _toggleForceDirected2 = new ToggleButton("fa-arrows", "Spring").on("click", () => this.layoutClick("ForceDirected2"));
    private _toggleCircle = new ToggleButton("fa-circle-o", "Circle").on("click", () => this.layoutClick("Circle"));

    private _graphData: GraphData;
    protected highlight;
    protected _selection;
    protected _dragging;
    protected forceLayout;
    protected _d3Drag;
    protected defs;
    protected svgFragment;
    protected svg;
    protected svgC;
    protected svgE;
    protected svgV;

    constructor() {
        super();
        IGraph.call(this);
        ITooltip.call(this);
        this.tooltipHTML(function (d: any) {
            let content;
            if (d instanceof Subgraph) {
                content = d.title().replace("\n", "<br>");
            } else if (d instanceof Vertex || d instanceof Edge) {
                content = d.text().replace("\n", "<br>");
            }
            if (content) {
                return `<p style="text-align:center">${content}</p>`;
            }
            return null;
        });

        this._drawStartPos = "origin";

        const buttons: Widget[] = [
            this._toggleHierarchy,
            this._toggleForceDirected,
            this._toggleForceDirected2,
            this._toggleCircle,
            new Spacer()];
        this._iconBar.buttons(buttons.concat(this._iconBar.buttons()));

        this._graphData = new GraphData();
        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            edge: "1.25px"
        };
        this._selection = new Utility.Selection(this);
        this.zoomToFitLimit(1);
    }

    iconBarButtons(): Widget[] {
        return this._iconBar.buttons();
    }

    layoutClick(layout: GraphLayoutType) {
        this.layout(layout);
        if (layout !== "ForceDirected2") this.applyScaleOnLayout(true);
        this
            .layout(layout)
            .render(w => {
                this.applyScaleOnLayout(false);
            });
    }

    //  Properties  ---
    getOffsetPos() {
        return { x: 0, y: 0 };
    }

    size(): ISize;
    size(_): this;
    size(_?): ISize | this {
        const retVal = super.size.apply(this, arguments);
        return retVal;
    }

    clear() {
        this.data({ subgraphs: [], vertices: [], edges: [], hierarchy: [] }, false);
    }

    _dataHash = 0;
    data(): IGraphData;
    data(_: IGraphData, merge?: boolean): this;
    data(_?: IGraphData, merge?: boolean): IGraphData | this {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length) {
            if (!merge) {
                this._graphData = new GraphData();
                this._renderCount = 0;
            }
            const data = this._graphData.setData(_.subgraphs || [], _.vertices || [], _.edges || [], _.hierarchy || [], merge || false);
            if (data.addedVertices.length) {
                this._dataHash++;
            }

            const context = this;
            data.addedVertices.forEach(function (item) {
                item._graphID = context._id;
            });
            data.addedEdges.forEach(function (item) {
                item._graphID = context._id;
            });

            //  Recalculate edge arcs  ---
            const dupMap = {};
            this._graphData.edgeValues().forEach(function (item) {
                if (!dupMap[item._sourceVertex._id]) {
                    dupMap[item._sourceVertex._id] = {};
                }
                if (!dupMap[item._sourceVertex._id][item._targetVertex._id]) {
                    dupMap[item._sourceVertex._id][item._targetVertex._id] = 0;
                }
                const dupEdgeCount = ++dupMap[item._sourceVertex._id][item._targetVertex._id];
                item.arcDepth(16 * dupEdgeCount);
            });
        }
        return retVal;
    }

    graphData(): any {
        return this._graphData;
    }

    selection(_: Widget[]): this;
    selection(): Widget[];
    selection(_?: Widget[]): Widget[] | this {
        if (!arguments.length) return this._selection.get();
        this._selection.set(_);
        return this;
    }

    private _linkcolor: string;
    linkcolor_default(): string;
    linkcolor_default(_: string): this;
    linkcolor_default(_?: string): string | this {
        if (!arguments.length) return this._linkcolor;
        this._linkcolor = _;
        return this;
    }

    private _linktooltip: string;
    linktooltip_default(): string;
    linktooltip_default(_: string): this;
    linktooltip_default(_?: string): string | this {
        if (!arguments.length) return this._linktooltip;
        this._linktooltip = _;
        return this;
    }

    //  Drag  ---
    private _neighborOffsets: Array<{ neighbor: Vertex, offsetX: number, offsetY: number }> = [];
    dragstart(d) {
        if (this.allowDragging()) {
            d3Event.sourceEvent.stopPropagation();

            d.__drag_dx = d3Event.x - d.x();
            d.__drag_dy = d3Event.y - d.y();
            this._dragging = true;
            if (this.forceLayout) {
                if (!d3Event.active) this.forceLayout.force.alphaTarget(0.3).restart();
                const forceNode = this.forceLayout.vertexMap[d.id()];
                forceNode.fixed = true;
                forceNode.fx = forceNode.x;
                forceNode.fy = forceNode.y;
            }

            this._neighborOffsets = [];
            if (this.dragSingleNeighbors()) {
                this._neighborOffsets = this._graphData.singleNeighbors(d.id()).map(neighbor => {
                    d3Select(neighbor.target()).raise();
                    return {
                        neighbor,
                        offsetX: d.x() - neighbor.x(),
                        offsetY: d.y() - neighbor.y()
                    };
                });
            }

            //  Safe Raise - does not interfere with current click event  ---
            const target = d.target();
            let nextSibling = target.nextSibling;
            while (nextSibling) {
                target.parentNode.insertBefore(nextSibling, target);
                nextSibling = target.nextSibling;
            }

            if (Platform.svgMarkerGlitch) {
                this._graphData.nodeEdges(d.id()).forEach(function (id) {
                    const edge = this._graphData.edge(id);
                    this._pushMarkers(edge.element());
                });
            }
        }
    }

    dragging(d) {
        if (this.allowDragging()) {
            d3Event.sourceEvent.stopPropagation();
            d.move({ x: d3Event.x - d.__drag_dx, y: d3Event.y - d.__drag_dy });
            if (this.forceLayout) {
                const forceNode = this.forceLayout.vertexMap[d.id()];
                forceNode.fixed = true;
                forceNode.fx = d3Event.x - d.__drag_dx;
                forceNode.fy = d3Event.y - d.__drag_dy;
            }

            // Drag singleton child nodes
            this._neighborOffsets.forEach(neighborOffset => {
                const neighborX = d3Event.x - d.__drag_dx - neighborOffset.offsetX;
                const neighborY = d3Event.y - d.__drag_dy - neighborOffset.offsetY;
                if (this.forceLayout) {
                    const forceNode = this.forceLayout.vertexMap[neighborOffset.neighbor.id()];
                    forceNode.fixed = true;
                    forceNode.fx = neighborX;
                    forceNode.fy = neighborY;
                }
                neighborOffset.neighbor.move({ x: neighborX, y: neighborY });
            });

            this.refreshIncidentEdges(d, true);
        }
    }

    dragend(d) {
        if (this.allowDragging()) {
            d3Event.sourceEvent.stopPropagation();
            this._dragging = false;
            if (this.snapToGrid()) {
                const snapLoc = d.calcSnap(this.snapToGrid());
                d.move(snapLoc[0]);
                this.refreshIncidentEdges(d, true);
            }
            if (this.forceLayout) {
                const forceNode = this.forceLayout.vertexMap[d.id()];
                forceNode.fixed = false;
                forceNode.fx = null;
                forceNode.fy = null;

                this._neighborOffsets.forEach(neighborOffset => {
                    const forceNode = this.forceLayout.vertexMap[neighborOffset.neighbor.id()];
                    forceNode.fixed = false;
                    forceNode.fx = null;
                    forceNode.fy = null;
                });
            }
            this._neighborOffsets = [];

            if (Platform.svgMarkerGlitch) {
                this._graphData.nodeEdges(d.id()).forEach(function (id) {
                    const edge = this._graphData.edge(id);
                    this._popMarkers(edge.element());
                });
            }
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._d3Drag = d3Drag()
            // .origin(function (d) {
            //    return d.pos();
            // })
            .on("start", d => this.dragstart(d))
            .on("end", d => this.dragend(d))
            .on("drag", d => this.dragging(d))
            ;
        //  SVG  ---
        this.defs = this._renderElement.append("defs");
        this.addMarkers();

        // element.call(this.zoom);
        this.svg = this._renderElement.append("svg:g");
        // this._svgBrush = this.svg.append("g").attr("class", "selectionBrush").call(this.brush);
        // this._svgBrush.select(".background").style("cursor", null);
        // context._svgBrush.call(context.brush.clear());
        this.svgC = this.svg.append("g").attr("id", this._id + "C");
        this.svgE = this.svg.append("g").attr("id", this._id + "E");
        this.svgV = this.svg.append("g").attr("id", this._id + "V");
    }

    getBounds(items, layoutEngine?) {
        const vBounds = [[null, null], [null, null]];
        items.forEach(function (item) {
            const pos = layoutEngine ? layoutEngine.nodePos(item._id) : { x: item.x(), y: item.y(), width: item.width(), height: item.height() };
            const leftX = pos.x - pos.width / 2;
            const rightX = pos.x + pos.width / 2;
            const topY = pos.y - pos.height / 2;
            const bottomY = pos.y + pos.height / 2;
            if (vBounds[0][0] === null || vBounds[0][0] > leftX) {
                vBounds[0][0] = leftX;
            }
            if (vBounds[0][1] === null || vBounds[0][1] > topY) {
                vBounds[0][1] = topY;
            }
            if (vBounds[1][0] === null || vBounds[1][0] < rightX) {
                vBounds[1][0] = rightX;
            }
            if (vBounds[1][1] === null || vBounds[1][1] < bottomY) {
                vBounds[1][1] = bottomY;
            }
        });
        return vBounds;
    }

    getVertexBounds(layoutEngine) {
        return this.getBounds(this._graphData.nodeValues(), layoutEngine);
    }

    getSelectionBounds(layoutEngine) {
        return this.getBounds(this._selection.get(), layoutEngine);
    }

    centerOn(bounds, transitionDuration?) {
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const translate = [x, y];
        this.zoomTo(translate, 1, transitionDuration);
    }

    centerOnItem(item: Widget) {
        const bbox = item.getBBox(true);
        const deltaX = bbox.x + bbox.width / 2;
        const deltaY = bbox.y + bbox.height / 2;
        const itemBBox = {
            x: item.x() + deltaX - bbox.width / 2,
            y: item.y() + deltaY - bbox.height / 2,
            width: bbox.width,
            height: bbox.height
        };
        this.centerOnBBox(itemBBox);
    }

    zoomToItem(item: Widget) {
        const bbox = item.getBBox(true);
        const deltaX = bbox.x + bbox.width / 2;
        const deltaY = bbox.y + bbox.height / 2;
        const itemBBox = {
            x: item.x() + deltaX - bbox.width / 2,
            y: item.y() + deltaY - bbox.height / 2,
            width: bbox.width,
            height: bbox.height
        };
        this.zoomToBBox(itemBBox);
    }

    //  Render  ---
    updateVertices(rootElement, rootSuffix, data) {
        const width = this.width();
        const height = this.height();
        const context = this;

        const vertexElements = rootElement.selectAll("#" + this._id + rootSuffix + " > .graphVertex").data(data, function (d) { return d.id(); });
        vertexElements.enter().append("g")
            .attr("class", "graphVertex")
            .style("opacity", 1e-6)
            //  TODO:  Events need to be optional  ---
            .on("click.selectionBag", function (d) {
                context._selection.click(d, d3Event);
            })
            .on("click", function (this: SVGElement, d) {
                const vertexElement = d3Select(this).select(".graph_Vertex");
                let selected = false;
                if (!vertexElement.empty()) {
                    selected = vertexElement.classed("selected");
                }
                context.vertex_click(context.rowToObj(d.data()), "", selected, {
                    vertex: d
                });
            })
            .on("dblclick", function (this: SVGElement, d) {
                const vertexElement = d3Select(this).select(".graph_Vertex");
                let selected = false;
                if (!vertexElement.empty()) {
                    selected = vertexElement.classed("selected");
                }
                context.vertex_dblclick(context.rowToObj(d.data()), "", selected, {
                    vertex: d
                });
            })
            .on("contextmenu", function (this: SVGElement, d) {
                const vertexElement = d3Select(this).select(".graph_Vertex");
                let selected = false;
                if (!vertexElement.empty()) {
                    selected = vertexElement.classed("selected");
                }
                context.vertex_contextmenu(context.rowToObj(d.data()), "", selected, {
                    vertex: d
                });
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            .on("mouseover", function (this: SVGElement, d) {
                if (context._dragging)
                    return;
                context.vertex_mouseover(d3Select(this), d);
            })
            .on("mouseout", function (this: SVGElement, d) {
                if (context._dragging)
                    return;
                context.vertex_mouseout(d3Select(this), d);
            })
            .each(createV)
            .transition()
            .duration(750)
            .style("opacity", 1)
            ;
        function createV(this: SVGElement, d) {
            d3Select(this).style("cursor", context.allowDragging() ? "move" : "pointer");
            d
                .target(this)
                .pos({ x: d.x() || width / 2, y: d.y() || height / 2 })
                .animationFrameRender()
                ;
            if (context.allowDragging()) {
                d3Select(this)
                    .call(context._d3Drag)
                    ;
            }
            if (d.dispatch) {
                d.dispatch.on("sizestart", function (d2) {
                    d2.allowResize(context.allowDragging());
                    if (context.allowDragging()) {
                        context._dragging = true;
                    }
                });
                d.dispatch.on("size", function (d2) {
                    context.refreshIncidentEdges(d2, false);
                });
                d.dispatch.on("sizeend", function (d2) {
                    context._dragging = false;
                    if (context.snapToGrid()) {
                        const snapLoc = d2.calcSnap(context.snapToGrid());
                        d2
                            .pos(snapLoc[0])
                            .size(snapLoc[1])
                            .render()
                            ;
                        context.refreshIncidentEdges(d2, false);
                    }
                });
            }
        }

        vertexElements
            .each(updateV)
            ;
        function updateV(d) {
            d
                .animationFrameRender()
                ;
        }

        vertexElements.exit()
            .each(function (d) {
                d.target(null);
            })
            .remove()
            ;

        vertexElements.order();
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.tooltip.hide();

        //  IconBar  ---
        const layout = this.layout();
        this._toggleHierarchy.selected(layout === "Hierarchy").render();
        this._toggleForceDirected.selected(layout === "ForceDirected").render();
        this._toggleForceDirected2.selected(layout === "ForceDirected2").render();
        this._toggleCircle.selected(layout === "Circle").render();

        //  Create  ---
        const context = this;

        this.updateVertices(this.svgC, "C", this._graphData.nodeValues().filter(v => this.layout() === "Hierarchy" ? (v instanceof Subgraph) : false));
        this.updateVertices(this.svgV, "V", this._graphData.nodeValues().filter(v => !(v instanceof Subgraph)));

        const edgeElements = this.svgE.selectAll("#" + this._id + "E > .graphEdge").data(this.showEdges() ? this._graphData.edgeValues() : [], function (d) { return d.id(); });
        edgeElements.enter().append("g")
            .attr("class", "graphEdge")
            .style("opacity", 1e-6)
            .on("click.selectionBag", function (d) {
                context._selection.click(d, d3Event);
            })
            .on("click", function (this: SVGElement, d) {
                const edgeElement = d3Select(this).select(".graph_Edge");
                let selected = false;
                if (!edgeElement.empty()) {
                    selected = edgeElement.classed("selected");
                }
                context.edge_click(context.rowToObj(d.data()), "", selected, {
                    edge: d
                });
            })
            .on("dblclick", function (this: SVGElement, d) {
                const edgeElement = d3Select(this).select(".graph_Edge");
                let selected = false;
                if (!edgeElement.empty()) {
                    selected = edgeElement.classed("selected");
                }
                context.edge_dblclick(context.rowToObj(d.data()), "", selected, {
                    edge: d
                });
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            .on("mouseover", function (this: SVGElement, d) {
                if (context._dragging)
                    return;
                context.edge_mouseover(d3Select(this), d);
            })
            .on("mouseout", function (this: SVGElement, d) {
                if (context._dragging)
                    return;
                context.edge_mouseout(d3Select(this), d);
            })
            .each(createE)
            .transition()
            .duration(750)
            .style("opacity", 1)
            ;
        function createE(this: SVGElement, d) {
            d
                .target(this)
                .animationFrameRender()
                ;
        }

        edgeElements
            .each(updateE)
            ;
        function updateE(d) {
            d
                .animationFrameRender()
                ;
        }

        edgeElements.exit()
            .each(function (d) {
                d.target(null);
            })
            .remove()
            ;

        if (!this._renderCount) {
            this._renderCount++;
            this.layout(this.layout());
        }
    }

    static profileID = 0;
    render(callback?: (w: Widget) => void): this {
        this.progress("start");
        super.render(w => {
            this.doLayout().then(() => {
                this.progress("end");
                if (callback) {
                    callback(w);
                }
            });
        });
        return this;
    }

    //  Methods  ---
    _prevLayout;
    _prevDataHash;
    doLayout(transitionDuration = 0): Promise<void> {
        return new Promise((resolve, reject) => {
            requestAnimationFrame(() => {
                if (this._prevLayout !== this.layout() || this._prevDataHash !== this._dataHash) {
                    this._prevLayout = this.layout();
                    this._prevDataHash = this._dataHash;
                    this._doLayout(transitionDuration).then(() => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    _doLayout(transitionDuration = 0): Promise<void> {
        return new Promise((resolve, reject) => {
            this.progress("layout-start");
            if (this.forceLayout) {
                this.forceLayout.force.stop();
                this.forceLayout = null;
            }

            const context = this;
            const layoutEngine = this.getLayoutEngine();
            if (this.layout() === "ForceDirected2") {
                this.forceLayout = layoutEngine;
                this.forceLayout.force
                    .on("tick", function (this: SVGElement) {
                        context.progress("layout-tick");
                        layoutEngine.vertices.forEach(function (item) {
                            if (item.fixed) {
                                // item.x = item.px;
                                // item.y = item.py;
                            } else {
                                // item.px = item.x;
                                // item.py = item.y;

                                //  Might have been cleared ---
                                const vertex = context._graphData.node(item.id);
                                if (vertex) {
                                    vertex
                                        .move({ x: item.x, y: item.y })
                                        ;
                                }
                            }
                        });
                        context._graphData.edgeValues().forEach(function (item) {
                            item
                                .points([], false, false)
                                ;
                        });
                        if (context.applyScaleOnLayout()) {
                            // const vBounds = context.getVertexBounds(layoutEngine);
                            // context.shrinkToFit(vBounds);
                        }
                    })
                    .on("end", function (this: SVGElement) {
                        context.progress("layout-end");
                    })
                    ;
                this.forceLayout.force.restart();
                resolve();
            } else if (layoutEngine) {
                this.forceLayout = null;
                context._dragging = true;
                context._graphData.nodeValues().forEach(function (item) {
                    const pos = layoutEngine.nodePos(item._id);
                    if (item instanceof Graph.Subgraph) {
                        item
                            .pos({ x: pos.x, y: pos.y })
                            .size({ width: pos.width, height: pos.height })
                            .animationFrameRender()
                            ;
                    } else {
                        item.move({ x: pos.x, y: pos.y }, 0);
                    }
                });
                context._graphData.edgeValues().forEach(function (item) {
                    const points = layoutEngine.edgePoints(item);
                    item.points(points, transitionDuration);
                });
                if (context.applyScaleOnLayout()) {
                    requestAnimationFrame(() => {
                        context.zoomToFit();
                        resolve();
                    });
                }
                this._fixIEMarkers();
                setTimeout(function () {
                    context._dragging = false;
                }, transitionDuration ? transitionDuration + 50 : 50);  //  Prevents highlighting during morph  ---
                this.progress("layout-end");
                if (!context.applyScaleOnLayout()) {
                    resolve();
                }
            }
        });
    }

    getLayoutEngine() {
        switch (this.layout()) {
            case "Circle":
                return new GraphLayouts.Circle(this._graphData, this._size.width, this._size.height);
            case "ForceDirected":
                return new GraphLayouts.ForceDirected(this._graphData, this._size.width, this._size.height, {
                    oneShot: true,
                    linkDistance: this.forceDirectedLinkDistance(),
                    linkStrength: this.forceDirectedLinkStrength(),
                    friction: this.forceDirectedFriction(),
                    charge: this.forceDirectedCharge(),
                    chargeDistance: this.forceDirectedChargeDistance(),
                    theta: this.forceDirectedTheta(),
                    gravity: this.forceDirectedGravity()
                });
            case "ForceDirected2":
                return new GraphLayouts.ForceDirected(this._graphData, this._size.width, this._size.height, {
                    linkDistance: this.forceDirectedLinkDistance(),
                    linkStrength: this.forceDirectedLinkStrength(),
                    friction: this.forceDirectedFriction(),
                    charge: this.forceDirectedCharge(),
                    chargeDistance: this.forceDirectedChargeDistance(),
                    theta: this.forceDirectedTheta(),
                    gravity: this.forceDirectedGravity()
                });
            case "Hierarchy":
                return new GraphLayouts.Hierarchy(this._graphData, this._size.width, this._size.height, {
                    rankdir: this.hierarchyRankDirection(),
                    nodesep: this.hierarchyNodeSeparation(),
                    edgesep: this.hierarchyEdgeSeparation(),
                    ranksep: this.hierarchyRankSeparation(),
                    digraph: this.hierarchyDigraph()
                });
            default:
        }
        return null; // new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    }

    getNeighborMap(vertex) {
        const vertices = {};
        const edges = {};

        if (vertex) {
            const nedges = this._graphData.nodeEdges(vertex.id());
            for (let i = 0; i < nedges.length; ++i) {
                const edge = this._graphData.edge(nedges[i]);
                edges[edge.id()] = edge;
                if (edge._sourceVertex.id() !== vertex.id()) {
                    vertices[edge._sourceVertex.id()] = edge._sourceVertex;
                }
                if (edge._targetVertex.id() !== vertex.id()) {
                    vertices[edge._targetVertex.id()] = edge._targetVertex;
                }
            }
        }

        return {
            vertices,
            edges
        };
    }

    highlightVerticies(vertexMap?: { [id: string]: boolean }) {
        const context = this;
        const vertexElements = this.svgV.selectAll(".graphVertex");
        vertexElements
            .classed("graphVertex-highlighted", d => !vertexMap || vertexMap[d.id()])
            .style("filter", d => vertexMap && vertexMap[d.id()] ? "url(#" + this.id() + "_glow)" : null)
            .transition().duration(this.transitionDuration())
            .on("end", function (d) {
                if (vertexMap && vertexMap[d.id()]) {
                    if (d._placeholderElement.node() && d._placeholderElement.node().parentNode) {
                        d._placeholderElement.node().parentNode.appendChild(d._placeholderElement.node());
                    }
                }
            })
            .style("opacity", function (d) {
                if (!vertexMap || vertexMap[d.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
            ;
        return this;
    }

    highlightEdges(edgeMap) {
        const context = this;
        const edgeElements = this.svgE.selectAll(".graphEdge");
        edgeElements
            .classed("graphEdge-highlighted", function (d) { return !edgeMap || edgeMap[d.id()]; })
            .style("stroke-width", function (o) {
                if (edgeMap && edgeMap[o.id()]) {
                    return context.highlight.edge;
                }
                return "1px";
            }).transition().duration(this.transitionDuration())
            .style("opacity", function (o) {
                if (!edgeMap || edgeMap[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
            ;
        return this;
    }

    highlightVertex(_element, d) {
        if (this.highlightOnMouseOverVertex()) {
            if (d) {
                const highlight = this.getNeighborMap(d);
                highlight.vertices[d.id()] = d;
                this.highlightVerticies(highlight.vertices);
                this.highlightEdges(highlight.edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    }

    highlightEdge(_element, d) {
        if (this.highlightOnMouseOverEdge()) {
            if (d) {
                const vertices = {};
                vertices[d._sourceVertex.id()] = d._sourceVertex;
                vertices[d._targetVertex.id()] = d._targetVertex;
                const edges = {};
                edges[d.id()] = d;
                this.highlightVerticies(vertices);
                this.highlightEdges(edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    }

    refreshIncidentEdges(d, skipPushMarkers) {
        const context = this;
        this._graphData.nodeEdges(d.id()).forEach(function (id) {
            const edge = context._graphData.edge(id);
            edge
                .points([], false, skipPushMarkers)
                ;
        });
    }

    //  Events  ---
    graph_selection(_selection) {
    }

    vertex_click(_row, _col, _sel, more) {
        if (more && more.vertex) {
            more.vertex._placeholderElement.node().parentNode.appendChild(more.vertex._placeholderElement.node());
        }
        IGraph.prototype.vertex_click.apply(this, arguments);
    }

    vertex_dblclick(_row, _col, _sel, _opts) {
    }

    vertex_contextmenu(_row, _col, _sel, _opts) {
    }

    vertex_mouseover(element, d) {
        this.highlightVertex(element, d);
    }

    vertex_mouseout(_element, _d) {
        this.highlightVertex(null, null);
    }

    edge_mouseover(element, d) {
        this.highlightEdge(element, d);
    }

    edge_mouseout(_element, _d) {
        this.highlightEdge(null, null);
    }

    addMarkers(clearFirst: boolean = false) {
        if (clearFirst) {
            this.defs.select("#" + this._id + "_arrowHead").remove();
            this.defs.select("#" + this._id + "_circleFoot").remove();
            this.defs.select("#" + this._id + "_circleHead").remove();
            this.defs.select("#" + this._id + "_glow").remove();
        }
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
            .attr("points", "0,0 10,5 0,10 1,5")
            ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_circleFoot")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 1)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 4)
            ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_circleHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 9)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 4)
            ;
        const filter = this.defs.append("filter")
            .attr("id", this._id + "_glow")
            .attr("width", "130%")
            .attr("height", "130%")
            ;
        filter.append("feOffset")
            .attr("result", "offOut")
            .attr("in", "SourceGraphic")
            .attr("dx", "0")
            .attr("dy", "0")
            ;
        filter.append("feColorMatrix")
            .attr("result", "matrixOut")
            .attr("in", "offOut")
            .attr("type", "matrix")
            .attr("values", "0.2 0 0 0 0 0 0.2 0 0 1 0 0 0.2 0 0 0 0 0 1 0")
            ;
        filter.append("feGaussianBlur")
            .attr("result", "blurOut")
            .attr("in", "matrixOut")
            .attr("stdDeviation", "3")
            ;
        filter.append("feBlend")
            .attr("in", "SourceGraphic")
            .attr("in2", "blurOut")
            .attr("mode", "normal")
            ;
    }

    //  IGraph  ---
    edge_click: (_row, _col, _sel, _more) => void;
    edge_dblclick: (_row, _col, _sel, _more) => void;

    //  ITooltip  ---
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;

    //  Progess Events ---
    progress(what: "start" | "end" | "layout-start" | "layout-tick" | "layout-end") {
    }
}
Graph.prototype._class += " graph_Graph";
Graph.prototype.implements(IGraph.prototype);
Graph.prototype.implements(ITooltip.prototype);

export interface Graph {
    allowDragging(): boolean;
    allowDragging(_: boolean): this;
    dragSingleNeighbors(): boolean;
    dragSingleNeighbors(_: boolean): this;
    layout(): GraphLayoutType;
    layout(_: GraphLayoutType): this;
    // scale: { (): string; (_: string): this; };
    applyScaleOnLayout(): boolean;
    applyScaleOnLayout(_: boolean): this;
    highlightOnMouseOverVertex(): boolean;
    highlightOnMouseOverVertex(_: boolean): this;
    highlightOnMouseOverEdge(): boolean;
    highlightOnMouseOverEdge(_: boolean): this;
    transitionDuration(): number;
    transitionDuration(_: number): this;
    showEdges(): boolean;
    showEdges(_: boolean): this;
    snapToGrid(): number;
    snapToGrid(_: number): this;

    hierarchyRankDirection(): string;
    hierarchyRankDirection(_: string): this;
    hierarchyNodeSeparation(): number;
    hierarchyNodeSeparation(_: number): this;
    hierarchyEdgeSeparation(): number;
    hierarchyEdgeSeparation(_: number): this;
    hierarchyRankSeparation(): number;
    hierarchyRankSeparation(_: number): this;
    hierarchyDigraph(): boolean;
    hierarchyDigraph(_: boolean): this;

    forceDirectedLinkDistance(): number;
    forceDirectedLinkDistance(_: number): this;
    forceDirectedLinkStrength(): number;
    forceDirectedLinkStrength(_: number): this;
    forceDirectedFriction(): number;
    forceDirectedFriction(_: number): this;
    forceDirectedCharge(): number;
    forceDirectedCharge(_: number): this;
    forceDirectedChargeDistance(): number;
    forceDirectedChargeDistance(_: number): this;
    forceDirectedTheta(): number;
    forceDirectedTheta(_: number): this;
    forceDirectedGravity(): number;
    forceDirectedGravity(_: number): this;
}

Graph.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices", null, { tags: ["Advanced"] });
Graph.prototype.publish("dragSingleNeighbors", false, "boolean", "Dragging a Vertex also moves its singleton neighbors", null, { tags: ["Advanced"] });
Graph.prototype.publish("layout", "Circle", "set", "Default Layout", ["Circle", "ForceDirected", "ForceDirected2", "Hierarchy", "None"], { tags: ["Basic"] });
Graph.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"], { tags: ["Basic"] });
Graph.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout", null, { tags: ["Basic"] });
Graph.prototype.publish("highlightOnMouseOverVertex", false, "boolean", "Highlight Vertex on Mouse Over", null, { tags: ["Basic"] });
Graph.prototype.publish("highlightOnMouseOverEdge", false, "boolean", "Highlight Edge on Mouse Over", null, { tags: ["Basic"] });
Graph.prototype.publish("transitionDuration", 250, "number", "Transition Duration", null, { tags: ["Intermediate"] });
Graph.prototype.publish("showEdges", true, "boolean", "Show Edges", null, { tags: ["Intermediate"] });
Graph.prototype.publish("snapToGrid", 0, "number", "Snap to Grid", null, { tags: ["Private"] });

Graph.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"], { tags: ["Advanced"] });
Graph.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout", null, { tags: ["Advanced"] });
Graph.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout", null, { tags: ["Advanced"] });
Graph.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout", null, { tags: ["Advanced"] });
Graph.prototype.publish("hierarchyDigraph", true, "boolean", "Directional Graph", null, { tags: ["Advanced"] });

Graph.prototype.publish("forceDirectedLinkDistance", 300, "number", "Target distance between linked nodes", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedLinkStrength", 1, "number", "Strength (rigidity) of links", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedFriction", 0.9, "number", "Friction coefficient", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedCharge", -25, "number", "Charge strength ", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedChargeDistance", 10000, "number", "Maximum distance over which charge forces are applied", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedTheta", 0.8, "number", "Barnes–Hut approximation criterion", null, { tags: ["Advanced"] });
Graph.prototype.publish("forceDirectedGravity", 0.1, "number", "Gravitational strength", null, { tags: ["Advanced"] });

const _origScale = Graph.prototype.scale;
Graph.prototype.scale = function (_?, transitionDuration?) {
    const retVal = _origScale.apply(this, arguments);
    if (arguments.length) {
        this.zoomTo(_, transitionDuration);
    }
    return retVal;
};
