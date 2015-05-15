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
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        vertexMap: {},
                        edges: []
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
                        item.dataSource.comms.databombOutput(item.from);
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
                                    newSurface.menu(item.widget._2dChartTypes.concat(item.widget._anyChartTypes).map(function (item) { return item.display; }).sort());
                                    newSurface._menu.click = function (d) {
                                        item.widget
                                            .chartType(d)
                                            .render()
                                        ;
                                    };
                                    break;
                                case "LINE":
                                    newSurface.menu(item.widget._multiChartTypes.concat(item.widget._anyChartTypes).map(function (item) { return item.display; }).sort());
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

                    item.onSelect.getUpdatesVisualizations().forEach(function (vizItem) {
                        addEdge(curr, item.getQualifiedID(), vizItem.getQualifiedID(), undefined, "arrowHead", "on Select");
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
    Graph.prototype._class += " marshaller_Graph";

    Graph.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:['Private']});
    Graph.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:['Private']});
    Graph.prototype.publish("visualizeRoxie", false, "boolean", "Show Roxie Data Sources",null,{tags:['Private']});
    Graph.prototype.publish("proxyMappings", [], "array", "Proxy Mappings",null,{tags:['Private']});

    Graph.prototype.testData = function () {
        //this.ddlUrl("http://10.173.147.1:8002/WsEcl/submit/query/roxie/drealeed_testaddressclean.ins002_service/json");
        this.ddlUrl('[ { "visualizations": [ { "color": "Red_Yellow_Blue", "id": "statesummary", "source": { "output": "View_statesummary", "mappings": { "weight": "Cnt", "state": "clean_st" }, "id": "statesum" }, "type": "CHORO", "title": "Count by State", "events": { "click": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "statedetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_statedetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "State Error Details" }, { "color": "Red_Yellow_Blue", "id": "errorsummary", "source": { "output": "View_errorsummary", "mappings": { "weight": "Cnt", "label": "clean_error" }, "id": "errorsum" }, "type": "PIE", "title": "Count by error--aggregated client side", "events": { "click": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "errordetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_errordetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Error Code Details" }, { "id": "alldetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_alldetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Details updated from both count by state and count by error" } ], "datasources": [ { "outputs": [ { "from": "View_statesummary", "id": "View_statesummary", "notify": [ "statesummary" ] } ], "databomb": true, "id": "statesum" }, { "outputs": [ { "from": "View_errorsummary", "id": "View_errorsummary", "notify": [ "errorsummary" ] } ], "databomb": true, "id": "errorsum" }, { "filter": [ "clean_st", "clean_error" ], "outputs": [ { "from": "View_statedetails", "id": "View_statedetails", "notify": [ "statedetails" ] }, { "from": "View_errordetails", "id": "View_errordetails", "notify": [ "errordetails" ] }, { "from": "View_alldetails", "id": "View_alldetails", "notify": [ "alldetails" ] } ], "databomb": true, "id": "details" } ], "enable": "true", "id": "Ins001_DatabombDashboard", "label": "DatabombDashboard", "title": "Databomb Dashboard", "primary": false } ]');
        this.databomb('{"errorsum":[{"clean_error":"E212","Cnt":"1"},{"clean_error":"E214","Cnt":"3"},{"clean_error":"E216","Cnt":"1"},{"clean_error":"E412","Cnt":"204"},{"clean_error":"E421","Cnt":"174"},{"clean_error":"E422","Cnt":"43"},{"clean_error":"E423","Cnt":"6"},{"clean_error":"E427","Cnt":"24"},{"clean_error":"E430","Cnt":"1"},{"clean_error":"E505","Cnt":"2"},{"clean_error":"E600","Cnt":"7"},{"clean_error":"S400","Cnt":"3"},{"clean_error":"S800","Cnt":"19370"},{"clean_error":"S810","Cnt":"10"},{"clean_error":"S820","Cnt":"49"},{"clean_error":"S840","Cnt":"2"},{"clean_error":"S860","Cnt":"3"},{"clean_error":"S880","Cnt":"26"},{"clean_error":"S890","Cnt":"9"},{"clean_error":"S891","Cnt":"1"},{"clean_error":"S8A0","Cnt":"3"},{"clean_error":"S8B0","Cnt":"2"},{"clean_error":"S8C0","Cnt":"2"},{"clean_error":"S900","Cnt":"22"},{"clean_error":"S910","Cnt":"4"},{"clean_error":"S920","Cnt":"2"},{"clean_error":"S980","Cnt":"1"},{"clean_error":"SA00","Cnt":"21"},{"clean_error":"SB00","Cnt":"3"},{"clean_error":"SC10","Cnt":"1"}],"statesum":[{"clean_st":"AK","Cnt":"57"},{"clean_st":"AL","Cnt":"225"},{"clean_st":"AR","Cnt":"140"},{"clean_st":"AZ","Cnt":"342"},{"clean_st":"CA","Cnt":"2695"},{"clean_st":"CO","Cnt":"459"},{"clean_st":"CT","Cnt":"246"},{"clean_st":"DC","Cnt":"91"},{"clean_st":"DE","Cnt":"33"},{"clean_st":"FL","Cnt":"1924"},{"clean_st":"GA","Cnt":"683"},{"clean_st":"GU","Cnt":"1"},{"clean_st":"HI","Cnt":"54"},{"clean_st":"IA","Cnt":"163"},{"clean_st":"ID","Cnt":"139"},{"clean_st":"IL","Cnt":"718"},{"clean_st":"IN","Cnt":"318"},{"clean_st":"KS","Cnt":"155"},{"clean_st":"KY","Cnt":"211"},{"clean_st":"LA","Cnt":"279"},{"clean_st":"MA","Cnt":"450"},{"clean_st":"MD","Cnt":"459"},{"clean_st":"ME","Cnt":"57"},{"clean_st":"MI","Cnt":"554"},{"clean_st":"MN","Cnt":"419"},{"clean_st":"MO","Cnt":"297"},{"clean_st":"MS","Cnt":"201"},{"clean_st":"MT","Cnt":"73"},{"clean_st":"NC","Cnt":"433"},{"clean_st":"ND","Cnt":"35"},{"clean_st":"NE","Cnt":"108"},{"clean_st":"NH","Cnt":"97"},{"clean_st":"NJ","Cnt":"505"},{"clean_st":"NM","Cnt":"92"},{"clean_st":"NV","Cnt":"142"},{"clean_st":"NY","Cnt":"1237"},{"clean_st":"OH","Cnt":"652"},{"clean_st":"OK","Cnt":"190"},{"clean_st":"OR","Cnt":"316"},{"clean_st":"PA","Cnt":"678"},{"clean_st":"PR","Cnt":"9"},{"clean_st":"RI","Cnt":"77"},{"clean_st":"SC","Cnt":"209"},{"clean_st":"SD","Cnt":"46"},{"clean_st":"TN","Cnt":"378"},{"clean_st":"TX","Cnt":"1794"},{"clean_st":"UT","Cnt":"189"},{"clean_st":"VA","Cnt":"473"},{"clean_st":"VI","Cnt":"3"},{"clean_st":"VT","Cnt":"43"},{"clean_st":"WA","Cnt":"456"},{"clean_st":"WI","Cnt":"302"},{"clean_st":"WV","Cnt":"61"},{"clean_st":"WY","Cnt":"29"}],"details":[{"clean_st":"LA","clean_error":"S900","Cnt":"1"},{"clean_st":"WA","clean_error":"E422","Cnt":"3"},{"clean_st":"SC","clean_error":"S800","Cnt":"203"},{"clean_st":"NM","clean_error":"E427","Cnt":"3"},{"clean_st":"WY","clean_error":"S820","Cnt":"1"},{"clean_st":"KS","clean_error":"SC10","Cnt":"1"},{"clean_st":"WA","clean_error":"E423","Cnt":"1"},{"clean_st":"PR","clean_error":"S800","Cnt":"8"},{"clean_st":"NE","clean_error":"E412","Cnt":"2"},{"clean_st":"NH","clean_error":"S800","Cnt":"93"},{"clean_st":"OR","clean_error":"S840","Cnt":"1"},{"clean_st":"TX","clean_error":"E421","Cnt":"13"},{"clean_st":"NH","clean_error":"E412","Cnt":"1"},{"clean_st":"FL","clean_error":"SA00","Cnt":"4"},{"clean_st":"GA","clean_error":"E427","Cnt":"2"},{"clean_st":"AZ","clean_error":"S900","Cnt":"2"},{"clean_st":"SD","clean_error":"E412","Cnt":"1"},{"clean_st":"NC","clean_error":"E421","Cnt":"2"},{"clean_st":"MO","clean_error":"S880","Cnt":"1"},{"clean_st":"MI","clean_error":"SB00","Cnt":"1"},{"clean_st":"IL","clean_error":"S920","Cnt":"1"},{"clean_st":"WI","clean_error":"E421","Cnt":"7"},{"clean_st":"LA","clean_error":"S800","Cnt":"270"},{"clean_st":"GA","clean_error":"E412","Cnt":"8"},{"clean_st":"CA","clean_error":"E421","Cnt":"20"},{"clean_st":"KY","clean_error":"E421","Cnt":"1"},{"clean_st":"MI","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"S800","Cnt":"285"},{"clean_st":"WI","clean_error":"E422","Cnt":"2"},{"clean_st":"PA","clean_error":"SA00","Cnt":"1"},{"clean_st":"CA","clean_error":"E422","Cnt":"2"},{"clean_st":"FL","clean_error":"E422","Cnt":"5"},{"clean_st":"WI","clean_error":"S800","Cnt":"262"},{"clean_st":"CO","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"S900","Cnt":"1"},{"clean_st":"TX","clean_error":"SA00","Cnt":"6"},{"clean_st":"WA","clean_error":"E412","Cnt":"1"},{"clean_st":"CA","clean_error":"E423","Cnt":"1"},{"clean_st":"CO","clean_error":"S900","Cnt":"2"},{"clean_st":"NC","clean_error":"E422","Cnt":"3"},{"clean_st":"","clean_error":"E214","Cnt":"2"},{"clean_st":"RI","clean_error":"S800","Cnt":"77"},{"clean_st":"MN","clean_error":"S840","Cnt":"1"},{"clean_st":"TN","clean_error":"E422","Cnt":"2"},{"clean_st":"TX","clean_error":"E505","Cnt":"1"},{"clean_st":"FL","clean_error":"E600","Cnt":"1"},{"clean_st":"MO","clean_error":"S820","Cnt":"1"},{"clean_st":"WV","clean_error":"S810","Cnt":"1"},{"clean_st":"MN","clean_error":"E412","Cnt":"5"},{"clean_st":"ND","clean_error":"S800","Cnt":"29"},{"clean_st":"WI","clean_error":"S820","Cnt":"29"},{"clean_st":"TN","clean_error":"E423","Cnt":"1"},{"clean_st":"IA","clean_error":"E412","Cnt":"5"},{"clean_st":"NE","clean_error":"S800","Cnt":"105"},{"clean_st":"GA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S900","Cnt":"1"},{"clean_st":"FL","clean_error":"E421","Cnt":"12"},{"clean_st":"AK","clean_error":"E412","Cnt":"1"},{"clean_st":"","clean_error":"E212","Cnt":"1"},{"clean_st":"TX","clean_error":"E427","Cnt":"1"},{"clean_st":"CO","clean_error":"S880","Cnt":"1"},{"clean_st":"FL","clean_error":"S800","Cnt":"1885"},{"clean_st":"WV","clean_error":"E412","Cnt":"3"},{"clean_st":"NV","clean_error":"S800","Cnt":"138"},{"clean_st":"WI","clean_error":"S900","Cnt":"1"},{"clean_st":"NY","clean_error":"S910","Cnt":"1"},{"clean_st":"TX","clean_error":"E412","Cnt":"14"},{"clean_st":"TN","clean_error":"E421","Cnt":"5"},{"clean_st":"AL","clean_error":"S800","Cnt":"219"},{"clean_st":"NC","clean_error":"S800","Cnt":"422"},{"clean_st":"OH","clean_error":"S880","Cnt":"1"},{"clean_st":"ND","clean_error":"E421","Cnt":"1"},{"clean_st":"FL","clean_error":"E427","Cnt":"3"},{"clean_st":"DE","clean_error":"S800","Cnt":"32"},{"clean_st":"AR","clean_error":"E421","Cnt":"3"},{"clean_st":"MN","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"S810","Cnt":"1"},{"clean_st":"ID","clean_error":"E412","Cnt":"6"},{"clean_st":"AK","clean_error":"S800","Cnt":"55"},{"clean_st":"NM","clean_error":"E412","Cnt":"5"},{"clean_st":"OR","clean_error":"E423","Cnt":"1"},{"clean_st":"MS","clean_error":"S800","Cnt":"192"},{"clean_st":"CO","clean_error":"E422","Cnt":"1"},{"clean_st":"AZ","clean_error":"S800","Cnt":"329"},{"clean_st":"ID","clean_error":"S820","Cnt":"4"},{"clean_st":"WY","clean_error":"S810","Cnt":"1"},{"clean_st":"ND","clean_error":"E427","Cnt":"2"},{"clean_st":"PR","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"SB00","Cnt":"1"},{"clean_st":"KS","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S800","Cnt":"541"},{"clean_st":"MA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E421","Cnt":"7"},{"clean_st":"OK","clean_error":"S820","Cnt":"1"},{"clean_st":"LA","clean_error":"E412","Cnt":"3"},{"clean_st":"OR","clean_error":"E421","Cnt":"2"},{"clean_st":"NE","clean_error":"E422","Cnt":"1"},{"clean_st":"MN","clean_error":"E422","Cnt":"1"},{"clean_st":"AR","clean_error":"E422","Cnt":"1"},{"clean_st":"PA","clean_error":"E505","Cnt":"1"},{"clean_st":"MD","clean_error":"S880","Cnt":"2"},{"clean_st":"SC","clean_error":"E421","Cnt":"1"},{"clean_st":"LA","clean_error":"S910","Cnt":"1"},{"clean_st":"UT","clean_error":"SB00","Cnt":"1"},{"clean_st":"CO","clean_error":"E421","Cnt":"3"},{"clean_st":"HI","clean_error":"E421","Cnt":"1"},{"clean_st":"DE","clean_error":"E412","Cnt":"1"},{"clean_st":"ME","clean_error":"S800","Cnt":"54"},{"clean_st":"NY","clean_error":"E412","Cnt":"10"},{"clean_st":"KY","clean_error":"S800","Cnt":"209"},{"clean_st":"OK","clean_error":"S800","Cnt":"180"},{"clean_st":"IN","clean_error":"E412","Cnt":"4"},{"clean_st":"KS","clean_error":"E421","Cnt":"1"},{"clean_st":"GA","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E422","Cnt":"4"},{"clean_st":"SC","clean_error":"E427","Cnt":"2"},{"clean_st":"LA","clean_error":"E421","Cnt":"2"},{"clean_st":"OR","clean_error":"E412","Cnt":"1"},{"clean_st":"CT","clean_error":"E412","Cnt":"6"},{"clean_st":"WA","clean_error":"S800","Cnt":"445"},{"clean_st":"MN","clean_error":"E427","Cnt":"5"},{"clean_st":"FL","clean_error":"E412","Cnt":"7"},{"clean_st":"CA","clean_error":"SA00","Cnt":"1"},{"clean_st":"MT","clean_error":"E412","Cnt":"2"},{"clean_st":"AL","clean_error":"SA00","Cnt":"1"},{"clean_st":"IN","clean_error":"E421","Cnt":"1"},{"clean_st":"CA","clean_error":"S880","Cnt":"4"},{"clean_st":"GU","clean_error":"S800","Cnt":"1"},{"clean_st":"UT","clean_error":"S900","Cnt":"2"},{"clean_st":"CT","clean_error":"S890","Cnt":"1"},{"clean_st":"AK","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"S810","Cnt":"2"},{"clean_st":"ND","clean_error":"E412","Cnt":"2"},{"clean_st":"NJ","clean_error":"E421","Cnt":"2"},{"clean_st":"NM","clean_error":"S800","Cnt":"84"},{"clean_st":"UT","clean_error":"S820","Cnt":"5"},{"clean_st":"VA","clean_error":"S8B0","Cnt":"1"},{"clean_st":"CA","clean_error":"S910","Cnt":"1"},{"clean_st":"VA","clean_error":"E412","Cnt":"3"},{"clean_st":"NJ","clean_error":"E422","Cnt":"1"},{"clean_st":"IN","clean_error":"E422","Cnt":"1"},{"clean_st":"TX","clean_error":"S900","Cnt":"1"},{"clean_st":"WY","clean_error":"E412","Cnt":"4"},{"clean_st":"WV","clean_error":"S800","Cnt":"54"},{"clean_st":"MI","clean_error":"S900","Cnt":"2"},{"clean_st":"NV","clean_error":"E412","Cnt":"3"},{"clean_st":"NY","clean_error":"E427","Cnt":"1"},{"clean_st":"IL","clean_error":"S900","Cnt":"1"},{"clean_st":"IL","clean_error":"E412","Cnt":"13"},{"clean_st":"NJ","clean_error":"SA00","Cnt":"1"},{"clean_st":"WA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"CO","clean_error":"E412","Cnt":"7"},{"clean_st":"DC","clean_error":"E412","Cnt":"1"},{"clean_st":"GA","clean_error":"S800","Cnt":"660"},{"clean_st":"IA","clean_error":"S800","Cnt":"151"},{"clean_st":"WY","clean_error":"S800","Cnt":"23"},{"clean_st":"TN","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"S800","Cnt":"445"},{"clean_st":"PA","clean_error":"E600","Cnt":"1"},{"clean_st":"NY","clean_error":"S8B0","Cnt":"1"},{"clean_st":"NJ","clean_error":"E427","Cnt":"1"},{"clean_st":"TX","clean_error":"S800","Cnt":"1751"},{"clean_st":"CT","clean_error":"E423","Cnt":"1"},{"clean_st":"OH","clean_error":"E412","Cnt":"5"},{"clean_st":"KS","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"E600","Cnt":"1"},{"clean_st":"NJ","clean_error":"E412","Cnt":"5"},{"clean_st":"NY","clean_error":"E422","Cnt":"1"},{"clean_st":"OK","clean_error":"E412","Cnt":"2"},{"clean_st":"MA","clean_error":"E421","Cnt":"1"},{"clean_st":"AR","clean_error":"S820","Cnt":"1"},{"clean_st":"PA","clean_error":"S820","Cnt":"2"},{"clean_st":"MA","clean_error":"S910","Cnt":"1"},{"clean_st":"NY","clean_error":"E421","Cnt":"8"},{"clean_st":"UT","clean_error":"E412","Cnt":"9"},{"clean_st":"NY","clean_error":"S890","Cnt":"2"},{"clean_st":"CO","clean_error":"S800","Cnt":"443"},{"clean_st":"MN","clean_error":"S800","Cnt":"401"},{"clean_st":"FL","clean_error":"E214","Cnt":"1"},{"clean_st":"UT","clean_error":"S880","Cnt":"1"},{"clean_st":"OH","clean_error":"E421","Cnt":"7"},{"clean_st":"IN","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S800","Cnt":"2645"},{"clean_st":"OR","clean_error":"S800","Cnt":"311"},{"clean_st":"WA","clean_error":"S810","Cnt":"1"},{"clean_st":"FL","clean_error":"E216","Cnt":"1"},{"clean_st":"VT","clean_error":"E430","Cnt":"1"},{"clean_st":"NY","clean_error":"S800","Cnt":"1206"},{"clean_st":"IL","clean_error":"S800","Cnt":"696"},{"clean_st":"MS","clean_error":"E412","Cnt":"4"},{"clean_st":"NV","clean_error":"E422","Cnt":"1"},{"clean_st":"NC","clean_error":"SA00","Cnt":"1"},{"clean_st":"MA","clean_error":"S800","Cnt":"441"},{"clean_st":"MI","clean_error":"S880","Cnt":"1"},{"clean_st":"GA","clean_error":"E600","Cnt":"2"},{"clean_st":"TX","clean_error":"S891","Cnt":"1"},{"clean_st":"OH","clean_error":"E422","Cnt":"1"},{"clean_st":"IA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"KS","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S890","Cnt":"3"},{"clean_st":"WI","clean_error":"S880","Cnt":"1"},{"clean_st":"VT","clean_error":"S800","Cnt":"37"},{"clean_st":"FL","clean_error":"S820","Cnt":"1"},{"clean_st":"VA","clean_error":"E421","Cnt":"4"},{"clean_st":"VA","clean_error":"S890","Cnt":"2"},{"clean_st":"PA","clean_error":"S900","Cnt":"1"},{"clean_st":"ME","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"E421","Cnt":"4"},{"clean_st":"IL","clean_error":"E422","Cnt":"2"},{"clean_st":"CT","clean_error":"S800","Cnt":"238"},{"clean_st":"UT","clean_error":"E427","Cnt":"1"},{"clean_st":"MI","clean_error":"E422","Cnt":"1"},{"clean_st":"ND","clean_error":"S880","Cnt":"1"},{"clean_st":"TN","clean_error":"S800","Cnt":"369"},{"clean_st":"IL","clean_error":"E421","Cnt":"3"},{"clean_st":"MO","clean_error":"E422","Cnt":"3"},{"clean_st":"MT","clean_error":"E421","Cnt":"1"},{"clean_st":"VI","clean_error":"E421","Cnt":"2"},{"clean_st":"ID","clean_error":"S800","Cnt":"126"},{"clean_st":"MA","clean_error":"E412","Cnt":"6"},{"clean_st":"MS","clean_error":"S900","Cnt":"1"},{"clean_st":"VA","clean_error":"S800","Cnt":"461"},{"clean_st":"LA","clean_error":"S880","Cnt":"2"},{"clean_st":"SD","clean_error":"S800","Cnt":"43"},{"clean_st":"VT","clean_error":"E412","Cnt":"3"},{"clean_st":"FL","clean_error":"S880","Cnt":"2"},{"clean_st":"NC","clean_error":"S980","Cnt":"1"},{"clean_st":"TX","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"E421","Cnt":"4"},{"clean_st":"HI","clean_error":"S800","Cnt":"53"},{"clean_st":"IA","clean_error":"S920","Cnt":"1"},{"clean_st":"VI","clean_error":"E412","Cnt":"1"},{"clean_st":"OH","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E421","Cnt":"2"},{"clean_st":"MD","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"E412","Cnt":"11"},{"clean_st":"IA","clean_error":"E427","Cnt":"1"},{"clean_st":"FL","clean_error":"S900","Cnt":"2"},{"clean_st":"MS","clean_error":"E421","Cnt":"4"},{"clean_st":"UT","clean_error":"E422","Cnt":"3"},{"clean_st":"NH","clean_error":"E421","Cnt":"3"},{"clean_st":"AL","clean_error":"E427","Cnt":"2"},{"clean_st":"UT","clean_error":"E421","Cnt":"2"},{"clean_st":"VA","clean_error":"SA00","Cnt":"2"},{"clean_st":"SD","clean_error":"E421","Cnt":"2"},{"clean_st":"AR","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S820","Cnt":"1"},{"clean_st":"KY","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"S880","Cnt":"2"},{"clean_st":"MO","clean_error":"E412","Cnt":"3"},{"clean_st":"WV","clean_error":"E422","Cnt":"1"},{"clean_st":"MT","clean_error":"S860","Cnt":"1"},{"clean_st":"OK","clean_error":"E423","Cnt":"1"},{"clean_st":"CA","clean_error":"E412","Cnt":"16"},{"clean_st":"MD","clean_error":"E412","Cnt":"6"},{"clean_st":"NJ","clean_error":"S800","Cnt":"495"},{"clean_st":"NC","clean_error":"E412","Cnt":"4"},{"clean_st":"TX","clean_error":"S860","Cnt":"2"},{"clean_st":"PA","clean_error":"E421","Cnt":"11"},{"clean_st":"IA","clean_error":"E422","Cnt":"1"},{"clean_st":"NY","clean_error":"SA00","Cnt":"2"},{"clean_st":"IL","clean_error":"S8A0","Cnt":"1"},{"clean_st":"GA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"E421","Cnt":"1"},{"clean_st":"IL","clean_error":"S810","Cnt":"1"},{"clean_st":"IA","clean_error":"S880","Cnt":"2"},{"clean_st":"MT","clean_error":"S800","Cnt":"69"},{"clean_st":"VT","clean_error":"E421","Cnt":"2"},{"clean_st":"SC","clean_error":"E412","Cnt":"2"},{"clean_st":"IN","clean_error":"S800","Cnt":"311"},{"clean_st":"UT","clean_error":"S800","Cnt":"165"},{"clean_st":"GA","clean_error":"E421","Cnt":"8"},{"clean_st":"CO","clean_error":"S890","Cnt":"1"},{"clean_st":"OK","clean_error":"E421","Cnt":"3"},{"clean_st":"ID","clean_error":"E421","Cnt":"3"},{"clean_st":"KS","clean_error":"S800","Cnt":"150"},{"clean_st":"SC","clean_error":"S820","Cnt":"1"},{"clean_st":"TX","clean_error":"S880","Cnt":"3"},{"clean_st":"MN","clean_error":"S810","Cnt":"1"},{"clean_st":"OH","clean_error":"S800","Cnt":"637"},{"clean_st":"AR","clean_error":"S800","Cnt":"134"},{"clean_st":"PA","clean_error":"S800","Cnt":"647"},{"clean_st":"IA","clean_error":"E421","Cnt":"1"},{"clean_st":"PA","clean_error":"E422","Cnt":"2"},{"clean_st":"WA","clean_error":"E421","Cnt":"4"},{"clean_st":"DC","clean_error":"S800","Cnt":"90"}]}');
        return this;
    };

    Graph.prototype.design_mode = function (_) {
        if (!arguments.length) return this._design_mode;
        this._design_mode = _;
        this
            .showEdges(this._designMode)
            .snapToGrid(this._designMode ? 12 : 0)
            .allowDragging(this._designMode)
        ;
        if (this._data.vertices) {
            this._data.vertices.forEach(function (row) {
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
        if (!loadResult.dataChanged) {
            this.fetchData();
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

        var marshaller = new HipieDDL.Marshaller().proxyMappings(this.proxyMappings());
        var context = this;
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
                .shrinkToFitOnLayout(true)
                .layout("Hierarchy")
                .renderDashboards(true)
            ;
            GraphWidget.prototype.render.call(context, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    return Graph;
}));
