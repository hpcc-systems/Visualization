import { hpccRequire, placeholder } from "./util";

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
        const hpccCodemirror = await hpccRequire("@hpcc-js/codemirror");

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
            .render()
            ;
    };
}

export const editor = {
};

for (const key in Editors) {
    editor[key] = editorFactory(Editors[key]);
}
