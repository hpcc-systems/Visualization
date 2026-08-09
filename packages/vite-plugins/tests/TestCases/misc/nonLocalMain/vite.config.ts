import { defineCase } from "../../../defineCase.ts";
export default [true, false].map(hasConfigApi =>
	defineCase({
		loaderConfig: "./loaderConfig.cjs",
		environment: { hasConfigApi }
	})
);
