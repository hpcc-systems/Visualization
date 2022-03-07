import { expect } from "chai";

import type { HPCCTestLoad } from "./element.testLoad.spec";

//  Tests  ---
describe("element", function () {
    const testLoad = document.createElement("hpcc-testload") as HPCCTestLoad;

    describe("create", function () {
        it("init", function () {
            testLoad.setAttribute("user_attr", "user_attr");
            testLoad.setAttribute("style", "width:100px;height:100px");
            document.body.appendChild(testLoad);

            testLoad.setAttribute("user_attr_setattr", "user_attr_setattr");
            testLoad.user_attr_as_property = "user_attr_as_property";

            testLoad.user_prop = "user_prop";
            testLoad.setAttribute("user_prop_setattr", "user_prop_setattr");
            testLoad.user_prop_as_property = "user_prop_as_property";
        });
    });

    describe("pre-upgrade", function () {

        it("class", async function () {
            expect(testLoad).to.exist;
            expect(testLoad.constructed).to.be.undefined;
            expect(testLoad._div).to.be.undefined;
            expect(customElements.get("hpcc-testload")).to.be.undefined;
            expect(testLoad).to.be.instanceOf(HTMLElement);
        });

        it("attributes", async function () {
            expect(testLoad.getAttribute("undefined_attr")).to.be.null;
            expect(testLoad.getAttribute("default_attr")).to.be.null;
            expect(testLoad.getAttribute("user_attr")).to.equal("user_attr");
            expect(testLoad.getAttribute("user_attr_setattr")).to.equal("user_attr_setattr");
            expect(testLoad.getAttribute("user_attr_as_property")).to.be.null;
        });

        it("attributes as properties", async function () {
            expect(testLoad.undefined_attr).to.be.undefined;
            expect(testLoad.default_attr).to.be.undefined;
            expect(testLoad.user_attr).to.be.undefined;
            expect(testLoad.user_attr_setattr).to.be.undefined;
            expect(testLoad.user_attr_as_property).to.equal("user_attr_as_property");
        });

        it("properties", async function () {
            expect(testLoad.undefined_prop).to.be.undefined;
            expect(testLoad.default_prop).to.be.undefined;
            expect(testLoad.user_prop).to.equal("user_prop");
            expect(testLoad.user_prop_setattr).to.be.undefined;
            expect(testLoad.user_prop_as_property).to.equal("user_prop_as_property");
        });

        it("properties as attributes", async function () {
            expect(testLoad.getAttribute("undefined_prop")).to.be.null;
            expect(testLoad.getAttribute("default_prop")).to.be.null;
            expect(testLoad.getAttribute("user_prop")).to.be.null;
            expect(testLoad.getAttribute("user_prop_setattr")).to.equal("user_prop_setattr");
            expect(testLoad.getAttribute("user_prop_as_property")).to.be.null;
        });
    });

    describe("post-upgrade", function () {
        it("class", async function () {
            return import("./element.testLoad.spec").then(({ HPCCTestLoad }) => {
                expect(testLoad).to.exist;
                expect(testLoad.constructed).to.be.true;
                expect(testLoad._div).to.be.instanceOf(HTMLDivElement);
                expect(customElements.get("hpcc-testload")).to.exist;
                expect(testLoad).to.be.instanceOf(HPCCTestLoad);
            });
        });

        it("attributes", async function () {
            expect(testLoad.getAttribute("undefined_attr")).to.be.null;
            expect(testLoad.getAttribute("default_attr")).to.equal("default_attr");
            expect(testLoad.getAttribute("user_attr")).to.equal("user_attr");
            expect(testLoad.getAttribute("user_attr_setattr")).to.equal("user_attr_setattr");
            expect(testLoad.getAttribute("user_attr_as_property")).to.equal("user_attr_as_property");
        });

        it("attributes as properties", async function () {
            expect(testLoad.undefined_attr).to.be.undefined;
            expect(testLoad.default_attr).to.equal("default_attr");
            expect(testLoad.user_attr).to.equal("user_attr");
            expect(testLoad.user_attr_setattr).to.equal("user_attr_setattr");
            expect(testLoad.user_attr_as_property).to.equal("user_attr_as_property");
        });

        it("properties", async function () {
            expect(testLoad.undefined_prop).to.be.undefined;
            expect(testLoad.default_prop).to.equal("default_prop");
            expect(testLoad.user_prop).to.equal("user_prop");
            expect(testLoad.user_prop_setattr).to.equal("default_prop");
            expect(testLoad.user_prop_as_property).to.equal("user_prop_as_property");
        });

        it("properties as attributes", async function () {
            expect(testLoad.getAttribute("undefined_prop")).to.be.null;
            expect(testLoad.getAttribute("default_prop")).to.be.null;
            expect(testLoad.getAttribute("user_prop")).to.be.null;
            expect(testLoad.getAttribute("user_prop_setattr")).to.equal("user_prop_setattr");
            expect(testLoad.getAttribute("user_prop_as_property")).to.be.null;
        });

        it("set-attributes", async function () {
            testLoad.setAttribute("undefined_attr", "aaa");
            testLoad.setAttribute("default_attr", "aaa");
            testLoad.setAttribute("user_attr", "aaa");// Check conflation
            testLoad.setAttribute("user_attr", "bbb");// Check conflation
            testLoad.setAttribute("user_attr", "ccc");// Check conflation
            testLoad.setAttribute("user_attr", "aaa");// Check conflation
            testLoad.setAttribute("user_attr_setattr", "aaa");
            testLoad.setAttribute("user_attr_as_property", "aaa");
            expect(testLoad.getAttribute("undefined_attr")).to.equal("aaa");
            expect(testLoad.getAttribute("default_attr")).to.equal("aaa");
            expect(testLoad.getAttribute("user_attr")).to.equal("aaa");
            expect(testLoad.getAttribute("user_attr_setattr")).to.equal("aaa");
            expect(testLoad.getAttribute("user_attr_as_property")).to.equal("aaa");
        });

    });

    describe("destroy", function () {
        it("remove", function () {
            testLoad.remove();
        });
    });
});
