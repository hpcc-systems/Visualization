(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["lib/graphlib/graphlib", "lib/dagre/dagre"], factory);
    } else {
        root.GraphLayouts = factory();
    }
}(this, function () {
    function Circle(graphData, width, height, radius) {
        var context = this;
        this.pos = {};

        //  Initial Positions  ---
        var padding = 0;
        radius = radius || (width < height ? width - padding : height - padding) / 2;
        var order = graphData.order();
        var currStep = -Math.PI / 2;
        var step = 2 * Math.PI / order;
        graphData.eachNode(function (u, value) {
            context.pos[u] = {
                x: value.fixed ? value.x : width / 2 + Math.cos(currStep) * radius,
                y: value.fixed ? value.y : height / 2 + Math.sin(currStep) * radius,
                width: value.width,
                height: value.height
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
            var newItem = {
                id: u,
                x: value.pos().x,
                y: value.pos().y,
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
            .size([width, height])
            .nodes(this.vertices)
            .links(this.edges)
        ;
        if (oneShot) {
            this.force.start();
            var total = graphData.size();
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

    function Hierarchy(graphData, width, height) {
        var digraph = new graphlib.Digraph();
        graphData.eachNode(function (u) {
            var value = graphData.node(u);
            var clientSize = value.getBBox();
            digraph.addNode(u, {
                width: clientSize.width,
                height: clientSize.height
            });
        });
        graphData.eachEdge(function (e, s, t) {
            var value = graphData.edge(e);
            digraph.addEdge(e, s, t, {
                minLen: value.__labelEntity ? 2 : 1
            });
        });
        this.dagreLayout = dagre.layout()
            .run(digraph)
        ;
        var deltaX = (width - this.dagreLayout._value.width) / 2;
        var deltaY = (height - this.dagreLayout._value.height) / 2;
        this.dagreLayout.eachNode(function (u, value) {
            value.x += deltaX;
            value.y += deltaY;
        });
        this.dagreLayout.eachEdge(function (e, s, t, value) {
            for (var i = 0; i < value.points.length; ++i) {
                value.points[i].x += deltaX;
                value.points[i].y += deltaY;
            }
        });
    };
    Hierarchy.prototype.nodePos = function (u) {
        return this.dagreLayout.node(u);
    };
    Hierarchy.prototype.edgePoints = function (e) {
        return this.dagreLayout.edge(e).points;
    };

    Layouts = {
        None: None,
        Circle: Circle,
        ForceDirected: ForceDirected,
        Hierarchy: Hierarchy
    };

    return Layouts;
}));
