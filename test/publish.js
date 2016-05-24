"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Factory", "src/common/SVGWidget", "src/common/Utility", "require"], factory);
    } else {
        root.widgets = factory(root.d3, root.test_Factory, root.common_SVGWidget, root.common_Utility, root.require);
    }
}(this, function (d3, testFactory, SVGWidget, Utility, require) {
    function TestWidget() {
        SVGWidget.call(this);

        this.options = ["aaa", "bbb", "ccc"];
    }
    TestWidget.prototype = Object.create(SVGWidget.prototype);
    TestWidget.prototype.constructor = TestWidget;
    TestWidget.prototype._class += " common_TestWidget";

    TestWidget.prototype.publish("booleanProp", false, "boolean", "Boolean Prop");
    TestWidget.prototype.publish("stringProp", "", "string", "String Prop");
    TestWidget.prototype.publish("numberProp", 0, "number", "Number Prop");
    TestWidget.prototype.publish("arrayProp", [], "array", "Array Prop");
    TestWidget.prototype.publish("arrayProp2", ["abcd", "efgh"], "array", "Array Prop");

    TestWidget.prototype.publish("setProp", "aaa", "set", "Set Prop", ["aaa", "bbb", "ccc"]);
    TestWidget.prototype.publish("setProp2", "aaa", "set", "Set Prop", function () { return this.options; });

    TestWidget.prototype.publish("objectProp", { id: "a" }, "object", "Object Prop");
    TestWidget.prototype.publish("widgetProp", null, "widget", "Widget Prop");
    TestWidget.prototype.publish("widgetsProp", [], "widgetsArray", "Widgets Array Prop");

    describe("Publish Properties", function () {
        function testProperty(propID, testValue, defaultValue, newDefaultValue) {
            var testWidget = new TestWidget();
            var testWidget2 = new TestWidget();

            assert.deepEqual(testWidget[propID](), defaultValue, "#1a");
            assert.equal(testWidget[propID + "_exists"](), true, "#1b");
            assert.equal(testWidget[propID + "_modified"](), false, "#1c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#1d");

            testWidget[propID + "_reset"]();
            assert.deepEqual(testWidget[propID](), defaultValue, "#2a");
            assert.equal(testWidget[propID + "_exists"](), true, "#2b");
            assert.equal(testWidget[propID + "_modified"](), false, "#2c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#2d");

            testWidget[propID](defaultValue);
            assert.deepEqual(testWidget[propID](), defaultValue, "#3a");
            assert.equal(testWidget[propID + "_exists"](), true, "#3b");
            assert.equal(testWidget[propID + "_modified"](), true, "#3c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#3d");

            testWidget[propID](testValue);
            assert.deepEqual(testWidget[propID](), testValue, "#4a");
            assert.equal(testWidget[propID + "_exists"](), true, "#4b");
            assert.equal(testWidget[propID + "_modified"](), true, "#4c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#4d");

            testWidget[propID](testValue);
            assert.deepEqual(testWidget[propID](), testValue, "#5a");
            assert.equal(testWidget[propID + "_exists"](), true, "#5b");
            assert.equal(testWidget[propID + "_modified"](), true, "#5c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#5d");

            testWidget[propID + "_reset"]();
            assert.deepEqual(testWidget[propID](), defaultValue, "#6a");
            assert.equal(testWidget[propID + "_exists"](), true, "#6b");
            assert.equal(testWidget[propID + "_modified"](), false, "#6c");
            assert.deepEqual(testWidget[propID + "_default"](), defaultValue, "#6d");

            testWidget[propID + "_default"](newDefaultValue, "#7a");
            assert.deepEqual(testWidget[propID](), newDefaultValue, "#7b");
            assert.equal(testWidget[propID + "_exists"](), true, "#7c");
            assert.equal(testWidget[propID + "_modified"](), false, "#7d");
            assert.deepEqual(testWidget[propID + "_default"](), newDefaultValue, "#7e");

            testWidget[propID](testValue);
            assert.deepEqual(testWidget[propID](), testValue, "#8a");
            assert.equal(testWidget[propID + "_exists"](), true, "#8b");
            assert.equal(testWidget[propID + "_modified"](), true, "#8c");
            assert.deepEqual(testWidget[propID + "_default"](), newDefaultValue, "#8d");

            if (defaultValue instanceof Array) {
                var d = 0;
            }
            testWidget[propID + "_reset"]();
            assert.deepEqual(testWidget[propID](), newDefaultValue, "#9a");
            assert.equal(testWidget[propID + "_exists"](), true, "#9b");
            assert.equal(testWidget[propID + "_modified"](), false, "#9c");
            assert.deepEqual(testWidget[propID + "_default"](), newDefaultValue, "#9d");

            //  Cross references  ---
            assert.notDeepEqual(testWidget[propID](), testWidget2[propID](), "#10a");
            var testWidget3 = new TestWidget();
            assert.notDeepEqual(testWidget[propID](), testWidget3[propID](), "#10b");
            testWidget[propID](testValue);
            assert.notDeepEqual(testWidget[propID](), testWidget3[propID](), "#10c");
            testWidget3[propID](testValue);
            assert.deepEqual(testWidget[propID](), testWidget3[propID](), "#10d");
        }
        it("boolean", function () {
            testProperty("booleanProp", true, false, true);
        });
        it("number", function () {
            testProperty("numberProp", 42, 0, 11);
        });
        it("string", function () {
            testProperty("stringProp", "abc", "", "def");
        });
        it("array", function () {
            testProperty("arrayProp", ["abc"], [], ["def"]);
        });
        it("set", function () {
            testProperty("setProp", "bbb", "aaa", "ccc");
        });
        it("dynamic set", function () {
            testProperty("setProp2", "bbb", "aaa", "ccc");
        });
        it("object", function () {
            testProperty("objectProp", { id: "b" }, { id: "a" }, { id: "c" });
        });
        it("shared references", function () {
            var testWidget1 = new TestWidget();
            var testWidget2 = new TestWidget();
            testWidget1.booleanProp(true);
            assert.isFalse(testWidget2.booleanProp_modified());
            testWidget1.numberProp(42);
            assert.isFalse(testWidget2.numberProp_modified());
            testWidget1.stringProp("abc");
            testWidget1.numberProp_modified(42);
            assert.isFalse(testWidget2.stringProp_modified());

            testWidget1.arrayProp([]);
            testWidget1.arrayProp().push("abc");
            testWidget1.arrayProp().push("def");
            assert.notDeepEqual(testWidget1.arrayProp(), testWidget2.arrayProp(), "#1");
            assert.isFalse(testWidget2.arrayProp_modified(), "#2");
            assert.deepEqual(testWidget2.arrayProp(), testWidget2.arrayProp_default(), "#3");
            testWidget2.arrayProp(["ghi", "jkl"]);
            assert.notDeepEqual(testWidget1.arrayProp(), testWidget2.arrayProp(), "#4");
            assert.deepEqual(testWidget1.arrayProp(), ["abc", "def"], "#5");
            assert.deepEqual(testWidget1.arrayProp_default(), testWidget2.arrayProp_default(), "#6");

            assert.deepEqual(testWidget1.arrayProp2_default(), testWidget2.arrayProp2_default(), "#7");
            assert.deepEqual(testWidget1.arrayProp2(), testWidget2.arrayProp2_default(), "#8");
            assert.deepEqual(testWidget1.arrayProp2_default(), testWidget2.arrayProp2(), "#9");
        });
    });
}));
