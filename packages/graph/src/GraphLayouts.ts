import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { graphlib, layout } from "dagre";

export function Circle(graphData?, width?, height?, radius?) {
    const context = this;
    this.pos = {};

    //  Initial Positions  ---
    const padding = 0;
    radius = radius || (width < height ? width - padding : height - padding) / 2;
    const order = graphData.nodeCount();
    let currStep = -Math.PI / 2;
    const step = 2 * Math.PI / order;
    graphData.eachNode(function (u, value) {
        const size = value.getBBox();
        const maxSize = 0; // Math.max(size.width, size.height);
        context.pos[u] = {
            x: value.fixed ? value.x : width / 2 + Math.cos(currStep) * (radius - maxSize),
            y: value.fixed ? value.y : height / 2 + Math.sin(currStep) * (radius - maxSize),
            width: size.width,
            height: size.height
        };
        currStep += step;
    });
}
Circle.prototype.nodePos = function (u) {
    return this.pos[u];
};
Circle.prototype.edgePoints = function (_e) {
    return [];
};

export function None(graphData, _width, _height, _radius) {
    const context = this;
    this.pos = {};

    graphData.eachNode(function (u, value) {
        context.pos[u] = {
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height
        };
    });
}
None.prototype.nodePos = function (u) {
    return this.pos[u];
};
None.prototype.edgePoints = function (_e) {
    return [];
};

export function ForceDirected(graphData, width, height, options) {
    options = options || {};
    const context = this;
    this.pos = {};

    this.vertices = [];
    this.vertexMap = {};
    graphData.eachNode(function (u) {
        const vertex = graphData.node(u);
        const size = vertex.getBBox();
        const newItem = {
            id: u,
            x: vertex.pos().x,
            y: vertex.pos().y,
            width: size.width,
            height: size.height,
            value: vertex
        };
        context.vertices.push(newItem);
        context.vertexMap[u] = newItem;
    });
    this.edges = [];
    graphData.eachEdge(function (_e, s, t) {
        context.edges.push({
            source: s,
            target: t
        });
    });
    const forceLink = d3ForceLink()
        .id(function (d: any) {
            return d.id;
        })
        .distance(options.linkDistance)
        .strength(options.linkStrength)
        ;
    const forceManyBody = d3ForceManyBody()
        .strength(function (d: any) {
            const cs = d.value.getBBox();
            return options.charge * Math.max(cs.width, cs.height);
        })
        ;
    this.force = d3ForceSimulation()
        .force("link", forceLink)
        .force("charge", forceManyBody)
        .force("center", d3ForceCenter(width / 2, height / 2))
        .velocityDecay(options.oneShot ? 0.1 : options.friction)
        .nodes(this.vertices)
        ;
    forceLink
        .links(this.edges)
        ;

    if (options.oneShot) {
        this.force.restart();
        let total = graphData.nodeCount();
        total = Math.min(total * total, 500);
        for (let i = 0; i < total; ++i) {
            this.force.tick();
        }
        this.force.stop();
    }
}
ForceDirected.prototype.nodePos = function (u) {
    return this.vertexMap[u];
};
ForceDirected.prototype.edgePoints = function (_e) {
    return [];
};

export function Hierarchy(graphData, _width, _height, options) {
    const digraph = new graphlib.Graph({ multigraph: true, compound: true })
        .setGraph(options)
        .setDefaultNodeLabel(function () { return {}; })
        .setDefaultEdgeLabel(function () { return {}; })
        ;
    graphData.eachNode(function (u) {
        const value = graphData.node(u);
        const clientSize = value.getBBox();
        digraph.setNode(u, {
            width: clientSize.width,
            height: clientSize.height
        });
    });
    graphData.eachEdge(function (e, s, t) {
        const value = graphData.edge(e);
        digraph.setEdge(s, t, {
            weight: value.weight()
        }, value._id);
        if (!options.digraph) {
            digraph.setEdge(t, s, {
                weight: value.weight()
            }, value._id);
        }
    });
    graphData.eachNode(function (u) {
        digraph.setParent(u, graphData.parent(u));
    });
    this.dagreLayout = layout(digraph, { debugTiming: false });
    const deltaX = -digraph.graph().width / 2;
    const deltaY = -digraph.graph().height / 2;
    digraph.nodes().forEach(function (u) {
        const value = digraph.node(u);
        value.x += deltaX + _width / 2;
        value.y += deltaY + _height / 2;
    });
    digraph.edges().forEach(function (e) {
        const value = digraph.edge(e);
        for (let i = 0; i < value.points.length; ++i) {
            value.points[i].x += deltaX + _width / 2;
            value.points[i].y += deltaY + _height / 2;
        }
    });
    this.digraph = digraph;
}
Hierarchy.prototype.nodePos = function (u) {
    return this.digraph.node(u);
};
Hierarchy.prototype.edgePoints = function (edge) {
    return this.digraph.edge(edge._sourceVertex.id(), edge._targetVertex.id(), edge._id).points;
};
