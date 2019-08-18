import { HTMLWidget, Meta, publish, select as d3Select, Widget } from "@hpcc-js/common";
import { SplitPanel } from "@hpcc-js/phosphor";
import * as marked from "marked";
import * as prism from "prismjs";
import { SourceSample } from "./sourceSample.js";

marked.setOptions({
    highlight(code, lang) {
        if (!prism.languages.hasOwnProperty(lang)) {
            // Default to markup if it's not in our extensions.
            lang = 'markup';
        }

        return prism.highlight(code, prism.languages[lang], lang);
    }
});

type ClassID = "sample" | "sample-code" | "publish-properties";

interface Placeholder {
    targetID: string;
    classID: ClassID;
    infostring: string;
    text: string;
    splitPanel?: SplitPanel;
}

export class HPCCMarkdown extends HTMLWidget {

    private _renderer = new marked.Renderer();
    private _origCode = this._renderer.code;
    private _codeSamples: Placeholder[] = [];
    private _placeholderID = 0;

    @publish("", "string")
    markdown: publish<this, string>;

    constructor() {
        super();
        this._renderer.code = (text: string, infostring: string, escaped: boolean) => {
            switch (infostring) {
                case "sample":
                case "sample-code":
                    return this.renderPlaceholder(infostring, infostring, text);
                default:
                    if (infostring.indexOf("@hpcc-js") === 0) {
                        return this.renderPlaceholder("publish-properties", infostring, text);
                    }
            }
            return this._origCode.call(this._renderer, text, infostring, escaped);
        };
    }

    renderPlaceholder(classID: ClassID, infostring: string, text: string): string {
        const targetID = `placeholder-${++this._placeholderID}`;
        this._codeSamples.push({ targetID, classID, infostring, text });
        return `<div id="${targetID}" class="${classID}"></div>`;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    updateSampleCode(cs: Placeholder) {
        cs.splitPanel = new SourceSample()
            .target(cs.targetID)
            .javascript(cs.text)
            .render()
            ;
    }

    parseClassID(classID: string): [string, string] {
        const [moduleName, className] = classID.split("_");
        return [`@hpcc-js/${moduleName}`, className];
    }

    extends(w: Widget): [string, string] {
        const classParts = w.class().split(" ");
        classParts.pop();
        return this.parseClassID(classParts.pop());
    }

    updatePublishProperties(cs: Placeholder) {
        const [module, widget] = cs.infostring.split(":");
        import(module).then(mod => {
            const md: string[] = [];
            const w = new mod[widget]();
            const derivedFrom = this.extends(w);
            md.push(`Derived from:  ${derivedFrom[1]} (${derivedFrom[0]})\n`);
            const pp: Meta[] = w.publishedProperties(false, true);
            pp.forEach(meta => {
                md.push(`### ${meta.id}\n`);
                md.push(`_${meta.description}_\n`);
                md.push(`* **type**: ${meta.type}`);
                md.push(`* **optional**: ${!!meta.ext.optional}`);
                md.push(`* **default**: ${JSON.stringify(meta.defaultValue)} `);
                if (meta.type === "set") {
                    md.push(`* **options**: ${JSON.stringify(meta.set)} `);
                }
                md.push("");
            });

            d3Select(`#${cs.targetID} `).html(marked(md.join("\n")));
        });
    }

    private _prevMarkdown;
    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevMarkdown !== this.markdown()) {
            this._prevMarkdown = this.markdown();
            this._codeSamples = [];
            element.html(marked(this.markdown(), { renderer: this._renderer }));
            this._codeSamples.forEach(cs => {
                switch (cs.classID) {
                    case "sample-code":
                        this.updateSampleCode(cs);
                        break;
                    case "publish-properties":
                        this.updatePublishProperties(cs);
                        break;
                }
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
