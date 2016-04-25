"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/TextBox", "../common/Surface", "../common/ResizeSurface", "../chart/MultiChartSurface", "../common/Palette", "../graph/Graph", "../graph/Vertex", "../graph/Edge", "./HipieDDL"], factory);
    } else {
        root.marshaller_Graph = factory(root.d3, root.common_SVGWidget, root.common_TextBox, root.common_Surface, root.common_ResizeSurface, root.chart_MultiChartSurface, root.common_Palette, root.graph_Graph, root.graph_Vertex, root.graph_Edge, root.marshaller_HipieDDL);
    }
}(this, function (d3, SVGWidget, TextBox, Surface, ResizeSurface, MultiChartSurface, Palette, GraphWidget, Vertex, Edge, HipieDDL) {
    function createGraphData(marshaller, databomb, visualizeRoxie) {
        if (databomb instanceof Object) {
        } else if (databomb){
            databomb = JSON.parse(databomb);
        }
        var curr = null;
        var dashboards = {};
        var vertexMap = {};
        var edges = [];
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        vertexMap: vertexMap,
                        edges: edges
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
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
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from, item.id);
                    }
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
                                .title(item.title)
                                .content(item.widget)
                            ;
                        }
                        if (newSurface) {
                            item.widgetSurface = newSurface;
                            curr.vertexMap[item.getQualifiedID()] = newSurface;

                            switch (item.type) {
                                case "2DCHART":
                                case "PIE":
                                case "BUBBLE":
                                case "BAR":
                                case "WORD_CLOUD":
                                    newSurface.menu(item.widget._2DChartTypes.concat(item.widget._NDChartTypes.concat(item.widget._anyChartTypes)).map(function (item) { return item.display; }).sort());
                                    newSurface._menu.click = function (d) {
                                        item.widget
                                            .chartType(d)
                                            .render()
                                        ;
                                    };
                                    break;
                                case "LINE":
                                    newSurface.menu(item.widget._NDChartTypes.concat(item.widget._anyChartTypes).map(function (item) { return item.display; }).sort());
                                    newSurface._menu.click = function (d) {
                                        item.widget
                                            .chartType(d)
                                            .render()
                                        ;
                                    };
                                    break;
                                case "CHORO":
                                    newSurface._menu
                                        .data(Palette.rainbow())
                                    ;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .paletteID(d)
                                            .render(d)
                                        ;
                                    };
                                    break;
                                case "GRAPH":
                                    newSurface._menu
                                        .data(["Circle", "ForceDirected", "ForceDirected2", "Hierarchy"])
                                    ;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .layout(d)
                                        ;
                                    };
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
        }

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

                    item.events.getUpdates().forEach(function (updates) {
                        addEdge(curr, item.getQualifiedID(), updates.visualization.getQualifiedID(), undefined, "arrowHead", "on " + updates.eventID);
                    });
                }
            }
        });
        return dashboards;
    }

    var PERSIST_VER = 2;
    function Graph() {
        GraphWidget.call(this);

        this._design_mode = false;
        this._dashboards = [];
        this.graphAttributes = ["snapToGrid", "showEdges"];
        this.widgetAttributes = ["layout", "chartType", "palette", "title", "columns", "data"];
    }
    Graph.prototype = Object.create(GraphWidget.prototype);
    Graph.prototype.constructor = Graph;
    Graph.prototype._class += " marshaller_Graph";

    Graph.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:["Private"]});
    Graph.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:["Private"]});
    Graph.prototype.publish("visualizeRoxie", false, "boolean", "Show Roxie Data Sources",null,{tags:["Private"]});
    Graph.prototype.publish("proxyMappings", {}, "object", "Proxy Mappings",null,{tags:["Private"]});

    Graph.prototype.design_mode = function (_) {
        if (!arguments.length) return this._design_mode;
        this._design_mode = _;
        this
            .showEdges(this._designMode)
            .snapToGrid(this._designMode ? 12 : 0)
            .allowDragging(this._designMode)
        ;
        if (this.data().vertices) {
            this.data().vertices.forEach(function (row) {
                row.show_title(this._design_mode)
                    .render()
                ;
            }, this);
        }
        return this;
    };

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

    Graph.prototype.renderDashboards = function (restorePersist) {
        this.data({ vertices: [], edges: []});
        var vertices = [];
        var edges = [];
        for (var key in this._dashboards) {
            for (var vm_key in this._dashboards[key].vertexMap) {
                vertices.push(this._dashboards[key].vertexMap[vm_key]);
            }
            edges = edges.concat(this._dashboards[key].edges);
        }
        this.data({ vertices: vertices, edges: edges });
        var loadResult = restorePersist ? this.load() : { changed: false, dataChanged: false };
        if (loadResult.changed) {
            this.layout("");
        }
        return this;
    };

    Graph.prototype.fetchData = function () {
        for (var dashKey in this._dashboards) {
            var dashboard = this._dashboards[dashKey].dashboard;
            for (var key in dashboard.datasources) {
                dashboard.datasources[key].fetchData({}, true);
            }
        }
        return this;
    };

    Graph.prototype.checksum = function (s) {
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
        var hash = PERSIST_VER;
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
    };

    Graph.prototype.clear = function () {
        localStorage.setItem("Graph_" + this.calcHash(), "");
    };

    Graph.prototype.serialize = function (graphAttributes, widgetAttributes) {
        graphAttributes = graphAttributes || [];
        widgetAttributes = widgetAttributes || [];

        var state = {};
        state["zoom"] = {
            translation: this.zoom.translate(),
            scale: this.zoom.scale()
        };
        graphAttributes.forEach(function (attr) {
            if (this[attr]) {
                state[attr] = this[attr]();
            }
        }, this);
        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            var currDashboardID = currDashboard.getQualifiedID();
            state[currDashboardID] = {};
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization) {
                        if (item.widgetSurface) {
                            var vizState = {
                                pos: item.widgetSurface.pos(),
                                size: item.widgetSurface.size()
                            };
                            widgetAttributes.forEach(function (attr) {
                                if (item.widget[attr]) {
                                    vizState[attr] = item.widget[attr]();
                                } else if (item.widgetSurface[attr]) {
                                    vizState[attr] = item.widgetSurface[attr]();
                                }
                            });
                            state[currDashboardID][item.getQualifiedID()] = vizState;
                        }
                    }
                }
            });
        }
        return JSON.stringify(state);
    };

    Graph.prototype.save = function () {
        localStorage.setItem("Graph_" + this.calcHash(), this.serialize(this.graphAttributes, this.widgetAttributes));
    };

    Graph.prototype.deserialize = function (state, graphAttributes, widgetAttributes) {
        graphAttributes = graphAttributes || [];
        widgetAttributes = widgetAttributes || [];

        var changed = false;
        var dataChanged = false;

        graphAttributes.forEach(function (attr) {
            if (this[attr] && state[attr] !== undefined) {
                this[attr](state[attr]);
            }
        }, this);
        if (state.zoom) {
            this.setZoom(state.zoom.translation, state.zoom.scale);
            changed = true;
        }

        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            var currDashboardID = currDashboard.getQualifiedID();
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization && state[currDashboardID] && state[currDashboardID][item.getQualifiedID()]) {
                        var vizState = state[currDashboardID][item.getQualifiedID()];
                        item.widgetSurface
                            .pos(vizState.pos)
                            .size(vizState.size)
                        ;
                        changed = true;
                        widgetAttributes.forEach(function (attr) {
                            if (item.widget[attr] && vizState[attr] !== undefined) {
                                item.widget[attr](vizState[attr]);
                                if (attr === "data") {
                                    dataChanged = true;
                                }
                            } else if (item.widgetSurface[attr] && vizState[attr]) {
                                item.widgetSurface[attr](vizState[attr]);
                            }
                        });
                    }
                }
            });
        }
        return { changed: changed, dataChanged: dataChanged };
    };

    Graph.prototype.load = function () {
        var retVal = { changed: false, dataChanged: false };
        var stateJSON = localStorage.getItem("Graph_" + this.calcHash());
        if (stateJSON) {
            retVal = this.deserialize(JSON.parse(stateJSON), this.graphAttributes, this.widgetAttributes);
        }
        return retVal;
    };

    Graph.prototype.enter = function (domNode, element) {
        GraphWidget.prototype.enter.apply(this, arguments);
        element.classed("graph_Graph", true);
    };

    Graph.prototype.update = function (domNode, element) {
        GraphWidget.prototype.update.apply(this, arguments);
    };

    Graph.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb && this._prev_visualizeRoxie === this.visualizeRoxie())) {
            return GraphWidget.prototype.render.apply(this, arguments);
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();
        this._prev_visualizeRoxie = this.visualizeRoxie();

        var context = this;
        var marshaller = new HipieDDL.Marshaller()
            .proxyMappings(this.proxyMappings())
            .on("commsError", function (source, error) {
                context.commsError(source, error);
            })
        ;

        //  Parse DDL  ---
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            marshaller.parse(this.ddlUrl(), function () {
                postParse();
            });
        } else {
            marshaller.url(this.ddlUrl(), function () {
                postParse();
            });
        }
        function postParse() {
            var dashboards = createGraphData(marshaller, context.databomb(), context.visualizeRoxie());
            context.dashboards(dashboards);
            context
                .applyScaleOnLayout(true)
                .layout("Hierarchy")
                .renderDashboards(true)
            ;
            GraphWidget.prototype.render.call(context, function (widget) {
                context.fetchData();
                var timeoutCounter = 0;
                var intervalHandler = setInterval(function () {
                    if (marshaller.commsDataLoaded() || ++timeoutCounter > 120) {
                        clearInterval(intervalHandler);
                        if (callback) {
                            callback(widget);
                        }
                    }
                }, 500);
            });
        }
        return this;
    };

    Graph.prototype.commsError = function (source, error) {
        alert("Comms Error:\n" + source + "\n" + error);
    };

    return Graph;
}));
