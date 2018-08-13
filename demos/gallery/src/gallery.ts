import { HTMLWidget } from "@hpcc-js/common";
import { Select } from "@hpcc-js/other";

// @ts-ignore
import * as samples from "../samples.json";

interface Node {
    path: string;
    name: string;
    type: "folder" | "file";
    children?: Node[];
}

const sampleIdx: { [path: string]: Node } = {};
const sampleFolders: Node[] = [];
function index(node: Node) {
    sampleIdx[node.path] = node;
    if (node.type === "folder") {
        sampleFolders.push(node);
        node.children.forEach(index);
    }
}
samples.children.forEach(index);

export class App extends HTMLWidget {

    _navDiv;
    _nav = new Select();
    _body;
    _selectionStack = [];

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._navDiv = element.append("div")
            .style("position", "absolute")
            .style("left", "0px")
            .style("top", "0px")
            .style("right", "0px")
            .style("height", "32px")
            ;
        this._nav
            .target(this._navDiv.node())
            .label("Gallery:  ")
            .optional(false)
            .columns(["text", "value"])
            .textColumn("text")
            .valueColumn("value")
            .data(sampleFolders.map(n => [n.name, n.path]))
            .on("click", (row, col, sel) => {
                this.navChanged(row, col, sel);
            })
            .render()
            ;
        this._body = element.append("div")
            .style("position", "absolute")
            .style("left", "0px")
            .style("top", "40px")
            .style("right", "0px")
            .style("overflow-y", "auto")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._body.style("height", `${this.height() - 40}px`);

        if (this.renderCount() === 0) {
            this.navChanged({ text: sampleFolders[0].name, value: sampleFolders[0].path }, "text", true);
        }
    }

    navChanged(row, col, sel) {
        const node = sampleIdx[row.value];
        const samples = this._body.selectAll(".sampleItem").data(node.children.filter(d => d.type === "file"), d => d.path);
        const width = 480;
        const height = 360;
        const samplesEnter = samples.enter().append("div")
            .attr("class", "sampleItem")
            .style("display", "inline-block")
            .style("margin", "4px")
            .style("width", `${width + 8}px`)
            .style("border", "solid")
            .style("border-width", "1px")
            ;

        samplesEnter.append("iframe")
            .attr("title", d => d.name)
            .attr("width", "100%")
            .attr("height", `${height}px`)
            .style("border-style", "none")
            .merge(samples)
            .attr("src", d => `./galleryItem.html?${d.path}`)
            ;

        const titleDiv = samplesEnter.append("div")
            .style("height", "20px")
            ;
        titleDiv.append("h3")
            .style("float", "left")
            .style("margin-top", "0px")
            .style("margin-left", "4px")
            .style("margin-bottom", "0px")
            .text(d => d.name)
            ;

        titleDiv.append("a")
            .style("float", "right")
            .style("margin-right", "4px")
            .attr("href", d => `./playground.html?${d.path}`)
            .text("playground")
            ;

        samples.exit().remove();
    }
}
