import { HTMLWidget, PropertyExt } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import * as React from "react";
if (!(window as any).React) {
    (window as any).React = React;
}
import * as ReactOrb from "orb-fix";

import "orb-fix.css";
import "../src/Orb.css";

class Mapping extends PropertyExt {
    _owner;

    constructor(owner) {
        super();

        this._owner = owner;
    }
    addField: { (): string; (_: string): Mapping };
    addField_exists: () => boolean;
    location: { (): string; (_: string): Mapping };
    location_exists: () => boolean;
    aggregateFunc: { (): string; (_: string): Mapping };
    aggregateFunc_exists: () => boolean;
    formatFunction: { (): string; (_: string): Mapping };
    formatFunction_exists: () => boolean;
}
Mapping.prototype._class += " react_Orb.Mapping";

Mapping.prototype.publish("addField", "", "set", "Show Toolbox or not", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });
Mapping.prototype.publish("location", true, "set", "Data Location", ["row", "column", "data", "remove"], { tags: ["Basic"] });
Mapping.prototype.publish("aggregateFunc", "", "set", "Aggregate Function type", ["sum", "count", "min", "max", "avg", "prod", "var", "varp", "stdev", "stdevp"], { optional: true });
Mapping.prototype.publish("formatFunction", "", "string", "Format function");

export class Orb extends HTMLWidget {
    Mapping;
    _OrbTypes;

    orbFields = [];
    savedField = [];
    rowFields = [];
    dataFields = [];
    columnFields = [];
    removeFields = [];
    prevOrbConfig;

    _orbDiv;
    _orb;

    constructor() {
        super();
    }

    orbConfig(ds?, fs?, rowFields?, columnFields?, dataFields?) {

        const config = {

            dataSource: ds,
            canMoveFields: false,
            dataHeadersLocation: "columns",
            width: this.tableWidth(),
            height: this.tableHeight(),
            theme: this.themeColor(),
            toolbar: {
                visible: this.toolbar()
            },
            grandTotal: {
                rowsvisible: this.rowGrandTotal(),
                columnsvisible: this.columnGrandTotal()
            },
            subTotal: {
                visible: true,
                collapsed: false,
                collapsible: true
            },
            rowSettings: {
                subTotal: {
                    visible: true,
                    collapsed: false,
                    collapsible: true
                }
            },
            columnSettings: {
                subTotal: {
                    visible: true,
                    collapsed: false,
                    collapsible: true
                }
            },
            fields: fs,
            rows: this.rowFields,
            columns: this.columnFields,
            data: this.dataFields

        };

        return config;
    }

    enter(domNode, element) {

        HTMLWidget.prototype.enter.apply(this, arguments);
        this._orbDiv = element.append("div");
        this._orb = new ReactOrb.pgridwidget(this.orbConfig());
        this._orb.render(this._orbDiv.node());
        // var context = this;
        // setInterval(function () {
        //     context.saveOrbConfig();
        // }, 1000);
    }

    deleteField(field) {
        let fieldIndex = this.savedField.indexOf(field);
        if (fieldIndex > -1) {
            this.savedField.splice(fieldIndex);
        }

        fieldIndex = this.rowFields.indexOf(field);
        if (fieldIndex > -1) {
            this.rowFields.splice(fieldIndex);
        }

        fieldIndex = this.columnFields.indexOf(field);
        if (fieldIndex > -1) {
            this.columnFields.splice(fieldIndex);
        }

        fieldIndex = this.dataFields.indexOf(field);
        if (fieldIndex > -1) {
            this.dataFields.splice(fieldIndex);
        }

        this.orbFields.forEach(function (item, index, object) {
            if (item.caption === field) {
                object.splice(index, 1);
            }

        });

    }

    update(domNode, element) {

        HTMLWidget.prototype.update.apply(this, arguments);

        const ds = this.data();
        const columns = this.columns();

        for (let i = 0; i < this.orbFields.length; i++) {
            if (this.savedField.indexOf(this.orbFields[i].caption) === -1) {
                this.savedField.push(this.orbFields[i].caption);
            }

        }

        this.newField().forEach(function (row, idx) {
            const eachField = row.__prop_addField;
            if (this.savedField.indexOf(eachField) === -1) {

                const fieldIndex = columns.indexOf(eachField);
                if (fieldIndex !== -1) {
                    this.orbFields.push({
                        name: fieldIndex.toString(),
                        caption: eachField
                    });
                }

            }

        }, this);

        this.newField().forEach(function (row, idx) {

            const eachField = row.__prop_addField;

            const columnIndex = this.columnFields.indexOf(eachField);
            const dataIndex = this.dataFields.indexOf(eachField);
            const rowIndex = this.rowFields.indexOf(eachField);
            const removeIndex = this.removeFields.indexOf(eachField);

            if (eachField !== null) {

                switch (row.__prop_location) {

                    case "row":
                        if (rowIndex === -1) {
                            this.rowFields.push(eachField);

                            if (columnIndex > -1) {
                                this.columnFields.splice(columnIndex, 1);
                            }
                            if (dataIndex > -1) {
                                this.dataFields.splice(dataIndex, 1);
                            }
                            if (removeIndex > -1) {
                                this.removeFields.splice(removeIndex, 1);
                            }
                        }

                        break;

                    case "column":
                        if (columnIndex === -1) {
                            this.columnFields.push(eachField);

                            if (rowIndex > -1) {
                                this.rowFields.splice(columnIndex, 1);
                            }
                            if (dataIndex > -1) {
                                this.dataFields.splice(dataIndex, 1);
                            }
                            if (removeIndex > -1) {
                                this.removeFields.splice(removeIndex, 1);
                            }

                        }
                        break;

                    case "data":
                        if (dataIndex === -1) {
                            this.dataFields.push(eachField);

                            if (rowIndex > -1) {
                                this.rowFields.splice(columnIndex, 1);
                            }
                            if (columnIndex > -1) {
                                this.columnFields.splice(dataIndex, 1);
                            }
                            if (removeIndex > -1) {
                                this.removeFields.splice(removeIndex, 1);
                            }

                        }

                        break;

                    case "remove":
                        if (removeIndex === -1) {
                            this.removeFields.push(eachField);
                            this.deleteField(eachField);

                        }
                        break;

                }
            }

        }, this);

        function createFormatFunction(ft) {
            return function (value) {
                return d3Format(ft)(value);
            };
        }

        this.newField().forEach(function (row, idx) {

            const eachField = row.__prop_addField;

            for (let n = 0; n < this.orbFields.length; n++) {

                if (this.orbFields[n].caption === eachField) {

                    const ft = row.formatFunction();
                    this.orbFields[n].dataSettings = {
                        aggregateFunc: row.aggregateFunc(),
                        formatFunc: createFormatFunction(ft)
                    };

                }

            }

        }, this);

        const orbCurrentConfig = this.orbConfig(ds, this.orbFields, this.rowFields, this.columnFields, this.dataFields);
        if (this.prevOrbConfig !== JSON.stringify(orbCurrentConfig)) {
            const react = (window as any).React;
            react.unmountComponentAtNode(this._orbDiv.node());
            this.prevOrbConfig = orbCurrentConfig;
        }

        this._orbDiv = element.append("div");
        this._orb = new ReactOrb.pgridwidget(orbCurrentConfig);
        this._orb.render(this._orbDiv.node());
        this._orb.refreshData(this.data());

    }

    exit(domNode, element) {

        this._orbDiv.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    }
    /*
        render(domNode, element) {
            if (!ReactOrb) {
                const context = this;
                const args = arguments;
                require(["orb-react"], function (React) {
                    window["React"] = window["React"] || React;
                    require(["orb"], function (_orb) {
                        ReactOrb = _orb;
                        HTMLWidget.prototype.render.apply(context, args);
                    });
                });
            } else {
                HTMLWidget.prototype.render.apply(this, arguments);
            }
        }
    */
    stringProp: { (): string; (_: string): Orb };
    stringProp_exists: () => boolean;
    tableWidth: { (): number; (_: number): Orb };
    tableWidth_exists: () => boolean;
    tableHeight: { (): number; (_: number): Orb };
    tableHeight_exists: () => boolean;
    toolbar: { (): boolean; (_: boolean): Orb };
    toolbar_exists: () => boolean;
    themeColor: { (): string; (_: string): Orb };
    themeColor_exists: () => boolean;
    newField: { (): any[]; (_: any[]): Orb };
    newField_exists: () => boolean;
    columnGrandTotal: { (): boolean; (_: boolean): Orb };
    columnGrandTotal_exists: () => boolean;
    rowGrandTotal: { (): boolean; (_: boolean): Orb };
    rowGrandTotal_exists: () => boolean;
}
Orb.prototype._class += " react_Orb";

Orb.prototype.Mapping = Mapping;
Orb.prototype._OrbTypes = [{ id: "PIVOT", display: "Pivot Table", widgetClass: "react_Orb" }];

Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");
Orb.prototype.publish("tableWidth", 2000, "number", "Table width", null, { tags: ["Basic"] });
Orb.prototype.publish("tableHeight", 711, "number", "Table height", null, { tags: ["Basic"] });

Orb.prototype.publish("toolbar", true, "boolean", "Show Toolbox or not", null, { tags: ["Basic"] });
Orb.prototype.publish("themeColor", "blue", "set", "Theme color", ["blue", "red", "black", "green"], { tags: ["Basic"] });
Orb.prototype.publish("newField", [], "propertyArray", "Source Columns", null, { autoExpand: Mapping });

Orb.prototype.publish("columnGrandTotal", true, "boolean", "Show Grand total or not");
Orb.prototype.publish("rowGrandTotal", true, "boolean", "Show Grand total or not");
// Orb.prototype.publish("movable", true, "boolean", "Fields can be moved or not");
