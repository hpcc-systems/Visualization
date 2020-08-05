import { Graph2 as GraphCollection } from "@hpcc-js/util";
import { curveBasis as d3CurveBasis, curveCardinal as d3CurveCardinal, line as d3Line } from "d3-shape";
import { EdgePlaceholder, SubgraphPlaceholder, VertexPlaceholder } from "./placeholders";
import { EdgeLayout } from "./tree";

export type Point = [number, number];

const lineBasis = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveBasis)
    ;

const lineCardinal = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveCardinal)
    ;

export interface ILayout {
    start(): Promise<this>;
    stop(): this;
    running(): boolean;

    edgePath(e: EdgePlaceholder, curveDepth: number): EdgeLayout;
}

export type Size = { width: number, height: number };
export interface IGraph {
    size(): Size;
    graphData(): GraphCollection<VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder>;

    project(pos: number, clip: boolean);
    projectPlacholder(vp: VertexPlaceholder);

    moveSubgraphs(transition: boolean): this;

    moveVertexPlaceholder(vp: VertexPlaceholder, transition: boolean, moveEdges: boolean): this;
    moveVertices(transition: boolean): this;

    moveEdgePlaceholder(ep: EdgePlaceholder, transition: boolean): this;
    moveEdges(transition: boolean): this;

    progress(what: "start" | "stop" | "layout-start" | "layout-tick" | "layout-stop");
}

export class Layout implements ILayout {

    protected _graph: IGraph;
    protected _running = false;

    constructor(graph: IGraph) {
        this._graph = graph;
    }

    start(): Promise<this> {
        this._running = true;
        this._graph.progress("layout-start");
        return Promise.resolve(this);
    }

    stop() {
        this._running = false;
        this._graph.progress("layout-stop");
        return this;
    }

    running(): boolean {
        return this._running;
    }

    protected center(points: Point[]): Point {
        if (points.length % 2 === 1) {
            return points[Math.floor(points.length / 2)];
        }
        const p1 = points[points.length / 2 - 1];
        const p2 = points[points.length / 2];
        return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    }

    edgePath(ep: EdgePlaceholder, curveDepth: number): { path: string, labelPos: Point } {
        const sPos = this._graph.projectPlacholder(ep.source);
        const tPos = this._graph.projectPlacholder(ep.target);
        const points: Point[] = [[sPos.x, sPos.y], [tPos.x, tPos.y]];

        if (curveDepth) {
            const dx = points[0][0] - points[1][0];
            const dy = points[0][1] - points[1][1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist) {
                const midX = (points[0][0] + points[1][0]) / 2 - dy * curveDepth / 100;
                const midY = (points[0][1] + points[1][1]) / 2 + dx * curveDepth / 100;
                return {
                    path: lineCardinal([points[0], [midX, midY], points[1]]),
                    labelPos: [midX, midY]
                };
            }
        }

        return {
            path: lineBasis(points),
            labelPos: this.center(points)
        };
    }
}
