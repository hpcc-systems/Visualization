(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "./IList", "../common/TextBox", "css!./List"], factory);
    } else {
        root.List = factory(root.d3, root.D3Widget, root.IList, root.TextBox);
    }
}(this, function (d3, D3Widget, IList, TextBox) {
    function List(target) {
        D3Widget.call(this);
        IList.call(this);

        this._class = "list";

        this._listWidgets = {};
        this._listHeight = 0;
        this._listWidth = 0;
        this._listItemHeight = 0;
    };
    List.prototype = Object.create(D3Widget.prototype);
    List.prototype.implements(IList.prototype);

    List.prototype.enter = function (domNode, element) {
        var context = this;
    },

    List.prototype.update = function (domNode, element) {
        var context = this;

        var line = element.selectAll(".line").data(this._data, function (d) { return d; });
        line.enter().append("g")
            .attr("class", "line")
            .each(function (d) {
                var newTextBox = new TextBox()
                    .target(this)
                    .padding({
                        left: 5,
                        top: 1,
                        right: 5,
                        bottom: 1
                    })
                    .anchor("left")
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
                    .pos({ x: xPos, y: yPos + bbox.height / 2 })
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
