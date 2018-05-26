import * as DDL1 from "./ddl";
import { ddlSchema } from "./ddlSchema";

import * as DDL2 from "./ddl2";
import { ddl2Schema } from "./ddl2Schema";

// @ts-ignore
import validateSchema from "../src/ddlSchema.json";

// @ts-ignore
import validateSchema2 from "../src/ddl2Schema.json";

export { DDL1, DDL2, ddlSchema, ddl2Schema };
export * from "./upgrade";

export interface Response {
    success: boolean;
    errors: any;
}

export function validate(ddl: object): Response {
    return {
        success: validateSchema(ddl),
        errors: validateSchema2.errors
    };
}

export function validate2(ddl: object): Response {
    return {
        success: validateSchema2(ddl),
        errors: validateSchema2.errors
    };
}
