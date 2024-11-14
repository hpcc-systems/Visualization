import { HTMLWidget, Palette, Platform, select as d3Select, Utility, } from "@hpcc-js/common";
import { max as d3Max } from "d3-array";
import { hierarchy as d3Hierarchy } from "d3-hierarchy";

interface DirectoryItem {
    color?: string;
    iconClass?: string;
    label: string;
    depth: number;
    content?: string;
    markers?: any;
    isFolder: boolean;
    bold?: boolean;
    selected?: boolean;
    weightValue?: string;
    weightColor?: string;
}

export class DirectoryTree extends HTMLWidget {

    constructor() {
        super();
    }

    flattenData(json): DirectoryItem[] {
        const context = this;
        const root = d3Hierarchy(json);
        const ret = [];

        if (!this.omitRoot()) {
            visitNode(root);
        } else if (root.children) {
            root.children.forEach(visitNode);
        }

        return ret;

        function visitNode(node) {
            const weightValue = node.data.markers && node.data.markers.length ? node.data.markers.length : "";
            ret.push({
                label: node.data.label,
                depth: node.depth - (context.omitRoot() ? 1 : 0),
                content: node.data.content,
                isFolder: !!node.data.children,
                iconClass: node.data.iconClass,
                color: node.data.color,
                bold: node.data.bold,
                weightValue,
                markers: node.data.markers,
                selected: node.data.selected
            });
            if (node.children) {
                node.children.forEach(visitNode);
            }
        }
    }

    protected iconClass(d) {
        if (d.label === "error") {
            return "fa fa-exclamation";
        }
        if (d.isFolder) {
            return this.folderIconOpen();
        }
        return this.textFileIcon();
    }

    protected calcRequiredWidth() {
        const flatData = this.flattenData(this.data());

        let widest = 0;

        const padding = this.rowItemPadding();
        const iconWidth = this.iconSize() + (padding * 2);
        const scrollbarWidth = Platform.getScrollbarWidth();

        flatData.forEach(row => {
            const offsetWidth = (row.depth * iconWidth) + (padding * 2);
            const textWidth = Utility.textSize(
                row.label,
                this.fontFamily(),
                this.fontSize(),
                !!row.bold
            ).width + (padding * 2);
            const totalWidth = textWidth + iconWidth + offsetWidth + scrollbarWidth;
            if (widest < totalWidth) {
                widest = totalWidth;
            }
        });
        return widest;
    }

    rowClick(str, markers) { }

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .style("width", "100%")
            .style("height", "100%")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());

        element
            .style("overflow-y", this.verticalScroll() ? "scroll" : null)
            ;
        const flatData = this.flattenData(this.data());
        const maxWeightValue = d3Max(flatData, n => Number(n.weightValue));

        flatData.forEach(d => {
            if (!d.weightValue) {
                d.weightColor = "transparent";
            } else {
                d.weightColor = this._palette(d.weightValue, 1, maxWeightValue);
            }
        });
        const context = this;
        const padding = this.rowItemPadding();
        const iconWidth = this.iconSize() + padding;
        const lineHeight = Math.max(context.iconSize(), context.fontSize());
        const rowSelection = element.selectAll(".directory-row").data(flatData);
        const fontFamily = this.fontFamily();
        const fontSize = this.fontSize();
        const maxWeightWidth = d3Max(flatData, d => this.textSize(d.weightValue, fontFamily, fontSize).width);
        const rowItemPadding = `${padding}px ${padding}px ${padding / 2}px ${padding}px`;

        const rowEnter = rowSelection.enter().append("div")
            .attr("class", d => `directory-row directory-row-depth-${d.depth}`)
            .style("display", "flex")
            .style("cursor", "pointer")
            .each(function (d: DirectoryItem) {
                const rowDiv = d3Select(this);

                const fontColor = d.color ? d.color : context.fontColor();
                const weightColor = d.weightColor ? d.weightColor : "transparent";
                const weightFontColor = Palette.textColor(weightColor);

                const weightDiv = rowDiv.append("div")
                    .attr("class", "row-weight")
                    .style("padding", rowItemPadding)
                    .style("color", weightFontColor)
                    .style("box-shadow", `inset 0 0 100px ${weightColor}`)
                    .style("font-weight", d.bold ? "bold" : "normal")
                    .style("font-family", fontFamily)
                    .style("font-size", fontSize + "px")
                    .text(d.weightValue)
                    .attr("title", d.weightValue)
                    .style("overflow", "hidden")
                    .style("width", (maxWeightWidth + (padding * 2)) + "px")
                    .style("text-overflow", "ellipsis")
                    .style("text-align", "right")
                    .style("line-height", lineHeight + "px")
                    ;
                rowDiv.append("div")
                    .attr("class", "row-depth")
                    .style("width", (context.depthSize() * d.depth) + "px")
                    .style("opacity", 1)
                    .style("line-height", lineHeight + "px")
                    ;
                const iconDiv = rowDiv.append("div")
                    .attr("class", "row-icon " + (d.iconClass ? d.iconClass : context.iconClass(d)))
                    .style("width", iconWidth + "px")
                    .style("height", lineHeight + "px")
                    .style("color", fontColor)
                    .style("background-color", d.selected ? context.selectionBackgroundColor() : "transparent")
                    .style("font-size", context.iconSize() + "px")
                    .style("padding", rowItemPadding)
                    .style("line-height", lineHeight + "px")
                    ;
                const labelDiv = rowDiv.append("div")
                    .attr("class", "row-label")
                    .style("padding", rowItemPadding)
                    .style("color", fontColor)
                    .style("background-color", d.selected ? context.selectionBackgroundColor() : "transparent")
                    .style("font-weight", d.bold ? "bold" : "normal")
                    .style("font-family", context.fontFamily())
                    .style("font-size", context.fontSize() + "px")
                    .text(d.label)
                    .attr("title", d.label)
                    .style("flex", 1)
                    .style("overflow", "hidden")
                    .style("text-overflow", "ellipsis")
                    .style("line-height", lineHeight + "px")
                    ;

                rowDiv
                    .on("mouseenter", () => {
                        labelDiv.style("font-weight", "bold");
                    })
                    .on("mouseleave", () => {
                        labelDiv.style("font-weight", d.bold ? "bold" : "normal");
                    })
                    ;
                weightDiv
                    .on("mouseenter", () => {
                        context.weight_mouseenter(d);
                    })
                    .on("mouseleave", () => {
                        context.weight_mouseleave(d);
                    })
                    ;

                if (d.isFolder) {
                    rowDiv.on("click", function (d: any) {
                        let next = this.nextSibling;
                        const wasClosed = rowDiv.classed("folder-closed");
                        if (wasClosed) {
                            rowDiv.classed("folder-closed", false);
                            rowDiv.classed("folder-open", true);
                            iconDiv.attr("class", "row-icon " + context.folderIconOpen());
                        } else {
                            rowDiv.classed("folder-closed", true);
                            rowDiv.classed("folder-open", false);
                            iconDiv.attr("class", "row-icon " + context.folderIconClosed());
                        }
                        while (next !== null) {
                            const nextDepth = (d3Select(next).datum() as any).depth;
                            if (nextDepth > d.depth) {
                                next.style.display = wasClosed ? "flex" : "none";
                                next = next.nextSibling;
                            } else {
                                next = null;
                            }
                        }
                    });
                } else {
                    rowDiv.on("click", () => {
                        element.selectAll(".row-label").style("background-color", "transparent");
                        element.selectAll(".row-icon").style("background-color", "transparent");
                        iconDiv.style("background-color", context.selectionBackgroundColor());
                        labelDiv.style("background-color", context.selectionBackgroundColor());
                        const ext = d.label.split(".").pop().toLowerCase();
                        context.rowClick(ext === "json" ? JSON.stringify(JSON.parse(d.content), null, 4) : d.content, d.markers);
                    });
                }
            })
            ;

        rowEnter
            .merge(rowSelection)
            .style("background-color", context.backgroundColor())
            ;

        rowSelection.exit().remove();
    }
    weight_mouseenter(d) {

    }
    weight_mouseleave(d) {

    }
}
DirectoryTree.prototype._class += " tree_DirectoryTree";
DirectoryTree.prototype._palette = Palette.rainbow("Blues");

export interface DirectoryTree {
    _palette;

    depthSize(): number;
    depthSize(_: number): this;
    paletteID(): string;
    paletteID(_: string): this;
    omitRoot(): boolean;
    omitRoot(_: boolean): this;
    rowItemPadding(): number;
    rowItemPadding(_: number): this;
    selectionBackgroundColor(): string;
    selectionBackgroundColor(_: string): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    fontColor(): string;
    fontColor(_: string): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    iconSize(): number;
    iconSize(_: number): this;
    folderIconOpen(): string;
    folderIconOpen(_: string): this;
    folderIconClosed(): string;
    folderIconClosed(_: string): this;
    textFileIcon(): string;
    textFileIcon(_: string): this;
    verticalScroll(): boolean;
    verticalScroll(_: boolean): this;
}

DirectoryTree.prototype.publish("depthSize", 14, "number", "Width of indentation per file or folder depth (pixels)");
DirectoryTree.prototype.publish("paletteID", "Blues", "set", "Color palette for the weight backgrounds", DirectoryTree.prototype._palette.switch(), { tags: ["Basic"] });
DirectoryTree.prototype.publish("omitRoot", false, "boolean", "If true, root node will not display");
DirectoryTree.prototype.publish("rowItemPadding", 2, "number", "Top, bottom, left and right row item padding");
DirectoryTree.prototype.publish("selectionBackgroundColor", "#CCC", "html-color", "Background color of selected directory rows");
DirectoryTree.prototype.publish("backgroundColor", "#FFF", "html-color", "Directory item background color");
DirectoryTree.prototype.publish("fontColor", "#000", "html-color", "Directory item font color");
DirectoryTree.prototype.publish("fontFamily", "Arial", "string", "Directory item font family");
DirectoryTree.prototype.publish("fontSize", 12, "number", "Directory item font size (pixels)");
DirectoryTree.prototype.publish("iconSize", 12, "number", "Directory folder and file icon size (pixels)");
DirectoryTree.prototype.publish("folderIconOpen", "fa fa-folder-open", "string", "Open folder icon class");
DirectoryTree.prototype.publish("folderIconClosed", "fa fa-folder", "string", "Closed folder icon class");
DirectoryTree.prototype.publish("textFileIcon", "fa fa-file-text-o", "string", "Text file icon class");
DirectoryTree.prototype.publish("verticalScroll", true, "boolean", "If true, vertical scroll bar will be shown");
