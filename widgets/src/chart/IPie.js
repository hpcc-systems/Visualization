(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IPie = factory();
    }
}(this, function () {
    function IPie() {
    };

    //  Events  ---
    IPie.prototype.click = function (d) {
        console.log("Arc Click:  " + d.label);
    };

    return IPie;
}));
