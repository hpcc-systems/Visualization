import { expect } from "chai";

import { StateObject } from "@hpcc-js/util";

describe("StateObject", function () {
    interface ITest {
        aaa: string;
        bbb: number;
    }
    const stateObj: any = new StateObject<ITest, ITest>();
    stateObj.on("changed", () => {
        // logger.debug(`changed:  ${JSON.stringify(changes)}`);
    });
    stateObj.addObserver("changed", () => {
        // logger.debug(`changed:  ${JSON.stringify(changes)}`);
    });
    stateObj.on("propChanged", "bbb", () => {
        // logger.debug(`changed:  ${JSON.stringify(changes)}`);
    });
    stateObj.addObserver("propChanged", "bbb", () => {
        // logger.debug(`changed:  ${JSON.stringify(changes)}`);
    });
    it("basic", function () {
        expect(stateObj.has("aaa")).to.be.false;
        expect(stateObj.get("aaa")).not.to.exist;
        stateObj.set("aaa", "abc");
        expect(stateObj.has("aaa")).to.be.true;
        expect(stateObj.get("aaa")).to.exist;
        expect(stateObj.get("aaa")).to.be.string;
        stateObj.set("bbb", 123);
        expect(stateObj.get("bbb")).not.to.be.NaN;
        stateObj.set({ aaa: "hello", bbb: 123 });
        stateObj.set({ aaa: "hello", bbb: 123 });
        stateObj.set({ aaa: "hello", bbb: 123 });
        stateObj.set({ aaa: "hello", bbb: 123 });
    });
});
