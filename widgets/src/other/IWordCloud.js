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
            return { text: d, size: 10 + Math.random() * 90 };
        });
        this.words(words);
        return this;
    };

    //  Properties  ---

    //  Events  ---

    return IWordCloud;
}));
