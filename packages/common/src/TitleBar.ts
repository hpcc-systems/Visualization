import { event as d3Event } from "d3-selection";
import { HTMLWidget } from "./HTMLWidget";
import { d3SelectionType, Widget } from "./Widget";

import "../src/TitleBar.css";

//  Lite button for titlebar  ---
export class Button extends HTMLWidget {
    private _icon: string;
    private _tooltip: string;

    constructor(icon: string, tooltip?: string) {
        super();
        this._tag = "a";
        this._icon = icon;
        this._tooltip = tooltip;
    }

    icon() {
        return this._icon;
    }

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .attr("href", "#")
            .attr("title", this._tooltip)
            .on("click", function () {
                context.click();
                d3Event.preventDefault();
            })
            .on("mousemove", this.mouseMove)
            .on("mouseout", this.mouseOut)
            .append("i")
            .attr("class", `fa ${this._icon} fa-lg fa-fw`)
            ;
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element.classed("disabled", !this.enabled());
    }

    //  Events  ---
    click() {
    }

    mouseMove(d, idx, groups) {
    }

    mouseOut(d, idx, groups) {
    }

    enabled() {
        return true;
    }
}
Button.prototype._class += " common_Button";

//  Toggle button  ---
export class ToggleButton extends Button {

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this.selected(!this.selected());
            this.render();
            d3Event.preventDefault();
        });
        super.enter(domNode, element);
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element.classed("selected", this.selected());
    }
}
ToggleButton.prototype._class += " common_ToggleButton";
export interface ToggleButton {
    selected(): boolean;
    selected(_: boolean): this;
}
ToggleButton.prototype.publish("selected", false, "boolean");

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

        const icons = this._divIconBar.selectAll(".icon-bar-item").data(this.buttons(), (d: Widget) => d.id());
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
}
IconBar.prototype.publish("buttons", [], "widgetArray", null, { internal: true });

//  Titlebar  ---
export class TitleBar extends IconBar {

    _div: d3SelectionType;
    _divTitleIcon: d3SelectionType;
    _divTitleText: d3SelectionType;

    constructor() {
        super();
    }

    enter(domNode, element: d3SelectionType) {
        this._div = element.append("div");
        this._divTitleIcon = this._div.append<HTMLElement>("div")
            .attr("class", "title-icon")
            .style("font-family", this.titleIconFont())
            .style("font-size", `${this.titleIconFontSize()}px`)
            .style("width", `${this.titleIconFontSize()}px`)
            ;
        this._div.append<HTMLElement>("div")
            .attr("class", "data-count")
            ;
        this._divTitleText = this._div.append<HTMLElement>("div")
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
