import { Callback, Dispatch, hashSum, IObserverHandle, Message } from "@hpcc-js/util";
import { parseModule } from "@observablehq/parser";
import { Inspector, Runtime } from "@observablehq/runtime";
import { FileAttachments, Library } from "@observablehq/stdlib";
import { FakeRuntime as ParseRuntime } from "./parseRuntime";
import * as stdlib from "./stdlib/index";
import { calcRefs, createFunction, FuncTypes, OJSSyntaxError, OJSVariableMessageType } from "./util";

export function ojsParse(ojs: string) {
    return parseModule(ojs);
}

export interface IObserver {
    pending();
    fulfilled(value);
    rejected(error);
}

export class OJSVariableMessage extends Message {

    constructor(public variable: OJSVariable, public type: OJSVariableMessageType, public value: any) {
        super();
    }

    get canConflate(): boolean { return false; }
    conflate(other: OJSVariableMessage) {
        if (this.variable === other.variable) {
            this.type = other.type;
            this.value = other.value;
            return true;
        }
        return false;
    }
}

export interface Value {
    type: OJSVariableMessageType;
    value: any;
}

export interface VariableValue {
    variable: OJSVariable;
    type: OJSVariableMessageType;
    value: any;
}

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

export class OJSVariable implements IObserver {

    protected _dispatcher = new Dispatch<OJSVariableMessage>();

    private _id: string;
    private _uid: string;
    private _inspector: IObserver | undefined;

    private _latest: Value;
    private _value: Promise<Value>;
    private _valueResolve: (value?: unknown) => void;

    constructor(protected _ojsRuntime: OJSRuntime, protected _module, protected _cell) {
        const v = this.variable(_cell);
        this._id = v.id;
        this._uid = hashSum(_cell.input.substring(_cell.start, _cell.end));
        this._inspector = this._ojsRuntime._inspector();
        this._value = new Promise<Value>((resolve, reject) => {
            this._valueResolve = resolve;
        });
    }

    watch(callback: Callback<OJSVariableMessage>): IObserverHandle {
        return this._dispatcher.attach(callback);
    }

    pending() {
        this._dispatcher.post(new OJSVariableMessage(this, "pending", undefined));
        this._inspector && this._inspector.pending();
    }

    fulfilled(value: any) {
        this._latest = {
            type: "fulfilled",
            value
        };
        this._valueResolve(value);
        this._dispatcher.post(new OJSVariableMessage(this, "fulfilled", value));
        this._inspector && this._inspector.fulfilled(value);
    }

    rejected(error: any) {
        this._latest = {
            type: "rejected",
            value: error
        };
        this._valueResolve(error);
        this._dispatcher.post(new OJSVariableMessage(this, "rejected", error));
        this._inspector && this._inspector.rejected(error);
    }

    private variable(cell): { id: string, variable: any } {
        const input = cell.input;
        let id = cell.id ? input.substring(cell.id.start, cell.id.end) : ""; // `unnamed_${++idx}`;
        const body = cell.body ? input.substring(cell.body.start, cell.body.end) : "";
        const refs = calcRefs(cell.references, input);
        let variable;
        if (cell.id && cell.id.type === "MutableExpression") {
            const mutableID = input.substring(cell.id.id.start, cell.id.id.end);
            const func = createFunction(refs, body, cell.async, cell.generator, cell.body && cell.body.type === "BlockStatement");
            this._module.define(`initial ${mutableID}`, Object.keys(refs), func);
            this._module.variable().define(id, ["Mutable", `initial ${mutableID}`], (M, _) => new M(_));
            variable = this._module.variable(this).define(mutableID, [id], _ => _.generator);
            id = mutableID;
        } else {
            const func = createFunction(refs, body, cell.async, cell.generator, cell.body && cell.body.type === "BlockStatement");
            variable = this._module.variable(this).define(id, Object.keys(refs), func);
        }
        if (cell.id && cell.id.type === "ViewExpression") {
            const viewID = input.substring(cell.id.id.start, cell.id.id.end);
            this._module.variable().define(viewID, ["Generators", id], (G, _) => G.input(_));
        }
        return { id, variable };
    }

    id() {
        return this._id;
    }

    uid() {
        return this._uid;
    }

    pos(): { start: number, end: number } {
        if (this._cell.id) {
            return { start: this._cell.id.start, end: this._cell.id.end };
        }
        return { start: this._cell.body.start, end: this._cell.body.start };
    }

    value(): Promise<Value> {
        if (this._latest) {
            return Promise.resolve(this._latest);
        }
        return this._value
            .catch(error => {
                return {
                    type: "rejected",
                    value: error.message
                };
            });
    }

    latestValue() {
        return this._latest || { type: "pending", value: "" };
    }
}

export class OJSModule {

    protected _variableMap: { [id: string]: OJSVariable } = {};
    protected _variables: OJSVariable[] = [];

    constructor(protected _ojsCompiler: OJSRuntime, protected _id: string, protected _module, protected _ojs: string) {
        //  Load stdlib  ---
        for (const key in stdlib) {
            this._module.define(key, [], () => stdlib[key]);
        }
    }

    variables() {
        return this._variables;
    }

    private async module(cell, idx) {
        if (cell && cell.body && cell.body.source && cell.body.specifiers) {
            const impMod: any = await this._ojsCompiler.importNotebook(cell.body.source.value);
            const mod = this._ojsCompiler.module(impMod.default);
            cell.body.specifiers.forEach(s => {
                if (s.view) {
                    if (s.imported.name === s.local.name) {
                        this._module.import(`viewof ${s.imported.name}`, mod);
                    } else {
                        this._module.import(`viewof ${s.imported.name}`, `viewof ${s.local.name}`, mod);
                    }
                }
                if (s.imported.name === s.local.name) {
                    this._module.import(s.imported.name, mod);
                } else {
                    this._module.import(s.imported.name, s.local.name, mod);
                }
            });
        }
    }

    async parse(): Promise<OJSVariable[]> {
        const retVal: OJSVariable[] = [];
        try {
            const cells = parseModule(this._ojs).cells;
            let idx = 0;
            for (const cell of cells) {
                switch (cell.body && cell.body.type) {
                    case "ImportDeclaration":
                        await this.module(cell, idx);
                        break;
                    default:
                        const ojsVar = new OJSVariable(this._ojsCompiler, this._module, cell);
                        const id = ojsVar.id();
                        if (id) {
                            this._variableMap[id] = ojsVar;
                        }
                        this._variables.push(ojsVar);
                        retVal.push(ojsVar);
                }
                ++idx;
            }
        } catch (e) {
            const pos = e.pos || 0;
            let raisedAt = e.raisedAt || pos;
            raisedAt += raisedAt === pos ? 1 : 0;
            throw new OJSSyntaxError(pos, raisedAt, e.message);
        }
        return retVal;
    }
}

export class OJSRuntime {

    protected _runtime;
    protected _main: OJSModule;
    protected _modules: { [id: string]: OJSModule } = {};

    private _container: HTMLElement | undefined;

    protected _dispatcher = new Dispatch<OJSRuntimeNotification>();

    constructor(container?: string | HTMLElement) {
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
        this._runtime = new Runtime(library);
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

    _doImport = new FuncTypes.asyncFunctionType("modUrl", "return import(modUrl)");

    async fetchUrl(url) {
        return fetch(url).then(r => r.text());
    }

    async importUrl(url) {
        return this._doImport(url);
    }

    async importNotebook(partial) {
        return this.importUrl(`https://api.observablehq.com/${partial[0] === "@" ? partial : `d/${partial}`}.js?v=3`);
    }

    private _watches: IObserverHandle[] = [];
    async parse(id: string, ojs: string) {
        this._watches.forEach(w => w.release());

        this._main = new OJSModule(this, id, this._runtime.module(), ojs);
        this._modules[id] = this._main;
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

    async checkSyntax(id: string, ojs: string): Promise<OJSSyntaxError[]> {
        try {
            await this.parse(id, ojs);
        } catch (e) {
            return [e];
        }
        return [];
    }

    async evaluate(id: string, ojs: string): Promise<VariableValue[]> {
        await this.parse(id, ojs);
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
        const modText = await this.fetchUrl(url);
        const mod = await this.importUrl(url);
        const frt = new ParseRuntime(modText);
        mod.default(frt, (...args: any[]) => { });
        return frt.text();
    }

    push(url: string, ojs: string): boolean {
        //  TODO
        return false;
    }
}
