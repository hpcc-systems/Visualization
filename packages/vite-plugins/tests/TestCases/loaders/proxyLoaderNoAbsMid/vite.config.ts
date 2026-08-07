import { defineCase } from "../../../defineCase.ts";
export default defineCase({ entry: "dojo/loaderProxy?loader=test/fooLoader&deps=test/foo!test/foo", "loaderConfig": { "paths": { "test": "." } }, "requireFnPropName": "dj" });
