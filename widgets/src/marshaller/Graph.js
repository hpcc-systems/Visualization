(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "../common/Surface", "../graph/Graph", "../graph/Vertex", "../graph/Edge", "./HipieDDL"], factory);
    } else {
        root.Graph = factory(root.d3, root.D3Widget, root.Surface, root.GraphWidget, root.Vertex, root.Edge, root.HipieDDL);
    }
}(this, function (d3, D3Widget, Surface, GraphWidget, Vertex, Edge, HipieDDL) {
    function Graph(target) {
        GraphWidget.call(this);

        this.marshaller = new HipieDDL.Marshaller();
        this.visualizeRoxie = false;
        this._url = "";
    };
    Graph.prototype = Object.create(GraphWidget.prototype);

    Graph.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        return this;
    };

    Graph.prototype.render = function () {
        var context = this;
        this.marshaller.url(this._url, function (response) {
            var vertices = [];
            var vertexMap = {};
            context.marshaller.accept({
                visualizeRoxie: context.visualizeRoxie,
                visit: function (item) {
                    if (item instanceof HipieDDL.DataSource) {
                        if (this.visualizeRoxie) {
                            var params = "";
                            item.filter.forEach(function (item) {
                                if (params.length > 0) {
                                    params += ", ";
                                }
                                params += item;
                            });
                            params = "(" + params + ")";
                            vertexMap[item.id] = new Vertex()
                                .class("vertexLabel")
                                .faChar("\uf1c0")
                                .text(item.id + params)
                            ;
                            vertices.push(vertexMap[item.id]);
                        }
                    } else if (item instanceof HipieDDL.Output) {
                        if (this.visualizeRoxie) {
                            vertexMap[item.dataSource.id + "." + item.id] = new Vertex()
                                .class("vertexLabel")
                                .faChar("\uf0ce")
                                .text(item.id)
                            ;
                            vertices.push(vertexMap[item.dataSource.id + "." + item.id]);
                        }
                    } else if (item instanceof HipieDDL.Visualization) {
                        var width = 210;
                        if (item.type === "CHORO") {
                            width = 280;
                            item.widget.size({width:width, height: 210})
                        }
                        vertexMap[item.id] = new Surface()
                            .size({ width: width, height: 210 })
                            .title(item.id)
                            .content(item.widget)
                        ;
                        vertices.push(vertexMap[item.id]);
                    }
                }
            });

            var edges = [];
            context.marshaller.accept({
                visualizeRoxie: context.visualizeRoxie,
                visit: function (item) {
                    if (item instanceof HipieDDL.DataSource) {
                    } else if (item instanceof HipieDDL.Output) {
                        if (this.visualizeRoxie) {
                            edges.push(new Edge()
                                .sourceVertex(vertexMap[item.dataSource.id])
                                .targetVertex(vertexMap[item.dataSource.id + "." + item.id])
                            );
                        }
                    } else if (item instanceof HipieDDL.Visualization) {
                        if (this.visualizeRoxie) {
                            if (HipieDDL.exists("source.id", item)) {
                                edges.push(new Edge()
                                    .sourceVertex(vertexMap[item.source.id + "." + item.source.output])
                                    .targetVertex(vertexMap[item.id])
                                    .sourceMarker("circleFoot")
                                    .targetMarker("circleHead")
                                );
                            }
                        }

                        if (HipieDDL.exists("onSelect.updates.visualization", item)) {
                            edges.push(new Edge()
                                .sourceVertex(vertexMap[item.id])
                                .targetVertex(vertexMap[item.onSelect.updates.visualization])
                                .targetMarker("arrowHead")
                                .text("on Select")
                            );
                        }
                    }
                }
            });

            context.data({ vertices: vertices, edges: edges });
            GraphWidget.prototype.render.call(context);

            for (var key in context.marshaller.dashboards) {
                var dashboard = context.marshaller.dashboards[key];
                for (var key in dashboard.datasources) {
                    dashboard.datasources[key].processResponse(response);
                }
            }
        });
    };

    return Graph;
}));
