import { HTMLWidget, publish } from "@hpcc-js/common";
import { IObserverHandle } from "@hpcc-js/util";
import { OJSRuntime } from "./ojsRuntime";
import { OMDRuntime } from "./omdRuntime";
import { OJSRuntimeError, OJSSyntaxError } from "./util";

import "@observablehq/inspector/dist/inspector.css";
import "../src/observable.css";

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

export class Observable extends HTMLWidget {

    constructor() {
        super();
    }

    @publish("ojs", "string", "Mode (ojs|omd)")
    mode: publish<this, "ojs" | "omd">;

    @publish("", "string", "OJS | OMD Text")
    text: publish<this, string>;

    @publish({}, "object", "Plugins")
    plugins: publish<this, { [key: string]: object }>;

    @publish(false, "boolean", "Show Observable Values")
    showValues: publish<this, boolean>;

    _errors: OJSRuntimeError[] = [];
    errors(): OJSRuntimeError[] {
        return this._errors;
    }

    _watcher: IObserverHandle;
    protected _prevHash: string | undefined;
    update(domNode, element) {
        super.update(domNode, element);
        this._placeholderElement
            .style("width", null)
            .style("height", null)
            ;
        element
            .style("width", null)
            .style("height", null)
            ;
        element.classed("hide-values", !this.showValues() ? true : null);

        const hash = this.propertyHash(["mode", "text", "showValues"]);
        if (this._prevHash !== hash) {
            this._prevHash = hash;

            const context = this;
            const runtimeUpdated = throttle(function () {
                context.runtimeUpdated();
            }, 500);

            element.html("");
            const runtime = this.mode() === "ojs" ? new OJSRuntime(domNode) : new OMDRuntime(domNode);
            if (this._watcher) {
                this._watcher.release();
            }

            this._watcher = runtime.watch(async variableValues => {
                const vars = runtime.latest();
                this._errors = vars.map(n => {
                    const { start, end } = n.variable.pos();
                    return new OJSRuntimeError(n.type, start, end, stringify(n.value));
                });
                runtimeUpdated();
            });
            runtime.evaluate("", this.text())
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
Observable.prototype._class += " observable-md_ObservableMD";
