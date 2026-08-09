import { defineCase } from "../../../defineCase.ts";
export default defineCase({ "loaderConfig": { "has": { "host-browser": 0 }, "paths": { "test": "." }, "packages": [{ "name": "dojo", "location": "../../../../node_modules/dojo" }] }, "noConsole": true, "requireFnPropName": "dj" });
