import { deviation as d3Deviation, max as d3Max, mean as d3Mean, median as d3Median, min as d3Min, sum as d3Sum, variance as d3Variance } from "d3-array";
import { map as d3Map, nest as d3Nest } from "d3-collection";
import { csvFormatRows as d3CsvFormatRows, csvParse as d3CsvParse, tsvFormatRows as d3TsvFormatRows, tsvParse as d3TsvParse } from "d3-dsv";
import { format as d3Format } from "d3-format";
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";
import { PropertyExt } from "./PropertyExt";
import * as Utility from "./Utility";

const d3Aggr = {
    min: d3Min,
    max: d3Max,
    mean: d3Mean,
    median: d3Median,
    variance: d3Variance,
    deviation: d3Deviation,
    sum: d3Sum
};

let lastFoundFormat = null;

export interface INestedColumn {
    label: string;
    columns: Array<string | INestedColumn>;
}

//  Field  ---
export class Field extends PropertyExt {
    private _owner: Grid;
    idx: number;
    protected _children: Field[] = [];

    constructor(id?) {
        super();
        PropertyExt.call(this);

        this._id = id || this._id;
    }

    owner(): Grid;
    owner(_: Grid): this;
    owner(_?: Grid): Grid | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.label();
    }

    checksum(): string {
        return Utility.checksum(this.label() + this.type() + this.mask() + this.format());
    }

    typeTransformer(_: any) {
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
    }

    maskTransformer(_) {
        return this.formatter(this.mask()).parse(String(_));
    }

    formatTransformer(_) {
        return this.formatter(this.format())(_);
    }

    parse(_) {
        if (!_) {
            return _;
        }
        try {
            return this.typeTransformer(_);
        } catch (e) {
            console.log("Unable to parse:  " + _);
            return null;
        }
    }

    transform(_) {
        if (!_) {
            return _;
        }
        try {
            return this.formatTransformer(this.typeTransformer(_));
        } catch (e) {
            console.log("Unable to transform:  " + _);
            return null;
        }
    }

    clone() {
        const context = this;
        const retVal = new Field(this._id);
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
    }

    formatter(format) {
        let retVal;
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
                return d3TimeFormat(format);
        }
        retVal = d3Format(format);
        retVal.parse = function (_) {
            return _;
        };
        return retVal;
    }

    children(): Field[];
    children(_: Array<string | INestedColumn | Field>, asDefault?: boolean): this;
    children(_?: Array<string | INestedColumn | Field>, asDefault?: boolean): Field[] | this {
        if (_ === void 0) return this._children;
        console.log("_", _);
        this.type("nested");
        const fieldsArr = this._children;
        this._children = _.map((field: string | INestedColumn | Field, idx): Field => {
            if (field instanceof Field) {
                fieldsArr[idx] = field;
                return field;
            } else if (typeof field === "string") {
                if (asDefault) {
                    return (fieldsArr[idx] || new Field()).label_default(field);
                } else {
                    return (fieldsArr[idx] || new Field()).label(field);
                }
            } else {
                if (asDefault) {
                    return (fieldsArr[idx] || new Field())
                        .label_default(field.label)
                        .children(field.columns) as Field
                        ;
                } else {
                    return (fieldsArr[idx] || new Field())
                        .label(field.label)
                        .children(field.columns) as Field
                        ;
                }
            }
        }, this);
        return this;
    }

    label_default: { (): string; (x: string): Field; };
    label: { (): string; (x: string): Field; };
    type: { (): string; (x: string): Field; };
    mask: { (): string; (x: string): Field; };
    format: { (): string; (x: string): Field; };
}
Field.prototype._class += " common_Database.Field";

Field.prototype.publish("label", "", "string", "Label", null, { optional: true });
Field.prototype.publish("type", "", "set", "Type", ["", "string", "number", "boolean", "time", "hidden", "nested"], { optional: true });
Field.prototype.publish("mask", "", "string", "Time Mask", null, { disable: (w: any) => w.type() !== "time", optional: true });
Field.prototype.publish("format", "", "string", "Format", null, { optional: true });

//  Grid  ---
export class Grid extends PropertyExt {
    _dataChecksum: boolean;
    _dataVersion: number;

    private _data = [];
    private _dataChecksums = [];

    constructor(dataChecksum?) {
        super();
        dataChecksum = dataChecksum || false;
        this._dataChecksum = dataChecksum;
        this._dataVersion = 0;
        this.clear();
    }

    clear() {
        this.fields([]);
        this._data = [];
        this._dataChecksums = [];
        ++this._dataVersion;
        return this;
    }

    //  Backward compatability  ---
    resetColumns() {
        const fields = this.fields() as Field[];
        this.legacyColumns([]);
        this.legacyColumns(fields.map(function (field) {
            return field.label();
        }));
    }

    legacyColumns(_?, asDefault?): any | Grid {
        if (!arguments.length) return this.row(0);
        this.row(0, _, asDefault);
        return this;
    }

    legacyData(_?, _clone?) {
        return Grid.prototype.data.apply(this, arguments);
    }

    //  Meta  ---
    schema() {
    }

    field(idx) {
        return this.fields()[idx];
    }

    fieldByLabel(_, ignoreCase?) {
        return this.fields().filter(function (field: Field, idx) {
            field.idx = idx;
            return ignoreCase ? field.label().toLowerCase() === _.toLowerCase() : field.label() === _;
        })[0];
    }

    data(_?, clone?): any | Grid {
        if (!arguments.length) return this._data;
        this._data = clone ? _.map(function (d) { return d.map(function (d2) { return d2; }); }) : _;
        this._dataCalcChecksum();
        return this;
    }

    parsedData() {
        const context = this;
        return this._data.map(function (row) {
            return row.map(function (cell, idx) {
                return context.fields()[idx].parse(cell);
            });
        });
    }

    formattedData() {
        return this._data.map(row => {
            return this.fields().map((field, idx) => {
                return field.transform(row[idx]);
            });
        });
    }

    fieldsChecksum() {
        return Utility.checksum(this.fields().map(function (field) { return field.checksum(); }));
    }

    dataChecksum() {
        return Utility.checksum(this._dataChecksum ? this._dataChecksums : this._dataVersion);
    }

    checksum() {
        return Utility.checksum([this.dataChecksum(), this.fieldsChecksum()]);
    }

    //  Row Access  ---
    private _dataCalcChecksum(idx?) {
        ++this._dataVersion;
        if (this._dataChecksum) {
            if (arguments.length) {
                this._dataChecksums[idx] = Utility.checksum(this._data[idx]);
            } else {
                this._dataChecksums = this._data.map(function (row) { return Utility.checksum(row); });
            }
        }
        return this;
    }

    row(row?, _?, asDefault?): any | Grid {
        if (arguments.length < 2) return row === 0 ? this.fields().map(function (d) { return d.label(); }) : this._data[row - 1];
        if (row === 0) {
            const fieldsArr = this.fields();
            this.fields(_.map(function (field: string | INestedColumn, idx) {
                if (typeof field === "string") {
                    if (asDefault) {
                        return (fieldsArr[idx] || new Field()).label_default(field);
                    } else {
                        return (fieldsArr[idx] || new Field()).label(field);
                    }
                } else {
                    if (asDefault) {
                        return (fieldsArr[idx] || new Field())
                            .label_default(field.label)
                            .children(field.columns)
                            ;
                    } else {
                        return (fieldsArr[idx] || new Field())
                            .label(field.label)
                            .children(field.columns)
                            ;
                    }
                }
            }, this));
        } else {
            this._data[row - 1] = _;
            this._dataCalcChecksum(row - 1);
        }
        return this;
    }

    rows(_?): any | Grid {
        if (!arguments.length) return [this.row(0)].concat(this._data);
        this.row(0, _[0]);
        this._data = _.filter(function (_row, idx) { return idx > 0; });
        this._dataCalcChecksum();
        return this;
    }

    //  Column Access  ---
    column(col, _?): any | Grid {
        if (arguments.length < 2) return [this.fields()[col].label()].concat(this._data.map(function (row, _idx) { return row[col]; }));
        _.forEach(function (d, idx) {
            if (idx === 0) {
                this.fields()[col] = new Field().label(_[0]);
            } else {
                this._data[idx - 1][col] = d;
                this._dataCalcChecksum(idx - 1);
            }
        }, this);
        return this;
    }

    columnData(col, _): any | Grid {
        if (arguments.length < 2) return this._data.map(function (row, _idx) { return row[col]; });
        _.forEach(function (d, idx) {
            this._data[idx][col] = d;
            this._dataCalcChecksum(idx);
        }, this);
        return this;
    }

    columns(_?): any | Grid {
        if (!arguments.length) return this.fields().map(function (_col, idx) {
            return this.column(idx);
        }, this);
        _.forEach(function (_col, idx) {
            this.column(idx, _[idx]);
        }, this);
        return this;
    }

    //  Cell Access  ---
    cell(row, col, _) {
        if (arguments.length < 3) return this.row(row)[col];
        if (row === 0) {
            this.fields()[col] = new Field().label(_);
        } else {
            this._data[row][col] = _;
            this._dataCalcChecksum(row);
        }
        return this;
    }

    //  Grid Access  ---
    grid(_?) {
        return Grid.prototype.rows.apply(this, arguments);
    }

    //  Hipie Helpers  ---

    hipieMappings(columns, missingDataString) {
        missingDataString = missingDataString || "";
        if (!this.fields().length || !this._data.length) {
            return [];
        }
        const mappedColumns = [];
        let hasRollup = false;
        columns.forEach(function (mapping, idx) {
            const mappedColumn = {
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
                    const field = this.fieldByLabel(param, true);
                    mappedColumn.params.push(field ? field.idx : -1);
                }, this);
            } else {
                mappedColumn.groupby = true;
                const field = this.fieldByLabel(mapping.id(), true);
                mappedColumn.params.push(field ? field.idx : -1);
            }
            mappedColumns.push(mappedColumn);
        }, this);

        if (hasRollup) {
            const retVal = [];
            this.rollup(mappedColumns.filter(function (mappedColumn) {
                return mappedColumn.groupby === true;
            }).map(function (d) {
                return d.params[0];
            }), function (leaves) {
                const row = mappedColumns.map(function (mappedColumn) {
                    const param1 = mappedColumn.params[0];
                    const param2 = mappedColumn.params[1];
                    switch (mappedColumn.func) {
                        case "SUM":
                            return d3Sum(leaves, function (d) { return d[param1]; });
                        case "AVE":
                            return d3Mean(leaves, function (d) { return d[param1] / d[param2]; });
                        case "MIN":
                            return d3Min(leaves, function (d) { return d[param1]; });
                        case "MAX":
                            return d3Max(leaves, function (d) { return d[param1]; });
                        case "SCALE":
                            console.log("Unexpected function:  " + mappedColumn.func);
                            //  All leaves should have the same values, use mean just in case they don't?
                            return d3Mean(leaves, function (d) { return d[param1] / +param2; });
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
                    const param1 = mappedColumn.params[0];
                    const param2 = mappedColumn.params[1];
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
    }

    legacyView() {
        return new LegacyView(this);
    }

    nestView(columnIndicies) {
        return new RollupView(this, columnIndicies);
    }

    rollupView(columnIndicies, rollupFunc?) {
        return new RollupView(this, columnIndicies, rollupFunc);
    }

    aggregateView(columnIndicies, aggrType, aggrColumn, aggrDeltaColumn = "") {
        const context = this;
        return new RollupView(this, columnIndicies, function (values) {
            switch (aggrType) {
                case null:
                case undefined:
                case "":
                    values.aggregate = values.length;
                    return values;
                default:
                    const columns = context.legacyColumns();
                    const colIdx = columns.indexOf(aggrColumn);
                    const deltaIdx = columns.indexOf(aggrDeltaColumn);
                    values.aggregate = d3Aggr[aggrType](values, function (value) {
                        return (+value[colIdx] - (deltaIdx >= 0 ? +value[deltaIdx] : 0)) / (deltaIdx >= 0 ? +value[deltaIdx] : 1);
                    });
                    return values;
            }
        });
    }

    //  Nesting  ---
    private _nest(columnIndicies, _rollup?) {
        if (!(columnIndicies instanceof Array)) {
            columnIndicies = [columnIndicies];
        }
        const nest = d3Nest();
        columnIndicies.forEach(function (idx) {
            nest.key(function (d) {
                return d[idx];
            });
        });
        return nest;
    }

    nest(columnIndicies) {
        return this._nest(columnIndicies)
            .entries(this._data)
            ;
    }

    rollup(columnIndicies, rollup) {
        return this._nest(columnIndicies)
            .rollup(rollup)
            .entries(this._data)
            ;
    }

    //  Util  ---
    length() {
        return this._data.length + 1;
    }

    width() {
        return this.fields().length;
    }

    pivot() {
        this.resetColumns();
        this.rows(this.columns());
        return this;
    }

    clone(deep) {
        return new Grid()
            .fields(this.fields(), deep)
            .data(this.data(), deep)
            ;
    }

    filter(filter) {
        const filterIdx = {};
        this.row(0).forEach(function (col, idx) {
            filterIdx[col] = idx;
        });
        return new Grid()
            .fields(this.fields(), true)
            .data(this.data().filter(function (row) {
                for (const key in filter) {
                    if (filter[key] !== row[filterIdx[key]]) {
                        return false;
                    }
                }
                return true;
            }))
            ;
    }

    analyse(columns) {
        if (!(columns instanceof Array)) {
            columns = [columns];
        }
        const retVal = [];
        columns.forEach(function (col) {
            const rollup = this.rollup(col, function (leaves) {
                return leaves.length;
            });
            retVal.push(rollup);
            const keys = rollup.map(function (d) { return d.key; });
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
    }

    //  Import/Export  ---
    jsonObj(_?): any | Grid {
        if (!arguments.length) return this._data.map(function (row) {
            const retVal = {};
            this.row(0).forEach(function (col, idx) {
                retVal[col] = row[idx];
            });
            return retVal;
        }, this);
        this.clear();
        this.data(_.map(function (row) {
            const retVal = [];
            for (const key in row) {
                let colIdx = this.row(0).indexOf(key);
                if (colIdx < 0) {
                    colIdx = this.fields().length;
                    this.fields().push(new Field().label(key));
                }
                retVal[colIdx] = row[key];
            }
            return retVal;
        }, this));
        return this;
    }

    json(_: string | object): this;
    json(): string;
    json(_?: string | object): string | this {
        if (!arguments.length) return JSON.stringify(this.jsonObj(), null, "  ");
        if (typeof (_) === "string") {
            _ = JSON.parse(_);
        }
        this.jsonObj(_);
        return this;
    }

    csv(_): this;
    csv(): string;
    csv(_?): string | this {
        if (!arguments.length) {
            const temp = document.createElement("div");
            return d3CsvFormatRows(this.grid().map(row => {
                return row.map(cell => {
                    return Utility.removeHTMLFromString(cell, temp);
                });
            }));
        }
        this.jsonObj(d3CsvParse(_));
        return this;
    }

    tsv(_): this;
    tsv(): string;
    tsv(_?): string | this {
        if (!arguments.length) return d3TsvFormatRows(this.grid());
        this.jsonObj(d3TsvParse(_));
        return this;
    }
}
Grid.prototype._class += " common_Database.Grid";
export interface Grid {
    fields(): Field[];
    fields(_: Field[], clone?: boolean): this;
}

Grid.prototype.publish("fields", [], "propertyArray", "Fields");
const fieldsOrig = Grid.prototype.fields;
Grid.prototype.fields = function (_?, clone?) {
    if (!arguments.length) return fieldsOrig.apply(this, arguments);
    return fieldsOrig.call(this, clone ? _.map(function (d) { return d.clone(); }) : _);
};

//  Views  ---
export class LegacyView {
    _grid;
    _parsedData;
    _parsedDataChecksum;
    _formattedData;
    _formattedDataChecksum;

    constructor(grid) {
        this._grid = grid;
    }

    checksum() {
        const value = this._grid.on.apply(this._grid, arguments);
        return value === this._grid ? this : value;
    }

    fields() {
        const value = this._grid.on.apply(this._grid, arguments);
        return value === this._grid ? this : value;
    }

    grid() {
        return this._grid;
    }
    columns(_?) {
        if (!arguments.length) return this._grid.legacyColumns();
        this._grid.legacyColumns(_);
        return this;
    }
    rawData(_?) {
        if (!arguments.length) return this._grid.legacyData();
        this._grid.legacyData(_);
        return this;
    }
    formattedData() {
        if (this._formattedDataChecksum !== this._grid.checksum()) {
            this._formattedDataChecksum = this._grid.checksum();
            this._formattedData = this._grid.formattedData();
        }
        return this._formattedData;
    }
    parsedData() {
        if (this._parsedDataChecksum !== this._grid.checksum()) {
            this._parsedDataChecksum = this._grid.checksum();
            this._parsedData = this._grid.parsedData();
        }
        return this._parsedData;
    }
    protected _whichData(opts?) {
        if (opts) {
            if (opts.parsed) {
                return this.formattedData();
            } else if (opts.formatted) {
                return this.formattedData();
            }
        }
        return this.rawData();
    }
    data(_) {
        return LegacyView.prototype.rawData.apply(this, arguments);
    }
}

export class RollupView extends LegacyView {
    _columnIndicies;
    _rollup;
    _nestChecksum;
    _nest;

    constructor(grid, columns, rollup?) {
        super(grid);
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

    nest() {
        if (this._nestChecksum !== this._grid.checksum()) {
            this._nestChecksum = this._grid.checksum();

            const nest = d3Nest();
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
    }
    entries(opts?) {
        return this.nest().entries(this._whichData(opts));
    }
    map(opts) {
        return this.nest().map(this._whichData(opts));
    }
    d3Map(opts) {
        return this.nest().map(this._whichData(opts), d3Map);
    }
    _walkData(entries, prevRow = []) {
        let retVal = [];
        entries.forEach(function (entry) {
            if (entry instanceof Array) {
                retVal.push(prevRow.concat([entry]));
            } else if (entry.values instanceof Array) {
                retVal = retVal.concat(this._walkData(entry.values, prevRow.concat([entry.key])));
            } else if (entry.value instanceof Array) {
                retVal = retVal.concat(this._walkData(entry.value, prevRow.concat([entry.key])));
            }
        }, this);
        return retVal;
    }
    data(opts) {
        return this._walkData(this.entries(opts));
    }
}

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
const dateTimeFormats = [
];
const dateFormats = [
    "%Y-%m-%d",
    "%Y%m%d"
];
const timeFormats = [
    "%H:%M:%S.%LZ",
    "%H:%M:%SZ",
    "%H:%M:%S"
];
dateFormats.forEach(function (d) {
    timeFormats.forEach(function (t) {
        dateTimeFormats.push(d + "T" + t);
    });
});
function formatPicker(formats, cell) {
    for (let i = 0; i < formats.length; ++i) {
        const date = d3TimeParse(formats[i])(cell);
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
