import { expect } from "chai";

import { IEvent, StateObject } from "@hpcc-js/util";

describe("StateObject", function () {
    interface ITest {
        aaa: string;
        bbb: number;
        ccc: boolean;
    }
    const stateObj: any = new StateObject<ITest, ITest>();
    stateObj.on("changed", (changes: IEvent[]) => {
        expect(changes.length).to.equal(2);
    });
    stateObj.addObserver("changed", (changes: IEvent[]) => {
        expect(changes.length).to.equal(2);
    });
    stateObj.on("propChanged", "aaa", (changes: IEvent) => {
        expect(changes.id).to.equal("aaa");
        expect(changes.newValue).to.equal("hello4");
    });
    stateObj.addObserver("propChanged", "bbb", (changes: IEvent) => {
        expect(changes.id).to.equal("bbb");
        expect(changes.newValue).to.equal(1234);
    });
    stateObj.on("propChanged", "ccc", (changes: any) => {
        expect(true).to.be.false;
    });
    it("basic", function () {
        expect(stateObj.has("aaa")).to.be.false;
        expect(stateObj.get("aaa")).not.to.exist;
        stateObj.set("aaa", "abc");
        expect(stateObj.has("aaa")).to.be.true;
        expect(stateObj.get("aaa")).to.exist;
        expect(stateObj.get("aaa")).to.be.string;
        stateObj.set("bbb", 123);
        stateObj.set("ccc", true);
        expect(stateObj.get("bbb")).not.to.be.NaN;
        stateObj.set({ aaa: "hello", bbb: 1235 });
        stateObj.set({ aaa: "hello2", bbb: 1236 });
        stateObj.set({ aaa: "hello3", bbb: 1237 });
        stateObj.set({ aaa: "hello4", bbb: 1234 });
        stateObj.set({ aaa: "hello4", bbb: 1234, ccc: undefined });
    });
});
