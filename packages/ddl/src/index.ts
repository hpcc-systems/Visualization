import * as Ajv from "ajv";
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
