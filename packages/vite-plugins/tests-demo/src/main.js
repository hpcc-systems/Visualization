define([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/has",
    "dojo/sniff",
    "dojo/parser",
    "dijit/form/Button",
    "dijit/form/NumberSpinner",
    "dojox/widget/Toaster",
    "app/GreetingCard",
    "./counter",
    "dojo/text!app/banner.txt",
    // The parser reads data-dojo-type out of the DOM at run time, so these cannot be found by
    // static analysis. Listing them here is what puts them in the bundle and in the registry.
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane"
], function (dom, domConstruct, on, has, sniff, parser, Button, NumberSpinner, Toaster, GreetingCard, counter, banner) {
    const features = dom.byId("features");
    ["vite", "dom", "host-browser", "dojo-has-api", "dom-addeventlistener", "bug-for-in-skips-shadowed"].forEach(name => {
        domConstruct.create("li", { textContent: `${name}: ${String(has(name))}` }, features);
    });

    dom.byId("banner").textContent = banner;

    // Build the declared layout first; the widgets below attach to nodes inside its panes.
    parser.parse().then(function () {
        // dijit widgets are templated, so their markup arrives through dojo/text! and
        // their labels through dojo/i18n! — both resolved at build time.
        const step = new NumberSpinner({
            value: 1,
            smallDelta: 1,
            constraints: { min: 1, max: 10, places: 0 }
        }, "step");
        step.startup();

        const button = new Button({ label: "count is 0" }, "counter");
        button.startup();

        const count = counter.create(value => {
            button.set("label", `count is ${value}`);
        });
        on(button, "click", () => count.increment(step.get("value")));

        const toaster = new Toaster({ positionDirection: "tr-down" });
        toaster.startup();
        const toastButton = new Button({ label: "Show Toaster" }, "toaster-button");
        toastButton.startup();
        on(toastButton, "click", () => {
            toaster.setContent("DojoX Toaster is bundled and running.", "message");
        });

        const aboutButton = new Button({ label: "About\u2026" }, "about-button");
        aboutButton.startup();
        // Loaded on demand: dijit/Dialog and app/about land in their own chunk.
        on(aboutButton, "click", () => {
            require(["dijit/Dialog", "app/about"], function (Dialog, about) {
                new Dialog({ title: "About", content: about.text }).show();
            });
        });
    });
});
