import { HPCCIndex } from "./hpccIndex.js";
import { HPCCScrollNav } from "./hpccScrollNav.js";
import { Markdown } from "./markdown.js";

// @ts-ignore
import * as indexJson from "../src-umd/index.json";

function transformIndexJson(indexJson) {
    const leftnavMap = {};
    const leftnavData = [];
    indexJson.map(row => {
        const { path } = row;
        const sp = path.split("packages/");
        if (sp.length > 1) {
            const sp2 = sp[1].split("/");
            if (sp2.length > 2) {
                const _package = sp2[0];
                const _widget = sp2[2].replace(".md", "");
                const _module = "@hpcc-js/" + _package;
                if (!leftnavMap[_module]) {
                    leftnavMap[_module] = leftnavData.length;
                    leftnavData.push({
                        label: _module,
                        children: []
                    });
                }
                leftnavData[leftnavMap[_module]].children.push({
                    label: _widget,
                    path
                });
            } else {
                _parseFail();
            }
        } else {
            _parseFail();
        }
        function _parseFail() {
            const label = _longestSegment(path).split(".")[0];
            if (!leftnavMap[path]) {
                leftnavMap[path] = leftnavData.length;
                leftnavData.push({
                    label,
                    path,
                    children: []
                });
            }
            leftnavData[leftnavMap[path]].children.push({
                label,
                path
            });
            function _longestSegment(path) {
                return path.split("/").sort((a, b) => b.length - a.length)[0];
            }
        }
    });
    return leftnavData;
}

export function showPage(path) {
    const content = (document.querySelector("#content .common_Widget") as any).__data__;
    const rightnav = (document.querySelector("#rightnav .common_Widget") as any).__data__;
    import("../../" + path).then(md => {
        content
            .markdown(md)
            .lazyRender(w => {
                rightnav
                    .data(w._anchors)
                    .render()
                    ;
            })
            ;
    }).catch(e => {
        content
            .markdown(`\
# File not found

Unable to locate:  \`"${path}"\`
`)
            .lazyRender(w => {
                rightnav
                    .data([])
                    .render()
                    ;
            })
            ;
    });
}

export class App {
    leftnavData = transformIndexJson(indexJson);
    leftnav = new HPCCIndex()
        .target("leftnav")
        .data(this.leftnavData)
        .render()
        ;
    content = new Markdown()
        .target("content")
        .markdown("")
        .render()
        ;
    rightnav = new HPCCScrollNav()
        .target("rightnav")
        .data([])
        .render()
        ;

    constructor() {
        this.content.scroll = function () {
            console.log("arguments", arguments);
            // TODO - move rightnav marker to section as the user scrolls
        };

        this.leftnav.on("clicked", (path: string) => {
            window.location.hash = path;
        });

        if (window.location.hash) {
            this.hashChange();
        } else {
            window.location.hash = "docs/index.md";
        }
    }

    _prevHash = "";
    hashChange() {
        let hash = window.location.hash.substr(1);
        const parts = this._prevHash.split("/");
        parts.pop();
        if (hash.indexOf("../") === 0) {
            while (hash.indexOf("../") === 0) {
                parts.pop();
                hash = hash.substr(3);
            }
            hash = parts.join("/") + (parts.length ? "/" : "") + hash;
            window.history.replaceState(undefined, undefined, window.location.pathname + "#" + hash);
        } else if (hash.indexOf("./") === 0) {
            hash = parts.join("/") + hash.substr(1);
            window.history.replaceState(undefined, undefined, window.location.pathname + "#" + hash);
        }
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            showPage(hash);
        }
    }
}
