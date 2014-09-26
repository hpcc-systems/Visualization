(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.ITree = factory();
    }
}(this, function () {
    function ITree() {
    };

    //  Data ---
    ITree.prototype.testData = function () {
        var data = [{
            label: "A",
            children: [{
                label: "AA",
                children: [{
                    label: "AAA"
                }]
            }, {
                label: "AB",
                children: [{
                    label: "ABA"
                }]
            }]
        }, {
            label: "B",
            children: [{
                label: "BA",
                children: [{
                    label: "BAA"
                }]
            }, {
                label: "BB",
                children: [{
                    label: "BBA"
                }]
            }]
        }];
        this.data(data);
        return this;
    };

    //  Properties  ---

    //  Events  ---
    ITree.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return ITree;
}));
