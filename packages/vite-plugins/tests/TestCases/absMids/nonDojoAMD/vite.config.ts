import { defineCase } from "../../../defineCase.ts";
export default defineCase({ loaderConfig: { paths: { test: ".", pkg1: "./pkg1/index", pkg2: "./pkg2/index" } } });