"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/CanvasWidget", "../common/Icon", "../common/TextBox"], factory);
    } else {
        root.graph_VertexC = factory(root.d3, root.common_CanvasWidget, root.common_Icon, root.common_TextBox);
    }
}(this, function (d3, CanvasWidget, Icon, TextBox) {
    function VertexC() {
        CanvasWidget.call(this);

        this.poly_arr = [];

        this._icon = new Icon();
        this._textBox = new TextBox();
        this._annotationWidgets = {};
    }
    VertexC.prototype = Object.create(CanvasWidget.prototype);
    VertexC.prototype.constructor = VertexC;
    VertexC.prototype._class += " graph_VertexC";

    VertexC.prototype.publishProxy("faChar", "_icon");
    VertexC.prototype.publishProxy("imageUrl", "_icon");
    VertexC.prototype.publishProxy("icon_shape_diameter", "_icon", "diameter");
    VertexC.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
    VertexC.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
    VertexC.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");
    VertexC.prototype.publish("centroid", false, "boolean", "Centroid Vertex");

    VertexC.prototype.publishProxy("text", "_textBox");
    VertexC.prototype.publishProxy("anchor", "_textBox");
    VertexC.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
    VertexC.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
    VertexC.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

    VertexC.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end"], { tags: ["Basic"] });

    VertexC.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });
    VertexC.prototype.publish("iconTooltip", "", "string", "iconTooltip", null, { tags: ["Private"] });

    VertexC.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter", null, { tags: ["Private"] });
    VertexC.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing", null, { tags: ["Private"] });
    VertexC.prototype.publish("annotationIcons", [], "array", "Annotations", null, { tags: ["Private"] });

    VertexC.prototype.drawOriginalLayout = function (ctx, canvas) {
        //TODO
    };
    VertexC.prototype.drawCenteredLayout = function (ctx, canvas) {
        //TODO
    };
    VertexC.prototype.drawKeyLayout = function (ctx, canvas) {
        var context = this;
        var x = this.x();
        var y = this.y();
        var mult = 1;
        var label_font_family = 'Arial';
        var icon_font_family = 'FontAwesome';
        var label_font_size = 12 * mult;
        var icon_font_size = label_font_size * 2;
        var pr = label_font_size / 4;
        var icon_y_offset = pr;
        var label_w = 0;
        var label_h = label_font_size + (pr * 2);
        var icon_h = label_h * 2;
        var annotations_h = label_h;
        var center_x = 0;
        var center_x_offset = 0;
        this.min_x = x;
        this.max_x = x;
        this.min_y = y;
        this.max_y = y;
        ctx.textBaseline = 'top';

        draw_label(this.text());
        draw_icon(this.faChar());
        draw_annotations();

        this.size({
            height: this.max_y - this.min_y,
            width: this.max_x - this.min_x,
        });

        function draw_icon(txt) {
            var poly_info_obj = {
                vertex: context,
                tooltip: context.iconTooltip()
            };
            var icon_w = icon_h;
            var _x = x - icon_w;
            var _y = y - icon_h / 2;
            ctx.font = icon_font_size + 'px ' + icon_font_family;
            ctx.beginPath();
            ctx.font = icon_font_size + 'px ' + icon_font_family;
            ctx.rect(_x - center_x_offset, _y, icon_w, icon_h);
            context.poly_arr.push([_x - center_x_offset, _y, icon_w, icon_h, poly_info_obj]);
            ctx.strokeStyle = context.icon_shape_colorStroke() ? context.icon_shape_colorStroke() : "#777";
            ctx.stroke();
            ctx.fillStyle = context.icon_shape_colorFill() ? context.icon_shape_colorFill() : "#fff";
            ctx.fill();
            ctx.fillStyle = context.icon_image_colorFill() ? context.icon_image_colorFill() : "#fff";
            ctx.textAlign = 'center';
            ctx.fillText(txt, _x + (icon_w / 2) - center_x_offset, _y + pr + icon_y_offset);
            ctx.closePath();
            context.update_x_minmax(_x);
            context.update_x_minmax(_x + icon_w);
            context.update_y_minmax(_y);
            context.update_y_minmax(_y + icon_h);
        }

        function draw_label(txt) {
            var poly_info_obj = {
                vertex: context,
                tooltip: context.tooltip()
            };
            var _x = x;
            var _y = y - icon_h / 2;
            ctx.beginPath();
            ctx.strokeStyle = context.textbox_shape_colorStroke() ? context.textbox_shape_colorStroke() : "#777";
            ctx.font = label_font_size + 'px ' + label_font_family;
            label_w = ctx.measureText(txt).width;
            center_x = x - icon_h + ((icon_h + label_w) / 2);
            center_x_offset = center_x - x;
            ctx.rect(_x - center_x_offset, _y, label_w + (pr * 2), label_h);
            context.poly_arr.push([_x - center_x_offset, _y, label_w + (pr * 2), label_h, poly_info_obj]);
            ctx.fillStyle = context.textbox_shape_colorFill() ? context.textbox_shape_colorFill() : "#fff";
            ctx.fill();
            ctx.fillStyle = context.textbox_text_colorFill() ? context.textbox_text_colorFill() : "#000";
            ctx.textAlign = 'left';
            ctx.fillText(txt, _x + pr - center_x_offset, _y + pr);
            ctx.stroke();
            ctx.closePath();
            context.update_x_minmax(_x);
            context.update_x_minmax(_x + label_w + (pr * 2));
            context.update_y_minmax(_y);
            context.update_y_minmax(_y + label_h);
        }

        function draw_annotations() {
            var _x = x + label_w + (pr * 2) - annotations_h;
            var _y = y;
            var _anno_width_sum = 0;
            ctx.textAlign = 'left';
            context.annotationIcons().forEach(function (anno_obj) {
                var poly_info_obj = {
                    vertex: context,
                    tooltip: anno_obj.tooltip,
                    direction: "down"
                };
                ctx.font = label_font_size + 'px ' + anno_obj.font;
                ctx.beginPath();
                ctx.strokeStyle = "#777";
                ctx.rect(_x - _anno_width_sum - center_x_offset, _y, annotations_h, annotations_h);
                context.poly_arr.push([_x - _anno_width_sum - center_x_offset, _y, annotations_h, annotations_h, poly_info_obj]);
                ctx.stroke();
                ctx.fillStyle = anno_obj.shape_colorFill ? anno_obj.shape_colorFill : "#fff";
                ctx.fill();
                ctx.fillStyle = anno_obj.image_colorFill ? anno_obj.image_colorFill : "#000";
                ctx.fillText(anno_obj.faChar, _x - _anno_width_sum + pr - center_x_offset, _y + pr);
                ctx.closePath();
                _anno_width_sum += annotations_h;
            });
        }
    };

    VertexC.prototype.drawPolyTooltip = function (poly_obj, ctx) {
        if(!poly_obj[4].tooltip)return;
        var _x = poly_obj[0] + (poly_obj[2] / 2);
        var _y = poly_obj[1] + (poly_obj[3] / 2);
        var direction = poly_obj[4].direction ? poly_obj[4].direction : "up";
        switch (direction) {
            case 'up':
                _draw_tooltip(_x, _y, poly_obj[4].tooltip);
                break;
            case 'down':
                _draw_tooltip(_x, _y, poly_obj[4].tooltip, true);
                break;
        }

        function _draw_tooltip(x, y, txt, invert_y) {
            ctx.textBaseline = "bottom";
            var text_h = 14;
            ctx.font = text_h + "px Arial";
            var padding = 4;
            var text_w = ctx.measureText(txt).width;
            var arrow_w = 16;
            var arrow_h = 10;
            var tooltip_w = text_w + (padding * 2);
            var tooltip_h = text_h + (padding * 2);
            if (invert_y) {
                arrow_h *= -1;
                tooltip_h *= -1;
            }
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - (arrow_w / 2), y - arrow_h);
            ctx.lineTo(x - (tooltip_w / 2), y - arrow_h);
            ctx.lineTo(x - (tooltip_w / 2), y - (arrow_h + tooltip_h));
            ctx.lineTo(x + (tooltip_w / 2), y - (arrow_h + tooltip_h));
            ctx.lineTo(x + (tooltip_w / 2), y - arrow_h);
            ctx.lineTo(x + (arrow_w / 2), y - arrow_h);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#FFF";
            if (invert_y) {
                ctx.fillText(txt, x - (tooltip_w / 2) + padding, y - arrow_h + padding + text_h);
            } else {
                ctx.fillText(txt, x - (tooltip_w / 2) + padding, y - arrow_h - padding);
            }
        }
    };

    VertexC.prototype.drawSelf = function (ctx, canvas) {
        this.poly_arr = [];
        this.drawKeyLayout(ctx, canvas);
    };

    VertexC.prototype.getHoveredPolygons = function (x, y) {
        return this.poly_arr.filter(function (n) {
            var in_x_bounds = x > n[0] && x < n[0] + n[2];
            var in_y_bounds = y > n[1] && y < n[1] + n[3];
            return in_x_bounds && in_y_bounds;
        });
    };

    VertexC.prototype.update_x_minmax = function (_x) {
        if (this.min_x > _x) this.min_x = _x;
        if (this.max_x < _x) this.max_x = _x;
    };

    VertexC.prototype.update_y_minmax = function (_y) {
        if (this.min_y > _y) this.min_y = _y;
        if (this.max_y < _y) this.max_y = _y;
    };

    VertexC.prototype.getBBox = function () {
        return this.size();
    };

    return VertexC;
}));