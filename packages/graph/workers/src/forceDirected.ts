import { forceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation } from "d3-force";
import "es6-promise/auto";
import { Data, Options } from "./forceDirectedOptions";

export function forceDirected(data: Data, options: Options) {
    const nodes = data.nodes;
    const links = data.links;

    const forceLink = d3ForceLink(links)
        .id(d => d.id)
        .distance(options.linkDistance)
        .strength(options.linkStrength)
        ;

    const forceManyBody = d3ForceManyBody()
        .strength(options.repulsionStrength)
        ;

    forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceManyBody)
        .force("center", forceCenter())
        .alpha(options.alpha)
        .alphaMin(options.alphaMin)
        .alphaDecay(options.alphaDecay)
        .velocityDecay(options.velocityDecay)
        .stop()
        .tick(options.iterations)
        ;

    return { nodes, links };
}

self.onmessage = event => {
    const result = forceDirected.apply(undefined, event.data);
    // @ts-ignore
    self.postMessage(result);
};
