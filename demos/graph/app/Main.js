"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/layout/Surface", "src/layout/Tabbed", "src/layout/Grid", "src/other/Comms", "src/graph/Graph", "src/graph/Edge", "src/graph/Vertex", "src/other/Table", "src/chart/Column", "src/other/Persist"], factory);
    }
}(this, function (Surface, Tabbed, Grid, Comms, Graph, Edge, Vertex, Table, Column, Persist) {
    function Main(target) {
        Grid.call(this);

        this.vertices = [];
        this.vertexMap = {};
        this.edges = [];
        this.edgeMap = {};
        this.claimMap = {};

        var context = this;

        this.claimsChart = new Column()
            .columns(["Date", "Amount"])
            .selectionMode(true)
            .xAxisType("time")
            .xAxisTypeTimePattern("%Y-%m-%d %H:%M:%S")
            .yAxisType("none")
        ;
        this.claimsChart.selection = function (selected) {
            var selectionMap = {};
            var vertexMap = {};
            var edgeMap = {};
            var selection = selected.map(function (row) {
                var vertex = row[2];
                selectionMap[vertex.id()] = vertex;
                vertexMap[vertex.id()] = vertex;
                var tmp = context.graph.getNeighborMap(vertex);
                for (var key in tmp.vertices) {
                    vertexMap[key] = tmp.vertices[key];
                }
                for (var ekey in tmp.edges) {
                    edgeMap[ekey] = tmp.edges[ekey];
                }
                return vertex;
            });

            context.graph
                .selection(selection)
                .highlightVerticies(vertexMap)
                .highlightEdges(edgeMap)
                .render()
            ;
            context.graph.graph_selection(selection);
        }

        this.graph = new Graph()
            .layout("ForceDirected")
            .hierarchyRankDirection("TB")
            .hierarchyNodeSeparation(20)
            .hierarchyRankSeparation(10)
            .applyScaleOnLayout(false)
            .highlightOnMouseOverVertex(true)
        ;
        this.graph.vertex_dblclick = function (d) {
            d3.event.stopPropagation();
            context._query(d._id, d.element());
        };
        this.graph.graph_selection = function (selection) {
            context.populateTableV(context.selectionTable, selection);
            context.allTable.selection(selection.map(function (vertex) {
                return vertex.__allTableRowIdx;
            })).render();
            context.claimsTable.selection(selection.map(function (vertex) {
                return vertex.__claimsTableRowIdx;
            })).render();
        };
        this.graph.vertex_click = function (d) {
            this.graph_selection(this.selection());
        };
        this.graph.edge_click = function (d) {
            var source = d.sourceVertex();
            var target = d.targetVertex();
            alert("Edge:  " + source.id() + "->" + target.id());
        };

        this.selectionTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;

        //  Bottom Tabs/Tables  ---
        function attachClickEvent(table) {
            table.click = function (row, col) {
                var selection = this.selection().map(function (item) {
                    return item[item.length - 1];
                });
                context.graph
                    .selection(selection)
                    .render()
                ;
                context.populateTableV(context.selectionTable, selection);
            };
        }

        this._allTableFilter = "all";
        this.allTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;
        attachClickEvent(this.allTable);
        this.claimsTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;
        attachClickEvent(this.claimsTable);
        this.peopleTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;
        attachClickEvent(this.peopleTable);
        this.policiesTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;
        attachClickEvent(this.policiesTable);
        this.vehiclesTable = new Table()
            .fixedHeader(true)
            .fixedColumn(true)
        ;
        attachClickEvent(this.vehiclesTable);

        this.vertexTabs = new Tabbed()
            .surfacePadding(10)
            .addTab(this.allTable, "All")
            .addTab(this.claimsTable, "Claims")
            .addTab(this.peopleTable, "People")
            .addTab(this.policiesTable, "Policies")
            .addTab(this.vehiclesTable, "Vehicles")
        ;

        //  Main Grid  ---
        this
            .surfacePadding(0)
            .setContent(0, 0, this.claimsChart, "", 1, 4)
            .setContent(1, 0, this.graph, "", 6, 4)
            .setContent(0, 4, this.selectionTable, "Selection", 7, 1)
            .setContent(7, 0, this.vertexTabs, "", 3, 5)
        ;
    }
    Main.prototype = Object.create(Grid.prototype);
    Main.prototype._class += " app_Main";

    Main.prototype.publish("url", "", "string", "Roxie URL");

    Main.prototype.showSelection = function (_) {
        if (_) {
            this.getWidgetCell(this.claimsChart.id()).gridColSpan(4 * this.cellDensity());
            this.getWidgetCell(this.graph.id()).gridColSpan(4 * this.cellDensity());
            this
                .setContent(0, 4, this.selectionTable, "Selection", 7, 1)
                .render()
            ;
        } else {
            this.getWidgetCell(this.claimsChart.id()).gridColSpan(5 * this.cellDensity());
            this.getWidgetCell(this.graph.id()).gridColSpan(5 * this.cellDensity());
            this
                .setContent(0, 4, null)
                .render()
            ;
        }
        return this;
    };

    Main.prototype.filterEntities = function (filter) {
        this._allTableFilter = filter;
        this.populateTableH(this.allTable, this.vertices);
    };

    Main.prototype.getVertex = function (id, faChar, label, data) {
        var retVal = this.vertexMap[id];
        if (!retVal) {
            retVal = new Vertex()
                .id(id)
                .text(label)
                .faChar(faChar)
                .data(data)
            ;
            this.vertexMap[id] = retVal;
            this.vertices.push(retVal);
        }
        return retVal;
    };

    Main.prototype.getEdge = function (source, target, label) {
        var id = source._id + "_" + target._id;
        var retVal = this.edgeMap[id];
        if (!retVal) {
            retVal = new Edge()
                .id(id)
                .sourceVertex(source)
                .targetVertex(target)
                .sourceMarker("circleFoot")
                .targetMarker("arrowHead")
                .text(label || "")
            ;
            this.edgeMap[id] = retVal;
            this.edges.push(retVal);
        } else {
            if (retVal.text().indexOf(label) < 0) {
                retVal += " " + label;
            }
        }
        return retVal;
    };

    Main.prototype.populateTableV = function (table, selection) {
        var columns = ["Property"];
        var propIdx = {};
        var data = [];
        selection.forEach(function (item, idx) {
            columns.push(item.text());
            var props = item.data();
            for (var key in props) {
                var row = null;
                if (propIdx[key] === undefined) {
                    propIdx[key] = data.length;
                    row = [key];
                    row.length = selection.length + 1;
                    data.push(row);
                } else {
                    row = data[propIdx[key]];
                }
                row[idx + 1] = props[key];
            }
        });
        table
            .columns(columns)
            .data(data)
            .render()
        ;
    };

    Main.prototype.populateTableH = function (table, selection, filter) {
        filter = filter || this._allTableFilter;
        var columns = ["Entity"];
        var entityIdx = {};
        var propIdx = {};
        var data = [];
        var filteredSelection = selection.filter(function (vertex) {
            switch (filter) {
                case "claims":
                    return vertex.id().indexOf("c_") === 0;
                case "people":
                    return vertex.id().indexOf("p_") === 0;
                case "vehicles":
                    return vertex.id().indexOf("v_") === 0;
                case "policies":
                    return vertex.id().indexOf("pol_") === 0;
                default:
                    return true;
            }
        }, this);
        filteredSelection.forEach(function (item, idx) {
            var row = [item.text()];
            var props = item.data();
            for (var key in props) {
                if (propIdx[key] === undefined) {
                    propIdx[key] = columns.length;
                    columns.push(key);
                }
                row[propIdx[key]] = props[key];
            }
            data.push(row);
        });
        data.forEach(function (row, idx) {
            row.length = columns.length + 1;
            row[columns.length] = filteredSelection[idx];
            if (table === this.allTable) {
                selection[idx].__allTableRowIdx = row;
            } else if (table === this.claimsTable) {
                selection[idx].__claimsTableRowIdx = row;
            }
        }, this);
        table
            .columns(columns)
            .data(data)
            .render()
        ;
    };

    Main.prototype.queryClaim = function (id) {
        this._query("c_" + id);
    };
    Main.prototype.queryPolicy = function (id) {
        this._query("pol_" + id);
    };
    Main.prototype.queryVehicle = function (id) {
        this._query("v_" + id);
    };
    Main.prototype.queryPerson = function (id) {
        this._query("p_" + id);
    };
    Main.prototype._query = function (id, element) {
        if (element) {
            element.classed("expanding", true);
        }
        var request = null;
        var catId = id.split("_");
        switch (catId[0]) {
            case "c":
                request = { claim_ids: catId[1] };
                break;
            case "p":
                request = { person_ids: catId[1] };
                break;
            case "pol":
                break;
            case "v":
                request = { vehicle_ids: catId[1] };
                break;
        }
        if (!request) {
            if (element) {
                element.classed("expanding", false);
                element.classed("expanded", true);
            }
        } else {
            var service = Comms.createESPConnection(this.url());
            var context = this;
            request.group_ids = 10;
            request.group_type_id = 21;
            service.send(request, function (response) {
                if (element) {
                    element.classed("expanding", false);
                    element.classed("expanded", true);
                }
                response.claim_list.forEach(function (item, i) {
                    var claim = context.getVertex("c_" + item.report_no, "\uf0d6", item.report_no, item);
                    context.claimMap[item.report_no] = {
                        date: item.accident_time,
                        amount: item.claim_amount,
                        claim: claim
                    };
                    var annotations = [];
                    if (item.road_accident && item.road_accident !== "0") {
                        annotations.push({
                            "faChar": "\uf018",
                            "tooltip": "Road Accident",
                            "shape_color_fill": "darkgreen",
                            "image_color_fill": "white"
                        });
                    }
                    if (item.third_vehicle && item.third_vehicle !== "0") {
                        annotations.push({
                            "faChar": "\uf1b9",
                            "tooltip": "Third Vehicle",
                            "shape_color_fill": "navy",
                            "image_color_fill": "white"
                        });
                    }
                    if (item.injury_accident && item.injury_accident !== "0") {
                        annotations.push({
                            "faChar": "\uf067",
                            "tooltip": "Injury Accident",
                            "shape_color_fill": "white",
                            "shape_color_stroke": "red",
                            "image_color_fill": "red"
                        });
                    }
                    claim.annotationIcons(annotations);
                });
                response.policy_list.forEach(function (item, i) {
                    context.getVertex("pol_" + item.car_mark, "\uf0f6", item.car_mark, item);
                });
                response.person_list.forEach(function (item, i) {
                    context.getVertex("p_" + item.person_id, "\uf007", item.person_id, item);
                });
                response.vehicle_list.forEach(function (item, i) {
                    context.getVertex("v_" + item.rack_no, "\uf1b9", item.rack_no, item);
                });
                response.claim_policy.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["c_" + item.report_no], context.vertexMap["pol_" + item.car_mark], "", item);
                });
                response.claim_person.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["c_" + item.report_no], context.vertexMap["p_" + item.person_id], "", item);
                });
                response.claim_vehicle.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["c_" + item.report_no], context.vertexMap["v_" + item.rack_no], "", item);
                });
                response.person_policy.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["pol_" + item.car_mark], context.vertexMap["p_" + item.person_id], "", item);
                });
                response.person_person.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["p_" + item.lhs_person], context.vertexMap["p_" + item.rhs_person], "", item);
                });
                response.person_vehicle.forEach(function (item, i) {
                    context.getEdge(context.vertexMap["p_" + item.person_id], context.vertexMap["v_" + item.rack_no], "", item);
                });

                context.graph
                    .data({ vertices: context.vertices, edges: context.edges, merge: true })
                    .render()
                    .layout(context.graph.layout(), transitionDuration)
                ;
                var claimsData = [];
                for (var key in context.claimMap) {
                    claimsData.push([context.claimMap[key].date, context.claimMap[key].amount, context.claimMap[key].claim]);
                }
                context.claimsChart
                    .data(claimsData)
                    .render()
                ;
                context.populateTableH(context.allTable, context.vertices);
                context.populateTableH(context.claimsTable, context.vertices, "claims");
                context.populateTableH(context.policiesTable, context.vertices, "policies");
                context.populateTableH(context.peopleTable, context.vertices, "people");
                context.populateTableH(context.vehiclesTable, context.vertices, "vehicles");
            });
        }
    };

    Main.prototype.render = function() {
        var retVal = Grid.prototype.render.apply(this, arguments);
        if (this._prevUrl !== this.url()) {
            this._prevUrl = this.url();
        }
        return retVal;
    }

    //  Serialization  ---
    Main.prototype.serializeToObject = function () {
        var graphData = this.graph.data();
        return {
            app: {
                vertices: this.vertices.map(function (row) { return row; }),
                edges: this.edges.map(function (row) { return row; })
            },
            graph: {
                vertices: graphData.vertices.map(function (vertex) { return vertex; }),
                edges: graphData.edges.map(function (edge) { return edge; }),
                merge: false
            },
            selectionTable: this.selectionTable.data(),
            allTable: this.allTable.data(),
            claimsChart: this.claimsChart.data()
        };
    };

    Main.prototype.deserializefromObject = function (obj) {
        this.vertices = obj.app.vertices;
        this.vertexMap = {};
        this.vertices.forEach(function (vertex) {
            this.vertexMap[vertex.id()] = vertex;
        }, this);
        this.edges = obj.app.edges;
        this.edgeMap = {};
        this.edges.forEach(function (edge) {
            this.edgeMap[edge.id()] = edge;
        }, this);
        this.graph.data(obj.graph).render();
        this.selectionTable.data(obj.selectionTable).render();
        this.allTable.data(obj.allTable).render();
        this.claimsChart.data(obj.claimsChart).render();
    };

    return Main;
}));
