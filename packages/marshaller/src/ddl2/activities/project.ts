import { PropertyExt, publish, Utility } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { Activity, IActivityError, ReferencedFields } from "./activity";

export class ComputedMapping extends PropertyExt {
    protected _owner: ComputedField;

    @publish(null, "any", "Comparte Value")
    value: publish<this, any>;
    @publish(null, "object", "New Value")
    newValue: publish<this, any>;

    constructor(owner: ComputedField) {
        super();
        this._owner = owner;
    }

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.value()) {
            retVal.push({
                source: `${prefix}.value`,
                msg: `Invalid value:  "${this.value()}"`,
                hint: `expected:  "any"`
            });
        }
        if (!this.newValue()) {
            retVal.push({
                source: `${prefix}.newValue`,
                msg: `Invalid value:  "${this.newValue()}"`,
                hint: `expected:  "any"`
            });
        }
        return retVal;
    }

    toDDL(): DDL2.IMapMapping {
        return {
            value: this.value(),
            newValue: this.newValue()
        };
    }

    static fromDDL(owner: ComputedField, ddl: DDL2.IMapMapping): ComputedMapping {
        const retVal = new ComputedMapping(owner)
            .value(ddl.value)
            .newValue(ddl.newValue)
            ;
        return retVal;
    }
}
ComputedMapping.prototype._class += " ComputedMapping";

export type ComputedType = "=" | "*" | "/" | "+" | "-" | "scale" | "template" | "map";

export interface IComputedFieldOwner {
    fieldIDs(): string[];
    field(fieldID: string): DDL2.IField | null;
}

export class ComputedField extends PropertyExt {
    private _owner: IComputedFieldOwner;

    @publish(null, "string", "Label", null, { optional: true })
    label: publish<this, string>;
    @publish("mapping", "set", "Project type", ["=", "*", "/", "+", "-", "scale", "template", "map"], { optional: true, disable: w => !w.label() })
    type: publish<this, ComputedType>;
    @publish(null, "set", "Param 1", function (this: ComputedField) { return this.columns(); }, { optional: true, disable: (w: ComputedField) => w.disableColumn1() })
    column1: publish<this, string>;
    @publish(null, "set", "Param 2", function (this: ComputedField) { return this.columns(); }, { optional: true, disable: (w: ComputedField) => w.disableColumn2() })
    column2: publish<this, string>;
    @publish(null, "number", "Const value", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["scale"].indexOf(w.type()) < 0 })
    constValue: publish<this, number>;
    @publish(null, "string", "template", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["template"].indexOf(w.type()) < 0 })
    template: publish<this, string>;
    @publish(null, "object", "Mapped Values", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["map"].indexOf(w.type()) < 0 })
    default: publish<this, object>;
    @publish([], "propertyArray", "Mapped Values", null, { autoExpand: ComputedMapping, disable: (w: ComputedField) => w.disableMapping() })
    mapping: publish<this, ComputedMapping[]>;
    @publish([], "propertyArray", "Child Fields", null, { autoExpand: ComputedField, disable: (w: ComputedField) => w.disableChildField() })
    childField: publish<this, ComputedField[]>;

    disableColumn1(): boolean {
        return !this.label() || ["=", "*", "/", "+", "-", "scale", "map"].indexOf(this.type()) < 0;
    }

    disableColumn2(): boolean {
        return !this.label() || ["*", "/", "+", "-"].indexOf(this.type()) < 0;
    }

    disableMapping(): boolean {
        return !this.label() || ["map"].indexOf(this.type()) < 0;
    }

    disableChildField(): boolean {
        return !this.hasChildren();
    }

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.disableColumn1() && this.columns().indexOf(this.column1()) < 0) {
            retVal.push({
                source: `${prefix}.${this.label()}`,
                msg: `Invalid column1:  "${this.column1()}"`,
                hint: `expected:  ${JSON.stringify(this.columns())}`
            });
        }
        if (!this.disableColumn2() && this.columns().indexOf(this.column2()) < 0) {
            retVal.push({
                source: `${prefix}.${this.label()}`,
                msg: `Invalid column2: "${this.column2()}"`,
                hint: `expected:  ${JSON.stringify(this.columns())}`
            });
        }
        if (!this.disableMapping()) {
            this.validComputedMappings().forEach(cm => cm.validate(`${prefix}.mapping`));
        }
        if (!this.disableChildField()) {
            this.validChildFields().forEach(cf => cf.validate(`${prefix}.childField`));
        }
        return retVal;
    }

    hasChildren() {
        if (!this.label()) return false;
        if (this.type() !== "=") return false;
        if (!this.column1()) return false;
        const field = (this._owner as ProjectBase).field(this.column1());
        if (field && field.children) {
            return true;
        }
        return false;
    }

    constructor(owner: IComputedFieldOwner) {
        super();
        this._owner = owner;
    }

    validComputedMappings(): ComputedMapping[] {
        return this.mapping().filter(cf => cf.value());
    }

    validChildFields() {
        return this.childField().filter(cf => cf.label());
    }

    hasChildFields() {
        return this.validChildFields().length;
    }

    toDDL(): DDL2.TransformationType {
        switch (this.type()) {
            case "scale":
                return {
                    fieldID: this.label(),
                    type: "scale",
                    sourceFieldID: this.column1(),
                    factor: this.constValue()
                };
            case "template":
                return {
                    fieldID: this.label(),
                    type: "template",
                    template: this.template()
                };
            case "=":
                const transformations = this.validChildFields().map(cf => cf.toDDL());
                return {
                    fieldID: this.label(),
                    type: "=",
                    sourceFieldID: this.column1(),
                    transformations: transformations.length ? transformations : undefined
                };
            case "map":
                return {
                    fieldID: this.label(),
                    type: "map",
                    sourceFieldID: this.column1(),
                    default: this.default(),
                    mappings: this.validComputedMappings().map(cm => cm.toDDL())
                };
            default:
                return {
                    fieldID: this.label(),
                    type: this.type() as DDL2.ICalculatedType,
                    sourceFieldID1: this.column1(),
                    sourceFieldID2: this.column2()
                };
        }
    }

    static fromDDL(owner: IComputedFieldOwner, ddl: DDL2.TransformationType): ComputedField {
        const retVal = new ComputedField(owner)
            .label(ddl.fieldID)
            .type(ddl.type)
            ;
        switch (ddl.type) {
            case "scale":
                retVal
                    .column1(ddl.sourceFieldID)
                    .constValue(ddl.factor)
                    ;
                break;
            case "template":
                retVal
                    .template(ddl.template)
                    ;
                break;
            case "=":
                retVal
                    .column1(ddl.sourceFieldID)
                    .childField(ddl.transformations ? ddl.transformations.map(transformation => ComputedField.fromDDL(retVal, transformation)) : [])
                    ;
                break;
            case "map":
                retVal
                    .column1(ddl.sourceFieldID)
                    .default(ddl.default)
                    .mapping(ddl.mappings ? ddl.mappings.map(mapping => ComputedMapping.fromDDL(retVal, mapping)) : [])
                    ;
                break;
            default:
                retVal
                    .column1(ddl.sourceFieldID1)
                    .column2(ddl.sourceFieldID2)
                    ;
        }
        return retVal;
    }

    hash(): string {
        return hashSum({
            label: this.label(),
            type: this.type(),
            column1: this.column1(),
            column2: this.column2(),
            constValue: this.constValue(),
        });
    }

    columns() {
        return this._owner.fieldIDs();
    }

    computedField(): DDL2.IField {
        switch (this.type()) {
            case "=":
                const validChildFields = this.validChildFields();
                return {
                    ...this._owner.field(this.column1()),
                    id: this.label(),
                    children: validChildFields.length ? this.validChildFields().map(cf => cf.computedField()) : undefined
                };
            case "*":
            case "/":
            case "+":
            case "-":
            case "scale":
                return { id: this.label(), type: "number" };
            case "template":
                return { id: this.label(), type: "string" };
            case "map":
                return { id: this.label(), type: "object" };
        }
        return { id: this.label(), type: "string" };
    }

    projection(trim: boolean): (row: object) => object {
        const hasComputedFields = this.hasChildFields();
        const computedFields = this.validChildFields().map(cf => {
            return {
                label: cf.label(),
                func: cf.computeFunc(trim)
            };
        });
        return (row: object) => {
            const retVal = trim && hasComputedFields ? {} : { ...row };
            for (const cf of computedFields) {
                retVal[cf.label] = cf.func(row);
            }
            if (trim && hasComputedFields) {
                retVal["__lparam"] = row;
            }
            return retVal;
        };
    }

    computeFunc(trim: boolean): (row: any) => any {
        const column1 = this.column1();
        const column2 = this.column2();
        switch (this.type()) {
            case "=":
                if (this.hasChildFields()) {
                    return (row: object) => {
                        return row[column1].Row.map(this.projection(trim));
                    };
                }
                return (row: object) => {
                    return row[column1];
                };
            case "*":
                return (row: any) => {
                    return +row[column1] * +row[column2];
                };
            case "/":
                return (row: any) => {
                    return +row[column1] / +row[column2];
                };
            case "+":
                return (row: any) => {
                    return +row[column1] + +row[column2];
                };
            case "-":
                return (row: any) => {
                    return +row[column1] - +row[column2];
                };
            case "scale":
                const constValue = this.constValue();
                return (row: any) => {
                    return +row[column1] * constValue;
                };
            case "template":
                const template = this.template();
                return (row: any) => {
                    return Utility.template(template, row);
                };
            case "map":
                const defValue = this.default();
                const mappings = {};
                for (const mapping of this.mapping()) {
                    mappings[mapping.value()] = mapping.newValue();
                }
                return (row: any) => {
                    return mappings[row[column1]] || defValue;
                };
            default:
                return (row: any) => {
                    return row[column1];
                };
        }
    }

    //  IComputedFieldOwner  ---
    fieldIDs(): string[] {
        const field = (this._owner as ProjectBase).field(this.column1());
        return field && field.children ? field.children.map(field => field.id) : [];
    }

    field(fieldID: string): DDL2.IField | null {
        const field = (this._owner as ProjectBase).field(this.column1());
        const children = field && field.children ? field.children : [];
        for (const field of children) {
            if (field.id === fieldID) {
                return field;
            }
        }
        return null;
    }
}
ComputedField.prototype._class += " ComputedField";
//  ===========================================================================
export class ProjectBase extends Activity {
    @publish([], "propertyArray", "Computed Fields", null, { autoExpand: ComputedField })
    computedFields: publish<this, ComputedField[]>;
    @publish(false, "boolean", "trim", null, { autoExpand: ComputedField })
    trim: publish<this, boolean>;

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const cf of this.validComputedFields()) {
            retVal = retVal.concat(cf.validate(`${this.classID()}.computedFields`));
        }
        return retVal;
    }

    constructor() {
        super();
    }

    transformations(): DDL2.TransformationType[];
    transformations(_: DDL2.TransformationType[]): this;
    transformations(_?: DDL2.TransformationType[]): DDL2.TransformationType[] | this {
        if (!arguments.length) return this.validComputedFields().map(cf => cf.toDDL());
        this.computedFields(_.map(transformation => ComputedField.fromDDL(this, transformation)));
        return this;
    }

    hash(): string {
        return hashSum({
            computedFields: this.computedFields().map(cf => cf.hash()),
        });
    }

    exists(): boolean {
        return this.validComputedFields().length > 0;
    }

    //  IComputedFieldOwner  ---
    fieldIDs(): string[] {
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
    //  ---

    clearComputedFields() {
        this.computedFields([]);
    }

    appendComputedFields(computedFields: [{ label: string, type: ComputedType, column?: string }]): this {
        for (const aggregateField of computedFields) {
            const aggrField = new ComputedField(this)
                .label(aggregateField.label)
                .type(aggregateField.type)
                ;
            if (aggregateField.column !== void 0) {
                aggrField.column1(aggregateField.column);
            }
            this.computedFields().push(aggrField);
        }
        return this;
    }

    validComputedFields() {
        return this.computedFields().filter(computedField => computedField.label());
    }

    hasComputedFields() {
        return this.validComputedFields().length;
    }

    computeFields(): DDL2.IField[] {
        if (!this.exists()) return super.computeFields();
        const retVal: DDL2.IField[] = [];
        const retValMap: { [key: string]: boolean } = {};
        for (const cf of this.computedFields()) {
            if (cf.label()) {
                const computedField = cf.computedField();
                retVal.push(computedField);
                retValMap[computedField.id] = true;
            }
        }
        if (this.trim() && this.hasComputedFields()) {
            const computedField: DDL2.IField = {
                id: "__lparam",
                type: "dataset"
            };
            retVal.push(computedField);
            retValMap[computedField.id] = true;
            return retVal;
        }
        return retVal.concat(super.computeFields().filter(field => !retValMap[field.id]));
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const fieldIDs: string[] = [];
        for (const cf of this.validComputedFields()) {
            fieldIDs.push(cf.column1());
            if (cf.column2()) {
                fieldIDs.push(cf.column2());
            }
        }
        super.resolveInFields(refs, fieldIDs);
    }

    projection(): (row: object) => object {
        const trim = this.trim();
        const hasComputedFields = this.hasComputedFields();
        const computedFields = this.validComputedFields().map(cf => {
            return {
                label: cf.label(),
                func: cf.computeFunc(trim)
            };
        });
        return (row: object) => {
            const retVal = trim && hasComputedFields ? {} : { ...row };
            for (const cf of computedFields) {
                retVal[cf.label] = cf.func(row);
            }
            if (trim && hasComputedFields) {
                retVal["__lparam"] = row;
            }
            return retVal;
        };
    }

    computeData(): ReadonlyArray<object> {
        const data = super.computeData();
        if (data.length === 0 || !this.exists()) return data;
        return data.map(this.projection());
    }
}

export class Project extends ProjectBase {

    toDDL(): DDL2.IProject {
        return {
            type: "project",
            transformations: this.transformations()
        };
    }

    static fromDDL(ddl: DDL2.IProject): Project {
        return new Project()
            .transformations(ddl.transformations)
            ;
    }
}
Project.prototype._class += " Project";

export class Mappings extends ProjectBase {

    constructor() {
        super();
        this.trim(true);
    }

    toDDL(): DDL2.IMappings {
        return {
            type: "mappings",
            transformations: this.transformations()
        };
    }

    static fromDDL(ddl: DDL2.IMappings): Mappings {
        return new Mappings()
            .transformations(ddl.transformations)
            ;
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        if (this.hasComputedFields()) {
            return super.referencedFields(refs);
        }
        this.resolveInFields(refs, this.inFields().filter(f => f.id !== "__lparam").map(f => f.id));
    }
}
Mappings.prototype._class += " Mappings";
