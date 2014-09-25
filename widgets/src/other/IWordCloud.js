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
        var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"].map(function (d) {
            return { label: d, weight: 10 + Math.random() * 45 };
        });
        this.data(words);
        return this;
    };

    //  Properties  ---

    //  Events  ---

    return IWordCloud;
}));
