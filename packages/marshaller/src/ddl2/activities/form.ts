import { PropertyExt } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Datasource } from "./datasource.ts";

type IField = DDL2.IFieldBoolean | DDL2.IFieldNumber | DDL2.IFieldString | DDL2.IFieldDataset;

export class FormField extends PropertyExt {
    protected _owner: Form;

    disableChildField(): boolean {
        return this.type() !== "dataset";
    }

    constructor() {
        super();
    }

    toDDL(): IField {
        return {
            type: this.type(),
            id: this.fieldID(),
            default: this.default(),
            children: this.type() === "dataset" ? this.childFields().map(cf => cf.toDDL()) : undefined
        } as IField;
    }

    fromDDL(ddl: IField): this {
        return this
            .type(ddl.type)
            .fieldID(ddl.id)
            .default(ddl.default)
            .childFields(ddl.type === "dataset" && ddl.children ? ddl.children.map(FormField.fromDDL) : [])
            ;
    }

    static fromDDL(ddl: IField): FormField {
        return new FormField().fromDDL(ddl);
    }

    owner(): Form;
    owner(_: Form): this;
    owner(_?: Form): Form | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.type() && !!this.fieldID();
    }

    coerceFunc(): (cell: any) => boolean | number | string {
        switch (this.type()) {
            case "boolean":
                return cell => !!cell;
            case "number":
                return cell => +cell;
            case "string":
                return cell => "" + cell;
        }
        return cell => cell;
    }

    calcValue() {
        return this.value_exists() ? this.value() : this.default();
    }
}

export class Form extends Datasource {

    constructor() {
        super();
    }

    toDDL(): DDL2.IForm {
        return {
            type: "form",
            id: this.id(),
            fields: this.validFields().map(f => f.toDDL())
        };
    }

    fromDDL(ddl: DDL2.IForm, skipID = false): this {
        (skipID ? this : this.id(ddl.id))
            .formFields(ddl.fields.map(FormField.fromDDL))
            ;
        return this;
    }

    static fromDDL(ddl: DDL2.IForm, skipID = false): Form {
        return new Form().fromDDL(ddl, skipID);
    }

    validFields(): FormField[] {
        return this.formFields().filter(f => f.valid());
    }

    hash(more: object = {}): string {
        return super.hash({
            ddl: this.toDDL(),
            ...more
        });
    }

    refreshMeta(): Promise<void> {
        return Promise.resolve();
    }

    label(): string {
        return "Form";
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        const retVal: DDL2.IField[] = this.validFields().map(f => f.toDDL());
        return () => retVal;
    }

    exec(): Promise<void> {
        return Promise.resolve();
    }

    computeData(): ReadonlyArray<object> {
        const retVal = {};
        this.validFields().forEach(f => {
            retVal[f.fieldID()] = f.calcValue();
        });
        return [retVal];
    }

    //  ===
    total(): number {
        return 1;
    }
}
Form.prototype._class += " Form";

export interface FormField {
    type(): "boolean" | "number" | "string" | "dataset";
    type(_: "boolean" | "number" | "string" | "dataset"): this;
    fieldID(): string;
    fieldID(_: string): this;
    default(): boolean | number | string | any[];
    default(_: boolean | number | string | any[]): this;
    value(): boolean | number | string;
    value(_: boolean | number | string): this;
    value_exists(): boolean;
    childFields(): FormField[];
    childFields(_: FormField[]): this;
}

export interface Form {
    formFields(): FormField[];
    formFields(_: FormField[]): this;
}

FormField.prototype.publish("type", "string", "set", "FormField Type", ["boolean", "number", "string", "dataset"]);
FormField.prototype.publish("fieldID", "", "string", "FormField Label");
FormField.prototype.publish("default", null, "any", "Default Value", null, { optional: true });
FormField.prototype.publish("value", null, "any", "Default Value", null, { optional: true });
FormField.prototype.publish("childFields", [], "propertyArray", "Child Fields", null, { autoExpand: FormField, disable: (w: FormField) => w.disableChildField() });

Form.prototype.publish("formFields", [], "propertyArray", "Multi Fields", null, { autoExpand: FormField });