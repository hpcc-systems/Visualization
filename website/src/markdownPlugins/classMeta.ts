import { HTMLWidget } from "@hpcc-js/common";
import * as marked from "marked";

export class ClassMeta extends HTMLWidget {

    constructor() {
        super();
    }

    infostring(): string {
        return this.data()[0][0];
    }

    text(): string {
        return this.data()[0][1];
    }

    update(domNode, element) {
        super.update(domNode, element);
        const json = JSON.parse(this.text());
        const md: string[] = [];
        if (json.source) {
            md.push(`[source](${json.source})`);
        }
        element.html(marked(md.join("\n")));
    }
}
