/**
 * @file Tree/Hierarchy Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.api_ITree = factory(root.common_Palette);
    }
}(this, function (Palette) {
    /**
     * @interface api_ITree
     * @class api_ITree
     */
    function ITree() {
    }
    /**
     * Instance of a HPCC VIZ Palette object.
     * @member {Object} _palette
     * @memberof api_ITree
     * @private
     */
    ITree.prototype._palette = Palette.ordinal("default");

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof api_ITree
     * @instance
     * @returns {Widget}
     */
    ITree.prototype.testData = function () {
        var data = {label: "root", children: [{
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
                label: "BB"
            }]
        }]};
        this.data(data);
        return this;
    };

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof api_ITree
     * @param {type} row
     * @param {type} column
     */
    ITree.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return ITree;
}));
