define([
	"require",
	"dojo/_base/config",
	"dojo/has",
	"dojo/i18n!nls/strings1",
	"dojo/i18n!./nls/strings2",
	"dojo/i18n!./nls/fr/strings1",
	"dojo/i18n!nls/de/strings1",
	"./nls/strings1"
], function (
	require,
	config,
	has,
	strings1,
	strings2,
	frStrings1,
	deStrings1,
	rawStrings1
) {
	const lang = config.locale ? config.locale : "default";
	it(`should load strings for ${lang} language`, function () {
		var hello = "Hello", goodby = "Good by";
		if (!has("empty-locales")) {
			switch (lang) {
				case "fr": hello = "Bonjoure"; goodby = "Bon par"; break;
				case "de": goodby = "Auf Wiedersehen"; break;
				case 'es': hello = "Hola"; break;
				case 'es-us': hello = "Hola (US)"; break;
				case 'en-au': hello = "G'day";
				case 'it': hello = "Ciao"; goodby = "Bene da"; break;
				case 'it-ch': hello = "Ciao (ch)"; goodby = "Bene da"; break;
			}
		}
		expect(strings1.hello).toEqual(hello);
		expect(strings2.goodby).toEqual(goodby);
	});
	if (!has("empty-locales")) {
		it("should load locale specific strings", function () {
			// load a locale specific bundle
			expect(require("./nls/fr/strings1").hello).toEqual("Bonjoure");
		});
	} else {
		it("should fall back when locale specific strings are requested", function () {
			expect(require("./nls/fr/strings1").hello).toEqual("Bonjoure");
		});
		it("should disable all locales in raw bundle", function () {
			Object.keys(rawStrings1).forEach(function (key) {
				if (key === "root") return;
				expect(("" + key + ":" + rawStrings1[key])).toEqual("" + key + (key === "not-a-locale" ? ":0" : ":false"));
			});
		});
	}
	it("should load language specific nls bundle", function () {
		expect(frStrings1.hello).toEqual(has("empty-locales") ? "Hello" : "Bonjoure");
		expect(deStrings1.hello).toEqual("Hello");	// always english because de is disabled in root bundle
	});
	it("should not modify rawStrings1 not-a-locale property value", function () {
		expect(rawStrings1['not-a-locale']).toEqual(0);
	});
});
