(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "../common/TextBox", "../common/Surface", "../common/ResizeSurface", "../chart/MultiChartSurface", "../common/Palette", "../graph/Graph", "../graph/Vertex", "../graph/Edge", "./HipieDDL"], factory);
    } else {
        root.Graph = factory(root.d3, root.SVGWidget, root.TextBox, root.Surface, root.ResizeSurface, root.MultiChartSurface, root.Palette, root.GraphWidget, root.Vertex, root.Edge, root.HipieDDL);
    }
}(this, function (d3, SVGWidget, TextBox, Surface, ResizeSurface, MultiChartSurface, Palette, GraphWidget, Vertex, Edge, HipieDDL) {
    function createGraphData(marshaller, visualizeRoxie) {
        var curr = null;
        var dashboards = {};
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        vertexMap: {},
                        edges: [],
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (this._visualizeRoxie) {
                        var params = "";
                        item.filter.forEach(function (item) {
                            if (params.length > 0) {
                                params += ", ";
                            }
                            params += item;
                        });
                        params = " (" + params + ")";
                        curr.vertexMap[item.getQualifiedID()] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf1c0")
                            .text(item.id + params)
                        ;
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (this._visualizeRoxie) {
                        curr.vertexMap[item.getQualifiedID()] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf0ce")
                            .text(item.id + "\n[" + item.from + "]")
                        ;
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
                            item.widgetSurface = newSurface;
                            curr.vertexMap[item.getQualifiedID()] = newSurface;

                            switch (item.type) {
                                case "CHORO":
                                    newSurface._menu
                                        .data(Palette.brewer())
                                    ;
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

        function addEdge(curr, sourceID, targetID, sourceMarker, targetMarker, text) {
            sourceMarker = sourceMarker || "";
            targetMarker = targetMarker || "";
            text = text || "";
            if (sourceID && targetID && curr.vertexMap[sourceID] && curr.vertexMap[targetID]) {
                curr.edges.push(new Edge()
                    .sourceVertex(curr.vertexMap[sourceID])
                    .targetVertex(curr.vertexMap[targetID])
                    .sourceMarker(sourceMarker)
                    .targetMarker(targetMarker)
                    .text(text)
                );
            } else {
                if (!curr.vertexMap[sourceID]) {
                    console.log("Unknown Vertex:  " + sourceID);
                }
                if (!curr.vertexMap[targetID]) {
                    console.log("Unknown Vertex:  " + targetID);
                }
            }
        };

        curr = null;
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = dashboards[item.getQualifiedID()];
                } else if (item instanceof HipieDDL.DataSource) {
                } else if (item instanceof HipieDDL.Output) {
                    if (this._visualizeRoxie) {
                        addEdge(curr, item.dataSource.getQualifiedID(), item.getQualifiedID(), "circleFoot", "circleHead");
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (this._visualizeRoxie) {
                        if (item.source.getDatasource()) {
                            addEdge(curr, item.getQualifiedID(), item.source.getDatasource().getQualifiedID(), "", "arrowHead", "update");
                        }
                        if (item.source.getOutput()) {
                            addEdge(curr, item.source.getOutput().getQualifiedID(), item.getQualifiedID(), "", "arrowHead", "notify");
                        }
                    }

                    item.onSelect.getUpdatesVisualizations().forEach(function (vizItem) {
                        addEdge(curr, item.getQualifiedID(), vizItem.getQualifiedID(), undefined, "arrowHead", "on Select");
                    });
                }
            }
        });
        return dashboards;
    };

    function Graph(target) {
        GraphWidget.call(this);

        this._dashboards = [];
        this.widgetAttributes = ["layout", "chartType", "palette", "title", "data"];
    };
    Graph.prototype = Object.create(GraphWidget.prototype);

    Graph.prototype.dashboards = function (_) {
        if (!arguments.length) return this._dashboards;
        this._dashboards = _;
        return this;
    };

    Graph.prototype.title = function () {
        var retVal = "";
        this._dashboards.forEach(function (item) {
            if (retVal) {
                retVal += ", ";
            }
            retVal += item.dashboard.title;
        });
        return retVal;
    };

    Graph.prototype.render = function (callback) {
        this.data({ vertices: [], edges: []});
        GraphWidget.prototype.render.call(this);
        var context = this;
        var vertices = [];
        var edges = [];
        for (var key in this._dashboards) {
            for (var vm_key in this._dashboards[key].vertexMap) {
                vertices.push(this._dashboards[key].vertexMap[vm_key]);
            }
            edges = edges.concat(this._dashboards[key].edges);
        }
        this.data({ vertices: vertices, edges: edges });
        var loadResult = this.load();
        if (!loadResult.changed) {
            GraphWidget.prototype.render.call(this);
        }
        if (!loadResult.dataChanged) {
            for (var key in this._dashboards) {
                var dashboard = this._dashboards[key].dashboard;
                for (var key in dashboard.datasources) {
                    dashboard.datasources[key].fetchData({}, true);
                }
            }
        }
    };

    Graph.prototype.checksum = function(s) {
        var hash = 0,
        strlen = s.length,
        i,
        c;
        if ( strlen === 0 ) {
            return hash;
        }
        for ( i = 0; i < strlen; i++ ) {
            c = s.charCodeAt( i );
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    Graph.prototype.calcHash = function () {
        var context = this;
        var hash = 0;
        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization) {
                        hash += context.checksum(item.getQualifiedID());
                    }
                }
            });
        }
        return hash;
    },

    Graph.prototype.clear = function () {
        localStorage.setItem("Graph_" + this.calcHash(), "");
    };

    Graph.prototype.save = function () {
        var context = this;
        var state = {};
        state["zoom"] = {
            translation: context.zoom.translate(),
            scale: context.zoom.scale()
        };
        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            var currDashboardID = currDashboard.getQualifiedID();
            state[currDashboardID] = {};
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization) {
                        if (item.widgetSurface) {
                            state[currDashboardID][item.getQualifiedID()] = {
                                pos: item.widgetSurface.pos(),
                                size: item.widgetSurface.size()
                            };
                            context.widgetAttributes.forEach(function (attr) {
                                if (item.widget[attr]) {
                                    state[currDashboardID][item.getQualifiedID()][attr] = item.widget[attr]();
                                } else if (item.widgetSurface[attr]) {
                                    state[currDashboardID][item.getQualifiedID()][attr] = item.widgetSurface[attr]();
                                }
                            });
                        }
                    }
                }
            });
        }
        localStorage.setItem("Graph_" + this.calcHash(), JSON.stringify(state));
    };

    Graph.prototype.load = function () {
        var stateJSON = localStorage.getItem("Graph_" + this.calcHash());
        if (stateJSON) {
            var state = JSON.parse(stateJSON);
            var context = this;
            var currDashboard = "";
            var changed = false;
            var dataChanged = false;

            if (state.zoom) {
                this.setZoom(state.zoom.translation, state.zoom.scale);
                changed = true;
            }

            for (var key in this._dashboards) {
                var currDashboard = this._dashboards[key].dashboard;
                var currDashboardID = currDashboard.getQualifiedID();
                currDashboard.accept({
                    visit: function (item) {
                        if (item instanceof HipieDDL.Visualization) {
                            if (state && state[currDashboardID][item.getQualifiedID()]) {
                                item.widgetSurface
                                    .pos(state[currDashboardID][item.getQualifiedID()].pos)
                                    .size(state[currDashboardID][item.getQualifiedID()].size)
                                ;
                                context.widgetAttributes.forEach(function (attr) {
                                    if (item.widget[attr] && state[currDashboardID][item.getQualifiedID()][attr]) {
                                        item.widget[attr](state[currDashboardID][item.getQualifiedID()][attr]);
                                        if (attr === "data") {
                                            dataChanged = true;
                                        }
                                    } else if (item.widgetSurface[attr] && state[currDashboardID][item.getQualifiedID()][attr]) {
                                        item.widgetSurface[attr](state[currDashboardID][item.getQualifiedID()][attr]);
                                    };
                                });
                                changed = true;
                            }
                        }
                    }
                });
            }
            if (changed) {
                this.layout("");
                GraphWidget.prototype.render.call(this);
            }
        }
        return {changed: changed, dataChanged: dataChanged};
    }

    return {
        createSingle: function (url, proxyMappings, visualizeRoxie, callback) {
            var marshaller = new HipieDDL.Marshaller().proxyMappings(proxyMappings);
            function postParse() {
                var dashboards = createGraphData(marshaller, visualizeRoxie);
                var graph = new Graph()
                    .dashboards(dashboards)
                ;
                callback(graph);
            }
            if (url[0] === "[" || url[0] === "{") {
                marshaller.parse(url, function () {
                    postParse();
                });
            } else {
                marshaller.url(url, function () {
                    postParse();
                });
            }
        },
        create: function (url, proxyMappings, visualizeRoxie, callback) {
            var marshaller = new HipieDDL.Marshaller().proxyMappings(proxyMappings);
            function postParse() {
                var dashboards = createGraphData(marshaller, visualizeRoxie);
                var graphs = [];
                for (var key in dashboards) {
                    var graph = new Graph()
                        .dashboards([dashboards[key]])
                    ;
                    graphs.push(graph);
                }
                callback(graphs, JSON.stringify(marshaller._jsonParsed, undefined, 2));
            }
            if (url[0] === "[" || url[0] === "{") {
                marshaller.parse(url, function () {
                    postParse();
                });
            } else {
                marshaller.url(url, function () {
                    postParse();
                });
            }
        }

    };
}));
