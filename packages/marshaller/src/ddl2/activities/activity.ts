import { IMonitorHandle, PropertyExt } from "@hpcc-js/common";
import { IField as WsEclField } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IDatasource } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";

export function stringify(obj_from_json) {
    if (Array.isArray(obj_from_json)) {
        // not an object, stringify using native function
        return "[" + obj_from_json.map(stringify).join(", ") + "]";
    }
    if (typeof obj_from_json !== "object" || obj_from_json === null || obj_from_json === undefined) {
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    const props = Object
        .keys(obj_from_json)
        .map(key => `${key}: ${stringify(obj_from_json[key])}`)
        .join(", ");
    return `{ ${props} }`;
}

export function schemaType2IFieldType(type): DDL2.IFieldType {
    switch (type) {
        case "boolean":
            return "boolean";
        case "xs:byte":
        case "xs:double":
        case "xs:decimal":
        case "xs:float":
        case "xs:int":
        case "xs:short":
        case "xs:unsignedInt":
        case "xs:unsignedShort":
        case "xs:unsignedByte":
        case "number":
            return "number";
        case "xs:integer":
        case "xs:long":
        case "xs:negativeInteger":
        case "xs:nonNegativeInteger":
        case "xs:nonPositiveInteger":
        case "xs:positiveInteger":
        case "xs:unsignedLong":
            return "number64";
        case "string":
            return "string";
        case "range":
            return "range";
    }
    return "string";
}

export function schemaRow2IField(row: any): DDL2.IField {
    if (row._children && row._children.length) {
        return {
            id: row.name,
            type: "dataset",
            children: row._children.map(schemaRow2IField)
        };
    } else {
        return {
            id: row.name,
            type: schemaType2IFieldType(row.type)
        };
    }
}

export function wsEclSchemaRow2IField(row: WsEclField): DDL2.IField {
    return row;
}

export type ReferencedFields = {
    inputs: { [activityID: string]: string[] },
    outputs: { [activityID: string]: string[] }
};

export interface IActivityError {
    source: string;
    msg: string;
}

/*
export const ROW_ID = "__##__";  //  TODO:  Should be Symbol
export function rowID(row: Readonly<object>): undefined | number {
    return row[ROW_ID] || row["__lparam"];
}
*/

export abstract class Activity extends PropertyExt {
    private _sourceActivity: Activity;

    fixInt64(data) {
        const int64Fields = this.outFields().filter(field => {
            switch (field.type) {
                case "number64":
                    return true;
            }
            return false;
        });
        if (int64Fields.length) {
            return data.map(row => {
                for (const int64Field of int64Fields) {
                    row[int64Field.id] = +row[int64Field.id];
                }
                return row;
            });
        }
        return data;
    }

    sourceActivity(): Activity;
    sourceActivity(_: Activity): this;
    sourceActivity(_?: Activity): Activity | this {
        if (!arguments.length) return this._sourceActivity;
        this._sourceActivity = _;
        return this;
    }

    hash(more: object = {}): string {
        return hashSum({
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return this._sourceActivity ? this._sourceActivity.refreshMeta() : Promise.resolve();
    }

    exists(): boolean {
        return true;
    }

    validate(): IActivityError[] {
        return [];
    }

    label(): string {
        return this.id();
    }

    updatedBy(): string[] {
        return [];
    }

    inFields(): DDL2.IField[] {
        return this._sourceActivity ? this._sourceActivity.outFields() : [];
    }

    computeFields(): DDL2.IField[] {
        return this.inFields();
    }

    outFields(): DDL2.IField[] {
        return this.computeFields();
    }

    localFields(): DDL2.IField[] {
        const inFieldIDs = this.inFields().map(field => field.id);
        return this.outFields().filter(field => inFieldIDs.indexOf(field.id) < 0);
    }

    fieldOrigin(fieldID: string): Activity | null {
        if (this.localFields().filter(field => field.id === fieldID).length) {
            return this;
        } else if (this.sourceActivity()) {
            return this.sourceActivity().fieldOrigin(fieldID);
        }
        return null;
    }

    resolveFields(refs: ReferencedFields, fieldIDs: string[]) {
        for (const fieldID of fieldIDs) {
            const fieldOrigin = this.fieldOrigin(fieldID);
            if (fieldOrigin) {
                if (!refs.outputs[fieldOrigin.id()]) {
                    refs.outputs[fieldOrigin.id()] = [];
                }
                if (refs.outputs[fieldOrigin.id()].indexOf(fieldID) < 0) {
                    refs.outputs[fieldOrigin.id()].push(fieldID);
                }
            }
        }
    }

    resolveInFields(refs: ReferencedFields, fieldIDs: string[]) {
        if (this.sourceActivity()) {
            this.sourceActivity().resolveFields(refs, fieldIDs);
        }
    }

    referencedFields(refs: ReferencedFields): void {
        if (this.sourceActivity()) {
            this.sourceActivity().referencedFields(refs);
        }
    }

    exec(): Promise<void> {
        return this._sourceActivity ? this._sourceActivity.exec() : Promise.resolve();
    }

    inData(): ReadonlyArray<object> {
        return this._sourceActivity ? this._sourceActivity.outData() || [] : [];
    }

    computeData(): ReadonlyArray<object> {
        return this.inData();
    }

    outData(): ReadonlyArray<object> {
        return this.computeData();
    }

    /*
    inRow(idx: number) {
        return this.inData().filter(row => row[ROW_ID] === idx)[0];
    }

    outRow(idx: number) {
        return this.outData().filter(row => row[ROW_ID] === idx)[0];
    }
    */
}

export class ActivityArray extends Activity {
    private _activities: Activity[] = [];

    activities(): Activity[];
    activities(_: Activity[]): this;
    activities(_?: Activity[]): Activity[] | this {
        if (!arguments.length) return this._activities;
        this._activities = _;
        return this;
    }
}
ActivityArray.prototype._class += " ActivityArray";

export class ActivityPipeline extends ActivityArray {

    activities(): Activity[];
    activities(_: Activity[]): this;
    activities(_?: Activity[]): Activity[] | this {
        if (!arguments.length) return super.activities();
        super.activities(_);
        let prevActivity: Activity;
        for (const activity of _) {
            activity.sourceActivity(prevActivity);
            prevActivity = activity;
        }
        return this;
    }

    first(): Activity {
        const retVal = this.activities();
        return retVal[0];
    }

    last(): Activity | null {
        const retVal = this.activities();
        return retVal[retVal.length - 1];
    }

    private calcUpdatedGraph(activity: Activity): Array<{ from: string, to: Activity }> {
        return activity.updatedBy().map(source => {
            return {
                from: source,
                to: activity
            };
        });
    }

    updatedByGraph(): Array<{ from: string, to: Activity }> {
        let retVal: Array<{ from: string, to: Activity }> = [];
        for (const activity of this.activities()) {
            retVal = retVal.concat(this.calcUpdatedGraph(activity));
        }
        return retVal;
    }

    fetch(from: number = 0, count: number = Number.MAX_VALUE): Promise<ReadonlyArray<object>> {
        return this.exec().then(() => {
            const data = this.outData();
            if (from === 0 && data.length <= count) {
                return data;
            }
            return data.slice(from, from + count);
        });
    }

    //  Activity overrides ---
    hash(more: { [key: string]: any } = {}): string {
        return hashSum({
            activities: [this.activities().map(activity => activity.hash())],
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return this.last().refreshMeta();
    }

    updatedBy(): string[] {
        let retVal: string[] = [];
        for (const activity of this.activities()) {
            retVal = retVal.concat(activity.updatedBy());
        }
        return retVal;
    }

    inFields(): DDL2.IField[] {
        return this.first().inFields();
    }

    outFields(): DDL2.IField[] {
        return this.last().outFields();
    }

    localFields(): DDL2.IField[] {
        return this.last().localFields();
    }

    fieldOrigin(fieldID: string): Activity | null {
        return this.last().fieldOrigin(fieldID);
    }

    referencedFields(refs: ReferencedFields) {
        this.last().referencedFields(refs);
    }

    resolveInFields(refs: ReferencedFields, fieldIDs: string[]) {
        this.last().resolveInFields(refs, fieldIDs);
    }

    resolveFields(refs: ReferencedFields, fieldIDs: string[]) {
        this.last().resolveFields(refs, fieldIDs);
    }

    exec(): Promise<void> {
        return this.last().exec();
    }

    outData(): ReadonlyArray<object> {
        return this.last().outData();
    }
}
ActivityPipeline.prototype._class += " ActivitySequence";

export class ActivitySelection extends ActivityArray {
    private _selection: Activity;
    private _monitorHandle: IMonitorHandle;

    selection(): Activity;
    selection(_: Activity): this;
    selection(_?: Activity): Activity | this {
        if (_ === undefined) return this._selection;
        if (this._monitorHandle) {
            this._monitorHandle.remove();
        }
        this._selection = _;
        this._monitorHandle = _.monitor((id, newVal, oldVal) => {
            this.broadcast(id, newVal, oldVal, _);
        });
        return this;
    }

    //  Activity overrides ---
    hash(more: { [key: string]: any } = {}): string {
        return hashSum({
            selection: this.selection().hash(),
            ...more
        });
    }

    label(): string {
        return this.selection().label();
    }

    refreshMeta(): Promise<void> {
        return this.selection().refreshMeta();
    }

    updatedBy(): string[] {
        return this.selection().updatedBy();
    }

    inFields(): DDL2.IField[] {
        return this.selection().inFields();
    }

    outFields(): DDL2.IField[] {
        return this.selection().outFields();
    }

    localFields(): DDL2.IField[] {
        return this.selection().localFields();
    }

    fieldOrigin(fieldID: string): Activity | null {
        return this.selection().fieldOrigin(fieldID);
    }

    referencedFields(refs: ReferencedFields) {
        this.selection().referencedFields(refs);
    }

    resolveInFields(refs: ReferencedFields, fieldIDs: string[]) {
        this.selection().resolveInFields(refs, fieldIDs);
    }

    resolveFields(refs: ReferencedFields, fieldIDs: string[]) {
        this.selection().resolveFields(refs, fieldIDs);
    }

    exec(): Promise<void> {
        return this.selection().exec();
    }

    outData(): ReadonlyArray<object> {
        return this.selection().outData();
    }
}
ActivitySelection.prototype._class += " ActivitySelection";

export class DatasourceAdapt implements IDatasource {
    _activity: Activity;

    constructor(activity: Activity) {
        this._activity = activity;
    }

    exec(): Promise<void> {
        return this._activity.exec();
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
        return this._activity.outFields();
    }
    total(): number {
        return this._activity.outData().length;
    }
    fetch(from: number, count: number): Promise<ReadonlyArray<object>> {
        const data = this._activity.outData();
        if (from === 0 && data.length <= count) {
            return Promise.resolve(data);
        }
        return Promise.resolve(data.slice(from, from + count));
    }
}
