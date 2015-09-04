var body = document.getElementById("body");
var mainDiv = document.getElementById("main");
var dataAnalyst;

require(
    [
        "src/layout/Border", "src/layout/Grid", "src/layout/Tabbed",
        "src/form/Form", "src/form/Input", "src/form/TextArea",
        "src/common/Database", "src/common/Utility",
        "src/chart/Summary", "src/chart/Column", "src/chart/Line", "src/chart/Pie",
        "src/other/Table", "src/other/Comms",
        "src/map/ChoroplethStates",
        "src/c3chart/Gauge",
        "./DataAnalyst/sample_breach"
    ],
    function (Border, Grid, Tabbed,
        Form, Input, TextArea,
        Database, Utility,
        Summary, Column, Line, Pie,
        Table, Comms,
        ChoroplethStates,
        Gauge, 
        sample_breach) {
    var loading = "...loading...";

    function Dashboard(db, filters, series, aggregates) {
        Grid.call(this);
        this._db = db.clone();
        this._filter = {};

        var row = 0;
        var col = 0;

        var rows = Math.floor(Math.sqrt(filters.length));
        var cols = Math.floor(filters.length / rows);
        var remainder = filters.length % rows;
        var inputArray = [];

        var context = this;
        filters.forEach(function (filter) {
            if (col >= cols) {
                ++row;
                col = 0;
            }

            var field = this._db.fieldByLabel(filter);
            var dedupInfo = this._db.analyse([field.idx])[0];
            var widget = null;

            if (field.isUSState) {
                widget = new ChoroplethStates().columns([filter, "Rows"]);
            } else if (field.isDateTime || field.isDate) {
                widget = new Line().columns([filter, "Rows"]).xAxisTypeTimePattern(field.isDateTime || field.isDate);
            } else if (dedupInfo.length < 10) {
                var max = d3.max(dedupInfo, function (d) { return d.key.length; });
                if (max > 10) {
                    widget = new Column()
                        .columns([filter, "Rows"])
                        .orientation("vertical")
                    ;
                } else {
                    widget = new Pie().columns([filter, "Rows"]);
                }
            } else if (dedupInfo.length < 50) {
                widget = new Column().columns([filter, "Rows"]);
            }
            if (widget) {
                widget
                    .on("click", function (row, col, selected) {
                        for (var key in row) {
                            if (selected) {
                                context._filter[key] = row[key];
                            } else {
                                delete context._filter[key];
                            }
                            break;
                        }
                        context.refresh(this);
                    })
                ;
                widget.__hpcc_field = filter;
                widget.__hpcc_aggregate = null;
                this.setContent(row, col++, widget, filter);
            }

            inputArray.push(new Input().label(filter).name(filter))
        }, this);

        if (series.length && aggregates.length) {
            var field = this._db.fieldByLabel(series[0]);
            var sumBy = this._db.fieldByLabel(aggregates[0]);
            //var dedupInfo = this._db.rollup([field.idx], function (leaves) {
            //    return d3.sum(leaves, function (d) { return d[sumBy.idx]; });
            //});
            this._seriesChart = new Line()
                .columns([series[0], aggregates[0]])
                .xAxisOverlapMode("none")
                .xAxisType("time")
                .xAxisTypeTimePattern(field.isDateTimeFormat)
                .yAxisType("pow")
                .yAxisTypePowExponent(0.3)
                .interpolate("cardinal")
                    .on("click", function (row, col, selected) {
                        for (var key in row) {
                            if (selected) {
                                context._filter[key] = row[key];
                            } else {
                                delete context._filter[key];
                            }
                            break;
                        }
                        context.refresh(this);
                    })
            //.data(Utility.multiSort(dedupInfo.map(function (row) { return [row.key, row.values]; }), [{ idx: 0 }]))
            ;
            this._seriesChart.__hpcc_field = series[0];
            this._seriesChart.__hpcc_aggregate = function (db) {
                var dedupInfo = db.rollup([field.idx], function (leaves) {
                    return d3.sum(leaves, function (d) { return d[sumBy.idx]; });
                });
                return Utility.multiSort(dedupInfo.map(function (row) {
                    return [row.key, row.values];
                }), [{ idx: 0 }]);
            };
            this.setContent(row + 1, 0, this._seriesChart, series[0] + " / " + aggregates[0], 1, cols);
        }

        this._form = new Form()
            .omitBlank(true)
            .inputs(inputArray)
            .on("submit", function (values) {
                context._filter = values;
                context.refresh();
            })
            .on("clear", function (values) {
                context._filter = {};
                context.refresh();
            })
        ;
        //this.setContent(0, cols, this._form, "Filter", row + 1);
        this.refresh();
    };
    Dashboard.prototype = Object.create(Grid.prototype);
    Dashboard.prototype.constructor = Dashboard;

    Dashboard.prototype.refresh = function (clickWidget) {
        this.content().forEach(function (_widget) {
            var widget = _widget.widget();
            if (widget !== clickWidget && widget !== this._form) {
                var filter = {};
                for (var key in this._filter) {
                    if (key !== widget.__hpcc_field) {
                        filter[key] = this._filter[key];
                    }
                }
                var db = this._db.filter(filter);
                if (widget.__hpcc_aggregate) {
                    widget.data(widget.__hpcc_aggregate(db));
                } else {
                    var field = db.fieldByLabel(widget.__hpcc_field);
                    var dedupInfo = db.analyse([field.idx])[0];
                    widget.data(dedupInfo.map(function (row) { return [row.key, row.values]; }));
                }
            }
        }, this);
        this._form.values(this._filter);
        this.render();
    };

    function DataAnalyst() {
        Tabbed.call(this);

        this._db = new Database.Grid();
        this._db.jsonObj(sample_breach);
        this._dashID = 0;
        var context = this;
        var testData = loading;
        //  Input  ---
        this._inputTSV = new TextArea()
            .value(testData)
            .on("change", function (widget) {
                context.doDataChanged(widget);
            })
        ;
        this._inputCSV = new TextArea()
            .value(testData)
            .on("change", function (widget) {
                context.doDataChanged(widget);
            })
        ;
        this._inputJSON = new TextArea()
            .value(testData)
            .on("change", function (widget) {
                context.doDataChanged(widget);
            })
        ;
        this._inputWU = new Form()
            .inputs([
                new Input()
                    .name("url")
                    .label("URL")
                    .type("textbox")
                    .value("http://localhost:8010"),
                new Input()
                    .name("wuid")
                    .label("Workunit")
                    .type("textbox")
                    .value("W20150413-111703"),
                new Input()
                    .name("resultname")
                    .label("Result Name")
                    .type("textbox")
                    .value("Result 1"),
                new Input()
                    .name("_count")
                    .label("Max Row Count")
                    .type("number")
                    .value("10000")
            ])
            .on("click", function (d) {
                context.doClear();
                context._analysis
                    .moreText("...downloading...")
                    .valueIcon("fa-cloud-download")
                    .data("...")
                    .render()
                ;
                var connection = new Comms.WsWorkunits();
                connection.fetchResult(d, function (response) {
                    context.doDataChanged(context._inputWU, response);
                });
            })
        ;
        this._inputTable = new Table()
            .fixedHeader(false)
            .pagination(true)
        ;
        this._inputSheet = new Tabbed()
            .addTab(this._inputTSV, "Input (TSV)")
            .addTab(this._inputCSV, "Input (CSV)")
            .addTab(this._inputJSON, "Input (JSON)")
            .addTab(this._inputWU, "Input (WU)")
            .addTab(this._inputTable, "Input (parsed)")
            .on("click", function (widget, column, idx) {
                context.doDataTabChanged(widget);
            })
        ;

        //  Summary  ---
        this._analysis = new Summary()
            .moreText("Analysis")
            .valueIcon("fa-gears")
            .fixedSize(false)
            .render()
        ;
        this._colSummary = new Summary()
            .moreText("Total Columns")
            .valueIcon("fa-table")
            .colorFill("#00cc66")
            .fixedSize(false)
        ;
        this._rowSummary = new Summary()
            .moreText("Total Rows")
            .valueIcon("fa-align-justify")
            .colorFill("#efd752")
            .fixedSize(false)
        ;
        this._inputFilters = new TextArea();
        this._inputSeries = new TextArea();
        this._inputAggregates = new TextArea();
        this._inputGenerate = new Input()
            .type("button")
            .value("Generate Dashboard")
            .on("click", function (d) {
                var grid = new Dashboard(context._db, JSON.parse(context._inputFilters.value()), JSON.parse(context._inputSeries.value()), JSON.parse(context._inputAggregates.value()));
                context.addTab(grid, "Dash-" + ++context._dashID, true).render();
            })
        ;
        this._summary = new Grid()
            .fitTo("width")
            //.cellPadding(0)
            .setContent(0, 0, this._analysis, "", 2, 3)
            .setContent(2, 0, this._colSummary, "", 2, 3)
            .setContent(4, 0, this._rowSummary, "", 2, 3)
            .setContent(6, 0, this._inputGenerate, "", 1, 3)
            .setContent(7, 0, this._inputFilters, "Filters", 1, 3)
            .setContent(8, 0, this._inputSeries, "Series", 1, 3)
            .setContent(9, 0, this._inputAggregates, "Aggregates", 1, 3)
        ;

        //  Analysis  ---
        this._dupChart = new Column()
            .orientation("vertical")
            .on("click", function (row, col) {
                var field = context._db.fields()[row.__lparam.idx];
                var props = [];
                for (var key in field) {
                    props.push([key, "" + field[key]]);
                }
                props.push(["Unique Records", row.__lparam.analysis.length])
                context._fieldSummary
                    .fixedColumn(true)
                    .data(props)
                    .render()
                ;
                context._dupTable
                    .data([[loading, ""]])
                    .render()
                ;
                setTimeout(function () {
                    context._dupTable
                        .pagination(row.__lparam.analysis.length > 200)
                        .data(row.__lparam.analysis.map(function (d, idx) { return [d.key, d.values]; }))
                        .sort(0)
                        .render()
                    ;
                }, 0)
            })
        ;

        this._fieldSummary = new Table()
            .fixedHeader(true)
            .fixedColumn(false)
            .pagination(false)
            .columns(["Property", "Value"])
            .data([["", ""]])
        ;

        this._dupTable = new Table()
            .fixedHeader(false)
            .pagination(true)
            .adjacentPages(1)
            .columns(["Field", "Count"])
            .data([["", ""]])
        ;

        //  Layout  ---
        this._frame = new Grid()
            .setContent(0, 0, this._inputSheet, "", 3, 12)
            .setContent(3, 0, this._dupChart, "Value Duplication %", 5, 8)
            .setContent(3, 8, this._fieldSummary, "", 2, 4)
            .setContent(5, 8, this._dupTable, "", 3, 4)
        ;

        var border = new Border()
            .setContent("center", this._frame)
            .setContent("right", this._summary)
            .rightSize(240)
            .rightPercentage(0)
        ;

        this
            .target("main")
            .addTab(border, "Analysis")
        ;
    }
    DataAnalyst.prototype = Object.create(Tabbed.prototype);
    DataAnalyst.prototype.constructor = DataAnalyst;

    DataAnalyst.prototype.resetProgress = function (total) {
        total = total || 1;
        this._progressTotal = total;
        this._progress = -1;
    }

    DataAnalyst.prototype.incProgress = function () {
        this._analysis
            .moreText("Analysis")
            .valueIcon("fa-gears")
            .data(parseInt(++this._progress * 100 / this._progressTotal) + "%")
            .render()
        ;
    }

    DataAnalyst.prototype.doClear = function () {
        this.resetProgress();
        this._inputTable.columns([]).data([]);
        this._rowSummary.data("").render();
        this._colSummary.data("").render();
        this._dupChart.data([]).render();
        this._fieldSummary.fixedColumn(false).data([["", ""]]).render();
        this._dupTable.data([["", ""]]).render();
        this._inputFilters.value("").render();
        this._inputSeries.value("").render();
        this._inputAggregates.value("").render();
    }

    DataAnalyst.prototype.doDataTabChanged = function (srcWidget) {
        switch (srcWidget) {
            case this._inputTSV:
                if (srcWidget.value() === loading) {
                    srcWidget.value(this._db.tsv());
                }
                break;
            case this._inputCSV:
                if (srcWidget.value() === loading) {
                    srcWidget.value(this._db.csv());
                }
                break;
            case this._inputJSON:
                if (srcWidget.value() === loading) {
                    srcWidget.value(this._db.json());
                }
                break;
        }
    };

    DataAnalyst.prototype.doDataChanged = function (srcWidget, response) {
        srcWidget = srcWidget || this._inputTSV;
        this.doClear();
        this.incProgress();
        switch(srcWidget) {
            case this._inputTSV:
                this._db.tsv(srcWidget.value());
                this._inputCSV.value(loading);
                this._inputJSON.value(loading);
                break;
            case this._inputCSV:
                this._db.csv(srcWidget.value());
                this._inputTSV.value(loading);
                this._inputJSON.value(loading);
                break;
            case this._inputJSON:
                this._db.json(srcWidget.value());
                this._inputCSV.value(loading);
                this._inputTSV.value(loading);
                break;
            case this._inputWU:
                this._db.jsonObj(response.map(function(d) {if (d.__fileposition__) delete d.__fileposition__; return d; }));
                this._inputTSV.value(loading);
                this._inputCSV.value(loading);
                this._inputTSV.value(loading);
        }
        this._inputTable
            .columns(this._db.legacyColumns())
            .data(this._db.legacyData())
        ;
        this._rowSummary.data(d3.format(".2s")(this._db.length() - 1)).render();
        this._colSummary.data(this._db.width()).render();

        this.resetProgress(this._db.width());
        var i = 0;
        this.dupScoreMap = {};
        var dupScore = [];
        var filters = [];
        var series = [];
        var aggregates = [];
        var context = this;
        var interval = setInterval(function () {
            if (i < context._db.width()) {
                var dedupDB = [];
                var column = context._db.row(0)[i];
                dedupDB[i] = context._db.analyse([i])[0];
                dupScore.push([column, (100 - ((dedupDB[i].length - 1) * 100 / context._db.length())).toFixed(2), { idx: i, analysis: dedupDB[i] }]);
                context.dupScoreMap[column] = dedupDB[i];
                context.incProgress();
                var field = context._db.fields()[i];
                if (dedupDB[i].length > 1 && dedupDB[i].length <= 32 || field.isUSState) {
                    filters.push(column);
                } else if (field.isDateTime || field.isDate) {
                    series.push(column);
                } else if (dedupDB[i].length > 1 && field.isNumber) {
                    aggregates.push(column);
                }
                ++i;
            } else {
                clearInterval(interval);
                context._dupChart
                    .columns(["Column", "Score"])
                    .data(dupScore.sort(function (l, r) { return l[1] - r[1]; }))
                    .render()
                ;
                context._inputFilters.value(JSON.stringify(filters)).render();
                context._inputSeries.value(JSON.stringify(series)).render();
                context._inputAggregates.value(JSON.stringify(aggregates)).render();

                context.incProgress();
            }
        }, 0);
    }

    DataAnalyst.prototype.doResize = DataAnalyst.prototype.debounce(function () {
        mainDiv.style.width = window.innerWidth - 16 + "px";
        mainDiv.style.height = window.innerHeight - 16 + "px";
        this
            .resize()
            .render()
        ;
    }, 250)
    dataAnalyst = new DataAnalyst();
    dataAnalyst.doResize();
    dataAnalyst.doDataTabChanged(dataAnalyst._inputTSV);
    dataAnalyst.doDataChanged();
});
function doResize() {
    if (dataAnalyst) {
        dataAnalyst.doResize();
    }
}
