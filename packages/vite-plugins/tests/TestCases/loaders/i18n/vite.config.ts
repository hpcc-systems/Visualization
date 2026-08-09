import { defineCase } from "../../../defineCase.ts";

const locales = ["en", "fr", "es", "de", "it-ch", "zh-hk"];

export default [
	...[undefined, "en-us", "fr", "es", "de", "it-ch", "zh-hk"].map(locale =>
		defineCase({
			loaderConfig: { paths: { test: "." }, has: { "host-browser": 0 }, locale },
			locales
		})
	),
	...[undefined, "en-us", "fr", "es", "de", "it", "it-ch", "zh-hk"].map(locale =>
		defineCase({
			loaderConfig: { paths: { test: "." }, has: { "host-browser": 0 }, locale: locale === "es" ? "es-us" : locale }
		})
	),
	...[undefined, "en-us", "fr", "es", "de", "it", "it-ch", "zh-hk"].map(locale =>
		defineCase({
			loaderConfig: { paths: { test: "." }, has: { "host-browser": 0, "empty-locales": 1 }, locale },
			locales: []
		})
	)
];
