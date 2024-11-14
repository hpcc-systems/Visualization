import { HTMLWidget } from "@hpcc-js/common";
import { JSXWidget } from "./JSXWidget.ts";

import "../src/TitleBar.css";

export interface IClickHandler {
    titleBarClick(src: Item, d, idx: number, groups): void;
}

export class Item extends HTMLWidget {
    protected _owner: IClickHandler;

    constructor(owner: IClickHandler) {
        super();
        this._owner = owner;
        this._tag = "a";
    }
}
Item.prototype._class += " html_Item";

export class Button extends Item {
    private _icon: string;

    constructor(owner: IClickHandler, icon: string) {
        super(owner);
        this._icon = icon;
    }

    icon() {
        return this._icon;
    }

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        element
            .attr("href", "#")
            .on("click", (d, idx, groups) => this._owner.titleBarClick(this, d, idx, groups))
            .append("i")
            .attr("class", `fa ${this._icon} fa-lg fa-fw`)
            ;
    }
}
Button.prototype._class += " html_Button";

export class ToggleButton extends Button {

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this.selected(!this.selected());
            this.render();
        });
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._element.classed("selected", this.selected());
    }
}
ToggleButton.prototype._class += " html_ToggleButton";
export interface ToggleButton {
    selected(): boolean;
    selected(_: boolean): this;
}
ToggleButton.prototype.publish("selected", false, "boolean");

export class Spacer extends Item {

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .attr("class", "spacer")
            .attr("href", "#")
            .append("i")
            ;
    }
}
Spacer.prototype._class += " html_Spacer";

export class TitleBar extends JSXWidget {
    protected _divMain;
    protected _divIconBar;
    protected _divTitle;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._divMain = element.append("div")
            .attr("class", "main")
            ;
        this._divIconBar = this._divMain.append("div")
            .attr("class", "icon-bar")
            ;
        this._divTitle = this._divMain.append("div")
            .attr("class", "title")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._divTitle.text(this.title());

        const icons = this._divIconBar.selectAll(".icon-bar-item").data(this.buttons());
        icons.enter().append("div")
            .attr("class", "icon-bar-item")
            .each(function (this: HTMLElement, d: Item) {
                d.target(this);
            })
            .merge(icons)
            .each(function (d: Item) {
                d.render();
            })
            ;
        icons.exit()
            .each(function (d: Item) {
                d.target(null);
            })
            .remove()
            ;
        icons.order();
    }
}
TitleBar.prototype._class += " html_TitleBar";

export interface TitleBar {
    title(): string;
    title(_: string): this;
    buttons(): Item[];
    buttons(items: Item[]): this;
}
TitleBar.prototype.publish("title", "", "string");
TitleBar.prototype.publish("buttons", [], "widgetArray");
