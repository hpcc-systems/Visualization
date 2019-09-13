import { HTMLWidget, select as d3Select } from "@hpcc-js/common";

import "../src/hpccIndex.css";

export class HPCCIndex extends HTMLWidget {

    private _ul;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._ul = element.append("ul")
            .attr("class", "hpccIndex-ul")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        const context = this;
        const items = this._ul.selectAll(".indexItem").data(this.data(), d => d.path);

        items.enter().append("li")
            .attr("class", "indexItem")
            .each(function (d) {
                const li = d3Select(this);
                const div = li.append("div")
                    .attr("class", "hpccIndex-label-div")
                    ;
                div
                    .append("span")
                    .text(d.children.length > 1 ? d.label : d.children[0].label)
                    ;
                if (d.children.length > 1) {
                    div
                        .on("click", () => {
                            li.classed("hpccIndex-collapsed", !li.classed("hpccIndex-collapsed"));
                        })
                        ;
                    const ul = li.append("ul")
                        .attr("class", "hpccIndex-sub-ul")
                        ;
                    const subSelection = ul
                        .selectAll(".hpccIndex-sub-li")
                        .data(d.children, (_d: any) => _d.label)
                        ;
                    subSelection.enter()
                        .append("li")
                        .attr("class", "hpccIndex-sub-li")
                        .on("click", (_d: any) => context.clicked(_d.path))
                        .merge(subSelection as any)
                        .text((_d: any) => {
                            return _d.label;
                        })
                        ;
                    div.append("i")
                        .attr("class", "fa fa-chevron-down")
                        ;
                } else {
                    div
                        .on("click", (_d: any) => {
                            console.log("_d", _d);
                            context.clicked(_d.children[0].path);
                        })
                        ;
                }
            })
            ;
        items.exit().remove();
    }

    clicked(path: string) {
    }
}
HPCCIndex.prototype._class += " website_HPCCIndex";
