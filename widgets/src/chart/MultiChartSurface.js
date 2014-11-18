﻿(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/ResizeSurface", "./I2DChart", "./Pie", "./Bar", "./Line", "./Bubble", "../other/Table", "../google/Pie", "../other/WordCloud", "../common/Palette"], factory);
    } else {
        root.MultiChartSurface = factory(root.d3, root.ResizeSurface, root.I2DChart, root.Pie, root.Bar, root.Line, root.Bubble, root.Table, root.GPie, root.WordCloud, root.Palette);
    }
}(this, function (d3, ResizeSurface, I2DChart, Pie, Bar, Line, Bubble, Table, GPie, WordCloud, Palette) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        I2DChart.call(this);

        this._title = "MultiChartSurface";

        this._menu
            .data(["PIE", "GOOGLE_PIE", "BUBBLE", "BAR", "LINE", "TABLE", "WORD_CLOUD"])
        ;
        var context = this;
        this._pie = new Pie();
        this._pie.click = function (d) {
            context.click(d);
        }
        this._gpie = new GPie();
        this._gpie.click = function (d) {
            context.click(d);
        }
        this._bar = new Bar();
        this._bar.click = function (d) {
            context.click(d);
        }
        this._line = new Line();
        this._bubble = new Bubble();
        this._bubble.d3Color = this._pie.d3Color;
        this._bubble.click = function (d) {
            context.click(d);
        }
        this._table = new Table()
            .columns(["Label", "Weight"])
        ;
        this._table.click = function (d) {
            context.click(d);
        }
        this._wordCloud = new WordCloud()
        ;
        this._wordCloud.click = function (d) {
            context.click(d);
        }
        this._menu.click = function (d) {
            context.activate(d);
        }
        this._menu.preShowMenu = function () {
            if (context.getContent() && context.getContent()._overlayElement) {
                context.getContent()._parentElement
                    .style("display", "none");
                ;
            }
        }
        this._menu.postHideMenu = function () {
            if (context.getContent() && context.getContent()._overlayElement) {
                context.getContent()._parentElement
                    .style("display", null);
                ;
            }
        }
    };
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.implements(I2DChart.prototype);

    MultiChartSurface.prototype.getContent = function () {
        switch (this._chart) {
            case "PIE":
                return this._pie;
            case "GOOGLE_PIE":
                return this._gpie;
            case "BUBBLE":
                return this._bubble;
            case "BAR":
                return this._bar;
            case "LINE":
                return this._line;
            case "TABLE":
                return this._table;
            case "WORD_CLOUD":
                return this._wordCloud;
        }
        return this._pie;
    };

    MultiChartSurface.prototype.enter = function (domNode, element) {
        this._content = this.getContent();
        ResizeSurface.prototype.enter.apply(this, arguments);
    };

    MultiChartSurface.prototype.activate = function (chart) {
        this._chart = chart;
        if (this._renderCount) {
            var oldContent = this._content;
            var newContent = this.getContent();
            if (newContent === oldContent) {
                return;
            }
            var size = this._container.getBBox();
            this.content(newContent
                .data(this._data.map(function (row) { return { label: row.label, weight: row.weight }; }))
                .size(size)
            );
            if (oldContent) {
                oldContent
                    .data([])
                    .size({ width: 1, height: 1 })
                    .render()
                ;
            }
            this.render();
        }
        return this;
    };

    MultiChartSurface.prototype.data = function (_) {
        var retVal = ResizeSurface.prototype.data.apply(this, arguments);
        if (arguments.length && this.getContent()) {
            this.getContent().data(_.map(function (row) { return { label: row.label, weight: row.weight }; }));
        }
        return retVal;
    };

    return MultiChartSurface;
}));
