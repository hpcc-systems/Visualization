import { BBox } from "@hpcc-js/common";
import { graphviz } from "@hpcc-js/wasm";
import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { GraphLabel, graphlib, layout } from "dagre";
import { GraphData } from "./GraphData";

export class Layout {
    pos = {};
}

export class Circle extends Layout {

    constructor(graphData: GraphData, width?, height?, radius?) {
        super();

        //  Initial Positions  ---
        const padding = 0;
        radius = radius || (width < height ? width - padding : height - padding) / 2;
        const order = graphData.nodeCount();
        let currStep = -Math.PI / 2;
        const step = 2 * Math.PI / order;
        graphData.eachNode((u, value) => {
            const size = value.getBBox();
            const maxSize = 0; // Math.max(size.width, size.height);
            this.pos[u] = {
                x: value.fixed ? value.x : width / 2 + Math.cos(currStep) * (radius - maxSize),
                y: value.fixed ? value.y : height / 2 + Math.sin(currStep) * (radius - maxSize),
                width: size.width,
                height: size.height
            };
            currStep += step;
        });
    }

    layout(): Promise<void> {
        return Promise.resolve();
    }

    nodePos(u) {
        return this.pos[u];
    }

    edgePoints(_e) {
        return [];
    }
}

export class None extends Layout {

    constructor(graphData: GraphData, _width, _height, _radius) {
        super();

        graphData.eachNode((u, value) => {
            this.pos[u] = {
                x: value.x,
                y: value.y,
                width: value.width,
                height: value.height
            };
        });
    }

    layout(): Promise<void> {
        return Promise.resolve();
    }

    nodePos(u) {
        return this.pos[u];
    }

    edgePoints(_e) {
        return [];
    }
}

export class ForceDirected extends Layout {
    vertices: any[];
    vertexMap: {};
    edges: any[];
    force: any;

    constructor(graphData: GraphData, width, height, options) {
        super();
        options = options || {};

        this.vertices = [];
        this.vertexMap = {};
        graphData.eachNode((u, vertex) => {
            // const vertex = graphData.node(u);
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
            .id((d: any) => {
                return d.id;
            })
            .distance(options.linkDistance)
            .strength(options.linkStrength)
            ;
        const forceManyBody = d3ForceManyBody()
            .strength((d: any) => {
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

    layout(): Promise<void> {
        return Promise.resolve();
    }

    nodePos(u) {
        return this.vertexMap[u];
    }

    edgePoints(_e) {
        return [];
    }
}

export class Hierarchy extends Layout {
    dagreLayout: void;
    private digraph: graphlib.Graph;

    constructor(graphData: GraphData, _width, _height, options) {
        super();
        const digraph = new graphlib.Graph({ multigraph: true, compound: true })
            .setGraph(options)
            .setDefaultNodeLabel(() => ({}))
            .setDefaultEdgeLabel(() => ({}))
            ;
        graphData.eachNode((u, value) => {
            // const value = graphData.node(u);
            const clientSize = value.getBBox();
            digraph.setNode(u, {
                width: clientSize.width,
                height: clientSize.height
            });
        });
        graphData.eachEdge((e, s, t) => {
            const value = graphData.edge(e);
            digraph.setEdge(s, t, {
                weight: value.weight()
            }, value._id);
            if (!options.digraph) {
                digraph.setEdge(t, s, {
                    weight: value.weight()
                }, value._id);
            }
        });
        graphData.eachNode((u) => {
            digraph.setParent(u, graphData.parent(u));
        });
        this.dagreLayout = layout(digraph, { debugTiming: false } as GraphLabel);
        const deltaX = -digraph.graph().width / 2;
        const deltaY = -digraph.graph().height / 2;
        digraph.nodes().forEach((u) => {
            const value = digraph.node(u);
            value.x += deltaX + _width / 2;
            value.y += deltaY + _height / 2;
        });
        digraph.edges().forEach((e) => {
            const value = digraph.edge(e);
            for (let i = 0; i < value.points.length; ++i) {
                value.points[i].x += deltaX + _width / 2;
                value.points[i].y += deltaY + _height / 2;
            }
        });
        this.digraph = digraph;
    }

    layout(): Promise<void> {
        return Promise.resolve();
    }

    nodePos(u): any {
        return this.digraph.node(u);
    }

    edgePoints(edge) {
        const retVal = this.digraph.edge(edge._sourceVertex.id(), edge._targetVertex.id(), edge._id).points;
        return retVal;
    }
}

type VertexClusterMapT = { [id: string]: VertexClusterT[] };
const clusterTpl = (vcm: VertexClusterMapT): string => {
    const retVal: string[] = [];
    for (const key in vcm) {

        const vertices = vcm[key].map(vertexTpl);

        retVal.push(`subgraph cluster_${key} {
id="${key}";
label="????";
margin=16;
${vertices.join("\n")}
}`);
    }
    return retVal.join("\n");
};

type VertexClusterT = { parentID?: string, vertexID: string, vertexLabel: string, clientSize: BBox };
const vertexTpl = (vc: VertexClusterT): string => `${vc.vertexID} [id="${vc.vertexID}" label="${vc.vertexLabel}" width=${vc.clientSize.width / 72} height=${vc.clientSize.height / 72}]`;

const edgeTpl = (s, t, id, label) => `${s} -> ${t} [id="${id}", label="${label}"]`;

type GVPos = {
    x: number;
    y: number;
};

type GVBox = {
    x: number;
    y: number;
    cx: number;
    cy: number;
    width: number;
    height: number;
};

const pointToPx = (pt: number) => pt * 96 / 72;
const inchToPx = (inch: number) => inch * 72;

export class Graphviz extends Layout {

    edgePos = {};
    _mode = "dot";

    constructor(protected graphData: GraphData, protected width?, protected height?) {
        super();
    }

    parseBB(bb: string): GVBox {
        const [llx, lly, urx, ury] = bb ? bb.split(",").map(p => pointToPx(+p)) : [0, 0, 0, 0];
        return {
            x: llx,
            y: lly,
            cx: llx + (urx - llx) / 2,
            cy: lly + (ury - lly) / 2,
            width: urx - llx,
            height: ury - lly
        };
    }

    parseBB2(_bb: string, page: GVBox): GVBox {
        const bb = this.parseBB(_bb);
        return {
            x: -bb.x + page.width,
            y: -bb.y + page.height,
            cx: -bb.cx + page.width,
            cy: -bb.cy + page.height,
            width: bb.width,
            height: bb.height
        };
    }

    parsePos(pos: string, page: GVBox): GVPos {
        const [x, y] = pos.split(",").map(p => pointToPx(+p));
        return {
            x: -x + page.width,
            y: -y + page.height
        };
    }

    parseNode(posStr: string, width: string, height: string, page: GVBox): GVBox {
        const cpos = this.parsePos(posStr, page);
        const w = inchToPx(+width);
        const h = inchToPx(+height);
        return {
            x: cpos.x - w / 2,
            y: cpos.y - h / 2,
            cx: cpos.x,
            cy: cpos.y,
            width: w,
            height: h
        };
    }

    doLayout(dot: string) {
        return graphviz[this._mode](dot, "json").then(jsonStr => {
            const json = JSON.parse(jsonStr);
            const pageBBox = this.parseBB(json.bb);
            json.objects.forEach(n => {
                if (n.nodes) {
                    const bb = this.parseBB2(n.bb, pageBBox);
                    this.pos[n.id] = {
                        x: bb.cx,
                        y: bb.cy,
                        width: bb.width,
                        height: bb.height
                    };
                } else {
                    const pos = this.parseNode(n.pos, n.width, n.height, pageBBox);
                    this.pos[n.id] = {
                        x: pos.cx,
                        y: pos.cy,
                        width: pos.width,
                        height: pos.height
                    };
                }
            });
            json.edges.forEach(_e => {
                const posStr = _e.pos.substr(2);
                const posParts = posStr.split(" ");
                const points: any[] = posParts.map(p => this.parsePos(p, pageBBox)).map(pos => ({
                    x: pos.x,
                    y: pos.y
                }));
                const endpoint = points.shift();
                this.edgePoints[_e.id] = [...points, endpoint];
            });
        });
    }

    layout(): Promise<void> {
        const dotEdges: string[] = [];
        const dotClusterMap: { [id: string]: VertexClusterT[] } = {};
        let dotNodes: VertexClusterT[] = [];

        this.graphData.eachEdge((_e, s, t) => {
            const e = this.graphData.edge(_e);
            dotEdges.push(edgeTpl(s, t, _e.name, e.text()));
        });

        this.graphData.eachNode((u, value) => {
            const clientSize = value.getBBox();
            const parent = this.graphData.parent(u);
            if (parent) {
                const parentValue = this.graphData.node(parent);
                const parentID = parentValue.id();
                if (!dotClusterMap[parentID]) {
                    dotClusterMap[parentID] = [];
                }
                dotClusterMap[parentID].push({ parentID, vertexID: u, vertexLabel: value.text ? value.text() : value.title ? value.title() : "", clientSize });
            } else {
                dotNodes.push({ vertexID: u, vertexLabel: value.text ? value.text() : value.title ? value.title() : "", clientSize });
            }
        });

        dotNodes = dotNodes.filter(n => !dotClusterMap[n.vertexID]);

        return this.doLayout(`\
digraph G {
    graph [fontname=Verdana,fontsize=11.0];
    graph [rankdir=TB];
    node [shape=rect,fontname=Verdana,fontsize=11.0,fixedsize=true];
    edge [fontname=Verdana,fontsize=11.0];

${dotEdges.join("\n")}

${clusterTpl(dotClusterMap)}

${dotNodes.map(vertexTpl).join("\n")}
}`
        );
    }

    nodePos(u) {
        return this.pos[u];
    }

    edgePoints(e) {
        return this.edgePoints[e.id()];
    }
}

export class DOT extends Graphviz {
}

export class Circo extends Graphviz {
    _mode = "circo";

    edgePoints(e) {
        return [];
    }
}

export class TwoPI extends Graphviz {
    _mode = "twopi";

    edgePoints(e) {
        return [];
    }
}

export class Neato extends Graphviz {
    _mode = "neato";

    edgePoints(e) {
        return [];
    }
}

export class FDP extends Graphviz {
    _mode = "fdp";

    edgePoints(e) {
        return [];
    }
}
