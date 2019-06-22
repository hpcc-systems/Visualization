import * as _Ajv from "ajv";
import * as DDL from "./ddl/v1";
import * as DDL2 from "./ddl/v2";

const Ajv = (_Ajv as any).default || _Ajv;

export const ddl2Schema: object = _ddl2Schema;

const options: _Ajv.Options = {
    allErrors: false,
    verbose: true,
    jsonPointers: false
};

function doValidate(ddl: DDL.DDLSchema | DDL2.Schema, schema: DDL.DDLSchema | DDL2.Schema) {
    const ajv: _Ajv.Ajv = new Ajv(options);
    const validate = ajv.compile(schema);
    const success = validate(ddl);
    return {
        success,
        errors: validate.errors
    };
}

/* Not needed  ---
// @ts-ignore
import * as ddlSchema from "../schema/v1.json";

export function validate(ddl: DDL.DDLSchema) {
    return doValidate(ddl, ddlSchema);
}
*/

// @ts-ignore
import * as _ddl2Schema from "../schema/v2.json";

export function validate2(ddl: DDL2.Schema) {
    return doValidate(ddl, _ddl2Schema);
}
