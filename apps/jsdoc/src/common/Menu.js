/**
 * @file Menu Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./SVGWidget", "./IMenu", "./Icon", "./List", "css!./Menu"], factory);
    } else {
        root.common_Menu = factory(root.d3, root.common_SVGWidget, root.common_IMenu, root.common_Icon, root.common_List);
    }
}(this, function (d3, SVGWidget, IMenu, Icon, List) {
    /**
     * @class common_Menu
     * @extends common_SVGWidget
     */
    function Menu() {
        SVGWidget.call(this);
        IMenu.call(this);

        /**
         * Font Awesome widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Menu
         * @private
         */
        this._icon = new Icon()
            .shape("square")
            .diameter(14)
        ;
        /**
         * Font Awesome widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Menu
         * @private
         */
        this._list = new List();

        var context = this;
        /**
         * (event) Overridable click callback function for the menu items (list).
         * @method click
         * @memberof common_Menu
         * @param {type} d
         */
        this._list.click = function (d) {
            d3.event.stopPropagation();
            context.hideMenu();
            context.click(d);
        };
        this._visible = false;
    }
    Menu.prototype = Object.create(SVGWidget.prototype);
    Menu.prototype.constructor = Menu;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_Menu
     * @private
     */
    Menu.prototype._class += " common_Menu";
    Menu.prototype.implements(IMenu.prototype);

    Menu.prototype.publishProxy("faChar", "_icon", null, "\uf0c9");
    Menu.prototype.publishProxy("paddingPercent", "_icon", null, 10);
    /**
     * Toggles Menu Visability
     * @method toggleMenu
     * @public
     * @memberof common_Menu
     * @instance
     */
    Menu.prototype.toggleMenu = function () {
        if (!this._visible) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    };

    /**
     * Show menu.
     * @method showMenu
     * @public
     * @memberof common_Menu
     * @instance
     */
    Menu.prototype.showMenu = function () {
        this.preShowMenu();
        this._visible = true;
        this._list
            .data(this._data)
            .render()
        ;

        var bbox = this._icon.getBBox(true);
        var menuBBox = this._list.getBBox(true);
        var pos = {
            x: bbox.width / 2 - menuBBox.width / 2,
            y: bbox.height / 2 + menuBBox.height / 2
        };
        this._list
            .move(pos)
        ;
        var context = this;
        d3.select("body")
            .on("click." + this._id, function () {
                console.log("click:  body - " + context._id);
                if (context._visible) {
                    context.hideMenu();
                }
            })
        ;
    };

    /**
     * Hides menu.
     * @method hideMenu
     * @public
     * @memberof common_Menu
     * @instance
     */
    Menu.prototype.hideMenu = function () {
        d3.select("body")
            .on("click." + this._id, null)
        ;
        this._visible = false;
        this._list
            .data([])
            .render()
        ;
        this.postHideMenu();
    };

    /**
     * Override normal testData function.
     * @method testData
     * @public
     * @memberof common_Menu
     * @instance
     */
    Menu.prototype.testData = function () {
        this
            .data(["Menu A", "And B", "a longer C"])
        ;
        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_Menu
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Menu.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._icon
            .target(domNode)
            .render()
        ;

        this._list
            .target(domNode)
            .render()
        ;

        var context = this;
        this._icon.element()
            .on("click", function (d) {
                d3.event.stopPropagation();
                context.toggleMenu();
            })
        ;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Menu
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Menu.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        element
            .classed("disabled", this._data.length === 0)
        ;

        this._icon
            .faChar(this.faChar())
            .paddingPercent(this.paddingPercent())
            .render()
        ;
    };

    return Menu;
}));
