(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.I2DChart = factory(root.Palette);
    }
}(this, function (Palette) {
    function I2DChart() {
    };
    I2DChart.prototype._palette = Palette.ordinal("default");

    //  Data ---
    I2DChart.prototype.testData = function () {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);//, "__viz_faChar"]);
        this.data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, 52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 66]//, "\uf0c3"] //  http://fortawesome.github.io/Font-Awesome/cheatsheet/
        ]);
        return this;
    };

    //  Events  ---
    I2DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I2DChart;
}));
