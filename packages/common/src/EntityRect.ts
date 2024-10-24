import { local as d3Local, select as d3Select } from "d3-selection";
import { Entity } from "./Entity.ts";
import { HTMLWidget } from "./HTMLWidget.ts";
import * as Utility from "./Utility.ts";
import { InputField } from "./Widget.ts";

import "../src/EntityRect.css";

export class EntityRect extends Entity {
    protected _element_textbox;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
    }
    update(domNode, element) {
        this._desc_widget.text("");
        super.update(domNode, element);
    }
    render(callback?: (w: EntityRect) => void) {
        return super.render((w: EntityRect) => {
            const icon_bbox = w.icon() === "" ? { width: 0, height: 0 } : this._icon_widget.getBBox(true);
            const title_bbox = this._title_widget.getBBox(true);
            const annotations_bbox = this.getAnnotationsBBox();

            let width = this.fixedWidth();
            if (!width) {
                width = icon_bbox.width + title_bbox.width + annotations_bbox.width + this.padding() * 4;
            }

            let height = this.fixedHeight();
            if (!height) {
                height = Math.max(icon_bbox.height, title_bbox.height, annotations_bbox.height) + this.padding() * 2;
            }

            this._background_widget
                .width(width)
                .height(height)
                .render()
                ;

            this._icon_widget.move({
                x: -(width / 2) + (icon_bbox.width),
                y: 0
            });

            this.moveAnnotations(width / 2, -annotations_bbox.height / 2);
            const iconWidth = icon_bbox.width > 0 ? icon_bbox.width + this.padding() : 0;
            const titleX = -(width / 2) + iconWidth + this.padding();
            const annoWidth = this.padding() / 2 + annotations_bbox.width + this.padding();
            const titleW = width - iconWidth - annoWidth;

            this._title_widget
                .move({
                    x: titleX,
                    y: 0
                })
                .anchor("start")
                .width(titleW)
                .render()
                ;

            if (callback) {
                callback(w);
            }
        });
    }
}
EntityRect.prototype._class += " common_EntityRect";

export interface EntityRect {
    fixedWidth(): number;
    fixedWidth(_: number): this;
    fixedHeight(): number;
    fixedHeight(_: number): this;
}

EntityRect.prototype.publish("fixedWidth", null, "number", "fixedWidth");
EntityRect.prototype.publish("fixedHeight", null, "number", "fixedHeight");

export class EntityRectList extends HTMLWidget {
    static __inputs: InputField[] = [{
        id: "borderColor",
        type: "string"
    }, {
        id: "icon",
        type: "string"
    }, {
        id: "iconColor",
        type: "string"
    }, {
        id: "title",
        type: "string"
    }];

    private _enityRectLocal = d3Local<EntityRect>();

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this, true);
    }

    entityRectData() {
        const columns = this.columns();
        const idxColumns = [
            "backgroundColor",
            "borderColor",
            "icon",
            "iconColor",
            "title",
            "titleColor",
            "description",
            "descriptionColor"
        ];
        const idxs = idxColumns.map(idxColumn => columns.indexOf(this[`${idxColumn}Column`]()));
        return this.data().map(row => {
            const retVal = {
                origRow: row
            };
            for (let i = 0; i < idxColumns.length; ++i) {
                retVal[idxColumns[i]] = idxs[i] >= 0 ? row[idxs[i]] : typeof this[`${idxColumns[i]}`] === "function" ? this[`${idxColumns[i]}`]() : "";
            }
            return retVal;
        }, this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        d3Select(domNode.parentNode)
            .style("overflow-x", "hidden")
            .style("overflow-y", "scroll")
            ;
        this._selection.widgetElement(element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;

        const margin = { left: 8, top: 8, right: 8, bottom: 8 };
        const width = this.width() - margin.left - margin.right - 20; //  -20 for VScroll (could do better)
        const height = this.fixedHeight() - margin.top - margin.bottom;

        const svg = element.selectAll("svg").data(this.entityRectData());
        svg.enter().append("svg")
            .attr("class", "entityRectItem")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .each(function () {
                const entityRect = new EntityRect()
                    .target(this)
                    ;
                context._enityRectLocal.set(this, entityRect);
            })
            .merge(svg)
            .style("border-color", d => d.borderColor)
            .each(function (d) {
                context._enityRectLocal.get(this)
                    .pos({ x: width / 2, y: height / 2 })
                    .resize({ width, height })
                    .fixedWidth(width)
                    .fixedHeight(height)
                    .backgroundShape("rect")
                    .backgroundColorFill(d.backgroundColor)
                    .backgroundColorStroke("none")
                    .icon(d.icon)
                    .iconColor(d.iconColor)
                    .iconDiameter(height / 2.6666)
                    .iconPaddingPercent(0)
                    .title(d.title)
                    .titleFontSize(height / 2.6666)
                    .titleColor(d.titleColor)
                    .description(d.description)
                    .descriptionColor(d.descriptionColor)
                    .render()
                    ;
            })
            ;
        svg.exit().remove();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    //  Events ---
    click(row, column, selected) {
        // console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    dblclick(row, column, selected) {
        // console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    //  SimpleSelectionMixin
    _selection;
}
EntityRectList.prototype._class += " common_EntityRectList";

export interface EntityRectList {
    fixedHeight(): number;
    fixedHeight(_: number): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    backgroundColorColumn(): string;
    backgroundColorColumn(_: string): this;
    borderColor(): string;
    borderColor(_: string): this;
    borderColorColumn(): string;
    borderColorColumn(_: string): this;
    icon(): string;
    icon(_: string): this;
    iconColumn(): string;
    iconColumn(_: string): this;
    iconColor(): string;
    iconColor(_: string): this;
    iconColorColumn(): string;
    iconColorColumn(_: string): this;
    titleColumn(): string;
    titleColumn(_: string): this;
    titleColor(): string;
    titleColor(_: string): this;
    titleColorColumn(): string;
    titleColorColumn(_: string): this;
    descriptionColumn(): string;
    descriptionColumn(_: string): this;
    descriptionColor(): string;
    descriptionColor(_: string): this;
    descriptionColorColumn(): string;
    descriptionColorColumn(_: string): this;
}

EntityRectList.prototype.publish("fixedHeight", 64, "number", "fixedHeight");
EntityRectList.prototype.publish("backgroundColor", "#f8f8f8", "string", "Default Background Color", null, { inputType: "html-color" });
EntityRectList.prototype.publish("backgroundColorColumn", null, "set", "Background Color Column", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("borderColor", "black", "string", "Default Border Color", null, { inputType: "html-color" });
EntityRectList.prototype.publish("borderColorColumn", null, "set", "Border Color Column", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("icon", "", "string", "Icon");
EntityRectList.prototype.publish("iconColumn", null, "set", "Icon Column", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("iconColor", "red", "string", "Default Icon Color", null, { inputType: "html-color" });
EntityRectList.prototype.publish("iconColorColumn", null, "set", "Icon Color Column ", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("titleColumn", null, "set", "Title Column", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("titleColor", "black", "string", "Default Title Color", null, { inputType: "html-color" });
EntityRectList.prototype.publish("titleColorColumn", null, "set", "Title Color Column ", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("descriptionColumn", null, "set", "Description Column", function () { return this.columns(); }, { optional: true });
EntityRectList.prototype.publish("descriptionColor", "black", "string", "Default Description Color", null, { inputType: "html-color" });
EntityRectList.prototype.publish("descriptionColorColumn", null, "set", "Description Color Column ", function () { return this.columns(); }, { optional: true });

