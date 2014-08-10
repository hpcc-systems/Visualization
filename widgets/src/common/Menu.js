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

        this._class = "menu";

        this._shape
            .shape("rect")
        ;
        this._list = new List();

        var context = this;
        d3.select("body")
            .on("click." + this._id, function () {
                console.log("click:  body - " + context._id)
                if (context._visible) {
                    context.hideMenu();
                }
            })
        ;
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
        this._visible = true;
        this._list
            .data(this._data)
            .render()
        ;

        var bbox = this._shape.getBBox(true);
        var menuBBox = this._list.getBBox(true);
        var pos = {x: this.fontSize() / 2, y: 0};
        pos.x += bbox.width / 2 - menuBBox.width / 2;
        pos.y += bbox.height / 2 + menuBBox.height / 2;

        this._list
            .pos(pos)
        ;
    };

    Menu.prototype.hideMenu = function () {
        this._visible = false;
        this._list
            .data([])
            .render()
        ;
    };

    Menu.prototype.enter = function (domNode, element) {
        Icon.prototype.enter.call(this, domNode, element);

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
        Icon.prototype.update.call(this, domNode, element);
    };

    return Menu;
}));
