import { compare2 } from "./array";

class GraphItem<T = any> {
    protected _graph: Graph2;
    _: T;
    id(): string {
        return this._graph.id(this._);
    }

    constructor(g: Graph2, _: T) {
        this._graph = g;
        this._ = _;
    }
}

class ChildGraphItem<S = any> extends GraphItem<S> {

    private _parent: Subgraph | undefined;

    constructor(g: Graph2, _: S) {
        super(g, _);
    }

    clearParent(): this {
        if (this._parent) {
            this._parent.removeChild(this);
            delete this._parent;
        }
        return this;
    }

    parent(): Subgraph | undefined;
    parent(_: Subgraph | undefined): this;
    parent(_?: Subgraph): Subgraph | undefined | this {
        if (arguments.length === 0) return this._parent;
        if (this._parent !== _) {
            if (this._parent) {
                this._parent.removeChild(this);
            }
            this._parent = _;
            if (this._parent) {
                this._parent.addChild(this);
            }
        }
        return this;
    }
}

class Subgraph<S = any> extends ChildGraphItem<S> {

    private _children: ChildGraphItem[] = [];

    constructor(g: Graph2, _: S) {
        super(g, _);
    }

    children(): ChildGraphItem[] {
        return this._children;
    }

    addChild(_: ChildGraphItem) {
        this._children.push(_);
    }

    removeChild(_: ChildGraphItem) {
        this._children = this._children.filter(row => row.id !== _.id);
    }
}

class Vertex<V = any> extends ChildGraphItem<V> {

    private _inEdges: Edge[] = [];
    private _outEdges: Edge[] = [];

    constructor(g: Graph2, _: V) {
        super(g, _);
    }

    edges() {
        return [...this._inEdges, ...this._outEdges];
    }

    edgeCount() {
        return this._outEdges.length + this._inEdges.length;
    }

    inEdges() {
        return this._inEdges;
    }

    addInEdge(e: Edge) {
        this._inEdges.push(e);
    }

    removeInEdge(id: string) {
        this._outEdges = this._outEdges.filter(e => e._.id !== id);
    }

    outEdges() {
        return this._outEdges;
    }

    addOutEdge(e: Edge) {
        this._outEdges.push(e);
    }

    removeOutEdge(id: string) {
        this._outEdges = this._outEdges.filter(e => e._.id !== id);
    }
}

class Edge<E = any> extends GraphItem<E> {

    _source: Vertex;
    _target: Vertex;

    constructor(g: Graph2, _: E, source: Vertex, target: Vertex) {
        super(g, _);
        this._source = source;
        this._target = target;
    }
}

type SubgraphMap<T> = { [id: string]: Subgraph<T> };
type VertexMap<T> = { [id: string]: Vertex<T> };
type EdgeMap<T> = { [id: string]: Edge<T> };

export type HierarchyFormatter<V, S> = (type: "subgraph" | "vertex", item: V | S, children?: object[]) => object;

export class Graph2<V = any, E = any, S = any> {

    private _directed: boolean;
    private _subgraphMap: SubgraphMap<S> = {};
    private _subgraphs: S[] = [];
    private _vertexMap: VertexMap<V> = {};
    private _vertices: V[] = [];
    private _edgeMap: EdgeMap<E> = {};
    private _edges: E[] = [];

    constructor(directed = true) {
        this._directed = directed;
    }

    clear(): this {
        this._subgraphMap = {};
        this._subgraphs = [];
        this._vertexMap = {};
        this._vertices = [];
        this._edgeMap = {};
        this._edges = [];
        return this;
    }

    clearParents(): this {
        for (const key in this._subgraphMap) {
            this._subgraphMap[key].clearParent();
        }
        for (const key in this._vertexMap) {
            this._vertexMap[key].clearParent();
        }
        return this;
    }

    isDirected(): boolean {
        return this._directed;
    }

    _idFunc = (_: any): string => typeof _.id === "function" ? _.id() : _.id;
    idFunc(_: (_: S | V | E) => string): this {
        this._idFunc = _;
        return this;
    }

    _sourceFunc = (_: any): string => typeof _.source === "function" ? _.source() : _.source;
    sourceFunc(_: (_: E) => string): this {
        this._sourceFunc = _;
        return this;
    }

    _targetFunc = (_: any): string => typeof _.target === "function" ? _.target() : _.target;
    targetFunc(_: (_: E) => string): this {
        this._targetFunc = _;
        return this;
    }

    id(_: S | V | E): string {
        return this._idFunc(_);
    }

    // Subgraphs  ---
    subgraphs(): S[] {
        return this._subgraphs;
    }

    subgraphExists(id: string): boolean {
        return !!this._subgraphMap[id];
    }

    subgraph(id: string): S {
        return this._subgraphMap[id]._;
    }

    addSubgraph(s: S, parent?: S): this {
        const s_id = this._idFunc(s);
        if (this._subgraphMap[s_id]) throw new Error(`Subgraph '${s_id}' already exists.`);
        const subgraph = new Subgraph(this, s);
        if (parent) {
            const p_id = this._idFunc(parent);
            if (!this._subgraphMap[p_id]) throw new Error(`Subgraph '${p_id}' does not exist.`);
            subgraph.parent(this._subgraphMap[p_id]);
        }
        this._subgraphMap[s_id] = subgraph;
        this._subgraphs.push(subgraph._);
        return this;
    }

    mergeSubgraphs(_subgraphs: S[] = []): this {
        const sgDiff = compare2<S>(this.subgraphs(), _subgraphs, sg => this._idFunc(sg));
        sgDiff.removed.forEach(sg => this.removeSubgraph(this._idFunc(sg)));
        sgDiff.added.forEach(sg => this.addSubgraph(sg));
        sgDiff.unchanged.forEach(sg => this.updateSubgraph(sg));
        return this;
    }

    updateSubgraph(sg: S): this {
        const sg_id = this._idFunc(sg);
        const subgraph = this._subgraphMap[sg_id];
        if (!subgraph) throw new Error(`Subgraph '${sg_id}' does not exist.`);
        subgraph._ = sg;
        return this;
    }

    removeSubgraph(id: string, promoteChildren = true): this {
        const sg = this._subgraphMap[id];
        if (!sg) throw new Error(`Subgraph '${id}' does not exist.`);
        sg.children().forEach(child => {
            if (promoteChildren) {
                child.parent(sg.parent());
            } else {
                if (child instanceof Subgraph) {
                    this.removeSubgraph(child.id());
                } else {
                    this.removeVertex(child.id());
                }
            }
        });
        this._subgraphs = this._subgraphs.filter(row => row !== sg._);
        delete this._subgraphMap[id];
        return this;
    }

    subgraphParent(id: string): S | undefined;
    subgraphParent(id: string, parentID: string): this;
    subgraphParent(id: string, parentID?: string): S | undefined | this {
        const item = this._subgraphMap[id];
        if (!item) throw new Error(`Subgraph '${id}' does not exist.`);
        if (parentID === void 0) {
            const parent = item.parent();
            return parent ? parent._ as S : undefined;
        }
        const parent = this._subgraphMap[parentID];
        if (!parent) throw new Error(`Vertex parent '${parent}' does not exist.`);
        item.parent(parent);
        return this;
    }

    // Vertices  ---
    vertices(): V[] {
        return this._vertices;
    }

    vertexExists(id: string): boolean {
        return !!this._vertexMap[id];
    }

    vertex(id: string): V {
        return this._vertexMap[id]._;
    }

    edges(vertexID?: string): E[] {
        return vertexID ? this._vertexMap[vertexID].edges().map(e => e._) : this._edges;
    }

    inEdges(vertexID: string): E[] {
        return this._vertexMap[vertexID].inEdges().map(e => e._);
    }

    outEdges(vertexID: string): E[] {
        return this._vertexMap[vertexID].outEdges().map(e => e._);
    }

    private _neighbors(id: string): Vertex[] {
        return [...this._vertexMap[id].outEdges().map(e => e._target), ...this._vertexMap[id].inEdges().map(e => e._source)];
    }

    neighbors(id: string): V[] {
        return this._neighbors(id).map(n => n._);
    }

    singleNeighbors(id: string): V[] {
        return this._neighbors(id).filter(n => n.edgeCount() === 1).map(n => n._);
    }

    addVertex(v: V, parent?: S): this {
        const v_id = this._idFunc(v);
        if (this._vertexMap[v_id]) throw new Error(`Vertex '${v_id}' already exists.`);
        const vertex = new Vertex(this, v);
        if (parent) {
            const p_id = this._idFunc(parent);
            if (!this.subgraphExists(p_id)) throw new Error(`Subgraph '${p_id}' does not exist.`);
            vertex.parent(this._subgraphMap[p_id]);
        }
        this._vertexMap[v_id] = vertex;
        this._vertices.push(vertex._);
        return this;
    }

    mergeVertices(_vertices: V[]): this {
        const vDiff = compare2(this.vertices(), _vertices, v => this._idFunc(v));
        vDiff.removed.forEach(v => this.removeVertex(this._idFunc(v)));
        vDiff.added.forEach(v => this.addVertex(v));
        vDiff.unchanged.forEach(v => this.updateVertex(v));
        return this;
    }

    updateVertex(v: V): this {
        const v_id = this._idFunc(v);
        const vertex = this._vertexMap[v_id];
        if (!vertex) throw new Error(`Vertex '${v_id}' does not exist.`);
        vertex._ = v;
        return this;
    }

    removeVertex(id: string): this {
        const v = this._vertexMap[id];
        if (!v) throw new Error(`Vertex '${id}' does not exist.`);
        v.edges().forEach(e => {
            this.removeEdge(e.id(), false);
        });
        this._vertices = this._vertices.filter(row => row !== v._);
        delete this._vertexMap[id];
        return this;
    }

    vertexParent(id: string): S | undefined;
    vertexParent(id: string, parentID: string): this;
    vertexParent(id: string, parentID?: string): S | undefined | this {
        const item = this._vertexMap[id];
        if (!item) throw new Error(`Vertex '${id}' does not exist.`);
        if (parentID === void 0) {
            const parent = item.parent();
            return parent ? parent._ as S : undefined;
        }
        const parent = this._subgraphMap[parentID];
        if (!parent) throw new Error(`Vertex parent '${parent}' does not exist.`);
        item.parent(parent);
        return this;
    }

    // Edges  ---
    edgeExists(id: string): boolean {
        return !!this._edgeMap[id];
    }

    edge(id: string): E {
        return this._edgeMap[id]._;
    }

    addEdge(e: E): this {
        const e_id = this._idFunc(e);
        const e_source = this._sourceFunc(e);
        const e_target = this._targetFunc(e);
        if (this._edgeMap[e_id]) throw new Error(`Edge '${e_id}' already exists.`);
        if (!this.vertexExists(e_source)) throw new Error(`Edge Source '${e_source}' does not exist.`);
        if (!this.vertexExists(e_target)) throw new Error(`Edge Target '${e_target}' does not exist.`);
        const edge = new Edge(this, e, this._vertexMap[e_source], this._vertexMap[e_target]);
        this._edgeMap[e_id] = edge;
        this._edges.push(edge._);
        this._vertexMap[e_source].addOutEdge(edge);
        this._vertexMap[e_target].addInEdge(edge);
        return this;
    }

    mergeEdges(_edges: E[]): this {
        const eDiff = compare2(this.edges(), _edges, e => this._idFunc(e));
        eDiff.removed.forEach(e => this.removeEdge(this._idFunc(e)));
        eDiff.added.forEach(e => this.addEdge(e));
        eDiff.unchanged.forEach(e => this.updateEdge(e));
        return this;
    }

    updateEdge(e: E): this {
        const e_id = this._idFunc(e);
        const edge = this._edgeMap[e_id];
        if (!edge) throw new Error(`Edge '${e_id}' does not exist.`);
        edge._ = e;
        return this;
    }

    removeEdge(id: string, updateVertices = true): this {
        const e = this._edgeMap[id];
        if (!e) throw new Error(`Vertex '${id}' does not exist.`);
        if (updateVertices) {
            const e_source = this._sourceFunc(e);
            if (!this.vertexExists(e_source)) throw new Error(`Edge Source'${e_source}' does not exist.`);
            this._vertexMap[e_source].removeOutEdge(id);
            const e_target = this._targetFunc(e);
            if (!this.vertexExists(e_target)) throw new Error(`Edge Target'${e_target}' does not exist.`);
            this._vertexMap[e_target].removeInEdge(id);
        }
        this._edges = this._edges.filter(row => row !== e._);
        delete this._edgeMap[id];
        return this;
    }

    protected _hwalk(item: Subgraph<S> | Vertex<V>, formatter: HierarchyFormatter<V, S>): object {
        if (item instanceof Subgraph) {
            return formatter("subgraph", item._, item.children().map(child => this._hwalk(child as Subgraph<S> | Vertex<V>, formatter)));
        } else {
            return formatter("vertex", item._);
        }
    }

    hierarchy(formatter: HierarchyFormatter<V, S>): object[] {
        const retVal: object[] = [];
        for (const id in this._subgraphMap) {
            const sg = this._subgraphMap[id];
            if (sg.parent() === undefined) {
                retVal.push(this._hwalk(sg, formatter));
            }
        }
        for (const id in this._vertexMap) {
            const v = this._vertexMap[id];
            if (v.parent() === undefined) {
                retVal.push(this._hwalk(v, formatter));
            }
        }
        return retVal;
    }
}
