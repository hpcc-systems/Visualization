import { defineCase } from "../../../defineCase.ts";
export default [true, false].map(() =>
	defineCase({
		loaderConfig: {
			paths: { test: "." },
			packages: [{ name: "dojo", location: "../../../../node_modules/dojo" }]
		}
	})
);
