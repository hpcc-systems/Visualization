import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { GraphLabel, graphlib, layout } from "@dagrejs/dagre";
import { GraphData } from "./GraphData.ts";

interface Pos {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export class Circle {

    protected pos: { [id: string]: Pos } = {};

    constructor(graphData: GraphData, width?, height?, radius?) {
        const context = this;
        this.pos = {};

        //  Initial Positions  ---
        const padding = 0;
        radius = radius || (width < height ? width - padding : height - padding) / 2;
        const order = graphData.nodeCount();
        let currStep = -Math.PI / 2;
        const step = 2 * Math.PI / order;
        graphData.eachNode(function (u, value) {
            const size = value.getBBox();
            const maxSize = 0; // Math.max(size.width, size.height);
            context.pos[u] = {
                x: value.fixed ? value.x : width / 2 + Math.cos(currStep) * (radius - maxSize),
                y: value.fixed ? value.y : height / 2 + Math.sin(currStep) * (radius - maxSize),
                width: size.width,
                height: size.height
            };
            currStep += step;
        });
    }

    nodePos(u) {
        return this.pos[u];
    }

    edgePoints(_e) {
        return [];
    }

}

export class None {

    protected pos: { [id: string]: Pos } = {};

    constructor(graphData: GraphData, _width, _height, _radius) {
        const context = this;
        this.pos = {};

        graphData.eachNode(function (u, value) {
            context.pos[u] = {
                x: value.x,
                y: value.y,
                width: value.width,
                height: value.height
            };
        });
    }

    nodePos(u) {
        return this.pos[u];
    }

    edgePoints(_e) {
        return [];
    }
}

export class ForceDirected {

    protected pos: { [id: string]: Pos } = {};
    vertices: any[] = [];
    protected vertexMap: { [id: string]: any } = {};
    protected edges: any[] = [];
    protected force: any;

    constructor(graphData: GraphData, width, height, options) {
        options = options || {};
        this.pos = {};
        this.vertices = [];
        this.vertexMap = {};

        graphData.eachNode(u => {
            const vertex = graphData.node(u);
            const size = vertex.getBBox();
            const newItem = {
                id: u,
                x: vertex.pos().x,
                y: vertex.pos().y,
                width: size.width,
                height: size.height,
                value: vertex
            };
            this.vertices.push(newItem);
            this.vertexMap[u] = newItem;
        });
        this.edges = [];
        graphData.eachEdge((_e, s, t) => {
            this.edges.push({
                source: s,
                target: t
            });
        });
        const forceLink = d3ForceLink()
            .id(function (d: any) {
                return d.id;
            })
            .distance(options.linkDistance)
            .strength(options.linkStrength)
            ;
        const forceManyBody = d3ForceManyBody()
            .strength(function (d: any) {
                const cs = d.value.getBBox();
                return options.charge * Math.max(cs.width, cs.height);
            })
            ;
        this.force = d3ForceSimulation()
            .force("link", forceLink)
            .force("charge", forceManyBody)
            .force("center", d3ForceCenter(width / 2, height / 2))
            .velocityDecay(options.oneShot ? 0.1 : options.friction)
            .nodes(this.vertices)
            ;
        forceLink
            .links(this.edges)
            ;

        if (options.oneShot) {
            this.force.restart();
            let total = graphData.nodeCount();
            total = Math.min(total * total, 500);
            for (let i = 0; i < total; ++i) {
                this.force.tick();
            }
            this.force.stop();
        }
    }

    nodePos(u) {
        return this.vertexMap[u];
    }

    edgePoints(_e) {
        return [];
    }
}

export class Hierarchy {

    protected digraph: any;
    protected dagreLayout: any;

    constructor(graphData: GraphData, _width, _height, options) {
        this.digraph = new graphlib.Graph({ multigraph: true, compound: true })
            .setGraph(options)
            .setDefaultNodeLabel(function () { return {}; })
            .setDefaultEdgeLabel(function () { return {}; })
            ;
        graphData.eachNode(u => {
            const value = graphData.node(u);
            const clientSize = value.getBBox();
            this.digraph.setNode(u, {
                width: clientSize.width,
                height: clientSize.height
            });
        });
        graphData.eachEdge((e, s, t) => {
            const value = graphData.edge(e);
            this.digraph.setEdge(s, t, {
                weight: value.weight()
            }, value._id);
            if (!options.digraph) {
                this.digraph.setEdge(t, s, {
                    weight: value.weight()
                }, value._id);
            }
        });
        graphData.eachNode(u => {
            this.digraph.setParent(u, graphData.parent(u));
        });

        this.dagreLayout = layout(this.digraph, { debugTiming: false } as GraphLabel);
        const deltaX = -this.digraph.graph().width / 2;
        const deltaY = -this.digraph.graph().height / 2;
        this.digraph.nodes().forEach(u => {
            const value = this.digraph.node(u);
            value.x += deltaX + _width / 2;
            value.y += deltaY + _height / 2;
        });
        this.digraph.edges().forEach(e => {
            const value = this.digraph.edge(e);
            for (let i = 0; i < value.points.length; ++i) {
                value.points[i].x += deltaX + _width / 2;
                value.points[i].y += deltaY + _height / 2;
            }
        });
        this.digraph = this.digraph;
    }

    nodePos(u) {
        return this.digraph.node(u);
    }

    edgePoints(edge) {
        return this.digraph.edge(edge._sourceVertex.id(), edge._targetVertex.id(), edge._id).points;
    }
}
