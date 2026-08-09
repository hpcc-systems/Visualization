import { defineCase } from "../../../defineCase.ts";
export default defineCase({
	loaderConfig: {
		paths: { test: "." },
		packages: [{ name: "dojo", location: "../../../../node_modules/dojo" }]
	}
});
