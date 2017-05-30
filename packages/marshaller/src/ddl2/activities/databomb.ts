import { publish } from "@hpcc-js/common";
import { IField } from "@hpcc-js/dgrid";
import { Activity } from "./activity";
import { View } from "./view";

export class Databomb extends Activity {
    private _owner: View;

    @publish([], "array", "Databomb array")
    payload: publish<this, object[]>;

    constructor(owner: View) {
        super();
        this._owner = owner;
    }

    hash(more: object): string {
        return super.hash({
            payload: this.payload(),
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return Promise.resolve();
    }

    label(): string {
        return `Databomb`;
    }

    outFields(): IField[] {
        let row0: any;
        for (row0 of this.payload()) {
            const retVal: IField[] = [];
            for (const key in row0) {
                retVal.push(
                    {
                        id: key,
                        label: key,
                        type: typeof row0[key],
                        children: null
                    });
            }
            return retVal;
        }
        return [];
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    pullData(): object[] {
        return this.payload();
    }

    //  ===
    total(): number {
        return this.payload().length;
    }
}
Databomb.prototype._class += " Filters";

export class Form extends Activity {
    private _owner: View;

    @publish([], "object", "Form object")
    payload: publish<this, object>;

    constructor(owner: View) {
        super();
        this._owner = owner;
    }

    hash(more: object): string {
        return super.hash({
            payload: this.payload(),
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return Promise.resolve();
    }

    label(): string {
        return "Form";
    }

    outFields(): IField[] {
        const retVal: IField[] = [];
        const row0: any = this.payload();
        for (const key in row0) {
            retVal.push(
                {
                    id: key,
                    label: key,
                    type: typeof row0[key],
                    children: null
                });
        }
        return retVal;
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    pullData(): object[] {
        return [this.payload()];
    }

    //  ===
    total(): number {
        return 1;
    }
}
Form.prototype._class += " Filters";
