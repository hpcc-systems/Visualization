import { HTMLWidget, publish } from "@hpcc-js/common";
import { SplitPanel } from "@hpcc-js/phosphor";
import * as marked from "marked";
import { SourceSample } from "./sourceSample.js";

export class HPCCMarkdown extends HTMLWidget {

    private _renderer = new marked.Renderer();
    private _origCode = this._renderer.code;
    private _codeSamples: Array<{ targetID: string, text: string, splitPanel?: SplitPanel }> = [];
    private _placeholderID = 0;

    @publish("", "string")
    markdown: publish<this, string>;

    constructor() {
        super();
        this._renderer.code = (text: string, infostring: string, escaped: boolean) => {
            switch (infostring) {
                case "javascript":
                    const targetID = `placeholder-${++this._placeholderID}`;
                    this._codeSamples.push({ targetID, text });
                    return `<div id="${targetID}" class="codeSample"></div>`;
                default:
                    return this._origCode.call(this._renderer, text, infostring, escaped);
            }
        };
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    private _prevMarkdown;
    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevMarkdown !== this.markdown()) {
            this._prevMarkdown = this.markdown();
            this._codeSamples = [];
            element.html(marked(this.markdown(), { renderer: this._renderer }));
            this._codeSamples.forEach(cs => {
                cs.splitPanel = new SourceSample()
                    .target(cs.targetID)
                    .javascript(cs.text)
                    .render()
                    ;
            });
        } else {
            this._codeSamples.forEach(cs => {
                if (cs.splitPanel) {
                    cs.splitPanel
                        .width(this.width())
                        .lazyRender()
                        ;
                }
            });
        }
    }
}
