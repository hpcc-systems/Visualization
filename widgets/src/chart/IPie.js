(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IPie = factory();
    }
}(this, function () {
    function IPie() {
    };

    //  Data ---
    IPie.prototype.testData = function () {
        var data = [
            { label: "Math", weight: 75 },
            { label: "Eng.", weight: 45 },
            { label: "Science", weight: 66, __viz_faChar: "\uf0c3" } //  http://fortawesome.github.io/Font-Awesome/cheatsheet/
        ];
        this.data(data);
        return this;
    };

    //  Properties  ---
    //  TODO  IPie.prototype._palette = "category20";     //TODO Create a IColor (or such like file with the various palettes)
    IPie.prototype._radius = 100;       // px
    IPie.prototype._innerRadius = 0;    // px

    //  Events  ---
    IPie.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IPie;
}));
