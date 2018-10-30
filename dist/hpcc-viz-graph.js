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
    Edge.prototype.publish("showArc", true, "boolean", "Show/Hide Arc", null, { tags: ["Basic"] });
    Edge.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Edge.prototype.publish("sourceMarker", "circle", "set", "Source Marker", ["circle"], { optional: true });
    Edge.prototype.publish("targetMarker", "arrow", "set", "Source Marker", ["arrow", "circle"], { optional: true });
    Edge.prototype.publish("strokeDasharray", null, "string", "Stroke Dash Array", null, { optional: true });
    Edge.prototype.publish("strokeColor", null, "html-color", "Stroke Color", null, { optional: true });

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

    Edge.prototype.weight = function (_) {
        if (!arguments.length) return this._weight;
        this._weight = _;
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
            .attr("marker-start", !(this.svgMarkerGlitch && skipPushMarkers) && this.sourceMarker_exists() ? "url(#" + this._graphID + "_" + this.sourceMarker() + "Foot)" : null)
            .attr("marker-end", !(this.svgMarkerGlitch && skipPushMarkers) && this.targetMarker_exists() ? "url(#" + this._graphID + "_" + this.targetMarker() + "Head)" : null)
            .attr("stroke", this.strokeColor_exists() ? this.strokeColor() : null)
            .attr("stroke-dasharray", this.strokeDasharray_exists() ? this.strokeDasharray() : null)
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
                if(this.showArc()){
                    var midX = (points[0].x + points[1].x) / 2 - dy * this.arcDepth() / 100;
                    var midY = (points[0].y + points[1].y) / 2 + dx * this.arcDepth() / 100;
                    points = [{ x: points[0].x, y: points[0].y }, { x: midX, y: midY }, { x: points[1].x, y: points[1].y }];
                } else {
                    points = [{ x: points[0].x, y: points[0].y }, { x: points[1].x, y: points[1].y }];
                }
            }
        }

        return points;
    };

    return Edge;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/EdgeC',["d3", "../common/CanvasWidget"], factory);
    } else {
        root.graph_EdgeC = factory(root.d3, root.common_CanvasWidget);
    }
}(this, function (d3, CanvasWidget) {
    function EdgeC() {
        CanvasWidget.call(this);

        this._text = "";
        this._points = [];
        this._weight = 100;
        this._strokeDasharray = null;
        this._hidden = false;
    }
    EdgeC.prototype = Object.create(CanvasWidget.prototype);
    EdgeC.prototype.constructor = EdgeC;
    EdgeC.prototype._class += " graph_EdgeC";

    EdgeC.prototype.publish("arcDepth", 16, "number", "Arc Depth", null, { tags: ["Basic"] });
    EdgeC.prototype.publish("showArc", true, "boolean", "Show/Hide Arc", null, { tags: ["Basic"] });
    EdgeC.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    EdgeC.prototype.publish("sourceMarker", "circle", "set", "Source Marker", ["circle"], { optional: true });
    EdgeC.prototype.publish("targetMarker", "arrow", "set", "Source Marker", ["arrow", "circle"], { optional: true });
    EdgeC.prototype.publish("strokeDasharray", null, "string", "Stroke Dash Array", null, { optional: true });
    EdgeC.prototype.publish("strokeColor", "#777", "html-color", "Stroke Color", null, { optional: true });

    EdgeC.prototype.sourceVertex = function (_) {
        if (!arguments.length) return this._sourceVertex;
        this._sourceVertex = _;
        return this;
    };

    EdgeC.prototype.targetVertex = function (_) {
        if (!arguments.length) return this._targetVertex;
        this._targetVertex = _;
        return this;
    };

    EdgeC.prototype.weight = function (_) {
        if (!arguments.length) return this._weight;
        this._weight = _;
        return this;
    };

    EdgeC.prototype.points = function (_, transitionDuration, skipPushMarkers) {
        if (!arguments.length) return this._points;
        this._points = _;
        return this;
    };

    EdgeC.prototype.hidden = function (_) {
        if (!arguments.length) return this._hidden;
        this._hidden = _;
        return this;
    };

    EdgeC.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = _;
        return this;
    };

    EdgeC.prototype.drawSelf = function (ctx, canvas) {
        var n = this;
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor();
        ctx.moveTo(n._sourceVertex.x(), n._sourceVertex.y());
        ctx.lineTo(n._targetVertex.x(), n._targetVertex.y());
        // this.points().forEach(function (_point, _i) {
        //     ctx[_i === 0 ? "moveTo" : "lineTo"](_point.x, _point.y);
        // })
        ctx.stroke();
        ctx.closePath();
        if (this.text()) {
            var mid_x = (n._sourceVertex.x() + n._targetVertex.x()) / 2;
            var mid_y = (n._sourceVertex.y() + n._targetVertex.y()) / 2;
            ctx.fillStyle = '#ffffff';
            var text_h = 12;
            ctx.textBaseline = "top";
            ctx.font = text_h + "px Arial";
            var padding = text_h / 4;
            var text_w = ctx.measureText(this.text()).width;
            ctx.fillRect(mid_x - (text_w / 2), mid_y - (text_h / 2), text_w + (padding * 2), text_h + (padding * 2));
            ctx.fillStyle = '#000000';
            ctx.fillText(this.text(), mid_x - (text_w / 2) + padding, mid_y - (text_h / 2));
        }
    };

    return EdgeC;
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
    Vertex.prototype.publishProxy("imageUrl", "_icon");
    Vertex.prototype.publishProxy("icon_shape_diameter", "_icon", "diameter");
    Vertex.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
    Vertex.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
    Vertex.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");
    Vertex.prototype.publish("centroid", false, "boolean", "Centroid Vertex");

    Vertex.prototype.publishProxy("text", "_textBox");
    Vertex.prototype.publishProxy("anchor", "_textBox");
    Vertex.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
    Vertex.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
    Vertex.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

    Vertex.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end"],{tags:["Basic"]});
    
    Vertex.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
    Vertex.prototype.publish("iconTooltip", "", "string", "iconTooltip", null, { tags: ["Private"] });

    Vertex.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter", null, { tags: ["Private"] });
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
        element.classed("centroid", this.centroid());
        element.style("filter", this.centroid() ? "url(#" + this._graphID +"_glow)" : null);
        this._icon
            .tooltip(this.iconTooltip() ? this.iconTooltip() : this.tooltip())
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
                    } else if (window.__hpcc_debug) {
                        console.log("Invalid annotation property:  " + key);
                    }
                }
                annotationWidget.render();

                var aBBox = annotationWidget.getBBox(true);
                annotationWidget
                    .move({
                        x: xOffset - aBBox.width / 2 + 4,
                        y: yOffset + aBBox.height / 2 - 4
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
                if (edge._sourceVertex && edge._targetVertex) {
                    this.setEdge(edge._sourceVertex._id, edge._targetVertex._id, edge, edge._id);
                    retVal.addedEdges.push(edge);
                } else {
                    console.log("Bad edge definition");
                }
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
                item._graphID = context._id;
                item.pos({
                    x: +Math.random() * 10 / 2 - 5,
                    y: +Math.random() * 10 / 2 - 5
                });
            });
            data.addedEdges.forEach(function (item) {
                item._graphID = context._id;
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

    Graph.prototype.linkcolor_default = function (_) {
        if (!arguments.length) return this._linkcolor;
        this._linkcolor = _;
        return this;
    }

    Graph.prototype.linktooltip_default = function (_) {
        if (!arguments.length) return this._linktooltip;
        this._linktooltip = _;
        return this;
    }

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
            var pos = layoutEngine ? layoutEngine.nodePos(item._id) : { x: item.x(), y: item.y(), width: item.width(), height: item.height() };
            if (pos) {
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
                            if (item.fixed) {
                                item.x = item.px;
                                item.y = item.py;
                            } else {
                                item.px = item.x;
                                item.py = item.y;

                                //  Might have been cleared ---
                                var vertex = context.graphData.node(item.id);
                                if (vertex) {
                                    vertex
                                        .move({ x: item.x, y: item.y })
                                    ;
                                }
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
                var vertexElement = d3.select(this).select(".graph_Vertex");
                var selected = false;
                if (!vertexElement.empty()) {
                    selected = vertexElement.classed("selected");
                }
                context.vertex_click(context.rowToObj(d.data()), "", selected, {
                    vertex:  d
                });
            })
            .on("dblclick", function (d) {
                var vertexElement = d3.select(this).select(".graph_Vertex");
                var selected = false;
                if (!vertexElement.empty()) {
                    selected = vertexElement.classed("selected");
                }
                context.vertex_dblclick(context.rowToObj(d.data()), "", selected, {
                    vertex:  d
                });
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
                var edgeElement = d3.select(this).select(".graph_Edge");
                var selected = false;
                if (!edgeElement.empty()) {
                    selected = edgeElement.classed("selected");
                }
                context.edge_click(context.rowToObj(d.data()), "", selected, {
                    edge: d
                });
            })
            .on("dblclick", function (d) {
                var edgeElement = d3.select(this).select(".graph_Edge");
                var selected = false;
                if (!edgeElement.empty()) {
                    selected = edgeElement.classed("selected");
                }
                context.edge_dblclick(context.rowToObj(d.data()), "", selected, {
                    edge: d
                });
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
        vertexElements
            .classed("graphVertex-highlighted", function (d) { return !vertexMap || vertexMap[d.id()]; })
            .transition().duration(this.transitionDuration())
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
            .classed("graphEdge-highlighted", function (d) { return !edgeMap || edgeMap[d.id()]; })
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

    Graph.prototype.vertex_click = function (row, col, sel, more) {
        if (more && more.vertex) {
            more.vertex._parentElement.node().parentNode.appendChild(more.vertex._parentElement.node());
        }
        IGraph.prototype.vertex_click.apply(this, arguments);
    };

    Graph.prototype.vertex_dblclick = function (row, col, sel, more) {
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
            this.defs.select("#" + this._id + "_glow").remove();
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
        var filter = this.defs.append("filter")
            .attr("id", this._id + "_glow")
            .attr("width", "130%")
            .attr("height", "130%")
            ;
        filter.append('feOffset')
            .attr("result", "offOut")
            .attr("in", "SourceGraphic")
            .attr("dx", "0")
            .attr("dy", "0")
            ;
        filter.append('feColorMatrix')
            .attr("result", "matrixOut")
            .attr("in", "offOut")
            .attr("type", "matrix")
            .attr("values", "0.2 0 0 0 0 0 0.2 0 0 1 0 0 0.2 0 0 0 0 0 1 0")
            ;
        filter.append('feGaussianBlur')
            .attr("result", "blurOut")
            .attr("in", "matrixOut")
            .attr("stdDeviation", "3")
            ;
        filter.append('feBlend')
            .attr("in", "SourceGraphic")
            .attr("in2", "blurOut")
            .attr("mode", "normal")
            ;
    };

    return Graph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/VertexC.js',["d3", "../common/CanvasWidget", "../common/Icon", "../common/TextBox"], factory);
    } else {
        root.graph_VertexC = factory(root.d3, root.common_CanvasWidget, root.common_Icon, root.common_TextBox);
    }
}(this, function (d3, CanvasWidget, Icon, TextBox) {
    function VertexC() {
        CanvasWidget.call(this);

        this.poly_arr = [];

        this._icon = new Icon();
        this._textBox = new TextBox();
        this._annotationWidgets = {};
    }
    VertexC.prototype = Object.create(CanvasWidget.prototype);
    VertexC.prototype.constructor = VertexC;
    VertexC.prototype._class += " graph_VertexC";

    VertexC.prototype.publishProxy("faChar", "_icon");
    VertexC.prototype.publishProxy("imageUrl", "_icon");
    VertexC.prototype.publishProxy("icon_shape_diameter", "_icon", "diameter");
    VertexC.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
    VertexC.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
    VertexC.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");
    VertexC.prototype.publish("centroid", false, "boolean", "Centroid Vertex");

    VertexC.prototype.publishProxy("text", "_textBox");
    VertexC.prototype.publishProxy("anchor", "_textBox");
    VertexC.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
    VertexC.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
    VertexC.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

    VertexC.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end"], { tags: ["Basic"] });

    VertexC.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
    VertexC.prototype.publish("iconTooltip", "", "string", "iconTooltip", null, { tags: ["Private"] });

    VertexC.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter", null, { tags: ["Private"] });
    VertexC.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing", null, { tags: ["Private"] });
    VertexC.prototype.publish("annotationIcons", [], "array", "Annotations", null, { tags: ["Private"] });

    VertexC.prototype.drawOriginalLayout = function (ctx, canvas) {
        //TODO
    };
    VertexC.prototype.drawCenteredLayout = function (ctx, canvas) {
        //TODO
    };
    VertexC.prototype.drawKeyLayout = function (ctx, canvas) {
        var context = this;
        var x = this.x();
        var y = this.y();
        var mult = 1;
        var label_font_family = 'Arial';
        var icon_font_family = 'FontAwesome';
        var label_font_size = 12 * mult;
        var icon_font_size = label_font_size * 2;
        var pr = label_font_size / 4;
        var icon_y_offset = pr;
        var label_w = 0;
        var label_h = label_font_size + (pr * 2);
        var icon_h = label_h * 2;
        var annotations_h = label_h;
        var center_x = 0;
        var center_x_offset = 0;
        this.min_x = x;
        this.max_x = x;
        this.min_y = y;
        this.max_y = y;
        ctx.textBaseline = 'top';

        draw_label(this.text());
        draw_icon(this.faChar());
        draw_annotations();

        this.size({
            height: this.max_y - this.min_y,
            width: this.max_x - this.min_x,
        });

        function draw_icon(txt) {
            var poly_info_obj = {
                vertex: context,
                tooltip: context.iconTooltip()
            };
            var icon_w = icon_h;
            var _x = x - icon_w;
            var _y = y - icon_h / 2;
            ctx.font = icon_font_size + 'px ' + icon_font_family;
            ctx.beginPath();
            ctx.font = icon_font_size + 'px ' + icon_font_family;
            ctx.rect(_x - center_x_offset, _y, icon_w, icon_h);
            context.poly_arr.push([_x - center_x_offset, _y, icon_w, icon_h, poly_info_obj]);
            ctx.strokeStyle = context.icon_shape_colorStroke() ? context.icon_shape_colorStroke() : "#777";
            ctx.stroke();
            ctx.fillStyle = context.icon_shape_colorFill() ? context.icon_shape_colorFill() : "#fff";
            ctx.fill();
            ctx.fillStyle = context.icon_image_colorFill() ? context.icon_image_colorFill() : "#fff";
            ctx.textAlign = 'center';
            ctx.fillText(txt, _x + (icon_w / 2) - center_x_offset, _y + pr + icon_y_offset);
            ctx.closePath();
            context.update_x_minmax(_x);
            context.update_x_minmax(_x + icon_w);
            context.update_y_minmax(_y);
            context.update_y_minmax(_y + icon_h);
        }

        function draw_label(txt) {
            var poly_info_obj = {
                vertex: context,
                tooltip: context.tooltip()
            };
            var _x = x;
            var _y = y - icon_h / 2;
            ctx.beginPath();
            ctx.strokeStyle = context.textbox_shape_colorStroke() ? context.textbox_shape_colorStroke() : "#777";
            ctx.font = label_font_size + 'px ' + label_font_family;
            label_w = ctx.measureText(txt).width;
            center_x = x - icon_h + ((icon_h + label_w) / 2);
            center_x_offset = center_x - x;
            ctx.rect(_x - center_x_offset, _y, label_w + (pr * 2), label_h);
            context.poly_arr.push([_x - center_x_offset, _y, label_w + (pr * 2), label_h, poly_info_obj]);
            ctx.fillStyle = context.textbox_shape_colorFill() ? context.textbox_shape_colorFill() : "#fff";
            ctx.fill();
            ctx.fillStyle = context.textbox_text_colorFill() ? context.textbox_text_colorFill() : "#000";
            ctx.textAlign = 'left';
            ctx.fillText(txt, _x + pr - center_x_offset, _y + pr);
            ctx.stroke();
            ctx.closePath();
            context.update_x_minmax(_x);
            context.update_x_minmax(_x + label_w + (pr * 2));
            context.update_y_minmax(_y);
            context.update_y_minmax(_y + label_h);
        }

        function draw_annotations() {
            var _x = x + label_w + (pr * 2) - annotations_h;
            var _y = y;
            var _anno_width_sum = 0;
            ctx.textAlign = 'left';
            ctx.font = label_font_size + 'px FontAwesome';
            context.annotationIcons().forEach(function (anno_obj) {
                var poly_info_obj = {
                    vertex: context,
                    tooltip: anno_obj.tooltip,
                    direction: "down"
                };
                ctx.font = label_font_size + 'px ' + anno_obj.font;
                ctx.beginPath();
                ctx.strokeStyle = "#777";
                ctx.rect(_x - _anno_width_sum - center_x_offset, _y, annotations_h, annotations_h);
                context.poly_arr.push([_x - _anno_width_sum - center_x_offset, _y, annotations_h, annotations_h, poly_info_obj]);
                ctx.stroke();
                ctx.fillStyle = anno_obj.shape_colorFill ? anno_obj.shape_colorFill : "#fff";
                ctx.fill();
                ctx.fillStyle = anno_obj.image_colorFill ? anno_obj.image_colorFill : "#000";
                ctx.fillText(anno_obj.faChar, _x - _anno_width_sum + pr - center_x_offset, _y + pr);
                ctx.closePath();
                _anno_width_sum += annotations_h;
            });
        }
    };

    VertexC.prototype.drawPolyTooltip = function (poly_obj, ctx) {
        if(!poly_obj[4].tooltip)return;
        var _x = poly_obj[0] + (poly_obj[2] / 2);
        var _y = poly_obj[1] + (poly_obj[3] / 2);
        var direction = poly_obj[4].direction ? poly_obj[4].direction : "up";
        switch (direction) {
            case 'up':
                _draw_tooltip(_x, _y, poly_obj[4].tooltip);
                break;
            case 'down':
                _draw_tooltip(_x, _y, poly_obj[4].tooltip, true);
                break;
        }

        function _draw_tooltip(x, y, txt, invert_y) {
            ctx.textBaseline = "bottom";
            var text_h = 14;
            ctx.font = text_h + "px Arial";
            var padding = 4;
            var text_w = ctx.measureText(txt).width;
            var arrow_w = 16;
            var arrow_h = 10;
            var tooltip_w = text_w + (padding * 2);
            var tooltip_h = text_h + (padding * 2);
            if (invert_y) {
                arrow_h *= -1;
                tooltip_h *= -1;
            }
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - (arrow_w / 2), y - arrow_h);
            ctx.lineTo(x - (tooltip_w / 2), y - arrow_h);
            ctx.lineTo(x - (tooltip_w / 2), y - (arrow_h + tooltip_h));
            ctx.lineTo(x + (tooltip_w / 2), y - (arrow_h + tooltip_h));
            ctx.lineTo(x + (tooltip_w / 2), y - arrow_h);
            ctx.lineTo(x + (arrow_w / 2), y - arrow_h);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#FFF";
            if (invert_y) {
                ctx.fillText(txt, x - (tooltip_w / 2) + padding, y - arrow_h + padding + text_h);
            } else {
                ctx.fillText(txt, x - (tooltip_w / 2) + padding, y - arrow_h - padding);
            }
        }
    };

    VertexC.prototype.drawSelf = function (ctx, canvas) {
        this.poly_arr = [];
        this.drawKeyLayout(ctx, canvas);
    };

    VertexC.prototype.getHoveredPolygons = function (x, y) {
        return this.poly_arr.filter(function (n) {
            var in_x_bounds = x > n[0] && x < n[0] + n[2];
            var in_y_bounds = y > n[1] && y < n[1] + n[3];
            return in_x_bounds && in_y_bounds;
        });
    };

    VertexC.prototype.update_x_minmax = function (_x) {
        if (this.min_x > _x) this.min_x = _x;
        if (this.max_x < _x) this.max_x = _x;
    };

    VertexC.prototype.update_y_minmax = function (_y) {
        if (this.min_y > _y) this.min_y = _y;
        if (this.max_y < _y) this.max_y = _y;
    };

    VertexC.prototype.getBBox = function () {
        return this.size();
    };

    return VertexC;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/GraphC.js',["d3", "../common/CanvasWidget", "../common/Palette", "../api/IGraph", "./VertexC", "./EdgeC", "./GraphData", "./GraphLayouts", "../common/Utility"], factory);
    } else {
        root.graph_Graph = factory(root.d3, root.common_CanvasWidget, root.common_Palette, root.api_IGraph, root.graph_VertexC, root.graph_EdgeC, root.graph_GraphData, root.graph_GraphLayouts, root.common_Utility);
    }
}(this, function (d3, CanvasWidget, Palette, IGraph, VertexC, EdgeC, GraphData, GraphLayouts, Utility) {
    function GraphC() {
        CanvasWidget.call(this);
        IGraph.call(this);

        this.graphData = new GraphData();
        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            edge: "1.25px"
        };
        this._selection = new Utility.Selection();
        this.log = [];
        this._translate = { x: 0, y: 0 };
        this._scale = { k: 1 };
    }
    GraphC.prototype = Object.create(CanvasWidget.prototype);
    GraphC.prototype.constructor = GraphC;
    GraphC.prototype._class += " graph_GraphC";
    GraphC.prototype.implements(IGraph.prototype);

    GraphC.prototype.Vertex = VertexC;
    GraphC.prototype.Edge = EdgeC;

    GraphC.prototype.publish("allowDragging", true, "boolean", "Allow Dragging of Vertices");
    GraphC.prototype.publish("layout", "Circle", "set", "Default Layout", ["Circle", "ForceDirected", "ForceDirected2", "Hierarchy", "None"]);
    GraphC.prototype.publish("scale", "100%", "set", "Zoom Level", ["all", "width", "selection", "100%", "90%", "75%", "50%", "25%", "10%"]);
    GraphC.prototype.publish("applyScaleOnLayout", false, "boolean", "Shrink to fit on Layout");
    GraphC.prototype.publish("highlightOnMouseOverVertex", false, "boolean", "Highlight Vertex on Mouse Over");
    GraphC.prototype.publish("highlightOnMouseOverEdge", false, "boolean", "Highlight Edge on Mouse Over");
    GraphC.prototype.publish("transitionDuration", 250, "number", "Transition Duration");
    GraphC.prototype.publish("showEdges", true, "boolean", "Show Edges");
    GraphC.prototype.publish("snapToGrid", 0, "number", "Snap to Grid");

    GraphC.prototype.publish("hierarchyRankDirection", "TB", "set", "Direction for Rank Nodes", ["TB", "BT", "LR", "RL"]);
    GraphC.prototype.publish("hierarchyNodeSeparation", 50, "number", "Number of pixels that separate nodes horizontally in the layout");
    GraphC.prototype.publish("hierarchyEdgeSeparation", 10, "number", "Number of pixels that separate edges horizontally in the layout");
    GraphC.prototype.publish("hierarchyRankSeparation", 50, "number", "Number of pixels between each rank in the layout");

    GraphC.prototype.publish("forceDirectedLinkDistance", 300, "number", "Target distance between linked nodes");
    GraphC.prototype.publish("forceDirectedLinkStrength", 1, "number", "Strength (rigidity) of links");
    GraphC.prototype.publish("forceDirectedFriction", 0.9, "number", "Friction coefficient");
    GraphC.prototype.publish("forceDirectedCharge", -25, "number", "Charge strength ");
    GraphC.prototype.publish("forceDirectedChargeDistance", 10000, "number", "Maximum distance over which charge forces are applied");
    GraphC.prototype.publish("forceDirectedTheta", 0.8, "number", "Barnes–Hut approximation criterion");
    GraphC.prototype.publish("forceDirectedGravity", 0.1, "number", "Gravitational strength");

    GraphC.prototype.draw = function () {
        if (this.element().node() === null) return;
        this.clearCanvas();
        this.drawLinks();
        this.drawNodes();
    };
    GraphC.prototype.drawNodes = function () {
        var context = this;
        this.graphData.nodeValues().forEach(function (n) {
            n.drawSelf(context.ctx, context.element().node());
        });
    };
    GraphC.prototype.drawLinks = function () {
        var context = this;
        this.graphData.edgeValues().forEach(function (n) {
            n.drawSelf(context.ctx, context.element().node());
        });
    };
    GraphC.prototype.clearCanvas = function (_x, _y, _w, _h) {
        var context = this;
        if (typeof _x !== "undefined") {
            context.ctx.clearRect(_x, _y, _w, _h);
        } else {
            var _canvas = context.element().node();
            var k_scale = this.zoom.scale();
            var w = _canvas.width / k_scale;
            var h = _canvas.height / k_scale;
            //TODO: figure out why this only clears bottom right occasionally context.ctx.clearRect(-x * 10, -y * 10, w * 10, h * 10);
            // context.ctx.clearRect(-x * 10, -y * 10, w * 10, h * 10);
            context.ctx.clearRect(-w * 10, -h * 10, w * 10 * 2, h * 10 * 2);
        }
    };
    //  Properties  ---
    GraphC.prototype.getOffsetPos = function () {
        return {
            x: 0,
            y: 0
        };
    };

    GraphC.prototype.size = function (_) {
        var retVal = CanvasWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._svgZoom) {
            this._svgZoom
                .attr("x", -this._size.width / 2)
                .attr("y", -this._size.height / 2)
                .attr("width", this._size.width)
                .attr("height", this._size.height);
        }
        return retVal;
    };

    GraphC.prototype.clear = function () {
        this.data({
            vertices: [],
            edges: [],
            hierarchy: [],
            merge: false
        });
    };

    GraphC.prototype.data = function (_) {
        var retVal = CanvasWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (!this.data().merge) {
                this.graphData = new GraphData();
                this._renderCount = 0;
            }
            var data = this.graphData.setData(this.data().vertices || [], this.data().edges || [], this.data().hierarchy || [], this.data().merge || false);

            var context = this;
            data.addedVertices.forEach(function (item) {
                item._graphID = context._id;
                item.pos({
                    x: +Math.random() * 10 / 2 - 5,
                    y: +Math.random() * 10 / 2 - 5
                });
            });
            data.addedEdges.forEach(function (item) {
                item._graphID = context._id;
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
            if (this.ctx) {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            this.draw();
        }
        return retVal;
    };

    GraphC.prototype.selection = function (_) {
        if (!arguments.length) return this._selection.get();
        this._selection.set(_);
        return this;
    };

    GraphC.prototype.setZoom = function (translation, scale, transitionDuration) {
        if (this.zoom) {
            this.zoom.translate(translation);
            this.zoom.scale(scale);
            this.applyZoom(transitionDuration);
        }
    };

    GraphC.prototype.applyZoom = function (transitionDuration) {
        var is_wheel_zoom = d3.event && (d3.event.sourceEvent.type === "wheel" || d3.event.sourceEvent.type === "mousewheel" || d3.event.sourceEvent.type === "DOMMouseScroll");
        if (d3.event && d3.event.sourceEvent && d3.event.sourceEvent.ctrlKey && is_wheel_zoom) {
            if (d3.event.sourceEvent.wheelDelta) {
                this.zoom.translate([this.prevTranslate[0], this.prevTranslate[1] + d3.event.sourceEvent.wheelDelta]);
                this.zoom.scale(this.prevScale);
            }
        }

        var _translate = this.zoom.translate();
        _translate[0] += this._size.width / 2;
        _translate[1] += this._size.height / 2;
        this._translate = _translate;
        var _scale = this.zoom.scale();

        var is_setting_transform = !this.prevTranslate || this.prevTranslate[0] !== _translate[0] || this.prevTranslate[1] !== _translate[1];
        var is_setting_scale = this.prevScale !== this.zoom.scale();

        if (is_setting_transform || is_setting_scale) {
            this.ctx.setTransform(1, 0, 0, 1, _translate[0], _translate[1]);
            this.ctx.scale(_scale, _scale);
        }

        this.prevTranslate = this.zoom.translate();
        if (this.prevScale !== this.zoom.scale()) {
            this.prevScale = this.zoom.scale();
        }

    };

    GraphC.prototype.linkcolor_default = function (_) {
        if (!arguments.length) return this._linkcolor;
        this._linkcolor = _;
        return this;
    }

    GraphC.prototype.linktooltip_default = function (_) {
        if (!arguments.length) return this._linktooltip;
        this._linktooltip = _;
        return this;
    }

    GraphC.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        var context = this;
        element.on("click", function () {
            var x = (d3.event.layerX - context._translate[0]) / context.zoom.scale();
            var y = (d3.event.layerY - context._translate[1]) / context.zoom.scale();
            context.data().vertices.forEach(function (vertex) {
                var hovered_arr = vertex.getHoveredPolygons(x, y);
                if (hovered_arr.length > 0) {
                    context.vertex_click(context.rowToObj(vertex.data(),"",true,{
                        vertex: vertex
                    }));
                }
            });
        });
        element.on("dblclick", function () {
            var x = (d3.event.layerX - context._translate[0]) / context.zoom.scale();
            var y = (d3.event.layerY - context._translate[1]) / context.zoom.scale();
            context.data().vertices.forEach(function (vertex) {
                var hovered_arr = vertex.getHoveredPolygons(x, y);
                if (hovered_arr.length > 0) {
                    context.vertex_dblclick(context.rowToObj(vertex.data(),"",true,{
                        vertex: vertex
                    }));
                }
            });
        });
        element.on("mousemove", function () {
            if(typeof context.data().vertices === "undefined")return;
            var ctx = context.ctx;
            context.draw();
            var x = (d3.event.layerX - context._translate[0]) / context.zoom.scale();
            var y = (d3.event.layerY - context._translate[1]) / context.zoom.scale();
            context.data().vertices.forEach(function (vertex) {
                var hovered_arr = vertex.getHoveredPolygons(x, y);
                if (hovered_arr.length > 0) {
                    hovered_arr.forEach(function (n) {
                        n[4].vertex.drawPolyTooltip(n, ctx);
                    });
                }
            });
        });
        //  Zoom  ---
        this.prevTranslate = [0, 0];
        this.prevScale = 1;
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.01, 4])
            .on("zoomstart", function (args) {
                if(context.draggedVertex)return;
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
                            .style("visibility", null);
                        break;
                    default:
                        element.select(".extent")
                            .style("visibility", "hidden");
                        break;
                }
            })
            .on("zoomend", function (args) {
                if(context.draggedVertex)return;
                switch (context._zoomMode) {
                    case "selection":
                        context.zoom.translate(context.prevTranslate);
                        context.zoom.scale(context.prevScale);
                        break;
                    default:
                        break;
                }
            })
            .on("zoom", function (d) {
                if(context.draggedVertex)return;
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        context.applyZoom();
                        break;
                }
                context.draw();
            });
        this.drag = d3.behavior.drag()
            .on("dragstart", function (args) {
                if(typeof context.data().vertices === "undefined")return;
                var x = (d3.event.sourceEvent.layerX - context._translate[0]) / context.zoom.scale();
                var y = (d3.event.sourceEvent.layerY - context._translate[1]) / context.zoom.scale();
                context.data().vertices.forEach(function (vertex) {
                    var hovered_arr = vertex.getHoveredPolygons(x, y);
                    if (hovered_arr.length > 0) {
                        hovered_arr.forEach(function (n) {
                            context.draggedVertex = n[4].vertex;
                        });
                    }
                });
            })
            .on("drag", function (args) {
                if(context.draggedVertex){
                    var x = (d3.event.sourceEvent.layerX - context._translate[0]) / context.zoom.scale();
                    var y = (d3.event.sourceEvent.layerY - context._translate[1]) / context.zoom.scale();
                    context.draggedVertex.x(x);
                    context.draggedVertex.y(y);
                }
            })
            .on("dragend", function (d) {
                if(context.draggedVertex){
                    delete context.draggedVertex;
                }
            });
        element
            .attr("width", this._size.width)
            .attr("height", this._size.height);
        this.ctx = domNode.getContext('2d');

        element.call(this.zoom);
        element.call(this.drag);
        this.draw();

        setTimeout(function () {
            context.draw();
        }, 1000);
    };

    GraphC.prototype.getBounds = function (items, layoutEngine) {
        var vBounds = [
            [null, null],
            [null, null]
        ];
        items.forEach(function (item) {
            var pos = layoutEngine ? layoutEngine.nodePos(item._id) : {
                x: item.x(),
                y: item.y(),
                width: item.width(),
                height: item.height()
            };
            if (pos) {
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
            }
        });
        return vBounds;
    };

    GraphC.prototype.getVertexBounds = function (layoutEngine) {
        return this.getBounds(this.graphData.nodeValues(), layoutEngine);
    };

    GraphC.prototype.getSelectionBounds = function (layoutEngine) {
        return this.getBounds(this._selection.get(), layoutEngine);
    };

    GraphC.prototype.shrinkToFit = function (bounds, transitionDuration) {
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

    GraphC.prototype._origScale = GraphC.prototype.scale;
    GraphC.prototype.scale = function (_, transitionDuration) {
        var retVal = GraphC.prototype._origScale.apply(this, arguments);
        if (arguments.length) {
            this.zoomTo(_, transitionDuration);
        }
        return retVal;
    };

    GraphC.prototype.zoomTo = function (level, transitionDuration) {
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
        this.draw();
    };

    GraphC.prototype.centerOn = function (bounds, transitionDuration) {
        var x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2;
        var translate = [x, y];
        this.setZoom(translate, 1, transitionDuration);
    };

    GraphC.prototype._origLayout = GraphC.prototype.layout;
    GraphC.prototype.layout = function (_, transitionDuration) {
        var retVal = GraphC.prototype._origLayout.apply(this, arguments);
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
                            if (item.fixed) {
                                item.x = item.px;
                                item.y = item.py;
                            } else {
                                item.px = item.x;
                                item.py = item.y;

                                //  Might have been cleared ---
                                var vertex = context.graphData.node(item.id);
                                if (vertex) {
                                    vertex.x(item.x);
                                    vertex.y(item.y);
                                }
                            }
                        });
                        context.graphData.edgeValues().forEach(function (item) {
                            item.points([], false, false);
                        });
                        if (context.applyScaleOnLayout()) {
                            var vBounds = context.getVertexBounds(layoutEngine);
                            context.shrinkToFit(vBounds);
                        }
                        context.draw();
                    });
                    this.forceLayout.force.start();
                } else if (layoutEngine) {
                    this.forceLayout = null;
                    context._dragging = true;
                    context.graphData.nodeValues().forEach(function (item) {
                        var pos = layoutEngine.nodePos(item._id);
                        item.x(pos.x);
                        item.y(pos.y);
                    });
                    context.graphData.edgeValues().forEach(function (item) {
                        var points = layoutEngine.edgePoints(item);
                        item.points(points, transitionDuration);
                    });

                    if (context.applyScaleOnLayout()) {
                        var vBounds = context.getVertexBounds(layoutEngine);
                        context.shrinkToFit(vBounds, transitionDuration);
                    }
                    setTimeout(function () {
                        context._dragging = false;
                    }, transitionDuration ? transitionDuration + 50 : 50); //  Prevents highlighting during morph  ---
                }
            }
            this.zoomTo('all');
        }
        return retVal;
    };

    //  Render  ---
    GraphC.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);

        if (!this._renderCount) {
            this._renderCount++;
            this.setZoom([0.1, 0], 1);
            this.layout(this.layout());
        }
        this.clearCanvas();
        this.drawLinks();
        this.drawNodes();
    };

    //  Methods  ---
    GraphC.prototype.getLayoutEngine = function () {
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
        return null; //new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    };

    //  Events  ---
    GraphC.prototype.resize = function (size) {
        var retVal = CanvasWidget.prototype.resize.apply(this, arguments);
        this.zoomTo('all');
        return retVal;
    };

    GraphC.prototype.graph_selection = function (selection) { };

    GraphC.prototype.vertex_click = function (row, col, sel, more) {
        if (more && more.vertex) {
            more.vertex._parentElement.node().parentNode.appendChild(more.vertex._parentElement.node());
        }
        IGraph.prototype.vertex_click.apply(this, arguments);
    };

    GraphC.prototype.vertex_dblclick = function (row, col, sel, more) { };

    GraphC.prototype.vertex_mouseover = function (element, d) {
        this.highlightVertex(element, d);
    };

    GraphC.prototype.vertex_mouseout = function (d, self) {
        this.highlightVertex(null, null);
    };

    GraphC.prototype.edge_mouseover = function (element, d) {
        this.highlightEdge(element, d);
    };

    GraphC.prototype.edge_mouseout = function (d, self) {
        this.highlightEdge(null, null);
    };

    return GraphC;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('graph/Sankey.js',["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "../common/Utility", "d3-sankey", "css!./Sankey"], factory);
    } else {
        root.graph_Sankey = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.common_Utility, root.d3.sankey);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, Utility, D3Sankey) {
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
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";
    }
    Sankey.prototype = Object.create(SVGWidget.prototype);
    Sankey.prototype.constructor = Sankey;
    Sankey.prototype._class += " graph_Sankey";
    Sankey.prototype.Column = Column;
    Sankey.prototype.mixin(Utility.SimpleSelectionMixin);

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
                        origRow: row.values
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
        this._selection.widgetElement(element);
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
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d, idx) {
                context.click(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .on("dblclick", function (d, idx) {
                context.dblclick(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .each(function (d) {
                var gElement = d3.select(this);
                gElement.append("rect");
                gElement.append("text");
            })
            /*
            .call(d3.behavior.drag()
                .origin(function (d) { return d; })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove)
            )
            */
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

        /*
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
        */
    };

    Sankey.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    //  Events  ---
    Sankey.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    Sankey.prototype.dblclick = function (row, column, selected) {
        console.log("Double Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return Sankey;
}));

