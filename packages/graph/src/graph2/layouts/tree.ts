import { Graph2 } from "@hpcc-js/util";
import { cluster, hierarchy, tree } from "d3-hierarchy";
import { linkHorizontal as d3LinkHorizontal } from "d3-shape";
import { Hierarchy } from "./dagreWorker.ts";
import { Layout, Point } from "./layout.ts";
import { VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder } from "./placeholders.ts";

const linkHorizontal = d3LinkHorizontal<any, { x: number, y: number }>()
    .x(d => d.x)
    .y(d => d.y)
    ;

class Bounds {

    get x() {
        return this.x1;
    }

    get y() {
        return this.y1;
    }

    get width() {
        return this.x2 - this.x1;
    }

    get height() {
        return this.y2 - this.y1;
    }

    get center() {
        return {
            x: this.x1 + this.width / 2,
            y: this.y1 + this.height / 2
        };
    }

    constructor(public x1: number = 0, public y1: number = 0, public x2: number = x1, public y2: number = y1) {
    }

    reset(x: number, y: number) {
        this.x1 = x;
        this.x2 = x;
        this.y1 = y;
        this.y2 = y;
    }

    expand(x: number, y: number) {
        if (this.x1 > x) {
            this.x1 = x;
        } else if (this.x2 < x) {
            this.x2 = x;
        }
        if (this.y1 > y) {
            this.y1 = y;
        } else if (this.y2 < y) {
            this.y2 = y;
        }
    }
}

interface Node {
    origData: VertexPlaceholder;
    children: Node[];
}

export interface EdgeLayout {
    path: string;
    labelPos: Point;
}

export interface Options {

}

export interface TidyTreeOptions extends Options {
    rankdir: "TB" | "LR";
}

export class TidyTreeBase extends Layout {

    constructor(graph, protected options: Options) {
        super(graph);
    }

    private _visited = {};
    protected _tree: Node;
    protected _d3Hierarchy: Hierarchy;

    protected sortTree(data: Graph2, node?: Node) {
        if (!node) {
            node = this._tree;
        }
        //  Place busiest children at the top of the list   ---
        node.children.sort((l, r) => data.neighbors(r.origData.id).length - data.neighbors(l.origData.id).length);

        //  Move busiest children to the middle of the list  ---
        const children: Node[] = [];
        node.children.forEach((n, i) => {
            if (i % 2 === 0) {
                children.push(n);
            } else {
                children.unshift(n);
            }
        });
        node.children = children;

        //  Recurse  ---
        node.children.forEach(cnode => this.sortTree(data, cnode));
    }

    protected depthFirst(data: Graph2<VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder>, v: VertexPlaceholder, parent?) {
        if (parent === undefined) {
            this._visited = {};
            this._tree = undefined;
        }

        if (!this._visited[v.id]) {
            this._visited[v.id] = v;
            const node: Node = {
                origData: v,
                children: []
            };
            if (parent === undefined) {
                this._tree = node;
            } else {
                parent.children.push(node);
            }
            data.neighbors(v.id).forEach(n => this.depthFirst(data, n, node));
        }
    }

    protected breadthFirst(data: Graph2<VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder>, v: VertexPlaceholder) {
        this._visited = {};
        this._visited[v.id] = v;
        this._tree = {
            origData: v,
            children: []
        };

        const q: Node[] = [];
        q.push(this._tree);
        while (q.length) {
            const node = q.shift();
            data.neighbors(node.origData.id).forEach(n => {
                if (!this._visited[n.id]) {
                    this._visited[n.id] = n;
                    const nnode = {
                        origData: n,
                        children: []
                    };
                    node.children.push(nnode);
                    q.push(nnode);
                }
            });
        }
        this.sortTree(data);
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const data = this._graph.graphData();
            const vertices = data.allVertices();

            let centroid; //  TODO Could Be Many (default should be all with 0 in edges?)
            for (const v of vertices) {
                delete v.fx;
                delete v.fy;
                if (centroid === undefined) {
                    centroid = v;
                }
                if (v.props.centroid) {
                    centroid = v;
                    break;
                }
            }

            const edges = data.allEdges();
            edges.forEach(e => delete e.points);

            this.breadthFirst(data, centroid);
            this._d3Hierarchy = hierarchy(this._tree);
            return this;
        });
    }

    finalize(nodes: Node[]) {
        const size = this._graph.size();

        const bounds = new Bounds();
        nodes.forEach((d, i) => {
            if (i === 0) {
                bounds.reset(d.origData.x, d.origData.y);
            } else {
                bounds.expand(d.origData.x, d.origData.y);
            }
        });

        const offset = {
            x: size.width / 2 - bounds.center.x,
            y: size.height / 2 - bounds.center.y
        };

        nodes.forEach(d => {
            d.origData.x += offset.x;
            d.origData.y += offset.y;
        });

        this._graph
            .moveVertices(true)
            .moveEdges(true)
            ;
        this.stop();
    }
}

export class Tree extends TidyTreeBase {

    constructor(graph, protected options: TidyTreeOptions) {
        super(graph, options);
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const treeFunc = tree().nodeSize([this.options.rankdir === "TB" ? 200 : 100, this.options.rankdir === "TB" ? 100 : 200]);
            const root = treeFunc(this._d3Hierarchy);
            const nodes: Node[] = root.descendants().map((d) => {
                d.data.origData.x = this.options.rankdir === "TB" ? d.x : d.y;
                d.data.origData.y = this.options.rankdir === "TB" ? d.y : d.x;
                return d.data;
            });

            this.finalize(nodes);
            return this;
        });
    }

    edgePath(ep: EdgePlaceholder, curveDepth: number): EdgeLayout {
        const source = this._graph.projectPlacholder(ep.source);
        const target = this._graph.projectPlacholder(ep.target);
        return {
            path: linkHorizontal({ source, target }),
            labelPos: this.center([[source.x, source.y], [target.x, target.y]])
        };
    }
}

export class RadialTree extends TidyTreeBase {

    constructor(graph) {
        super(graph, {});
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const treeFunc = tree()
                .size([2 * Math.PI, 1024 / 2])
                .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
                ;
            const root = treeFunc(this._d3Hierarchy);
            const nodes: Node[] = root.descendants().map((d) => {
                d.data.origData.angle = d.x;
                d.data.origData.radius = d.y;
                d.data.origData.x = Math.sin(d.x) * d.y;
                d.data.origData.y = Math.cos(d.x) * d.y;
                return d.data;
            });

            this.finalize(nodes);
            return this;
        });
    }
}

export class Dendrogram extends TidyTreeBase {

    constructor(graph, protected options: TidyTreeOptions) {
        super(graph, options);
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const treeFunc = cluster().nodeSize([this.options.rankdir === "TB" ? 200 : 100, this.options.rankdir === "TB" ? 100 : 200]);
            const root = treeFunc(this._d3Hierarchy);
            const nodes: Node[] = root.descendants().map((d) => {
                d.data.origData.x = this.options.rankdir === "TB" ? d.x : d.y;
                d.data.origData.y = this.options.rankdir === "TB" ? d.y : d.x;
                return d.data;
            });

            this.finalize(nodes);
            return this;
        });
    }

    edgePath(ep: EdgePlaceholder, curveDepth: number): EdgeLayout {
        const source = this._graph.projectPlacholder(ep.source);
        const target = this._graph.projectPlacholder(ep.target);
        return {
            path: linkHorizontal({ source, target }),
            labelPos: this.center([[source.x, source.y], [target.x, target.y]])
        };
    }
}

export class RadialDendrogram extends TidyTreeBase {

    constructor(graph) {
        super(graph, {});
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const treeFunc = cluster()
                .size([2 * Math.PI, 1024 / 2])
                .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
                ;
            const root = treeFunc(this._d3Hierarchy);
            const nodes: Node[] = root.descendants().map((d) => {
                d.data.origData.x = Math.sin(d.x) * d.y;
                d.data.origData.y = Math.cos(d.x) * d.y;
                return d.data;
            });

            this.finalize(nodes);
            return this;
        });
    }
}