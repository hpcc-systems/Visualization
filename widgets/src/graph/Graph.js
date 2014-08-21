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

        this.highlight = {
            zoom: 1.1,
            opacity: 0.33,
            transition: 500
        };

        this._class = "graph";
        this._layout = "";
    };
    Graph.prototype = Object.create(SVGWidget.prototype);
    Graph.prototype.implements(IGraph.prototype);
    
    //  Properties  ---
    Graph.prototype.target = function (_) {
        var retVal = SVGWidget.prototype.target.apply(this, arguments);
        if (arguments.length) {
            this.pos({x:0,y:0});
        }
        return retVal;
    };
    Graph.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._svgZoom) {
            this._svgZoom
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
            }
            var data = this.graphData.setData(this._data.vertices, this._data.edges, this._data.merge);

            var context = this;
            data.addedVertices.forEach(function (item) {
                item.x = context._size.width / 2 + Math.random() * 10 / 2 - 5;
                item.y = context._size.height / 2 + Math.random() * 10 / 2 - 5;
            })
            data.addedEdges.forEach(function (item) {
                if (item._sourceMarker)
                    item._sourceMarker = context._id + "_" + item._sourceMarker;
                if (item._targetMarker)
                    item._targetMarker = context._id + "_" + item._targetMarker;
            })
            this.layout(this.layout());
        }
        return retVal;
    };

    Graph.prototype.enter = function (domNode, element, d) {
        var context = this;

        if (this._target instanceof SVGElement) {
            this.drag = function () { 
            };
        } else {
            //  Zoom  ---
            var prevScale = 1;
            function zoom() {
                context.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

                //  IE Bug Workaround  (Markers) ---
                if (prevScale !== d3.event.scale) {
                    context._fixIEMarkers();
                    prevScale = d3.event.scale;
                }
            }

            this.zoom = d3.behavior.zoom()
                .scaleExtent([0.2, 4])
                .on("zoom", zoom)
            ;

            //  Drag  ---
            function dragstart(d) {
                d._dragging = true;
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                }
                context.graphData.incidentEdges(d.id()).forEach(function (id) {
                    var edge = context.graphData.edge(id);
                    context._pushMarkers(edge.element(), edge);
                })
            }
            function dragend(d) {
                d._dragging = false;
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = false;
                }
                context.graphData.incidentEdges(d.id()).forEach(function (id) {
                    var edge = context.graphData.edge(id);
                    context._popMarkers(edge.element(), edge);
                })
            }
            function drag(d) {
                d
                    .pos({ x: d3.event.x, y: d3.event.y })
                ;
                if (context.forceLayout) {
                    var forceNode = context.forceLayout.vertexMap[d.id()];
                    forceNode.fixed = true;
                    forceNode.x = forceNode.px = d3.event.x;
                    forceNode.y = forceNode.py = d3.event.y;
                }
                context.graphData.incidentEdges(d.id()).forEach(function (id) {
                    var edge = context.graphData.edge(id);
                    edge
                        .points([])
                    ;
                })
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
                .attr("width", this._size.width)
                .attr("height", this._size.height)
                .call(this.zoom)
            ;

            this.defs = element.append("defs");
            this.addMarkers();
        }

        this.svg = element.append("g");
        this.svgE = this.svg.append("g").attr("id", this._id + "E");
        this.svgV = this.svg.append("g").attr("id", this._id + "V");
    };

    Graph.prototype.layout = function (_) {
        if (!arguments.length) return this._layout;
        this._layout = _;
        if (this._renderCount) {
            if (this.forceLayout) {
                this.forceLayout.force.stop();
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
                            .points([])
                        ;
                    });
                });
                this.forceLayout.force.start();
            } else if (layoutEngine) {
                context.graphData.nodeValues().forEach(function (item) {
                    var pos = layoutEngine.nodePos(item._id);
                    item
                        .pos({ x: pos.x, y: pos.y }, true)
                    ;
                });
                context.graphData.edgeValues().forEach(function (item) {
                    var points = layoutEngine.edgePoints(item._id);
                    item
                        .points(points, true)
                    ;
                });
                this._fixIEMarkers();
            }
        }
        return this;
    };

    //  Render  ---
    Graph.prototype.update = function (domNode, element, d) {
        var context = this;

        //  Create  ---
        var vertexElements = this.svgV.selectAll("#" + this._id + "V > .vertex").data(this.graphData.nodeValues(), function (d) { return d.id(); });
        vertexElements.enter().append("g")
            .attr("class", "vertex")
             //  TODO:  Events need to be optional  ---
            .on("click", function (d) {
                context.vertex_click(d);
            })
            .on("mouseover", function (d) {
                if (d._dragging)
                    return;
                //context.vertex_mouseover(d3.select(this), d);
            })
            .on("mouseout", function (d) {
                if (d._dragging)
                    return;
                //  TODO:  Needs to be optional  ---
                //context.vertex_mouseout(d3.select(this), d);
            })
            .each(createV)
        ;
        function createV(d) {
            d
                .target(this)
                .render()
            ;
            d.element()
                .call(context.drag)
            ;
        }

        var edgeElements = this.svgE.selectAll("#" + this._id + "E > .edge").data(this.graphData.edgeValues(), function (d) { return d.id(); });
        edgeElements.enter().append("g")
            .attr("class", "edge")
            .on("click", function (d) {
                context.edge_click(d);
            })
            .each(createE)
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
                return new GraphLayouts.Hierarchy(this.graphData, this._size.width, this._size.height);
        }
        return null;//new GraphLayouts.None(this.graphData, this._size.width, this._size.height);
    }

    Graph.prototype.highlightVertex = function (element, d) {
        //  Causes issues in IE  ---
        //var zoomScale = this.zoom.scale();
        //if (zoomScale > 1)
            zoomScale = 1;

        var context = this;
        var highlightVertices = {};
        var highlightEdges = {};
        if (d) {
            var edges = this.graphData.incidentEdges(d.id());
            for (var i = 0; i < edges.length; ++i) {
                var edge = this.graphData.edge(edges[i]);
                highlightEdges[edge.id()] = true;
                highlightVertices[edge._sourceVertex.id()] = true;
                highlightVertices[edge._targetVertex.id()] = true;
            }
        }

        var vertexElements = this.svgV.selectAll(".vertex");
        vertexElements.transition().duration(this.highlight.transition)
            .each("end", function (d) {
                if (element) {
                    element.node().parentNode.appendChild(element.node());
                }
            })
            .style("opacity", function (o) {
                if (!d || highlightVertices[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
        vertexElements.select(".vertexLabelXXX").transition().duration(this.highlight.transition)
            .attr("transform", function (o) {
                if (d && highlightVertices[o.id()]) {
                    return "scale(" + context.highlight.zoom / zoomScale + ")";
                }
                return "scale(1)";
            })
        ;
        d3.selectAll(".edge")
            .classed("edge-active", function (o) {
                return (d && highlightEdges[o.id()]) ? true : false;
            }).transition().duration(this.highlight.transition)
            .style("opacity", function (o) {
                if (!d || highlightEdges[o.id()]) {
                    return 1;
                }
                return context.highlight.opacity;
            })
        ;
    };

    //  Events  ---
    Graph.prototype.vertex_click = function (d) {
        d._parentElement.node().parentNode.appendChild(d._parentElement.node());
        IGraph.prototype.vertex_click.apply(this, arguments);
    };

    Graph.prototype.vertex_mouseover = function (element, d) {
        this.highlightVertex(element, d);
    };

    Graph.prototype.vertex_mouseout = function (d, self) {
        this.highlightVertex(null, null);
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
