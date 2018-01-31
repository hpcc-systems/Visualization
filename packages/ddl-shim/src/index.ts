import * as Ajv from "ajv";

import * as DDL1 from "./ddl";
import { ddlSchema } from "./ddlSchema";

import * as DDL2 from "./ddl2";
import { ddl2Schema } from "./ddl2Schema";

export { DDL1, DDL2, ddlSchema, ddl2Schema };

export interface Response {
    success: boolean;
    errors: any;
}

export function validate(ddl: object): Response {
    const ajv = new Ajv();
    return {
        success: ajv.validate(ddlSchema, ddl),
        errors: ajv.errors
    };
}

export function validate2(ddl: object): Response {
    const ajv = new Ajv();
    return {
        success: ajv.validate(ddl2Schema, ddl),
        errors: ajv.errors
    };
}
