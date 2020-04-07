import { Callback, Dispatch, hashSum, IObserverHandle, Message } from "@hpcc-js/util";
import { calcRefs, createFunction, FuncTypes } from "./util";

const doImport = new FuncTypes.asyncFunctionType("modID", "return import(modID)");

export class CellMessage extends Message {

    constructor(readonly uid: string, public cell: Cell, public type: string, public content: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: CellMessage) {
        if (this.uid === other.uid) {
            this.type = other.type;
            this.content = other.content;
            return true;
        }
        return false;
    }
}

interface IObserver {
    pending();
    fulfilled(value);
    rejected(error);
}

export class Cell implements IObserver {

    _observer;
    protected _dispatcher = new Dispatch<CellMessage>();

    constructor(private _document, private _pCell: any, private _content: string, private _offset: number, public _inlineMD) {
        this._observer = this._document._observer(this.id());
        switch (this._pCell.body && this._pCell.body.type) {
            case "ImportDeclaration":
                this.module(this._document._runtime, this._document._module, this._pCell);
                break;
            default:
                this.variable();
        }
    }

    watch(callback: Callback<CellMessage>): IObserverHandle {
        return this._dispatcher.attach(callback);
    }

    id(): string | null {
        return this._pCell.id ? this._content.substring(this._pCell.id.start, this._pCell.id.end) : null;
    }

    range() {
        return {
            start: this._pCell.start + this._offset,
            end: this._pCell.end + 1 + this._offset - (this._inlineMD ? 9 : 0)
        };
    }

    uid(): string {
        if (this._pCell.id) {
            return this._content.substring(this._pCell.id.start, this._pCell.id.end);
        }
        return this.hash();
    }

    hash() {
        return hashSum(this._pCell);
    }

    offset() {
        return this._offset;
    }

    body(): string {
        if (this._pCell.body) {
            return this._content.substring(this._pCell.body.start, this._pCell.body.end);
        }
        return "";
    }

    // Runtime  ---
    private async module(runtime, main, cell) {
        if (cell && cell.body && cell.body.source && cell.body.specifiers) {
            const impMod = await doImport(`https://api.observablehq.com/${cell.body.source.value}.js?v=3`);
            const mod = runtime.module(impMod.default);
            cell.body.specifiers.forEach(s => {
                if (s.view) {
                    if (s.imported.name === s.local.name) {
                        main.import(`viewof ${s.imported.name}`, mod);
                    } else {
                        main.import(`viewof ${s.imported.name}`, `viewof ${s.local.name}`, mod);
                    }
                }
                if (s.imported.name === s.local.name) {
                    main.import(s.imported.name, mod);
                } else {
                    main.import(s.imported.name, s.local.name, mod);
                }
            });
        }
    }

    private async variable() {
        const refs = calcRefs(this._pCell.references, this._content);
        const func = createFunction(refs, this.body(), this._pCell.async, this._pCell.generator, this._pCell.body && this._pCell.body.type === "BlockStatement");
        this._document._module.variable(this).define(this.id(), Object.keys(refs), func);
        if (this._pCell.id && this._pCell.id.type === "ViewExpression") {
            const viewID = this._content.substring(this._pCell.id.id.start, this._pCell.id.id.end);
            this._document._module.variable().define(viewID, ["Generators", this.id()], (G, _) => G.input(_));
        }
    }

    pending() {
        this._dispatcher.post(new CellMessage(this.uid(), this, "pending", undefined));
        this._observer.pending();
    }

    fulfilled(value) {
        this._dispatcher.post(new CellMessage(this.uid(), this, "fulfilled", value));
        this._observer.fulfilled(value);
    }

    rejected(error) {
        this._dispatcher.post(new CellMessage(this.uid(), this, "rejected", error));
        // this._observer.rejected(error);
    }
}
