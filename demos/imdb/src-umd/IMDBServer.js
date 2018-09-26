var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "d3-fetch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var d3_fetch_1 = require("d3-fetch");
    var data;
    var IMDBServer = /** @class */ (function () {
        function IMDBServer() {
            /*
                This is a "fake" IMDB server
                There are a lot of uneeded promises to emulate what it would be like if actually calling a real server.
            */
            this._movieMap = {};
            this._personMap = {};
        }
        IMDBServer.attach = function () {
            if (!data) {
                data = new IMDBServer();
            }
            return data;
        };
        IMDBServer.prototype._movie = function (title) {
            var retVal = this._movieMap[title.trim()];
            if (!retVal) {
                retVal = this._movieMap[title.trim()] = {
                    title: title,
                    directors: [],
                    actors: []
                };
            }
            return retVal;
        };
        IMDBServer.prototype.movie = function (title) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this._movie(title)];
                    }
                });
            });
        };
        IMDBServer.prototype.isMovie = function (title) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, !!this._movieMap[title]];
                    }
                });
            });
        };
        IMDBServer.prototype.movieDirectors = function (title) {
            return __awaiter(this, void 0, void 0, function () {
                var movie;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.movie(title)];
                        case 1:
                            movie = _a.sent();
                            return [2 /*return*/, Promise.all(movie.directors.map(function (p) { return _this.person(p); }))];
                    }
                });
            });
        };
        IMDBServer.prototype.movieActors = function (title) {
            return __awaiter(this, void 0, void 0, function () {
                var movie;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.movie(title)];
                        case 1:
                            movie = _a.sent();
                            return [2 /*return*/, Promise.all(movie.actors.map(function (p) { return _this.person(p); }))];
                    }
                });
            });
        };
        IMDBServer.prototype.moviePeople = function (title) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Promise.all([this.movieDirectors(title), this.movieActors(title)]).then(function (all) {
                            return {
                                directors: all[0],
                                actors: all[1]
                            };
                        })];
                });
            });
        };
        IMDBServer.prototype._person = function (name) {
            var retVal = this._personMap[name];
            if (!retVal) {
                retVal = this._personMap[name] = {
                    name: name,
                    directed: [],
                    acted: []
                };
            }
            return retVal;
        };
        IMDBServer.prototype.person = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this._person(name)];
                    }
                });
            });
        };
        IMDBServer.prototype.isPerson = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.load()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, !!this._personMap[name]];
                    }
                });
            });
        };
        IMDBServer.prototype.directedMovies = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var person;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.person(name)];
                        case 1:
                            person = _a.sent();
                            return [2 /*return*/, Promise.all(person.directed.map(function (m) { return _this.movie(m); }))];
                    }
                });
            });
        };
        IMDBServer.prototype.actedMovies = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var person;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.person(name)];
                        case 1:
                            person = _a.sent();
                            return [2 /*return*/, Promise.all(person.acted.map(function (m) { return _this.movie(m); }))];
                    }
                });
            });
        };
        IMDBServer.prototype.personMovies = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Promise.all([this.directedMovies(name), this.actedMovies(name)]).then(function (all) {
                            return {
                                directed: all[0],
                                acted: all[1]
                            };
                        })];
                });
            });
        };
        IMDBServer.prototype.load = function () {
            var _this = this;
            if (!this._loaded) {
                this._loaded = d3_fetch_1.csv("./data/IMDB-Movie-Data.csv", function (d, idx) {
                    var movie = _this._movie(d.Title);
                    d.Director.split(",").forEach(function (director) {
                        var person = _this._person(director.trim());
                        person.directed.push(movie.title);
                        movie.directors.push(person.name);
                    });
                    d.Actors.split(",").forEach(function (actor) {
                        var person = _this._person(actor.trim());
                        person.acted.push(movie.title);
                        movie.actors.push(person.name);
                    });
                    movie.rank = +d["Rank"];
                    movie.genre = d["Genre"];
                    movie.description = d["Description"];
                    movie.year = +d["Year"];
                    movie.runtime = +d["Runtime (Minutes)"];
                    movie.rating = +d["Rating"];
                    movie.votes = +d["Votes"];
                    movie.revenue = +d["Revenue (Millions)"];
                    movie.metaScore = +d["Metascore"];
                    return d;
                });
            }
            return this._loaded;
        };
        return IMDBServer;
    }());
    exports.IMDBServer = IMDBServer;
});
//# sourceMappingURL=IMDBServer.js.map