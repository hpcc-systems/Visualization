import { HTMLWidget, publish, select as d3Select } from "@hpcc-js/common";

interface Node {
    path: string;
    name: string;
    type: "folder" | "file";
    children?: Node[];
}

const sampleIdx: { [path: string]: Node } = {};
const sampleFolders: Node[] = [];
const sampleFiles = [];
function index(node: Node, parentName: string = "") {
    const fullName = parentName ? `${parentName}/${node.name}` : node.name;
    sampleIdx[node.path] = node;
    switch (node.type) {
        case "file":
            sampleFiles.push(node);
            break;
        case "folder":
            sampleFolders.push({
                ...node,
                name: fullName
            });
            node.children.forEach(row => index(row, fullName));
            break;
    }
}
// @ts-ignore
index(window.config.samples);

function href(html, path, name, style = "") {
    const total = sampleFiles.filter(file => file.path.indexOf(path) === 0).length;
    return `<a href="./${html}.html?${path}" style="${style}">${name} (${total})</a>`;
}

function hrefPath(path: string, depth = 1) {
    const folders = path.split("/");
    const file = folders.pop();
    const baseUrl: string[] = [];
    const retVal: string[] = [];
    folders.forEach((folder, idx) => {
        if (idx >= depth) {
            retVal.push(href("gallery", `${baseUrl.join("/")}/${folder}`, folder));
        }
        baseUrl.push(folder);
    });
    const total = sampleFiles.filter(file => file.path.indexOf(path) === 0).length;
    retVal.push(total > 1 ? `${file} (${total})` : file);
    return retVal.join(" > ");
}

export class App extends HTMLWidget {

    @publish("", "string")
    _default: string;

    _navDiv;
    _body;
    _selectionStack = [];
    _maxSampleSize = [480, 360];
    _sampleMode = "large";

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._navDiv = element.append("h3")
            .style("position", "absolute")
            .style("left", "0px")
            .style("top", "0px")
            .style("right", "0px")
            .style("height", "32px")
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
            const defaultRow = sampleFolders.filter(row => row.path.indexOf(this._default) === 0)[0] || sampleFolders[0];
            this.navChanged({ text: defaultRow.name, value: defaultRow.path }, "text", true);
        }
    }

    resize(size) {
        const retVal = super.resize(size);
        const sampleSize = this.getSampleItemSizes();
        this._body.selectAll(".sampleItem").each(function() {
            d3Select(this)
                .style("width", `${sampleSize[0]}px`)
                .select("iframe")
                .attr("width", `${sampleSize[0]}px`)
                .attr("height", `${sampleSize[1]}px`);
        });
        return retVal;
    }

    getSampleItemSizes() {
        if (this._sampleMode === "large") {
            return [(this._size.width * 0.38), (this._size.height * 0.38)];
        } else if (this._sampleMode === "small") {
            return [(this._size.width * 0.38 * 0.62), (this._size.height * 0.38 * 0.62)];
        }
        return [this._size.width * 0.1, this._size.height * 0.1];
    }

    navChanged(row, col, sel) {
        const node = sampleIdx[row.value];
        this._navDiv.html(hrefPath(row.value));
        const depth = row.value.split("/").length;
        history.pushState(undefined, undefined, `gallery.html?${node.path}`);
        const data = node.children.map(d => {
            switch (d.type) {
                case "file":
                    return d;
                case "folder":
                    const childFiles = sampleFiles.filter(file => file.path.indexOf(d.path) === 0);
                    const idx = Math.floor(Math.random() * childFiles.length);
                    return {
                        ...childFiles[idx],
                        children: d.children
                    };
            }
            return undefined;
        }).filter(d => !!d);
        const samples = this._body.selectAll(".sampleItem").data(data, d => d.path);
        const size = this.getSampleItemSizes();
        const width = size[0];
        const height = size[1];
        const samplesEnter = samples.enter().append("div")
            .attr("class", "sampleItem")
            .style("display", "inline-block")
            .style("margin", "4px")
            .style("width", `${width}px`)
            .style("border", "solid")
            .style("border-width", "1px")
            ;

        samplesEnter.append("iframe")
            .attr("title", d => d.name)
            .attr("width", "100%")
            .attr("height", `${height}px`)
            .style("border-style", "none")
            .merge(samples)
            .each(function (d, i) {
                //  Stagger the loading ever so slightly...
                setTimeout(() => {
                    d3Select(this)
                        .attr("src", `./galleryItem.html?${d.path}`)
                        ;
                }, i * 333);
            })
            ;

        const titleDiv = samplesEnter.append("div")
            .style("height", "20px")
            ;
        titleDiv.append("h4")
            .style("float", "left")
            .style("margin-top", "0px")
            .style("margin-left", "4px")
            .style("margin-bottom", "0px")
            .html(d => hrefPath(d.path, depth))
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
