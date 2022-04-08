import { HPCCResizeElement, attribute, ChangeMap, customElement, css, display, html, ref, WebComponent } from "@hpcc-js/wc-core";
import { HPCCCodemirrorElement } from "@hpcc-js/wc-editor";

const devMappings = {
    "@hpcc-js/wc-core": "/components/core/src/index.ts",
    "@hpcc-js/wc-editor": "/components/editor/src/index.ts",
    "@hpcc-js/wc-gauge": "/components/gauge/src/index.ts",
    "@hpcc-js/wc-layout": "/components/layout/src/index.ts",
    "@hpcc-js/wc-legacy": "/components/legacy/src/index.ts",
    "@hpcc-js/wc-observable": "/components/observable/src/index.ts",
    "@hpcc-js/wc-pie": "/components/pie/src/index.ts",
    "@hpcc-js/wc-preview": "/components/preview/src/index.ts",
    "@hpcc-js/wc-sankey": "/components/sankey/src/index.ts",
    "@hpcc-js/wc-treemap": "/components/treemap/src/index.ts",
    "@hpcc-js/util": "/packages/util/src/index.ts",
    "@hpcc-js/common": "/packages/common/src/index.ts",
    "@hpcc-js/api": "/packages/api/src/index.ts",
    "@hpcc-js/chart": "/packages/chart/src/index.ts",
    "@hpcc-js/codemirror": "/packages/codemirror/src/index.ts",
    "@hpcc-js/dgrid": "/packages/dgrid/src/index.ts",
    "@hpcc-js/dgrid2": "/packages/dgrid2/src/index.ts",
    "@hpcc-js/graph": "/packages/graph/src/index.ts",
    "@hpcc-js/layout": "/packages/layout/src/index.ts",
    "@hpcc-js/map": "/packages/map/src/index.ts",
    "@hpcc-js/map-deck": "/packages/map-deck/src/index.ts",
    "@hpcc-js/observable-md": "/packages/observable-md/src/index.ts",
    "@hpcc-js/react": "/packages/react/src/index.ts",
    "@hpcc-js/timeline": "/packages/timeline/src/index.ts",
    "@hpcc-js/tree": "/packages/tree/src/index.ts",
};

const prodMappings = {
    "@hpcc-js/wc-core": "/Visualization/assets/wc-core.js",
    "@hpcc-js/wc-editor": "/Visualization/assets/wc-editor.js",
    "@hpcc-js/wc-gauge": "/Visualization/assets/wc-gauge.js",
    "@hpcc-js/wc-layout": "/Visualization/assets/wc-layout.js",
    "@hpcc-js/wc-legacy": "/Visualization/assets/wc-legacy.js",
    "@hpcc-js/wc-observable": "/Visualization/assets/wc-observable.js",
    "@hpcc-js/wc-pie": "/Visualization/assets/wc-pie.js",
    "@hpcc-js/wc-preview": "/Visualization/assets/wc-preview.js",
    "@hpcc-js/wc-sankey": "/Visualization/assets/wc-sankey.js",
    "@hpcc-js/wc-treemap": "/Visualization/assets/wc-treemap.js",
    "@hpcc-js/util": "/Visualization/assets/util.js",
    "@hpcc-js/common": "/Visualization/assets/common.js",
    "@hpcc-js/api": "/packages/assets/api.js",
    "@hpcc-js/chart": "/Visualization/assets/chart.js",
    "@hpcc-js/codemirror": "/Visualization/assets/codemirror.js",
    "@hpcc-js/dgrid": "/Visualization/assets/dgrid.js",
    "@hpcc-js/dgrid2": "/Visualization/assets/dgrid2.js",
    "@hpcc-js/graph": "/Visualization/assets/graph.js",
    "@hpcc-js/layout": "/Visualization/assets/layout.js",
    "@hpcc-js/map": "/Visualization/assets/map.js",
    "@hpcc-js/map-deck": "/Visualization/assets/map-deck.js",
    "@hpcc-js/observable-md": "/Visualization/assets/observable-md.js",
    "@hpcc-js/react": "/Visualization/assets/react.js",
    "@hpcc-js/timeline": "/Visualization/assets/timeline.js",
    "@hpcc-js/tree": "/Visualization/assets/tree.js",
};

function calcImport(dev: boolean, script: string) {
    const mappings = dev ? devMappings : prodMappings;

    const retVal = {
        script,
        css: ""
    };
    for (const key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            const parts = retVal.script.split(`"${key}"`);
            retVal.script = parts.join(`"${mappings[key]}"`);
            if (!dev && parts.length > 1) {
                retVal.css += `<link rel="stylesheet" href="${mappings[key].split(".js").join(".css")}">\n`;
            }
        }
    }
    return retVal;
}

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
            const imports = calcImport(this._vitepress, this._cm.text);
            this._iframeDiv.innerHTML = "";
            this._iframe = document.createElement("iframe");
            this._iframe.style.border = this.preview_border;
            this._iframe.width = "100%";
            this._iframe.height = `${this.clientHeight * this.preview_height_ratio}`;
            this._iframeDiv.append(this._iframe);
            this._iframe.contentWindow?.document.open();
            this._iframe.contentWindow?.document.write(`\
<head>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common@2.65.0/font-awesome/css/font-awesome.min.css">
    ${imports.css}
    <style>
        body {
            margin: 0;
        }
    </style>
</head>

<body style="overflow:hidden">

<div id="preview">
${imports.script}
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
