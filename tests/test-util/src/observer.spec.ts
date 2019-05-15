import { expect } from "chai";

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

describe("observer2", function () {
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

    it("AllMessages", function (done) {
        const ms = new Dispatch();
        const handle = ms.attach((changes: ConflatingMessage[]) => {
            expect(changes.length).to.equal(8);
            handle.release();
            done();
        });
        generateMessages(ms);
    });

    it("ConflatingMessage", function (done) {
        const ms = new Dispatch();
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

    it("SimpleMessage", function (done) {
        const ms = new Dispatch();
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
