import { d3SelectionType, HTMLWidget, Widget } from "@hpcc-js/common";

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
        element
            .attr("href", "#")
            .attr("title", this._tooltip)
            .on("click", this.click)
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
    click(d, idx, groups) {
    }

    mouseMove(d, idx, groups) {
    }

    mouseOut(d, idx, groups) {
    }

    enabled() {
        return true;
    }
}
Button.prototype._class += " layout_Button";

//  Toggle button  ---
export class ToggleButton extends Button {

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this.selected(!this.selected());
            this.render();
        });
        super.enter(domNode, element);
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element.classed("selected", this.selected());
    }
}
ToggleButton.prototype._class += " layout_ToggleButton";
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
            .attr("class", "spacer")
            .attr("href", "#")
            .append("i")
            ;
    }
}
Spacer.prototype._class += " layout_Spacer";

//  Titlebar  ---
export class TitleBar extends HTMLWidget {
    _divMain: d3SelectionType;
    _divIconBar: d3SelectionType;
    _divTitleIcon: d3SelectionType;
    _divTitleText: d3SelectionType;
    _buttons: Widget[] = [];

    constructor() {
        super();
    }

    enter(domNode, element: d3SelectionType) {
        super.enter(domNode, element);
        this._divTitleIcon = element.append<HTMLElement>("div")
            .attr("class", "title-icon")
            .style("font-family", this.titleIconFont())
            .style("font-size", `${this.titleIconFontSize()}px`)
            .style("width", `${this.titleIconFontSize()}px`)
            ;
        element.append<HTMLElement>("div")
            .attr("class", "data-count")
            ;
        this._divTitleText = element.append<HTMLElement>("div")
            .attr("class", "title-text")
            .style("font-family", this.titleFont())
            .style("font-size", `${this.titleFontSize()}px`)
            ;
        this._divIconBar = element.append<HTMLElement>("div")
            .attr("class", "icon-bar")
            ;
    }

    buttons(): Widget[];
    buttons(_: Widget[]): this;
    buttons(_?: Widget[]): this | Widget[] {
        if (!arguments.length) return this._buttons;
        this._buttons = _;
        return this;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._divTitleIcon
            .text(this.titleIcon())
            .style("display", this.titleIcon() !== "" ? "inline-block" : "none")
            ;
        this._divTitleText.text(this.title());

        const icons = this._divIconBar.selectAll(".icon-bar-item").data(this.buttons());
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
}
TitleBar.prototype._class += " layout_TitleBar";

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
TitleBar.prototype.publish("buttons", [], "widgetArray", null, { internal: true });
