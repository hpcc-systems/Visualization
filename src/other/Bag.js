"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.other_Bag = factory();
    }
}(this, function () {
    function SelectionBag() {
        this.items = {};
    }

    SelectionBag.prototype.clear = function () {
        for (var key in this.items) {
            this.items[key].element().classed("selected", false);
        }
        this.items = {};
    };

    SelectionBag.prototype.isEmpty = function() {
        for (var key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    };

    SelectionBag.prototype.append = function (item) {
        this.items[item._id] = item;
        item.element().classed("selected", true);
    };

    SelectionBag.prototype.remove = function (item) {
        this.items[item._id].element().classed("selected", false);
        delete this.items[item._id];
    };

    SelectionBag.prototype.isSelected = function(item) {
        return this.items[item._id];
    };

    SelectionBag.prototype.get = function () {
        var retVal = [];
        for (var key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    };

    SelectionBag.prototype.set = function (itemArray) {
        this.clear();
        itemArray.forEach(function (item, idx) {
            this.append(item);
        }, this);
    };

    SelectionBag.prototype.click = function (item, d3Event) {
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
    };

    return {
        Selection: SelectionBag,
        Navigation: null
    };
}));
