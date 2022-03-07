import { customElement, css, display, html, ref, ChangeMap, attribute, WebComponent } from "@hpcc-js/wc-core";
import { SplitPanel, Widget } from "@lumino/widgets";
import { HPCCLuminoElement } from "./common";
import { WidgetAdapter } from "./widgetAdapter";
import { splitpanel, widget } from "./styles";

const template = html<HPCCSplitPanelElement>`\
<div ${ref("_div")}>
</div>
<slot ${ref("_slot")}></slot>`;

const styles = css`
${display("inline-block")} 

${widget}
${splitpanel}

.hpcc-LuminoAdapter {
    padding: 8px;
    border: 1px solid #c0c0c0;
}`;

@customElement("hpcc-splitpanel", { template, styles })
export class HPCCSplitPanelElement extends HPCCLuminoElement {

    /**
     * The orientation of the splitter
     * 
     * @typeParam horizontal - Horizontal orientation
     * @typeParam vertical - Vertical orientation
     * 
     * @defaultValue "horizontal"
     */
    @attribute orientation: "horizontal" | "vertical" = "horizontal";

    /**
     * The spacing between the panels in the splitter
     * 
     * @defaultValue 4
     */
    @attribute({ type: "number" }) spacing: number = 4;

    protected _div: HTMLDivElement;
    protected _slot: HTMLSlotElement;
    protected _splitPanel: SplitPanel;

    constructor() {
        super();
    }

    createPanel(): void {
        this._splitPanel = new SplitPanel({ orientation: this.orientation, spacing: this.spacing });
    }

    addWidget(w: WidgetAdapter, _e: HTMLElement, _ref?: Widget): void {
        this._splitPanel.addWidget(w);
    }

    enter() {
        super.enter();
        Widget.attach(this._splitPanel, this._div);
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this._splitPanel.orientation = this.orientation;
        this._splitPanel.spacing = this.spacing;
        this._splitPanel.node.style.width = `${this.clientWidth}px`;
        this._splitPanel.node.style.height = `${this.clientHeight}px`;
        this._splitPanel.update();
    }

    exit() {
        Widget.detach(this._splitPanel);
        super.exit();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-splitpanel"]: WebComponent<HPCCSplitPanelElement, "layoutChanged">;
        }
    }
}
