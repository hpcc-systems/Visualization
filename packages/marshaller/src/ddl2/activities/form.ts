import { PropertyExt, publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Datasource } from "./datasource";

type IField = DDL2.IFieldBoolean | DDL2.IFieldNumber | DDL2.IFieldString;

export class FormField extends PropertyExt {
    protected _owner: Form;

    @publish("string", "set", "FormField Type", ["boolean", "number", "string"])
    type: publish<this, "boolean" | "number" | "string">;

    @publish("", "string", "FormField Label")
    fieldID: publish<this, string>;

    @publish(null, "any", "Default Value", null, { optional: true })
    default: publish<this, boolean | number | string>;

    @publish(null, "any", "Default Value", null, { optional: true })
    value: publish<this, boolean | number | string>;
    value_exists: () => boolean;

    constructor() {
        super();
    }

    toDDL(): IField {
        return {
            type: this.type(),
            id: this.fieldID(),
            default: this.default()
        } as IField;
    }

    fromDDL(ddl: IField): this {
        return this
            .type(ddl.type)
            .fieldID(ddl.id)
            .default(ddl.default)
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
}

export class Form extends Datasource {
    @publish([], "propertyArray", "Multi Fields", null, { autoExpand: FormField })
    formFields: publish<this, FormField[]>;

    constructor() {
        super();
        this.formFields([
            new FormField().type("number").fieldID("id").value(7),
            new FormField().fieldID("first_name").value("John"),
            new FormField().fieldID("last_name").value("Doe"),
            new FormField().fieldID("gender").default("M"),
            new FormField().type("number").fieldID("age")
        ]);
    }

    toDDL(): DDL2.IForm {
        return {
            type: "form",
            id: this.id(),
            fields: this.validFields().map(f => f.toDDL())
        };
    }

    fromDDL(ddl: DDL2.IForm): this {
        this
            .id(ddl.id)
            .formFields(ddl.fields.map(FormField.fromDDL))
            ;
        return this;
    }

    static fromDDL(ddl: DDL2.IForm): Form {
        return new Form().fromDDL(ddl);
    }

    validFields(): FormField[] {
        return this.formFields().filter(f => f.valid());
    }

    hash(more: object = {}): string {
        return super.hash({
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
        this.validFields().map(f => {
            switch (f.type()) {
                case "boolean":
                    retVal[f.fieldID()] = f.value_exists() ? f.value() : f.default();
                    break;
                case "number":
                    retVal[f.fieldID()] = f.value_exists() ? f.value() : f.default();
                    break;
                case "string":
                default:
                    retVal[f.fieldID()] = f.value_exists() ? f.value() : f.default();
                    break;
            }
        });
        return [retVal];
    }

    //  ===
    total(): number {
        return 1;
    }
}
Form.prototype._class += " Form";
