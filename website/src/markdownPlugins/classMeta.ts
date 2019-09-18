import { HTMLWidget } from "@hpcc-js/common";
import * as marked from "marked";

const _renderer = new marked.Renderer();
const _origLink = _renderer.link;

const AlphaNum = "_abcdefghijklmnopqrstufwxyz0123456789";

function replaceAt(str: string, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

//  Link override ---
_renderer.link = (href: string, title: string, text: string): string => {
    const extLink = href.indexOf("http") === 0 || href.indexOf("file") === 0 || href.indexOf("api/") === 0;
    let retVal = _origLink.call(_renderer, (extLink ? "" : "#") + href, title, text);
    if (extLink) {
        retVal = retVal.replace('">', '" target="_blank">');
    }
    return retVal;
};

export class ClassMeta extends HTMLWidget {

    constructor() {
        super();
    }

    infostring(): string {
        return this.data()[0][0].substr("meta:".length);
    }

    text(): string {
        return this.data()[0][1];
    }

    safeLabel(_label: string) {
        let label = _label.toLowerCase();
        for (let i = 0; i < label.length; ++i) {
            if (AlphaNum.indexOf(label[i]) < 0) {
                label = replaceAt(label, i, "_");
            }
        }
        return label;
    }

    type(type?: any): string {
        if (!type) return "";
        switch (type.type) {
            case "union":
                return type.types.map(t => t.name).join(" | ");
            case "array":
                return type.elementType.name + "[]";
            case "reference":
                const json = JSON.parse(this.text());
                if (json.sources && json.sources.length) {
                    const source = json.sources[0];
                    const fileName = `"${source.fileName.substr(0, source.fileName.length - 3)}"`;
                    return `[${type.name}](api/common/modules/${this.safeLabel(fileName)}.html#${this.safeLabel(type.name)})`;
                }
            //  fallthrough
            case "intrinsic":
            default:
                return type.name;
        }
    }

    params(parameters?: any[]): string[] {
        if (!parameters) return [];
        return parameters.map(param => `${param.name}${param.flags.isOptional ? "?" : ""}: ${this.type(param.type)}`);
    }

    update(domNode, element) {
        super.update(domNode, element);
        const json = JSON.parse(this.text());
        const md: string[] = [];
        if (json.signatures) {
            json.signatures.forEach(sig => {
                md.push(`**${json.name}**(${this.params(sig.parameters).join(", ")}): ${this.type(sig.type)}`);
                md.push("");
            });
        }
        if (json.folder && json.sources && json.sources.length) {
            const source = json.sources[0];
            if (source.fileName.indexOf(".d.ts") < 0) {
                md.push(`Defined in [${source.fileName}:${source.line}](https://github.com/hpcc-systems/Visualization/blob/master/${json.folder}/src/${source.fileName}#L${source.line})`);
            }
        }
        element.html(marked(md.join("\r\n"), {
            renderer: _renderer
        }));
    }
}
ClassMeta.prototype._class = "";
