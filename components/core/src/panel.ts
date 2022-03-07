import { css, display } from "./css";
import { customElement } from "./decorator";
import { HPCCResizeElement } from "./resize";
import { html } from "./html";
import { ChangeMap } from "./message";

const template = html<HPCCPanelElement>`\
`;

const styles = css`
${display("inline-block")}

:host {
}

:host > div {
    background-color: pink;
}

:host > div > div {
    position: absolute;
    background-color: palegreen;
}
`;

@customElement("hpcc-panel", { template, styles })
export class HPCCPanelElement extends HPCCResizeElement {

    protected _divOuter: HTMLDivElement;
    protected _divInner: HTMLDivElement;

    constructor() {
        super();
    }

    enter() {
        super.enter();
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
    }
}
