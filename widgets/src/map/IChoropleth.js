(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IChoropleth = factory();
    }
}(this, function () {
    function IChoropleth() {
    };

    //  Events  ---
    IChoropleth.prototype.click = function (element, d) {
        console.log("Choropleth Click:  " + d.state);
    };

    return IChoropleth;
}));
