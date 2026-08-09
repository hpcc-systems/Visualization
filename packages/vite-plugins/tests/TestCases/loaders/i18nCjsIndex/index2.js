it("should load the strings", async function () {
	const [strings1, strings2] = await Promise.all([
		require("dojo/i18n!test/nls/stringsNoRoot"),
		require("dojo/i18n!./nls/strings")
	]);
	expect((strings1.default || strings1).hello).toBe("Hello");
	expect((strings2.default || strings2).goodby).toBe("Bon par");
});
module.exports = {};
