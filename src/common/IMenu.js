/**
 * @file Menu Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_IMenu = factory();
    }
}(this, function () {
    /**
     * @interface common_IMenu
     * @class common_IMenu
     *
     */
    function IMenu() {
    }

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof common_IMenu
     * @instance
     * @returns {Widget}
     */
    IMenu.prototype.testData = function () {
        var data = ["This", "is a", "list", "of some text."];
        this.data(data);
        return this;
    };

    /**
     * Overridable click callback function.
     * @method click
     * @memberof common_IMenu
     * @param {type} row
     * @param {type} column
     */
    IMenu.prototype.click = function (d) {
        console.log("Click:  " + d);
    };
    /**
     * Overridable function that is fired before menu is shown.
     * @method preShowMenu
     * @memberof common_IMenu
     * @param {type} d
     */
    IMenu.prototype.preShowMenu = function (d) {
        console.log("preShowMenu");
    };
    /**
     * Overridable function that is fired after menu is hidden.
     * @method postHideMenu
     * @memberof common_IMenu
     * @param {type} d
     */
    IMenu.prototype.postHideMenu = function (d) {
        console.log("postHideMenu");
    };

    return IMenu;
}));
