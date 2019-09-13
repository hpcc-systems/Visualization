import { HTMLWidget, Widget } from "@hpcc-js/common";
import * as marked from "marked";
import { markdownWidget } from "./markdownPlugins/index.js";

import "../src/markdown.css";

export class Markdown extends HTMLWidget {

    private _renderer = new marked.Renderer();
    private _origCode = this._renderer.code;
    private _codeSamples: Widget[] = [];
    public _anchors = [];

    _markdown: string;

    markdown(): string;
    markdown(_: string): this;
    markdown(_?: string): this | string {
        if (!arguments.length) return this._markdown;
        this._anchors = [];
        this._markdown = _;
        return this;
    }

    scroll() { }

    constructor() {
        super();

        //  Heading override ---
        const context = this;
        this._renderer.heading = function (text, level) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, "");
            context._anchors.push({
                label: text,
                href: "#" + escapedText
            });
            return `\
<h${level}>
    <a id="${escapedText}" class="anchor" href="#${escapedText}">
        <span class="header-link"></span>
    </a>
    ${text}
</h${level}>`;
        };

        //  Code override ---
        this._renderer.code = (text: string, infostring: string, escaped: boolean) => {
            const mdWidget = markdownWidget(infostring, text);
            if (mdWidget) {
                return this.renderPlaceholder(mdWidget);
            }
            return this._origCode.call(this._renderer, text, infostring, escaped);
        };
    }

    renderPlaceholder(mdWidget: Widget): string {
        this._codeSamples.push(mdWidget);
        return `<div id="placeholder${mdWidget.id()}"></div>`;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .style("overflow-x", "hidden")
            .style("overflow-y", "scroll")
            .style("padding", "8px")
            .on("scroll", function () {
                console.log("scroll test");
                context.scroll.apply(this, arguments);
            })
            ;
    }

    private _prevMarkdown;
    update(domNode, element) {
        super.update(domNode, element);
        element.style("height", `${this.height()}px`);
        if (this._prevMarkdown !== this.markdown()) {
            this._prevMarkdown = this.markdown();
            this._codeSamples = [];
            element.html(marked(this.markdown(), { renderer: this._renderer }));
            this._codeSamples.forEach(cs => {
                cs
                    .target(`placeholder${cs.id()}`)
                    .render()
                    ;
            });
        } else {
            this._codeSamples.forEach(async (cs) => {
                await cs.resize().renderPromise();
            });
        }
    }
}
Markdown.prototype._class += " website_Markdown";

Markdown.prototype.publish("markdown", "", "string", "String to be rendered as markdown");
