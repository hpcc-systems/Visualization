import { describe, it, expect, vi } from "vitest";

import { IEvent, StateObject } from "../src/index.ts";

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

    it("get without key returns full state", function () {
        const obj: any = new StateObject<ITest, ITest>();
        obj.set("aaa", "test");
        obj.set("bbb", 42);
        const state = obj.get();
        expect(state).to.deep.equal({ aaa: "test", bbb: 42 });
    });

    it("get with default value", function () {
        const obj: any = new StateObject<ITest, ITest>();
        expect(obj.get("aaa", "default" as any)).to.equal("default");
        obj.set("aaa", "set");
        expect(obj.get("aaa", "default" as any)).to.equal("set");
    });

    it("clear resets state", function () {
        const obj: any = new StateObject<ITest, ITest>();
        obj.set("aaa", "val");
        expect(obj.has("aaa")).to.be.true;
        obj.clear();
        expect(obj.has("aaa")).to.be.false;
    });

    it("clear with new values", function () {
        const obj: any = new StateObject<ITest, ITest>();
        obj.set("aaa", "old");
        obj.clear({ aaa: "new" });
        expect(obj.get("aaa")).to.equal("new");
    });

    it("invalid eventID throws for changed", function () {
        const obj: any = new StateObject<ITest, ITest>();
        expect(() => obj.addObserver("propChanged", () => { })).to.throw("Invalid eventID");
    });

    it("invalid eventID throws for propChanged", function () {
        const obj: any = new StateObject<ITest, ITest>();
        expect(() => obj.addObserver("changed", "aaa", () => { })).to.throw("Invalid eventID");
    });

    it("watch with callback", function () {
        return new Promise<void>((resolve) => {
            const obj: any = new StateObject<ITest, ITest>();
            obj.set("aaa", "test");
            const handle = obj.watch((changes: IEvent[]) => {
                handle.release();
                resolve();
            });
        });
    });

    it("watch with invalid callback throws", function () {
        const obj: any = new StateObject<ITest, ITest>();
        expect(() => obj.watch("not a function" as any)).to.throw("Invalid Callback");
    });

    it("watch with triggerChange false", function () {
        return new Promise<void>((resolve) => {
            const obj: any = new StateObject<ITest, ITest>();
            const handle = obj.watch((changes: IEvent[]) => {
                handle.release();
                resolve();
            }, false);
            obj.set("aaa", "trigger");
        });
    });

    it("hasEventListener", function () {
        const obj: any = new StateObject<ITest, ITest>();
        expect(obj.hasEventListener()).to.be.false;
        const handle = obj.addObserver("changed", () => { });
        expect(obj.hasEventListener()).to.be.true;
        handle.release();
        expect(obj.hasEventListener()).to.be.false;
    });
});
