"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Class", "./PropertyExt", "./Utility"], factory);
    } else {
        root.common_Database = factory(root.d3, root.common_Class, root.common_PropertyExt, root.common_Utility);
    }
}(this, function (d3, Class, PropertyExt, Utility) {
    //  Field  ---
    function Field(id, opt) {
        Class.call(this);
        PropertyExt.call(this);

        this._id = id || this._id;
        opt = opt || {};
        this.label(opt.label || "");
        this.type(opt.type || "");
        this.mask(opt.mask || null);
        this.format(opt.format || null);
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

    Field.prototype.publish("label", "", "string", "Label");
    Field.prototype.publish("type", "", "set", "Type", ["", "string", "number", "boolean", "time"]);
    var origType = Field.prototype.type;
    Field.prototype.type = function (_) {
        var retVal = origType.apply(this, arguments);
        if (arguments.length) {
            switch (this.type()) {
                case "number":
                    this._typeTransformer = function (_) {
                        return Number(_);
                    };
                    break;
                case "string":
                    this._typeTransformer = function (_) {
                        return String(_);
                    };
                    break;
                case "boolean":
                    this._typeTransformer = function (_) {
                        return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
                    };
                    break;
                case "time":
                case "date":
                    this._typeTransformer = function (_) {
                        return this._maskTransformer.parse(_);
                    };
                    break;
                default:
                    this._typeTransformer = function (_) {
                        return _;
                    };
                    break;
            }
        }
        return retVal;
    };

    Field.prototype.publish("mask", "", "string", "Time Mask");
    var origMask = Field.prototype.mask;
    Field.prototype.mask = function (_) {
        var retVal = origMask.apply(this, arguments);
        if (arguments.length) {
            this._maskTransformer = this.formatter(_);
        }
        return retVal;
    };

    Field.prototype.publish("format", "", "string", "Format");
    var origFormat = Field.prototype.format;
    Field.prototype.format = function (_) {
        var retVal = origFormat.apply(this, arguments);
        if (arguments.length) {
            this._formatTransformer = this.formatter(_);
        }
        return retVal;
    };

    Field.prototype.parse = function (_) {
        if (!_) {
            return _;
        }
        try {
            return this._typeTransformer(_);
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
            return this._formatTransformer(this._typeTransformer(_));
        } catch (e) {
            console.log("Unable to transform:  " + _);
            return null;
        }
    };

    Field.prototype.clone = function () {
        return new Field(this._id, {
            label: this.label(),
            type: this.type(),
            mask: this.mask(),
            format: this.format(),
        });
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
    Grid.prototype.legacyColumns = function (_) {
        if (!arguments.length) return this.row(0);
        this.row(0, _);
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

    Grid.prototype.row = function (row, _) {
        if (arguments.length < 2) return row === 0 ? this.fields().map(function (d) { return d.label(); }) : this._data[row - 1];
        if (row === 0) {
            var fields = d3.map(this.fields(), function (field) { return field.label(); });
            this.fields(_.map(function (label) {
                return fields.get(label) || new Field().label(label);
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

    Grid.prototype.hipieMappings = function (columns) {
        var rollupField = -1;
        var rollupValueIdx = [];
        var rollupBy = [];
        var scaleField = -1;
        var fieldIndicies = [];
        columns.forEach(function (mapping, key) {
            if (mapping instanceof Object) {
                switch (mapping.function) {
                    case "SUM":
                    case "AVE":
                    case "MIN":
                    case "MAX":
                        if (rollupField >= 0) {
                            console.log("Rollup field already exists - there should only be one?");
                        }
                        rollupField = key;
                        mapping.params.forEach(function (params) {
                            var field = this.fieldByLabel(params.param1, true);
                            if (!field) {
                                console.log("Grid.prototype.hipieMappings:  Invalid rollup field - " + params.param1);
                            } else {
                                rollupValueIdx.push(field.idx);
                            }
                        }, this);
                        break;
                    case "SCALE":
                        if (scaleField >= 0) {
                            console.log("Scale field already exists - there should only be one?");
                        }
                        scaleField = key;
                        mapping.params.forEach(function (params) {
                            var field = this.fieldByLabel(params.param1, true);
                            if (!field) {
                                console.log("Grid.prototype.hipieMappings:  Invalid scale field - " + params.param1);
                            } else {
                                var idx = field.idx;
                                var scale = params.param2;
                                fieldIndicies.push(function (row) {
                                    return row[idx] / scale;
                                });
                            }
                        }, this);
                        break;
                    default:
                        console.log("Unknown field function - " + mapping.function);
                }
            } else if (mapping.indexOf("_AVE") === mapping.length - 4 && this.fieldByLabel(mapping.substring(0, mapping.length - 4) + "_SUM", true) && this.fieldByLabel("base_count", true)) {
                //  Symposium AVE Hack
                console.log("Deprecated - Symposium AVE Hack");
                var sumField = this.fieldByLabel(mapping.substring(0, mapping.length - 4) + "_SUM", true);
                var baseCountField = this.fieldByLabel("base_count", true);
                rollupBy.push(sumField.idx);
                fieldIndicies.push(function (row) {
                    return row[sumField.idx] / row[baseCountField.idx];
                });
            } else {
                var field = this.fieldByLabel(mapping, true);
                if (field) {
                    rollupBy.push(field.idx);
                    fieldIndicies.push(function (row) {
                        return row[field.idx];
                    });
                }
            }
        }, this);

        function nodeToRow(node, idx, _row, retVal) {
            var row = _row.map(function (d) { return d; });
            row[idx] = node.key;
            if (node.values instanceof Array) {
                node.values.forEach(function (d) {
                    nodeToRow(d, idx + 1, row, retVal);
                });
            } else {
                row[idx + 1] = node.values;
                retVal.push(row);
            }
        }
        if (rollupField >= 0) {
            var mapping = columns[rollupField];
            var params = [];
            for (var param in mapping.params) {
                params.push(mapping.params[param]);
            }
            var nested = this.rollup(rollupBy, function (leaves) {
                switch (mapping.function) {
                    case "SUM":
                        return d3.sum(leaves, function (d) { return d[rollupValueIdx[0]]; });
                    case "AVE":
                        return d3.mean(leaves, function (d) { return d[rollupValueIdx[0]]; });
                    case "MIN":
                        return d3.min(leaves, function (d) { return d[rollupValueIdx[0]]; });
                    case "MAX":
                        return d3.max(leaves, function (d) { return d[rollupValueIdx[0]]; });
                }
                console.log("Unsupported Mapping Function:  " + mapping.function);
                return 0;
            });
            var retVal = [];
            if (nested instanceof Array) {
                nested.forEach(function (d) {
                    nodeToRow(d, 0, [], retVal);
                });
            } else {
                retVal.push([nested]);
            }
            return retVal;
        } else {
            return this._data.map(function (row) {
                var retVal = [];
                fieldIndicies.forEach(function (func) {
                    retVal.push(func(row));
                });
                return retVal;
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
        this._columnIndicies = columns.map(function (column) {
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
    RollupView.prototype._walkData = function (data, shaper) {
        if (data instanceof Array) {
            return data.map(function (row) {
                if (row.key && row.values) {
                    return [row.key, this._walkData(row.values)];
                }
                return row;
            }, this);
        }
        return data;
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
    //  Nesting  ---
    Grid.prototype._nest = function (columnIndicies, rollup) {
        if (!(columnIndicies instanceof Array)) {
            columnIndicies = [columnIndicies];
        }
        var nest = d3.nest();
        columnIndicies.forEach(function (idx) {
            nest.key(function (d) {
                return d[idx];
            });
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
