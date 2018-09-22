var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/graph", "@hpcc-js/util", "./IMDBServer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var graph_1 = require("@hpcc-js/graph");
    var util_1 = require("@hpcc-js/util");
    var IMDBServer_1 = require("./IMDBServer");
    var IMDBVertex = /** @class */ (function (_super) {
        __extends(IMDBVertex, _super);
        function IMDBVertex() {
            var _this = _super.call(this) || this;
            _this._expanded = false;
            _this
                .icon_diameter(60)
                .icon_shape_colorStroke("transparent")
                .icon_shape_colorFill("transparent")
                .icon_image_colorFill("#333333")
                .iconAnchor("middle")
                .textbox_shape_colorStroke("transparent")
                .textbox_shape_colorFill("white")
                .textbox_text_colorFill("#333333");
            return _this;
        }
        IMDBVertex.prototype.expanded = function (_) {
            var _this = this;
            if (!arguments.length)
                return this._expanded;
            this._expanded = _;
            this.annotationIcons().forEach(function (ai) {
                ai.shape_colorFill = _this._expanded ? "white" : ai.shape_colorStroke;
                ai.image_colorFill = _this._expanded ? ai.shape_colorStroke : "white";
            });
            return this;
        };
        IMDBVertex.prototype.appendAnnotation = function (links, tooltip, shape_colorFill, shape_colorStroke, image_colorFill) {
            if (links.length) {
                this.annotationIcons().push({
                    faChar: links.length < 10 ? "" + links.length : "*",
                    tooltip: tooltip,
                    shape_colorFill: shape_colorFill,
                    shape_colorStroke: shape_colorStroke,
                    image_colorFill: image_colorFill
                });
            }
        };
        IMDBVertex.prototype.calcTooltip = function (titleKey, obj) {
            var body = "";
            for (var key in obj) {
                if (key !== titleKey) {
                    var value = util_1.isArray(obj[key]) ? util_1.isArray.length : obj[key];
                    body += "<tr><td>" + key + "</td><td style=\"font-weight:normal\">" + value + "</td></tr>";
                }
            }
            return "<table>\n                    <thead>\n                        <tr><th colspan=\"2\" style=\"font-weight:bold;font-size:16px\">" + obj[titleKey] + "</th></tr>\n                    </thead>\n                    <tbody>\n                        " + body + "\n                    </tbody>\n                </table>";
        };
        return IMDBVertex;
    }(graph_1.Vertex));
    exports.IMDBVertex = IMDBVertex;
    var MovieVertex = /** @class */ (function (_super) {
        __extends(MovieVertex, _super);
        function MovieVertex(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this
                .faChar("")
                .text(_this._info.title);
            _this.appendAnnotation(_this._info.directors, "Directors", "navy", "navy", "white");
            _this.appendAnnotation(_this._info.actors, "Actors", "darkgreen", "darkgreen", "white");
            return _this;
        }
        MovieVertex.prototype.infoID = function () {
            return this._info.title;
        };
        MovieVertex.prototype.info = function () {
            return this._info;
        };
        MovieVertex.prototype.tooltipHTML = function () {
            return _super.prototype.calcTooltip.call(this, "Title", this._info.origData);
        };
        return MovieVertex;
    }(IMDBVertex));
    exports.MovieVertex = MovieVertex;
    var PersonVertex = /** @class */ (function (_super) {
        __extends(PersonVertex, _super);
        function PersonVertex(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this
                .faChar("")
                .text(_this._info.name);
            _this.appendAnnotation(_this._info.directed, "Directed", "navy", "navy", "white");
            _this.appendAnnotation(_this._info.acted, "Acted", "darkgreen", "darkgreen", "white");
            return _this;
        }
        PersonVertex.prototype.infoID = function () {
            return this._info.name;
        };
        PersonVertex.prototype.info = function () {
            return this._info;
        };
        PersonVertex.prototype.tooltipHTML = function () {
            return _super.prototype.calcTooltip.call(this, "Name", this._info.origData);
        };
        return PersonVertex;
    }(IMDBVertex));
    exports.PersonVertex = PersonVertex;
    var IMDBEdge = /** @class */ (function (_super) {
        __extends(IMDBEdge, _super);
        function IMDBEdge() {
            var _this = _super.call(this) || this;
            _this
                .sourceMarker("circle")
                .targetMarker("circle");
            return _this;
        }
        IMDBEdge.prototype.tooltipHTML = function () {
            var s = this.sourceVertex();
            var t = this.targetVertex();
            return "<div style=\"text-align:center\">\n            <p>" + s.text() + "</p>\n            <p>|</p>\n            <p>" + this.text() + "</p>\n            <p>|</p>\n            <p>" + t.text() + "</p>\n        </div>";
        };
        return IMDBEdge;
    }(graph_1.Edge));
    exports.IMDBEdge = IMDBEdge;
    var IMDBGraph = /** @class */ (function (_super) {
        __extends(IMDBGraph, _super);
        function IMDBGraph() {
            var _this = _super.call(this) || this;
            _this._server = IMDBServer_1.IMDBServer.attach();
            _this.verticies = [];
            _this.vertexMap = {};
            _this.edges = [];
            _this.edgeMap = {};
            _this
                .layout("ForceDirected2")
                .forceDirectedLinkDistance(150)
                .highlightOnMouseOverVertex(true)
                .hierarchyDigraph(false);
            _this.tooltipHTML(function (d) {
                if (d instanceof IMDBVertex) {
                    return d.tooltipHTML();
                }
                else if (d instanceof IMDBEdge) {
                    return d.tooltipHTML();
                }
                return "";
            });
            return _this;
        }
        IMDBGraph.prototype.clear = function () {
            this.verticies = [];
            this.vertexMap = {};
            this.edges = [];
            this.edgeMap = {};
        };
        IMDBGraph.prototype.createMovieVertex = function (movie) {
            var retVal = this.vertexMap["m: " + movie.title + " "];
            if (!retVal) {
                retVal = this.vertexMap["m: " + movie.title + " "] = new MovieVertex(movie);
                this.verticies.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.createPersonVertex = function (person) {
            var retVal = this.vertexMap["p: " + person.name + " "];
            if (!retVal) {
                retVal = this.vertexMap["p: " + person.name + " "] = new PersonVertex(person);
                this.verticies.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.createEdge = function (source, target, label) {
            var id = source.id() + " -> " + target.id() + " " + label;
            var retVal = this.edgeMap[id];
            if (!retVal) {
                retVal = this.edgeMap[id] = new IMDBEdge()
                    .sourceVertex(source)
                    .targetVertex(target)
                    .strokeColor(label === "Actor" ? "darkgreen" : "navy")
                    .text_text_colorFill(label === "Actor" ? "darkgreen" : "navy")
                    .text(label);
                this.edges.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.loadMovie = function (movie) {
            this.clear();
            var v = this.createMovieVertex(movie)
                .centroid(true);
            return this.expand(v);
        };
        IMDBGraph.prototype.loadPerson = function (person) {
            var _this = this;
            this.clear();
            return this._server.person(person).then(function (person) {
                var v = _this.createPersonVertex(person)
                    .centroid(true);
                return _this.expand(v);
            });
        };
        IMDBGraph.prototype.expandMovie = function (v) {
            var _this = this;
            return this._server.moviePeople(v.infoID()).then(function (people) {
                people.directors.forEach(function (director) {
                    var p = _this.createPersonVertex(director);
                    _this.createEdge(p, v, "Director");
                });
                people.actors.forEach(function (actor) {
                    var p = _this.createPersonVertex(actor);
                    _this.createEdge(p, v, "Actor");
                });
            });
        };
        IMDBGraph.prototype.expandPerson = function (v) {
            var _this = this;
            return this._server.personMovies(v.infoID()).then(function (movies) {
                movies.directed.forEach(function (movie) {
                    var m = _this.createMovieVertex(movie);
                    _this.createEdge(v, m, "Director");
                });
                movies.acted.forEach(function (movie) {
                    var m = _this.createMovieVertex(movie);
                    _this.createEdge(v, m, "Actor");
                });
            });
        };
        IMDBGraph.prototype.expand = function (v) {
            var _this = this;
            v.expanded(true);
            var promise;
            if (v instanceof PersonVertex) {
                promise = this.expandPerson(v);
            }
            else if (v instanceof MovieVertex) {
                promise = this.expandMovie(v);
            }
            else {
                promise = Promise.resolve();
            }
            return promise.then(function () {
                _this.data({ vertices: _this.verticies, edges: _this.edges }, true);
            });
        };
        return IMDBGraph;
    }(graph_1.Graph));
    exports.IMDBGraph = IMDBGraph;
});
//# sourceMappingURL=graph.js.map