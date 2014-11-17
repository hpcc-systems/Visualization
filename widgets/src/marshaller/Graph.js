(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "../common/TextBox", "../common/Surface", "../common/ResizeSurface", "../chart/MultiChartSurface", "../common/Palette", "../graph/Graph", "../graph/Vertex", "../graph/Edge", "./HipieDDL"], factory);
    } else {
        root.Graph = factory(root.d3, root.SVGWidget, root.TextBox, root.Surface, root.ResizeSurface, root.MultiChartSurface, root.Palette, root.GraphWidget, root.Vertex, root.Edge, root.HipieDDL);
    }
}(this, function (d3, SVGWidget, TextBox, Surface, ResizeSurface, MultiChartSurface, Palette, GraphWidget, Vertex, Edge, HipieDDL) {
    function Graph(target) {
        GraphWidget.call(this);

        this.marshaller = new HipieDDL.Marshaller();
        this._visualizeRoxie = false;
        this._url = "";
    };
    Graph.prototype = Object.create(GraphWidget.prototype);

    Graph.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        return this;
    };

    Graph.prototype.proxyMappings = function (_) {
        var retVal = this.marshaller.proxyMappings(_);
        if (arguments.length) {
            return this;
        }
        return retVal;
    };

    Graph.prototype.visualizeRoxie = function (_) {
        if (!arguments.length) return this._visualizeRoxie;
        this._visualizeRoxie = _;
        return this;
    };

    Graph.prototype.render = function (callback) {
        this.data({ vertices: [], edges: []});
        GraphWidget.prototype.render.call(this);
        var context = this;
        if (this._url[0] === "[" || this._url[0] === "{") {
            this.marshaller.parse(this._url, function () {
                context.doRender();
            });
        } else {
            this.marshaller.url(this._url, function (response) {
                context.doRender();
                if (callback) {
                    callback(context);
                }
            });
        }
        return this;
    };

    Graph.prototype.doRender = function () {
        var context = this;
        var vertices = [];
        var vertexMap = {};
        this.marshaller.accept({
            _visualizeRoxie: context._visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.DataSource) {
                    if (this._visualizeRoxie) {
                        var params = "";
                        item.filter.forEach(function (item) {
                            if (params.length > 0) {
                                params += ", ";
                            }
                            params += item;
                        });
                        params = " (" + params + ")";
                        vertexMap[item.id] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf1c0")
                            .text(item.id + params)
                        ;
                        vertices.push(vertexMap[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (this._visualizeRoxie) {
                        vertexMap[item.dataSource.id + "." + item.id] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf0ce")
                            .text(item.id + "\n[" + item.from + "]")
                        ;
                        vertices.push(vertexMap[item.dataSource.id + "." + item.id]);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        var newSurface = null;
                        if (item.widget instanceof Surface) {
                            newSurface = item.widget
                                .size({ width: 210, height: 210 })
                            ;
                        } else if (item.widget instanceof TextBox) {
                            newSurface = item.widget;
                        } else {
                            var width = 280;
                            var height = 210;
                            if (item.type === "GRAPH") {
                                width = 800;
                                height = 600;
                            }
                            newSurface = new ResizeSurface()
                                .size({ width: width, height: height })
                                .title(item.id)
                                .content(item.widget)
                            ;
                        }
                        if (newSurface) {
                            vertexMap[item.id] = newSurface;
                            vertices.push(newSurface);

                            switch (item.type) {
                                case "CHORO":
                                    newSurface._menu
                                        .data(Palette.brewer())
                                    ;
                                    var context = this;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .palette(d)
                                            .render(d)
                                        ;
                                    }
                                    break;
                                case "GRAPH":
                                    newSurface._menu
                                        .data(["Circle", "ForceDirected", "ForceDirected2", "Hierarchy"])
                                    ;
                                    var context = this;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .layout(d)
                                        ;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        });

        var edges = [];
        function addEdge(sourceID, targetID, sourceMarker, targetMarker, text) {
            sourceMarker = sourceMarker || "";
            targetMarker = targetMarker || "";
            text = text || "";
            if (sourceID && targetID && vertexMap[sourceID] && vertexMap[targetID]) {
                edges.push(new Edge()
                    .sourceVertex(vertexMap[sourceID])
                    .targetVertex(vertexMap[targetID])
                    .sourceMarker(sourceMarker)
                    .targetMarker(targetMarker)
                    .text(text)
                );
            } else {
                if (!vertexMap[sourceID]) {
                    console.log("Unknown Vertex:  " + sourceID);
                }
                if (!vertexMap[targetID]) {
                    console.log("Unknown Vertex:  " + targetID);
                }
            }
        };
        this.marshaller.accept({
            _visualizeRoxie: context._visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.DataSource) {
                } else if (item instanceof HipieDDL.Output) {
                    if (this._visualizeRoxie) {
                        addEdge(item.dataSource.id, item.getQualifiedID(), "circleFoot", "circleHead");
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (this._visualizeRoxie) {
                        if (item.source.getDatasource()) {
                            addEdge(item.id, item.source.getDatasource().id, "", "arrowHead", "update");
                        }
                        if (item.source.getOutput()) {
                            addEdge(item.source.getOutput().getQualifiedID(), item.id, "", "arrowHead", "notify");
                        }
                    }

                    item.onSelect.getUpdatesVisualizations().forEach(function (vizItem) {
                        addEdge(item.id, vizItem.id, undefined, "arrowHead", "on Select");
                    });
                }
            }
        });

        this.data({ vertices: vertices, edges: edges });
        GraphWidget.prototype.render.call(this);

        for (var key in this.marshaller.dashboards) {
            var dashboard = this.marshaller.dashboards[key];
            for (var key in dashboard.datasources) {
                dashboard.datasources[key].fetchData({}, true);
            }
        }
    };

    return Graph;
}));
