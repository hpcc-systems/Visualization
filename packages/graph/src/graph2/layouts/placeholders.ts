import { Selection } from "@hpcc-js/common";
import { Edge, Subgraph, Vertex } from "@hpcc-js/react";

export interface ISubgraph extends Subgraph {
    id: string;
    origData?: any;
}

export interface IVertex extends Vertex {
    id: string;
    origData?: any;
    centroid?: boolean;
}

export interface IEdge extends Edge {
    id: string;
    source: IVertex;
    target: IVertex;
    label?: string;
    origData?: any;
}

export interface IHierarchy {
    id: string;
    parent: ISubgraph;
    child: ISubgraph | IVertex;
}

export interface IGraphData2 {
    subgraphs?: ISubgraph[];
    vertices: IVertex[];
    edges: IEdge[];
    hierarchy?: IHierarchy[];
}

export interface SubgraphPlaceholder {
    id: string;
    element?: Selection<SVGGElement, SubgraphPlaceholder, SVGGElement, any>;
    props: ISubgraph;

    //  Dagre / Graphviz Properties  ---
    x?: number; // The node’s current x-position
    y?: number; // The node’s current y-position
}

export interface VertexPlaceholder {
    id: string;
    element?: Selection<SVGGElement, VertexPlaceholder, SVGGElement, any>;
    props: IVertex;
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

export interface EdgePlaceholder {
    id: string;
    element?: Selection<SVGGElement, EdgePlaceholder, SVGGElement, any>;
    elementPath?: Selection<SVGPathElement, EdgePlaceholder, SVGGElement, any>;
    elementText?: Selection<SVGTextElement, EdgePlaceholder, SVGGElement, any>;
    props: IEdge;
    source: VertexPlaceholder; // The link’s source node
    target: VertexPlaceholder; // The link’s target node

    //  D3 Assigned Properties  ---
    index?: number; // The zero-based index into links, assigned by this method

    //  Dagre Assigned Properties  ---
    points?: Array<[number, number]>;
}
