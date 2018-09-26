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
        define(["require", "exports", "@hpcc-js/graph"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var graph_1 = require("@hpcc-js/graph");
    /**
     * The IMDBEdge class provides basic styling for links between people and movies.
     * Each edge is terminated with a circle at both ends to indicate the graph is undirected.
     * Contains a simple example of custom HTML for the tooltip.
     */
    var IMDBEdge = /** @class */ (function (_super) {
        __extends(IMDBEdge, _super);
        /**
         * Initializes the default styling for the edge.  The edge will link Movies and
         * People indicating their relationship ("Actor" | "Director")
         */
        function IMDBEdge() {
            var _this = _super.call(this) || this;
            _this
                .sourceMarker("circle")
                .targetMarker("circle");
            return _this;
        }
        /**
         * Custom HTML tooltip
         */
        IMDBEdge.prototype.tooltipHTML = function () {
            var s = this.sourceVertex();
            var t = this.targetVertex();
            return "<div style=\"text-align:center\">\n            <p>" + s.text() + "</p>\n            <p>|</p>\n            <p>" + this.text() + "</p>\n            <p>|</p>\n            <p>" + t.text() + "</p>\n        </div>";
        };
        return IMDBEdge;
    }(graph_1.Edge));
    exports.IMDBEdge = IMDBEdge;
});
//# sourceMappingURL=IMDBEdge.js.map