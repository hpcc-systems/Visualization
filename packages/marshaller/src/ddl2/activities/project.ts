import { PropertyExt, publish, Utility } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IField } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";
import { Activity, IActivityError, ReferencedFields } from "./activity";

export type ComputedType = "=" | "*" | "/" | "+" | "-" | "scale" | "template";
export class ComputedField extends PropertyExt {
    private _owner: Project;

    @publish(null, "string", "Label", null, { optional: true })
    label: publish<this, string>;
    @publish("mapping", "set", "Project type", ["=", "*", "/", "+", "-", "scale", "template"], { optional: true, disable: w => !w.label() })
    type: publish<this, ComputedType>;
    @publish(null, "set", "Param 1", function (this: ComputedField) { return this.columns(); }, { optional: false, disable: (w: ComputedField) => w.disableColumn1() })
    column1: publish<this, string>;
    @publish(null, "set", "Param 2", function (this: ComputedField) { return this.columns(); }, { optional: true, disable: (w: ComputedField) => w.disableColumn2() })
    column2: publish<this, string>;
    @publish(null, "number", "Const value", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["scale"].indexOf(w.type()) < 0 })
    constValue: publish<this, number>;
    @publish(null, "string", "template", null, { optional: true, disable: (w: ComputedField) => !w.label() || ["template"].indexOf(w.type()) < 0 })
    template: publish<this, string>;

    disableColumn1(): boolean {
        return !this.label() || ["=", "*", "/", "+", "-", "scale"].indexOf(this.type()) < 0;
    }

    disableColumn2(): boolean {
        return !this.label() || ["*", "/", "+", "-"].indexOf(this.type()) < 0;
    }

    validate(): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.disableColumn1() && this.columns().indexOf(this.column1()) < 0) {
            retVal.push({
                source: `ComputedField:  ${this.id()}`,
                msg: `Invalid column1:  ${this.column1()}`
            });
        }
        if (!this.disableColumn2() && this.columns().indexOf(this.column2()) < 0) {
            retVal.push({
                source: `ComputedField:  ${this.id()}`,
                msg: `Invalid column2:  ${this.column2()}`
            });
        }
        return retVal;
    }

    constructor(owner: Project) {
        super();
        this._owner = owner;
    }

    toDDL(): DDL2.TransformationType {
        if (this.type() === "scale") {
            return {
                fieldID: this.label(),
                type: "scale",
                param1: this.column1(),
                factor: this.constValue()
            };
        } else if (this.type() === "template") {
            return {
                fieldID: this.label(),
                type: "template",
                template: this.template()
            };
        }
        return {
            fieldID: this.label(),
            type: this.type() as DDL2.ICalculatedType,
            param1: this.column1(),
            param2: this.column2()
        };
    }

    static fromDDL(owner: Project, ddl: DDL2.TransformationType): ComputedField {
        const retVal = new ComputedField(owner)
            .label(ddl.fieldID)
            .type(ddl.type)
            ;
        if (ddl.type === "scale") {
            retVal
                .column1(ddl.param1)
                .constValue(ddl.factor)
                ;
        } else if (ddl.type === "template") {
            retVal
                .template(ddl.template)
                ;
        } else {
            retVal
                .column1(ddl.param1)
                .column2(ddl.param2)
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

    computeFunc(): (row: any) => any {
        const column1 = this.column1();
        const column2 = this.column2();
        switch (this.type()) {
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
            case "=":
            default:
                return (row: any) => {
                    return row[column1];
                };
        }
    }
}
ComputedField.prototype._class += " AggregateField";
//  ===========================================================================
export class Project extends Activity {
    _isMappings: false;

    @publish([], "propertyArray", "Computed Fields", null, { autoExpand: ComputedField })
    computedFields: publish<this, ComputedField[]>;
    @publish(false, "boolean", "trim", null, { autoExpand: ComputedField })
    trim: publish<this, boolean>;

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const cf of this.validComputedFields()) {
            retVal = retVal.concat(cf.validate());
        }
        return retVal;
    }

    constructor(isMappings) {
        super();
        this._isMappings = isMappings;
    }

    toDDL(): DDL2.IProject | DDL2.IMappings {
        if (this._isMappings) {
            return {
                type: "mappings",
                transformations: this.transformations()
            };
        }
        return {
            type: "project",
            transformations: this.transformations()
        };
    }

    static fromDDL(ddl: DDL2.IProject | DDL2.IMappings): Project {
        return new Project(ddl.type)
            .transformations(ddl.transformations)
            ;
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

    fieldIDs(): string[] {
        return this.inFields().map(field => field.id);
    }

    field(fieldID: string): IField | null {
        for (const field of this.inFields()) {
            if (field.id === fieldID) {
                return field;
            }
        }
        return null;
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

    computeFields(): IField[] {
        if (!this.exists()) return super.computeFields();
        const retVal: IField[] = [];
        const retValMap: { [key: string]: boolean } = {};
        for (const cf of this.computedFields()) {
            if (cf.label()) {
                const computedField: IField = {
                    id: cf.label(),
                    label: cf.label(),
                    type: "string",
                    default: undefined,
                    children: null
                };
                retVal.push(computedField);
                retValMap[computedField.id] = true;
            }
        }
        return this.trim() && this.hasComputedFields() ? retVal : retVal.concat(super.computeFields().filter(field => !retValMap[field.id]));
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
                func: cf.computeFunc()
            };
        });
        return (row: object) => {
            const retVal = trim && hasComputedFields ? {} : { ...row };
            for (const cf of computedFields) {
                retVal[cf.label] = cf.func(row);
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
Project.prototype._class += " Project";
