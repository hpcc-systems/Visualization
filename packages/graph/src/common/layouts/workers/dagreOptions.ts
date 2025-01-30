export interface Subgraph {
    id: string;
    text: string;
}

export interface Node {
    id: string;
    text: string;
}

export interface Link {
    id: string;
    source: Node;
    target: Node;
}

export interface Hierarchy {
    parent: string;
    child: string;
}

export interface Data {
    subgraphs: Subgraph[];
    nodes: Node[];
    links: Link[];
    hierarchy: Hierarchy[];
}

export interface Options {
    rankdir: "TB" | "BT" | "LR" | "RL";
    nodesep: number;
    edgesep: number;
    ranksep: number;
    digraph: boolean;
}
