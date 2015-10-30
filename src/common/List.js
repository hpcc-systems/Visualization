"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./IList", "../common/TextBox", "css!./List"], factory);
    } else {
        root.common_List = factory(root.d3, root.common_SVGWidget, root.common_IList, root.common_TextBox);
    }
}(this, function (d3, SVGWidget, IList, TextBox) {
    function List(target) {
        SVGWidget.call(this);
        IList.call(this);

        this._listWidgets = {};
    }
    List.prototype = Object.create(SVGWidget.prototype);
    List.prototype.constructor = List;
    List.prototype._class += " common_List";
    List.prototype.implements(IList.prototype);

    List.prototype.publish("anchor", "start", "set", "Anchor Position", ["", "start", "middle", "end"],{tags:["Private"]});

    List.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        var line = element.selectAll(".line").data(this.data(), function (d) { return d; });
        line.enter().append("g")
            .attr("class", "line")
            .each(function (d) {
                var newTextBox = new TextBox()
                    .target(this)
                    .paddingTop(0)
                    .paddingBottom(0)
                    .paddingLeft(8)
                    .paddingRight(8)
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
            if (!this._listWidgets.hasOwnProperty(key)) continue;
            var bbox = this._listWidgets[key].getBBox();
            listHeight += bbox.height;
            if (listWidth < bbox.width)
                listWidth = bbox.width;
            ++listCount;
        }

        var yPos = -listHeight / 2;// + lineHeight / 2;
        line.each(function (d) {
            var widget = context._listWidgets[d];
            var bbox = widget.getBBox();
            widget
                .pos({ x: 0, y: yPos + bbox.height / 2 })
                .anchor(context.anchor())
                .fixedSize({ width: listWidth, height: bbox.height })
                .render()
            ;
            yPos += bbox.height;
        });
        line.exit()
            .remove()
            .each(function (d) {
                context._listWidgets[d].target(null);
                delete context._listWidgets[d];
            })
        ;
    };

    List.prototype.exit = function (domNode, element) {
        for (var key in this._listWidgets) {
            this._listWidgets[key].target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return List;
}));
