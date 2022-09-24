import { Selection } from "@hpcc-js/common";

export interface BaseProps {
    id: string;
    origData?: any;
}

export interface VertexProps extends BaseProps {
    text: string;
    categoryID?: string;
    centroid?: boolean;
    hidden?: boolean;
    tooltip?: string;
    annotationIDs?: string[];
}

export interface SubgraphProps extends BaseProps {
    text: string;
    width?: number;
    height?: number;
}

export interface EdgeProps extends BaseProps {
    source: VertexProps;
    target: VertexProps;
    weight?: number;
    strokeDasharray?: string;
    label?: string;
    color?: string;
    fontFamily?: string;
}

export interface HierarchyBase<SG extends SubgraphProps, V extends VertexProps> {
    id: string;
    parent: SG;
    child: SG | V;
}

export interface IGraphData2<SG extends SubgraphProps, V extends VertexProps, E extends EdgeProps> {
    subgraphs?: SG[];
    vertices: V[];
    edges: E[];
    hierarchy?: HierarchyBase<SG, V>[];
}

export interface SubgraphPlaceholder<SG extends SubgraphProps = SubgraphProps> {
    id: string;
    element?: Selection<SVGGElement, SubgraphPlaceholder<SG>, SVGGElement, any>;
    props: SG;

    //  Dagre / Graphviz Properties  ---
    x?: number; // The node’s current x-position
    y?: number; // The node’s current y-position
}

export interface VertexPlaceholder<V extends VertexProps = VertexProps> {
    id: string;
    element?: Selection<SVGGElement, VertexPlaceholder<V>, SVGGElement, any>;
    props: V;

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

    //  Geo Locations  ---
    lat?: number;
    lng?: number;
}

export interface EdgePlaceholder<E extends EdgeProps = EdgeProps, V extends VertexProps = VertexProps> {
    id: string;
    element?: Selection<SVGGElement, EdgePlaceholder<E, V>, SVGGElement, any>;
    elementPath?: Selection<SVGPathElement, EdgePlaceholder<E, V>, SVGGElement, any>;
    elementText?: Selection<SVGTextElement, EdgePlaceholder<E, V>, SVGGElement, any>;
    props: E;
    source: VertexPlaceholder<V>; // The link’s source node
    target: VertexPlaceholder<V>; // The link’s target node

    //  D3 Assigned Properties  ---
    index?: number; // The zero-based index into links, assigned by this method

    //  Dagre Assigned Properties  ---
    points?: Array<[number, number]>;
}
