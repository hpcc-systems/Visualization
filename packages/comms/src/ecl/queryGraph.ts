//  Ported from:  https://github.com/hpcc-systems/HPCC-Platform/blob/f0ed9dbeca49c39fb55aa28fec295c89407ac663/esp/src/src/ESPGraph.ts

export function safeAssign(obj: { [id: string]: any }, key: string, value: string) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") return;
    obj[key] = value;
}

function xmlEncode(str: string): string {
    str = "" + str;
    return str.replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "&#10;")
        .replace(/\r/g, "&#13;")
        ;
}

function espTime2Seconds(duration?: string): number {
    if (!duration) {
        return 0;
    } else if (!isNaN(+duration)) {
        return parseFloat(duration);
    }
    const re = /(?:(?:(\d+).days.)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+\.\d+|\d+)s))|(?:(\d+\.\d+|\d+)ms|(\d+\.\d+|\d+)us|(\d+\.\d+|\d+)ns)/;
    const match = re.exec(duration);
    if (!match) return 0;
    const days = +match[1] || 0;
    const hours = +match[2] || 0;
    const mins = +match[3] || 0;
    const secs = +match[4] || 0;
    const ms = +match[5] || 0;
    const us = +match[6] || 0;
    const ns = +match[7] || 0;
    return (days * 24 * 60 * 60) + (hours * 60 * 60) + (mins * 60) + secs + ms / 1000 + us / 1000000 + ns / 1000000000;
}

function unitTest(size: string, unit: string) {
    const nsIndex = size.indexOf(unit);
    if (nsIndex !== -1) {
        return parseFloat(size.substring(0, nsIndex));
    }
    return -1;
}

function espSize2Bytes(size: string): number {
    if (!size) {
        return 0;
    } else if (!isNaN(+size)) {
        return parseFloat(size);
    }
    let retVal = unitTest(size, "Kb");
    if (retVal >= 0) {
        return retVal * 1024;
    }
    retVal = unitTest(size, "Mb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 2);
    }
    retVal = unitTest(size, "Gb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 3);
    }
    retVal = unitTest(size, "Tb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 4);
    }
    retVal = unitTest(size, "Pb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 5);
    }
    retVal = unitTest(size, "Eb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 6);
    }
    retVal = unitTest(size, "Zb");
    if (retVal >= 0) {
        return retVal * Math.pow(1024, 7);
    }
    retVal = unitTest(size, "b");
    if (retVal >= 0) {
        return retVal;
    }
    return 0;
}

function espSkew2Number(skew: string): number {
    if (!skew) {
        return 0;
    }
    return parseFloat(skew);
}

enum GRAPH_TYPE {
    UNKNOWN = 0,
    GRAPH = 1,
    SUBGRAPH = 2,
    VERTEX = 3,
    EDGE = 4,
    LAST = 5
}

enum GRAPH_TYPE_STRING {
    UNKNOWN = "Unknown",
    GRAPH = "Graph",
    SUBGRAPH = "Cluster",
    VERTEX = "Vertex",
    EDGE = "Edge",
    LAST = "Last"
}

class LocalisedXGMMLWriter {

    graph: QueryGraph;
    m_xgmml: string;
    m_visibleSubgraphs: { [id: string]: Subgraph };
    m_visibleVertices: { [id: string]: Vertex };
    m_semiVisibleVertices: { [id: string]: Vertex };
    m_visibleEdges: { [id: string]: Edge };
    noSpills: boolean;

    constructor(graph: QueryGraph) {
        this.graph = graph;

        this.m_xgmml = "";
        this.m_visibleSubgraphs = {};
        this.m_visibleVertices = {};
        this.m_semiVisibleVertices = {};
        this.m_visibleEdges = {};
    }

    calcVisibility(items: GraphItem[], localisationDepth: number, localisationDistance: number, noSpills: boolean): void {
        this.noSpills = noSpills;
        items.forEach((item) => {
            if (this.graph.isVertex(item)) {
                this.calcInVertexVisibility(item, localisationDistance);
                this.calcOutVertexVisibility(item, localisationDistance);
            } else if (this.graph.isEdge(item)) {
                this.calcInVertexVisibility(item.getSource(), localisationDistance - 1);
                this.calcOutVertexVisibility(item.getTarget(), localisationDistance - 1);
            } else if (this.graph.isSubgraph(item)) {
                this.m_visibleSubgraphs[item.__hpcc_id] = item;
                this.calcSubgraphVisibility(item, localisationDepth - 1);
            }
        });
        this.calcVisibility2();
    }

    calcInVertexVisibility(vertex: Vertex, localisationDistance: number) {
        if (this.noSpills && vertex.isSpill()) {
            localisationDistance++;
        }
        this.m_visibleVertices[vertex.__hpcc_id] = vertex;
        if (localisationDistance > 0) {
            vertex.getInEdges().forEach(edge => {
                this.calcInVertexVisibility(edge.getSource(), localisationDistance - 1);
            });
        }
    }

    calcOutVertexVisibility(vertex: Vertex, localisationDistance: number): void {
        if (this.noSpills && vertex.isSpill()) {
            localisationDistance++;
        }
        this.m_visibleVertices[vertex.__hpcc_id] = vertex;
        if (localisationDistance > 0) {
            vertex.getOutEdges().forEach(edge => {
                this.calcOutVertexVisibility(edge.getTarget(), localisationDistance - 1);
            });
        }
    }

    calcSubgraphVisibility(subgraph: Subgraph, localisationDepth: number): void {
        if (localisationDepth < 0) {
            return;
        }

        if (localisationDepth > 0) {
            subgraph.__hpcc_subgraphs.forEach((subgraph, idx) => {
                this.calcSubgraphVisibility(subgraph, localisationDepth - 1);
            });
        }

        subgraph.__hpcc_subgraphs.forEach((subgraph, idx) => {
            this.m_visibleSubgraphs[subgraph.__hpcc_id] = subgraph;
        });
        subgraph.__hpcc_vertices.forEach((vertex, idx) => {
            this.m_visibleVertices[vertex.__hpcc_id] = vertex;
        });

        //  Calculate edges that pass through the subgraph  ---
        const dedupEdges = {};
        this.graph.edges.forEach((edge: Edge, idx: any) => {
            if (edge.getSource().__hpcc_parent !== edge.getTarget().__hpcc_parent && subgraph === this.getCommonAncestor(edge)) {
                //  Only include one unique edge between subgraphs  ---
                if (!dedupEdges[edge.getSource().__hpcc_parent.__hpcc_id + "::" + edge.getTarget().__hpcc_parent.__hpcc_id]) {
                    dedupEdges[edge.getSource().__hpcc_parent.__hpcc_id + "::" + edge.getTarget().__hpcc_parent.__hpcc_id] = true;
                    this.m_visibleEdges[edge.__hpcc_id] = edge;
                }
            }
        });
    }

    buildVertexString(vertex: Vertex, isPoint: boolean): string {
        let attrStr = "";
        let propsStr = "";
        const props = vertex.getProperties();
        for (const key in props) {
            if (isPoint && key.indexOf("_kind") >= 0) {
                propsStr += "<att name=\"_kind\" value=\"point\"/>";
            } else if (key === "id" || key === "label") {
                attrStr += " " + key + "=\"" + xmlEncode(props[key]) + "\"";
            } else {
                propsStr += "<att name=\"" + key + "\" value=\"" + xmlEncode(props[key]) + "\"/>";
            }
        }
        return "<node" + attrStr + ">" + propsStr + "</node>";
    }

    buildEdgeString(edge: Edge): string {
        let attrStr: string = "";
        let propsStr: string = "";
        const props = edge.getProperties();
        for (const key in props) {
            if (key.toLowerCase() === "id" ||
                key.toLowerCase() === "label" ||
                key.toLowerCase() === "source" ||
                key.toLowerCase() === "target") {
                attrStr += " " + key + "=\"" + xmlEncode(props[key]) + "\"";
            } else {
                propsStr += "<att name=\"" + key + "\" value=\"" + xmlEncode(props[key]) + "\"/>";
            }
        }
        return "<edge" + attrStr + ">" + propsStr + "</edge>";
    }

    getAncestors(v: Vertex, ancestors: Subgraph[]): void {
        let parent = v.__hpcc_parent;
        while (parent) {
            ancestors.push(parent);
            parent = parent.__hpcc_parent;
        }
    }

    getCommonAncestorV(v1: Vertex, v2: Vertex): Subgraph | null {
        const v1_ancestors = [];
        const v2_ancestors = [];
        this.getAncestors(v1, v1_ancestors);
        this.getAncestors(v2, v2_ancestors);
        let finger1 = v1_ancestors.length - 1;
        let finger2 = v2_ancestors.length - 1;
        let retVal = null;
        while (finger1 >= 0 && finger2 >= 0 && v1_ancestors[finger1] === v2_ancestors[finger2]) {
            retVal = v1_ancestors[finger1];
            --finger1;
            --finger2;
        }
        return retVal;
    }

    getCommonAncestor(e: Edge): Subgraph | null {
        return this.getCommonAncestorV(e.getSource(), e.getTarget());
    }

    calcAncestorVisibility(vertex: Vertex): void {
        const ancestors = [];
        this.getAncestors(vertex, ancestors);
        ancestors.forEach((item, idx) => {
            this.m_visibleSubgraphs[item.__hpcc_id] = item;
        });
    }

    calcVisibility2(): void {
        for (const key in this.m_visibleVertices) {
            const vertex = this.m_visibleVertices[key];
            vertex.getInEdges().forEach((edge: Edge, idx: any) => {
                this.m_visibleEdges[edge.__hpcc_id] = edge;
            });
            vertex.getOutEdges().forEach((edge: Edge, idx: any) => {
                this.m_visibleEdges[edge.__hpcc_id] = edge;
            });
            this.calcAncestorVisibility(vertex);
        }
        this.calcSemiVisibleVertices();
    }

    addSemiVisibleEdge(edge: Edge): void {
        if (edge && !this.m_visibleEdges[edge.__hpcc_id]) {
            this.m_visibleEdges[edge.__hpcc_id] = edge;
        }
    }

    addSemiVisibleVertex(vertex: Vertex): void {
        if (!this.m_visibleVertices[vertex.__hpcc_id]) {
            this.m_semiVisibleVertices[vertex.__hpcc_id] = vertex;
            this.calcAncestorVisibility(vertex);
        }
    }

    calcSemiVisibleVertices(): void {
        for (const key in this.m_visibleEdges) {
            const edge = this.m_visibleEdges[key];
            let source = edge.getSource();
            this.addSemiVisibleVertex(source);
            while (this.noSpills && source.isSpill()) {
                const inEdges = source.getInEdges();
                if (inEdges.length) {
                    this.addSemiVisibleEdge(inEdges[0]);
                    source = inEdges[0].getSource();
                    this.addSemiVisibleVertex(source);
                } else {
                    break;
                }
            }
            let target = edge.getTarget();
            this.addSemiVisibleVertex(target);
            while (this.noSpills && target.isSpill()) {
                const outEdges = target.getOutEdges();
                if (outEdges.length) {
                    this.addSemiVisibleEdge(outEdges[0]);
                    target = outEdges[0].getTarget();
                    this.addSemiVisibleVertex(target);
                } else {
                    break;
                }
            }
        }
    }

    writeXgmml(): void {
        this.subgraphVisited(this.graph.subgraphs[0], true);
        this.graph.edges.forEach((edge: any, idx: any) => {
            this.edgeVisited(edge);
        });
    }

    subgraphVisited(subgraph: Subgraph, root: boolean = false): boolean {
        if (this.m_visibleSubgraphs[subgraph.__hpcc_id]) {
            let propsStr = "";
            this.m_xgmml += root ? "" : "<node id=\"" + subgraph.__hpcc_id + "\"><att><graph>";
            const xgmmlLen = this.m_xgmml.length;
            subgraph.walkSubgraphs(this);
            subgraph.walkVertices(this);
            if (xgmmlLen === this.m_xgmml.length) {
                //  Add at least one child otherwise subgraphs will render as a vertex  ---
                const vertex = subgraph.__hpcc_vertices[0];
                if (vertex) {
                    this.m_xgmml += this.buildVertexString(vertex, true);
                }
            }

            const props = subgraph.getProperties();
            for (const key in props) {
                propsStr += "<att name=\"" + key + "\" value=\"" + xmlEncode(props[key]) + "\"/>";
            }
            this.m_xgmml += root ? "" : "</graph></att>" + propsStr + "</node>";
        }
        return false;
    }

    vertexVisited(vertex: Vertex) {
        if (this.m_visibleVertices[vertex.__hpcc_id]) {
            this.m_xgmml += this.buildVertexString(vertex, false);
        } else if (this.m_semiVisibleVertices[vertex.__hpcc_id]) {
            this.m_xgmml += this.buildVertexString(vertex, true);
        }
    }

    edgeVisited(edge: Edge) {
        if (this.m_visibleEdges[edge.__hpcc_id]) {
            this.m_xgmml += this.buildEdgeString(edge);
        }
    }
}

abstract class GraphItem {

    abstract _globalType: "Graph" | "Cluster" | "Vertex" | "Edge";

    __hpcc_graph: QueryGraph;
    __hpcc_parent: Subgraph;
    __widget: any;

    __hpcc_id: string;
    _globalID: string;

    constructor(graph: QueryGraph, id: string) {
        this.__hpcc_graph = graph;
        this.__hpcc_id = id;
        this._globalID = id;
    }

    getProperties() {
        const retVal: { [id: string]: any } = {};
        for (const key in this) {
            if (key.indexOf("__") !== 0 && this.hasOwnProperty(key)) {
                retVal[key] = this[key];
            }
        }
        return retVal;
    }
}

class Subgraph extends GraphItem {
    _globalType: "Graph" | "Cluster" | "Vertex" | "Edge";

    __hpcc_subgraphs: any[];
    __hpcc_vertices: any[];
    __hpcc_edges: any[];
    id: string;

    constructor(graph: QueryGraph, id: string) {
        super(graph, id);
        this._globalType = id === "0" ? "Graph" : "Cluster";
        this.__hpcc_subgraphs = [];
        this.__hpcc_vertices = [];
        this.__hpcc_edges = [];
        this.id = id;
    }

    addSubgraph(subgraph) {
        subgraph.__hpcc_parent = this;
        if (!this.__hpcc_subgraphs.some(subgraph2 => subgraph === subgraph2)) {
            this.__hpcc_subgraphs.push(subgraph);
        }
    }

    addVertex(vertex) {
        vertex.__hpcc_parent = this;
        if (!this.__hpcc_vertices.some(vertex2 => vertex === vertex2)) {
            this.__hpcc_vertices.push(vertex);
        }
    }

    removeVertex(vertex: any) {
        this.__hpcc_vertices = this.__hpcc_vertices.filter(vertex2 => vertex !== vertex2);
    }

    addEdge(edge) {
        edge.__hpcc_parent = this;
        if (!this.__hpcc_edges.some(edge2 => edge === edge2)) {
            this.__hpcc_edges.push(edge);
        }
    }

    removeEdge(edge: any) {
        this.__hpcc_edges = this.__hpcc_edges.filter(edge2 => edge !== edge2);
    }

    remove() {
        this.__hpcc_subgraphs.forEach(subgraph => subgraph.__hpcc_parent = this.__hpcc_parent);
        this.__hpcc_vertices.forEach(vertex => vertex.__hpcc_parent = this.__hpcc_parent);
        this.__hpcc_edges.forEach(edge => edge.__hpcc_parent = this.__hpcc_parent);
        delete this.__hpcc_parent;
        this.__hpcc_graph.removeItem(this);
    }

    walkSubgraphs(visitor: { subgraphVisited: (arg0: Subgraph) => boolean; }) {
        this.__hpcc_subgraphs.forEach((subgraph, idx) => {
            if (visitor.subgraphVisited(subgraph)) {
                subgraph.walkSubgraphs(visitor);
            }
        });
    }

    walkVertices(visitor: { vertexVisited: (arg0: Vertex) => void; }) {
        this.__hpcc_vertices.forEach((vertex, idx) => {
            visitor.vertexVisited(vertex);
        });
    }
}

class Vertex extends GraphItem {
    _globalType: "Graph" | "Cluster" | "Vertex" | "Edge" = "Vertex";
    _isSpill: boolean;

    constructor(graph: QueryGraph, id: string) {
        super(graph, id);
    }

    isSpill() {
        return this._isSpill;
    }

    remove() {
        const inVertices = this.getInVertices();
        if (inVertices.length <= 1) {
            console.warn(this.__hpcc_id + ":  remove only supports single or zero inputs activities...");
        }
        this.getInEdges().forEach((edge: Edge) => {
            edge.remove();
        });
        this.getOutEdges().forEach((edge: Edge) => {
            edge.setSource(inVertices[0]);
        });
        this.__hpcc_parent?.removeVertex(this);
        this.__hpcc_graph.removeItem(this);
    }

    getInVertices(): Vertex[] {
        return this.getInEdges().map((edge) => {
            return edge.getSource();
        });
    }

    getInEdges(): Edge[] {
        return this.__hpcc_graph.edges.filter((edge) => {
            return edge.getTarget() === this;
        });
    }

    getOutVertices(): Vertex[] {
        return this.getOutEdges().map((edge) => {
            return edge.getTarget();
        });
    }

    getOutEdges(): Edge[] {
        return this.__hpcc_graph.edges.filter((edge) => {
            return edge.getSource() === this;
        });
    }
}

class Edge extends GraphItem {
    _globalType: "Graph" | "Cluster" | "Vertex" | "Edge" = "Edge";

    _sourceActivity: any;
    source: any;
    _targetActivity: any;
    target: any;

    constructor(graph: QueryGraph, id: string) {
        super(graph, id);
        this._globalType = "Edge";
    }

    remove() {
        this.__hpcc_graph.subgraphs.forEach((subgraph) => {
            subgraph.removeEdge(this);
        });
        this.__hpcc_graph.removeItem(this);
    }

    getSource(): Vertex {
        return this.__hpcc_graph.idx[this._sourceActivity || this.source] as Vertex;
    }

    setSource(source: Vertex) {
        if (this._sourceActivity) {
            this._sourceActivity = source.__hpcc_id;
        } else if (this.source) {
            this.source = source.__hpcc_id;
        }
        if (this.__widget) {
            this.__widget.setSource(this.getSource().__widget);
        }
    }

    getTarget(): Vertex {
        return this.__hpcc_graph.idx[this._targetActivity || this.target] as Vertex;
    }
}

export class QueryGraph {
    idx: { [id: string]: Subgraph | Vertex | Edge } = {};
    subgraphs: Subgraph[] = [];
    vertices: Vertex[] = [];
    edges: Edge[] = [];

    xgmml: string = "";

    constructor() {
        this.clear();
    }

    clear() {
        this.xgmml = "";

        this.idx = {};
        this.subgraphs = [];
        this.vertices = [];
        this.edges = [];
    }

    load(xgmml: string) {
        this.clear();
        this.merge(xgmml);
    }

    merge(xgmml: string) {
        this.xgmml = xgmml;
        const parser = new DOMParser();
        const dom = parser.parseFromString(xgmml, "text/xml");
        this.walkDocument(dom.documentElement, "0");
    }

    isSubgraph(item: GraphItem): item is Subgraph {
        return item instanceof Subgraph;
    }

    isVertex(item: GraphItem): item is Vertex {
        return item instanceof Vertex;
    }

    isEdge(item: GraphItem): item is Edge {
        return item instanceof Edge;
    }

    getGlobalType(item: QueryGraph | Subgraph | Vertex | Edge): GRAPH_TYPE {
        if (item instanceof Vertex) {
            return GRAPH_TYPE.VERTEX;
        } else if (item instanceof Edge) {
            return GRAPH_TYPE.EDGE;
        } else if (item instanceof Subgraph) {
            return GRAPH_TYPE.SUBGRAPH;
        } else if (item instanceof QueryGraph) {
            return GRAPH_TYPE.GRAPH;
        }
        return GRAPH_TYPE.UNKNOWN;
    }

    getGlobalTypeString(item: QueryGraph | Subgraph | Vertex | Edge): GRAPH_TYPE_STRING {
        if (item instanceof Vertex) {
            return GRAPH_TYPE_STRING.VERTEX;
        } else if (item instanceof Edge) {
            return GRAPH_TYPE_STRING.EDGE;
        } else if (item instanceof Subgraph) {
            return GRAPH_TYPE_STRING.SUBGRAPH;
        } else if (item instanceof QueryGraph) {
            return GRAPH_TYPE_STRING.GRAPH;
        }
        return GRAPH_TYPE_STRING.UNKNOWN;
    }

    getItem(docNode: HTMLElement, id: string): Subgraph | Vertex | Edge {
        if (!this.idx[id]) {
            switch (docNode.tagName) {
                case "graph":
                    const subgraph = new Subgraph(this, id);
                    this.subgraphs.push(subgraph);
                    this.idx[id] = subgraph;
                    break;
                case "node":
                    const vertex = new Vertex(this, id);
                    this.vertices.push(vertex);
                    this.idx[id] = vertex;
                    break;
                case "edge":
                    const edge = new Edge(this, id);
                    this.edges.push(edge);
                    this.idx[id] = edge;
                    break;
                default:
                    console.warn("Graph.getItem - Unknown Node Type!");
                    break;
            }
        }
        const retVal = this.idx[id];
        Array.from(docNode.attributes).forEach(attr => {
            safeAssign(retVal, attr.name, attr.value);
        });
        return retVal;
    }

    removeItem(item: Subgraph | Vertex | Edge) {
        delete this.idx[item.__hpcc_id];
        if (item instanceof Subgraph) {
            this.subgraphs = this.subgraphs.filter((subgraph: Subgraph) => {
                return item !== subgraph;
            });
        } else if (item instanceof Vertex) {
            this.vertices = this.vertices.filter(vertex => {
                return item !== vertex;
            });
        } else if (item instanceof Edge) {
            this.edges = this.edges.filter((edge: Edge) => {
                return item !== edge;
            });
        }
    }

    getChildByTagName(docNode: HTMLElement, tagName: string): HTMLElement | null {
        let retVal: HTMLElement | null = null;
        Array.from(docNode.childNodes as NodeListOf<HTMLElement>).some((childNode) => {
            if (childNode.tagName === tagName) {
                retVal = childNode;
                return true;
            }
        });
        return retVal;
    }

    walkDocument(docNode: HTMLElement, id: string): Subgraph | Vertex | Edge {
        const retVal: any = this.getItem(docNode, id);
        (docNode.childNodes as NodeListOf<HTMLElement>).forEach((childNode) => {
            switch (childNode.nodeType) {
                case 1:     // 	ELEMENT_NODE
                    switch (childNode.tagName) {
                        case "graph":
                            break;
                        case "node":
                            let isSubgraph = false;
                            const attNode = this.getChildByTagName(childNode, "att");
                            if (attNode) {
                                const graphNode = this.getChildByTagName(attNode, "graph");
                                if (graphNode) {
                                    isSubgraph = true;
                                    const subgraph = this.walkDocument(graphNode, childNode.getAttribute("id"));
                                    retVal.addSubgraph(subgraph);
                                }
                            }
                            if (!isSubgraph) {
                                const vertex = this.walkDocument(childNode, childNode.getAttribute("id"));
                                retVal.addVertex(vertex);
                            }
                            break;
                        case "att":
                            const name = childNode.getAttribute("name");
                            const uname = "_" + name;
                            const value = childNode.getAttribute("value");
                            if (name.indexOf("Time") === 0) {
                                safeAssign(retVal, uname, value);
                                safeAssign(retVal, name, "" + espTime2Seconds(value));
                            } else if (name.indexOf("Size") === 0) {
                                safeAssign(retVal, uname, value);
                                safeAssign(retVal, name, "" + espSize2Bytes(value));
                            } else if (name.indexOf("Skew") === 0) {
                                safeAssign(retVal, uname, value);
                                safeAssign(retVal, name, "" + espSkew2Number(value));
                            } else {
                                safeAssign(retVal, name, value);
                            }
                            break;
                        case "edge":
                            const edge: any = this.walkDocument(childNode, childNode.getAttribute("id"));
                            if (edge.NumRowsProcessed !== undefined) {
                                edge._eclwatchCount = edge.NumRowsProcessed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (edge.Count !== undefined) {
                                edge._eclwatchCount = edge.Count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (edge.count !== undefined) {
                                edge._eclwatchCount = edge.count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            if (edge.inputProgress) {
                                edge._eclwatchInputProgress = "[" + edge.inputProgress.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "]";
                            }
                            if (edge.SkewMaxRowsProcessed && edge.SkewMinRowsProcessed) {
                                edge._eclwatchSkew = "+" + edge.SkewMaxRowsProcessed + ", " + edge.SkewMinRowsProcessed;
                            }
                            if (edge._dependsOn) {
                            } else if (edge._childGraph) {
                            } else if (edge._sourceActivity || edge._targetActivity) {
                                edge._isSpill = true;
                                const source = edge.getSource();
                                source._isSpill = true;
                                const target = edge.getTarget();
                                target._isSpill = true;
                            }
                            retVal.addEdge(edge);
                            break;
                        default:
                            break;
                    }
                    break;
                case 2:     // 	ATTRIBUTE_NODE
                case 3:     // 	TEXT_NODE
                case 4:     // 	CDATA_SECTION_NODE
                case 5:     // 	ENTITY_REFERENCE_NODE
                case 6:     // 	ENTITY_NODE
                case 7:     // 	PROCESSING_INSTRUCTION_NODE
                case 8:     // 	COMMENT_NODE
                case 9:     // 	DOCUMENT_NODE
                case 10:    // 	DOCUMENT_TYPE_NODE
                case 11:    // 	DOCUMENT_FRAGMENT_NODE
                case 12:    // 	NOTATION_NODE
                    break;
                default:
                    break;
            }
        });
        return retVal;
    }

    removeSubgraphs(): void {
        const subgraphs = [...this.subgraphs];
        subgraphs.forEach((subgraph) => {
            if (subgraph.__hpcc_parent instanceof Subgraph) {
                subgraph.remove();
            }
        });
    }

    removeSpillVertices(): void {
        const vertices = [...this.vertices];
        vertices.forEach((vertex) => {
            if (vertex.isSpill()) {
                vertex.remove();
            }
        });
    }

    getLocalisedXGMML(items: GraphItem[], localisationDepth: number, localisationDistance: number, noSpills: boolean): string {
        const xgmmlWriter = new LocalisedXGMMLWriter(this);
        xgmmlWriter.calcVisibility(items, localisationDepth, localisationDistance, noSpills);
        xgmmlWriter.writeXgmml();
        return "<graph>" + xgmmlWriter.m_xgmml + "</graph>";
    }
}
