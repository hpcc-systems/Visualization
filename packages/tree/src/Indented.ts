import { ITree } from "@hpcc-js/api";
import { PropertyExt, SVGZoomWidget, Utility } from "@hpcc-js/common";
import { hierarchy as d3Hierarchy, tree as d3Tree } from "d3-hierarchy";
import { select as d3Select } from "d3-selection";

import "../src/Indented.css";

export class IndentedColumn extends PropertyExt {
    _owner;

    constructor(owner) {
        super();
        this._owner = owner;
    }
}
IndentedColumn.prototype._class += " tree_Dendrogram.IndentedColumn";

export class Indented extends SVGZoomWidget {
    Column;
    _d3Tree;
    _xml;
    _svgLinks;
    _svgNodes;
    _treeData;
    _collapsed: { [key: string]: boolean } = {};

    constructor() {
        super();
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this._d3Tree = d3Tree();
    }

    xmlToData(xml, id = "") {
        if (DOMParser) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "text/xml");
            return xmlToJson(doc, id).children[0];
        }
        return [];
    }

    xml(_) {
        if (!arguments.length) return this._xml;
        this._xml = _;
        this.data(this.xmlToData(this._xml));
        return this;
    }

    IndentedData() {
        if (this.data().length === 0) return [];
        if (this.xmlColumn_exists()) {
            const cellIdx = this.columns().indexOf(this.xmlColumn());
            const retVal = {
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
            const view = this._db.rollupView(this.mappings().map(function (mapping) { return mapping.column(); }));
            const root = {
                key: "root",
                values: view.entries()
            };
            return formatData(root);
        }

        function formatData(node): any {
            if (node.values instanceof Array) {
                const children = node.values.filter(function (value) {
                    return !(value instanceof Array);
                }).map(function (value) {
                    return formatData(value);
                });
                const retVal: any = {
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
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._svgLinks = this._renderElement.append("g");
        this._svgNodes = this._renderElement.append("g");
        this._selection.widgetElement(this._svgNodes);
    }

    protected _prevDataChecksum;
    update(domNode, _element) {
        super.update(domNode, _element);
        const context = this;

        this._d3Tree
            .nodeSize([0, this.barHeight()])
            ;
        const dataChecksum = this._db.dataChecksum();
        if (this._prevDataChecksum !== dataChecksum) {
            this._treeData = this.IndentedData();
            this._prevDataChecksum = dataChecksum;
        }

        function getID(d) {
            return (d.parent ? getID(d.parent) + "." : "") + d.data.label;
        }

        const root = d3Hierarchy(this.data())
            .sum(function (d) {
                return d.size || 50;
            }).each((d) => {
                if (this._collapsed[getID(d)]) {
                    delete (d.children);
                }
            })
            ;

        const dataNodes = this._d3Tree(root).descendants();
        const links = this._d3Tree(root).descendants().slice(1);

        let nodeIdx = 0;
        root.eachBefore((n: any) => {
            n.x = nodeIdx * context.barHeight();
            ++nodeIdx;
        });

        const boxSize = this.barHeight() - 4;
        const transitionDuration = this._renderCount ? 500 : 0;

        //  Lines  ---
        const lines = this._svgLinks.selectAll(".link").data(links, function (d) { return getID(d); });
        lines.enter().append("path")
            .attr("class", "link")
            .attr("d", elbow)
            ;
        lines.transition().duration(transitionDuration)
            .attr("d", elbow)
            ;
        lines.exit().remove();

        function elbow(d) {
            return "M" + d.parent.y + "," + d.parent.x
                + "V" + d.x + ", H" + d.y;
        }

        //  Nodes  ---
        const nodes = this._svgNodes.selectAll(".node").data(dataNodes, function (d) { return getID(d); });
        nodes.transition().duration(transitionDuration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
            ;
        const enterNodes = nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
            .call(this._selection.enter.bind(this._selection))
            .each(function () {
                const element = d3Select(this);
                element.append("rect")
                    .attr("height", boxSize)
                    .attr("width", boxSize)
                    .on("click", function (d: any) {
                        if (context._collapsed[getID(d)]) {
                            delete context._collapsed[getID(d)];
                        } else if (d.children) {
                            context._collapsed[getID(d)] = true;
                        }
                        context.lazyRender();
                    })
                    ;
                element.append("text");
            })
            .style("opacity", 0)
            ;
        enterNodes.transition()
            .style("opacity", 1)
            ;
        enterNodes.merge(nodes).select("rect")
            .attr("x", -boxSize / 2)
            .attr("y", -boxSize / 2)
            .style("fill", color)
            ;
        enterNodes.merge(nodes).select("text")
            .attr("dx", boxSize / 2 + 4 + "px")
            .attr("dy", "0.33em")
            .text(function (d) { return d.data.label; })
            ;
        nodes.exit().transition()
            .style("opacity", 0)
            .remove()
            ;

        if (!this._renderCount) {
            context.zoomToFit();
        }

        function color(d) {
            return context._collapsed[getID(d)] ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }
    }

    xmlColumn_exists: () => boolean;

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  SimpleSelectionMixin
    _selection;
}
Indented.prototype._class += " tree_Indented";
Indented.prototype.implements(ITree.prototype);
Indented.prototype.mixin(Utility.SimpleSelectionMixin);
Indented.prototype.Column = IndentedColumn;

function xmlToJson(xml, id = "") {
    const retVal = {
        id,
        label: "",
        attributes: {},
        children: []
    };

    retVal.label = xml.nodeName;
    if (xml.nodeType === 1) { // element
        if (xml.attributes.length > 0) {
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                retVal.attributes[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        retVal.label = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const child = xmlToJson(item, id + "[" + retVal.children.length + "]");
            retVal.children.push(child);
        }
    }
    return retVal;
}

export interface IndentedColumn {
    column(): string;
    column(_: string): this;
}
IndentedColumn.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

export interface Indented {
    xmlColumn(): string;
    xmlColumn(_: string): this;
    mappings(): IndentedColumn[];
    mappings(_: IndentedColumn[]): this;
    barHeight(): number;
    barHeight(_: number): this;
}
Indented.prototype.publish("xmlColumn", null, "set", "Field", function () { return this.columns(); }, { optional: true });
Indented.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: IndentedColumn, disable: (w) => w.xmlColumn_exists() });
Indented.prototype.publish("barHeight", 16, "number", "Bar height");
