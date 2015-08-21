"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Widget", "../layout/AbsoluteSurface", "../common/TextBox"], factory);
    } else {
        root.api_ITooltip = factory(root.d3, root.common_Widget, root.layout_AbsoluteSurface, root.common_TextBox);
    }
}(this, function (d3, Widget, AbsoluteSurface, TextBox) {
    function ITooltip() {
        Widget.call(this);

        this._textBox = new TextBox()
            .shape_colorFill("#FFFFFA")
            .shape_colorStroke("#E6E6E1")
        ;
        this._tooltip = new AbsoluteSurface()
            .units("pixels")
            .widget(this._textBox)
            .visible(false)
        ;
    }
    ITooltip.prototype = Object.create(Widget.prototype);

    ITooltip.prototype.publish("tooltipOffset", 5, "number", "Offset from the cursor", null, {});

    //  Implementation  ---
    ITooltip.prototype.tooltipShow = function (row, _columns, idx) {
        var context = this;
        if (row !== undefined) {
            this._textBox
                .columns(idx === undefined ? _columns : [_columns[0], _columns[idx]])
                .data([idx === undefined ? row : [row[0], row[idx]]])
                .text(row[0] + ", " + _columns[idx] + ":  " + row[idx])
            ;
            if (this._tooltip._renderCount === 0) {
                this._tooltip
                    .target(this._parentOverlay.node())
                    .render(function (w) {
                        context._textBox._parentElement.style("overflow", "hidden");
                    })
                ;
            } else {
                this._textBox.render();
            }

            var point = d3.mouse(this._parentOverlay.node());

            var bbox = this._textBox.getBBox(true);
            var x = point[0] - bbox.width / 2;
            if (x < 0) {
                x = 0;
            } else if (x + bbox.width > this.width()) {
                x = this.width() - bbox.width;
            }
            var y = point[1] - bbox.height - this.tooltipOffset();
            if (y < 0) {
                y = point[1] + this.tooltipOffset();
            } else if (y + bbox.height > this.height()) {
                y = this.height() - bbox.height - this.tooltipOffset();
            }
            this._tooltip
                .widgetX(x)
                .widgetY(y)
                .widgetWidth(bbox.width)
                .widgetHeight(bbox.height)
            ;
        }
        this._tooltip
            .visible(row !== undefined)
            .render()
        ;
    };

    return ITooltip;
}));
