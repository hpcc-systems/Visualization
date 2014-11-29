(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./IGraph", "./Vertex", "./GraphData", "./GraphLayouts", "css!./Graph"], factory);
    } else {
        root.Graph = factory(root.d3, root.SVGWidget, root.IGraph, root.Vertex, root.GraphData, root.GraphLayouts);
    }
}(this, function (d3, SVGWidget, IGraph, Vertex, GraphData, GraphLayouts) {
    function Graph() {
        SVGWidget.call(this);
        IGraph.call(this);

        this.graphData = new GraphData();
        this._transitionDuration = 250;
        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            edge: "1.25px",
            transition: this._transitionDuration
        };

        this._class = "graph";
        this._highlightOnMouseOverVertex = false;
        this._highlightOnMouseOverEdge = false;
        this._shrinkToFitOnLayout = false;
        this._layout = "";
        this._hierarchyOptions = { };
    };
    Graph.prototype = Object.create(SVGWidget.prototype);
    Graph.prototype.implements(IGraph.prototype);
    
    //  Properties  ---
    Graph.prototype.getOffsetPos = function () {
        return { x: 0, y: 0 };
    }

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

    Graph.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (!this._data.merge) {
                this.graphData = new GraphData();
                this._renderCount = 0;
                this.setZoom([0, 0], 1);
            }
            var data = this.graphData.setData(this._data.vertices, this._data.edges, this._data.merge);

            var context = this;
            data.addedVertices.forEach(function (item) {
                item.pos({
                    x:  + Math.random() * 10 / 2 - 5,
                    y:  + Math.random() * 10 / 2 - 5
                });
            })
            data.addedEdges.forEach(function (item) {
                if (item._sourceMarker)
                    item._sourceMarker = context._id + "_" + item._sourceMarker;
                if (item._targetMarker)
                    item._targetMarker = context._id + "_" + item._targetMarker;
            })
        }
        return retVal;
    };

    Graph.prototype.highlightOnMouseOverVertex = function (_) {
        if (!arguments.length) return this._highlightOnMouseOverVertex;
        this._highlightOnMouseOverVertex = _;
        return this;
    };

    Graph.prototype.highlightOnMouseOverEdge = function (_) {
        if (!arguments.length) return this._highlightOnMouseOverEdge;
        this._highlightOnMouseOverEdge = _;
        return this;
    };

    Graph.prototype.shrinkToFitOnLayout = function (_) {
        if (!arguments.length) return this._shrinkToFitOnLayout;
        this._shrinkToFitOnLayout = _;
        return this;
    };

    Graph.prototype.hierarchyOptions = function (_) {
        if (!arguments.length) return this._hierarchyOptions;
        this._hierarchyOptions = _;
        return this;
    };

    Graph.prototype.setZoom = function (translation, scale) {
        if (this.zoom) {
            this.zoom.translate(translation);
            this.zoom.scale(scale);
            this.applyZoom();
        }
    };

    Graph.prototype.applyZoom = function (transition) {
        (transition ? this.svg.transition() : this.svg)
            .attr("transform", "translate(" + this.zoom.translate() + ")scale(" + this.zoom.scale() + ")")
        ;
        //  IE Bug Workaround  (Markers) ---
        if (this.prevScale !== this.zoom.scale()) {
            this._fixIEMarkers();
            this.prevScale = this.zoom.scale();
        }
    };

    Graph.prototype.enter = function (domNode, element, d) {
        var context = this;

        //  Zoom  ---
        this.prevScale = 1;
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.2, 4])
            .on("zoom", function (d) { context.applyZoom(); })
        ;

        //  Drag  ---
        function dragstart(d) {
            d3.event.sourceEvent.stopPropagation();
            context._dragging = true;
            if (context.forceLayout) {
                var forceNode = context.forceLayout.vertexMap[d.id()];
                forceNode.fixed = true;
            }
            if (this.isIE) {
                context.graphData.nodeEdges(d.id()).forEach(function (id) {
                    var edge = context.graphData.edge(id);
                    context._pushMarkers(edge.element(), edge);
                });
            }
        }
        function dragend(d) {
            d3.event.sourceEvent.stopPropagation();
            context._dragging = false;
            if (context.forceLayout) {
                var forceNode = context.forceLayout.vertexMap[d.id()];
                forceNode.fixed = false;
            }
            if (this.isIE) {
                context.graphData.nodeEdges(d.id()).forEach(function (id) {
                    var edge = context.graphData.edge(id);
                    context._popMarkers(edge.element(), edge);
                });
            };
        }
        function drag(d) {
            d3.event.sourceEvent.stopPropagation();
            d.pos({ x: d3.event.x, y: d3.event.y });
            if (context.forceLayout) {
                var forceNode = context.forceLayout.vertexMap[d.id()];
                forceNode.fixed = true;
                forceNode.x = forceNode.px = d3.event.x;
                forceNode.y = forceNode.py = d3.event.y;
            }
            context.refreshIncidentEdges(d, true);
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
            .call(this.zoom)
        ;

        this.defs = element.append("defs");
        this.addMarkers();

        this.svg = element.append("g");
        this.svgE = this.svg.append("g").attr("id", this._id + "E");
        this.svgV = this.svg.append("g").attr("id", this._id + "V");
    };

    Graph.prototype.getVertexBounds = function (layoutEngine) {
        var vBounds = [[null,null],[null,null]];
        this.graphData.nodeValues().forEach(function (item) {
            var pos = layoutEngine.nodePos(item._id);
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
        
    Graph.prototype.shrinkToFit = function (bounds) {
        var width = this.width();
        var height = this.height();

        var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height);
        if (scale > 1) {
            scale = 1;
        }
        var translate = [-scale * x, -scale * y];
        this.setZoom(translate, scale);
    };

    Graph.prototype.layout = function (_) {
        if (!arguments.length) return this._layout;
        this._layout = _;
        if (this._renderCount) {
            if (this.forceLayout) {
                this.forceLayout.force.stop();
                this.forceLayout = null;
            }

            var context = this;
            var layoutEngine = this.getLayoutEngine();
            if (this._layout == "ForceDirected2") {
                this.forceLayout = layoutEngine;
                var context = this;
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
                                .pos({ x: item.x, y: item.y })
                            ;
                        }
                    });
                    context.graphData.edgeValues().forEach(function (item) {
                        item
                            .points([], false, true)
                        ;
                    });
                    if (context._shrinkToFitOnLayout) {
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
                    item
                        .pos({ x: pos.x, y: pos.y }, context._transitionDuration)
                    ;
                });
                context.graphData.edgeValues().forEach(function (item) {
                    var points = layoutEngine.edgePoints({v: item._sourceVertex.id(), w: item._targetVertex.id()});
                    item
                        .points(points, context._transitionDuration)
                    ;
                });

                if (context._shrinkToFitOnLayout) {
                    var vBounds = context.getVertexBounds(layoutEngine);
                    context.shrinkToFit(vBounds);
                }
                this._fixIEMarkers();
                setTimeout(function() {
                    context._dragging = false;
                }, context._transitionDuration + 50);  //  Prevents highlighting during morph  ---
            }
        }
        return this;
    };

    //  Render  ---
    Graph.prototype.update = function (domNode, element, d) {
        var context = this;

        //  Create  ---
        var vertexElements = this.svgV.selectAll("#" + this._id + "V > .graphVertex").data(this.graphData.nodeValues(), function (d) { return d.id(); });
        vertexElements.enter().append("g")
            .attr("class", "graphVertex")
            .style("opacity", 1e-6)
             //  TODO:  Events need to be optional  ---
            .on("click", function (d) {
                context.vertex_click(d);
            })
            .on("dblclick", function (d) {
                context.vertex_dblclick(d);
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
                d.dispatch.on("sizestart", function (args) {
                    context._dragging = true;
                });
                d.dispatch.on("size", function (args) {
                    context.refreshIncidentEdges(d, true);
                });
                d.dispatch.on("sizeend", function (args) {
                    context._dragging = false;
                });
            }
        }

        var edgeElements = this.svgE.selectAll("#" + this._id + "E > .edge").data(this.graphData.edgeValues(), function (d) { return d.id(); });
        edgeElements.enter().append("g")
            .attr("class", "edge")
            .style("opacity", 1e-6)
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
        vertexElements.exit().remove();
        edgeElements.exit().remove();

        if (!this._renderCount++) {
            this.layout(this.layout());
        }
    };

    //  Methods  ---
    Graph.prototype.getLayoutEngine = function () {
        switch (this._layout) {
            case "Circle":
                return new GraphLayouts.Circle(this.graphData, this._size.width, this._size.height);
            case "ForceDirected":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height, true);
            case "ForceDirected2":
                return new GraphLayouts.ForceDirected(this.graphData, this._size.width, this._size.height);
            case "Hierarchy":
                return new GraphLayouts.Hierarchy(this.graphData, this._size.width, this._size.height, this._hierarchyOptions);
        }
        return null;//new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    }

    Graph.prototype.getNeighborMap = function (vertex) {
        var vertices = {};
        var edges = {};

        if (vertex) {
            var edges = this.graphData.nodeEdges(vertex.id());
            for (var i = 0; i < edges.length; ++i) {
                var edge = this.graphData.edge(edges[i]);
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
        var vertexElements = this.svgV.selectAll(".vertex");
        vertexElements.transition().duration(this.highlight.transition)
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
        //  Causes issues in IE  ---
        /*
        var zoomScale = this.zoom.scale();
        if (zoomScale > 1)
            zoomScale = 1;
        vertexElements.select(".textbox").transition().duration(this.highlight.transition)
            .attr("transform", function (d) {

                if (vertexMap && vertexMap[d.id()]) {
                    return "scale(" + context.highlight.zoom / zoomScale + ")";
                }
                return "scale(1)";
            })
        ;
        */
    };

    Graph.prototype.highlightEdges = function (edgeMap) {
        var context = this;
        var edgeElements = this.svgE.selectAll(".edge");
        edgeElements
            .style("stroke-width", function (o) {
                if (edgeMap && edgeMap[o.id()]) {
                    return context.highlight.edge;
                }
                return "1px";
            }).transition().duration(this.highlight.transition)
            .style("opacity", function (o) {
                if (!edgeMap || edgeMap[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
    };

    Graph.prototype.highlightVertex = function (element, d) {
        if (this._highlightOnMouseOverVertex) {
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
        if (this._highlightOnMouseOverEdge) {
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
                .attr("points", "0,0 10,5 0,10 1,5");
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
