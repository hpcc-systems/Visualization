import { GraphLabel, graphlib, layout } from "dagre";
import "es6-promise/auto";
import { Data, Options } from "./dagreOptions.js";

function dagre(data: Data, options: Options) {
    const subgraphs = data.subgraphs;
    const nodes = data.nodes;
    const links = data.links;
    const hierarchy = data.hierarchy;

    const digraph = new graphlib.Graph({ multigraph: true, compound: true, directed: options.digraph !== false })
        .setGraph(options)
        .setDefaultNodeLabel(function () { return {}; })
        .setDefaultEdgeLabel(function () { return {}; })
        ;
    subgraphs.forEach(sp => {
        digraph.setNode(sp.id, sp);
    });
    nodes.forEach(vp => {
        digraph.setNode(vp.id, vp);
    });
    links.forEach(ep => {
        digraph.setEdge(ep.source.id, ep.target.id, ep, ep.id);
    });
    hierarchy.forEach(h => {
        digraph.setParent(h.child, h.parent);
    });
    layout(digraph, { debugTiming: false } as GraphLabel);
    const deltaX = (-digraph.graph().width / 2) || 0;
    const deltaY = -digraph.graph().height / 2;
    digraph.nodes().forEach(function (u) {
        const vp = digraph.node(u) as any;
        vp.x += deltaX;
        vp.y += deltaY;
    });
    digraph.edges().forEach(function (e) {
        const ep = digraph.edge(e) as any;
        ep.points = ep.points.map(p => [p.x + deltaX, p.y + deltaY]);
    });

    return { subgraphs, nodes, links };
}

self.onmessage = event => {
    const result = dagre.apply(undefined, event.data);
    self.postMessage(result);
};
