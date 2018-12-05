import { event as d3Event } from "d3-selection";
import { HTMLWidget } from "./HTMLWidget";
import { d3SelectionType, Widget } from "./Widget";

import "../src/TitleBar.css";

//  Lite button for titlebar  ---
export class Button extends HTMLWidget {
    private _enabled = true;

    constructor() {
        super();
        this._tag = "a";
    }

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .attr("href", "#")
            .on("click", function () {
                context.click();
                d3Event.preventDefault();
            })
            .on("mousemove", this.mouseMove)
            .on("mouseout", this.mouseOut)
            .append("i")
            .attr("class", `fa ${this.faChar()} fa-lg fa-fw`)
            ;
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element
            .classed("disabled", !this.enabled())
            .attr("title", this.tooltip())
            ;
    }

    //  Events  ---
    click() {
    }

    mouseMove(d, idx, groups) {
    }

    mouseOut(d, idx, groups) {
    }

    enabled(): boolean;
    enabled(_: boolean): this;
    enabled(_?: boolean): boolean | this {
        if (!arguments.length) return this._enabled;
        this._enabled = _;
        return this;
    }
}
Button.prototype._class += " common_Button";
export interface Button {
    faChar(): string;
    faChar(_: string): this;
    tooltip(): string;
    tooltip(_: string): this;
}
Button.prototype.publish("faChar", "", "string");
Button.prototype.publish("tooltip", "", "string");

//  Sticky button  ---
export class StickyButton extends Button {

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element.classed("selected", this.selected());
    }
}
StickyButton.prototype._class += " common_StickyButton";
export interface StickyButton {
    selected(): boolean;
    selected(_: boolean): this;
}
StickyButton.prototype.publish("selected", false, "boolean");

//  Toggle button  ---
export class ToggleButton extends StickyButton {

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this
                .selected(!this.selected())
                .render()
                ;
            d3Event.preventDefault();
        });
        super.enter(domNode, element);
    }
}
ToggleButton.prototype._class += " common_ToggleButton";

//  Spacer  ---
export class Spacer extends HTMLWidget {

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        element
            .attr("class", this.vline() ? "spacer vline" : "spacer")
            .attr("href", "#")
            .append("i")
            ;
    }
}
Spacer.prototype._class += " common_Spacer";

export interface Spacer {
    vline(): boolean;
    vline(_: boolean): this;
}
Spacer.prototype.publish("vline", true, "boolean");

//  IconBar  ---
export class IconBar extends HTMLWidget {
    _divIconBar: d3SelectionType;
    _buttons: Widget[] = [];

    constructor() {
        super();
    }

    enter(domNode, element: d3SelectionType) {
        super.enter(domNode, element);
        this._divIconBar = element.append<HTMLElement>("div")
            .attr("class", "icon-bar")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        let buttons = this.buttons().filter(button => this.hiddenButtons().indexOf(button) < 0);
        buttons = buttons.reduce((prev, item, idx) => {
            if (item instanceof Spacer) {
                if ((prev.length === 0 || idx === buttons.length - 1)) {
                    return prev;
                } else if (buttons[idx + 1] instanceof Spacer) {
                    return prev;
                }
            }
            prev.push(item);
            return prev;
        }, []);
        const icons = this._divIconBar.selectAll(".icon-bar-item").data(buttons, (d: Widget) => d.id());
        icons.enter().append("div")
            .attr("class", "icon-bar-item")
            .each(function (this: HTMLElement, d: Widget) {
                d.target(this);
            })
            .merge(icons)
            .each(function (d: Widget) {
                d.render();
            })
            ;
        icons.exit()
            .each(function (d: Widget) {
                d.target(null);
            })
            .remove()
            ;
        icons.order();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
IconBar.prototype._class += " common_IconBar";

export interface IconBar {
    buttons(): Widget[];
    buttons(_: Widget[]): this;
    hiddenButtons(): Widget[];
    hiddenButtons(_: Widget[]): this;
}
IconBar.prototype.publish("buttons", [], "widgetArray", null, { internal: true });
IconBar.prototype.publish("hiddenButtons", [], "widgetArray", null, { internal: true });

//  SelectionBar  ---
export class SelectionButton extends StickyButton {
    _owner: SelectionBar;

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this.selected(true).render();
            d3Event.preventDefault();
        });
        super.enter(domNode, element);
    }

    selected(): boolean;
    selected(_: boolean): this;
    selected(_?: boolean): boolean | this {
        const retVal = super.selected.apply(this, arguments);
        if (_ && this._owner) {
            this._owner.buttons().filter(sb => sb !== this && sb instanceof SelectionButton).forEach((sb: SelectionButton) => sb.selected(false).render());
            this._owner.selected(this);
        }
        return retVal;
    }
}
SelectionButton.prototype._class += " common_SelectionButton";

export class SelectionBar extends IconBar {

    buttons(): Array<SelectionButton | Spacer>;
    buttons(_: Array<SelectionButton | Spacer>): this;
    buttons(_?: Array<SelectionButton | Spacer>): Array<SelectionButton | Spacer> | this {
        const retVal = super.buttons.apply(this, arguments);
        if (arguments.length) {
            _.filter(b => b instanceof SelectionButton).forEach((sb: SelectionButton) => {
                sb._owner = this;
            });
        }
        return retVal;
    }

    //  Events ---
    selected(row: SelectionButton) {
    }
}
SelectionBar.prototype._class += " common_SelectionBar";

//  Titlebar  ---
export class TitleBar extends IconBar {

    _divTitle: d3SelectionType;
    _divTitleIcon: d3SelectionType;
    _divTitleText: d3SelectionType;

    constructor() {
        super();
    }

    enter(domNode, element: d3SelectionType) {
        this._divTitle = element.append<HTMLElement>("div")
            .attr("class", "title-title")
            ;
        this._divTitleIcon = this._divTitle.append<HTMLElement>("div")
            .attr("class", "title-icon")
            .style("font-family", this.titleIconFont())
            .style("font-size", `${this.titleIconFontSize()}px`)
            .style("width", `${this.titleIconFontSize()}px`)
            ;
        this._divTitle.append<HTMLElement>("div")
            .attr("class", "data-count")
            ;
        this._divTitleText = this._divTitle.append<HTMLElement>("div")
            .attr("class", "title-text")
            .style("font-family", this.titleFont())
            .style("font-size", `${this.titleFontSize()}px`)
            ;

        super.enter(domNode, element);
    }

    update(domNode, element) {
        this._divTitleIcon
            .text(this.titleIcon())
            .style("display", this.titleIcon() !== "" ? "inline-block" : "none")
            ;
        this._divTitleText.text(this.title());

        super.update(domNode, element);
    }
}
TitleBar.prototype._class += " common_TitleBar";

export interface TitleBar {
    title(): string;
    title(_: string): this;
    titleIcon(): string;
    titleIcon(_: string): this;
    titleIconFont(): string;
    titleIconFont(_: string): this;
    titleFont(): string;
    titleFont(_: string): this;
    titleIconFontSize(): number;
    titleIconFontSize(_: number): this;
    titleFontSize(): number;
    titleFontSize(_: number): this;
}
TitleBar.prototype.publish("title", "", "string");
TitleBar.prototype.publish("titleIcon", "", "string");
TitleBar.prototype.publish("titleIconFont", "", "string");
TitleBar.prototype.publish("titleIconFontSize", 28, "number");
TitleBar.prototype.publish("titleFont", "", "string");
TitleBar.prototype.publish("titleFontSize", 20, "number");
