export interface Node {
    id: string;
    text: string;
}

export interface Link {
    id: string;
    source: Node;
    target: Node;
}

export interface Data {
    nodes: Node[];
    links: Link[];
}

export interface Options {
    alpha: number;
    alphaMin: number;
    alphaDecay: number;
    velocityDecay: number;
    repulsionStrength: number;
    linkDistance: number;
    linkStrength: number;
    iterations: number;
}
