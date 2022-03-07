import { customElement, ChangeMap, css, display, html, ref, WebComponent } from "@hpcc-js/wc-core";
import { DockPanel, Widget } from "@lumino/widgets";
import { IMessageHandler, Message, MessageLoop } from "@lumino/messaging";
import { HPCCLuminoElement } from "./common";
import { dockpanel, dragdrop, splitpanel, tabbar, tabpanel, widget } from "./styles";
import { dockpanel as dockpanelTheme, tabbar as tabbarTheme } from "./theme";
import { WidgetAdapter } from "./widgetAdapter";

const template = html<HPCCDockPanelElement>`\
<div ${ref("_div")}>
</div>
<slot ${ref("_slot")}></slot>`;

const styles = css`
${display("inline-block")} 

:host > slot {
    visibility: hidden;
}

${dragdrop}
${widget}
${splitpanel}
${tabbar}
${tabpanel}
${dockpanel}

${dockpanelTheme}
${tabbarTheme}

.hpcc-LuminoAdapter {
    padding: 8px;
    border: 1px solid #c0c0c0;
    border-top: none;
}
`;

@customElement("hpcc-dockpanel", { template, styles })
export class HPCCDockPanelElement extends HPCCLuminoElement {

    _div: HTMLDivElement;
    protected _dockPanel: DockPanel;

    constructor() {
        super();
    }

    createPanel(): void {
        this._dockPanel = new DockPanel({ document: this.shadowRoot! });
    }

    addWidget(w: WidgetAdapter, e: HTMLElement, ref?: Widget): void {
        this._dockPanel.addWidget(w, {
            mode: e.dataset.mode as DockPanel.InsertMode,
            ref
        });
    }

    enter() {
        super.enter();
        Widget.attach(this._dockPanel, this._div);
        MessageLoop.installMessageHook(this._dockPanel, this);
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        this._dockPanel!.node.style.width = `${this.clientWidth}px`;
        this._dockPanel!.node.style.height = `${this.clientHeight}px`;
        this._dockPanel!.update();
    }

    exit() {
        Widget.detach(this._dockPanel);
        super.exit();
    }

    //  Lumino Messaging  ---
    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this._dockPanel) {
            switch (msg.type) {
                case "layout-modified":
                    this.$emit("layoutChanged", this);
                    break;
            }
        }
        return true;
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-dockpanel"]: WebComponent<HPCCDockPanelElement, "layoutChanged">;
        }
    }
}
