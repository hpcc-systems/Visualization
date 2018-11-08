import { Entity, HTMLWidget } from "@hpcc-js/common";
import { HorizontalList, VerticalList } from "@hpcc-js/layout";
import { select as d3Select } from "d3-selection";
import { Html } from "./Html";

import "../src/IconList.css";

export class IconList extends HTMLWidget {
    protected _list;
    protected _entity_list = [];
    protected _content_list = [];
    constructor() {
        super();
        this._list = new HorizontalList()
            .orientation_default("horizontal")
            .flexWrap_default("nowrap")
            ;
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .style("height", "100%")
            .style("width", "100%")
            ;
        d3Select(domNode.parentElement)
            .style("height", "100%")
            .style("width", "100%")
            ;
        this._list.target(domNode);
    }
    update(domNode, element) {
        super.update(domNode, element);
        const listWidgets = this._list.widgets();
        this.data().forEach((row, idx) => {
            if (!listWidgets[idx]) {
                listWidgets[idx] = this.updateListProperties(new VerticalList(), idx)
                    .widgets([
                        this.updateEntityProperties(new Entity(), idx),
                        new Html().html(this.data()[idx][this.htmlColumnIndex_exists() ? this.htmlColumnIndex() : 1])
                    ]);
            } else {
                listWidgets[idx] = this.updateListProperties(listWidgets[idx], idx);
                this.updateEntityProperties(listWidgets[idx].widgets()[0], idx);
                listWidgets[idx]
                    .widgets()[1]
                    .html(this.data()[idx][this.htmlColumnIndex_exists() ? this.htmlColumnIndex() : 1])
                    ;
            }
        });
        this._list.widgets(listWidgets.slice(0, this.data().length));
        this._list.resize().render();
    }
    updateListProperties(list, idx) {
        return list
            .disableScroll(true)
            .widgetsFlexBasis([this.iconSize() + "px", `calc(100% - ${this.iconSize()}px)`])
            ;
    }
    updateEntityProperties(entity, idx) {
        return entity
            .icon(this.iconColumnIndex_exists() ? this.data()[idx][this.iconColumnIndex()] : "?")
            .iconColor(this.iconColorColumnIndex_exists() ? this.data()[idx][this.iconColorColumnIndex()] : "#000")
            .iconDiameter(this.iconSize())
            .iconPaddingPercent(0)
            ;
    }
}
IconList.prototype._class += " other_IconList";

export interface IconList {
    iconSize(): number;
    iconSize(_: number): this;
    iconColumnIndex(): number;
    iconColumnIndex(_: number): this;
    iconColumnIndex_exists(): boolean;
    iconColorColumnIndex(): number;
    iconColorColumnIndex(_: number): this;
    iconColorColumnIndex_exists(): boolean;
    htmlColumnIndex(): number;
    htmlColumnIndex(_: number): this;
    htmlColumnIndex_exists(): boolean;
}
IconList.prototype.publish("iconSize", 72, "number", "Size of icon (pixels)");
IconList.prototype.publish("iconColumnIndex", 0, "number", "Index of column containing icon character");
IconList.prototype.publish("iconColorColumnIndex", 1, "number", "Index of column containing icon color");
IconList.prototype.publish("htmlColumnIndex", 2, "number", "Index of column containing html string");
