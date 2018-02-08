import { Database } from "@hpcc-js/common";
import { Form } from "./Form";
import { Input } from "./Input";

import "../src/Form.css";

export class FieldForm extends Form {
    constructor() {
        super();

        this._tag = "form";
    }

    fields(): Database.Field[];
    fields(_: Database.Field[]): this;
    fields(_?: Database.Field[]): Database.Field[] | this {
        const retVal = super.fields.apply(this, arguments);
        if (arguments.length) {
            const inpMap = this.inputsMap();
            this.inputs(_.map(f => inpMap[f.id()] || new Input()
                .name(f.id())
                .label(f.label())
                .type(f.type())
            ));
        }
        return retVal;
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        if (!arguments.length) return super.data();
        super.data(_[0]);
        return this;
    }

}
FieldForm.prototype._class += " form_FieldForm";
