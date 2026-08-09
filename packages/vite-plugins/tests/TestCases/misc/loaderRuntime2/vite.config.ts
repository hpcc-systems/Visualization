import { defineCase } from "../../../defineCase.ts";
export default defineCase({ entry: { "app": "./index" }, loaderConfig: { packages: [{ name: "test", location: "./subdir" }] }, requireFnPropName: "dj" });
