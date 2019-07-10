import { HTMLWidget } from "@hpcc-js/common";
import * as _marked from "marked";

const marked = _marked;

export class Markdown extends HTMLWidget {
    constructor() {
        super();
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.html(marked(this.markdown()));
    }
}
Markdown.prototype._class += " other_Markdown";

Markdown.prototype.publish("markdown", "", "string", "Sets the string to be rendered as markdown text", null, { tags: ["Basic"] });

export interface Markdown {
    markdown(): string;
    markdown(_: string): this;
}
