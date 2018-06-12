import { PropertyExt, publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model/element";
import { Activity, IActivityError, ReferencedFields } from "./activity";

export class ColumnMapping extends PropertyExt {
    private _owner: Filter;

    @publish(null, "set", "Filter Fields", function (this: ColumnMapping) { return this.sourceOutFields(); }, { optional: true })
    remoteField: publish<this, string>;
    @publish(null, "set", "Local Fields", function (this: ColumnMapping) { return this.localFields(); }, { optional: true })
    localField: publish<this, string>;
    @publish("==", "set", "Filter Fields", ["==", "!=", ">", ">=", "<", "<=", "range", "in"])
    condition: publish<this, DDL2.IMappingConditionType>;
    @publish(false, "boolean", "Ignore null filters")
    nullable: publish<this, boolean>;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (this.sourceOutFields().indexOf(this.remoteField()) < 0) {
            retVal.push({
                source: `${prefix}.remoteField`,
                msg: `Invalid remoteField:  "${this.remoteField()}"`,
                hint: `expected:  ${JSON.stringify(this.sourceOutFields())}`
            });
        }
        if (this.localFields().indexOf(this.localField()) < 0) {
            retVal.push({
                source: `${prefix}.localField`,
                msg: `Invalid localField:  "${this.localField()}"`,
                hint: `expected:  ${JSON.stringify(this.localFields())}`
            });
        }
        return retVal;
    }

    constructor(owner: Filter) {
        super();
        this._owner = owner;
    }

    toDDL(): DDL2.IMapping {
        return {
            remoteFieldID: this.remoteField(),
            localFieldID: this.localField(),
            condition: this.condition(),
            nullable: this.nullable()
        };
    }

    static fromDDL(owner: Filter, ddl: DDL2.IMapping): ColumnMapping {
        return new ColumnMapping(owner)
            .remoteField(ddl.remoteFieldID)
            .localField(ddl.localFieldID)
            .condition(ddl.condition)
            .nullable(ddl.nullable)
            ;
    }

    hash() {
        return hashSum({
            remoteField: this.remoteField(),
            localField: this.localField(),
            condition: this.condition(),
            nullable: this.nullable()
        });
    }

    localFields() {
        return this._owner.inFields().map(field => field.id);
    }

    sourceOutFields() {
        return this._owner.sourceOutFields().map(field => field.id);
    }

    createFilter(filterSelection: any[]): (localRow: any) => boolean {
        const lf = this.localField();
        const rf = this.remoteField();
        let fs = filterSelection.length ? filterSelection[0][rf] : undefined;
        const isString = typeof fs === "string";
        if (isString) {
            fs = fs.trim();
        }
        if ((fs === undefined || fs === null || fs === "") && this.nullable()) {
            return (localRow) => true;
        }
        switch (this.condition()) {
            case "==":
                return (localRow) => isString && typeof localRow[lf] === "string" ? localRow[lf].trim() === fs : localRow[lf] === fs;
            case "!=":
                return (localRow) => isString && typeof localRow[lf] === "string" ? localRow[lf].trim() !== fs : localRow[lf] !== fs;
            case "<":
                return (localRow) => localRow[lf] < fs;
            case "<=":
                return (localRow) => localRow[lf] <= fs;
            case ">":
                return (localRow) => localRow[lf] > fs;
            case ">=":
                return (localRow) => localRow[lf] >= fs;
            case "range":
                return (localRow) => localRow[lf] >= fs[0] && localRow[lf] <= fs[1];
            case "in":
                return (localRow) => filterSelection.some(fsRow => typeof localRow[lf] === "string" && typeof fsRow[rf] === "string" ? localRow[lf].trim() === fsRow[rf].trim() : localRow[lf] === fsRow[rf]);
            default:
                throw new Error(`Unknown filter condition:  ${this.condition()}`);
        }
    }
}
ColumnMapping.prototype._class += " ColumnMapping";

export class Filter extends PropertyExt {
    private _owner: Filters;

    @publish(null, "set", "Datasource", function (this: Filter) { return this.visualizationIDs(); }, { optional: true })
    source: publish<this, string>;
    @publish([], "propertyArray", "Mappings", null, { autoExpand: ColumnMapping })
    mappings: publish<this, ColumnMapping[]>;

    validate(prefix: string): IActivityError[] {
        let retVal: IActivityError[] = [];
        if (this.visualizationIDs().indexOf(this.source()) < 0) {
            retVal.push({
                source: `${prefix}.source.${this.source()}`,
                msg: `Invalid source:  "${this.source()}"`,
                hint: `expected:  ${JSON.stringify(this.visualizationIDs())}`
            });
        }
        for (const mapping of this.validMappings()) {
            retVal = retVal.concat(mapping.validate(`${prefix}.${this.source()}.mappings`));
        }
        return retVal;
    }

    constructor(owner: Filters) {
        super();
        this._owner = owner;
    }

    toDDL(): DDL2.IFilterCondition {
        return {
            viewID: this.source(),
            mappings: this.ddlMappings()
        };
    }

    static fromDDL(owner: Filters, ddl: DDL2.IFilterCondition): Filter {
        return new Filter(owner)
            .source(ddl.viewID)
            .ddlMappings(ddl.mappings)
            ;
    }

    ddlMappings(): DDL2.IMapping[];
    ddlMappings(_: DDL2.IMapping[]): this;
    ddlMappings(_?: DDL2.IMapping[]): DDL2.IMapping[] | this {
        if (!arguments.length) return this.validMappings().map(mapping => mapping.toDDL());
        this.mappings(_.map(mapping => ColumnMapping.fromDDL(this, mapping)));
        return this;
    }

    visualizationIDs() {
        return this._owner.visualizationIDs();
    }

    hash(): string {
        return hashSum({
            source: this.source(),
            mappings: this.validMappings().map(mapping => mapping.hash())
        });
    }

    validMappings(): ColumnMapping[] {
        return this.mappings().filter(mapping => !!mapping.localField() && !!mapping.remoteField());
    }

    appendMappings(mappings: Array<{ remoteField: string, localField: string, condition: DDL2.IMappingConditionType }>): this {
        for (const mapping of mappings) {
            this.mappings().push(new ColumnMapping(this)
                .remoteField(mapping.remoteField)
                .localField(mapping.localField)
                .condition(mapping.condition)
            );
        }
        return this;
    }

    inFields(): DDL2.IField[] {
        return this._owner.inFields();
    }

    sourceViz(): Element {
        return this._owner.visualization(this.source());
    }

    sourceOutFields(): DDL2.IField[] {
        return this.sourceViz().hipiePipeline().selectionFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().state().selection();
    }

    createFilter(): (localRow: any) => boolean {
        const selection = this.sourceSelection();
        const mappingFilters = this.validMappings().map(mapping => mapping.createFilter(selection));
        return (row: object): boolean => mappingFilters.every(mappingFilter => mappingFilter(row));
    }
}
Filter.prototype._class += " Filter";

export class Filters extends Activity {
    private _elementContainer: ElementContainer;

    @publish([], "propertyArray", "Filter", null, { autoExpand: Filter })
    filter: publish<this, Filter[]>;

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const filter of this.validFilters()) {
            retVal = retVal.concat(filter.validate("filter"));
        }
        return retVal;
    }

    constructor(elementContainer: ElementContainer) {
        super();
        this._elementContainer = elementContainer;
    }

    toDDL(): DDL2.IFilter {
        return {
            type: "filter",
            conditions: this.conditions()
        };
    }

    static fromDDL(elementContainer: ElementContainer, ddl: DDL2.IFilter): Filters {
        return new Filters(elementContainer)
            .conditions(ddl.conditions)
            ;
    }

    conditions(): DDL2.IFilterCondition[];
    conditions(_: DDL2.IFilterCondition[]): this;
    conditions(_?: DDL2.IFilterCondition[]): DDL2.IFilterCondition[] | this {
        if (!arguments.length) return this.validFilters().map(filter => filter.toDDL());
        this.filter(_.map(fc => Filter.fromDDL(this, fc)));
        return this;
    }

    visualizationIDs(): string[] {
        return this._elementContainer.elementIDs();
    }

    visualization(sourceID: string | PropertyExt): Element {
        return this._elementContainer.element(sourceID);
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
    validFilters(): Filter[] {
        return this.filter().filter(filter => filter.source());
    }

    appendFilter(source: Element, mappings: Array<{ remoteField: string, localField: string, condition: DDL2.IMappingConditionType }>): this {
        this.filter().push(new Filter(this)
            .source(source.id())
            .appendMappings(mappings));
        return this;
    }
}
Filters.prototype._class += " Filters";
