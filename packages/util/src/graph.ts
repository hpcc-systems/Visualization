export class GraphItem<S, V, E> {
    protected _graph: Graph<S, V, E>;
    readonly parent: Subgraph<S, V, E> | null;
    readonly props: { [key: string]: any } = {};

    constructor(graph: Graph<S, V, E>, parent: Subgraph<S, V, E> | null) {
        this._graph = graph;
        this.parent = parent;
    }
}

export class Subgraph<S, V, E> extends GraphItem<S, V, E> {
    readonly subgraphs: Array<Subgraph<S, V, E>> = [];
    readonly vertices: Array<Vertex<S, V, E>> = [];
    readonly edges: Array<Edge<S, V, E>> = [];
    readonly _?: S;

    constructor(graph: Graph<S, V, E>, parent: Subgraph<S, V, E> | null, _?: S) {
        super(graph, parent);
        if (parent) {  //  Only needed for dummy root
            parent._addSubgraph(this);
        }
        this._ = _;
    }

    remove(full: boolean = true): void {
        this._graph.removeSubgraph(this, full);
    }

    createSubgraph(_?: S): Subgraph<S, V, E> {
        return this._graph.createSubgraph(this, _);
    }

    _addSubgraph(subgraph: Subgraph<S, V, E>) {
        if (this.subgraphs.indexOf(subgraph) >= 0) {
            throw new Error("Subgraph already exists");
        }
        this.subgraphs.push(subgraph);
    }

    _removeSubgraph(subgraph: Subgraph<S, V, E>) {
        const idx = this.subgraphs.indexOf(subgraph);
        if (idx < 0) {
            throw new Error("Subgraph does not exist");
        }
        this.subgraphs.splice(idx, 1);
    }

    removeAllSubgraphs() {
        for (let i = this.subgraphs.length - 1; i >= 0; --i) {
            this._graph.removeSubgraph(this.subgraphs[i], true);
        }
    }

    createVertex(_?: V): Vertex<S, V, E> {
        return this._graph.createVertex(this, _);
    }

    _addVertex(vertex: Vertex<S, V, E>) {
        if (this.vertices.indexOf(vertex) >= 0) {
            throw new Error("Vertex already exists");
        }
        this.vertices.push(vertex);
    }

    _removeVertex(vertex: Vertex<S, V, E>) {
        const idx = this.vertices.indexOf(vertex);
        if (idx < 0) {
            throw new Error("Vertex does not exist");
        }
        this.vertices.splice(idx, 1);
    }

    removeAllVertices() {
        for (let i = this.vertices.length - 1; i >= 0; --i) {
            this._graph.removeVertex(this.vertices[i], true);
        }
    }

    createEdge(source: Vertex<S, V, E>, target: Vertex<S, V, E>, _?: E): Edge<S, V, E> {
        return this._graph.createEdge(this, source, target, _);
    }

    _addEdge(edge: Edge<S, V, E>) {
        if (this.edges.indexOf(edge) >= 0) {
            throw new Error("Edge already exists");
        }
        this.edges.push(edge);
    }

    _removeEdge(edge: Edge<S, V, E>) {
        const idx = this.edges.indexOf(edge);
        if (idx < 0) {
            throw new Error("Edge does not exist");
        }
        this.edges.splice(idx, 1);
    }

    _add(item: Subgraph<S, V, E> | Vertex<S, V, E> | Edge<S, V, E>) {
        if (item instanceof Subgraph) {
            this._addSubgraph(item);
        } else if (item instanceof Vertex) {
            this._addVertex(item);
        } else {
            this._addEdge(item);
        }
    }
}

export class Vertex<S, V, E> extends GraphItem<S, V, E> {
    readonly inEdges: Array<Edge<S, V, E>> = [];
    readonly outEdges: Array<Edge<S, V, E>> = [];
    get edges(): ReadonlyArray<Edge<S, V, E>> {
        return [...this.inEdges, ...this.outEdges];
    }
    readonly _?: V;

    constructor(graph: Graph<S, V, E>, parent: Subgraph<S, V, E>, _?: V) {
        super(graph, parent);
        parent._addVertex(this);
        this._ = _;
    }

    remove(full: boolean = true, _?: (source: V, target: V) => E) {
        return this._graph.removeVertex(this, full, _);
    }

    addInEdge(edge: Edge<S, V, E>) {
        this.inEdges.push(edge);
    }

    removeInEdge(edge: Edge<S, V, E>) {
        const idx = this.inEdges.indexOf(edge);
        if (idx < 0) {
            throw new Error("In edge does not exist");
        }
        this.inEdges.splice(idx, 1);
    }

    addOutEdge(edge: Edge<S, V, E>) {
        this.outEdges.push(edge);
    }

    removeOutEdge(edge: Edge<S, V, E>) {
        const idx = this.outEdges.indexOf(edge);
        if (idx < 0) {
            throw new Error("Out edge does not exist");
        }
        this.outEdges.splice(idx, 1);
    }
}

export class Edge<S, V, E> extends GraphItem<S, V, E> {
    readonly source: Vertex<S, V, E>;
    readonly target: Vertex<S, V, E>;
    readonly _?: E;

    constructor(graph: Graph<S, V, E>, parent: Subgraph<S, V, E>, source: Vertex<S, V, E>, target: Vertex<S, V, E>, _?: E) {
        super(graph, parent);
        if (!source) {
            throw new Error("Missing source vertex");
        }
        if (!target) {
            throw new Error("Missing target vertex");
        }
        parent._addEdge(this);
        this.source = source;
        this.source.addOutEdge(this);
        this.target = target;
        this.target.addInEdge(this);
        this._ = _;
    }

    remove(): void {
        this._graph.removeEdge(this);
    }
}

export class Graph<S = undefined, V = undefined, E = undefined> {
    readonly root: Subgraph<S, V, E>;
    private _allSubgraphs: Array<Subgraph<S, V, E>> = [];
    private _allSubgraphsMap: { [id: string]: Subgraph<S, V, E> } = {};
    private _allVertices: Array<Vertex<S, V, E>> = [];
    private _allVerticesMap: { [id: string]: Vertex<S, V, E> } = {};
    private _allEdges: Array<Edge<S, V, E>> = [];
    private _allEdgesMap: { [id: string]: Edge<S, V, E> } = {};

    idOf: (item: Subgraph<S, V, E> | Vertex<S, V, E> | Edge<S, V, E>) => string;

    constructor(idOf: (item: Subgraph<S, V, E> | Vertex<S, V, E> | Edge<S, V, E>) => string = item => "" + item._, _?: S) {
        this.root = new Subgraph(this, null, _);
        this.idOf = idOf;
    }

    createSubgraph(parent?: Subgraph<S, V, E>, _?: S): Subgraph<S, V, E> {
        const retVal = new Subgraph(this, parent || this.root, _);
        this._allSubgraphs.push(retVal);
        this._allSubgraphsMap[this.idOf(retVal)] = retVal;
        return retVal;
    }

    removeSubgraph(subgraph: Subgraph<S, V, E>, full: boolean = true) {
        const idx = this._allSubgraphs.indexOf(subgraph);
        if (idx < 0) {
            throw new Error("Subgraph does not exist");
        }
        this._allSubgraphs.splice(idx, 1);
        delete this._allSubgraphsMap[this.idOf(subgraph)];
        if (subgraph.parent) {
            subgraph.parent._removeSubgraph(subgraph);
        }
        subgraph.edges.forEach(edge => full ? this.removeEdge(edge) : subgraph.parent!._addEdge(edge));
        subgraph.vertices.forEach(vertex => full ? this.removeVertex(vertex, full) : subgraph.parent!._addVertex(vertex));
        subgraph.subgraphs.forEach(childSubgraph => full ? this.removeSubgraph(childSubgraph, full) : subgraph.parent!._addSubgraph(childSubgraph)
        );
    }

    get subgraphs(): ReadonlyArray<Subgraph<S, V, E>> {
        return this._allSubgraphs;
    }

    subgraph(id: string): Subgraph<S, V, E> {
        return this._allSubgraphsMap[id];
    }

    createVertex(parent: Subgraph<S, V, E>, _?: V): Vertex<S, V, E> {
        const retVal = new Vertex(this, parent, _);
        this._allVertices.push(retVal);
        this._allVerticesMap[this.idOf(retVal)] = retVal;
        return retVal;
    }

    removeVertex(vertex: Vertex<S, V, E>, full: boolean = true, _?: (source: V, target: V) => E) {
        const idx = this._allVertices.indexOf(vertex);
        if (idx < 0) {
            throw new Error("Vertex does not exist");
        }
        this._allVertices.splice(idx, 1);
        delete this._allVerticesMap[this.idOf(vertex)];
        if (vertex.parent) {
            vertex.parent._removeVertex(vertex);
        }
        if (!full) {
            vertex.inEdges.forEach(inEdge => {
                vertex.outEdges.forEach(outEdge => {
                    this.createEdge(this.root, inEdge.source, outEdge.target, _ ? _(inEdge.source._!, outEdge.target._!) : undefined);
                });
            });
        }
        vertex.inEdges.forEach(edge => this.removeEdge(edge));
        vertex.outEdges.forEach(edge => this.removeEdge(edge));
    }

    get vertices(): ReadonlyArray<Vertex<S, V, E>> {
        return this._allVertices;
    }

    vertex(id: string): Vertex<S, V, E> {
        return this._allVerticesMap[id];
    }

    createEdge(parent: Subgraph<S, V, E>, source: Vertex<S, V, E>, target: Vertex<S, V, E>, _?: E): Edge<S, V, E> {
        const retVal = new Edge<S, V, E>(this, parent, source, target, _);
        this._allEdges.push(retVal);
        this._allEdgesMap[this.idOf(retVal)] = retVal;
        return retVal;
    }

    removeEdge(edge: Edge<S, V, E>) {
        const idx = this._allEdges.indexOf(edge);
        if (idx < 0) {
            throw new Error("Edge does not exist");
        }
        this._allEdges.splice(idx, 1);
        delete this._allEdgesMap[this.idOf(edge)];
        if (edge.parent) {
            edge.parent._removeEdge(edge);
        }
        edge.source.removeOutEdge(edge);
        edge.target.removeInEdge(edge);
    }

    get edges(): ReadonlyArray<Edge<S, V, E>> {
        return this._allEdges;
    }

    edge(id: string): Edge<S, V, E> {
        return this._allEdgesMap[id];
    }

    private _walk(parent: Subgraph<S, V, E>, visitor: (item: GraphItem<S, V, E>) => "abort" | "stepover" | void): true | false | void {
        for (const subgraph of parent.subgraphs) {
            switch (visitor(subgraph)) {
                case "abort":
                    return true;
                case "stepover":
                    break;
                default:
                    if (this._walk(subgraph, visitor)) return true;
            }
        }
        for (const vertex of parent.vertices) {
            if (visitor(vertex) === "abort") return true;
        }
    }

    walk(visitor: (visitor: GraphItem<S, V, E>) => "abort" | "stepover" | void) {
        this._walk(this.root, visitor);
        for (const edge of this._allEdges) {
            if (visitor(edge) === "abort") return true;
        }
    }

    clone(): Graph<S, V, E> {
        // tslint:disable-next-line: callable-types
        const ctor: { new(idOf: (item: Subgraph<S, V, E> | Vertex<S, V, E> | Edge<S, V, E>) => string, _?: S): Graph<S, V, E> } = this.constructor as any;
        const retVal = new ctor(this.idOf, this.root._);
        const map = ObjMap();
        map.put(this.root, retVal.root);
        this.walk(item => {
            const parent = map.get(item.parent);
            if (item instanceof Subgraph) {
                map.put(item, parent.createSubgraph(item._));
            } else if (item instanceof Vertex) {
                map.put(item, parent.createVertex(item._));
            } else if (item instanceof Edge) {
                const source = map.get(item.source);
                const target = map.get(item.target);
                parent.createEdge(source, target, item._);
            }
        });
        return retVal;
    }
}

function ObjMap() {
    const keys: any[] = [];
    const values: any[] = [];

    return {
        put(key: any, value: any) {
            const index = keys.indexOf(key);
            if (index === -1) {
                keys.push(key);
                values.push(value);
            } else {
                values[index] = value;
            }
        },
        get(key: any) {
            return values[keys.indexOf(key)];
        }
    };
}
