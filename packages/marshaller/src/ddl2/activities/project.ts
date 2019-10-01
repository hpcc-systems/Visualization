import { PropertyExt, publish, Utility } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum, isArray } from "@hpcc-js/util";
import { Activity, IActivityError, ReferencedFields } from "./activity";

export class ComputedMapping extends PropertyExt {
    protected _owner: ComputedField;

    @publish(null, "any", "Compare Value", undefined, {
        validate: (w: ComputedMapping): boolean => (!w.value() && !w.newValue()) || (!!w.value() && !!w.newValue())
    })
    value: publish<this, any>;
    value_valid: () => boolean;
    @publish(null, "any", "New Value", undefined, {
        validate: (w: ComputedMapping): boolean => (!w.value() && !w.newValue()) || (!!w.value() && !!w.newValue())
    })
    newValue: publish<this, any>;
    newValue_valid: () => boolean;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.value_valid()) {
            retVal.push({
                source: `${prefix}.value`,
                msg: `Invalid value:  "${this.value()}"`,
                hint: 'expected:  "any"'
            });
        }
        if (!this.newValue_valid()) {
            retVal.push({
                source: `${prefix}.newValue`,
                msg: `Invalid value:  "${this.newValue()}"`,
                hint: 'expected:  "any"'
            });
        }
        return retVal;
    }

    constructor() {
        super();
    }

    owner(): ComputedField;
    owner(_: ComputedField): this;
    owner(_?: ComputedField): ComputedField | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.value() && !!this.newValue();
    }

    toDDL(): DDL2.IMapMapping {
        return {
            value: this.value(),
            newValue: this.newValue()
        };
    }

    fromDDL(ddl: DDL2.IMapMapping): this {
        return this
            .value(ddl.value)
            .newValue(ddl.newValue)
            ;
    }

    static fromDDL(ddl: DDL2.IMapMapping): ComputedMapping {
        return new ComputedMapping().fromDDL(ddl);
    }
}
ComputedMapping.prototype._class += " ComputedMapping";

export type ComputedType = "=" | "*" | "/" | "+" | "-" | "scale" | "template" | "map";

export interface IComputedFieldOwner extends PropertyExt {
    fieldIDs(): string[];
    field(fieldID: string): DDL2.IField | null;
}

export class ComputedField extends PropertyExt {
    private _owner: IComputedFieldOwner;

    @publish(null, "string", "Label", null, { optional: true })
    label: publish<this, string>;
    @publish("mapping", "set", "Project type", ["=", "*", "/", "+", "-", "scale", "template", "map"], { optional: true, disable: w => !w.label() })
    type: publish<this, ComputedType>;
    @publish(null, "set", "Param 1", function (this: ComputedField) { return this.columns(); }, {
        optional: true,
        disable: (w: ComputedField) => w.disableColumn1(),
        validate: (w: ComputedField): boolean => w.columns().indexOf(w.column1()) >= 0
    })
    column1: publish<this, string>;
    column1_valid: () => boolean;
    @publish(null, "set", "Param 2", function (this: ComputedField) { return this.columns(); }, {
        optional: true,
        disable: (w: ComputedField) => w.disableColumn2(),
        validate: (w: ComputedField): boolean => w.columns().indexOf(w.column2()) >= 0
    })
    column2: publish<this, string>;
    column2_valid: () => boolean;
    @publish(null, "number", "Const value", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["scale"].indexOf(w.type()) < 0 })
    constValue: publish<this, number>;
    @publish(null, "string", "template", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["template"].indexOf(w.type()) < 0 })
    template: publish<this, string>;
    @publish(null, "any", "Default Value", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["map"].indexOf(w.type()) < 0 })
    default: publish<this, any>;
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
        if (!this.column1_valid()) {
            retVal.push({
                source: `${prefix}.${this.label()}`,
                msg: `Invalid column1:  "${this.column1()}"`,
                hint: `expected:  ${JSON.stringify(this.columns())}`
            });
        }
        if (!this.column2_valid()) {
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
        if (field && field.type === "dataset" && field.children) {
            return true;
        }
        return false;
    }

    children(): DDL2.IField[] {
        const field = (this._owner as ProjectBase).field(this.column1());
        if (field && field.type === "dataset") {
            return field.children;
        }
        return [];
    }

    constructor() {
        super();
    }

    owner(): IComputedFieldOwner;
    owner(_: IComputedFieldOwner): this;
    owner(_?: IComputedFieldOwner): IComputedFieldOwner | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.label();
    }

    validComputedMappings(): ComputedMapping[] {
        return this.mapping().filter(cf => cf.valid());
    }

    validChildFields() {
        return this.childField().filter(cf => cf.valid());
    }

    hasChildFields() {
        return this.validChildFields().length;
    }

    toDDL(): DDL2.MultiTransformationType {
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

    fromDDL(ddl: DDL2.MultiTransformationType): this {
        const retVal = this
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
                    .childField(ddl.transformations ? ddl.transformations.map(transformation => ComputedField.fromDDL(transformation)) : [])
                    ;
                break;
            case "map":
                retVal
                    .column1(ddl.sourceFieldID)
                    .default(ddl.default)
                    .mapping(ddl.mappings ? ddl.mappings.map(mapping => ComputedMapping.fromDDL(mapping)) : [])
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

    static fromDDL(ddl: DDL2.MultiTransformationType): ComputedField {
        return new ComputedField().fromDDL(ddl);
    }

    hash(): string {
        return hashSum({
            label: this.label(),
            type: this.type(),
            column1: this.column1(),
            column2: this.column2(),
            template: this.template(),
            constValue: this.constValue()
        });
    }

    columns(): string[] {
        return this._owner.fieldIDs();
    }

    computedField(): DDL2.IField {
        switch (this.type()) {
            case "=":
                let validChildFields = this.validChildFields();
                if (validChildFields.length === 0 && this.hasChildren()) {
                    //  Has children but no mappings - include all children by default...
                    validChildFields = this.children().map((child: DDL2.IField) => {
                        return new ComputedField()
                            .owner(this)
                            .label(child.id)
                            .type("=")
                            .column1(child.id)
                            ;
                    });
                }
                return {
                    ...this._owner.field(this.column1()),
                    id: this.label(),
                    children: validChildFields.length ? validChildFields.map(cf => cf.computedField()) : undefined
                } as DDL2.IField;
            case "*":
            case "/":
            case "+":
            case "-":
            case "scale":
                return { id: this.label(), type: "number" };
            case "template":
                return { id: this.label(), type: "string" };
            case "map":
                return { id: this.label(), type: "object" } as DDL2.IFieldObject;
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
                        //  TODO Move to function factory  ---
                        const r = row[column1].Row && isArray(row[column1].Row) ? row[column1].Row : row[column1];
                        return r.map(this.projection(trim));
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
        if (field) {
            switch (field.type) {
                case "dataset":
                    return field.children.map(field => field.id);
                case "object":
                    return Object.keys(field.fields);
            }
        }
        return [];
    }

    field(fieldID: string): DDL2.IField | undefined {
        const field = (this._owner as ProjectBase).field(this.column1());
        if (field) {
            switch (field.type) {
                case "dataset":
                    for (const f of field.children) {
                        if (f.id === fieldID) {
                            return f;
                        }
                    }
                    break;
                case "object":
                    return field.fields[fieldID];
            }
        }
        return undefined;
    }
}
ComputedField.prototype._class += " ComputedField";
//  ===========================================================================
export class MultiField extends PropertyExt implements IComputedFieldOwner {
    private _owner: IComputedFieldOwner;

    @publish("", "string", "Label")
    label: publish<this, string>;
    @publish([], "propertyArray", "Multi Fields", null, { autoExpand: ComputedField })
    multiFields: publish<this, ComputedField[]>;

    constructor() {
        super();
    }

    hash() {
        return hashSum({
            label: this.label(),
            multiFields: this.validMultiFields().map(mf => mf.hash())
        });
    }

    owner(): IComputedFieldOwner;
    owner(_: IComputedFieldOwner): this;
    owner(_?: IComputedFieldOwner): IComputedFieldOwner | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.label() && this.validMultiFields().length > 0;
    }

    validate(prefix: string): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const cf of this.validMultiFields()) {
            retVal = retVal.concat(cf.validate(`${prefix}.computedFields`));
        }
        return retVal;
    }

    toDDL(): DDL2.IMulti {
        return {
            fieldID: this.label(),
            type: "multi",
            transformations: this.transformations()
        };
    }

    fromDDL(ddl: DDL2.IMulti): this {
        return this
            .label(ddl.fieldID)
            .transformations(ddl.transformations)
            ;
    }

    static fromDDL(ddl: DDL2.IMulti): MultiField {
        return new MultiField().fromDDL(ddl);
    }

    validMultiFields(): ComputedField[] {
        return this.multiFields().filter(computedField => computedField.valid());
    }

    transformations(): DDL2.MultiTransformationType[];
    transformations(_: DDL2.MultiTransformationType[]): this;
    transformations(_?: DDL2.MultiTransformationType[]): DDL2.MultiTransformationType[] | this {
        if (!arguments.length) return this.validMultiFields().map(cf => cf.toDDL());
        this.multiFields(_.map(transformation => ComputedField.fromDDL(transformation)));
        return this;
    }

    //  IComputedFieldOwner  ---
    fieldIDs(): string[] {
        return this._owner.fieldIDs();
    }

    field(fieldID: string): DDL2.IField | null {
        return this._owner.field(fieldID);
    }
}
MultiField.prototype._class += " MultiField";
//  ===========================================================================
export class ProjectBase extends Activity {
    static ComputedField = ComputedField;

    _includeLParam = false;
    _trim = false;

    @publish([], "propertyArray", "Computed Fields", null, { autoExpand: ComputedField })
    computedFields: publish<this, Array<ComputedField | MultiField>>;

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

    transformations(): DDL2.ProjectTransformationType[];
    transformations(_: DDL2.ProjectTransformationType[]): this;
    transformations(_?: DDL2.ProjectTransformationType[]): DDL2.ProjectTransformationType[] | this {
        if (!arguments.length) return this.validComputedFields().map(cf => cf.toDDL());
        this.computedFields(_.map(transformation => {
            switch (transformation.type) {
                case "multi":
                    return MultiField.fromDDL(transformation);
                default:
                    return ComputedField.fromDDL(transformation);
            }
        }));
        return this;
    }

    hash(): string {
        return hashSum({
            computedFields: this.validComputedFields().map(cf => cf.hash())
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
            const aggrField = new ComputedField()
                .owner(this)
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
        return this.computedFields().filter(computedField => computedField.valid());
    }

    hasComputedFields() {
        return this.validComputedFields().length;
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        if (!this.exists()) return super.computeFields(inFields);
        let retVal: DDL2.IField[] = [];
        const retValMap: { [key: string]: boolean } = {};
        for (const cf of this.validComputedFields()) {
            if (cf instanceof MultiField) {
                for (const cf2 of cf.validMultiFields()) {
                    const computedField = cf2.computedField();
                    retVal.push(computedField);
                    retValMap[computedField.id] = true;
                }
            } else {
                const computedField = cf.computedField();
                retVal.push(computedField);
                retValMap[computedField.id] = true;
            }
        }
        if (this._trim && this.hasComputedFields()) {
            if (this._includeLParam) {
                const computedField = {
                    id: "__lparam",
                    type: "object"
                } as DDL2.IField;
                retVal.push(computedField);
                retValMap[computedField.id] = true;
            }
        } else {
            retVal = retVal.concat(inFields.filter(field => !retValMap[field.id]));
        }
        return () => retVal;
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const fieldIDs: string[] = [];
        for (const cf of this.validComputedFields()) {
            if (cf instanceof MultiField) {
                for (const cf2 of cf.validMultiFields()) {
                    fieldIDs.push(cf2.column1());
                    if (cf2.column2()) {
                        fieldIDs.push(cf2.column2());
                    }
                }
            } else {
                if (cf.type() === "template") {
                    for (const fieldID of Utility.templateFields(cf.template())) {
                        fieldIDs.push(fieldID);
                    }
                } else {
                    fieldIDs.push(cf.column1());
                    if (cf.column2()) {
                        fieldIDs.push(cf.column2());
                    }
                }
            }
        }
        super.resolveInFields(refs, fieldIDs);
    }

    projection(): (row: object) => object {
        const trim = this._trim;
        const hasComputedFields = this.hasComputedFields();
        const computedFields = [];
        for (const cf of this.validComputedFields()) {
            if (cf instanceof MultiField) {
                for (const cf2 of cf.validMultiFields()) {
                    computedFields.push({
                        label: cf2.label(),
                        func: cf2.computeFunc(trim)
                    });
                }
            } else {
                computedFields.push({
                    label: cf.label(),
                    func: cf.computeFunc(trim)
                });
            }
        }
        return (row: object) => {
            const retVal = trim && hasComputedFields ? {} : { ...row };
            for (const cf of computedFields) {
                retVal[cf.label] = cf.func(row);
            }
            if (trim && hasComputedFields) {
                if (this._includeLParam) {
                    retVal["__lparam"] = row;
                }
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

    fromDDL(ddl: DDL2.IProject): this {
        return this.transformations(ddl.transformations);
    }

    static fromDDL(ddl: DDL2.IProject): Project {
        return new Project().fromDDL(ddl);
    }
}
Project.prototype._class += " Project";

export class Mappings extends ProjectBase {

    constructor() {
        super();
        this._trim = true;
        this._includeLParam = true;
    }

    toDDL(): DDL2.IMappings {
        return {
            type: "mappings",
            transformations: this.transformations()
        };
    }

    fromDDL(_ddl: DDL2.IMappings): this {
        const ddl = _ddl || { transformations: [] };
        return this
            .transformations(ddl.transformations)
            ;
    }

    static fromDDL(ddl: DDL2.IMappings): Mappings {
        return new Mappings().fromDDL(ddl);
    }

    referencedFields(refs: ReferencedFields): void {
        if (this.hasComputedFields()) {
            return super.referencedFields(refs);
        }
        this.resolveInFields(refs, this.inFields().filter(f => f.id !== "__lparam").map(f => f.id));
    }
}
Mappings.prototype._class += " Mappings";
