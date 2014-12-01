(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.IWordCloud = factory();
    }
}(this, function () {
    function IWordCloud() {
    };

    IWordCloud.prototype.testData = function () {
        this.columns(["Word", "Weight"]);
        var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"].map(function (d) {
            return [ d, 10 + Math.random() * 45 ];
        });
        this.data(words);
        return this;
    };

    //  Properties  ---

    //  Events  ---
    IWordCloud.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IWordCloud;
}));
