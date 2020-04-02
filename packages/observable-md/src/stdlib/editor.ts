import { require as d3Require } from "d3-require";
import { placeholder } from "./util";

const Editors = {
    ecl: "ECLEditor",
    css: "CSSEditor",
    dot: "DOTEditor",
    html: "HTMLEditor",
    javascript: "JSEditor",
    json: "JSONEditor",
    markdown: "MarkdownEditor",
    xml: "XMLEditor"
};

function editorFactory(type) {
    return async function* (props: { height?: number, [key: string]: any } = {}) {
        const hpccCodemirror = await d3Require("@hpcc-js/codemirror");

        const { div, widget } = placeholder(new hpccCodemirror[type](), props, false, false);

        div.text = (text: string) => {
            widget.text(text);
            return div;
        };

        widget
            .on("changes", () => {
                div.value = widget.text();
                div.dispatchEvent(new CustomEvent("input"));
            })
            ;

        yield div;

        widget
            .target(div)
            .lazyRender()
            ;
    };
}

export const editor = {
};

for (const key in Editors) {
    editor[key] = editorFactory(Editors[key]);
}
