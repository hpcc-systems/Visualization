export * from "./__package__.ts";
import * as DDL1 from "./ddl/v1.ts";
import * as DDL2 from "./ddl/v2.ts";
export * from "./upgrade.ts";
export * from "./validate.ts";

export { DDL1, DDL2 };

export function isDDL2Schema(ref: DDL1.DDLSchema | DDL2.Schema): ref is DDL2.Schema {
    return (ref as DDL2.Schema).version !== undefined && (ref as DDL2.Schema).datasources !== undefined && (ref as DDL2.Schema).dataviews !== undefined;
}
