"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "../api/I1DChart", "css!./MorphText"], factory);
    } else {
        root.other_MorphText = factory(root.common_SVGWidget, root.api_I1DChart);
    }
}(this, function (SVGWidget, I1DChart) {
    function MorphText() {
        SVGWidget.call(this);
    }

    MorphText.prototype = Object.create(SVGWidget.prototype);
    MorphText.prototype.constructor = MorphText;
    MorphText.prototype._class += " other_MorphText";

    MorphText.prototype.publish("anchor","middle", "set", "Sets anchor point",["middle"],{tags:["basic"]});
    MorphText.prototype.publish("fontSize",14, "number", "Sets fontsize",null,{tags:["basic"]});
    MorphText.prototype.publish("reverse",false, "boolean", "Reverse Text",null,{tags:["basic"]});
    MorphText.prototype.publish("text","", "string", "Sets text/data of widget",null,{tags:["basic"]});

    MorphText.prototype.testData = function () {
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        this.text(alphabet.join(""));
        function shuffle(array) {
            var m = array.length, t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
        var context = this;
        setInterval(function () {
            var randomAlphabet = shuffle(alphabet)
                .slice(0, Math.floor(Math.random() * 26))
                .sort()
            ;
            context
                .text(randomAlphabet.join(""))
                .render()
            ;
        }, 1500);
        return this;
    };

    MorphText.prototype._text = MorphText.prototype.text;
    MorphText.prototype.text = function (_) {
        var retVal = MorphText.prototype._text.apply(this, arguments);
        if (arguments.length) {
            var usedChars = {};
            var chars = _.split("");
            this.data(chars.map(function(d) {
                var id = "_" + d;
                if (usedChars[id] === undefined) {
                    usedChars[id] = 0;
                }
                usedChars[id]++;
                return {text: d, id: d.charCodeAt(0) + (1024 * usedChars[id])};
            }));
        }
        return retVal;
    };

    MorphText.prototype.enter = function (domNode, element) {
        if (!this.fontSize()) {
            var style = window.getComputedStyle(domNode, null);
            this.fontSize(parseInt(style.fontSize));
        }
        this._fontWidth = this.fontSize() * 32 / 48;
        this._textElement = element.append("g")
        ;
    };

    MorphText.prototype.dateTime = function () {
        var d = new Date(),
            seconds = d.getSeconds().toString().length === 1 ? "0" + d.getSeconds() : d.getSeconds(),
            minutes = d.getMinutes().toString().length === 1 ? "0" + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length === 1 ? "0" + d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? "pm" : "am",
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + ampm;
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
            .attr("font-size", this.fontSize())
            .attr("dy", ".35em")
            .attr("y", (this.reverse() ? +1 : -1) * this._fontWidth * 2)
            .attr("x", function (d, i) { return (-context._data.length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            .style("fill-opacity", 1e-6)
            .style("text-anchor", this.anchor())
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
            .attr("y", (this.reverse() ? -1 : +1) * this._fontWidth * 2)
            .style("fill-opacity", 1e-6)
            .remove()
        ;
    };

    return MorphText;
}));
