export type GraphWalkAction = "abort" | "stepover" | void;
export type GraphWalkDirection = "out" | "in" | "both";

import { Tree } from "./tree.ts";

export type HierarchicalGraphChild<V extends object, S extends object> = V | S;

export interface HierarchicalGraphOptions<S extends object> {
	directed?: boolean;
	rootSubgraph?: S;
}

export interface HierarchicalGraphSetParentOptions {
	reparent?: boolean;
	index?: number;
}

export class HierarchicalGraph<V extends object, E extends object, S extends object = object> {

	protected _directed: boolean;

	protected _vertices: Set<V> = new Set();
	protected _edges: Set<E> = new Set();
	protected _subgraphs: Set<S> = new Set();

	protected _rootSubgraph: S;
	protected _hierarchy: Tree<HierarchicalGraphChild<V, S>>;

	protected _sourceOf: Map<E, V> = new Map();
	protected _targetOf: Map<E, V> = new Map();

	protected _outEdgesOf: Map<V, E[]> = new Map();
	protected _inEdgesOf: Map<V, E[]> = new Map();

	constructor(options: HierarchicalGraphOptions<S> = {}) {
		this._directed = options.directed ?? true;
		this._rootSubgraph = (options.rootSubgraph ?? ({} as S));
		this._subgraphs.add(this._rootSubgraph);
		this._hierarchy = new Tree<HierarchicalGraphChild<V, S>>(this._rootSubgraph);
	}

	rootSubgraph(): S {
		return this._rootSubgraph;
	}

	isDirected(): boolean {
		return this._directed;
	}

	subgraphCount(): number {
		return this._subgraphs.size;
	}

	vertexCount(): number {
		return this._vertices.size;
	}

	edgeCount(): number {
		return this._edges.size;
	}

	vertices(): V[] {
		return [...this._vertices];
	}

	subgraphs(): S[] {
		return [...this._subgraphs];
	}

	edges(): E[] {
		return [...this._edges];
	}

	hasVertex(vertex: V): boolean {
		return this._vertices.has(vertex);
	}

	hasSubgraph(subgraph: S): boolean {
		return this._subgraphs.has(subgraph);
	}

	hasEdge(edge: E): boolean {
		return this._edges.has(edge);
	}

	addVertex(vertex: V, parentSubgraph: S = this._rootSubgraph): void {
		if (this._vertices.has(vertex)) {
			throw new Error("Vertex already exists");
		}
		if (this._subgraphs.has(vertex as unknown as S)) {
			throw new Error("Object is already a subgraph");
		}
		this._assertSubgraphExists(parentSubgraph);
		this._vertices.add(vertex);
		this._hierarchy.addChild(parentSubgraph, vertex);
	}

	addVertices(vertices: Iterable<V>): void {
		for (const v of vertices) {
			this.addVertex(v);
		}
	}

	addSubgraph(subgraph: S, parentSubgraph: S = this._rootSubgraph, options: HierarchicalGraphSetParentOptions = {}): void {
		if (this._subgraphs.has(subgraph)) {
			throw new Error("Subgraph already exists");
		}
		if (this._vertices.has(subgraph as unknown as V)) {
			throw new Error("Object is already a vertex");
		}
		this._assertSubgraphExists(parentSubgraph);
		this._subgraphs.add(subgraph);
		this._hierarchy.addChild(parentSubgraph, subgraph, options);
	}

	setParent(child: HierarchicalGraphChild<V, S>, parentSubgraph: S, options: HierarchicalGraphSetParentOptions = {}): void {
		this._assertChildExists(child);
		this._assertSubgraphExists(parentSubgraph);
		this._hierarchy.addChild(parentSubgraph, child, { reparent: true, ...options });
	}

	parentSubgraph(child: HierarchicalGraphChild<V, S>): S | undefined {
		this._assertChildExists(child);
		const parent = this._hierarchy.parent(child);
		if (parent === undefined) return undefined;
		// Tree guarantees parent is a node; we enforce that only subgraphs can be parents.
		return parent as S;
	}

	subgraphChildren(subgraph: S): Array<HierarchicalGraphChild<V, S>> {
		this._assertSubgraphExists(subgraph);
		return this._hierarchy.children(subgraph);
	}

	subgraphSubgraphs(subgraph: S): S[] {
		this._assertSubgraphExists(subgraph);
		const result: S[] = [];
		for (const child of this._hierarchy.children(subgraph)) {
			if (this._subgraphs.has(child as S)) result.push(child as S);
		}
		return result;
	}

	subgraphVertices(subgraph: S): V[] {
		this._assertSubgraphExists(subgraph);
		const result: V[] = [];
		for (const child of this._hierarchy.children(subgraph)) {
			if (this._vertices.has(child as V)) result.push(child as V);
		}
		return result;
	}

	removeVertex(vertex: V): void {
		this._assertVertexExists(vertex);

		// Remove incident edges first (copy because removeEdge mutates adjacency)
		const incident = new Set<E>();
		for (const e of this._outEdgesOf.get(vertex) || []) incident.add(e);
		for (const e of this._inEdgesOf.get(vertex) || []) incident.add(e);
		for (const e of incident) {
			this.removeEdge(e);
		}

		this._outEdgesOf.delete(vertex);
		this._inEdgesOf.delete(vertex);
		this._vertices.delete(vertex);
		if (this._hierarchy.has(vertex)) {
			this._hierarchy.remove(vertex);
		}
	}

	removeSubgraph(subgraph: S, removeChildren: boolean = true): void {
		this._assertSubgraphExists(subgraph);
		if (subgraph === this._rootSubgraph) {
			throw new Error("Cannot remove root subgraph");
		}

		if (removeChildren) {
			const subtree: Array<HierarchicalGraphChild<V, S>> = [];
			this._hierarchy.walk(subgraph, node => {
				subtree.push(node);
			});

			// Remove contained vertices (also removes incident edges)
			for (const node of subtree) {
				if (this._vertices.has(node as V)) {
					this.removeVertex(node as V);
				}
			}

			// Remove contained subgraphs from the set (tree will be pruned by remove below)
			for (const node of subtree) {
				if (this._subgraphs.has(node as S)) {
					this._subgraphs.delete(node as S);
				}
			}
		} else {
			this._subgraphs.delete(subgraph);
		}

		if (this._hierarchy.has(subgraph)) {
			this._hierarchy.remove(subgraph, removeChildren);
		}
	}

	addEdge(source: V, target: V, edge: E, options: { addMissingVertices?: boolean } = {}): void {
		if (this._edges.has(edge)) {
			throw new Error("Edge already exists");
		}

		const addMissingVertices = options.addMissingVertices ?? true;
		if (!this._vertices.has(source)) {
			if (!addMissingVertices) throw new Error("Source vertex does not exist");
			this.addVertex(source);
		}
		if (!this._vertices.has(target)) {
			if (!addMissingVertices) throw new Error("Target vertex does not exist");
			this.addVertex(target);
		}

		this._edges.add(edge);
		this._sourceOf.set(edge, source);
		this._targetOf.set(edge, target);

		this._addOutEdge(source, edge);
		this._addInEdge(target, edge);

		if (!this._directed && source !== target) {
			// For undirected graphs, treat every edge as incident to both ends in both directions
			this._addOutEdge(target, edge);
			this._addInEdge(source, edge);
		}
	}

	removeEdge(edge: E): void {
		this._assertEdgeExists(edge);

		const source = this._sourceOf.get(edge)!;
		const target = this._targetOf.get(edge)!;

		this._removeFromAdjacency(this._outEdgesOf.get(source), edge);
		this._removeFromAdjacency(this._inEdgesOf.get(target), edge);

		if (!this._directed && source !== target) {
			this._removeFromAdjacency(this._outEdgesOf.get(target), edge);
			this._removeFromAdjacency(this._inEdgesOf.get(source), edge);
		}

		this._edges.delete(edge);
		this._sourceOf.delete(edge);
		this._targetOf.delete(edge);
	}

	source(edge: E): V {
		this._assertEdgeExists(edge);
		return this._sourceOf.get(edge)!;
	}

	target(edge: E): V {
		this._assertEdgeExists(edge);
		return this._targetOf.get(edge)!;
	}

	outEdges(vertex: V): E[] {
		this._assertVertexExists(vertex);
		return [...(this._outEdgesOf.get(vertex) || [])];
	}

	inEdges(vertex: V): E[] {
		this._assertVertexExists(vertex);
		return [...(this._inEdgesOf.get(vertex) || [])];
	}

	incidentEdges(vertex: V): E[] {
		this._assertVertexExists(vertex);
		const edges = new Set<E>();
		for (const e of this._outEdgesOf.get(vertex) || []) edges.add(e);
		for (const e of this._inEdgesOf.get(vertex) || []) edges.add(e);
		return [...edges];
	}

	neighbors(vertex: V, direction: GraphWalkDirection = "out"): V[] {
		this._assertVertexExists(vertex);
		const neighbors = new Set<V>();

		const addNeighborFromEdge = (e: E, from: V) => {
			const s = this._sourceOf.get(e)!;
			const t = this._targetOf.get(e)!;
			if (from === s) neighbors.add(t);
			else if (from === t) neighbors.add(s);
		};

		if (direction === "out" || direction === "both") {
			for (const e of this._outEdgesOf.get(vertex) || []) {
				addNeighborFromEdge(e, vertex);
			}
		}
		if (direction === "in" || direction === "both") {
			for (const e of this._inEdgesOf.get(vertex) || []) {
				addNeighborFromEdge(e, vertex);
			}
		}
		return [...neighbors];
	}

	clear(): void {
		this._vertices.clear();
		this._edges.clear();
		this._subgraphs.clear();
		this._subgraphs.add(this._rootSubgraph);
		this._sourceOf.clear();
		this._targetOf.clear();
		this._outEdgesOf.clear();
		this._inEdgesOf.clear();
		this._hierarchy.clear();
	}

	walk(visitor: (vertex: V) => GraphWalkAction, options?: { direction?: GraphWalkDirection }): void;
	walk(start: V, visitor: (vertex: V) => GraphWalkAction, options?: { direction?: GraphWalkDirection }): void;
	walk(
		startOrVisitor: V | ((vertex: V) => GraphWalkAction),
		visitorOrOptions?: ((vertex: V) => GraphWalkAction) | { direction?: GraphWalkDirection },
		maybeOptions?: { direction?: GraphWalkDirection }
	): void {
		const hasStart = typeof startOrVisitor !== "function";
		const startVertex = hasStart ? startOrVisitor : undefined;
		const visitor = hasStart ? (visitorOrOptions as (vertex: V) => GraphWalkAction) : startOrVisitor;
		const options = hasStart ? maybeOptions : (visitorOrOptions as { direction?: GraphWalkDirection } | undefined);
		const direction = options?.direction ?? "out";

		const visited = new Set<V>();

		const _walkFrom = (v: V): boolean => {
			visited.add(v);
			const action = visitor(v);
			if (action === "abort") return true;
			if (action !== "stepover") {
				for (const n of this.neighbors(v, direction)) {
					if (!visited.has(n)) {
						if (_walkFrom(n)) return true;
					}
				}
			}
			return false;
		};

		if (startVertex !== undefined) {
			this._assertVertexExists(startVertex);
			_walkFrom(startVertex);
			return;
		}

		for (const v of this._vertices) {
			if (!visited.has(v)) {
				if (_walkFrom(v)) return;
			}
		}
	}

	protected _assertVertexExists(vertex: V): void {
		if (!this._vertices.has(vertex)) {
			throw new Error("Vertex does not exist");
		}
	}

	protected _assertSubgraphExists(subgraph: S): void {
		if (!this._subgraphs.has(subgraph)) {
			throw new Error("Subgraph does not exist");
		}
	}

	protected _assertChildExists(child: HierarchicalGraphChild<V, S>): void {
		if (this._vertices.has(child as V)) return;
		if (this._subgraphs.has(child as S)) return;
		throw new Error("Item does not exist");
	}

	protected _assertEdgeExists(edge: E): void {
		if (!this._edges.has(edge)) {
			throw new Error("Edge does not exist");
		}
	}

	protected _addOutEdge(vertex: V, edge: E): void {
		let edges = this._outEdgesOf.get(vertex);
		if (!edges) {
			edges = [];
			this._outEdgesOf.set(vertex, edges);
		}
		edges.push(edge);
	}

	protected _addInEdge(vertex: V, edge: E): void {
		let edges = this._inEdgesOf.get(vertex);
		if (!edges) {
			edges = [];
			this._inEdgesOf.set(vertex, edges);
		}
		edges.push(edge);
	}

	protected _removeFromAdjacency(arr: E[] | undefined, edge: E): void {
		if (!arr) return;
		const idx = arr.indexOf(edge);
		if (idx >= 0) arr.splice(idx, 1);
	}
}

/**
 * @deprecated Renamed to `HierarchicalGraph`.
 */
export class Graph3<V extends object, E extends object> extends HierarchicalGraph<V, E, object> {
	constructor(options: { directed?: boolean; rootSubgraph?: object } = {}) {
		super(options);
	}
}
