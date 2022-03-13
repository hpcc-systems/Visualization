import { HPCCResizeElement, attribute, ChangeMap, customElement, css, display, html, ref, WebComponent } from "@hpcc-js/wc-core";
import { HPCCSplitPanelElement } from "@hpcc-js/wc-layout";
import { HPCCCodemirrorElement } from "@hpcc-js/wc-editor";

const template = html<HPCCPreviewElement>`\
<hpcc-splitpanel orientation="vertical" ${ref("_splitter")} style="width:100%">
    <div ${ref("_iframeDiv")} data-border_width=0 data-padding=0 style="width:100%;height:100%;padding:0px"></div>
    <hpcc-codemirror ${ref("_cm")} data-border_width=0 data-padding=0></hpcc-codemirror>
</hpcc-splitpanel>
<slot ${ref("_slot")}></slot>
`;

const styles = css`
${display("inline-block")} 

:host > slot {
    display: none;
}
`;

@customElement("hpcc-preview", { template, styles })
export class HPCCPreviewElement extends HPCCResizeElement {

    /**
     * Border style for the preview iframe
     *
     * @defaultValue "1px solid #ccc"
    */
    @attribute preview_border = "1px solid #ccc";

    /**
     * Preview Content
     * 
     * @defaultValue ""
     */
    @attribute content = "";

    /**
     * Optional selector for extracting the preview content for the iframe.  
     * e.g. for Vitepress this would be "pre &gt; code"
     * 
     * @defaultValue ""
     */
    @attribute content_selector = "";

    protected _iframeDiv: HTMLDivElement;
    protected _iframe: HTMLIFrameElement;
    protected _splitter: HPCCSplitPanelElement;
    protected _cm: HPCCCodemirrorElement;
    protected _vitepress: boolean = false;

    protected _head = "";
    protected _scripts: string[] = [];

    protected _slot: HTMLSlotElement;

    constructor() {
        super();
    }

    private slotChanged() {
        const slotElements = this.content_selector ? this.querySelectorAll(`${this.content_selector}`) : this._slot.assignedElements();
        let content = "";
        for (let i = 0; i < slotElements.length; ++i) {
            const e = slotElements[i] as HTMLElement;
            content += this.content_selector ? e.innerText : e.outerHTML;
        }
        this.content = content;
    }

    enter() {
        super.enter();
        this.slotChanged();
        this._slot.addEventListener("slotchange", () => this.slotChanged());
        this.addEventListener("mousedown", () => console.log("mousedown"));
        this.addEventListener("mouseup", () => console.log("mouseup"));
        this._cm.text = this.content;
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        if (changes.content) {
            this._iframeDiv.innerHTML = "";
            this._iframe = document.createElement("iframe");
            this._iframe.style.border = this.preview_border;
            this._iframe.style.display = "inline-block";
            this._iframe.width = "100%";
            this._iframe.height = "100%";
            this._iframeDiv.append(this._iframe);
            this._iframe.contentWindow?.document.open();
            this._iframe.contentWindow?.document.write(this.content);
            this._iframe.contentWindow?.document.close();
            this._iframe.addEventListener("load", (ev: any) => {
                const new_style_element = document.createElement("style");
                new_style_element.textContent = "body { margin: 0px }";
                ev.target.contentDocument.head.appendChild(new_style_element);
            });
        }
        this._splitter.style.width = "100%";
        this._splitter.style.height = `${this.clientHeight}px`;
        this._cm.style.width = "100%";
        this._cm.style.height = "100%";
    }

    exit() {
        this._slot.removeEventListener("slotchange", () => this.slotChanged());
        super.exit();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-preview"]: WebComponent<HPCCPreviewElement>;
        }
    }
}
