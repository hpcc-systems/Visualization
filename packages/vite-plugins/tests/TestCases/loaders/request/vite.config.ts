import { defineCase } from "../../../defineCase.ts";
export default defineCase({
	loaderConfig: { paths: { test: ".", "dojo/request/xhr": "./request" } }
});
