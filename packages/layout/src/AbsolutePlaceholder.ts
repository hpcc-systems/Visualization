import { HTMLWidget, select as d3Select } from "@hpcc-js/common";

export interface IAbsoluteRect {
    top: number;
    left: number;
    bottom?: number;
    right?: number;
    width?: number;
    height?: number;
}
export class AbsolutePlaceholder extends HTMLWidget {
    _dragHandles = {};
    _ownerWidth;
    _ownerHeight;
    _placeholderWidth;
    _placeholderHeight;
    _isDragging;
    _startX;
    _startY;
    _currentX;
    _currentY;
    _endX;
    _endY;
    _parentWidget;
    _dragElement;
    _pixelLayout;
    _ratioLayout;
    _startLayout;
    _endLayout;
    _startHandles;
    _endHandles;
    _rect;
    constructor() {
        super();

    }

    enter(domNode, element) {
        super.enter(domNode, element);

        d3Select(domNode.parentElement)
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px")
            .style("bottom", "0px")
            .style("left", "0px")
            ;
        element
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px")
            .style("bottom", "0px")
            .style("left", "0px")
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);
        d3Select(domNode.parentElement)
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px")
            .style("bottom", "0px")
            .style("left", "0px")
            ;
        element
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px")
            .style("bottom", "0px")
            .style("left", "0px")
            ;
        this._dragHandles = this.calcDragHandles(this._placeholderWidth, this._placeholderHeight);
    }
    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        if (this._drawStartPos === "origin") {
            this._element
                .style("position", "absolute")
                .style("left", this._pos.x + "px")
                .style("top", this._pos.y + "px")
                ;
        } else {
            const bbox = this.getBBox(true);
            this._element
                .style("position", "absolute")
                .style("float", "left")
                .style("left", this._pos.x + (this._size.width - bbox.width) / 2 + "px")
                .style("top", this._pos.y + (this._size.height - bbox.height) / 2 + "px")
                ;
        }
    }

    parentWidget(_) {
        if (!arguments)return this._parentWidget;
        this._parentWidget = _;
        return this;
    }
    applyLayout(elm, width, height) {
        this._dragElement = elm;
        const layout = this.percentageLayoutToPixel(this.layout(), width, height);
        this._pixelLayout = layout;
        this._ownerWidth = width;
        this._ownerHeight = height;
        this._placeholderWidth = width - layout.left - layout.right;
        this._placeholderHeight = height - layout.top - layout.bottom;
        elm.style.top = layout.top + "px";
        elm.style.right = layout.right + "px";
        elm.style.bottom = layout.bottom + "px";
        elm.style.left = layout.left + "px";
        this._dragHandles = this.calcDragHandles(this._placeholderWidth, this._placeholderHeight);
        this._rect = {
            top: layout.top,
            right: layout.right,
            bottom: layout.bottom,
            left: layout.left,
            width: this._placeholderWidth,
            height: this._placeholderHeight
        };
        this._startLayout = {
            top: layout.top,
            right: layout.right,
            bottom: layout.bottom,
            left: layout.left
        };
    }

    applyDrag(dx, dy) {
        const handles = this._startHandles;
        const allHandles = handles && handles[0] === "move";
        const updateTop = allHandles || handles.indexOf("n") !== -1;
        const updateRight = allHandles || handles.indexOf("e") !== -1;
        const updateBottom = allHandles || handles.indexOf("s") !== -1;
        const updateLeft = allHandles || handles.indexOf("w") !== -1;
        const [ width, height ] = this._parentWidget._paperSizes[this._parentWidget.paperSize()];
        let paperWidthOffset = width % this.snapSize();
        let paperHeightOffset = height % this.snapSize();
        if (paperWidthOffset > this.snapSize() / 2) {
            paperWidthOffset = -1 * (this.snapSize() - paperWidthOffset);
        }
        if (paperHeightOffset > this.snapSize() / 2) {
            paperHeightOffset = -1 * (this.snapSize() - paperHeightOffset);
        }
        const layout = {
            top: this.snap(updateTop ? this._startLayout.top + dy : this._startLayout.top),
            right: this.snap(updateRight ? this._startLayout.right - dx : this._startLayout.right) + paperWidthOffset,
            bottom: this.snap(updateBottom ? this._startLayout.bottom - dy : this._startLayout.bottom) + paperHeightOffset,
            left: this.snap(updateLeft ? this._startLayout.left + dx : this._startLayout.left),
            height: 0,
            width: 0
        };
        const topDiff = layout.top - this._startLayout.top;
        const rightDiff = layout.right - this._startLayout.right;
        const bottomDiff = layout.bottom - this._startLayout.bottom;
        const leftDiff = layout.left - this._startLayout.left;
        layout.width = this._startLayout.width - leftDiff - rightDiff;
        layout.height = this._startLayout.height - topDiff - bottomDiff;
        this._rect = layout;
        this._dragElement.style.top = layout.top + "px";
        this._dragElement.style.right = layout.right + "px";
        this._dragElement.style.bottom = layout.bottom + "px";
        this._dragElement.style.left = layout.left + "px";
        this._dragHandles = this.calcDragHandles(layout.width, layout.height);
    }
    snap(v) {
        const snapTo = this.snapSize();
        return Math.round(v / snapTo) * snapTo;
    }
    percentageLayoutToPixel(percentageLayout, width, height) {
        return {
            top: percentageLayout.top * height,
            right: percentageLayout.right * width,
            bottom: percentageLayout.bottom * height,
            left: percentageLayout.left * width
        };
    }
    pixelLayoutToPercentage(pixelLayout, width, height) {
        return {
            top: pixelLayout.top / height,
            right: pixelLayout.right / width,
            bottom: pixelLayout.bottom / height,
            left: pixelLayout.left / width
        };
    }
    cursorStyle(handles) {
        if (handles.length === 1) {
            if (handles[0] === "move")return "move";
            return handles[0] + "-resize";
        } else if (handles.length === 2) {
            let dir = "";
            if (handles[0] === "n")dir += "n" + handles[1];
            if (handles[1] === "n")dir += "n" + handles[0];
            if (handles[0] === "s")dir += "s" + handles[1];
            if (handles[1] === "s")dir += "s" + handles[0];
            return dir + "-resize";
        }
        return "default";
    }
    cursorStyle_old(arr) {
        if (arr[0] === "move")return arr[0];
        if (arr[0] === "move")return arr[0];
        if (arr.length === 1) {
            return arr[0] +  arr[0]  !==  "move" ? "-resize" : "";
        }
        if (arr.length === 2) {
            let dir = "";
            if (arr[0] === "n")dir += "n" + arr[1];
            if (arr[1] === "n")dir += "n" + arr[0];
            if (arr[0] === "s")dir += "s" + arr[1];
            if (arr[1] === "s")dir += "s" + arr[0];
            return dir + "-resize";
        }
        return "default";
    }
    calcDragHandles(width, height) {
        const handleSize = this.handleSize();
        return {
            n: {
                top: 0,
                left: 0,
                width,
                height: handleSize
            },
            s: {
                top: height - handleSize,
                left: 0,
                width,
                height: handleSize
            },
            e: {
                top: 0,
                left: width - handleSize,
                width: handleSize,
                height
            },
            w: {
                top: 0,
                left: 0,
                width: handleSize,
                height
            },
            move: {
                top: handleSize,
                left: handleSize,
                width: handleSize * 4,
                height: handleSize * 4
            }
        };
    }
    calcHoveredHandles(x, y) {
        const hoveredHandles = Object.keys(this._dragHandles)
            .filter(name => {
                const h = this._dragHandles[name];
                const inboundsX = h.left <= x && h.left + h.width >= x;
                const inboundsY = h.top <= y && h.top + h.height >= y;
                return inboundsX && inboundsY;
            });
        return hoveredHandles;
    }
    drawHandles(handles, xo, yo) {
        this._parentWidget.element().style("cursor", this.cursorStyle(handles));

        const ctx = this._parentWidget._ctx;
        const handleSize = this.handleSize();
        ctx.textBaseline = "top";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        handles.forEach(direction => {
            const handle = this._dragHandles[direction];
            if (direction === "move") {
                ctx.font = "12px FontAwesome";
                ctx.fontStyle = "#000000";
                ctx.strokeRect(handle.left + xo, handle.top + yo, handle.width, handle.height);
                ctx.fillText("", handle.left + xo + handleSize - 1, handle.top + yo + handleSize - 1);
            } else {
                ctx.fillRect(handle.left + xo, handle.top + yo, handle.width, handle.height);
            }
        });
    }
}

AbsolutePlaceholder.prototype._class += " layout_AbsolutePlaceholder";

export interface AbsolutePlaceholder {
    layoutWidth(): number;
    layoutWidth(_: number): this;
    layoutHeight(): number;
    layoutHeight(_: number): this;
    handleSize(): number;
    handleSize(_: number): this;
    widgets(): any;
    widgets(_: any): this;
    layout(): IAbsoluteRect;
    layout(_: IAbsoluteRect): this;
    _layout: IAbsoluteRect;
    snapSize(): number;
    snapSize(_: number): this;
    pageType(): string;
    pageType(_: string): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    padding(): number;
    padding(_: number): this;
    margin(): number;
    margin(_: number): this;
    borderColor(): string;
    borderColor(_: string): this;
    widget(): any;
    widget(_: any): this;
}

AbsolutePlaceholder.prototype.publish("widget", null, "any", "Widget to display in this placeholder");
AbsolutePlaceholder.prototype.publish("padding", 8, "number", "Padding for the layout (pixels)");
AbsolutePlaceholder.prototype.publish("margin", 8, "number", "Margin for the layout (pixels)");
AbsolutePlaceholder.prototype.publish("borderColor", "rgba(0,0,0,0.3)", "string", "Color of the layout border");
AbsolutePlaceholder.prototype.publish("backgroundColor", "#FFF", "string", "Background color of the layout");
AbsolutePlaceholder.prototype.publish("handleSize", 5, "number", "Pixel width (or height) of resize handles");
AbsolutePlaceholder.prototype.publish("snapSize", 15, "number", "Padding between widgets and edges (pixels)");
AbsolutePlaceholder.prototype.publish("widgets", [], "widgetArray", "Widgets in the layout");
AbsolutePlaceholder.prototype.publish("layout", {}, "object", "Placement of the placeholder element");
