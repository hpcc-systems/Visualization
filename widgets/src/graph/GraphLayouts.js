(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["lib/dagre/dagre"], factory);
    } else {
        root.GraphLayouts = factory(root.dagre);
    }
}(this, function (dagre) {
    function Circle(graphData, width, height, radius) {
        var context = this;
        this.pos = {};

        //  Initial Positions  ---
        var padding = 0;
        radius = radius || (width < height ? width - padding : height - padding) / 2;
        var order = graphData.nodeCount();
        var currStep = -Math.PI / 2;
        var step = 2 * Math.PI / order;
        graphData.eachNode(function (u, value) {
            var size = value.getBBox(true);
            var maxSize = Math.max(size.width, size.height)
            context.pos[u] = {
                x: value.fixed ? value.x : Math.cos(currStep) * (radius - maxSize),
                y: value.fixed ? value.y : Math.sin(currStep) * (radius - maxSize),
                width: size.width,
                height: size.height
            }
            currStep += step; 
        });
    };
    Circle.prototype.nodePos = function(u) {
        return this.pos[u];        
    };
    Circle.prototype.edgePoints = function(e) {
        return [];
    };

    function None(graphData, width, height, radius) {
        var context = this;
        this.pos = {};

        graphData.eachNode(function (u, value) {
            context.pos[u] = {
                x: value.x,
                y: value.y,
                width: value.width,
                height: value.height
            }
        });
    };
    None.prototype.nodePos = function (u) {
        return this.pos[u];
    };
    None.prototype.edgePoints = function (e) {
        return [];
    };

    function ForceDirected(graphData, width, height, oneShot) {
        var context = this;
        this.pos = {};

        this.vertices = [];
        this.vertexMap = {};
        graphData.eachNode(function (u) {
            var value = graphData.node(u);
            var size = value.getBBox(true);
            var newItem = {
                id: u,
                x: value.pos().x,
                y: value.pos().y,
                width: size.width,
                height: size.height,
                value: value
            };
            context.vertices.push(newItem);
            context.vertexMap[u] = newItem;
        });
        this.edges = [];
        graphData.eachEdge(function (e, s, t) {
            var value = graphData.edge(e);
            context.edges.push({
                source: context.vertexMap[s],
                target: context.vertexMap[t]
            });
        });
        this.force = d3.layout.force()
            .charge(function (d) {
                var cs = d.value.getBBox();
                return -25 * Math.max(cs.width, cs.height)
            })
            .linkDistance(300)
            .nodes(this.vertices)
            .links(this.edges)
        ;
        if (oneShot) {
            this.force.start();
            var total = graphData.nodeCount();
            total = Math.min(total * total, 500);
            for (var i = 0; i < total; ++i) {
                this.force.tick();
            }
            this.force.stop();
        }
    };
    ForceDirected.prototype.nodePos = function (u) {
        return this.vertexMap[u];
    };
    ForceDirected.prototype.edgePoints = function (e) {
        return [];
    };

    function Hierarchy(graphData, width, height, options) {
        var digraph = new dagre.graphlib.Graph({ multigraph: true, compound: true })
              .setGraph(options)
              .setDefaultNodeLabel(function () { return {}; })
              .setDefaultEdgeLabel(function () { return {}; })
        ;
        graphData.eachNode(function (u) {
            var value = graphData.node(u);
            var clientSize = value.getBBox();
            digraph.setNode(u, {
                width: clientSize.width,
                height: clientSize.height
            });
        });
        graphData.eachEdge(function (e, s, t) {
            var value = graphData.edge(e);
            digraph.setEdge(s, t, {
                weight: value.weight()
            });
        });
        graphData.eachNode(function (u) {
            digraph.setParent(u, graphData.parent(u));
        });
        this.dagreLayout = dagre.layout(digraph);
        var deltaX = -digraph.graph().width / 2;
        var deltaY = -digraph.graph().height / 2;
        digraph.nodes().forEach(function (u) {
            var value = digraph.node(u);
            value.x += deltaX;
            value.y += deltaY;
        });
        digraph.edges().forEach(function (e) {
            var value = digraph.edge(e);
            for (var i = 0; i < value.points.length; ++i) {
                value.points[i].x += deltaX;
                value.points[i].y += deltaY;
            }
        });
        this.digraph = digraph;
    };
    Hierarchy.prototype.nodePos = function (u) {
        return this.digraph.node(u);
    };
    Hierarchy.prototype.edgePoints = function (e) {
        return this.digraph.edge(e).points;
    };

    Layouts = {
        None: None,
        Circle: Circle,
        ForceDirected: ForceDirected,
        Hierarchy: Hierarchy
    };

    return Layouts;
}));
