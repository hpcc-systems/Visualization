import { defineCase } from "../../../defineCase.ts";
export default defineCase({
	loaderConfig: { baseUrl: ".", paths: { test: "." } },
	globalContext: "./globalContext"
});
