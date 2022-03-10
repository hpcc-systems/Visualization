import { HPCCResizeElement, attribute, ChangeMap, customElement, css, display, html, ref, WebComponent } from "@hpcc-js/wc-core";
import { HPCCCodemirrorElement } from "@hpcc-js/wc-editor";

const template = html<HPCCVitepressElement>`\
<div ${ref("_iframeDiv")}>
</div>
<hpcc-codemirror ${ref("_cm")}></hpcc-codemirror>`;

const styles = css`
${display("inline-block")} 

:host > div {
    flex-direction: column;
}

:host > div > div {
    padding-bottom: 4px;
}

:host > div > hpcc-codemirror {
    padding-top: 4px;
}
`;

@customElement("hpcc-vitepress", { template, styles })
export class HPCCVitepressElement extends HPCCResizeElement {

    /**
     * Border style for the preview iframe
     *
     * @defaultValue "1px solid #ccc"
    */
    @attribute preview_border = "1px solid #ccc";

    /**
     * Force full reload of iframe, on each change.
     * 
     * @defaultValue ""
     */
    @attribute head_ext = "";

    /**
     * Content to be displayed in the preview iframe
     * 
     * @defaultValue ""
     */
    @attribute content = "";

    /**
     * Split ratio between the preview and the code editor
     * 
     * @defaultValue 1/3
     */
    @attribute preview_height_ratio = 2 / 3;

    protected _iframeDiv: HTMLDivElement;
    protected _iframe: HTMLIFrameElement;
    protected _cm: HPCCCodemirrorElement;
    protected _vitepress: boolean = false;

    gatherScripts(node: HTMLElement, scripts: string[]) {
        Array.prototype.slice
            .call(node.children, 0)
            .filter((child) => child !== this)
            .filter((child) => {
                return child.tagName !== "hpcc-preview".toUpperCase();
            })
            .forEach((child) => {
                if (child.tagName === "SCRIPT") {
                    if (child.src.indexOf("/@fs/") >= 0) {
                        this._vitepress = true;
                    }
                    scripts.push(child.outerHTML.toString());
                }
                // this.gatherScripts(child, scripts);
            });
    }

    protected _head = "";
    protected _scripts: string[] = [];

    enter() {
        super.enter();
        this._head = document.head.innerHTML.toString();
        const codeElements = this.getElementsByTagName("code")[0];
        this._cm.text = codeElements?.innerText ?? "" + this.innerHTML;
        this.gatherScripts(document.body, this._scripts);
        this._cm.addEventListener("change", () => {
            this.content = this._cm.text.trim();
        });
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        if (changes.content) {
            this._iframeDiv.innerHTML = "";
            this._iframe = document.createElement("iframe");
            this._iframe.style.border = this.preview_border;
            this._iframe.width = "100%";
            this._iframe.height = `${this.clientHeight * this.preview_height_ratio}`;
            this._iframeDiv.append(this._iframe);
            this._iframe.contentWindow?.document.open();
            this._iframe.contentWindow?.document.write(`\
<head>

${this._vitepress ? `\
    <script type="module" src="/src/index.ts"></script>
` : `\
    <script src="/Visualization/assets/index.umd.min.js"></script>
`}

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common@2.65.0/font-awesome/css/font-awesome.min.css">
    <style>
        body {
            margin: 0;
        }
    </style>

</head>

<body style="overflow:hidden">

<div id="preview" style="visibility:hidden">
${this._cm.text.trim()}
</div>

<script type="module">
    customElements.whenDefined("hpcc-preview").then(() => {
        document.getElementById("preview").style.visibility = "visible";
    });  
</script>

</body>`);
            this._iframe.contentWindow?.document.close();
        }
        this._cm.style.width = "100%";
        this._cm.style.height = `${this.clientHeight * (1 - this.preview_height_ratio)}px`;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-vitepress"]: WebComponent<HPCCVitepressElement>;
        }
    }
}
