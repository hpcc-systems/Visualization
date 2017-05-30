import * as Ajv from "ajv";
export * from "./ddl";
import * as  DDL2 from "./ddl2";
export { DDL2 };
import { ddl2Schema } from "./ddl2Schema";
import { ddlSchema } from "./ddlSchema";

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
