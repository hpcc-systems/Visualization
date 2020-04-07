import { PropertyExt } from "@hpcc-js/common";
import { Callback, Dispatch, Message } from "@hpcc-js/util";
import { parseModule } from "@observablehq/parser";
import { Inspector, Library, Runtime } from "@observablehq/runtime";
import { Cell, CellMessage } from "./cell";
import * as stdlib from "./stdlib/index";
import { encodeMD, encodeOMD } from "./util";

type CellArray = Cell[];
type CellIndex = { [id: string]: Cell[] };

interface Error {
    source: string;
    message: string;
    start: number;
    end: number;
}

export type ErrorArray = Error[];

class Notification extends Message {

    get canConflate(): boolean { return true; }
    conflate(other: Notification): boolean {
        return true;
    }
}

export class Document extends PropertyExt {

    protected _runtime = new Runtime(new Library());
    protected _module;
    protected _observer;
    protected _dispatcher = new Dispatch();

    protected _cells: CellArray = [];
    protected _errors: ErrorArray = [];
    protected _runtimeErrors: { [id: string]: Error } = {};
    protected _cellIdx: CellIndex = {};

    constructor() {
        super();
    }

    watch(callback: Callback<Notification>): this {
        this._dispatcher.attach(callback);
        return this;
    }

    private clear() {
        this._cells = [];
        this._errors = [];
        this._runtimeErrors = {};
        this._cellIdx = {};
    }

    errors(): ErrorArray {
        const runtimeErrors: ErrorArray = [];
        for (const key in this._runtimeErrors) {
            runtimeErrors.push(this._runtimeErrors[key]);
        }
        return [...this._errors, ...runtimeErrors];
    }

    protected append(pCell, part: string, offset: number, inlineMD: boolean) {
        const cell = new Cell(this, pCell, part, offset, inlineMD);
        if (!this._cellIdx[cell.uid()]) {
            this._cellIdx[cell.uid()] = [];
        }
        this._cellIdx[cell.uid()].push(cell);
        this._cells.push(cell);
        cell.watch(changes => {
            changes.forEach(c => {
                this.cellChanged(c);
            });
        });
    }

    protected cellChanged(c: CellMessage) {
        switch (c.type) {
            case "pending":
                const cellRange = c.cell.range();
                this._runtimeErrors[c.uid] = {
                    source: "runtime",
                    message: "...pending...",
                    start: cellRange.start,
                    end: cellRange.end
                };
                this._dispatcher.post(new Notification());
                break;
            case "fulfilled":
                if (this._runtimeErrors[c.uid]) {
                    delete this._runtimeErrors[c.uid];
                    this._dispatcher.post(new Notification());
                }
                break;
            case "rejected":
                const cellRange2 = c.cell.range();
                this._runtimeErrors[c.uid] = {
                    source: "runtime",
                    message: c.content.message,
                    start: cellRange2.start,
                    end: cellRange2.end
                };
                this._dispatcher.post(new Notification());
                break;
        }

    }

    protected parts(part: string, offset: number, inlineMD: boolean) {
        try {
            const pCells = parseModule(part).cells;
            pCells.forEach(pCell => {
                this.append(pCell, part, offset, inlineMD);
            });
        } catch (e) {
            this.parts("md`" + encodeMD(e.message) + "`", offset, true);
            let raisedAt = e.raisedAt || e.pos;
            raisedAt += raisedAt === e.pos ? 1 : 0;
            if (e.raisedAt) {
                this._errors.push({
                    source: "syntax",
                    message: e.message,
                    start: e.pos + offset,
                    end: e.raisedAt + offset + (e.pos === e.raisedAt ? 1 : 0)
                });
            }
        }
    }

    private _prevMD: string;
    update(_: Readonly<string>, domNode): boolean {
        this.clear();
        if (this._prevMD !== _) {
            this._prevMD = _;

            this._runtime.dispose();
            this._runtime = new Runtime(new Library());
            domNode.innerHTML = "";
            this._runtime.module((runtime, observer) => {
                this._module = runtime.module();
                this._observer = observer;

                //  Load Markdown  ---
                const re = /(```(?:\s|\S)[\s\S]*?```)/g;
                let prevOffset = 0;
                let match = re.exec(_);
                while (match !== null) {
                    if (match.index > prevOffset) {
                        this.parts("md`" + encodeOMD(_.substring(prevOffset, match.index)) + "`", prevOffset, true);
                    }

                    const outer = match[0];
                    if (outer.indexOf("``` ") === 0 || outer.indexOf("```\n") === 0) {
                        const prefixLen = 3;
                        const inner = outer.substring(prefixLen, outer.length - prefixLen);
                        this.parts(inner, match.index + prefixLen, false);
                    } else {
                        this.parts("md`" + encodeOMD(outer) + "`", match.index, true);
                    }

                    prevOffset = match.index + match[0].length;
                    match = re.exec(_);
                }
                if (_.length > prevOffset) {
                    this.parts("md`" + encodeOMD(_.substring(prevOffset, _.length)) + "`", prevOffset, true);
                }

                //  Load stdlib  ---
                for (const key in stdlib) {
                    this._module.variable(observer(key)).define(key, [], () => stdlib[key]);
                }
                return this._module;
            }, Inspector.into(domNode));

            return true;
        }
        return false;
    }
}
