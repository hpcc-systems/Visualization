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
        define(["require", "exports", "@hpcc-js/graph", "@hpcc-js/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var graph_1 = require("@hpcc-js/graph");
    var util_1 = require("@hpcc-js/util");
    /**
     * The IMDBVertex abstract base class provides common implementations of:
     * * Default styling.
     * * Annotation addition and styling (different when expanded / contracted).
     * * Tooltip formatting.
     */
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
        /**
         * Append a new annotation, default to "filled" to indicate that it has not
         * been expanded.
         * @param linkCount number of external links.  Numbers > 10 will be displayed
         * as a "*"
         * @param shape_color Rectangle color
         * @param image_color Icon/Text color
         */
        IMDBVertex.prototype.appendAnnotation = function (linkCount, tooltip, shape_color, image_color) {
            if (linkCount) {
                this.annotationIcons().push({
                    faChar: linkCount < 10 ? "" + linkCount : "*",
                    tooltip: tooltip,
                    shape_colorFill: shape_color,
                    shape_colorStroke: shape_color,
                    image_colorFill: image_color
                });
            }
        };
        /**
         * Tooltip html generator, creates a two column HTML table with a single header.
         * @param titleKey ID of key in obj to use as the title
         * @param obj Key/Value object containgin data to display in the table
         * @returns String containing HTML formatted table
         */
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
    /**
     * The MovieVertex represents a single movie as a vertex (node) in the graph
     */
    var MovieVertex = /** @class */ (function (_super) {
        __extends(MovieVertex, _super);
        /**
         * Instantiated with the Movie data from the server
         * @param info Movie data payload
         */
        function MovieVertex(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this
                .faChar("") // See https://fontawesome.com/v4.7.0/cheatsheet/ for more choices
                .text(_this._info.title);
            _this.appendAnnotation(_this._info.directors.length, "Directors", "navy", "white");
            _this.appendAnnotation(_this._info.actors.length, "Actors", "darkgreen", "white");
            return _this;
        }
        /**
         * Vertex info
         * @returns Movie data payload
         */
        MovieVertex.prototype.info = function () {
            return this._info;
        };
        /**
         * Format custom tooltip for movie
         */
        MovieVertex.prototype.tooltipHTML = function () {
            return _super.prototype.calcTooltip.call(this, "Title", {
                "Title": this._info.title,
                "Rank": this._info.rank,
                "Year": this._info.year,
                "Runtime (minutes)": this._info.runtime,
                "Revenue (millions)": this._info.revenue
            });
        };
        return MovieVertex;
    }(IMDBVertex));
    exports.MovieVertex = MovieVertex;
    /**
     * The PersonVertex represents a single person as a vertex (node) in the graph
     */
    var PersonVertex = /** @class */ (function (_super) {
        __extends(PersonVertex, _super);
        /**
         * Instantiated with the Person data from the server
         * @param info Person data payload
         */
        function PersonVertex(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this
                .faChar("") // See https://fontawesome.com/v4.7.0/cheatsheet/ for more choices
                .text(_this._info.name);
            _this.appendAnnotation(_this._info.directed.length, "Directed", "navy", "white");
            _this.appendAnnotation(_this._info.acted.length, "Acted", "darkgreen", "white");
            return _this;
        }
        /**
         * Vertex info
         * @returns Movie data payload
         */
        PersonVertex.prototype.info = function () {
            return this._info;
        };
        /**
         * Format custom tooltip for movie
         */
        PersonVertex.prototype.tooltipHTML = function () {
            return _super.prototype.calcTooltip.call(this, "Name", {
                "Name": this._info.name,
                "Directed": this._info.directed,
                "Acted in": this._info.acted
            });
        };
        return PersonVertex;
    }(IMDBVertex));
    exports.PersonVertex = PersonVertex;
});
//# sourceMappingURL=IMDBVertex.js.map