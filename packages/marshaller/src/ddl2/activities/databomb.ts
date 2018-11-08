import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IDatasource } from "@hpcc-js/dgrid";
import { csvParse as d3CsvParse, tsvParse as d3TsvParse } from "d3-dsv";
import { Activity } from "./activity";
import { Datasource } from "./datasource";

export class Databomb extends Datasource {

    private _jsonFields: ReadonlyArray<DDL2.IField> = [];
    private _jsonData: ReadonlyArray<object> = [];

    constructor() {
        super();
    }

    toDDL(): DDL2.IDatabomb {
        return {
            type: "databomb",
            id: this.id(),
            format: this.format(),
            payload: this.payload(),
            fields: this._jsonFields as DDL2.IField[]
        };
    }

    static fromDDL(ddl: DDL2.IDatabomb) {
        return new Databomb()
            .id(ddl.id)
            .format(ddl.format)
            .payload(ddl.payload)
            ;
    }

    updateJsonData() {
        try {
            switch (this.format()) {
                case "csv":
                    this._jsonData = d3CsvParse(this.payload());
                    break;
                case "tsv":
                    this._jsonData = d3TsvParse(this.payload());
                    break;
                case "json":
                default:
                    this._jsonData = JSON.parse(this.payload());
                    break;
            }
            this._jsonFields = this.preCalcFields();
        } catch (e) {
            this._jsonFields = [];
            this._jsonData = [];
        }
    }

    hash(more: object): string {
        return super.hash({
            id: this.id(),
            ...more
        }) + this.payload();
    }

    refreshMeta(): Promise<void> {
        return Promise.resolve();
    }

    label(): string {
        return this.id();
    }

    private preCalcFields(): DDL2.IField[] {
        if (this._jsonData.length === 0) return [];
        const row0 = this._jsonData[0];
        const retVal: DDL2.IField[] = [];
        for (const key in row0) {
            retVal.push({
                id: key,
                type: typeof row0[key] as DDL2.IFieldType
            });
        }
        return retVal;
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this._jsonFields;
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    computeData(): ReadonlyArray<object> {
        return this._jsonData;
    }

    //  ===
    total(): number {
        return this._jsonData.length;
    }
}
Databomb.prototype._class += " Databomb";

export const emptyDatabomb = new Databomb().id("Empty");

export interface Databomb {
    format(): "json" | "csv" | "tsv";
    format(_: "json" | "csv" | "tsv"): this;
    payload(): string;
    payload(_: string): this;
}

Databomb.prototype.publish("format", "json", "set", "Databomb Format", ["json", "csv", "tsv"]);
Databomb.prototype.publish("payload", "", "string", "Databomb array", null, { multiline: true });

const payloadFormat = Databomb.prototype.format;
Databomb.prototype.format = function (this: Databomb, _?) {
    const retVal = payloadFormat.apply(this, arguments);
    if (arguments.length) {
        this.updateJsonData();
    }
    return retVal;
};

const payloadOrig = Databomb.prototype.payload;
Databomb.prototype.payload = function (this: Databomb, _?) {
    const retVal = payloadOrig.apply(this, arguments);
    if (arguments.length) {
        this.updateJsonData();
    }
    return retVal;
};

export class Form extends Datasource {
    @publish({}, "object", "Form object")
    payload: publish<this, object>;

    constructor() {
        super();
    }

    toDDL(): DDL2.IForm {
        return {
            type: "form",
            id: this.id(),
            fields: []
        };
    }

    static fromDDL(ddl: DDL2.IForm) {
        const payload = {};
        for (const field of ddl.fields) {
            payload[field.id] = field.default || "";
        }
        return new Form()
            .id(ddl.id)
            .payload(payload)
            ;
    }

    hash(more: object): string {
        return super.hash({
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return Promise.resolve();
    }

    label(): string {
        return "Form";
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        const retVal: DDL2.IField[] = [];
        const row0: any = this.payload();
        for (const key in row0) {
            retVal.push(
                {
                    id: key,
                    type: typeof row0[key] as DDL2.IFieldType,
                    default: row0[key]
                });
        }
        return () => retVal;
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

export class DatasourceAdapt implements IDatasource {
    private _activity: Activity;

    constructor(activity: Activity) {
        this._activity = activity || emptyDatabomb;
    }

    exec(): Promise<void> {
        return this._activity.refreshMeta().then(() => {
            return this._activity.exec();
        });
    }

    id(): string {
        return this._activity.id();
    }
    hash(): string {
        return this._activity.hash();
    }
    label(): string {
        return this._activity.label();
    }
    outFields(): DDL2.IField[] {
        return this._activity && this._activity.outFields ? this._activity.outFields() as DDL2.IField[] : [];
    }
    total(): number {
        return this._activity ? this._activity.outData().length : 0;
    }
    fetch(from: number, count: number): Promise<ReadonlyArray<object>> {
        return this.exec().then(() => {
            const data = this._activity.outData();
            if (from === 0 && data.length <= count) {
                return Promise.resolve(data);
            }
            return Promise.resolve(data.slice(from, from + count));
        });
    }
}
