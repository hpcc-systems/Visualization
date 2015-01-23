(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Icon", "./IMenu", "./List", "css!./Menu"], factory);
    } else {
        root.Entity = factory(root.Icon, root.IMenu, root.List);
    }
}(this, function (Icon, IMenu, List) {
    function Menu() {
        Icon.call(this);
        IMenu.call(this);
        this._class = "common_Menu";

        this._shape
            .shape("rect")
        ;
        this._list = new List();
        this.padding(0);

        var context = this;
        this._list.click = function (d) {
            d3.event.stopPropagation();
            context.hideMenu();
            context.click(d);
        };
        this._visible = false;
    };
    Menu.prototype = Object.create(Icon.prototype);
    Menu.prototype.implements(IMenu.prototype);

    Menu.prototype.toggleMenu = function () {
        if (!this._visible) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    };

    Menu.prototype.showMenu = function () {
        this.preShowMenu();
        this._visible = true;
        this._list
            .data(this._data)
            .render()
        ;

        var bbox = this._shape.getBBox(true);
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
                console.log("click:  body - " + context._id)
                if (context._visible) {
                    context.hideMenu();
                }
            })
        ;
    };

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

    Menu.prototype.testData = function () {
        this
            .faChar("\uf0c9 Menu")
            .data(["Menu A", "And B", "a longer C"])
        ;
        return this;
    }

    Menu.prototype.enter = function (domNode, element) {
        Icon.prototype.enter.apply(this, arguments);

        this._list
            .target(domNode)
            .render()
        ;

        var context = this;
        this._faChar.element()
            .on("click", function (d) {
                d3.event.stopPropagation();
                context.toggleMenu();
            })
        ;
    };

    Menu.prototype.update = function (domNode, element) {
        Icon.prototype.update.apply(this, arguments);
        element
            .classed("disabled", this._data.length === 0)
        ;
    };

    return Menu;
}));
