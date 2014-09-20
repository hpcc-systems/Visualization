(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IBar = factory();
    }
}(this, function () {
    function IBar() {
    };

    //  Data ---
    IBar.prototype.testData = function () {
        var data = [
            { label: "Math", weight: 75 },
            { label: "Eng.", weight: 45 },
            { label: "Science", weight: 66, __viz_faChar: "\uf0c3" } //  http://fortawesome.github.io/Font-Awesome/cheatsheet/
        ];
        this.data(data);
        return this;
    };

    //  Properties  ---
    //  TODO  IBar.prototype._palette = "category20";     //TODO Create a IColor (or such like file with the various palettes)
    IBar.prototype._outerText = false;  //  Put label inside pie or outside (true/false)
    IBar.prototype._radius = 100;       // px
    IBar.prototype._innerRadius = 0;    // px

    //  Events  ---
    IBar.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IBar;
}));
