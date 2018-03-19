"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/CanvasWidget", "../common/Palette", "../api/IGraph", "./VertexC", "./EdgeC", "./GraphData", "./GraphLayouts", "../common/Utility"], factory);
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
                switch (context._zoomMode) {
                    case "selection":
                        break;
                    default:
                        context.applyZoom();
                        break;
                }
                context.draw();
            });

        element
            .attr("width", this._size.width)
            .attr("height", this._size.height);
        this.ctx = domNode.getContext('2d');

        element.call(this.zoom);
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