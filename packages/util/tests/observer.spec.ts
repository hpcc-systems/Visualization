import { describe, it, expect } from "vitest";

import { Dispatch, Message, Observable } from "@hpcc-js/util";

describe("observer", function () {
    it("reference counter", function () {
        function echoEvent() {
            // logger.debug(args);
        }
        const et = new Observable("aaa", "bbb", "zzz");
        expect(et.hasObserver()).is.false;
        et.addObserver("aaa", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.true;
        expect(et.hasObserver("bbb")).is.false;
        et.addObserver("bbb", echoEvent);
        const h = et.addObserver("bbb", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.true;
        expect(et.hasObserver("bbb")).is.true;
        et.removeObserver("aaa", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.false;
        expect(et.hasObserver("bbb")).is.true;
        h.release();
        expect(et.hasObserver()).is.false;
        expect(et.hasObserver("aaa")).is.false;
        expect(et.hasObserver("bbb")).is.false;
    });
    it("message dispatch", function () {
        const et = new Observable("aaa", "bbb", "zzz");
        et.addObserver("aaa", (a: number, b: number, c: number, d?: number) => {
            expect(a).to.equal(1);
            expect(b).to.equal(2);
            expect(c).to.equal(3);
            expect(d).to.be.undefined;
        });
        et.dispatchEvent("aaa", 1, 2, 3);
    });
});

class SimpleMessage extends Message {
    constructor(readonly property: string, public newValue: any, public oldValue?: any) {
        super();
    }
}

class ConflatingMessage extends Message {

    constructor(readonly property: string, public newValue: any, public oldValue?: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: ConflatingMessage) {
        if (this.property === other.property) {
            this.newValue = other.newValue;
            return true;
        }
        return false;
    }

    void(): boolean {
        return this.newValue === this.oldValue;
    }
}

describe("dispatch", function () {
    it("hasObserver - initially false", () => {
        const ms = new Dispatch<SimpleMessage>();
        expect(ms.hasObserver()).to.be.false;
    });

    it("hasObserver - true after attach", () => {
        const ms = new Dispatch<SimpleMessage>();
        const handle = ms.attach(() => { });
        expect(ms.hasObserver()).to.be.true;
        handle.release();
    });

    it("hasObserver - false after release", () => {
        const ms = new Dispatch<SimpleMessage>();
        const handle = ms.attach(() => { });
        expect(ms.hasObserver()).to.be.true;
        handle.release();
        expect(ms.hasObserver()).to.be.false;
    });

    it("send - immediate synchronous dispatch", () => {
        const ms = new Dispatch<SimpleMessage>();
        let callCount = 0;
        ms.attach((messages) => {
            callCount++;
            expect(messages.length).to.equal(1);
            expect(messages[0].property).to.equal("test");
        });
        ms.send(new SimpleMessage("test", "value"));
        expect(callCount).to.equal(1);
    });

    it("flush - clears message buffer (prior to dispatch)", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<SimpleMessage>();
            const handle = ms.attach(() => {
                throw new Error("Should not be called");
            });
            ms.post(new SimpleMessage("test", "value"));
            ms.flush();
            handle.release();
            // Wait for RAF to ensure no callback
            setTimeout(() => done(), 50);
        });
    });

    it("multiple observers receive same messages", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<SimpleMessage>();
            let count1 = 0;
            let count2 = 0;
            const handle1 = ms.attach((messages) => {
                count1++;
                expect(messages.length).to.equal(2);
            });
            const handle2 = ms.attach((messages) => {
                count2++;
                expect(messages.length).to.equal(2);
            });
            ms.post(new SimpleMessage("prop1", "val1"));
            ms.post(new SimpleMessage("prop2", "val2"));
            setTimeout(() => {
                expect(count1).to.equal(1);
                expect(count2).to.equal(1);
                handle1.release();
                handle2.release();
                done();
            }, 50);
        });
    });

    it("RAF handle 0 is treated as scheduled", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<SimpleMessage>();
            let callCount = 0;
            const handle = ms.attach((messages) => {
                callCount++;
                expect(messages.length).to.equal(3);
            });

            // Post multiple messages rapidly
            ms.post(new SimpleMessage("prop1", "val1"));
            ms.post(new SimpleMessage("prop2", "val2"));
            ms.post(new SimpleMessage("prop3", "val3"));

            setTimeout(() => {
                // Should only be called once despite multiple posts
                expect(callCount).to.equal(1);
                handle.release();
                done();
            }, 50);
        });
    });

    it("AllMessages", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<ConflatingMessage>();
            const handle = ms.attach((changes: ConflatingMessage[]) => {
                expect(changes.length).to.equal(8);
                handle.release();
                done();
            });
            generateMessages(ms);
        });
    });

    it("ConflatingMessage", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<ConflatingMessage>();
            const handle = ms.attach((changes: ConflatingMessage[]) => {
                expect(changes.length).to.equal(4);
                expect(changes[0]).instanceOf(ConflatingMessage);
                expect(changes[0].property).to.equal("someProp1");
                expect(changes[0].newValue).to.equal("d");
                expect(changes[0].oldValue).to.equal("0");
                expect(changes[1].property).to.equal("someProp2");
                expect(changes[2].property).to.equal("someProp3");
                expect(changes[3].property).to.equal("someProp4");
                handle.release();
                done();
            }, ConflatingMessage);
            generateMessages(ms);
        });
    });

    it("SimpleMessage", () => {
        return new Promise<void>((done) => {
            const ms = new Dispatch<ConflatingMessage>();
            const handle = ms.attach((changes: ConflatingMessage[]) => {
                expect(changes.length).to.equal(4);
                expect(changes[0]).instanceOf(SimpleMessage);
                expect(changes[0].property).to.equal("someProp5");
                expect(changes[0].newValue).to.equal("flop");
                expect(changes[0].oldValue).to.equal("flip");
                expect(changes[1].property).to.equal("someProp5");
                expect(changes[2].property).to.equal("someProp5");
                expect(changes[3].property).to.equal("someProp5");
                handle.release();
                done();
            }, SimpleMessage);
            generateMessages(ms);
        });
    });

    function generateMessages(ms: Dispatch) {
        ms.post(new ConflatingMessage("someProp1", "a", "0"));
        ms.post(new ConflatingMessage("someProp2", "2"));
        ms.post(new ConflatingMessage("someProp1", "b", "a"));
        ms.post(new ConflatingMessage("someProp3", "3"));
        ms.post(new SimpleMessage("someProp5", "flop", "flip"));
        ms.post(new ConflatingMessage("someProp1", "d", "c"));
        ms.post(new SimpleMessage("someProp5", "flip", "flop"));
        ms.post(new SimpleMessage("someProp5", "xxx", "flip"));
        ms.post(new SimpleMessage("someProp5", "flip", "xxx"));
        ms.post(new ConflatingMessage("someProp1", "c", "b"));
        ms.post(new ConflatingMessage("someProp4", "4"));
        ms.post(new ConflatingMessage("someProp5", "flop", "flip"));
        ms.post(new ConflatingMessage("someProp1", "d", "c"));
        ms.post(new ConflatingMessage("someProp5", "flip", "flop"));
        ms.post(new ConflatingMessage("someProp5", "xxx", "flip"));
        ms.post(new ConflatingMessage("someProp5", "flip", "xxx")); //  newVal === oldVal => no message to fire
    }
});
