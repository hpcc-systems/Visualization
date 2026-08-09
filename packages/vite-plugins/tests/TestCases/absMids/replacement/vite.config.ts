import { defineCase } from "../../../defineCase.ts";
export default defineCase({ "loaderConfig": { "paths": { "test": "." } }, "requireFnPropName": "dj", moduleReplacement: [{ test: /fooLoader!/, replace: "foo" }, { test: /barLoader!bar/, replace: "dojo/text!bar.txt" }] });
