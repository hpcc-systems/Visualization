import { Callback, Dispatch, hashSum, IObserverHandle, Message } from "@hpcc-js/util";
import { OJSRuntime } from "./ojsRuntime";
import { calcRefs, createFunction, OJSVariableMessageType } from "./util";

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

export class OJSVariable implements IObserver {

    protected _dispatcher = new Dispatch<OJSVariableMessage>();

    private _id: string;
    private _uid: string;
    private _inspector: IObserver | undefined;

    private _latest: Value;
    private _value: Promise<Value>;
    private _valueResolve: (value?: unknown) => void;

    constructor(protected _ojsRuntime: OJSRuntime, protected _module, protected _cell, foreign = false) {
        const v = this.variable(_cell);
        this._id = v.id;
        this._uid = hashSum(_cell.input.substring(_cell.start, _cell.end));
        if (!foreign) {
            this._inspector = this._ojsRuntime._inspector();
        }
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
