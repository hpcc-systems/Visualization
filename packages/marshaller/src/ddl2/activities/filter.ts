import { PropertyExt, publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model/element";
import { Activity, IActivityError, ReferencedFields } from "./activity";

function createFilter(condition: DDL2.IMappingConditionType, lf: string, val: string | number): (localRow: any) => boolean {
    const isString = typeof val === "string";
    switch (condition) {
        case "==":
            return (localRow) => isString && typeof localRow[lf] === "string" ? localRow[lf].trim() === val : localRow[lf] === val;
        case "!=":
            return (localRow) => isString && typeof localRow[lf] === "string" ? localRow[lf].trim() !== val : localRow[lf] !== val;
        case "<":
            return (localRow) => localRow[lf] < val;
        case "<=":
            return (localRow) => localRow[lf] <= val;
        case ">":
            return (localRow) => localRow[lf] > val;
        case ">=":
            return (localRow) => localRow[lf] >= val;
        default:
            throw new Error(`Unknown filter condition:  ${condition}`);
    }
}

export class ColumnMapping extends PropertyExt {
    private _owner: RemoteFilter;

    @publish(null, "set", "Filter Fields", function (this: ColumnMapping) { return this.sourceOutFields(); }, {
        optional: true,
        disable: (w: ColumnMapping): boolean => !w._owner.source(),
        validate: (w: ColumnMapping): boolean => w.sourceOutFields().indexOf(w.remoteField()) >= 0
    })
    remoteField: publish<this, string>;
    remoteField_exists: () => boolean;
    remoteField_valid: () => boolean;
    @publish(null, "set", "Local Fields", function (this: ColumnMapping) { return this.localFields(); }, {
        optional: true,
        disable: (w: ColumnMapping): boolean => !w._owner.source(),
        validate: (w: ColumnMapping): boolean => w.localFields().indexOf(w.localField()) >= 0
    })
    localField: publish<this, string>;
    localField_exists: () => boolean;
    localField_valid: () => boolean;
    @publish("==", "set", "Filter Fields", ["==", "!=", ">", ">=", "<", "<=", "range", "in"])
    condition: publish<this, DDL2.IMappingConditionType>;
    @publish(false, "boolean", "Ignore null filters")
    nullable: publish<this, boolean>;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.remoteField_valid()) {
            retVal.push({
                source: `${prefix}.remoteField`,
                msg: `Invalid remoteField:  "${this.remoteField()}"`,
                hint: `expected:  ${JSON.stringify(this.sourceOutFields())}`
            });
        }
        if (!this.localField_valid()) {
            retVal.push({
                source: `${prefix}.localField`,
                msg: `Invalid localField:  "${this.localField()}"`,
                hint: `expected:  ${JSON.stringify(this.localFields())}`
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): RemoteFilter;
    owner(_: RemoteFilter): this;
    owner(_?: RemoteFilter): RemoteFilter | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return this.localField_exists() || this.remoteField_exists();
    }

    toDDL(): DDL2.IMapping {
        return {
            remoteFieldID: this.remoteField(),
            localFieldID: this.localField(),
            condition: this.condition(),
            nullable: this.nullable()
        };
    }

    fromDDL(ddl: DDL2.IMapping): this {
        return this
            .remoteField(ddl.remoteFieldID)
            .localField(ddl.localFieldID)
            .condition(ddl.condition)
            .nullable(ddl.nullable)
            ;
    }

    static fromDDL(ddl: DDL2.IMapping): ColumnMapping {
        return new ColumnMapping().fromDDL(ddl);
    }

    hash() {
        return hashSum({
            remoteField: this.remoteField(),
            localField: this.localField(),
            condition: this.condition(),
            nullable: this.nullable()
        });
    }

    localFields(): string[] {
        return this._owner.inFields().map(field => field.id);
    }

    sourceOutFields(): string[] {
        return this._owner.sourceOutFields().map(field => field.id);
    }

    remoteValues(filterSelection: any[]): Array<number | string> {
        const rf = this.remoteField();
        return filterSelection.map(sel => {
            const retVal = sel[rf];
            if (typeof retVal === "string") {
                return retVal.trim();
            }
            return retVal;
        });
    }

    createFilterDescription(filterSelection: any[]): string {
        switch (this.condition()) {
            case "in":
            case "range":
                return `${this.localField()} ${this.condition()} [${this.remoteValues(filterSelection).join(", ")}]`;
            default:
                return `${this.localField()} ${this.condition()} ${this.remoteValues(filterSelection)[0]}`;
        }
    }

    createFilter(filterSelection: any[]): (localRow: any) => boolean {
        const lf = this.localField();
        const fsArr = this.remoteValues(filterSelection);
        switch (this.condition()) {
            case "range":
                if (this.nullable() && (fsArr.length < 2 || fsArr[0] === fsArr[1])) {
                    return (localRow) => true;
                }
                return (localRow) => localRow[lf] >= fsArr[0] && localRow[lf] <= fsArr[1];
            case "in":
                if (this.nullable() && fsArr.length === 0) {
                    return (localRow) => true;
                }
                return (localRow) => fsArr.some(fs => typeof localRow[lf] === "string" ? localRow[lf].trim() === fs : localRow[lf] === fs);
            default:
                const fs0 = fsArr[0];
                if (this.nullable() && (fs0 === undefined || fs0 === null || fs0 === "")) {
                    return (localRow) => true;
                }
                return createFilter(this.condition(), lf, fs0);
        }
    }
}
ColumnMapping.prototype._class += " ColumnMapping";

export class RemoteFilter extends PropertyExt {
    private _owner: Filters;

    @publish(null, "set", "Activity", function (this: RemoteFilter) { return this.visualizationIDs(); }, {
        optional: true,
        validate: (w: RemoteFilter): boolean => w.visualizationIDs().indexOf(w.source()) >= 0
    })
    source: publish<this, string>;
    source_exists: () => boolean;
    source_valid: () => boolean;
    @publish([], "propertyArray", "Mappings", null, { autoExpand: ColumnMapping })
    mappings: publish<this, ColumnMapping[]>;

    validate(prefix: string): IActivityError[] {
        let retVal: IActivityError[] = [];
        if (!this.source_valid()) {
            retVal.push({
                source: `${prefix}.source.${this.source()}`,
                msg: `Invalid source:  "${this.source()}"`,
                hint: `expected:  ${JSON.stringify(this.visualizationIDs())}`
            });
        }
        if (this.source_exists() && this.validMappings().length === 0) {
            retVal.push({
                source: `${prefix}.source.${this.source()}`,
                msg: `Invalid mappings:  "${this.source()}"`,
                hint: "expected minimum of 1 mapping"
            });
        }
        for (const mapping of this.validMappings()) {
            retVal = retVal.concat(mapping.validate(`${prefix}.${this.source()}.mappings`));
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): Filters;
    owner(_: Filters): this;
    owner(_?: Filters): Filters | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.source() && this.validMappings().length > 0;
    }

    toDDL(): DDL2.IFilterCondition {
        return {
            viewID: this.source(),
            mappings: this.ddlMappings()
        };
    }

    fromDDL(ddl: DDL2.IFilterCondition): this {
        return this
            .source(ddl.viewID)
            .ddlMappings(ddl.mappings)
            ;
    }

    static fromDDL(ddl: DDL2.IFilterCondition): RemoteFilter {
        return new RemoteFilter().fromDDL(ddl);
    }

    ddlMappings(): DDL2.IMapping[];
    ddlMappings(_: DDL2.IMapping[]): this;
    ddlMappings(_?: DDL2.IMapping[]): DDL2.IMapping[] | this {
        if (!arguments.length) return this.validMappings().map(mapping => mapping.toDDL());
        this.mappings(_.map(mapping => ColumnMapping.fromDDL(mapping)));
        return this;
    }

    visualizationIDs() {
        return this._owner.visualizationIDs();
    }

    hash(): string {
        return hashSum({
            source: this.source(),
            mappings: this.validMappings().map(mapping => mapping.hash()),
            selection: this.sourceSelection()
        });
    }

    validMappings(): ColumnMapping[] {
        return this.mappings().filter(mapping => mapping.valid());
    }

    appendMappings(mappings: Array<{ remoteField: string, localField: string, condition: DDL2.IMappingConditionType }>): this {
        for (const mapping of mappings) {
            this.mappings().push(new ColumnMapping()
                .owner(this)
                .remoteField(mapping.remoteField)
                .localField(mapping.localField)
                .condition(mapping.condition)
            );
        }
        return this;
    }

    inFields(): ReadonlyArray<DDL2.IField> {
        return this._owner.inFields();
    }

    sourceViz(): Element {
        return this._owner.visualization(this.source());
    }

    sourceOutFields(): ReadonlyArray<DDL2.IField> {
        return this.sourceViz().hipiePipeline().selectionFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().selection();
    }

    createFilter(): (localRow: any) => boolean {
        const selection = this.sourceSelection();
        const mappingFilters = this.validMappings().map(mapping => mapping.createFilter(selection));
        return (row: object): boolean => mappingFilters.every(mappingFilter => mappingFilter(row));
    }

    createFilterDescription(): string {
        const selection = this.sourceSelection();
        const mappingFilterDescs = this.validMappings().map(mapping => mapping.createFilterDescription(selection));
        return mappingFilterDescs.join(", ");
    }
}
RemoteFilter.prototype._class += " Filter";

export class StaticFilter extends PropertyExt {
    private _owner: Filters;

    @publish(null, "set", "Local Fields", function (this: ColumnMapping) { return this.localFields(); }, {
        optional: true,
        validate: (w: StaticFilter): boolean => w.localFields().indexOf(w.localField()) >= 0
    })
    localField: publish<this, string>;
    localField_exists: () => boolean;
    localField_valid: () => boolean;
    @publish("==", "set", "Filter Fields", ["==", "!=", ">", ">=", "<", "<="])
    condition: publish<this, DDL2.IMappingConditionType>;
    @publish("", "any", "Static Value")
    value: publish<this, string | number | boolean>;
    value_exists: () => boolean;
    value_valid: () => boolean;
    @publish("number", "set", "Static Value Type", ["number", "string"])
    valueType: publish<this, "number" | "string">;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.localField_valid()) {
            retVal.push({
                source: `${prefix}.localField`,
                msg: `Invalid localField:  "${this.localField()}"`,
                hint: `expected:  ${JSON.stringify(this.localFields())}`
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): Filters;
    owner(_: Filters): this;
    owner(_?: Filters): Filters | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    coerceValue(): string | number;
    coerceValue(_: string | number): this;
    coerceValue(_?: string | number): string | number | this {
        if (arguments.length === 0) {
            switch (this.valueType()) {
                case "number":
                    return +this.value();
                case "string":
                default:
                    return "" + this.value();
            }
        }
        this.value(_);
        if (typeof _ === "number") {
            this.valueType("number");
        } else {
            this.valueType("string");
        }
        return this;
    }

    valid(): boolean {
        return this.localField_exists() && this.value_exists();
    }

    toDDL(): DDL2.IFilterStaticCondition {
        return {
            localFieldID: this.localField(),
            condition: this.condition(),
            value: this.coerceValue()
        };
    }

    fromDDL(ddl: DDL2.IFilterStaticCondition): this {
        return this
            .localField(ddl.localFieldID)
            .condition(ddl.condition)
            .coerceValue(ddl.value)
            ;
    }

    static fromDDL(ddl: DDL2.IFilterStaticCondition): StaticFilter {
        return new StaticFilter().fromDDL(ddl);
    }

    hash() {
        return hashSum({
            localField: this.localField(),
            condition: this.condition(),
            value: this.value(),
            valueType: this.valueType()
        });
    }

    localFields(): string[] {
        return this._owner.inFields().map(field => field.id);
    }

    createFilterDescription(): string {
        return `${this.localField()} ${this.condition()} ${this.coerceValue()}`;
    }

    createFilter(): (localRow: any) => boolean {
        return createFilter(this.condition(), this.localField(), this.coerceValue());
    }
}
StaticFilter.prototype._class += " StaticFilter";

type FilterT = RemoteFilter | StaticFilter;

export class Filters extends Activity {
    static Filter = RemoteFilter;
    static Mapping = ColumnMapping;

    @publish([], "propertyArray", "Remote Filter", null, { autoExpand: RemoteFilter })
    remoteFilter: publish<this, RemoteFilter[]>;

    @publish([], "propertyArray", "Static Filter", null, { autoExpand: StaticFilter })
    staticFilter: publish<this, StaticFilter[]>;

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const filter of this.validFilters()) {
            retVal = retVal.concat(filter.validate("filter"));
        }
        return retVal;
    }

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IFilter {
        return {
            type: "filter",
            conditions: this.conditions()
        };
    }

    fromDDL(ddl: DDL2.IFilter): this {
        return this
            .conditions(ddl.conditions)
            ;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.IFilter): Filters {
        return new Filters(ec).fromDDL(ddl);
    }

    conditions(): DDL2.FilterCondition[];
    conditions(_: DDL2.FilterCondition[]): this;
    conditions(_?: DDL2.FilterCondition[]): DDL2.FilterCondition[] | this {
        if (!arguments.length) return this.validFilters().map(filter => filter.toDDL());
        const remoteFilters: RemoteFilter[] = [];
        const staticFilters: StaticFilter[] = [];
        _.forEach(fc => {
            if (DDL2.isIFilterCondition(fc)) {
                remoteFilters.push(RemoteFilter.fromDDL(fc));
            } else {
                staticFilters.push(StaticFilter.fromDDL(fc));
            }
        });
        this.remoteFilter(remoteFilters);
        this.staticFilter(staticFilters);
        return this;
    }

    visualizationIDs(): string[] {
        return this._ec.elementIDs();
    }

    visualization(sourceID: string | PropertyExt): Element {
        return this._ec.element(sourceID);
    }

    //  Activity overrides  ---
    hash(): string {
        return hashSum(this.validFilters().map(f => {
            return {
                filter: f.hash()
            };
        }));
    }

    exists(): boolean {
        return this.validFilters().length > 0;
    }

    updatedBy(): string[] {
        return this.validRemoteFilters().map(filter => filter.source());
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const localFieldIDs: string[] = [];
        for (const filter of this.validRemoteFilters()) {
            const filterSource = filter.sourceViz().hipiePipeline();
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

    computeData(): ReadonlyArray<object> {
        const data = super.computeData();
        if (data.length === 0 || !this.exists()) return data;
        const filters = this.validFilters().map(filter => filter.createFilter());
        return data.filter(row => {
            return filters.every(filter => filter(row));
        });
    }

    //  --- --- ---
    validRemoteFilters(): RemoteFilter[] {
        return this.remoteFilter().filter(filter => filter.valid());
    }

    validStaticFilters(): StaticFilter[] {
        return this.staticFilter().filter(filter => filter.valid());
    }

    validFilters(): FilterT[] {
        return [...this.validRemoteFilters(), ...this.validStaticFilters()];
    }
}
Filters.prototype._class += " Filters";
