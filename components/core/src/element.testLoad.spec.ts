import { css, display } from "./css";
import { customElement } from "./decorator";
import { HPCCResizeElement } from "./resize";
import { html, ref } from "./html";
import { ChangeMap } from "./message";
import { attribute, property } from ".";

const template = html<HPCCTestLoad>`\
<div ${ref("_div")})></div>
`;

const styles = css`
${display("inline-block")}

:host {
}
`;

@customElement("hpcc-testload", { template, styles })
export class HPCCTestLoad extends HPCCResizeElement {

    constructed = true;

    @attribute undefined_attr;
    @attribute default_attr = "default_attr";
    @attribute user_attr = "default_attr";
    @attribute user_attr_setattr = "default_attr";
    @attribute user_attr_as_property = "default_attr";

    @property undefined_prop;
    @property default_prop = "default_prop";
    @property user_prop = "default_prop";
    @property user_prop_setattr = "default_prop";
    @property user_prop_as_property = "default_prop";

    _div: HTMLDivElement;

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