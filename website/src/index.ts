import { HTMLWidget } from "@hpcc-js/common";
import { SplitPanel } from "@hpcc-js/phosphor";
import { Markdown } from "./markdown.js";

// @ts-ignore
import * as indexJson from "../src-umd/index.json";

class HPCCIndex extends HTMLWidget {

    private _ul;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._ul = element.append("ul");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const items = this._ul.selectAll(".indexItem").data(this.data(), d => d.path);
        items.enter().append("li")
            .attr("class", "indexItem")
            .on("click", d => this.clicked(d.path))
            .merge(items)
            .text(d => d.path)
            ;
        items.exit().remove();
    }

    clicked(path: string) {
    }
}

export class IndexPanel extends SplitPanel {

    private _index = new HPCCIndex()
        .on("clicked", (path: string) => {
            import("../" + path).then(md => {
                this._markdown
                    .markdown(md)
                    .lazyRender()
                    ;
            });
        })
        ;

    private _markdown = new Markdown();

    constructor() {
        super("horizontal");
        this
            .addWidget(this._index)
            .addWidget(this._markdown)
            .relativeSizes([0.3, 0.7])
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        this._index.data(this.data());
        super.update(domNode, element);
    }
}

export function createIndexPanel(placeholder: string) {
    return new IndexPanel()
        .target(placeholder)
        .data(indexJson)
        .render()
        ;
}
