import { Selection } from "@hpcc-js/common";

export interface DraggablePlaceholder {
    id: string;
    element?: Selection<SVGGElement, DraggablePlaceholder, SVGGElement, any>;
    props: any;
    centroid?: boolean;

    //  D3 Assigned Properties  ---
    index?: number; // The node’s zero-based index into nodes
    x?: number; // The node’s current x-position
    y?: number; // The node’s current y-position
    fx?: number; // The node’s fixed x-position
    fy?: number; // The node’s fixed y-position
    vx?: number; // The node’s current x-velocity
    vy?: number; // The node’s current y-velocity

    //  HPCC Drag /Drop Assigned Properties  ---
    sx?: number; // The node’s drag start x
    sy?: number; // The node’s drag start y

    //  Dagre / Graphviz Properties  ---
    points?: Array<[number, number]>;

    //  Geo Locations  ---
    lat?: number;
    lng?: number;
}
