(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IMenu = factory();
    }
}(this, function () {
    function IMenu() {
    };

    //  Data ---
    IMenu.prototype.testData = function () {
        var data = ["This", "is a", "list", "of some text."];
        this.data(data);
        return this;
    };

    //  Properties  ---

    //  Events  ---
    IMenu.prototype.click = function (d) {
        console.log("Click:  " + d);
    };

    return IMenu;
}));
