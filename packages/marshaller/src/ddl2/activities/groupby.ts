import { PropertyExt } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { deviation as d3Deviation, max as d3Max, mean as d3Mean, median as d3Median, min as d3Min, sum as d3Sum, variance as d3Variance } from "d3-array";
import { nest as d3Nest } from "d3-collection";
import { Activity, IActivityError, ReferencedFields } from "./activity.ts";

export class GroupByColumn extends PropertyExt {
    private _owner: GroupBy;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.label_valid()) {
            retVal.push({
                source: `${prefix}.label`,
                msg: `Invalid label:  "${this.label()}"`,
                hint: `expected ${JSON.stringify(this.columns())}`
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): GroupBy;
    owner(_: GroupBy): this;
    owner(_?: GroupBy): GroupBy | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.label();
    }

    toDDL(): string {
        return this.label();
    }

    fromDDL(label: string): this {
        return this
            .label(label)
            ;
    }

    static fromDDL(label: string): GroupByColumn {
        return new GroupByColumn().fromDDL(label);
    }

    hash(): string {
        return hashSum(this.label());
    }

    columns() {
        return this._owner.inFieldIDs();
    }
}
GroupByColumn.prototype._class += " GroupByColumn";

export interface GroupByColumn {
    label(): string;
    label(_: string): this;
    label_valid(): boolean;
}

//  ===========================================================================
export type AggrFuncCallback = (item: any) => number;
export type AggrFunc = (leaves: any[], callback: AggrFuncCallback) => number;
function localCount(leaves: any[], callback: AggrFuncCallback): number {
    return leaves.length;
}

const d3Aggr: { [key: string]: AggrFunc } = {
    count: localCount,
    min: d3Min,
    max: d3Max,
    mean: d3Mean,
    median: d3Median,
    variance: d3Variance,
    deviation: d3Deviation,
    sum: d3Sum
};

export type AggregateType = "count" | "min" | "max" | "sum" | "mean" | "median" | "variance" | "deviation";
export class AggregateField extends PropertyExt {
    private _owner: GroupBy;

    disableAggrColumn(): boolean {
        return !this.fieldID() || !this.aggrType() || this.aggrType() === "count";
    }

    disableBaseCountColumn(): boolean {
        return !this.fieldID() || !this.aggrType() || this.aggrType() !== "mean";
    }

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.aggrColumn_valid()) {
            retVal.push({
                source: `${prefix}.${this.fieldID()}.aggrColumn`,
                msg: `Invalid aggrColumn:  "${this.aggrColumn()}"`,
                hint: `expected ${JSON.stringify(this.columns())}`
            });
        }
        if (!this.baseCountColumn_valid()) {
            retVal.push({
                source: `${prefix}.${this.fieldID()}.aggrColumn`,
                msg: `Invalid baseCountColumn:  "${this.baseCountColumn()}"`,
                hint: `expected ${JSON.stringify(this.columns())}`
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): GroupBy;
    owner(_: GroupBy): this;
    owner(_?: GroupBy): GroupBy | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.fieldID();
    }

    toDDL(): DDL2.IAggregate | DDL2.ICount {
        if (this.aggrType() === "count") {
            return {
                fieldID: this.fieldID(),
                type: "count"
            };
        }
        return {
            fieldID: this.fieldID(),
            type: this.aggrType() as DDL2.IAggregateType,
            inFieldID: this.aggrColumn(),
            baseCountFieldID: this.baseCountColumn()
        };
    }

    fromDDL(ddl: DDL2.IAggregate | DDL2.ICount): this {
        const retVal = this
            .fieldID(ddl.fieldID)
            .aggrType(ddl.type)
            ;
        if (ddl.type !== "count") {
            retVal.aggrColumn(ddl.inFieldID);
            retVal.baseCountColumn(ddl.baseCountFieldID);
        }
        return retVal;
    }

    static fromDDL(ddl: DDL2.IAggregate | DDL2.ICount): AggregateField {
        return new AggregateField().fromDDL(ddl);
    }

    hash(): string {
        return hashSum({
            label: this.fieldID(),
            aggrType: this.aggrType(),
            aggrColumn: this.aggrColumn()
        });
    }

    columns() {
        return this._owner.inFieldIDs();
    }

    hasColumn() {
        return this.columns().length;
    }

    aggregate(values: Array<{ [key: string]: any }>) {
        return d3Aggr[this.aggrType() as string](values, leaf => +leaf[this.aggrColumn()]);
    }

    aggrFunc(): (leaves: any[]) => number {
        const aggrFunc = d3Aggr[this.aggrType() as string];
        const aggrColumn = this.aggrColumn();
        const baseCountColumn = this.baseCountColumn();
        if (baseCountColumn) {
            return (values: any[]) => {
                return aggrFunc(values, leaf => +leaf[aggrColumn] / +leaf[baseCountColumn]);
            };
        } else {
            return (values: any[]) => {
                return aggrFunc(values, leaf => +leaf[aggrColumn]);
            };
        }
    }
}
AggregateField.prototype._class += " AggregateField";

export interface AggregateField {
    fieldID(): string;
    fieldID(_: string): this;
    aggrType(): AggregateType;
    aggrType(_: AggregateType): this;
    aggrColumn(): string;
    aggrColumn(_: string): this;
    aggrColumn_valid(): boolean;
    baseCountColumn(): string;
    baseCountColumn(_: string): this;
    baseCountColumn_valid(): boolean;
}

//  ===========================================================================
export class GroupBy extends Activity {

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const gbColumn of this.validGroupBy()) {
            retVal = retVal.concat(gbColumn.validate("GroupBy.column"));
        }
        for (const cfs of this.validComputedFields()) {
            retVal = retVal.concat(cfs.validate("GroupBy.computedFields"));
        }
        return retVal;
    }

    constructor() {
        super();
    }

    toDDL(): DDL2.IGroupBy {
        return {
            type: "groupby",
            groupByIDs: this.fieldIDs(),
            aggregates: this.aggregates()
        };
    }

    fromDDL(ddl: DDL2.IGroupBy): this {
        return this
            .fieldIDs(ddl.groupByIDs)
            .aggregates(ddl.aggregates)
            ;
    }

    static fromDDL(ddl: DDL2.IGroupBy): GroupBy {
        return new GroupBy().fromDDL(ddl);
    }

    fieldIDs(): string[];
    fieldIDs(_: string[]): this;
    fieldIDs(_?: string[]): string[] | this {
        if (!arguments.length) return this.validGroupBy().map(gb => gb.toDDL());
        this.column(_.map(fieldID => GroupByColumn.fromDDL(fieldID)));
        return this;
    }

    aggregates(): DDL2.AggregateType[];
    aggregates(_: DDL2.AggregateType[]): this;
    aggregates(_?: DDL2.AggregateType[]): DDL2.AggregateType[] | this {
        if (!arguments.length) return this.validComputedFields().map(cf => cf.toDDL());
        this.computedFields(_.map(aggrType => AggregateField.fromDDL(aggrType)));
        return this;
    }

    //  Activity
    hash(): string {
        return hashSum({
            groupBy: this.column().map(gb => gb.hash()),
            computedFields: this.computedFields().map(cf => cf.hash())
        });
    }

    appendGroupBys(columns: [{ field: string }]): this {
        for (const column of columns) {
            this.column().push(new GroupByColumn()
                .owner(this)
                .label(column.field)
            );
        }
        return this;
    }

    validGroupBy(): GroupByColumn[] {
        return this.column().filter(groupBy => groupBy.valid());
    }

    exists(): boolean {
        return this.validGroupBy().length > 0;
    }

    inFieldIDs(): string[] {
        return this.inFields().map(field => field.id);
    }

    field(fieldID: string): DDL2.IField | null {
        for (const field of this.inFields()) {
            if (field.id === fieldID) {
                return field;
            }
        }
        return null;
    }

    appendComputedFields(aggregateFields: [{ label: string, type: AggregateType, column?: string }]): this {
        for (const aggregateField of aggregateFields) {
            const aggrField = new AggregateField()
                .owner(this)
                .fieldID(aggregateField.label)
                .aggrType(aggregateField.type)
                ;
            if (aggregateField.column !== void 0) {
                aggrField.aggrColumn(aggregateField.column);
            }
            this.computedFields().push(aggrField);
        }
        return this;
    }

    validComputedFields() {
        return this.computedFields().filter(computedField => computedField.valid());
    }

    hasComputedFields(): boolean {
        return this.validComputedFields().length > 0;
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        if (!this.exists()) return super.computeFields(inFields);
        const retVal: DDL2.IField[] = [];
        const groups: GroupByColumn[] = this.validGroupBy();
        for (const groupBy of groups) {
            const groupByField = this.field(groupBy.label());
            const field = {
                type: groupByField ? groupByField.type : "string",
                id: groupBy.label()
            } as DDL2.IField;
            retVal.push(field);
        }
        for (const cf of this.computedFields()) {
            if (cf.fieldID()) {
                const computedField: DDL2.IField = {
                    id: cf.fieldID(),
                    type: "number"
                };
                retVal.push(computedField);
            }
        }
        if (this.details()) {
            let detailsTarget: DDL2.IField[] = retVal;
            if (this.exists()) {
                const rows: DDL2.IField = {
                    id: "values",
                    type: "dataset",
                    children: []
                };
                retVal.push(rows);
                detailsTarget = rows.children;
            }
            const columns = groups.map(groupBy => groupBy.label());
            detailsTarget.push(...this.inFields().filter(field => {
                return this.fullDetails() || columns.indexOf(field.id) < 0;
            }));
        }
        return () => retVal;
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const fieldIDs: string[] = [];
        for (const gb of this.validGroupBy()) {
            fieldIDs.push(gb.label());
        }
        for (const cf of this.validComputedFields()) {
            if (cf.aggrColumn()) {
                fieldIDs.push(cf.aggrColumn());
            }
        }
        super.resolveInFields(refs, fieldIDs);
    }

    computeData(): ReadonlyArray<object> {
        const data = super.computeData();
        if (data.length === 0 || !this.exists()) return data;
        const columnLabels: string[] = this.validGroupBy().map(gb => gb.label());
        const computedFields = this.validComputedFields().map(cf => {
            return { label: cf.fieldID(), aggrFunc: cf.aggrFunc() };
        });
        const retVal = d3Nest()
            .key((row: { [key: string]: any }) => {
                let key = "";
                for (const groupByLabel of columnLabels) {
                    key += ":" + row[groupByLabel];
                }
                return key;
            })
            .entries(data as object[]).map(_row => {
                const row: {
                    [key: string]: any
                } = _row;
                delete row.key;
                for (const groupByLabel of columnLabels) {
                    row[groupByLabel] = row.values[0][groupByLabel];
                }
                for (const cf of computedFields) {
                    row[cf.label] = cf.aggrFunc(row.values);
                }
                return row;
            })
            ;
        const outFields = this.outFields();
        return retVal.map(row => {
            const retVal = {};
            for (const field of outFields) {
                retVal[field.id] = row[field.id];
            }
            return retVal;
        });
    }
}
GroupBy.prototype._class += " GroupBy";

export interface GroupBy {
    column(): GroupByColumn[];
    column(_: GroupByColumn[]): this;
    computedFields(): AggregateField[];
    computedFields(_: AggregateField[]): this;
    details(): boolean;
    details(_: boolean): this;
    fullDetails(): boolean;
    fullDetails(_: boolean): this;
}

GroupByColumn.prototype.publish("label", undefined, "set", "Field", function (this: GroupByColumn) { return this.columns(); }, {
        optional: true,
        validate: (w: GroupByColumn): boolean => w.columns().indexOf(w.label()) >= 0
    });

AggregateField.prototype.publish("fieldID", null, "string", "new Field ID", null, { optional: true, disable: (w: AggregateField) => !w.hasColumn() });
AggregateField.prototype.publish("aggrType", "count", "set", "Aggregation Type", ["count", "min", "max", "sum", "mean", "median", "variance", "deviation"], { optional: true, disable: (w: AggregateField) => !w.fieldID() });
AggregateField.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function (this: AggregateField) { return this.columns(); }, {
        optional: true,
        disable: (w: AggregateField) => w.disableAggrColumn(),
        validate: (w: AggregateField): boolean => w.columns().indexOf(w.aggrColumn()) >= 0
    });
AggregateField.prototype.publish("baseCountColumn", null, "set", "Base Count Field", function (this: AggregateField) { return this.columns(); }, {
        optional: true,
        disable: (w: AggregateField) => w.disableBaseCountColumn(),
        validate: (w: AggregateField): boolean => w.columns().indexOf(w.baseCountColumn()) >= 0
    });

GroupBy.prototype.publish("column", [], "propertyArray", "Source Columns", null, { autoExpand: GroupByColumn });
GroupBy.prototype.publish("computedFields", [], "propertyArray", "Computed Fields", null, { autoExpand: AggregateField });
GroupBy.prototype.publish("details", false, "boolean", "Show details");
GroupBy.prototype.publish("fullDetails", false, "boolean", "Show groupBy fileds in details");