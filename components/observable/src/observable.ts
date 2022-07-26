import { ChangeMap, HPCCResizeElement, css, customElement, display, html, ref, attribute, property, WebComponent } from "@hpcc-js/wc-core";
import { OJSRuntime, OMDRuntime, OJSRuntimeError, OJSSyntaxError } from "@hpcc-js/observable-md";
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

    private _watcher: IObserverHandle;

    private _errors: OJSRuntimeError[] = [];
    protected errors(): OJSRuntimeError[] {
        return this._errors;
    }

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

            const context = this;
            const runtimeUpdated = throttle(function () {
                context.runtimeUpdated();
            }, 500);

            const runtime = this.mode === "observablescript" ? new OJSRuntime(this._div, this.plugins) : new OMDRuntime(this._div, this.plugins);
            if (this._watcher) {
                this._watcher.release();
            }

            this._watcher = runtime.watch(async () => {
                const vars = runtime.latest();
                this._errors = vars.map(n => {
                    const { start, end } = n.variable.pos();
                    return new OJSRuntimeError(n.type, start, end, stringify(n.value));
                });
                runtimeUpdated();
            });

            runtime.evaluate("", this._content, ".")
                .catch((e: OJSSyntaxError) => {
                    this._errors = [new OJSRuntimeError("error", e.start, e.end, e.message)];
                    this.runtimeUpdated();
                });
        }
    }

    //  Events  ---
    runtimeUpdated() {
    }

}

function throttle(func, interval) {
    let timeout;
    return function (this) {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = false;
        };
        if (!timeout) {
            func.apply(context, args);
            timeout = true;
            setTimeout(later, interval);
        }
    };
}

function stringify(value: any): string {
    if (value instanceof Element) {
        return value.outerHTML;
    }
    const type = typeof value;
    switch (type) {
        case "function":
            return "ƒ()";
        case "object":
            if (Array.isArray(value)) {
                return "[Array]";
            }
            break;
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
        case "undefined":
            break;
    }
    if (value?.toString) {
        return value.toString();
    }
    return value;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["hpcc-observable"]: WebComponent<HPCCObservableElement>;
        }
    }
}
