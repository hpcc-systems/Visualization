import { Selection } from "@hpcc-js/common";

export interface BaseProps {
    id: string | number;
    origData?: any;
}

export interface VertexBaseProps extends BaseProps {
    text: string;
    categoryID?: string;
    centroid?: boolean;
    hidden?: boolean;
    tooltip?: string;
    annotationIDs?: string[];
}

export interface SubgraphBaseProps extends BaseProps {
    text: string;
    width?: number;
    height?: number;
}

export type Point = [number, number];

export interface EdgeBaseProps<V extends VertexBaseProps = VertexBaseProps> extends BaseProps {
    source: V;
    target: V;
    label?: string;
    labelPos?: Point;
    weight?: number;
    strokeDasharray?: string;
    strokeWidth?: number;
    stroke?: string;
    path?: string;
    fontFamily?: string;
    markerStart?: string;
    markerEnd?: string;
}

export interface HierarchyBase<SG extends SubgraphBaseProps, V extends VertexBaseProps> {
    id: string | number;
    parent: SG;
    child: SG | V;
}

export interface GraphDataProps<SG extends SubgraphBaseProps, V extends VertexBaseProps, E extends EdgeBaseProps<V>> {
    subgraphs?: SG[];
    vertices: V[];
    edges: E[];
    hierarchy?: HierarchyBase<SG, V>[];
}

export interface SubgraphPlaceholder<SG extends SubgraphBaseProps = SubgraphBaseProps> {
    id: string | number;
    element?: Selection<SVGGElement, SubgraphPlaceholder<SG>, SVGGElement, any>;
    props: SG;

    //  render result properties  ---
    renderResult?: unknown;

    //  Dagre / Graphviz Properties  ---
    x?: number; // The node’s current x-position
    y?: number; // The node’s current y-position
}

export interface VertexPlaceholder<V extends VertexBaseProps = VertexBaseProps> {
    id: string | number;
    element?: Selection<SVGGElement, VertexPlaceholder<V>, SVGGElement, any>;
    props: V;

    //  render result properties  ---
    renderResult?: any;

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

export interface EdgePlaceholder<V extends VertexBaseProps = VertexBaseProps, E extends EdgeBaseProps<V> = EdgeBaseProps<V>> {
    id: string | number;
    element?: Selection<SVGGElement, EdgePlaceholder<V, E>, SVGGElement, any>;
    elementPath?: Selection<SVGPathElement, EdgePlaceholder<V, E>, SVGGElement, any>;
    elementText?: Selection<SVGTextElement, EdgePlaceholder<V, E>, SVGGElement, any>;
    props: E;
    source: VertexPlaceholder<V>; // The link’s source node
    target: VertexPlaceholder<V>; // The link’s target node

    //  render result properties  ---
    renderResult?: any;

    //  D3 Assigned Properties  ---
    index?: number; // The zero-based index into links, assigned by this method

    //  Dagre Assigned Properties  ---
    points?: Array<[number, number]>;
}

export function isEdgePlaceholder<V extends VertexBaseProps = VertexBaseProps, E extends EdgeBaseProps<V> = EdgeBaseProps<V>>(item): item is EdgePlaceholder<V, E> {
    return item.id !== undefined && item.props !== undefined && item.source !== undefined && item.target !== undefined;
}
