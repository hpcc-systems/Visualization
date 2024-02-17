import { ChangeMap, HPCCResizeElement, css, customElement, display, html, ref, attribute, property, WebComponent } from "@hpcc-js/wc-core";
import { compile, ojs2notebook, omd2notebook } from "@hpcc-js/observablehq-compiler";
import { Inspector, Library, Runtime } from "@observablehq/runtime";
import { IObserverHandle } from "@hpcc-js/util";

const template = html<HPCCObservableElement>`\
<div ${ref("_div")}>
</div>
<slot ${ref("_slot")}></slot>
`;

const styles = css`
${display("inline-block")}

:host  {
    width:100%;
    overflow-y: auto;
}

:host > slot {
    display: none;
}

:host > div.hide-values .observablehq--inspect {
    display: none;
}

:host > div .observablehq--error > .observablehq--inspect {
    display: none;
}

:host > div.show-errors .observablehq--error > .observablehq--inspect {
    display: block;
}

`;

@customElement("hpcc-observable", { template, styles })
export class HPCCObservableElement extends HPCCResizeElement {

    /**
     * Default mode, Observable script with embedded Markdown, or Markdown with 
     * embedded Observable script
     * 
     * @typeParam observablescript - Observable script with embedded Markdown
     * @typeParam markdown - Markdown with embedded Observable script
     * 
     * @defaultValue observablescript
     */
    @attribute mode: "observablescript" | "markdown" = "observablescript";

    /**
     * Show or hide intermediate values (values which typically are not `viewof` values)
     * 
     * @defaultValue false
     */
    @attribute({ type: "boolean" }) show_values = false;

    /**
     * Show or hide errors, enable to assist with non functioning scripts
     * 
     * @defaultValue false
     */
    @attribute({ type: "boolean" }) show_errors = false;

    /**
     * Plugins expose JavaScript functions to the Observable script 
     * 
     * @defaultValue \{\}
     */
    @property plugins: { [key: string]: object } = {};

    @property _content: string = "";

    protected _div: HTMLDivElement;
    protected _slot: HTMLSlotElement;

    constructor() {
        super();
        this.construct();
        this._slot.addEventListener("slotchange", () => this.construct());
    }

    private construct() {
        const text = this._slot.assignedNodes().map(n => n.textContent).join("\n");
        this._content = text;
    }

    enter() {
        super.enter();
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);

        this._div?.classList.toggle("hide-values", !this.show_values);
        this._div?.classList.toggle("show-errors", this.show_errors);

        if (changes._content) {
            this._div.innerHTML = "";

            const nb = this.mode === "observablescript" ? ojs2notebook(this._content) : omd2notebook(this._content);
            compile(nb).then(compiledNB => {
                const library = new Library();
                const runtime = new Runtime(library);
                compiledNB(runtime, name => {
                    const div = document.createElement("div");
                    this._div.appendChild(div);
                    return new Inspector(div);
                });
            });

        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-observable"]: WebComponent<HPCCObservableElement>;
        }
    }
}
