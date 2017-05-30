import { IMonitorHandle, PropertyExt } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IDatasource, IField } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";

export function schemaRow2IField(row: any): IField {
    return {
        id: row.name,
        label: row.name,
        type: row.type,
        children: (row._children && row._children.length) ? row._children.map(schemaRow2IField) : null
    };
}

export type ReferencedFields = { [activityID: string]: string[] };

export abstract class Activity extends PropertyExt {
    private _sourceActivity: Activity;

    sourceActivity(): Activity;
    sourceActivity(_: Activity): this;
    sourceActivity(_?: Activity): Activity | this {
        if (!arguments.length) return this._sourceActivity;
        this._sourceActivity = _;
        return this;
    }

    datasource(): DDL2.IDatasource | null;
    datasource(_?: DDL2.IDatasource): this;
    datasource(_?: DDL2.IDatasource): DDL2.IDatasource | null | this {
        if (!arguments.length) return null;
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

    label(): string {
        return this.id();
    }

    updatedBy(): string[] {
        return [];
    }

    inFields(): IField[] {
        return this._sourceActivity ? this._sourceActivity.outFields() : [];
    }

    outFields(): IField[] {
        return this.inFields();
    }

    localFields(): IField[] {
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
                if (!refs[fieldOrigin.id()]) {
                    refs[fieldOrigin.id()] = [];
                }
                if (refs[fieldOrigin.id()].indexOf(fieldID) < 0) {
                    refs[fieldOrigin.id()].push(fieldID);
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

    pullData(): object[] {
        return this._sourceActivity ? this._sourceActivity.pullData() || [] : [];
    }
}

export class ActivityArray extends Activity {
    private _activities: Activity[] = [];

    activities(): Activity[];
    activities(_: Activity[]): this;
    activities(_?: Activity[]): Activity[] | this {
        if (_ === undefined) return this._activities;
        this._activities = _;
        return this;
    }
}
ActivityArray.prototype._class += " ActivityArray";

export class ActivitySequence extends ActivityArray {

    first(): Activity {
        const retVal = this.activities();
        return retVal[0];
    }

    last(): Activity {
        const retVal = this.activities();
        return retVal[retVal.length - 1];
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

    inFields(): IField[] {
        return this.first().inFields();
    }

    outFields(): IField[] {
        return this.last().outFields();
    }

    localFields(): IField[] {
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
}
ActivitySequence.prototype._class += " ActivitySequence";

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

    inFields(): IField[] {
        return this.selection().inFields();
    }

    outFields(): IField[] {
        return this.selection().outFields();
    }

    localFields(): IField[] {
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

    pullData(): object[] {
        return this.selection().pullData();
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
    outFields(): IField[] {
        return this._activity.outFields();
    }
    total(): number {
        return this._activity.pullData().length;
    }
    fetch(from: number, count: number): Promise<any[]> {
        return Promise.resolve(this._activity.pullData().slice(from, from + count));
    }
}
