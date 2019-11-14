import { graphviz } from "@hpcc-js/wasm";
import { Cluster, Data, Engine, isCluster, Link, Node, Options } from "./graphvizOptions";

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

function parseBB(bb: string): GVBox {
    const [llx, lly, urx, ury] = bb ? bb.split(",").map(p => pointToPx(+p)) : [0, 0, 0, 0];
    return {
        x: llx,
        y: lly,
        width: urx - llx,
        height: ury - lly
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

function doLayout(mode: Engine, dot: string): Promise<object> {
    console.log(dot);
    const start = performance.now();
    return graphviz[mode](dot, "json").then(jsonStr => {
        const end = performance.now();
        console.log("graphvizWorker:  " + (end - start));
        return JSON.parse(jsonStr);
    });
}

function graphvizLayout(data: Data, options: Options): Promise<{ clusters: Cluster[], nodes: Node[], links: Link[] }> {
    self["document"] = self["document"] || {
        currentScript: {
            src: options.wasmFolder + "/dummy.js"
        }
    };

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
        dotLinks.push(linkTpl(link.source.id, link.target.id, link.id, ""));
    });

    return doLayout(options.engine, `\
digraph G {
    graph [fontname=Verdana,fontsize=11.0];
    graph [rankdir=TB];
    node [shape=rect,fontname=Verdana,fontsize=11.0,fixedsize=true];
    edge [fontname=Verdana,fontsize=11.0];

${dotClusters.join("\n")}

${dotLinks.join("\n")}

${dotNodes.join("\n")}
}`
    ).then((response: any) => {
        const pageBBox = parseBB(response.bb);

        response.objects.forEach(n => {
            if (n.nodes) {
                const bb = parseBB2(n.bb, pageBBox);
                const c = clusterIdx[n.id];
                c.x = bb.x;
                c.y = bb.y;
                c.width = bb.width;
                c.height = bb.height;
            } else {
                const pos = parseNode(n.pos, n.width, n.height, pageBBox);
                const v = nodeIdx[n.id];
                v.x = pos.x - pageBBox.width / 2;
                v.y = pos.y - pageBBox.height / 2;
            }
        });
        response.edges.forEach(l => {
            const e = linkIdx[l.id];
            const posStr = l.pos.substr(2);
            const posParts = posStr.split(" ");
            const points: Array<[number, number]> = posParts.map(p => parsePos(p, pageBBox)).map(pos => [pos.x - pageBBox.width / 2, pos.y - pageBBox.height / 2]);
            const endpoint = points.shift();
            e.points = [...points, endpoint];
        });
        return { clusters, nodes, links };
    });
}

self.onmessage = event => {
    graphvizLayout.apply(undefined, event.data).then(result => {
        self.postMessage(result);
    });
};
