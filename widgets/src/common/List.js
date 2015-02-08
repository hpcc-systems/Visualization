"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./IList", "../common/TextBox", "css!./List"], factory);
    } else {
        root.List = factory(root.d3, root.SVGWidget, root.IList, root.TextBox);
    }
}(this, function (d3, SVGWidget, IList, TextBox) {
    function List(target) {
        SVGWidget.call(this);
        IList.call(this);
        this._class = "common_List";

        this._listWidgets = {};
    };
    List.prototype = Object.create(SVGWidget.prototype);
    List.prototype.implements(IList.prototype);

    List.prototype.publish("anchor", "start", "set", "Anchor Position", ["", "start", "middle", "end"]);

    List.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        var line = element.selectAll(".line").data(this._data, function (d) { return d; });
        line.enter().append("g")
            .attr("class", "line")
            .each(function (d) {
                var newTextBox = new TextBox()
                    .target(this)
                    .padding_top(0)
                    .padding_bottom(0)
                    .padding_left(8)
                    .padding_right(8)
                    .text(d)
                    .render()
                ;
                newTextBox.element()
                    .on("click", function (d) {
                        context.click(d.text());
                    })
                ;
                context._listWidgets[d] = newTextBox;
            })
        ;

        var listHeight = 0;
        var listWidth = 0;
        var listCount = 0;
        for (var key in this._listWidgets) {
            var bbox = this._listWidgets[key].getBBox();
            listHeight += bbox.height;
            if (listWidth < bbox.width)
                listWidth = bbox.width;
            ++listCount;
        }
        var lineHeight = listHeight / listCount;

        var xPos = -listWidth / 2;
        var yPos = -listHeight / 2;// + lineHeight / 2;
        line
            .each(function (d) {
                var widget = context._listWidgets[d];
                var bbox = widget.getBBox();
                widget
                    .pos({ x: 0, y: yPos + bbox.height / 2 })
                    .anchor(context._anchor)
                    .fixedSize({ width: listWidth, height: bbox.height })
                    .render()
                ;
                yPos += bbox.height;
            })
        ;
        line.exit()
            .remove()
            .each(function (d) {
                delete context._listWidgets[d];
            })
        ;
    };

    return List;
}));
