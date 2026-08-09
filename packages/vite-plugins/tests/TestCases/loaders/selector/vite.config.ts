import { defineCase } from "../../../defineCase.ts";
export default defineCase({
	loaderConfig: { paths: { test: ".", "test/selector/lite": "./selector" } },
	moduleReplacement: [{ test: /^test\/selector\/_loader!$/, replace: "test/selector/lite" }]
});
