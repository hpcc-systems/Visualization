import { HPCCResizeElement, attribute, customElement, css, ChangeMap, html, ref, display, WebComponent } from "@hpcc-js/wc-core";

const template = html<HPCCPaneElement>`\
<div ${ref("_div")}>
    <slot></slot>
</div>`;

const styles = css`
${display("inline-block")} 
`;

@customElement("hpcc-pane", { template, styles })
export class HPCCPaneElement extends HPCCResizeElement {

    _div: HTMLDivElement;

    constructor() {
        super();
    }

    enter() {
        super.enter();
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this._div.style.width = `${this.clientWidth}px`;
        this._div.style.height = `${this.clientHeight}px`;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-Pane"]: WebComponent<HPCCPaneElement, "change">;
        }
    }
}
