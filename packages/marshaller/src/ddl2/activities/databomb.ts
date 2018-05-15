import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Activity } from "./activity";

export class Databomb extends Activity {

    @publish([], "array", "Databomb array")
    payload: publish<this, object[]>;

    constructor() {
        super();
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

    computeFields(): DDL2.IField[] {
        let row0: any;
        for (row0 of this.payload()) {
            const retVal: DDL2.IField[] = [];
            for (const key in row0) {
                const rowType: DDL2.IPrimativeFieldType = typeof row0[key] as DDL2.IPrimativeFieldType;
                retVal.push({
                    id: key,
                    type: rowType
                });
            }
            return retVal;
        }
        return [];
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    computeData(): ReadonlyArray<object> {
        return this.payload();
    }

    //  ===
    total(): number {
        return this.payload().length;
    }
}
Databomb.prototype._class += " Databomb";

export class Form extends Activity {
    @publish({}, "object", "Form object")
    payload: publish<this, object>;

    constructor() {
        super();
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

    computeFields(): DDL2.IField[] {
        const retVal: DDL2.IField[] = [];
        const row0: any = this.payload();
        for (const key in row0) {
            retVal.push(
                {
                    id: key,
                    type: typeof row0[key] as DDL2.IPrimativeFieldType,
                    default: row0[key]
                });
        }
        return retVal;
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    computeData(): ReadonlyArray<object> {
        return [this.payload()];
    }

    //  ===
    total(): number {
        return 1;
    }
}
Form.prototype._class += " Form";
