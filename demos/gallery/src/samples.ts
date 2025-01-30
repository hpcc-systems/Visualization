import samples from "../samples/samples.json" with {type: "json"};

export interface Node {
    path: string;
    name: string;
    type: "folder" | "file";
    children?: Node[];
}

export const sampleIdx: { [path: string]: Node } = {};
export const sampleFolders: Node[] = [];
export const sampleFiles = [];
export function index(node: Node, parentName: string = "") {
    const fullName = parentName ? `${parentName}/${node.name}` : node.name;
    sampleIdx[node.path] = node;
    switch (node.type) {
        case "file":
            sampleFiles.push(node);
            break;
        case "folder":
            sampleFolders.push({
                ...node,
                name: fullName
            });
            node.children.forEach(row => index(row, fullName));
            break;
    }
}

index(samples as any);
