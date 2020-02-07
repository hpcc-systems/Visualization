import * as React from "@hpcc-js/preact-shim";
import { curveBasis as d3CurveBasis, line as d3Line } from "d3-shape";

type Point = [number, number];

const line = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveBasis)
    ;

function calcArc(points: Point[], curveDepth: number): Point[] {
    if (points.length === 2 && curveDepth) {
        const dx = points[0][0] - points[1][0];
        const dy = points[0][1] - points[1][1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist) {
            const midX = (points[0][0] + points[1][0]) / 2 - dy * curveDepth / 100;
            const midY = (points[0][1] + points[1][1]) / 2 + dx * curveDepth / 100;
            return [points[0], [midX, midY], points[1]];
        }
    }
    return points;
}

export interface Edge {
    points?: Array<[number, number]>;
    curveDepth?: number;
    stroke?: string;
    strokeDasharray?: string;
    weight?: number;
}

export const Edge: React.FunctionComponent<Edge> = ({
    points = [],
    curveDepth = 16,
    stroke = "black",
    strokeDasharray
}) => {
    console.log("strokeDasharray", strokeDasharray);
    return <path stroke={stroke} stroke-dasharray={strokeDasharray} d={line(calcArc(points, curveDepth))}></path>;
};
