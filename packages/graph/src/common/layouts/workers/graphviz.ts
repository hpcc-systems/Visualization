import { Graphviz } from "@hpcc-js/wasm-graphviz";
import { Cluster, Data, Engine, isCluster, Layout, LayoutJSON, LayoutSVG, Link, Node, Options } from "./graphvizOptions.js";

const clusterTpl = (cluster: Cluster): string => {
    const childTpls: string[] = [];
    cluster.children.forEach(child => {
        if (isCluster(child)) {
            childTpls.push(clusterTpl(child));
        } else {
            childTpls.push(nodeTpl(child));
        }
    });
    return `subgraph cluster_${cluster.id} {
id="${cluster.id}";
label="${cluster.text}";
margin=16;
${childTpls.join("\n")}
}`;
};

const nodeTpl = (vc: Node): string => `${vc.id} [id="${vc.id}" label="${vc.text}" width=${pxToInch(vc.width)} height=${pxToInch(vc.height)}]`;

const linkTpl = (s, t, id, label) => `${s} -> ${t} [id="${id}", label="${label}"]`;

type GVPos = {
    x: number;
    y: number;
};

type GVBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const pointToPx = (pt: number) => pt * 96 / 72;
const inchToPx = (inch: number) => inch * 96;
const pxToInch = (inch: number) => inch / 96;

function parseBB(bb?: string): GVBox {
    const [llx, lly, urx, ury] = bb ? bb.split(",").map(p => pointToPx(+p)) : [0, 0, 0, 0];
    const width = urx - llx;
    const height = ury - lly;
    return {
        x: llx - width / 2,
        y: lly - height / 2,
        width,
        height
    };
}

function parseBB2(_bb: string, page: GVBox): GVBox {
    const bb = parseBB(_bb);
    return {
        x: -bb.x + page.width,
        y: -bb.y + page.height,
        width: bb.width,
        height: bb.height
    };
}

function parsePos(pos: string, page: GVBox): GVPos {
    const [x, y] = pos.split(",").map(p => pointToPx(+p));
    return {
        x: -x + page.width,
        y: -y + page.height
    };
}

function parseNode(posStr: string, width: string, height: string, page: GVBox): GVBox {
    const cpos = parsePos(posStr, page);
    const w = inchToPx(+width);
    const h = inchToPx(+height);
    return {
        x: cpos.x,
        y: cpos.y,
        width: w,
        height: h
    };
}

function parseLink(l: any, page: GVBox) {
    if (l.pos) {
        const posStr = l.pos.substr(2);
        const posParts = posStr.split(" ");
        const points: Array<[number, number]> = posParts.map(p => parsePos(p, page)).map(pos => [pos.x - page.width / 2, pos.y - page.height / 2]);
        const endpoint = points.shift();
        return [...points, endpoint];
    }
    return [];
}

async function doLayoutSVG(mode: Engine, dot: string): Promise<LayoutSVG> {
    const graphviz = await Graphviz.load();
    try {
        return {
            svg: graphviz.layout(dot, "svg", mode)
        };
    } catch (e: any) {
        if (e instanceof Error) {
            return {
                error: e.message,
                errorDot: dot
            };
        } else {
            throw e;
        }
    }
}

async function doLayoutJSON(mode: Engine, dot: string): Promise<LayoutJSON> {
    const graphviz = await Graphviz.load();
    try {
        return {
            json: JSON.parse(graphviz.layout(dot, "json", mode))
        };
    } catch (e: any) {
        if (e instanceof Error) {
            return {
                error: e.message,
                errorDot: dot
            };
        } else {
            throw e;
        }
    }
}

function graphvizLayout(data: Data, options: Options): Promise<Layout> {
    if (data.raw) {
        return doLayoutSVG(options.engine, data.raw);
    }

    const clusterIdx: { [id: string]: Cluster } = {};
    const clusters: Cluster[] = [];
    const dotClusters: string[] = [];

    const nodeIdx: { [id: string]: Node } = {};
    const nodes: Node[] = [];
    const dotNodes: string[] = [];

    const linkIdx: { [id: string]: Link } = {};
    const links: Link[] = [];
    const dotLinks: string[] = [];

    function walk(item: Cluster | Node, top: boolean) {
        if (isCluster(item)) {
            clusterIdx[item.id] = item;
            clusters.push(item);
            item.children.forEach(child => walk(child, false));
            if (top) {
                dotClusters.push(clusterTpl(item));
            }
        } else {
            nodeIdx[item.id] = item;
            nodes.push(item);
            if (top) {
                dotNodes.push(nodeTpl(item));
            }
        }
    }
    data.items.forEach(item => walk(item, true));

    data.links.forEach(link => {
        linkIdx[link.id] = link;
        links.push(link);
        dotLinks.push(linkTpl(link.source.id, link.target.id, link.id, link.text));
    });

    return doLayoutJSON(options.engine, `\
digraph G {
    graph [fontname=Verdana,fontsize=11.0];
    graph [rankdir=TB];
    node [shape=rect,fontname=Verdana,fontsize=11.0,fixedsize=true];
    edge [fontname=Verdana,fontsize=11.0];

${dotClusters.join("\n")}

${dotLinks.join("\n")}

${dotNodes.join("\n")}
}`).then(response => {
        if (response.json) {
            const pageBBox = parseBB(response.json.bb);

            if (response.json.objects) {
                response.json.objects.forEach(n => {
                    if (n.nodes) {
                        const bb = parseBB2(n.bb, pageBBox);
                        const c = clusterIdx[n.id];
                        c.x = bb.x - pageBBox.width / 2;
                        c.y = bb.y - pageBBox.height / 2;
                        c.width = bb.width;
                        c.height = bb.height;
                    } else {
                        const pos = parseNode(n.pos, n.width, n.height, pageBBox);
                        const v = nodeIdx[n.id];
                        if (v) {
                            v.x = pos.x - pageBBox.width / 2;
                            v.y = pos.y - pageBBox.height / 2;
                        }
                    }
                });
            }
            if (response.json.edges) {
                response.json.edges.forEach(l => {
                    const e = linkIdx[l.id];
                    if (e) {
                        e.points = parseLink(l, pageBBox);
                    }
                });
            }
            return { clusters, nodes, links };
        } else {
            return response;
        }
    });
}

self.onmessage = event => {
    graphvizLayout.apply(undefined, event.data).then(result => {
        self.postMessage(result);
    });
};
