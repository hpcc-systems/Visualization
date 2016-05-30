"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/PropertyExt", "../api/ITree", "../common/Utility", "css!./Treemap"], factory);
    } else {
        root.tree_Treemap = factory(root.d3, root.common_HTMLWidget, root.common_PropertyExt, root.api_ITree, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, PropertyExt, ITree, Utility) {
    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " tree_Dendrogram.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

    // ===
    function Treemap(target) {
        HTMLWidget.call(this);
        ITree.call(this);
    }
    Treemap.prototype = Object.create(HTMLWidget.prototype);
    Treemap.prototype.constructor = Treemap;
    Treemap.prototype._class += " tree_Treemap";
    Treemap.prototype.implements(ITree.prototype);
    Treemap.prototype.Column = Column;

    Treemap.prototype.publish("paletteID", "default", "set", "Palette ID", Treemap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    Treemap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
    Treemap.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
    Treemap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
    Treemap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });
    Treemap.prototype.publish("fontSize", null, "number", "Font Size", null, { optional: true });
    Treemap.prototype.publish("transitionDuration", 250, "number", "Transition Duration");

    Treemap.prototype.treemapData = function () {
        if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
            return this.data();
        }

        var view = this._db.aggregateView(this.mappings().map(function (mapping) { return mapping.column(); }), this.aggrType(), this.aggrColumn());
        var retVal = {
            key: "root",
            values: view.entries()
        };
        return formatData(retVal);

        function formatData(node) {
            if (node.values instanceof Array) {
                var children = node.values.filter(function (value) {
                    return !(value instanceof Array);
                }).map(function (value) {
                    return formatData(value);
                });
                var retVal = {
                    label: node.key
                };
                if (children.length) {
                    retVal.children = children;
                } else {
                    retVal.size = 22;
                }
                return retVal;
            }
            return {
                label: node.key,
                size: node.values.aggregate,
                origRows: node.values
            };
        }
    };

    Treemap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._d3Treemap = d3.layout.treemap()
            .value(function (d) {
                return d.size || 50;
            })
        ;

        this._elementDIV = element.append("div");
        this._selection = new Utility.SimpleSelection(this._elementDIV);
    };

    Treemap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var nodes = this._d3Treemap
            .size([this.width(), this.height()])
            .nodes(this.treemapData())
        ;

        this._elementDIV
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("line-height", this.fontSize_exists() ? (this.fontSize() + 2) + "px" : null)
        ;

        var context = this;
        var node = this._elementDIV.selectAll(".node").data(nodes);
        node.enter().append("div")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (d && d.origRows) {
                    var columnLabel = "";
                    context.mappings().forEach(function (mapping) {
                        if (mapping.column()) {
                            columnLabel = mapping.column();
                        }
                    });
                    context.click(context.rowToObj(d.origRows[0]), columnLabel, context._selection.selected(this));
                }
            })
            .call(enterPosition)
        ;
        node
            .attr("title", tooltip)
            .text(function (d) { return d.children ? null : d.label; })
            .style("background", function (d) { return d.children ? context._palette(d.label) : null; })
            .transition().duration(this.transitionDuration())
            .style("opacity", function (d) { return d.children ? 1 : null; })
            .call(position)
        ;
        node.exit().transition().duration(this.transitionDuration())
            .style("opacity", 0)
            .remove()
        ;
        function tooltip(d) {
            if (d.children) {
                return null;
            }
            var retVal = d.label + " (" + d.value + ")";
            while (d.parent && d.parent.parent) {
                retVal = d.parent.label + " -> " + retVal;
                d = d.parent;
            }
            return retVal;
        }
        function enterPosition(d) {
            this
                .style("left", function (d) { return (d.x + Math.max(0, d.dx - 1) / 2) + "px"; })
                .style("top", function (d) { return (d.y + Math.max(0, d.dy - 1) / 2) + "px"; })
                .style("width", function (d) { return 0 + "px"; })
                .style("height", function (d) { return 0 + "px"; })
            ;
        }

        function position() {
            this
                .style("left", function (d) { return d.x + "px"; })
                .style("top", function (d) { return d.y + "px"; })
                .style("width", function (d) { return Math.max(0, d.dx - 1) + "px"; })
                .style("height", function (d) { return Math.max(0, d.dy - 1) + "px"; })
            ;
        }
    };

    Treemap.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Treemap;
}));
