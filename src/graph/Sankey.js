"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "../common/Utility", "d3-sankey", "css!./Sankey"], factory);
    } else {
        root.graph_Sankey = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.common_Utility, root.d3.sankey);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, Utility, D3Sankey) {
    D3Sankey = D3Sankey || d3.sankey || window.d3.sankey;

    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " graph_Sankey.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });
    Column.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true, disable: function (w) { return !w._owner || w._owner.mappings().indexOf(w) === 0; } });
    Column.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this._owner ? this._owner.columns() : []; }, {
        optional: true,
        disable: function (w) {
            return !w._owner || !w.aggrType() || w._owner.mappings().indexOf(w) === 0;
        }
    });

    Column.prototype.aggregate = function(values){
        switch (this.aggrType()) {
            case null:
            case undefined:
            case "":
                return values.length;
            default:
                var columns = this._owner.columns();
                var colIdx = columns.indexOf(this.aggrColumn());
                return d3[this.aggrType()](values, function (value) {
                    return +value[colIdx];
                });
        }
    };
    
    //  ---
    function Sankey(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";
    }
    Sankey.prototype = Object.create(SVGWidget.prototype);
    Sankey.prototype.constructor = Sankey;
    Sankey.prototype._class += " graph_Sankey";
    Sankey.prototype.Column = Column;

    Sankey.prototype._palette = Palette.ordinal("default");

    Sankey.prototype.publish("paletteID", "default", "set", "Palette ID", Sankey.prototype._palette.switch());
    Sankey.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
    Sankey.prototype.publish("vertexWidth", 36, "number", "Vertex Width");
    Sankey.prototype.publish("vertexPadding", 40, "number", "Vertex Padding");
    Sankey.prototype.publish("xAxisMovement", false, "boolean", "Enable x-axis movement");
    Sankey.prototype.publish("yAxisMovement", false, "boolean", "Enable y-axis movement");

    Sankey.prototype.sankeyData = function () {
        var vertexIndex = {};
        var retVal = {
            vertices: [],
            edges: []
        };
        var mappings = this.mappings().filter(function (mapping) { return mapping.column(); });
        mappings.forEach(function (mapping, idx) {
            var view = this._db.rollupView([mapping.column()]);
            view.entries().forEach(function (row) {
                var id = mapping.column() + ":" + idx + ":" + row.key;
                if (!vertexIndex[id]) {
                    retVal.vertices.push({
                        __id: id,
                        __category: mapping.column(),
                        name: row.key,
                        origRow: row.values
                    });
                    vertexIndex[id] = retVal.vertices.length - 1;
                }
            }, this);
        }, this);
        mappings.forEach(function (mapping, idx) {
            if (idx < mappings.length - 1) {
                var mapping2 = mappings[idx + 1];
                var view = this._db.rollupView([mapping.column(), mapping2.column()]);
                view.entries().forEach(function (row) {
                    var sourceID = mapping.column() + ":" + idx + ":" + row.key;
                    row.values.forEach(function (value) {
                        var targetID = mapping2.column() + ":" + (idx + 1) + ":" + value.key;
                        retVal.edges.push({
                            __id: sourceID + "_" + targetID,
                            source: vertexIndex[sourceID],
                            target: vertexIndex[targetID],
                            value: mapping2.aggregate(value.values)
                        });
                    });
                });
            }
        }, this);

        return retVal;
    };

    Sankey.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._d3Sankey = new D3Sankey();
        this._d3SankeyPath = this._d3Sankey.link();
        this._selection = new Utility.SimpleSelection(element);
    };

    Sankey.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());

        var sankeyData = this.sankeyData();
        this._d3Sankey
            .size([this.width(), this.height()])
            .nodeWidth(this.vertexWidth())
            .nodePadding(this.vertexPadding())
            .nodes(sankeyData.vertices)
            .links(sankeyData.edges)
            .layout(32)
        ;

        var context = this;

        // Links ---
        var link = element.selectAll(".link").data(sankeyData.edges);
        link.enter().append("path")
            .attr("class", "link")
            .append("title")
        ;
        link
            .attr("d", this._d3SankeyPath)
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; })
        ;
        link.select("title")
            .text(function (d) {
                return d.source.name + " → " + d.target.name + "\n" + d.value;
            })
        ;
        link.exit().remove();

        // Nodes ---
        var node = element.selectAll(".node").data(sankeyData.vertices);
        node.enter().append("g")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d, idx) {
                context.click(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .each(function (d) {
                var gElement = d3.select(this);
                gElement.append("rect");
                gElement.append("text");
            })
            /*
            .call(d3.behavior.drag()
                .origin(function (d) { return d; })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove)
            )
            */
        ;
        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
        ;
        node.select("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", this._d3Sankey.nodeWidth())
            .style("fill", function (d) {
                return context._palette(d.name);
            })
            .style("cursor", (this.xAxisMovement() || this.yAxisMovement()) ? null : "default")
        ;
        node.select("text")
             .attr("x", -6)
             .attr("y", function (d) { return d.dy / 2; })
             .attr("dy", ".35em")
             .attr("text-anchor", "end")
             .attr("transform", null)
             .text(function (d) { return d.name; })
           .filter(function (d) { return d.x < context.width() / 2; })
             .attr("x", 6 + this._d3Sankey.nodeWidth())
             .attr("text-anchor", "start")
        ;
        node.exit().remove();

        /*
        function dragmove(d) {
            var gElement = d3.select(this);
            if (context.xAxisMovement()) {
                d.x = Math.max(0, Math.min(context.width() - d.dx, d3.event.x));
            }
            if (context.yAxisMovement()) {
                d.y = Math.max(0, Math.min(context.height() - d.dy, d3.event.y));
            }
            gElement.attr("transform", "translate(" + d.x + "," + d.y + ")");
            context._d3Sankey.relayout();
            link.attr("d", context._d3SankeyPath);

            gElement.select("text")
                .attr("x", -6)
                .attr("y", function (d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .attr("transform", null)
                .text(function (d) { return d.name; })
                .filter(function (d) { return d.x < context.width() / 2; })
                    .attr("x", 6 + context._d3Sankey.nodeWidth())
                    .attr("text-anchor", "start")
            ;
        }
        */
    };

    Sankey.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    //  Events  ---
    Sankey.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return Sankey;
}));
