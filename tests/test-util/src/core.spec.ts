import { expect } from "chai";

import { Dispatch, Message, publish, serializable, TOrTFunctor } from "@hpcc-js/core";

class Base {
}

@serializable("@hpcc-js/test-util")
class Derived extends Base {

    someFunc() {
        return true;
    }

    @publish("red", "Some Color")
    backColor: publish<string, this>;
}
interface Derived extends serializable {
    backColor_exists(): boolean;    //  Equivilant to Derived.exists("backColor");
}

@serializable("@hpcc-js/test-util")
class Derived2 extends Derived {

    @publish("navy", "Some Color")
    foreColor: publish<string, this>;

    @publish(undefined, "Optional Color")
    optColor: publish<string, this>;

    @publish("white", "Some Overriden Color")
    overColor: publish<string, this>;
}
const overColor = Derived2.prototype.overColor;
Derived2.prototype.overColor = function (_?: TOrTFunctor<string, Derived>): string | Derived {
    const retVal: string | Derived = overColor.call(this, _);
    if (_ !== void 0) {
        console.log(_);
    }
    return retVal;
} as publish<string, Derived2>;

class Derived3 extends Derived2 {
    @publish("gold", "Some Extended Color")
    extColor: publish<string, this>;
}

describe("Serialize", function () {
    it("basic", function () {
        const instance = new Derived3();
        expect(instance).to.exist;
        expect(instance.backColor()).to.equal("red");
        expect(instance.exists("backColor")).to.equal(true);
        expect(instance.backColor_exists()).to.equal(true);
        expect(instance.modified("backColor")).to.equal(false);
        expect(instance.foreColor() === "navy");
        expect(instance.exists("foreColor")).to.equal(true);
        expect(instance.modified("foreColor")).to.equal(false);
        console.log(instance.className());
        console.log(instance.cssClass());
    });

    it("modified / reset", function () {
        const instance = new Derived3();
        const instance2 = new Derived3();

        //  Change default property value ---
        instance.backColor("pink");
        expect(instance.backColor()).to.equal("pink");
        expect(instance.exists("backColor")).to.equal(true);
        expect(instance.modified("backColor")).to.equal(true);
        expect(instance.modified("extColor")).to.equal(false);

        //  Reset back to defaults ---
        instance.reset("backColor");
        expect(instance.backColor()).to.equal("red");
        expect(instance.exists("backColor")).to.equal(true);
        expect(instance.modified("backColor")).to.equal(false);

        //  Change default property value ---
        instance2.backColor("pink");
        expect(instance2.backColor()).to.equal("pink");
        expect(instance2.exists("backColor")).to.equal(true);
        expect(instance2.modified("backColor")).to.equal(true);

        //  Reset back to defaults ---
        instance2.reset("backColor");
        expect(instance2.backColor()).to.equal("red");
        expect(instance2.exists("backColor")).to.equal(true);
        expect(instance2.modified("backColor")).to.equal(false);
    });

    it("functor value", function () {
        const instance = new Derived3();

        //  Note "w" is typed correctly  ---
        instance.backColor(w => w.foreColor());
        //  Back Color should always match forecolor  ---
        expect(instance.backColor()).to.equal("navy");

        //  Change forecolor
        instance.foreColor(() => "grey");
        expect(instance.foreColor()).to.equal("grey");
        //  Back Color should always match forecolor  ---
        expect(instance.backColor()).to.equal("grey");
    });

    it("override", function () {
        const instance = new Derived3();
        expect(instance.modified("overColor")).to.equal(false);
        instance.overColor("green");
        expect(instance.overColor()).to.equal("green");
        expect(instance.modified("overColor")).to.equal(true);
        instance.reset("overColor");
        expect(instance.modified("overColor")).to.equal(false);
    });

    it("optional", function () {
        const instance = new Derived3();

        //  Check it doesn't exit  ---
        expect(instance.exists("optColor")).to.equal(false);
        expect(instance.modified("optColor")).to.equal(false);

        //  Set value  ---
        instance.optColor("pink");
        expect(instance.optColor()).to.equal("pink");
        expect(instance.exists("optColor")).to.equal(true);
        expect(instance.modified("optColor")).to.equal(true);

        //  Reset back to (no) defaults ---
        instance.reset("optColor");
        expect(instance.optColor()).to.be.undefined;
        expect(instance.exists("optColor")).to.equal(false);
        expect(instance.modified("optColor")).to.equal(false);
    });

    it("serialization", function () {
        const instA = new Derived3()
            .backColor("white")
            .overColor("transparent")
            ;

        const objA = instA.serialize();
        const instB = new Derived3();
        const objA2 = instA.serialize();
        expect(objA).to.deep.equal(objA2);
        instB.deserialize(objA2);
        expect(instB.backColor()).to.equal(instA.backColor());
        expect(instB.foreColor()).to.equal(instA.foreColor());
        expect(instB.overColor()).to.equal(instA.overColor());
        expect(instB.optColor()).to.equal(instA.optColor());
        expect(instB.modified("backColor")).to.equal(true);
        expect(instB.modified("foreColor")).to.equal(false);
    });

});

describe("Dispatch", function () {
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
        const handle = ms.monitor((changes: ConflatingMessage[]) => {
            expect(changes.length).to.equal(8);
            handle.dispose();
            done();
        });
        generateMessages(ms);
    });

    it("ConflatingMessage", function (done) {
        const ms = new Dispatch();
        const handle = ms.monitor((changes: ConflatingMessage[]) => {
            expect(changes.length).to.equal(4);
            expect(changes[0]).instanceOf(ConflatingMessage);
            expect(changes[0].property).to.equal("someProp1");
            expect(changes[0].newValue).to.equal("d");
            expect(changes[0].oldValue).to.equal("0");
            expect(changes[1].property).to.equal("someProp2");
            expect(changes[2].property).to.equal("someProp3");
            expect(changes[3].property).to.equal("someProp4");
            handle.dispose();
            done();
        }, ConflatingMessage);
        generateMessages(ms);
    });

    it("SimpleMessage", function (done) {
        const ms = new Dispatch();
        const handle = ms.monitor((changes: ConflatingMessage[]) => {
            expect(changes.length).to.equal(4);
            expect(changes[0]).instanceOf(SimpleMessage);
            expect(changes[0].property).to.equal("someProp5");
            expect(changes[0].newValue).to.equal("flop");
            expect(changes[0].oldValue).to.equal("flip");
            expect(changes[1].property).to.equal("someProp5");
            expect(changes[2].property).to.equal("someProp5");
            expect(changes[3].property).to.equal("someProp5");
            handle.dispose();
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
