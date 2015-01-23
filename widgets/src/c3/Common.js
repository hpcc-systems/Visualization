(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "c3/c3", "../common/HTMLWidget", "../common/Palette", "../chart/I2DChart", "css!c3/c3"], factory);
    } else {
        root.Pie = factory(root.d3, root.c3, root.HTMLWidget, root.Palette, root.I2DChart);
    }
}(this, function (d3, c3, HTMLWidget, Palette, I2DChart) {
    function Common(target) {
        HTMLWidget.call(this);
        I2DChart.call(this);
        this.d3Color = Palette.ordinal("category20");

        this._tag = "div";
        this._class = "Common";
        this._type = "unknown";
        var context = this;
        this._config = {
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        centered: true,
                        multiline: false
                    }
                }
            },
            legend: {
                position: 'bottom',
                show: true
            },
            color: {
                pattern: d3.scale.category20().range()
            },
            data: {
                columns: [],
                rows: [],
                onclick: function (d, element) {
                    context.click(context.rowToObj(context._data[d.index]), d.x ? d.id : context._columns[1]);
                }
            }
        };
    };
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype.implements(I2DChart.prototype);

    Common.prototype.d3Color = Palette.ordinal("category20");

    Common.prototype.type = function (_) {
        if (!arguments.length) return this._type;
        this._type = _;
        return this;
    };

    Common.prototype.getC3Series = function() {
        return this._columns.filter(function (d, i) { return i > 0;});
    };
 
    Common.prototype.getC3Rows = function () {
        var retVal = [this._columns.filter(function (item, idx) { return idx > 0; })].concat(this._data.map(function (row) {
            return row.filter(function (cell, idx) {
                return idx > 0;
            })
        }));
        return retVal;
    };

    Common.prototype.getC3Categories = function () {
        var retVal = this._data.map(function (row, idx) { return row[0]; });
        return retVal;
    };

    Common.prototype.getC3Column = function (colNum) {
        var retVal = [this._columns[colNum]].concat(this._data.map(function (row, idx) { return row[colNum]; }));
        return retVal;
    };

    Common.prototype.getC3Columns = function (total) {
        total = total || this._data.length;
        var retVal = [];
        for (var i = 1; i < total; ++i) {
            retVal.push(this.getC3Column(i));
        }
        return retVal;
    };

    Common.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        this._config.size = {
            width: this.width(),
            height: this.height()
        };
        this._config.data.type = this._type;
        this.c3Chart = c3.generate(this._config);
        element.node().appendChild(this.c3Chart.element);
    };

    Common.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this.c3Chart.resize({
            width: this.width(),
            height: this.height()
        });
    };

    return Common;
}));
