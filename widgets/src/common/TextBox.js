(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./D3Widget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.Entity = factory(root.D3Widget, root.Shape, root.Text);
    }
}(this, function (D3Widget, Shape, Text) {
    function TextBox() {
        D3Widget.call(this);

        this._padding = {
            left: 8,
            top: 8,
            right: 8,
            bottom: 8
        };

        this._class = "textbox";
        this._shape = new Shape()
            .shape("rect")
        ;
        this._text = new Text();
    };
    TextBox.prototype = Object.create(D3Widget.prototype);

    TextBox.prototype.padding = function (_) {
        if (!arguments.length) return this._padding;
        this._padding = _;
        return this;
    };

    TextBox.prototype.text = function (_) {
        if (!arguments.length) return this._text.text();
        this._text.text(_);
        return this;
    };

    TextBox.prototype.enter = function (domNode, element) {
        this._shape
            .target(domNode)
            .render()
        ;
        this._text
            .target(domNode)
            .render()
        ;
    };

    TextBox.prototype.update = function (domNode, element) {
        this._text
            .render()
        ;

        var bbox = this._text.getBBox();
        this._shape
            .size({ 
                width: bbox.width + this._padding.left + this._padding.right, 
                height: bbox.height + this._padding.top + this._padding.bottom
            })
            .render()
        ;
    };

    return TextBox;
}));
