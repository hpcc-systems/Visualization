"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3"], factory);
    } else {
        root.other_Bag = factory(root.d3);
    }
}(this, function (d3) {
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
        return this.items[item._id] !== undefined;
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

    function SimpleSelection(widgetElement) {
        this._widgetElement = widgetElement;
    }
    SimpleSelection.prototype.enter = function (elements, idx) {
        var context = this;
        elements
            .on("click.SimpleSelection", function (d, idx) {
                var element = d3.select(this);
                var wasSelected = element.classed("selected");
                context._widgetElement.selectAll(".selected")
                    .classed("selected", null)
                ;
                if (!wasSelected) {
                    element.classed("selected", true);
                }
            })
            .on("mouseover.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", true)
                ;
            })
            .on("mouseout.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", null)
                ;
            })
        ;
    };
    SimpleSelection.prototype.selected = function (domNode) {
        return d3.select(domNode).classed("selected");
    };

    return {
        Selection: SelectionBag,
        SimpleSelection: SimpleSelection,
        Navigation: null
    };
}));
