if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/Edge',["d3", "../common/SVGWidget", "../common/TextBox", "css!./Edge"], factory);
    } else {
        root.graph_Edge = factory(root.d3, root.common_SVGWidget, root.common_TextBox);
    }
}(this, function (d3, SVGWidget, TextBox) {
    function Edge() {
        SVGWidget.call(this);

        this._points = [];
        this._weight = 100;
        this._strokeDasharray = null;
        this._hidden = false;

        this._textBox = new TextBox()
            .padding(0)
        ;
    }
    Edge.prototype = Object.create(SVGWidget.prototype);
    Edge.prototype.constructor = Edge;
    Edge.prototype._class += " graph_Edge";

    Edge.prototype.publish("arcDepth", 16, "number", "Arc Depth", null, { tags: ["Basic"] });
    Edge.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Edge.prototype.sourceVertex = function (_) {
        if (!arguments.length) return this._sourceVertex;
        this._sourceVertex = _;
        return this;
    };

    Edge.prototype.targetVertex = function (_) {
        if (!arguments.length) return this._targetVertex;
        this._targetVertex = _;
        return this;
    };

    Edge.prototype.sourceMarker = function (_) {
        if (!arguments.length) return this._sourceMarker;
        this._sourceMarker = _;
        return this;
    };

    Edge.prototype.targetMarker = function (_) {
        if (!arguments.length) return this._targetMarker;
        this._targetMarker = _;
        return this;
    };

    Edge.prototype.weight = function (_) {
        if (!arguments.length) return this._weight;
        this._weight = _;
        return this;
    };

    Edge.prototype.strokeDasharray = function (_) {
        if (!arguments.length) return this._strokeDasharray;
        this._strokeDasharray = _;
        return this;
    };

    Edge.prototype.points = function (_, transitionDuration, skipPushMarkers) {
        if (!arguments.length) return this._points;
        this._points = _;
        if (this._elementPath) {
            this.update(null, this._element, transitionDuration, skipPushMarkers);
        }
        return this;
    };

    Edge.prototype.hidden = function (_) {
        if (!arguments.length) return this._hidden;
        this._hidden = _;
        return this;
    };

    Edge.prototype.text = function (_) {
        if (!arguments.length) return this._textBox.text();
        this._textBox.text(_);
        return this;
    };

    Edge.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._elementPath = element.append("path");
        this._tooltipElement = this._elementPath.append("title");

        if (this._sourceMarker) {
            this._elementPath.attr("marker-start", "url(#" + this._sourceMarker + ")");
        }
        if (this._targetMarker) {
            this._elementPath.attr("marker-end", "url(#" + this._targetMarker + ")");
        }
        if (this._textBox.text()) {
            this._textBox
                .target(domNode)
                .tooltip(this.tooltip())
                .render()
            ;
        }
    };

    Edge.prototype.update = function (domNode, element, transitionDuration, skipPushMarkers) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;
        if (this.svgMarkerGlitch && !skipPushMarkers) {
            element.transition().duration((transitionDuration ? transitionDuration : 0) + 100)
                .each("start", function (d) {
                    context._pushMarkers(element, d);
                })
                .each("end", function (d) {
                    context._popMarkers(element, d);
                })
            ;
        }
        var points = context._calculateEdgePoints(this._sourceVertex, this._targetVertex, this._points);
        var line = "";
        if (this._points.length || transitionDuration || true) {
            line = d3.svg.line()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; })
                .interpolate("bundle")
                .tension(0.75)
                (points)
            ;
        } else {
            //  Faster but does not transition as well  ---
            var dx = points[2].x - points[0].x,
                        dy = points[2].y - points[0].y,
                        dr = Math.sqrt(dx * dx + dy * dy) * 2;
            line = "M" +
                        points[0].x + "," +
                        points[0].y + "A" +
                        dr + "," + dr + " 0 0,1 " +
                        points[2].x + "," +
                        points[2].y;
        }
        var pathElements = this._elementPath;
        if (transitionDuration) {
            pathElements = pathElements.transition().duration(transitionDuration);
        }
        pathElements
            .attr("opacity", this._hidden ? 0 : 1)
            .attr("stroke-dasharray", this._strokeDasharray)
            .attr("d", line)
        ;
        this._tooltipElement.text(this.tooltip());

        if (this._textBox.text()) {
            this._textBox
                .tooltip(this.tooltip())
                .move(this._findMidPoint(points), transitionDuration)
            ;
        }
    };

    Edge.prototype._findMidPoint = function (points) {
        var midIdx = points.length / 2;
        if (points.length % 2) {
            return points[Math.floor(midIdx)];
        } else if (points.length){
            var p0 = points[midIdx - 1];
            var p1 = points[midIdx];
            return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        }
        return { x: 0, y: 0 };
    };

    Edge.prototype._calculateEdgePoints = function (source, target, _points) {
        if (!source || !target) {
            return [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        }
        var points = _points ? _points.slice() : [];
        var p0 = points.length === 0 ? target.pos() : points[0];
        var p1 = points.length === 0 ? source.pos() : points[points.length - 1];

        points.unshift(source.intersection(source._pos, p0));
        points.push(target.intersection(target._pos, p1));
        if (!points[0]) {
            points[0] = source._pos;
        }
        if (!points[points.length - 1]) {
            points[points.length - 1] = target._pos;
        }

        if (points.length === 2 && points[0] && points[1]) {
            var dx = points[0].x - points[1].x;
            var dy = points[0].y - points[1].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist) {
                var midX = (points[0].x + points[1].x) / 2 - dy * this.arcDepth() / 100;
                var midY = (points[0].y + points[1].y) / 2 + dx * this.arcDepth() / 100;
                points = [{ x: points[0].x, y: points[0].y }, { x: midX, y: midY }, { x: points[1].x, y: points[1].y }];
            }
        }

        return points;
    };

    return Edge;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/Vertex.js',["d3", "../common/SVGWidget", "../common/Icon", "../common/TextBox", "css!./Vertex"], factory);
    } else {
        root.graph_Vertex = factory(root.d3, root.common_SVGWidget, root.common_Icon, root.common_TextBox);
    }
}(this, function (d3, SVGWidget, Icon, TextBox) {
    function Vertex() {
        SVGWidget.call(this);

        this._icon = new Icon();
        this._textBox = new TextBox();
        this._annotationWidgets = {};
    }
    Vertex.prototype = Object.create(SVGWidget.prototype);
    Vertex.prototype.constructor = Vertex;
    Vertex.prototype._class += " graph_Vertex";

    Vertex.prototype.publishProxy("faChar", "_icon");
    Vertex.prototype.publishProxy("icon_shape_diameter", "_icon", "diameter");
    Vertex.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
    Vertex.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
    Vertex.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");

    Vertex.prototype.publishProxy("text", "_textBox");
    Vertex.prototype.publishProxy("anchor", "_textBox");
    Vertex.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
    Vertex.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
    Vertex.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

    Vertex.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end"],{tags:["Basic"]});
    
    Vertex.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Vertex.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter",null,{tags:["Private"]});
    Vertex.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing",null,{tags:["Private"]});
    Vertex.prototype.publish("annotationIcons", [], "array", "Annotations",null,{tags:["Private"]});

    //  Render  ---
    Vertex.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._icon
            .target(domNode)
            .render()
        ;
        this._textBox
            .target(domNode)
            .render()
        ;
    };

    Vertex.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._icon
            .tooltip(this.tooltip())
            .render()
        ;
        var iconClientSize = this._icon.getBBox(true);
        this._textBox
            .tooltip(this.tooltip())
            .render()
        ;
        var bbox = this._textBox.getBBox(true);
        switch(this.iconAnchor()){
            case 'start':
                this._icon
                    .move({ 
                        x: -(bbox.width / 2) + (iconClientSize.width / 3),
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
            case 'middle':
                this._icon
                    .move({ 
                        x: 0, 
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
            case 'end':
                this._icon
                    .move({ 
                        x: (bbox.width / 2) - (iconClientSize.width / 3), 
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
        }

        var context = this;
        var annotations = element.selectAll(".annotation").data(this.annotationIcons());
        annotations.enter().append("g")
            .attr("class", "annotation")
            .each(function (d, idx) {
                context._annotationWidgets[idx] = new Icon()
                    .target(this)
                    .shape("square")
                ;
            })
        ;
        var xOffset = bbox.width / 2;
        var yOffset = bbox.height / 2;
        annotations
            .each(function (d, idx) {
                var annotationWidget = context._annotationWidgets[idx];
                annotationWidget
                    .diameter(context.annotationDiameter())
                    .shape_colorFill(context.textbox_shape_colorFill())
                    .shape_colorStroke(context.textbox_shape_colorStroke())
                ;
                for (var key in d) {
                    if (annotationWidget[key]) {
                        annotationWidget[key](d[key]);
                    }
                }
                annotationWidget.render();

                var aBBox = annotationWidget.getBBox(true);
                annotationWidget
                    .move({
                        x: xOffset - aBBox.width / 4,
                        y: yOffset + aBBox.height / 4
                    })
                ;
                xOffset -= aBBox.width + context.annotationSpacing();
            })
        ;
        annotations.exit()
            .each(function (d, idx) {
                var element = d3.select(this);
                delete context._annotationWidgets[idx];
                element.remove();
            })
        ;
    };

    //  Methods  ---
    Vertex.prototype.intersection = function (pointA, pointB) {
        var i1 = this._icon.intersection(pointA, pointB, this._pos);
        if (i1)
            return i1;
        var i2 = this._textBox.intersection(pointA, pointB, this._pos);
        if (i2)
            return i2;
        return null;
    };

    return Vertex;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/GraphData.js',["dagre"], factory);
    } else {
        root.graph_GraphData = factory(root.dagre);
    }
}(this, function (dagre) {
    function GraphData() {
        dagre.graphlib.Graph.call(this, { multigraph: true, compound: true });
        this.setGraph({});
        this.setDefaultNodeLabel(function () { return {}; });
        this.setDefaultEdgeLabel(function () { return {}; });
    }
    GraphData.prototype = Object.create(dagre.graphlib.Graph.prototype);
    GraphData.prototype.constructor = GraphData;

    GraphData.prototype.setData = function (vertices, edges, hierarchy, merge) {
        var context = this;
        var retVal = {
            addedVertices: [],
            addedEdges: []
        };

        //  Add new items  ---
        for (var i = 0; i < vertices.length; ++i) {
            var entity = vertices[i];
            if (!merge || !this.hasNode(entity._id)) {
                this.setNode(entity._id, entity);
                retVal.addedVertices.push(entity);
            }
        }
        for (i = 0; i < edges.length; ++i) {
            var edge = edges[i];
            if (!merge || !this.hasEdge(edge._id)) {
                this.setEdge(edge._sourceVertex._id, edge._targetVertex._id, edge, edge._id);
                retVal.addedEdges.push(edge);
            }
        }
        if (hierarchy) {
            for (i = 0; i < hierarchy.length; ++i) {
                this.setParent(hierarchy[i].child._id, hierarchy[i].parent._id);
            }
        }

        //  Remove old items  ---
        if (merge) {
            var edgeIDs = edges.map(function (item) { return item._id; });
            this.filterEdges(function (item) { return edgeIDs.indexOf(item.v + "_" + item.w) < 0; })
                .forEach(function (item) {
                    /*  TODO  ---
                    try {
                        context.delEdge(item);
                    } catch (e) {
                        var d = 0;
                    }
                    */
                })
            ;
            var vertexIDs = vertices.map(function (item) { return item._id; });
            this.filterNodes(function (item) { return vertexIDs.indexOf(item) < 0; })
                .forEach(function (item) {
                    try {
                        context.delNode(item);
                    } catch (e) {
                    }
                })
            ;
        }
        return retVal;
    };

    GraphData.prototype.filterEdges = function (pred) {
        var filtered = [];
        this.eachEdge(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    };

    GraphData.prototype.filterNodes = function (pred) {
        var filtered = [];
        this.eachNode(function (e) {
            if (pred(e)) {
                filtered.push(e);
            }
        });
        return filtered;
    };

    GraphData.prototype.nodeValues = function () {
        var retVal = [];
        this.nodes().forEach(function (item, idx) {
            retVal.push(this.node(item));
        }, this);
        return retVal;
    };

    GraphData.prototype.eachNode = function (callback) {
        this.nodes().forEach(function (item, idx) {
            callback(item, this.node(item));
        }, this);
    };

    GraphData.prototype.edgeValues = function () {
        var retVal = [];
        this.edges().forEach(function (item, idx) {
            retVal.push(this.edge(item));
        }, this);
        return retVal;
    };

    GraphData.prototype.eachEdge = function (callback) {
        this.edges().forEach(function (item, idx) {
            callback(item, item.v, item.w, this.edge(item));
        }, this);
    };

    GraphData.prototype.getJSON = function () {
        var graphObj = dagre.graphlib.json.write(this);
        return JSON.stringify(graphObj, function (key, value) {
            if (key === "value") {
                if (value._text && value._text._text) {
                    return value._text._text;
                }
                return value._id;
            }
            return value;
        }, "  ");
    };

    return GraphData;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/GraphLayouts.js',["d3", "dagre"], factory);
    } else {
        root.graph_GraphLayouts = factory(root.d3, root.dagre);
    }
}(this, function (d3, dagre) {
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
            var maxSize = Math.max(size.width, size.height);
            context.pos[u] = {
                x: value.fixed ? value.x : Math.cos(currStep) * (radius - maxSize),
                y: value.fixed ? value.y : Math.sin(currStep) * (radius - maxSize),
                width: size.width,
                height: size.height
            };
            currStep += step;
        });
    }
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
            };
        });
    }
    None.prototype.nodePos = function (u) {
        return this.pos[u];
    };
    None.prototype.edgePoints = function (e) {
        return [];
    };

    function ForceDirected(graphData, width, height, options) {
        options = options || {};
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
            context.edges.push({
                source: context.vertexMap[s],
                target: context.vertexMap[t]
            });
        });
        this.force = d3.layout.force()
            .linkDistance(options.linkDistance)
            .linkStrength(options.linkStrength)
            .friction(options.friction)
            .charge(function (d) {
                var cs = d.value.getBBox();
                return options.charge * Math.max(cs.width, cs.height);
            })
            .chargeDistance(options.chargeDistance)
            .theta(options.theta)
            .gravity(options.gravity)
            .nodes(this.vertices)
            .links(this.edges)
        ;
        if (options.oneShot) {
            this.force.start();
            var total = graphData.nodeCount();
            total = Math.min(total * total, 500);
            for (var i = 0; i < total; ++i) {
                this.force.tick();
            }
            this.force.stop();
        }
    }
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
            }, value._id);
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
    }
    Hierarchy.prototype.nodePos = function (u) {
        return this.digraph.node(u);
    };
    Hierarchy.prototype.edgePoints = function (edge) {
        return this.digraph.edge(edge._sourceVertex.id(), edge._targetVertex.id(), edge._id).points;
    };

    var Layouts = {
        None: None,
        Circle: Circle,
        ForceDirected: ForceDirected,
        Hierarchy: Hierarchy
    };

    return Layouts;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/Graph.js',["d3", "../common/SVGWidget", "../common/Palette", "../api/IGraph", "./Vertex", "./Edge", "./GraphData", "./GraphLayouts", "../common/Utility", "css!./Graph"], factory);
    } else {
        root.graph_Graph = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.api_IGraph, root.graph_Vertex, root.graph_Edge, root.graph_GraphData, root.graph_GraphLayouts, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Palette, IGraph, Vertex, Edge, GraphData, GraphLayouts, Utility) {
    function Graph() {
        SVGWidget.call(this);
        IGraph.call(this);

        this.graphData = new GraphData();
        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            edge: "1.25px"
        };
        this._selection = new Utility.Selection();
    }
    Graph.prototype = Object.create(SVGWidget.prototype);
    Graph.prototype.constructor = Graph;
    Graph.prototype._class += " graph_Graph";
    Graph.prototype.implements(IGraph.prototype);
    
    Graph.prototype.Vertex = Vertex;
    Graph.prototype.Edge = Edge;

    Graph.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices", null, { tags: ["Advanced"] });
    Graph.prototype.publish("layout", "Circle", "set", "Default Layout", ["Circle", "ForceDirected", "ForceDirected2", "Hierarchy", "None"], { tags: ["Basic"] });
    Graph.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"], { tags: ["Basic"] });
    Graph.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout", null, { tags: ["Basic"] });
    Graph.prototype.publish("highlightOnMouseOverVertex", false, "boolean", "Highlight Vertex on Mouse Over", null, { tags: ["Basic"] });
    Graph.prototype.publish("highlightOnMouseOverEdge", false, "boolean", "Highlight Edge on Mouse Over", null, { tags: ["Basic"] });
    Graph.prototype.publish("transitionDuration", 250, "number", "Transition Duration", null, { tags: ["Intermediate"] });
    Graph.prototype.publish("showEdges", true, "boolean", "Show Edges", null, { tags: ["Intermediate"] });
    Graph.prototype.publish("snapToGrid", 0, "number", "Snap to Grid", null, { tags: ["Private"] });

    Graph.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"], { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout", null, { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout", null, { tags: ["Advanced"] });
    Graph.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout", null, { tags: ["Advanced"] });

    Graph.prototype.publish("forceDirectedLinkDistance", 300, "number", "Target distance between linked nodes", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedLinkStrength", 1, "number", "Strength (rigidity) of links", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedFriction", 0.9, "number", "Friction coefficient", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedCharge", -25, "number", "Charge strength ", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedChargeDistance", 10000, "number", "Maximum distance over which charge forces are applied", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedTheta", 0.8, "number", "Barnes–Hut approximation criterion", null, { tags: ["Advanced"] });
    Graph.prototype.publish("forceDirectedGravity", 0.1, "number", "Gravitational strength", null, { tags: ["Advanced"] });

    //  Properties  ---
    Graph.prototype.getOffsetPos = function () {
        return { x: 0, y: 0 };
    };

    Graph.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._svgZoom) {
            this._svgZoom
                .attr("x", -this._size.width / 2)
                .attr("y", -this._size.height / 2)
                .attr("width", this._size.width)
                .attr("height", this._size.height)
            ;
        }
        return retVal;
    };

    Graph.prototype.clear = function () {
        this.data({ vertices: [], edges: [], hierarchy: [], merge: false });
    };

    Graph.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (!this.data().merge) {
                this.graphData = new GraphData();
                this._renderCount = 0;
            }
            var data = this.graphData.setData(this.data().vertices || [], this.data().edges || [], this.data().hierarchy || [], this.data().merge || false);

            var context = this;
            data.addedVertices.forEach(function (item) {
                item.pos({
                    x: +Math.random() * 10 / 2 - 5,
                    y: +Math.random() * 10 / 2 - 5
                });
            });
            data.addedEdges.forEach(function (item) {
                if (item._sourceMarker)
                    item._sourceMarker = context._id + "_" + item._sourceMarker;
                if (item._targetMarker)
                    item._targetMarker = context._id + "_" + item._targetMarker;
            });

            //  Recalculate edge arcs  ---
            var dupMap = {};
            this.graphData.edgeValues().forEach(function (item) {
                if (!dupMap[item._sourceVertex._id]) {
                    dupMap[item._sourceVertex._id] = {};
                }
                if (!dupMap[item._sourceVertex._id][item._targetVertex._id]) {
                    dupMap[item._sourceVertex._id][item._targetVertex._id] = 0;
                }
                var dupEdgeCount = ++dupMap[item._sourceVertex._id][item._targetVertex._id];
                item.arcDepth(16 * dupEdgeCount);
            });
        }
        return retVal;
    };

    Graph.prototype.selection = function (_) {
        if (!arguments.length) return this._selection.get();
        this._selection.set(_);
        return this;
    };

    Graph.prototype.setZoom = function (translation, scale, transitionDuration) {
        if (this.zoom) {
            this.zoom.translate(translation);
            this.zoom.scale(scale);
            this.applyZoom(transitionDuration);
        }
    };

    Graph.prototype.applyZoom = function (transitionDuration) {
        if (d3.event && d3.event.sourceEvent && d3.event.sourceEvent.ctrlKey && (d3.event.sourceEvent.type === "wheel" || d3.event.sourceEvent.type === "mousewheel" || d3.event.sourceEvent.type === "DOMMouseScroll")) {
            if (d3.event.sourceEvent.wheelDelta) {
                this.zoom.translate([this.prevTranslate[0], this.prevTranslate[1] + d3.event.sourceEvent.wheelDelta]);
                this.zoom.scale(this.prevScale);
            }
        }
        (transitionDuration ? this.svg.transition().duration(transitionDuration) : this.svg)
            .attr("transform", "translate(" + this.zoom.translate() + ")scale(" + this.zoom.scale() + ")")
        ;
        this.prevTranslate = this.zoom.translate();
        if (this.prevScale !== this.zoom.scale()) {
            this._fixIEMarkers();
            this.prevScale = this.zoom.scale();
        }
        this.brush.x(d3.scale.identity().domain([(-this.prevTranslate[0] - this._size.width / 2) * 1 / this.zoom.scale(), (-this.prevTranslate[0] + this._size.width / 2) * 1 / this.zoom.scale()]));
        this.brush.y(d3.scale.identity().domain([(-this.prevTranslate[1] - this._size.height / 2) * 1 / this.zoom.scale(), (-this.prevTranslate[1] + this._size.height / 2) * 1 / this.zoom.scale()]));
    };

    Graph.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var context = this;

        //  Zoom  ---
        this.prevTranslate = [0, 0];
        this.prevScale = 1;
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.01, 4])
            .on("zoomstart", function (args) {
                context.prevTranslate = context.zoom.translate();
                context.prevScale = context.zoom.scale();
                if (d3.event.sourceEvent && d3.event.sourceEvent.shiftKey && d3.event.sourceEvent.ctrlKey) {
                    context._zoomMode = "selection";
                } else if (d3.event.sourceEvent && d3.event.sourceEvent.shiftKey) {
                    context._zoomMode = "selection";
                    context._selection.clear();
                } else {
                    context._zoomMode = "zoom";
                }
                switch (context._zoomMode) {
                    case "selection":
                        element.select(".extent")
                            .style("visibility", null)
                        ;
                        break;
                    default:
                        element.select(".extent")
                            .style("visibility", "hidden")
                        ;
                        break;
                }
            })
            .on("zoomend", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        context.zoom.translate(context.prevTranslate);
                        context.zoom.scale(context.prevScale);
                        break;
                    default:
                        break;
                }
                context._svgBrush.call(context.brush.clear());
            })
            .on("zoom", function (d) {
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        context.applyZoom();
                        break;
                }
            })
        ;
        this.brush = d3.svg.brush()
            .x(d3.scale.identity().domain([-context._size.width / 2, context._size.width / 2]))
            .y(d3.scale.identity().domain([-context._size.height / 2, context._size.height / 2]))
            .on("brushstart", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        break;
                }
            })
            .on("brushend", function (args) {
                switch (context._zoomMode) {
                    case "selection":
                        var extent = d3.event.target.extent();
                        context.svgV.selectAll(".graphVertex").select("*")
                            .each(function (d) {
                                if (extent[0][0] <= d.x() && d.x() < extent[1][0] && extent[0][1] <= d.y() && d.y() < extent[1][1]) {
                                    context._selection.append(d);
                                }
                            })
                        ;
                        context.graph_selection(context.selection());
                        break;
                    default:
                        break;
                }
            })
            .on("brush", function () {
                switch (context._zoomMode) {
                    case "selection":
                        var zt = context.zoom.translate();
                        console.log(zt[0]);
                        var extent = d3.event.target.extent();
                        context.svgV.selectAll(".graphVertex").select("*")
                            .classed("selected", function (d) {
                                return context._selection.isSelected(d) ||
                                    (extent[0][0] <= d.x() && d.x() < extent[1][0] && extent[0][1] <= d.y() && d.y() < extent[1][1]);
                            })
                        ;
                        break;
                    default:
                        break;
                }
            })
        ;

        //  Drag  ---
        function dragstart(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                context._dragging = true;
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                }
                if (context.svgMarkerGlitch) {
                    context.graphData.nodeEdges(d.id()).forEach(function (id) {
                        var edge = context.graphData.edge(id);
                        context._pushMarkers(edge.element(), edge);
                    });
                }
            }
        }
        function drag(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                d.move({ x: d3.event.x, y: d3.event.y });
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                    forceNode.x = forceNode.px = d3.event.x;
                    forceNode.y = forceNode.py = d3.event.y;
                }
                context.refreshIncidentEdges(d, true);
            }
        }
        function dragend(d) {
            if (context.allowDragging()) {
                d3.event.sourceEvent.stopPropagation();
                context._dragging = false;
                if (context.snapToGrid()) {
                    var snapLoc = d.calcSnap(context.snapToGrid());
                    d.move(snapLoc[0]);
                    context.refreshIncidentEdges(d, true);
                }
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = false;
                }
                if (context.svgMarkerGlitch) {
                    context.graphData.nodeEdges(d.id()).forEach(function (id) {
                        var edge = context.graphData.edge(id);
                        context._popMarkers(edge.element(), edge);
                    });
                }
            }
        }
        this.drag = d3.behavior.drag()
            .origin(function (d) {
                return d.pos();
            })
            .on("dragstart", dragstart)
            .on("dragend", dragend)
            .on("drag", drag)
        ;
        //  SVG  ---
        this._svgZoom = element.append("rect")
            .attr("class", "zoom")
            .attr("x", -this._size.width / 2)
            .attr("y", -this._size.height / 2)
            .attr("width", this._size.width)
            .attr("height", this._size.height)
        ;

        this.defs = element.append("defs");
        this.addMarkers();

        element.call(this.zoom);

        this.svg = element.append("g");
        this._svgBrush = this.svg.append("g").attr("class", "selectionBrush").call(this.brush);
        this._svgBrush.select(".background").style("cursor", null);
        context._svgBrush.call(context.brush.clear());
        this.svgC = this.svg.append("g").attr("id", this._id + "C");
        this.svgE = this.svg.append("g").attr("id", this._id + "E");
        this.svgV = this.svg.append("g").attr("id", this._id + "V");
    };

    Graph.prototype.getBounds = function (items, layoutEngine) {
        var vBounds = [[null, null], [null, null]];
        items.forEach(function (item) {
            var pos = layoutEngine ? layoutEngine.nodePos(item._id) : {x: item.x(), y: item.y(), width: item.width(), height: item.height()};
            var leftX = pos.x - pos.width / 2;
            var rightX = pos.x + pos.width / 2;
            var topY = pos.y - pos.height / 2;
            var bottomY = pos.y + pos.height / 2;
            if (vBounds[0][0] === null || vBounds[0][0] > leftX) {
                vBounds[0][0] = leftX;
            }
            if (vBounds[0][1] === null || vBounds[0][1] > topY) {
                vBounds[0][1] = topY;
            }
            if (vBounds[1][0] === null || vBounds[1][0] < rightX) {
                vBounds[1][0] = rightX;
            }
            if (vBounds[1][1] === null || vBounds[1][1] < bottomY) {
                vBounds[1][1] = bottomY;
            }
        });
        return vBounds;
    };

    Graph.prototype.getVertexBounds = function (layoutEngine) {
        return this.getBounds(this.graphData.nodeValues(), layoutEngine);
    };

    Graph.prototype.getSelectionBounds = function (layoutEngine) {
        return this.getBounds(this._selection.get(), layoutEngine);
    };

    Graph.prototype.shrinkToFit = function (bounds, transitionDuration) {
        var width = this.width();
        var height = this.height();

        var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = 1.0 / Math.max(dx / width, dy / height);
        if (scale > 1) {
            scale = 1;
        }
        var translate = [-scale * x, -scale * y];
        this.setZoom(translate, scale, transitionDuration);
    };

    Graph.prototype._origScale = Graph.prototype.scale;
    Graph.prototype.scale = function (_, transitionDuration) {
        var retVal = Graph.prototype._origScale.apply(this, arguments);
        if (arguments.length) {
            this.zoomTo(_, transitionDuration);
        }
        return retVal;
    };

    Graph.prototype.zoomTo = function (level, transitionDuration) {
        switch (level) {
            case "all":
                this.shrinkToFit(this.getVertexBounds(), transitionDuration);
                break;
            case "width":
                var bounds = this.getVertexBounds();
                bounds[0][1] = 0;
                bounds[1][1] = 0;
                this.shrinkToFit(bounds, transitionDuration);
                break;
            case "selection":
                this.shrinkToFit(this._selection.isEmpty() ? this.getVertexBounds() : this.getSelectionBounds(), transitionDuration);
                break;
            default:
                var scale = parseInt(level);
                if (isNaN(scale) || scale <= 0 || scale > 200) {
                    scale = 100;
                }
                this.zoom.scale(scale / 100);
                this.applyZoom(transitionDuration);
                break;
        }
    };

    Graph.prototype.centerOn = function (bounds, transitionDuration) {
        var x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2;
        var translate = [x, y];
        this.setZoom(translate, 1, transitionDuration);
    };

    Graph.prototype._origLayout = Graph.prototype.layout;
    Graph.prototype.layout = function (_, transitionDuration) {
        var retVal = Graph.prototype._origLayout.apply(this, arguments);
        if (arguments.length) {
            if (this._renderCount) {
                if (this.forceLayout) {
                    this.forceLayout.force.stop();
                    this.forceLayout = null;
                }

                var context = this;
                var layoutEngine = this.getLayoutEngine();
                if (this.layout() === "ForceDirected2") {
                    this.forceLayout = layoutEngine;
                    this.forceLayout.force.on("tick", function (d) {
                        layoutEngine.vertices.forEach(function (item) {
                            var vertex = context.graphData.node(item.id);
                            if (item.fixed) {
                                item.x = item.px;
                                item.y = item.py;
                            } else {
                                item.px = item.x;
                                item.py = item.y;
                                vertex
                                    .move({ x: item.x, y: item.y })
                                ;
                            }
                        });
                        context.graphData.edgeValues().forEach(function (item) {
                            item
                                .points([], false, false)
                            ;
                        });
                        if (context.applyScaleOnLayout()) {
                            var vBounds = context.getVertexBounds(layoutEngine);
                            context.shrinkToFit(vBounds);
                        }
                    });
                    this.forceLayout.force.start();
                } else if (layoutEngine) {
                    this.forceLayout = null;
                    context._dragging = true;
                    context.graphData.nodeValues().forEach(function (item) {
                        var pos = layoutEngine.nodePos(item._id);
                        item.move({ x: pos.x, y: pos.y }, transitionDuration);
                        if (pos.width && pos.height && !item.width() && !item.height()) {
                            item
                                .width(pos.width)
                                .height(pos.height)
                                .render()
                            ;
                        }
                    });
                    context.graphData.edgeValues().forEach(function (item) {
                        var points = layoutEngine.edgePoints(item);
                        item
                            .points(points, transitionDuration)
                        ;
                    });

                    if (context.applyScaleOnLayout()) {
                        var vBounds = context.getVertexBounds(layoutEngine);
                        context.shrinkToFit(vBounds, transitionDuration);
                    }
                    this._fixIEMarkers();
                    setTimeout(function () {
                        context._dragging = false;
                    }, transitionDuration ? transitionDuration + 50 : 50);  //  Prevents highlighting during morph  ---
                }
            }
        }
        return retVal;
    };

    //  Render  ---
    Graph.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        //  Create  ---
        var vertexElements = this.svgV.selectAll("#" + this._id + "V > .graphVertex").data(this.graphData.nodeValues(), function (d) { return d.id(); });
        vertexElements.enter().append("g")
            .attr("class", "graphVertex")
            .style("opacity", 1e-6)
             //  TODO:  Events need to be optional  ---
            .on("click.selectionBag", function (d) {
                context._selection.click(d, d3.event);
            })
            .on("click", function (d) {
                context.vertex_click(d, d3.event);
            })
            .on("dblclick", function (d) {
                context.vertex_dblclick(d, d3.event);
            })
            .on("mouseover", function (d) {
                if (context._dragging)
                    return;
                context.vertex_mouseover(d3.select(this), d);
            })
            .on("mouseout", function (d) {
                if (context._dragging)
                    return;
                context.vertex_mouseout(d3.select(this), d);
            })
            .each(createV)
            .transition()
            .duration(750)
            .style("opacity", 1)
        ;
        function createV(d) {
            d
                .target(this)
                .render()
            ;
            d.element()
                .call(context.drag)
            ;
            if (d.dispatch) {
                d.dispatch.on("sizestart", function (d, loc) {
                    d.allowResize(context.allowDragging());
                    if (context.allowDragging()) {
                        context._dragging = true;
                    }
                });
                d.dispatch.on("size", function (d, loc) {
                    context.refreshIncidentEdges(d, false);
                });
                d.dispatch.on("sizeend", function (d, loc) {
                    context._dragging = false;
                    if (context.snapToGrid()) {
                        var snapLoc = d.calcSnap(context.snapToGrid());
                        d
                            .pos(snapLoc[0])
                            .size(snapLoc[1])
                            .render()
                        ;
                        context.refreshIncidentEdges(d, false);
                    }
                });
            }
        }

        var edgeElements = this.svgE.selectAll("#" + this._id + "E > .graphEdge").data(this.showEdges() ? this.graphData.edgeValues() : [], function (d) { return d.id(); });
        edgeElements.enter().append("g")
            .attr("class", "graphEdge")
            .style("opacity", 1e-6)
            .on("click.selectionBag", function (d) {
                context._selection.click(d, d3.event);
            })
            .on("click", function (d) {
                context.edge_click(d);
            })
            .on("mouseover", function (d) {
                if (context._dragging)
                    return;
                context.edge_mouseover(d3.select(this), d);
            })
            .on("mouseout", function (d) {
                if (context._dragging)
                    return;
                context.edge_mouseout(d3.select(this), d);
            })
            .each(createE)
            .transition()
            .duration(750)
            .style("opacity", 1)
        ;
        function createE(d) {
            d
                .target(this)
                .render()
            ;
        }

        //  Update  ---
        vertexElements
            .each(updateV)
        ;
        function updateV(d) {
            d
                .render()
            ;
        }

        edgeElements
            .each(updateE)
        ;
        function updateE(d) {
            d
                .render()
            ;
        }

        //  Exit  ---
        vertexElements.exit()
            .each(function (d) { d.target(null); })
            .remove()
        ;
        edgeElements.exit()
            .each(function (d) { d.target(null); })
            .remove()
        ;

        if (!this._renderCount) {
            this._renderCount++;
            this.setZoom([0, 0], 1);
            this.layout(this.layout());
        }
    };

    //  Methods  ---
    Graph.prototype.getLayoutEngine = function () {
        switch (this.layout()) {
            case "Circle":
                return new GraphLayouts.Circle(this.graphData, this._size.width, this._size.height);
            case "ForceDirected":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height, {
                    oneShot: true,
                    linkDistance: this.forceDirectedLinkDistance(),
                    linkStrength: this.forceDirectedLinkStrength(),
                    friction: this.forceDirectedFriction(),
                    charge: this.forceDirectedCharge(),
                    chargeDistance: this.forceDirectedChargeDistance(),
                    theta: this.forceDirectedTheta(),
                    gravity: this.forceDirectedGravity()
                });
            case "ForceDirected2":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height, {
                    linkDistance: this.forceDirectedLinkDistance(),
                    linkStrength: this.forceDirectedLinkStrength(),
                    friction: this.forceDirectedFriction(),
                    charge: this.forceDirectedCharge(),
                    chargeDistance: this.forceDirectedChargeDistance(),
                    theta: this.forceDirectedTheta(),
                    gravity: this.forceDirectedGravity()
                });
            case "Hierarchy":
                return new GraphLayouts.Hierarchy(this.graphData, this._size.width, this._size.height, {
                    rankdir: this.hierarchyRankDirection(),
                    nodesep: this.hierarchyNodeSeparation(),
                    edgesep: this.hierarchyEdgeSeparation(),
                    ranksep: this.hierarchyRankSeparation()
                });
        }
        return null;//new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    };

    Graph.prototype.getNeighborMap = function (vertex) {
        var vertices = {};
        var edges = {};

        if (vertex) {
            var nedges = this.graphData.nodeEdges(vertex.id());
            for (var i = 0; i < nedges.length; ++i) {
                var edge = this.graphData.edge(nedges[i]);
                edges[edge.id()] = edge;
                if (edge._sourceVertex.id() !== vertex.id()) {
                    vertices[edge._sourceVertex.id()] = edge._sourceVertex;
                }
                if (edge._targetVertex.id() !== vertex.id()) {
                    vertices[edge._targetVertex.id()] = edge._targetVertex;
                }
            }
        }

        return {
            vertices: vertices,
            edges: edges
        };
    };

    Graph.prototype.highlightVerticies = function (vertexMap) {
        var context = this;
        var vertexElements = this.svgV.selectAll(".graphVertex");
        vertexElements.transition().duration(this.transitionDuration())
            .each("end", function (d) {
                if (vertexMap && vertexMap[d.id()]) {
                    if (d._parentElement.node() && d._parentElement.node().parentNode) {
                        d._parentElement.node().parentNode.appendChild(d._parentElement.node());
                    }
                }
            })
            .style("opacity", function (d) {
                if (!vertexMap || vertexMap[d.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
        return this;
    };

    Graph.prototype.highlightEdges = function (edgeMap) {
        var context = this;
        var edgeElements = this.svgE.selectAll(".graphEdge");
        edgeElements
            .style("stroke-width", function (o) {
                if (edgeMap && edgeMap[o.id()]) {
                    return context.highlight.edge;
                }
                return "1px";
            }).transition().duration(this.transitionDuration())
            .style("opacity", function (o) {
                if (!edgeMap || edgeMap[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
        return this;
    };

    Graph.prototype.highlightVertex = function (element, d) {
        if (this.highlightOnMouseOverVertex()) {
            if (d) {
                var highlight = this.getNeighborMap(d);
                highlight.vertices[d.id()] = d;
                this.highlightVerticies(highlight.vertices);
                this.highlightEdges(highlight.edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    };

    Graph.prototype.highlightEdge = function (element, d) {
        if (this.highlightOnMouseOverEdge()) {
            if (d) {
                var vertices = {};
                vertices[d._sourceVertex.id()] = d._sourceVertex;
                vertices[d._targetVertex.id()] = d._targetVertex;
                var edges = {};
                edges[d.id()] = d;
                this.highlightVerticies(vertices);
                this.highlightEdges(edges);
            } else {
                this.highlightVerticies(null);
                this.highlightEdges(null);
            }
        }
    };

    Graph.prototype.refreshIncidentEdges = function (d, skipPushMarkers) {
        var context = this;
        this.graphData.nodeEdges(d.id()).forEach(function (id) {
            var edge = context.graphData.edge(id);
            edge
                .points([], false, skipPushMarkers)
            ;
        });
    };

    //  Events  ---
    Graph.prototype.graph_selection = function (selection) {
    };

    Graph.prototype.vertex_click = function (d) {
        d._parentElement.node().parentNode.appendChild(d._parentElement.node());
        IGraph.prototype.vertex_click.apply(this, arguments);
    };

    Graph.prototype.vertex_dblclick = function (d) {
    };

    Graph.prototype.vertex_mouseover = function (element, d) {
        this.highlightVertex(element, d);
    };

    Graph.prototype.vertex_mouseout = function (d, self) {
        this.highlightVertex(null, null);
    };

    Graph.prototype.edge_mouseover = function (element, d) {
        this.highlightEdge(element, d);
    };

    Graph.prototype.edge_mouseout = function (d, self) {
        this.highlightEdge(null, null);
    };

    Graph.prototype.addMarkers = function (clearFirst) {
        if (clearFirst) {
            this.defs.select("#" + this._id + "_arrowHead").remove();
            this.defs.select("#" + this._id + "_circleFoot").remove();
            this.defs.select("#" + this._id + "_circleHead").remove();
        }
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
                .attr("points", "0,0 10,5 0,10 1,5")
        ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id",  this._id + "_circleFoot")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 1)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 4)
        ;
        this.defs.append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_circleHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 9)
            .attr("refY", 5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 4)
        ;
    };

    return Graph;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/Sankey.js',["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "d3-sankey", "css!./Sankey"], factory);
    } else {
        root.graph_Sankey = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.d3.sankey);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, D3Sankey) {
    D3Sankey = D3Sankey || d3.sankey || window.d3.sankey;

    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " graph_Sankey.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });
    Column.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true, disable: function (w) { return !w._owner || w._owner.mappings().indexOf(w) === 0; } });
    Column.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this._owner ? this._owner.columns() : []; }, {
        optional: true,
        disable: function (w) {
            return !w._owner || !w.aggrType() || w._owner.mappings().indexOf(w) === 0;
        }
    });

    Column.prototype.aggregate = function(values){
        switch (this.aggrType()) {
            case null:
            case undefined:
            case "":
                return values.length;
            default:
                var columns = this._owner.columns();
                var colIdx = columns.indexOf(this.aggrColumn());
                return d3[this.aggrType()](values, function (value) {
                    return +value[colIdx];
                });
        }
    };
    
    //  ---
    function Sankey(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";
    }
    Sankey.prototype = Object.create(SVGWidget.prototype);
    Sankey.prototype.constructor = Sankey;
    Sankey.prototype._class += " graph_Sankey";
    Sankey.prototype.Column = Column;

    Sankey.prototype._palette = Palette.ordinal("default");

    Sankey.prototype.publish("paletteID", "default", "set", "Palette ID", Sankey.prototype._palette.switch());
    Sankey.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
    Sankey.prototype.publish("vertexWidth", 36, "number", "Vertex Width");
    Sankey.prototype.publish("vertexPadding", 40, "number", "Vertex Padding");
    Sankey.prototype.publish("xAxisMovement", false, "boolean", "Enable x-axis movement");
    Sankey.prototype.publish("yAxisMovement", false, "boolean", "Enable y-axis movement");

    Sankey.prototype.sankeyData = function () {
        var vertexIndex = {};
        var retVal = {
            vertices: [],
            edges: []
        };
        var mappings = this.mappings().filter(function (mapping) { return mapping.column(); });
        mappings.forEach(function (mapping, idx) {
            var view = this._db.rollupView([mapping.column()]);
            view.entries().forEach(function (row) {
                var id = mapping.column() + ":" + idx + ":" + row.key;
                if (!vertexIndex[id]) {
                    retVal.vertices.push({
                        __id: id,
                        __category: mapping.column(),
                        name: row.key,
                        origRow: row
                    });
                    vertexIndex[id] = retVal.vertices.length - 1;
                }
            }, this);
        }, this);
        mappings.forEach(function (mapping, idx) {
            if (idx < mappings.length - 1) {
                var mapping2 = mappings[idx + 1];
                var view = this._db.rollupView([mapping.column(), mapping2.column()]);
                view.entries().forEach(function (row) {
                    var sourceID = mapping.column() + ":" + idx + ":" + row.key;
                    row.values.forEach(function (value) {
                        var targetID = mapping2.column() + ":" + (idx + 1) + ":" + value.key;
                        retVal.edges.push({
                            __id: sourceID + "_" + targetID,
                            source: vertexIndex[sourceID],
                            target: vertexIndex[targetID],
                            value: mapping2.aggregate(value.values)
                        });
                    });
                });
            }
        }, this);

        return retVal;
    };

    Sankey.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._d3Sankey = new D3Sankey();
        this._d3SankeyPath = this._d3Sankey.link();
    };

    Sankey.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());

        var sankeyData = this.sankeyData();
        this._d3Sankey
            .size([this.width(), this.height()])
            .nodeWidth(this.vertexWidth())
            .nodePadding(this.vertexPadding())
            .nodes(sankeyData.vertices)
            .links(sankeyData.edges)
            .layout(32)
        ;

        var context = this;

        // Links ---
        var link = element.selectAll(".link").data(sankeyData.edges);
        link.enter().append("path")
            .attr("class", "link")
            .append("title")
        ;
        link
            .attr("d", this._d3SankeyPath)
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; })
        ;
        link.select("title")
            .text(function (d) {
                return d.source.name + " → " + d.target.name + "\n" + d.value;
            })
        ;
        link.exit().remove();

        // Nodes ---
        var node = element.selectAll(".node").data(sankeyData.vertices);
        node.enter().append("g")
            .attr("class", "node")
            .each(function (d) {
                var gElement = d3.select(this);
                gElement.append("rect");
                gElement.append("text");
            })
            .on("click.mouse", function (d, idx) {
                context.click(d.origRow, "", true);
            })
            .call(d3.behavior.drag()
                .origin(function (d) { return d; })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove)
            )
        ;
        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
        ;
        node.select("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", this._d3Sankey.nodeWidth())
            .style("fill", function (d) {
                return context._palette(d.name);
            })
            .style("stroke", function (d) {
                return d3.rgb(context._palette(d.name)).darker(2);
            })
            .style("cursor", (this.xAxisMovement() || this.yAxisMovement()) ? null : "default")
        ;
        node.select("text")
             .attr("x", -6)
             .attr("y", function (d) { return d.dy / 2; })
             .attr("dy", ".35em")
             .attr("text-anchor", "end")
             .attr("transform", null)
             .text(function (d) { return d.name; })
           .filter(function (d) { return d.x < context.width() / 2; })
             .attr("x", 6 + this._d3Sankey.nodeWidth())
             .attr("text-anchor", "start")
        ;
        node.exit().remove();

        function dragmove(d) {
            var gElement = d3.select(this);
            if (context.xAxisMovement()) {
                d.x = Math.max(0, Math.min(context.width() - d.dx, d3.event.x));
            }
            if (context.yAxisMovement()) {
                d.y = Math.max(0, Math.min(context.height() - d.dy, d3.event.y));
            }
            gElement.attr("transform", "translate(" + d.x + "," + d.y + ")");
            context._d3Sankey.relayout();
            link.attr("d", context._d3SankeyPath);

            gElement.select("text")
                .attr("x", -6)
                .attr("y", function (d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .attr("transform", null)
                .text(function (d) { return d.name; })
                .filter(function (d) { return d.x < context.width() / 2; })
                    .attr("x", 6 + context._d3Sankey.nodeWidth())
                    .attr("text-anchor", "start")
            ;
        }
    };

    Sankey.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    Sankey.prototype.click = function (row, col, sel) {
        console.log(row + ", " + col + ", " + sel);
    };

    return Sankey;
}));

