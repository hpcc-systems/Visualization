import { Callback, Dispatch, IObserverHandle, Message } from "@hpcc-js/util";
import { Inspector, Runtime } from "@hpcc-js/observable-shim";
import { FileAttachments, Library } from "@hpcc-js/observable-shim";
import { OJSModule } from "./ojsModule";
import { IObserver, OJSVariable, VariableValue } from "./ojsVariable";
import { FakeRuntime as ParseRuntime } from "./parseRuntime";
import { OJSSyntaxError, OJSVariableMessageType } from "./util";

export class OJSRuntimeNotification extends Message implements VariableValue {

    constructor(public variable: OJSVariable, public type: OJSVariableMessageType, public value: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: OJSRuntimeNotification): boolean {
        if (this.variable === other.variable) {
            this.type = other.type;
            this.value = other.value;
            return true;
        }
        return false;
    }
}

export class OJSRuntime {

    readonly _runtime;
    protected _main: OJSModule;

    private _container: HTMLElement | undefined;

    protected _dispatcher = new Dispatch<OJSRuntimeNotification>();

    constructor(container?: string | HTMLElement, plugins: object = {}) {
        if (typeof container === "string") {
            this._container = document.querySelector(container);
        } else {
            this._container = container;
        }

        const library = new Library();
        library.FileAttachment = function () {
            return FileAttachments(name => {
                return `${name}`;
            });
        };
        this._runtime = new Runtime({ ...library, ...plugins });
    }

    watch(callback: Callback<OJSRuntimeNotification>) {
        return this._dispatcher.attach(callback);
    }

    _inspector(): IObserver | undefined {
        if (this._container) {
            return new Inspector(this._container.appendChild(document.createElement("div")));
        }
    }

    module(modDefine) {
        return this._runtime.module(modDefine);
    }

    private _watches: IObserverHandle[] = [];
    async parse(id: string, ojs: string, folder: string) {
        this._watches.forEach(w => w.release());

        this._main = new OJSModule(this, id, this._runtime.module(), ojs, folder);
        const retVal = await this._main.parse();

        const variables = this._main.variables();
        this._watches = variables.map(variable => {
            return variable.watch(messages => {
                messages.filter(m => m.type !== "pending").forEach(m => {
                    this._dispatcher.post(new OJSRuntimeNotification(m.variable, m.type, m.value));
                });
            });
        });

        return retVal;
    }

    async checkSyntax(id: string, ojs: string, folder: string): Promise<OJSSyntaxError[]> {
        try {
            await this.parse(id, ojs, folder);
        } catch (e) {
            return [e];
        }
        return [];
    }

    async evaluate(id: string, ojs: string, folder: string): Promise<VariableValue[]> {
        await this.parse(id, ojs, folder);
        return this.refresh();
    }

    protected variableValue(variable: OJSVariable, type: OJSVariableMessageType, value: any): VariableValue {
        return {
            variable,
            type,
            value
        };
    }

    async refresh(): Promise<VariableValue[]> {
        const variables = this._main.variables();
        return Promise.all(variables.map(v => v.value())).then(values => {
            return values.map((val, idx): VariableValue => {
                const variable = variables[idx];
                return this.variableValue(variable, val.type, val.value);
            });
        });
    }

    latest(): VariableValue[] {
        const variables = this._main.variables();
        return variables.map((v): VariableValue => {
            const { type, value } = v.latestValue();
            return this.variableValue(v, type, value);
        });
    }

    // "https://observablehq.com/@observablehq/a-taste-of-observable"
    async pull(url: string): Promise<string> {
        url = url.replace("https://", "https://api.") + ".js?v=3";
        const modText = await fetch(url).then(r => r.text());
        const mod = await import(url);
        const frt = new ParseRuntime(modText);
        mod.default(frt, (...args: any[]) => { });
        return frt.text();
    }

    push(url: string, ojs: string): boolean {
        //  TODO
        return false;
    }
}
