export type Engine = "circo" | "dot" | "fdp" | "neato" | "osage" | "patchwork" | "twopi";

export interface Cluster {
    id: string;
    text: string;
    children: Array<Cluster | Node>;

    // result  ---
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface Node {
    id: string;
    text: string;
    width: number;
    height: number;

    // result  ---
    x?: number;
    y?: number;
}

export function isCluster(item: Cluster | Node): item is Cluster {
    return (item as Cluster).children !== undefined;
}

export interface Link {
    id: string;
    source: Node;
    target: Node;
    text: string;

    // result  ---
    points?: Array<[number, number]>;
}

export interface Data {
    items: Array<Cluster | Node>;
    links: Link[];
    raw: string;
}

export interface Options {
    engine: Engine;
}

export interface LayoutError {
    error?: string;
    errorDot?: string;
}

export interface LayoutSVG extends LayoutError {
    svg?: string;
}

export interface LayoutJSON extends LayoutError {
    json?: any;
}

export type LayoutSuccess = { clusters: Cluster[], nodes: Node[], links: Link[] };
export type Layout = LayoutSuccess | LayoutJSON | LayoutSVG;

export function isLayoutSuccess(item: any): item is LayoutSuccess {
    return (item as LayoutSuccess)?.clusters !== undefined &&
        (item as LayoutSuccess)?.nodes !== undefined &&
        (item as LayoutSuccess)?.links !== undefined;
}
