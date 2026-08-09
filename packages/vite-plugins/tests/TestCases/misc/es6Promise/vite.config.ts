import { defineCase } from "../../../defineCase.ts";
export default defineCase({ "loaderConfig": { "paths": { "test": ".", "amd": "../../../../amd" }, "has": { "host-browser": false, "config-deferredInstrumentation": false } }, "requireFnPropName": "dj" });
