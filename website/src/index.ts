import { HPCCIndex } from "./hpccIndex.js";
import { HPCCScrollNav } from "./hpccScrollNav.js";
import { Markdown } from "./markdown.js";

// @ts-ignore
import * as indexJson from "../src-umd/index.json";

function getJsonFromUrl(url: string = location.search) {
    const query = url.substr(1);
    const result = {};
    query.split("&").forEach(function (part) {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

export function initPage() {
    const leftnavData = transformIndexJson(indexJson);
    const leftnav = new HPCCIndex()
        .target("leftnav")
        .data(leftnavData)
        .render()
        ;
    const content = new Markdown()
        .target("content")
        .markdown("")
        .render()
        ;
    const rightnav = new HPCCScrollNav()
        .target("rightnav")
        .data([])
        .render()
        ;
    content.scroll = function() {
        console.log("arguments", arguments);
        // TODO - move rightnav marker to section as the user scrolls
    };
    leftnav.on("clicked", (path: string) => {
        import("../" + path).then(md => {
            content
                .markdown(md)
                .lazyRender(w => {
                    rightnav
                        .data(w._anchors)
                        .render()
                        ;
                })
                ;
        });
    });

    const params: any = getJsonFromUrl();
    if (params.doc) {
        import(params.doc).then(md => {
            content
                .markdown(md)
                .render()
                ;
        });
    }
    return {
        leftnav,
        content,
        rightnav
    };
}

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
