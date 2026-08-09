import { defineCase } from "../../../defineCase.ts";
export default [
    defineCase({ entry: "./index1", "loaderConfig": { "paths": { "test": "." }, "locale": "fr", "has": { "host-browser": 0, "dojo-config-api": 0 } }, "locales": ["fr"], "requireFnPropName": "dj" }),
    defineCase({ entry: "./index2", "loaderConfig": { "paths": { "test": "." }, "locale": "fr", "has": { "host-browser": 0, "dojo-config-api": 0 } }, "locales": ["fr"], "requireFnPropName": "dj" }),
    defineCase({ entry: "test/index1", "loaderConfig": { "paths": { "test": "." }, "locale": "fr", "has": { "host-browser": 0, "dojo-config-api": 0 } }, "locales": ["fr"], "requireFnPropName": "dj" }),
    defineCase({ entry: "./index3", "loaderConfig": { "paths": { "test": "." }, "locale": "fr", "has": { "host-browser": 0, "dojo-config-api": 0 } }, "locales": [], "requireFnPropName": "dj" })
];
