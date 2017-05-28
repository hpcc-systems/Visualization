import { event as d3Event, select as d3Select } from "d3-selection";
import { Icon } from "./Icon";
import { IMenu } from "./IMenu";
import { List } from "./List";
import { SVGWidget } from "./SVGWidget";

import "../src/Menu.css";

export class Menu extends SVGWidget implements IMenu {
    protected _icon = new Icon().shape("square").diameter(14).paddingPercent(0);
    protected _list = new List();
    protected _open;

    constructor() {
        super();

        const context = this;
        this._list.click = function (d) {
            d3Event.stopPropagation();
            context.hideMenu();
            context.click(d);
        };
        this._open = false;
    }

    toggleMenu() {
        if (!this._open) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    }

    showMenu() {
        this.preShowMenu();
        this._open = true;
        this._list
            .data(this.data())
            .render()
            ;

        const bbox = this._icon.getBBox(true);
        const menuBBox = this._list.getBBox(true);
        const pos = {
            x: bbox.width / 2 - menuBBox.width / 2,
            y: bbox.height / 2 + menuBBox.height / 2
        };
        this._list
            .move(pos)
            ;
        const context = this;
        d3Select("body")
            .on("click." + this._id, function () {
                console.log("click:  body - " + context._id);
                if (context._open) {
                    context.hideMenu();
                }
            })
            ;
    }

    hideMenu() {
        d3Select("body")
            .on("click." + this._id, null)
            ;
        this._open = false;
        this._list
            .data([])
            .render()
            ;
        this.postHideMenu();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._icon
            .target(domNode)
            .render()
            ;

        this._list
            .target(domNode)
            .render()
            ;

        const context = this;
        this._icon.element()
            .on("click", function () {
                d3Event.stopPropagation();
                context.toggleMenu();
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        element
            .classed("disabled", this.data().length === 0)
            ;

        this._icon
            .faChar(this.faChar())
            .paddingPercent(this.paddingPercent())
            .render()
            ;
    }

    exit(domNode, element) {
        this._icon
            .target(null)
            ;

        this._list
            .target(null)
            ;

        super.exit(domNode, element);
    }

    //  Events  ---
    click(d) {
        console.log("Click:  " + d);
    }
    preShowMenu() {
        console.log("preShowMenu");
    }
    postHideMenu() {
        console.log("postHideMenu");
    }

    faChar: { (): string; (_: string): Menu; };
    paddingPercent: { (): number; (_: number): Menu; };
}
Menu.prototype._class += " common_Menu";

Menu.prototype.publishProxy("faChar", "_icon", null, "\uf0c9");
Menu.prototype.publishProxy("paddingPercent", "_icon", null, 10);
