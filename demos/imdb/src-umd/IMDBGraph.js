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
        define(["require", "exports", "@hpcc-js/graph", "./IMDBEdge", "./IMDBServer", "./IMDBVertex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var graph_1 = require("@hpcc-js/graph");
    var IMDBEdge_1 = require("./IMDBEdge");
    var IMDBServer_1 = require("./IMDBServer");
    var IMDBVertex_1 = require("./IMDBVertex");
    /**
     * The IMDBGraph class manages the master list of "explored" movies and people.
     * It derives from a standard Graph with some minimal visual tweaks.
     */
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
            _this.tooltipHTML(function (d) { return d.tooltipHTML(); });
            return _this;
        }
        IMDBGraph.prototype.clear = function () {
            this.verticies = [];
            this.vertexMap = {};
            this.edges = [];
            this.edgeMap = {};
        };
        IMDBGraph.prototype.load = function (movie_person) {
            var _this = this;
            this.clear();
            return this._server.isPerson(movie_person).then(function (isPerson) {
                if (isPerson) {
                    return _this._server.person(movie_person).then(function (person) {
                        return _this.createPersonVertex(person).centroid(true);
                    });
                }
                return _this._server.isMovie(movie_person).then(function (isMovie) {
                    if (isMovie) {
                        return _this._server.movie(movie_person).then(function (movie) {
                            return _this.createMovieVertex(movie).centroid(true);
                        });
                    }
                });
                return null;
            }).then(function (v) {
                if (v) {
                    return _this.expand(v);
                }
            });
        };
        IMDBGraph.prototype.createMovieVertex = function (movie) {
            var retVal = this.vertexMap["m: " + movie.title + " "];
            if (!retVal) {
                retVal = this.vertexMap["m: " + movie.title + " "] = new IMDBVertex_1.MovieVertex(movie);
                this.verticies.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.createPersonVertex = function (person) {
            var retVal = this.vertexMap["p: " + person.name + " "];
            if (!retVal) {
                retVal = this.vertexMap["p: " + person.name + " "] = new IMDBVertex_1.PersonVertex(person);
                this.verticies.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.createEdge = function (source, target, label) {
            var id = source.id() + " -> " + target.id() + " " + label;
            var retVal = this.edgeMap[id];
            if (!retVal) {
                retVal = this.edgeMap[id] = new IMDBEdge_1.IMDBEdge()
                    .sourceVertex(source)
                    .targetVertex(target)
                    .strokeColor(label === "Actor" ? "darkgreen" : "navy")
                    .text_text_colorFill(label === "Actor" ? "darkgreen" : "navy")
                    .text(label);
                this.edges.push(retVal);
            }
            return retVal;
        };
        IMDBGraph.prototype.expandMovie = function (v) {
            var _this = this;
            return this._server.moviePeople(v.info().title).then(function (people) {
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
            return this._server.personMovies(v.info().name).then(function (movies) {
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
            if (v instanceof IMDBVertex_1.PersonVertex) {
                promise = this.expandPerson(v);
            }
            else if (v instanceof IMDBVertex_1.MovieVertex) {
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
//# sourceMappingURL=IMDBGraph.js.map