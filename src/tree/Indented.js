import * as d3 from 'd3';
import { SVGZoomWidget } from "../common/SVGZoomWidget";
import { PropertyExt } from "../common/PropertyExt";
import { ITree } from "../api/ITree";
import * as Utility from "../common/Utility";
import "css!./Indented";

function Column(owner) {
    PropertyExt.call(this);
    this._owner = owner;
}
Column.prototype = Object.create(PropertyExt.prototype);
Column.prototype.constructor = Column;
Column.prototype._class += " tree_Dendrogram.Column";

Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

// ===
export function Indented(target) {
    SVGZoomWidget.call(this);
    ITree.call(this);
    Utility.SimpleSelectionMixin.call(this);

    this._drawStartPos = "origin";

    this._d3LayoutTree = d3.layout.tree();
    this._d3Diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        })
        ;
}
Indented.prototype = Object.create(SVGZoomWidget.prototype);
Indented.prototype.constructor = Indented;
Indented.prototype._class += " tree_Indented";
Indented.prototype.implements(ITree.prototype);
Indented.prototype.mixin(Utility.SimpleSelectionMixin);
Indented.prototype.Column = Column;

Indented.prototype.publish("xmlColumn", null, "set", "Field", function () { return this.columns(); }, { optional: true });
Indented.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column, disable: function (w) { return w.xmlColumn_exists(); } });
Indented.prototype.publish("barHeight", 16, "number", "Bar height");

function xmlToJson(xml, id) {
    id = id || "";
    var retVal = {
        id: id,
        label: "",
        attributes: {},
        children: []
    };

    retVal.label = xml.nodeName;
    if (xml.nodeType === 1) { // element
        if (xml.attributes.length > 0) {
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                retVal.attributes[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        retVal.label = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var child = xmlToJson(item, id + "[" + retVal.children.length + "]");
            retVal.children.push(child);
        }
    }
    return retVal;
}

Indented.prototype.xmlToData = function (xml, id) {
    if (DOMParser) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, "text/xml");
        return xmlToJson(doc, id).children[0];
    }
    return [];
};

Indented.prototype.xml = function (_) {
    if (!arguments.length) return this._xml;
    this._xml = _;
    this.data(this.xmlToData(this._xml));
    return this;
};

Indented.prototype.IndentedData = function () {
    if (this.xmlColumn_exists()) {
        var cellIdx = this.columns().indexOf(this.xmlColumn());
        var retVal = {
            label: this.xmlColumn(),
            children: this.data().map(function (row, idx) {
                return this.xmlToData(row[cellIdx], "[" + idx + "]");
            }, this)
        };
        return retVal.children.length === 1 ? retVal.children[0] : retVal;
    } else {
        if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
            return this.data();
        }
        var view = this._db.rollupView(this.mappings().map(function (mapping) { return mapping.column(); }));
        var root = {
            key: "root",
            values: view.entries()
        };
        return formatData(root);
    }

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

Indented.prototype.enter = function (domNode, element) {
    SVGZoomWidget.prototype.enter.apply(this, arguments);
    this._svgLinks = this._renderElement.append("g");
    this._svgNodes = this._renderElement.append("g");
    this._selection.widgetElement(this._svgNodes);
};

Indented.prototype.update = function (domNode, element, secondPass) {
    SVGZoomWidget.prototype.update.apply(this, arguments);
    var context = this;

    this._d3LayoutTree
        .nodeSize([0, this.barHeight()])
        ;
    var dataChecksum = this._db.dataChecksum();
    if (this._prevDataChecksum !== dataChecksum) {
        this._treeData = this.IndentedData();
        this._prevDataChecksum = dataChecksum;
    }
    var dataNodes = this._d3LayoutTree.nodes(this._treeData);
    var links = this._d3LayoutTree.links(dataNodes);

    dataNodes.forEach(function (n, i) {
        n.x = i * this.barHeight();
    }, this);

    var boxSize = this.barHeight() - 4;
    var transitionDuration = this._renderCount ? 500 : 0;

    //  Lines  ---
    var lines = this._svgLinks.selectAll(".link").data(links, function (d, i) { return d.source.id + "->" + d.target.id; });
    lines.enter().append("path")
        .attr("class", "link")
        .attr("d", this._d3Diagonal)
        ;
    lines.transition().duration(transitionDuration)
        .attr("d", this._d3Diagonal)
        ;
    lines.exit().remove();

    //  Nodes  ---
    var nodes = this._svgNodes.selectAll(".node").data(dataNodes, function (d, i) { return d.id; });
    nodes.transition().duration(transitionDuration)
        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        ;
    nodes.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        .call(this._selection.enter.bind(this._selection))
        .each(function (d, i) {
            var element = d3.select(this);
            element.append("rect")
                .attr("height", boxSize)
                .attr("width", boxSize)
                .on("click", function (d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    if (d.depth > 0) {
                        //context.click(context.rowToObj(tmp.origRows ? tmp.origRows[0] : tmp), context.mappings()[d.depth - 1].column(), true);
                    }
                    context.lazyRender();
                })
                ;
            element.append("text");
        })
        .style("opacity", 0).transition()
        .style("opacity", 1)
        ;
    nodes.select("rect")
        .attr("x", -boxSize / 2)
        .attr("y", -boxSize / 2)
        .style("fill", color)
        ;
    nodes.select("text")
        .attr("dx", boxSize / 2 + 4 + "px")
        .attr("dy", "0.33em")
        .text(function (d) { return d.label; })
        ;
    nodes.exit().transition()
        .style("opacity", 0)
        .remove()
        ;

    if (!this._renderCount) {
        context.zoomToFit();
    }

    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }
};
