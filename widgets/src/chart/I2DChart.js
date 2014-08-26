(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.I2DChart = factory();
    }
}(this, function () {
    function I2DChart() {
    };

    //  Data ---
    I2DChart.prototype.testData = function () {
        var data = [
            { label: "Geography", weight: 75 },
            { label: "English", weight: 45 },
            { label: "Math", weight: 98 },
            { label: "Science", weight: 66, __viz_faChar: "\uf0c3" } //  http://fortawesome.github.io/Font-Awesome/cheatsheet/
        ];
        this.data(data);
        return this;
    };

    //  Properties  ---
    //TODO:  I2DChart.prototype._palette = "category20";

    //  Events  ---
    I2DChart.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return I2DChart;
}));
