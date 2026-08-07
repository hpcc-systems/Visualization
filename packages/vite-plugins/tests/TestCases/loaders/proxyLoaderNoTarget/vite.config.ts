import { defineCase } from "../../../defineCase.ts";
export default defineCase({ "loaderConfig": { "paths": { "test": "." } }, "requireFnPropName": "dj", moduleReplacement: [{ test: /^test\/fooLoader!/, replace: "dojo/loaderProxy?loader=test/fooLoader!" }] });
