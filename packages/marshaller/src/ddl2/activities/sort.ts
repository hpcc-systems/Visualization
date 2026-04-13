import { PropertyExt, publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { ascending as d3Ascending, descending as d3Descending } from "d3-array";
import { Activity, IActivityError, ReferencedFields } from "./activity";

export class SortColumn extends PropertyExt {
    private _owner: Sort;

    @publish(null, "set", "Sort Field", function (this: SortColumn) { return this.fieldIDs(); }, {
        optional: true,
        validate: (w: SortColumn): boolean => w.fieldIDs().indexOf(w.fieldID()) >= 0
    })
    fieldID: publish<this, string>;
    fieldID_valid: () => boolean;
    @publish(false, "boolean", "Sort Field")
    descending: publish<this, boolean>;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.fieldID_valid()) {
            retVal.push({
                source: `${prefix}.fieldID`,
                msg: `Invalid fieldID:  ${this.fieldID()}`,
                hint: `expected ${JSON.stringify(this.fieldIDs())}`
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): Sort;
    owner(_: Sort): this;
    owner(_?: Sort): Sort | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.fieldID();
    }

    toDDL(): DDL2.ISortCondition {
        return {
            fieldID: this.fieldID(),
            descending: this.descending()
        };
    }

    fromDDL(ddl: DDL2.ISortCondition): this {
        return this
            .fieldID(ddl.fieldID)
            .descending(ddl.descending)
            ;
    }

    static fromDDL(ddl: DDL2.ISortCondition): SortColumn {
        return new SortColumn().fromDDL(ddl);
    }

    hash(): string {
        return hashSum({
            sortColumn: this.fieldID(),
            descending: this.descending()
        });
    }

    fieldIDs() {
        return this._owner.fieldIDs();
    }

    field(id: string): DDL2.IField | undefined {
        return this._owner.inFields().filter(field =>
            field.id === id
        )[0];
    }
}
SortColumn.prototype._class += " SortColumn";

//  ===========================================================================
export class Sort extends Activity {
    static Column = SortColumn;

    @publish([], "propertyArray", "Source Columns", null, { autoExpand: SortColumn })
    column: publish<this, SortColumn[]>;

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const sb of this.validSortBy()) {
            retVal = retVal.concat(sb.validate("Sort.column"));
        }
        return retVal;
    }

    constructor() {
        super();
    }

    toDDL(): DDL2.ISort {
        return {
            type: "sort",
            conditions: this.conditions()
        };
    }

    fromDDL(ddl: DDL2.ISort): this {
        this.conditions(ddl.conditions);
        return this;
    }

    static fromDDL(ddl: DDL2.ISort) {
        return new Sort().fromDDL(ddl);
    }

    conditions(): DDL2.ISortCondition[];
    conditions(_: DDL2.ISortCondition[]): this;
    conditions(_?: DDL2.ISortCondition[]): DDL2.ISortCondition[] | this {
        if (!arguments.length) return this.validSortBy().map(column => column.toDDL());
        this.column(_.map(condition => SortColumn.fromDDL(condition)));
        return this;
    }

    //  Activitiy  ---
    hash(): string {
        return hashSum({
            Sort: this.column().map(sb => sb.hash())
        });
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        super.resolveInFields(refs, this.validSortBy().map(sortBy => sortBy.fieldID()));
    }

    validSortBy(): SortColumn[] {
        return this.column().filter(sortBy => sortBy.fieldID());
    }

    exists(): boolean {
        return this.validSortBy().length > 0;
    }

    fieldIDs(): string[] {
        return this.inFields().map(field => field.id);
    }

    computeData(): ReadonlyArray<object> {
        const data = super.computeData();
        const sortByArr: Array<{ compare: (l, r) => number, id: string }> = [];
        for (const sortBy of this.validSortBy()) {
            sortByArr.push({
                compare: sortBy.descending() ? d3Descending : d3Ascending,
                id: sortBy.fieldID()
            });
        }

        if (sortByArr.length) {
            return [...data].sort((l: any, r: any) => {
                for (const item of sortByArr) {
                    const retVal2 = item.compare(l[item.id], r[item.id]);
                    if (retVal2 !== 0) {
                        return retVal2;
                    }
                }
                return 0;
            });

        }
        return data;
    }
}
Sort.prototype._class += " Sort";
