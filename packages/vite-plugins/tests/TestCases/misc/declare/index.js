define(["dojo/_base/declare"], function (declare) {
    // dojo/_base/declare relies on sloppy-mode `arguments.callee`, so these cases fail
    // unless module bodies are evaluated outside the surrounding ES module's strict scope.
    var Base = declare(null, {
        constructor: function (n) {
            this.log = ["base:" + n];
        },
        greet: function (who) {
            return "base-" + who;
        }
    });

    var Derived = declare(Base, {
        constructor: function (n) {
            this.log.push("derived:" + n);
        },
        greet: function (who) {
            return this.inherited(arguments) + "+derived";
        }
    });

    it("should instantiate a declared class", function () {
        expect(new Base(1).log).toEqual(["base:1"]);
    });

    it("should chain constructors through the prototype chain", function () {
        expect(new Derived(2).log).toEqual(["base:2", "derived:2"]);
    });

    it("should support this.inherited(arguments)", function () {
        expect(new Derived(3).greet("x")).toEqual("base-x+derived");
    });

    it("should force new when a constructor is called without it", function () {
        expect(Derived(4).log).toEqual(["base:4", "derived:4"]);
    });
});
