(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!lib/Font-Awesome/css/font-awesome", "css!./FAChar"], factory);
    } else {
        root.Entity = factory(root.SVGWidget);
    }
}(this, function (SVGWidget) {
    function FAChar() {
        SVGWidget.call(this);
        this._class = "faChar";
        this._char = "";
        this._fontSize = 0;
    };
    FAChar.prototype = Object.create(SVGWidget.prototype);

    FAChar.prototype.fontSize = function (_) {
        if (!arguments.length) return this._fontSize;
        this._fontSize = _;
        return this;
    };

    FAChar.prototype.char = function (_) {
        if (!arguments.length) return this._char;
        this._char = _;
        return this;
    };

    FAChar.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        if (!this._fontSize) {
            var style = window.getComputedStyle(domNode, null);
            this._fontSize = parseInt(style.fontSize);
            if (!this._fontSize) {
                //  Chromium Issue  ---
                this._fontSize = 14;
            }
        }
        this._charElement = element.append("text")
            .attr("font-family", "FontAwesome")
            .attr("text-anchor", "middle")
            .attr("class", "fa-fw")
        ;
    };

    FAChar.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._charElement
            .attr("font-size", this._fontSize)
            .attr("x", 0)
            .attr("y", this._fontSize / 3) //  Aproximation for font "drop" offset
            .text(this._char)
        ;
    };

    return FAChar;
}));
