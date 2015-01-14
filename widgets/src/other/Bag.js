(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.Entity = factory();
    }
}(this, function () {
    function SelectionBag() {
        this.items = {};
    };

    SelectionBag.prototype = {
        clear: function () {
            for (var key in this.items) {
                this.items[key].element().classed("selected", false);
            }
            this.items = {};
        },
        append: function (item) {
            this.items[item._id] = item;
            item.element().classed("selected", true);
        },
        remove: function (item) {
            this.items[item._id].element().classed("selected", false);
            delete this.items[item._id];
        },
        get: function () {
            var retVal = [];
            for (var key in this.items) {
                retVal.push(this.items[key]);
            }
            return retVal;
        },
        set: function (itemArray) {
            this.clear();
            itemArray.forEach(function (item, idx) {
                this.append(item);
            }, this);
        },
        click: function (item, d3Event) {
            if (d3Event.ctrlKey) {
                if (this.items[item._id]) {
                    this.remove(item);
                } else {
                    this.append(item);
                }
            } else {
                this.clear();
                this.append(item);
            }
        }
    };

    return {
        Selection: SelectionBag,
        Navigation: null
    };
}));
