import { HPCCResizeElement, attribute, property, ChangeMap, customElement, display, html, ref, WebComponent } from "@hpcc-js/wc-core";
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { syntaxHighlighting } from "@codemirror/language";
import { html as cmHtml } from "@codemirror/lang-html";
import { json as cmJson } from "@codemirror/lang-json";
import { javascript as cmJavaScript } from "@codemirror/lang-javascript";
import { basicSetup } from "./basicSetup";
import { oneDarkTheme, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";

const template = html<HPCCCodemirrorElement>`\
<div ${ref("_div")}>
</div>`;

const styles = `\
${display("inline-block")}

:host {
}

.cm-editor {
    border: 1px solid #ddd;
}
`;

@customElement("hpcc-codemirror", { template, styles })
export class HPCCCodemirrorElement extends HPCCResizeElement {

    /**
     * Text to be displayed in the editor
     *
     * @typeParam html - HTML document
     * @typeParam JSON - JSON document
     *
     * @defaultValue html
     */
    @attribute mode: "html" | "json" | "javascript" = "html";

    /**
     * Text to be displayed in the editor
     *
     * @typeParam light - Light theme
     * @typeParam dark - Dark theme
     *
     * @defaultValue light
     */
    @attribute theme: "light" | "dark" = "light";

    /**
   * Text to be displayed in the editor
   */
    @property text: string = "";
    private _text: string;

    private _cmLight = EditorView.baseTheme({});
    private _cmDakrHighlight = syntaxHighlighting(oneDarkHighlightStyle);
    private _cmJson = cmJson();
    private _cmHtml = cmHtml();
    private _cmJavaScript = cmJavaScript();

    _div: HTMLDivElement;
    protected _view: EditorView;

    constructor() {
        super();
    }

    protected extensions(): Extension[] {
        const retVal: Extension[] = [basicSetup];
        switch (this.mode) {
            case "javascript":
                retVal.push(this._cmJavaScript);
                break;
            case "json":
                retVal.push(this._cmJson);
                break;
            case "html":
            default:
                retVal.push(this._cmHtml);
                break;
        }
        switch (this.theme) {
            case "dark":
                retVal.push(oneDarkTheme);
                retVal.push(this._cmDakrHighlight);
                break;
            case "light":
            default:
                retVal.push(this._cmLight);
                break;
        }
        return retVal;
    }

    enter() {
        super.enter();
        this._view = new EditorView({
            extensions: this.extensions(),
            parent: this._div,
            dispatch: (tr) => {
                this._view.update([tr]);
                if (!tr.changes.empty) {
                    this._text = this._view.state.doc.toString();
                    this.$emit("change", this._text);
                }
            }
        });
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this._view.dom.style.height = `${this.clientHeight}px`;
        if (changes.mode || changes.theme) {
            this._view.dispatch({
                reconfigure: {
                    full: this.extensions(),
                }
            } as any);
        }
        if (changes.text) {
            this._view.dispatch({
                changes: {
                    from: 0,
                    to: this._view.state.doc.length,
                    insert: this.text
                }
            });
        }
    }

    exit() {
        this._view.destroy();
        super.exit();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-codemirror"]: WebComponent<HPCCCodemirrorElement, "change">;
        }
    }
}
