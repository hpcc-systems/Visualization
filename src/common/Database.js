"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Class", "./PropertyExt", "./Utility"], factory);
    } else {
        root.common_Database = factory(root.d3, root.common_Class, root.common_PropertyExt, root.common_Utility);
    }
}(this, function (d3, Class, PropertyExt, Utility) {
    //  Field  ---
    function Field(id) {
        Class.call(this);
        PropertyExt.call(this);

        this._id = id || this._id;
    }
    Field.prototype = Object.create(Class.prototype);
    Field.prototype.constructor = Field;
    Field.prototype.mixin(PropertyExt);
    Field.prototype._class += " common_Database.Field";

    Field.prototype.id = function () {
        return this._id;
    };

    Field.prototype.checksum = function () {
        return Utility.checksum(this.label() + this.type() + this.mask() + this.format());
    };

    Field.prototype.publish("label", "", "string", "Label", null, { optional: true });
    Field.prototype.publish("type", "", "set", "Type", ["", "string", "number", "boolean", "time", "hidden"], { optional: true });
    Field.prototype.publish("mask", "", "string", "Time Mask", null, { disable: function (w) { return w.type() !== "time"; }, optional: true });
    Field.prototype.publish("format", "", "string", "Format", null, { optional: true });

    Field.prototype.typeTransformer = function (_) {
        switch (this.type()) {
            case "number":
                return Number(_);
            case "string":
                return String(_);
            case "boolean":
                return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
            case "time":
            case "date":
                return this.maskTransformer(_);
        }
        return _;
    };

    Field.prototype.maskTransformer = function (_) {
        return this.formatter(this.mask()).parse(String(_));
    };

    Field.prototype.formatTransformer = function (_) {
        return this.formatter(this.format())(_);
    };

    Field.prototype.parse = function (_) {
        if (!_) {
            return _;
        }
        try {
            return this.typeTransformer(_);
        } catch (e) {
            console.log("Unable to parse:  " + _);
            return null;
        }
    };

    Field.prototype.transform = function (_) {
        if (!_) {
            return _;
        }
        try {
            return this.formatTransformer(this.typeTransformer(_));
        } catch (e) {
            console.log("Unable to transform:  " + _);
            return null;
        }
    };

    Field.prototype.clone = function () {
        var context = this;
        var retVal = new Field(this._id);
        cloneProp(retVal, "label");
        cloneProp(retVal, "type");
        cloneProp(retVal, "mask");
        cloneProp(retVal, "format");

        function cloneProp(dest, key) {
            dest[key + "_default"](context[key + "_default"]());
            if (context[key + "_exists"]()) {
                dest[key](context[key]());
            }
        }
        return retVal;
    };

    Field.prototype.formatter = function (format) {
        var retVal;
        if (!format) {
            retVal = function (_) {
                return _;
            };
            retVal.parse = function (_) {
                return _;
            };
            return retVal;
        }
        switch (this.type()) {
            case "time":
            case "date":
                return d3.time.format(format);
        }
        retVal = d3.format(format);
        retVal.parse = function (_) {
            return _;
        };
        return retVal;
    };

    //  Grid  ---
    function Grid(dataChecksum) {
        dataChecksum = dataChecksum || false;
        Class.call(this);
        PropertyExt.call(this);
        this._dataChecksum = dataChecksum;
        this._dataVersion = 0;
        this.clear();
    }
    Grid.prototype = Object.create(Class.prototype);
    Grid.prototype.constructor = Grid;
    Grid.prototype.mixin(PropertyExt);
    Grid.prototype._class += " common_Database.Grid";

    Grid.prototype.publish("fields", [], "propertyArray", "Fields");

    Grid.prototype.clear = function () {
        this.fields([]);
        this._data = [];
        this._dataChecksums = [];
        ++this._dataVersion;
        return this;
    };

    //  Backward compatability  ---
    Grid.prototype.resetColumns = function (_) {
        var fields = this.fields();
        this.legacyColumns([]);
        this.legacyColumns(fields.map(function (field) {
            return field.label();
        }));
    };

    Grid.prototype.legacyColumns = function (_, asDefault) {
        if (!arguments.length) return this.row(0);
        this.row(0, _, asDefault);
        return this;
    };

    Grid.prototype.legacyData = function (_, clone) {
        return Grid.prototype.data.apply(this, arguments);
    };

    //  Meta  ---
    Grid.prototype.field = function (idx) {
        return this.fields()[idx];
    };

    var fieldsOrig = Grid.prototype.fields;
    Grid.prototype.fields = function (_, clone) {
        if (!arguments.length) return fieldsOrig.apply(this, arguments);
        return fieldsOrig.call(this, clone ? _.map(function (d) { return d.clone(); }) : _);
    };

    Grid.prototype.fieldByLabel = function (_, ignoreCase) {
        return this.fields().filter(function (field, idx) { field.idx = idx; return ignoreCase ? field.label().toLowerCase() === _.toLowerCase() : field.label() === _; })[0];
    };

    Grid.prototype.data = function (_, clone) {
        if (!arguments.length) return this._data;
        this._data = clone ? _.map(function (d) { return d.map(function (d2) { return d2; }); }) : _;
        this._dataCalcChecksum();
        return this;
    };

    Grid.prototype.parsedData = function () {
        var context = this;
        return this._data.map(function (row) {
            return row.map(function (cell, idx) {
                return context.fields()[idx].parse(cell);
            });
        });
    };

    Grid.prototype.formattedData = function () {
        var context = this;
        return this._data.map(function (row) {
            return row.map(function (cell, idx) {
                return context.fields()[idx].transform(cell);
            });
        });
    };

    Grid.prototype.fieldsChecksum = function () {
        return Utility.checksum(this.fields().map(function (field) { return field.checksum(); }));
    };

    Grid.prototype.dataChecksum = function () {
        return Utility.checksum(this._dataChecksum ? this._dataChecksums : this._dataVersion);
    };

    Grid.prototype.checksum = function () {
        return Utility.checksum([this.dataChecksum(), this.fieldsChecksum()]);
    };

    //  Row Access  ---
    Grid.prototype._dataCalcChecksum = function (idx) {
        ++this._dataVersion;
        if (this._dataChecksum) {
            if (arguments.length) {
                this._dataChecksums[idx] = Utility.checksum(this._data[idx]);
            } else {
                this._dataChecksums = this._data.map(function (row) { return Utility.checksum(row); });
            }
        }
        return this;
    };

    Grid.prototype.row = function (row, _, asDefault) {
        if (arguments.length < 2) return row === 0 ? this.fields().map(function (d) { return d.label(); }) : this._data[row - 1];
        if (row === 0) {
            var fieldsArr = this.fields();
            this.fields(_.map(function (label, idx) {
                if (asDefault) {
                    return (fieldsArr[idx] || new Field()).label_default(label);
                } else {
                    return (fieldsArr[idx] || new Field()).label(label);
                }
            }, this));
        } else {
            this._data[row - 1] = _;
            this._dataCalcChecksum(row - 1);
        }
        return this;
    };

    Grid.prototype.rows = function (_) {
        if (!arguments.length) return [this.row(0)].concat(this._data);
        this.row(0, _[0]);
        this._data = _.filter(function (row, idx) { return idx > 0; });
        this._dataCalcChecksum();
        return this;
    };

    //  Column Access  ---
    Grid.prototype.column = function (col, _) {
        if (arguments.length < 2) return [this.fields()[col].label()].concat(this._data.map(function (row, idx) { return row[col]; }));
        _.forEach(function (d, idx) {
            if (idx === 0) {
                this.fields()[col] = new Field().label(_[0]);
            } else {
                this._data[idx - 1][col] = d;
                this._dataCalcChecksum(idx - 1);
            }
        }, this);
        return this;
    };

    Grid.prototype.columnData = function (col, _) {
        if (arguments.length < 2) return this._data.map(function (row, idx) { return row[col]; });
        _.forEach(function (d, idx) {
            this._data[idx][col] = d;
            this._dataCalcChecksum(idx);
        }, this);
        return this;
    };

    Grid.prototype.columns = function (_) {
        if (!arguments.length) return this.fields().map(function (col, idx) {
            return this.column(idx);
        }, this);
        _.forEach(function (col, idx) {
            this.column(idx, _[idx]);
        }, this);
        return this;
    };

    //  Cell Access  ---
    Grid.prototype.cell = function (row, col, _) {
        if (arguments.length < 3) return this.row(row)[col];
        if (row === 0) {
            this.fields()[col] = new Field().label(_);
        } else {
            this._data[row][col] = _;
            this._dataCalcChecksum(row);
        }
        return this;
    };

    //  Grid Access  ---
    Grid.prototype.grid = function (_) {
        return Grid.prototype.rows.apply(this, arguments);
    };

    //  Hipie Helpers  ---
    Grid.prototype.hipieMapSortArray = function (sort) {
        return sort.map(function (sortField) {
            var reverse = false;
            if (sortField.indexOf("-") === 0) {
                sortField = sortField.substring(1);
                reverse = true;
            }
            var field = this.fieldByLabel(sortField, true);
            if (!field) {
                console.log("Grid.prototype.hipieMapSortArray:  Invalid sort array - " + sortField);
            }
            return {
                idx: field ? field.idx : -1,
                reverse: reverse
            };
        }, this).filter(function(d) { return d.idx >= 0; });
    };

    Grid.prototype.hipieMappings = function (columns, missingDataString) {
        missingDataString = missingDataString || "";
        if (!this.fields().length || !this._data.length) {
            return [];
        }
        var mappedColumns = [];
        var hasRollup = false;
        columns.forEach(function (mapping, idx) {
            var mappedColumn = {
                groupby: false,
                func: "",
                params: []
            };
            if (mapping.hasFunction()) {
                mappedColumn.func = mapping.function();
                if (mappedColumn.func === "SCALE") {
                    mappedColumn.groupby = true;
                } else {
                    hasRollup = true;
                }

                mapping.params().forEach(function (param) {
                    var field = this.fieldByLabel(param, true);
                    mappedColumn.params.push(field ? field.idx : -1);
                }, this);
            } else {
                mappedColumn.groupby = true;
                var field = this.fieldByLabel(mapping.id(), true);
                mappedColumn.params.push(field ? field.idx : -1);
            }
            mappedColumns.push(mappedColumn);
        }, this);

        if (hasRollup) {
            var retVal = [];
            this.rollup(mappedColumns.filter(function (mappedColumn) {
                return mappedColumn.groupby === true;
            }).map(function (d) {
                return d.params[0];
            }), function (leaves) {
                var row = mappedColumns.map(function (mappedColumn) {
                    var param1 = mappedColumn.params[0];
                    var param2 = mappedColumn.params[1];
                    switch (mappedColumn.func) {
                        case "SUM":
                            return d3.sum(leaves, function (d) { return d[param1]; });
                        case "AVE":
                            return d3.mean(leaves, function (d) { return d[param1] / d[param2]; });
                        case "MIN":
                            return d3.min(leaves, function (d) { return d[param1]; });
                        case "MAX":
                            return d3.max(leaves, function (d) { return d[param1]; });
                        case "SCALE":
                            console.log("Unexpected function:  " + mappedColumn.func);
                            //  All leaves should have the same values, use mean just in case they don't?  
                            return d3.mean(leaves, function (d) { return d[param1] / +param2; });
                    }
                    //  All leaves should have the same value.
                    return leaves[0][param1];
                });
                retVal.push(row);
                return row;
            });
            return retVal;
        } else {
            return this._data.map(function (row) {
                return mappedColumns.map(function (mappedColumn) {
                    var param1 = mappedColumn.params[0];
                    var param2 = mappedColumn.params[1];
                    switch (mappedColumn.func) {
                        case "SCALE":
                            return row[param1] / +param2;
                        case "SUM":
                        case "AVE":
                        case "MIN":
                        case "MAX":
                            console.log("Unexpected function:  " + mappedColumn.func);
                    }
                    return row[param1];
                });
            });
        }
    };

    //  Views  ---
    function LegacyView(grid) {
        this._grid = grid;
        d3.rebind(this, this._grid, "checksum", "fields");
    }
    LegacyView.prototype.constructor = LegacyView;

    LegacyView.prototype.grid = function () {
        return this._grid;
    };
    LegacyView.prototype.columns = function (_) {
        if (!arguments.length) return this._grid.legacyColumns();
        this._grid.legacyColumns(_);
        return this;
    };
    LegacyView.prototype.rawData = function (_) {
        if (!arguments.length) return this._grid.legacyData();
        this._grid.legacyData(_);
        return this;
    };
    LegacyView.prototype.formattedData = function () {
        if (this._formattedDataChecksum !== this._grid.checksum()) {
            this._formattedDataChecksum = this._grid.checksum();
            this._formattedData = this._grid.formattedData();
        }
        return this._formattedData;
    };
    LegacyView.prototype.parsedData = function () {
        if (this._parsedDataChecksum !== this._grid.checksum()) {
            this._parsedDataChecksum = this._grid.checksum();
            this._parsedData = this._grid.parsedData();
        }
        return this._parsedData;
    };
    LegacyView.prototype._whichData = function (opts) {
        if (opts) {
            if (opts.parsed) {
                return this.formattedData();
            } else if (opts.formatted) {
                return this.formattedData();
            }
        }
        return this.rawData();
    };
    LegacyView.prototype.data = function (_) {
        return LegacyView.prototype.rawData.apply(this, arguments);
    };

    function RollupView(grid, columns, rollup) {
        LegacyView.call(this, grid);
        if (!(columns instanceof Array)) {
            columns = [columns];
        }
        this._columnIndicies = columns.filter(function (column) { return column; }).map(function (column) {
            switch (typeof column) {
                case "string":
                    return this._grid.fieldByLabel(column).idx;
            }
            return column;
        }, this);

        rollup = rollup || function (d) { return d; };
        this._rollup = rollup;
    }
    RollupView.prototype = Object.create(LegacyView.prototype);
    RollupView.prototype.constructor = RollupView;

    RollupView.prototype.nest = function () {
        if (this._nestChecksum !== this._grid.checksum()) {
            this._nestChecksum = this._grid.checksum();

            var nest = d3.nest();
            this._columnIndicies.forEach(function (idx) {
                nest.key(function (d) {
                    return d[idx];
                });
            });
            this._nest = nest
                .rollup(this._rollup)
            ;
        }
        return this._nest;
    };
    RollupView.prototype.entries = function (opts) {
        return this.nest().entries(this._whichData(opts));
    };
    RollupView.prototype.map = function (opts) {
        return this.nest().map(this._whichData(opts));
    };
    RollupView.prototype.d3Map = function (opts) {
        return this.nest().map(this._whichData(opts), d3.map);
    };
    RollupView.prototype._walkData = function (entries, prevRow) {
        prevRow = prevRow || [];
        var retVal = [];
        entries.forEach(function (entry) {
            if (entry instanceof Array) {
                retVal.push(prevRow.concat([entry]));
            } else {
                retVal = retVal.concat(this._walkData(entry.values, prevRow.concat([entry.key])));
            }
        }, this);
        return retVal;
    };
    RollupView.prototype.data = function (opts) {
        return this._walkData(this.entries(opts));
    };

    Grid.prototype.legacyView = function () {
        return new LegacyView(this);
    };

    Grid.prototype.nestView = function (columnIndicies) {
        return new RollupView(this, columnIndicies);
    };

    Grid.prototype.rollupView = function (columnIndicies, rollupFunc) {
        return new RollupView(this, columnIndicies, rollupFunc);
    };

    Grid.prototype.aggregateView = function (columnIndicies, aggrType, aggrColumn, aggrDeltaColumn) {
        var context = this;
        return new RollupView(this, columnIndicies, function (values) {
            switch (aggrType) {
                case null:
                case undefined:
                case "":
                    values.aggregate = values.length;
                    return values;
                default:
                    var columns = context.legacyColumns();
                    var colIdx = columns.indexOf(aggrColumn);
                    var deltaIdx = columns.indexOf(aggrDeltaColumn);
                    values.aggregate = d3[aggrType](values, function (value) {
                        return (+value[colIdx] - (deltaIdx >= 0 ? +value[deltaIdx] : 0)) / (deltaIdx >= 0 ? +value[deltaIdx] : 1);
                    });
                    return values;
            }
        });
    };

    //  Nesting  ---
    Grid.prototype._nest = function (columnIndicies, rollup) {
        if (!(columnIndicies instanceof Array)) {
            columnIndicies = [columnIndicies];
        }
        var stableSort = [];
        var nest = d3.nest();
        nest.key(function (d) {
            var retVal = "";
            columnIndicies.forEach(function (idx) {
                retVal += d[idx];
            });
            stableSort.push(retVal);
            return retVal;
        }).sortKeys(function (l, r) {
            return stableSort.indexOf(l) - stableSort.indexOf(r);
        });
        return nest;
    };

    Grid.prototype.nest = function (columnIndicies) {
        return this._nest(columnIndicies)
            .entries(this._data)
        ;
    };

    Grid.prototype.rollup = function (columnIndicies, rollup) {
        return this._nest(columnIndicies)
            .rollup(rollup)
            .entries(this._data)
        ;
    };

    //  Util  ---
    Grid.prototype.length = function () {
        return this._data.length + 1;
    };

    Grid.prototype.width = function () {
        return this.fields().length;
    };

    Grid.prototype.pivot = function () {
        this.resetColumns();
        this.rows(this.columns());
        return this;
    };

    Grid.prototype.clone = function (deep) {
        return new Grid()
            .fields(this.fields(), deep)
            .data(this.data(), deep)
        ;
    };

    Grid.prototype.filter = function (filter) {
        var filterIdx = {};
        this.row(0).forEach(function(col, idx) {
            filterIdx[col] = idx;
        });
        return new Grid()
            .fields(this.fields(), true)
            .data(this.data().filter(function (row) {
                for (var key in filter) {
                    if (filter[key] !== row[filterIdx[key]]) {
                        return false;
                    }
                }
                return true;
            }))
        ;
    };

    var lastFoundFormat = null;
    Grid.prototype.analyse = function (columns) {
        if (!(columns instanceof Array)) {
            columns = [columns];
        }
        var retVal = [];
        columns.forEach(function (col) {
            var rollup = this.rollup(col, function (leaves) {
                return leaves.length;
            });
            retVal.push(rollup);
            var keys = rollup.map(function (d) { return d.key; });
            this.fields()[col].isBoolean = typeTest(keys, isBoolean);
            this.fields()[col].isNumber = typeTest(keys, isNumber);
            this.fields()[col].isString = !this.fields()[col].isNumber && typeTest(keys, isString);
            this.fields()[col].isUSState = this.fields()[col].isString && typeTest(keys, isUSState);
            this.fields()[col].isDateTime = this.fields()[col].isString && typeTest(keys, isDateTime);
            this.fields()[col].isDateTimeFormat = lastFoundFormat;
            this.fields()[col].isDate = !this.fields()[col].isDateTime && typeTest(keys, isDate);
            this.fields()[col].isDateFormat = lastFoundFormat;
            this.fields()[col].isTime = this.fields()[col].isString && !this.fields()[col].isDateTime && !this.fields()[col].isDate && typeTest(keys, isTime);
            this.fields()[col].isTimeFormat = lastFoundFormat;
        }, this);
        return retVal;
    };

    //  Import/Export  ---
    Grid.prototype.jsonObj = function (_) {
        if (!arguments.length) return this._data.map(function (row) {
            var retVal = {};
            this.row(0).forEach(function (col, idx) {
                retVal[col] = row[idx];
            });
            return retVal;
        }, this);
        this.clear();
        this.data(_.map(function (row, idx) {
            var retVal = [];
            for (var key in row) {
                var colIdx = this.row(0).indexOf(key);
                if (colIdx < 0) {
                    colIdx = this.fields().length;
                    this.fields().push(new Field().label(key));
                }
                retVal[colIdx] = row[key];
            }
            return retVal;
        }, this));
        return this;
    };

    Grid.prototype.json = function (_) {
        if (!arguments.length) return JSON.stringify(this.jsonObj(), null, "  ");
        this.jsonObj(JSON.parse(_));
        return this;
    };

    Grid.prototype.csv = function (_) {
        if (!arguments.length) return d3.csv.formatRows(this.grid());
        this.jsonObj(d3.csv.parse(_));
        return this;
    };

    Grid.prototype.tsv = function (_) {
        if (!arguments.length) return d3.tsv.formatRows(this.grid());
        this.jsonObj(d3.tsv.parse(_));
        return this;
    };

    //  --- --- ---
    function typeTest(cells, test) {
        if (!(cells instanceof Array)) {
            cells = [cells];
        }
        return cells.filter(function (d) { return d !== ""; }).every(test);
    }
    function isBoolean(cell) {
        return typeof cell === "boolean";
    }
    function isNumber(cell) {
        return typeof cell === "number" || !isNaN(cell);
    }
    function isString(cell) {
        return typeof cell === "string";
    }
    var dateTimeFormats = [
    ];
    var dateFormats = [
        "%Y-%m-%d",
        "%Y%m%d",
    ];
    var timeFormats = [
        "%H:%M:%S.%LZ",
        "%H:%M:%SZ",
        "%H:%M:%S"
    ];
    dateFormats.forEach(function(d) {
        timeFormats.forEach(function(t) {
            dateTimeFormats.push(d + "T" + t);
        });
    });
    function formatPicker(formats, cell) {
        for (var i = 0; i < formats.length; ++i) {
            var date = d3.time.format(formats[i]).parse(cell);
            if (date) {
                lastFoundFormat = formats[i];
                return formats[i];
            }
        }
        return null;
    }
    function isDateTime(cell) {
        return formatPicker(dateTimeFormats, cell);
    }
    function isDate(cell) {
        return formatPicker(dateFormats, cell);
    }
    function isTime(cell) {
        return formatPicker(timeFormats, cell);
    }
    function isUSState(cell) {
        return ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AS", "DC", "FM", "GU", "MH", "MP", "PW", "PR", "VI"].indexOf(String(cell).toUpperCase()) >= 0;
    }

    return {
        Field: Field,
        Grid: Grid
    };
}));
