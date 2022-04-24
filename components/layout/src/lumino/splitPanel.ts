import { customElement, css, display, html, ref, ChangeMap, attribute, WebComponent } from "@hpcc-js/wc-core";
import { SplitPanel, Widget } from "@lumino/widgets";
import { IMessageHandler, Message, MessageLoop } from "@lumino/messaging";
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

    addWidget(w: WidgetAdapter, e: HTMLElement, _ref?: Widget): void {
        this._splitPanel.addWidget(w);
        if (e.dataset.border_width !== undefined) {
            w.node.style.borderWidth = `${e.dataset.border_width}px`;
        }
        if (e.dataset.padding !== undefined) {
            w.node.style.padding = `${e.dataset.padding}px`;
        }
    }

    enter() {
        super.enter();
        Widget.attach(this._splitPanel, this._div);
        MessageLoop.installMessageHook(this._splitPanel, this);
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this._splitPanel.orientation = this.orientation;
        this._splitPanel.spacing = this.spacing;
        this._splitPanel.node.style.width = `${this.clientWidth}px`;
        this._splitPanel.node.style.height = `${this.clientHeight}px`;
        this._splitPanel.update();
        this.$emit("update-request", this);
    }

    exit() {
        MessageLoop.removeMessageHook(this._splitPanel, this);
        Widget.detach(this._splitPanel);
        super.exit();
    }

    //  Lumino Messaging  ---
    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this._splitPanel) {
            switch (msg.type) {
                case "fit-request":
                case "update-request":
                    break;
                default:
                    console.warn(`${this.constructor.name} undocumented message type: ${msg.type}`);
            }
            this.$emit(msg.type, msg);
        }
        return true;
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-splitpanel"]: WebComponent<HPCCSplitPanelElement,
                "fit-request" |
                "update-request"
            >;
        }
    }
}
