import * as  hpccCodemirror from "@hpcc-js/codemirror";
import { editorDiv } from "./util";

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
        // const hpccCodemirror = await import("@hpcc-js/codemirror");

        const editor = new hpccCodemirror[type]()
            .on("changes", () => {
                _div.notify(editor.text());
            })
            ;

        const _div = editorDiv(editor, props);

        yield _div;

        _div.widget
            .target(_div)
            .lazyRender()
            ;
    };
}

export const editor = {
};

for (const key in Editors) {
    editor[key] = editorFactory(Editors[key]);
}
