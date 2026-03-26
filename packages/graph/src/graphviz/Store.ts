import { HierarchicalGraph, scopedLogger, } from "@hpcc-js/util";
import type { Node, Edge, Cluster, Graph } from "./types.ts";

const logger = scopedLogger("src/graphviz/Store.ts");

export class Store extends HierarchicalGraph<Node, Edge, Cluster> {

    protected _graph: Graph = {};

    constructor() {
        super();
    }

    id(_: Node | Edge | Cluster): string {
        return _.id;
    }

    sourceID(e: Edge): string {
        return e.sourceID as string;
    }

    targetID(e: Edge): string {
        return e.targetID as string;
    }

    graph(): Graph;
    graph(_: Graph): this;
    graph(_?: Graph): Graph | this {
        if (arguments.length === 0) return this._graph;
        this._graph = _!;
        return this;
    }

    load(vertices: Node[], edges: Edge[], subgraphs: Cluster[] = [], graph: Graph = {}): this {
        this.clear();
        this._graph = graph;

        const subgraphMap = new Map<string, Cluster>();

        subgraphs.forEach((sg: Cluster) => {
            subgraphMap.set(sg.id, sg);
            this.addSubgraph(sg);
        });

        subgraphs.forEach((sg: Cluster) => {
            if (sg.parentID) {
                const parent = subgraphMap.get(sg.parentID as string);
                if (parent) {
                    this.setParent(sg, parent);
                }
            }
        });

        const vertexMap = new Map<string, Node>();
        vertices.forEach((v: Node) => {
            vertexMap.set(v.id, v);
            const parent = v.parentID ? subgraphMap.get(v.parentID as string) : undefined;
            this.addVertex(v, parent);
        });

        edges.forEach((e: Edge) => {
            const source = vertexMap.get(e.sourceID as string)!;
            const target = vertexMap.get(e.targetID as string)!;
            this.addEdge(source, target, e);
        });

        return this;
    }

    createView(selection: string[]): this {
        const view = new (Object.getPrototypeOf(this).constructor)() as Store;
        const idSet = new Set(selection.map(String));

        const subgraphMap = new Map<string, Cluster>();
        for (const sg of this.subgraphs()) {
            subgraphMap.set(sg.id, sg);
        }
        const vertexMap = new Map<string, Node>();
        for (const v of this.vertices()) {
            vertexMap.set(v.id, v);
        }

        const addSubgraphRecursive = (sg: Cluster, parent?: Cluster) => {
            if (view.hasSubgraph(sg)) return;
            view.addSubgraph(sg, parent);
            for (const child of this.subgraphSubgraphs(sg)) {
                addSubgraphRecursive(child, sg);
            }
            for (const v of this.subgraphVertices(sg)) {
                view.addVertex(v, sg);
            }
        };

        for (const id of selection) {
            const strId = String(id);
            const sg = subgraphMap.get(strId);
            if (sg) {
                addSubgraphRecursive(sg);
            } else {
                const v = vertexMap.get(strId);
                if (v) {
                    const parentId = v.parentID as string | undefined;
                    if (parentId) {
                        const parentSg = subgraphMap.get(parentId);
                        if (parentSg) {
                            addSubgraphRecursive(parentSg);
                        }
                    }
                }
            }
        }

        for (const edge of this.edges()) {
            if (view.hasEdge(edge)) continue;
            const source = this.source(edge);
            const target = this.target(edge);
            if (view.hasVertex(source) && view.hasVertex(target)) {
                view.addEdge(source, target, edge);
            }
        }

        view.graph(this._graph);
        return view as this;
    }
}