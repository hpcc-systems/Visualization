import { PropertyExt, publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IField } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";
import { Viz } from "../viz";
import { Activity, ReferencedFields } from "./activity";
import { View } from "./view";

export class ColumnMapping extends PropertyExt {
    _owner: Filter;

    @publish(null, "set", "Filter Fields", function (this: ColumnMapping) { return this.sourceOutFields(); }, { optional: true })
    remoteField: publish<this, string>;
    @publish(null, "set", "Local Fields", function (this: ColumnMapping) { return this.localFields(); }, { optional: true })
    localField: publish<this, string>;
    @publish("==", "set", "Filter Fields", ["==", "!=", ">", ">=", "<", "<=", "contains"])
    condition: publish<this, DDL2.IMappingConditionType>;

    constructor(owner: Filter) {
        super();
        this._owner = owner;
    }

    hash() {
        return hashSum({
            remoteField: this.remoteField(),
            localField: this.localField(),
            condition: this.condition()
        });
    }

    localFields() {
        return this._owner.inFields().map(field => field.label);
    }

    sourceOutFields() {
        return this._owner.sourceOutFields().map(field => field.label);
    }

    createFilter(filterSelection: any[]): (localRow: any) => boolean {
        const lf = this.localField();
        const rf = this.remoteField();
        switch (this.condition()) {
            case "==":
                return (localRow) => localRow[lf] === filterSelection[0][rf];
            case "!=":
                return (localRow) => localRow[lf] !== filterSelection[0][rf];
            case "<":
                return (localRow) => localRow[lf] < filterSelection[0][rf];
            case "<=":
                return (localRow) => localRow[lf] <= filterSelection[0][rf];
            case ">":
                return (localRow) => localRow[lf] > filterSelection[0][rf];
            case ">=":
                return (localRow) => localRow[lf] >= filterSelection[0][rf];
            case "contains":
                return (localRow) => filterSelection.some(fsRow => localRow[lf] === fsRow[rf]);
        }
    }

    doFilter(row: object, filterSelection: any[]): boolean {
        return this.createFilter(filterSelection)(row);
    }
}
ColumnMapping.prototype._class += " ColumnMapping";

export class Filter extends PropertyExt {
    private _view: View;
    private _owner: Filters;

    @publish(null, "set", "Datasource", function (this: Filter) { return this.visualizationIDs(); }, { optional: true })
    source: publish<this, string>;
    @publish(false, "boolean", "Ignore null filters")
    nullable: publish<this, boolean>;
    @publish([], "propertyArray", "Mappings", null, { autoExpand: ColumnMapping })
    mappings: publish<this, ColumnMapping[]>;

    constructor(owner: Filters) {
        super();
        this._view = owner._owner;
        this._owner = owner;
    }

    visualizationIDs() {
        return this._view._dashboard.visualizationIDs();
    }

    hash(): string {
        return hashSum({
            source: this.source(),
            nullable: this.nullable(),
            mappings: this.validMappings().map(mapping => mapping.hash())
        });
    }

    validMappings(): ColumnMapping[] {
        return this.mappings().filter(mapping => !!mapping.localField() && !!mapping.remoteField());
    }

    appendMappings(mappings: Array<{ remoteField: string, localField: string }>): this {
        for (const mapping of mappings) {
            this.mappings().push(new ColumnMapping(this)
                .remoteField(mapping.remoteField)
                .localField(mapping.localField)
            );
        }
        return this;
    }

    inFields(): IField[] {
        return this._owner.inFields();
    }

    sourceViz(): Viz {
        return this._view._dashboard.visualization(this.source());
    }

    sourceOutFields(): IField[] {
        return this.sourceViz().view().outFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().state().selection();
    }

    dataFilter(data: any[]): any[] {
        const selection = this.sourceSelection();
        if (selection.length === 0 && !this.nullable()) {
            return [];
        }
        return data;
    }

    rowFilter(row: object): boolean {
        const validMappings = this.validMappings();
        return validMappings.every(mapping => mapping.doFilter(row, this.sourceSelection()));
    }
}
Filter.prototype._class += " Filter";

export class Filters extends Activity {
    _owner: View;

    @publish([], "propertyArray", "Filter", null, { autoExpand: Filter })
    filter: publish<this, Filter[]>;

    constructor(owner: View) {
        super();
        this._owner = owner;
    }

    //  Activity overrides  ---
    hash(): string {
        return hashSum(this.validFilters().map(filter => filter.hash()));
    }

    exists(): boolean {
        return this.validFilters().length > 0;
    }

    updatedBy(): string[] {
        return this.validFilters().map(filter => filter.source());
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const localFieldIDs: string[] = [];
        for (const filter of this.validFilters()) {
            const filterSource = filter.sourceViz().view();
            const remoteFieldIDs: string[] = [];
            for (const mapping of filter.validMappings()) {
                localFieldIDs.push(mapping.localField());
                remoteFieldIDs.push(mapping.remoteField());
            }
            filterSource.resolveFields(refs, remoteFieldIDs);
        }
        super.resolveInFields(refs, localFieldIDs);
    }

    exec(): Promise<void> {
        return super.exec();
    }

    pullData(): object[] {
        let data = super.pullData();
        const filters = this.validFilters();
        //  Test for null selection + nullable
        for (const filter of filters) {
            data = filter.dataFilter(data);
        }
        return data.filter(row => {
            return filters.every(filter => filter.rowFilter(row));
        });
    }

    //  --- --- ---
    validFilters(): Filter[] {
        return this.filter().filter(filter => filter.source());
    }

    appendFilter(source: Viz, mappings: Array<{ remoteField: string, localField: string }>): this {
        this.filter().push(new Filter(this)
            .source(source.id())
            .appendMappings(mappings));
        return this;
    }
}
Filters.prototype._class += " Filters";
