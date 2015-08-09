"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "css!./MorphText"], factory);
    } else {
        root.other_MorphText = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function MorphText() {
        SVGWidget.call(this);

        this._text = "";
        this._anchor = "middle";
        this._reverse = false;
    }
    MorphText.prototype = Object.create(SVGWidget.prototype);
    MorphText.prototype.constructor = MorphText;
    MorphText.prototype._class += " other_MorphText";

    MorphText.prototype.testData = function () {
        return this;
    };

    MorphText.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = _;

        var usedChars = {};
        var chars = this._text.split("");
        this.data(chars.map(function(d) {
            var id = "_" + d;
            if (usedChars[id] === undefined) {
                usedChars[id] = 0;
            }
            usedChars[id]++;
            return {text: d, id: d.charCodeAt(0) + (1024 * usedChars[id])};
        }));

        return this;
    };

    MorphText.prototype.anchor = function (_) {
        if (!arguments.length) return this._anchor;
        this._anchor = _;
        return this;
    };

    MorphText.prototype.fontSize = function (_) {
        if (!arguments.length) return this._fontSize;
        this._fontSize = _;
        return this;
    };

    MorphText.prototype.reverse = function (_) {
        if (!arguments.length) return this._reverse;
        this._reverse = _;
        return this;
    };

    MorphText.prototype.enter = function (domNode, element) {
        if (!this._fontSize) {
            var style = window.getComputedStyle(domNode, null);
            this._fontSize = parseInt(style.fontSize);
        }
        this._fontWidth = this._fontSize * 32 / 48;
        this._textElement = element.append("g")
        ;
    };

    MorphText.prototype.dateTime = function () {
        var d = new Date(),
            seconds = d.getSeconds().toString().length === 1 ? '0' + d.getSeconds() : d.getSeconds(),
            minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ':' + seconds + ampm;
    };

    MorphText.prototype.update = function (domNode, element) {
        var context = this;
        var text = this._textElement.selectAll("text")
            .data(this.data(), function (d) { return d.id; })
        ;
        text
          .attr("class", "update")
        ;
        this.transition.apply(text)
            .attr("x", function (d, i) { return (-context._data.length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
        ;

        var newText = text.enter().append("text")
            .attr("class", "enter")
            .attr("font-size", this._fontSize)
            .attr("dy", ".35em")
            .attr("y", (this._reverse ? +1 : -1) * this._fontWidth * 2)
            .attr("x", function (d, i) { return (-context._data.length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            .style("fill-opacity", 1e-6)
            .style("text-anchor", this._anchor)
            .text(function (d) { return d.text; })
        ;
        this.transition.apply(newText)
            .attr("y", 0)
            .style("fill-opacity", 1)
        ;

        text.exit()
            .attr("class", "exit")
        ;
        this.transition.apply(text.exit())
            .attr("y", (this._reverse ? -1 : +1) * this._fontWidth * 2)
            .style("fill-opacity", 1e-6)
            .remove()
        ;
    };

    return MorphText;
}));
