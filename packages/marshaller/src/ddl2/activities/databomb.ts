import { DDL2 } from "@hpcc-js/ddl-shim";
import { IDatasource } from "@hpcc-js/dgrid";
import { isArray } from "@hpcc-js/util";
import { csvParse as d3CsvParse, tsvParse as d3TsvParse } from "d3-dsv";
import { Activity } from "./activity";
import { Datasource } from "./datasource";
import { FormField } from "./form";

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

    private _jsonData: ReadonlyArray<object> = [];

    constructor() {
        super();
    }

    toDDL(skipPayload: boolean = false): DDL2.IDatabomb {
        return {
            type: "databomb",
            id: this.id(),
            format: this.format(),
            payload: skipPayload ? undefined : this.payload(),
            fields: this.validFields().map(f => f.toDDL())
        };
    }

    fromDDL(ddl: DDL2.IDatabomb): this {
        const retVal = this
            .id(ddl.id)
            .format(ddl.format)
            .payload(ddl.payload)
            .databombFields(ddl.fields.map(FormField.fromDDL))
            ;
        return retVal;
    }

    static fromDDL(ddl: DDL2.IDatabomb): Databomb {
        return new Databomb().fromDDL(ddl);
    }

    validFields(): FormField[] {
        return this.databombFields().filter(f => f.valid());
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
            this.databombFields(this.preCalcFields().map(FormField.fromDDL));
        } catch (e) {
            this.databombFields([]);
            this._jsonData = [];
        }
    }

    hash(more: object): string {
        return super.hash({
            ddl: this.toDDL(true),
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
        return () => this.validFields().map(f => f.toDDL());
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    computeData(): ReadonlyArray<object> {
        const coarceFuncMap = {};
        this.validFields().forEach(field => {
            coarceFuncMap[field.fieldID()] = field.coerceFunc();
        });
        return this._jsonData.map(row => {
            const retVal = {};
            for (const key in coarceFuncMap) {
                retVal[key] = coarceFuncMap[key](row[key]);
            }
            return retVal;
        });
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
    databombFields(): FormField[];
    databombFields(_: FormField[]): this;
}

Databomb.prototype.publish("format", "json", "set", "Databomb Format", ["json", "csv", "tsv"]);
Databomb.prototype.publish("payload", "", "string", "Databomb array", null, { multiline: true });
Databomb.prototype.publish("databombFields", [], "propertyArray", "Multi Fields", null, { autoExpand: FormField });

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
    hash(more: { [key: string]: any } = {}): string {
        return this._activity.hash(more);
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
