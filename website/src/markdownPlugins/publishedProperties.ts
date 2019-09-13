import { HTMLWidget, Meta, Widget } from "@hpcc-js/common";
import * as marked from "marked";

export class PublishedProperties extends HTMLWidget {

    constructor() {
        super();
    }

    infostring(): string {
        return this.data()[0][0];
    }

    text(): string {
        return this.data()[0][1];
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

    update(domNode, element) {
        super.update(domNode, element);
        const [module, widget] = this.infostring().split(":");
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
                    const set = typeof meta.set === "function" ? meta.set() : meta.set;
                    md.push(`* **options**: "${set.join('" | "')}" `);
                }
                md.push("");
            });
            element.html(marked(md.join("\n")));
        });
    }
}
PublishedProperties.prototype._class = "";
