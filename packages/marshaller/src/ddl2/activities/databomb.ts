import { DDL2 } from "@hpcc-js/ddl-shim";
import { IDatasource } from "@hpcc-js/dgrid";
import { isArray } from "@hpcc-js/util";
import { csvParse as d3CsvParse, tsvParse as d3TsvParse } from "d3-dsv";
import { Activity } from "./activity";
import { Datasource } from "./datasource";

function fieldType(field: any): DDL2.IFieldType {
    if (isArray(field)) {
        return "dataset";
    }
    const type = typeof field;
    switch (type) {
        case "boolean":
        case "number":
        case "string":
        case "object":
            return type;
    }
    return "string";
}

function rowToFields(row: object, _jsonData): DDL2.IField[] {
    //  TODO:  This heuristic will fail if there are empty nested rows in the first row...
    const retVal: DDL2.IField[] = [];
    for (const key in row) {
        const field = {
            type: fieldType(row[key]),
            id: key
        } as DDL2.IField;
        switch (field.type) {
            case "object":
                for (const row of _jsonData) {
                    let found = false;
                    for (const _childKey in row[key]) {
                        const rowFields = rowToFields(row[key], [row[key]]);
                        field.fields = {};
                        if (rowFields.length) {
                            rowFields.forEach(rf => field.fields[rf.id] = rf);
                            found = true;
                        }
                        break;
                    }
                    if (found) break;
                }
                break;
            case "dataset":
                for (const row of _jsonData) {
                    if (row[key] && row[key].length) {
                        field.children = rowToFields(row[key][0], row[key]);
                        break;
                    }
                }
                break;
        }
        retVal.push(field);
    }
    return retVal;
}

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

    fromDDL(ddl: DDL2.IDatabomb): this {
        const retVal = this
            .id(ddl.id)
            .format(ddl.format)
            .payload(ddl.payload)
            ;
        this._jsonFields = ddl.fields;
        return retVal;
    }

    static fromDDL(ddl: DDL2.IDatabomb): Databomb {
        return new Databomb().fromDDL(ddl);
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
        return "Databomb";
    }

    private preCalcFields(): DDL2.IField[] {
        if (this._jsonData.length === 0) return [];
        return rowToFields(this._jsonData[0], this._jsonData);
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

const databombPayloadOrig = Databomb.prototype.payload;
Databomb.prototype.payload = function (this: Databomb, _?) {
    const retVal = databombPayloadOrig.apply(this, arguments);
    if (arguments.length) {
        this.updateJsonData();
    }
    return retVal;
};

export const emptyDatabomb = new Databomb().id("Empty").payload("[]");

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
