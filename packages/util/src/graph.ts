import { Dictionary, StringAnyMap } from "./dictionary";

const ATTR_DEFINITION = "definition";

export interface IECLDefintion {
    id: string;
    file: string;
    line: number;
    column: number;
}

export interface IGraphItem {
    className(): string;
    id(): string;
    attrs(): Dictionary<any>;
    parent(): ISubgraph | null;
    getNearestDefinition(backwards?: boolean): IECLDefintion | null;
}

class GraphItem {
    protected _graph: Graph;
    protected _parent: Subgraph | null;
    protected readonly _id: string;
    readonly _attrs: Dictionary<any>;

    constructor(graph: Graph, parent: Subgraph | null, id: string, attrs?: StringAnyMap) {
        this._graph = graph;
        this._parent = parent;
        this._id = id;
        this._attrs = new Dictionary<any>(attrs);
    }

    className(): "Graph" | "Subgraph" | "Vertex" | "Edge" {
        return (this.constructor as any).name;
    }

    id(): string {
        return this._id;
    }

    attrs(): Dictionary<any> {
        return this._attrs;
    }

    parent(): ISubgraph {
        return this._parent as ISubgraph;
    }

    hasECLDefinition(): boolean {
        return this._attrs.get(ATTR_DEFINITION) !== undefined;
    }

    getECLDefinition(): IECLDefintion {
        const match = /([a-z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\)/.exec(this._attrs.get(ATTR_DEFINITION));
        if (match) {
            const [, _file, _row, _col] = match;
            _file.replace("/./", "/");
            return {
                id: this.id(),
                file: _file,
                line: +_row,
                column: +_col
            };
        }
        throw new Error(`Bad definition:  ${this._attrs.get(ATTR_DEFINITION)}`);
    }
}

export interface ISubgraph extends IGraphItem {
    remove(): void;
    subgraphs(): ISubgraph[];
    vertices(): IVertex[];
    edges(): IEdge[];
}

class Subgraph extends GraphItem implements ISubgraph {
    protected _subgraphs = new Dictionary<Subgraph>();
    protected _vertices = new Dictionary<Vertex>();
    protected _edges = new Dictionary<Edge>();

    constructor(graph: Graph, parent: Subgraph | null, id: string, attrs: StringAnyMap = {}) {
        super(graph, parent, id, attrs);
        if (parent) {  //  Only needed for dummy root
            parent.addSubgraph(this);
        }
    }

    destroy() {
        if (this._parent) {
            this._parent.removeSubgraph(this);
        }
        this._edges.values().forEach(edge => this._graph.destroyEdge(edge));
        this._vertices.values().forEach(vertex => this._graph.destroyVertex(vertex));
        this._subgraphs.values().forEach(subgraph => this._graph.destroySubgraph(subgraph));
    }

    remove(): void {
        this._graph.destroySubgraph(this);
    }

    createSubgraph(id: string, attrs?: StringAnyMap): ISubgraph {
        return this._graph.createSubgraph(this, id, attrs);
    }

    addSubgraph(subgraph: Subgraph) {
        if (this._subgraphs.has(subgraph.id())) {
            throw new Error("Subgraph already exists");
        }
        this._subgraphs.set(subgraph.id(), subgraph);
    }

    removeSubgraph(subgraph: Subgraph) {
        if (!this._subgraphs.has(subgraph.id())) {
            throw new Error("Subgraph does not exist");
        }
        this._subgraphs.remove(subgraph.id());
    }

    createVertex(id: string, label: string, attrs?: StringAnyMap): IVertex {
        return this._graph.createVertex(this, id, label, attrs);
    }

    addVertex(vertex: Vertex) {
        if (this._vertices.has(vertex.id())) {
            throw new Error("Vertex already exists");
        }
        this._vertices.set(vertex.id(), vertex);
    }

    removeVertex(vertex: Vertex) {
        if (!this._vertices.has(vertex.id())) {
            throw new Error("Vertex does not exist");
        }
        this._vertices.remove(vertex.id());
    }

    createEdge(id: string, sourceID: string, targetID: string, attrs?: StringAnyMap): IEdge {
        return this._graph.createEdge(this, id, sourceID, targetID, attrs);
    }

    addEdge(edge: Edge) {
        if (this._edges.has(edge.id())) {
            throw new Error("Edge already exists");
        }
        this._edges.set(edge.id(), edge);
    }

    removeEdge(edge: Edge) {
        if (!this._edges.has(edge.id())) {
            throw new Error("Edge does not exist");
        }
        this._edges.remove(edge.id());
    }

    add(item: Subgraph | Vertex | Edge) {
        if (item instanceof Subgraph) {
            this.addSubgraph(item);
        } else if (item instanceof Vertex) {
            this.addVertex(item);
        } else {
            this.addEdge(item);
        }
    }

    subgraphs(): ISubgraph[] {
        return this._subgraphs.values() as ISubgraph[];
    }

    vertices(): Vertex[] {
        return this._vertices.values();
    }

    edges(): Edge[] {
        return this._edges.values();
    }

    getNearestDefinition(backwards: boolean = false): IECLDefintion | null {
        //  Todo - order is incorrect...
        if (this.hasECLDefinition()) {
            return this.getECLDefinition();
        }
        let vertices = this.vertices();
        if (backwards) {
            vertices = vertices.reverse();
        }
        let retVal: IECLDefintion | null = null;
        vertices.some((vertex) => {
            retVal = vertex.getNearestDefinition(backwards);
            if (retVal) {
                return true;
            }
            return false;
        });
        return retVal;
    }
}

export interface IVertex extends IGraphItem {
    label(): string;
}

class Vertex extends GraphItem implements IVertex {
    protected _label: string;
    inEdges: Edge[] = [];
    outEdges: Edge[] = [];

    constructor(graph: Graph, parent: Subgraph, id: string, label: string, attrs?: StringAnyMap) {
        super(graph, parent, id, attrs);
        this._label = label;
        parent.addVertex(this);
    }

    destroy() {
        if (this._parent) {
            this._parent.removeVertex(this);
        }
        this.inEdges.forEach(edge => this._graph.destroyEdge(edge));
        this.outEdges.forEach(edge => this._graph.destroyEdge(edge));
    }

    label(): string {
        return this._label;
    }

    addInEdge(edge: Edge) {
        this.inEdges.push(edge);
    }

    removeInEdge(edge: Edge) {
        const idx = this.inEdges.indexOf(edge);
        if (idx < 0) {
            throw new Error("In edge does not exist");
        }
        this.inEdges.splice(idx, 1);
    }

    addOutEdge(edge: Edge) {
        this.outEdges.push(edge);
    }

    removeOutEdge(edge: Edge) {
        const idx = this.outEdges.indexOf(edge);
        if (idx < 0) {
            throw new Error("Out edge does not exist");
        }
        this.outEdges.splice(idx, 1);
    }

    getNearestDefinition(backwards: boolean = true): IECLDefintion | null {
        if (this.hasECLDefinition()) {
            return this.getECLDefinition();
        }
        let retVal: IECLDefintion | null = null;
        this.inEdges.some((edge) => {
            retVal = edge.getNearestDefinition(backwards);
            if (retVal) {
                return true;
            }
            return false;
        });
        return retVal;
    }
}

export interface IEdge extends IGraphItem {
    sourceID(): string;
}

class Edge extends Subgraph implements IEdge {
    source: Vertex;
    target: Vertex;

    constructor(graph: Graph, parent: Subgraph, id: string, source: Vertex, target: Vertex, attrs?: StringAnyMap) {
        super(graph, parent, id, attrs);
        if (!source) {
            throw new Error("Missing source vertex");
        }
        if (!target) {
            throw new Error("Missing target vertex");
        }
        parent.addEdge(this);
        this.source = source;
        this.source.addOutEdge(this);
        this.target = target;
        this.target.addInEdge(this);
    }

    sourceID(): string {
        return this.source.id();
    }

    targetID(): string {
        return this.target.id();
    }

    destroy() {
        if (this._parent) {
            this._parent.removeEdge(this);
        }
        this.source.removeOutEdge(this);
        this.target.removeInEdge(this);
    }

    getNearestDefinition(backwards: boolean = false): IECLDefintion | null {
        if (this.hasECLDefinition()) {
            return this.getECLDefinition();
        }
        return this.source.getNearestDefinition(backwards);
    }
}

export class Graph implements ISubgraph {
    private _root: Subgraph;
    private _allSubgraphs = new Dictionary<Subgraph>();
    private _allVertices = new Dictionary<Vertex>();
    private _allEdges = new Dictionary<Edge>();
    private _attrs = new Dictionary<any>();

    constructor(id: string, attrs?: StringAnyMap) {
        this._root = new Subgraph(this, null, id, attrs);
        this._allSubgraphs.set(id, this._root);
    }

    className(): string {
        return "Graph";
    }

    id(): string {
        return this._root.id();
    }

    attrs(): Dictionary<any> {
        return this._attrs;
    }

    parent(): ISubgraph | null {
        return null;
    }

    remove(): void {
        //  Do nothing  ---
    }

    subgraphs(): ISubgraph[] {
        return this._root.subgraphs();
    }

    vertices(): IVertex[] {
        return this._root.vertices();
    }

    edges(): IEdge[] {
        return this._root.edges();
    }

    createSubgraph(parent: ISubgraph, id: string, attrs?: StringAnyMap): ISubgraph {
        if (this._allSubgraphs.has(id)) {
            throw new Error("Subgraph already exists");
        }
        const retVal = new Subgraph(this, this._allSubgraphs.get(parent.id()), id, attrs);
        this._allSubgraphs.set(id, retVal);
        return retVal;
    }

    destroySubgraph(_subgraph: ISubgraph) {
        const subgraph = this._allSubgraphs.get(_subgraph.id());
        if (!subgraph) {
            throw new Error("Subgraph does not exist");
        }
        this._allSubgraphs.remove(subgraph.id());
        subgraph.destroy();
    }

    createVertex(parent: ISubgraph, id: string, label: string, attrs?: StringAnyMap): IVertex {
        if (this._allVertices.has(id)) {
            throw new Error("Vertex already exists");
        }
        const retVal = new Vertex(this, this._allSubgraphs.get(parent.id()), id, label, attrs);
        this._allVertices.set(id, retVal);
        return retVal;
    }

    destroyVertex(_vertex: IVertex) {
        const vertex = this._allVertices.get(_vertex.id());
        if (!vertex) {
            throw new Error("Vertex does not exist");
        }
        this._allVertices.remove(vertex.id());
        vertex.destroy();
    }

    createEdge(parent: ISubgraph, id: string, sourceID: string, targetID: string, attrs?: StringAnyMap): IEdge {
        if (this._allEdges.has(id)) {
            throw new Error("Edge already exists");
        }
        const retVal = new Edge(this, this._allSubgraphs.get(parent.id()), id, this._allVertices.get(sourceID), this._allVertices.get(targetID), attrs);
        this._allEdges.set(id, retVal);
        return retVal;
    }

    destroyEdge(_edge: IEdge) {
        const edge = this._allEdges.get(_edge.id());
        if (!edge) {
            throw new Error("Edge does not exist");
        }
        this._allEdges.remove(edge.id());
        edge.destroy();
    }

    allSubgraph(id: string): ISubgraph {
        return this._allSubgraphs.get(id);
    }

    allSubgraphs(): ISubgraph[] {
        return this._allSubgraphs.values().filter(subgraph => subgraph !== this._root);
    }

    allVertex(id: string): IVertex {
        return this._allVertices.get(id);
    }

    allVertices(): IVertex[] {
        return this._allVertices.values();
    }

    allEdge(id: string): IEdge {
        return this._allEdges.get(id);
    }

    allEdges(): IEdge[] {
        return this._allEdges.values();
    }

    getNearestDefinition(backwards: boolean = false): IECLDefintion | null {
        return this._root.getNearestDefinition(backwards);
    }

    breakpointLocations(path?: string): IECLDefintion[] {
        const retVal: IECLDefintion[] = [];
        for (const vertex of this._allVertices.values()) {
            if (vertex.hasECLDefinition()) {
                const definition = vertex.getECLDefinition();
                if (definition && !path || path === definition.file) {
                    retVal.push(definition);
                }
            }
        }
        return retVal.sort((l, r) => {
            return l.line - r.line;
        });
    }
}
