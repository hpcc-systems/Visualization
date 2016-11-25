"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3","../common/HTMLWidget","../common/Utility","../common/PropertyExt","css!orb", "css!./Orb"], factory);
    } else {
        root.template_Orb = factory(root.d3, root.common_HTMLWidget, root.common_Utility, root.common_PropertyExt, root.React);
    }
}(this, function (d3, HTMLWidget, Utility, PropertyExt){
    
    function Mapping(owner){
        PropertyExt.call(this);
        this._owner = owner;
    }

    Mapping.prototype = Object.create(PropertyExt.prototype);
    Mapping.prototype.constructor = Mapping;
    Mapping.prototype._class += " react_Orb";
    Mapping.prototype.publish("addField", "", "set", "Show Toolbox or not",function() { return this._owner ? this._owner.columns() : [];}, {optional: true} );
    Mapping.prototype.publish("location", true, "set", "Data Location",['row','column','data'], { tags: ["basic"] });
    Mapping.prototype.publish("aggregateFunc", "", "set", "Aggregate Function type",['sum','count','min','max','avg','prod','var','varp','stdev','stdevp'], {optional: true} );
    Mapping.prototype.publish("formatFunction","","string","Format function");

    var orb = null;
    function Orb(target) {
        HTMLWidget.call(this);
        this.orbFields =[];
        this.savedField = [];
        this.rowFields = [];
        this.dataFields = [];
        this.columnFields = [];
        this.prevOrbConfig = '';

    }



    Orb.prototype._OrbTypes = [{id:"PIVOT", display:"Pivot Table",widgetClass: "react_Orb"}];

    Orb.prototype = Object.create(HTMLWidget.prototype);
    Orb.prototype.constructor = Orb;
    Orb.prototype._class += " react_Orb";

    Orb.prototype.Mapping = Mapping;
    Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    Orb.prototype.publish("toolbar", true, "boolean", "Show Toolbox or not", null, { tags: ["basic"] });
    Orb.prototype.publish("themeColor", "blue", "set", "Theme color", ['blue','red','black','green'], { tags: ["basic"] });
    Orb.prototype.publish("newField" ,[], "propertyArray", "Source Columns", null, { autoExpand : Mapping});
    // Orb.prototype.publish("removeField", "", "set", "Show Toolbox or not", Orb.prototype.columns,{ tags: ["basic"] },{optional: true});

    Orb.prototype.publish("columnGrandTotal", true, "boolean", "Show Grand total or not");
    Orb.prototype.publish("rowGrandTotal", true, "boolean", "Show Grand total or not");
    Orb.prototype.publish("movable", true, "boolean", "Fields can be moved or not");

        
    Orb.prototype.orbConfig = function (ds,fs,rowFields,columnFields,dataFields) {

        var config = {

            dataSource:ds,
            canMoveFields: this.movable(), 
            dataHeadersLocation: 'columns',
            width: 1199,
            height: 711,
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
    };

    Orb.prototype.enter = function (domNode, element) {
        
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._div = element.append("div").attr("id", this.id() + "_orb");
        this._orb = new orb.pgridwidget(this.orbConfig());
        this._orb.render(document.getElementById(this.id() + "_orb"));
              
    };


    Orb.prototype.update = function (domNode, element) { 
        
        HTMLWidget.prototype.update.apply(this, arguments);

        var ds = this.data();
        var columns = this.columns();

        var allColumns = this.columns().map(function (column, idx) {
                return {
                    name: "" + idx,
                    caption: column
                };
            });
                   
        for (var i=0;i<this.orbFields.length;i++){
            if (this.savedField.indexOf(this.orbFields[i].caption) === -1){
                this.savedField.push(this.orbFields[i].caption);
                }

        }

        this.newField().forEach(function(row,idx){
            var eachField = row.addField();
            if (this.savedField.indexOf(eachField) === -1){

                var fieldIndex = columns.indexOf(eachField);
                if (fieldIndex !== -1){
                    this.orbFields.push({
                    name: fieldIndex.toString(),
                    caption: eachField
                    });
                }   

            }

        },this);


        this.newField().forEach(function(row,idx){

            var eachField = row.addField();

            var columnIndex = this.columnFields.indexOf(eachField);
            var dataIndex = this.dataFields.indexOf(eachField);
            var rowIndex = this.rowFields.indexOf(eachField);


            if (eachField !== null){

                switch(row.location()){        

                    case "row":
                        if (rowIndex === -1){
                            this.rowFields.push(eachField);

                            if (columnIndex > -1){
                                this.columnFields.splice(columnIndex,1);
                            }
                            if (dataIndex > -1){
                                this.dataFields.splice(dataIndex,1);
                            }
                        }

                        break;

                    case "column":
                        if (columnIndex === -1){
                            this.columnFields.push(eachField);

                        if (rowIndex > -1){
                            this.rowFields.splice(columnIndex,1);
                            }
                        if (dataIndex > -1){
                            this.dataFields.splice(dataIndex,1);
                            }

                        }
                        break;

                    case "data":
                        if (dataIndex === -1){
                            this.dataFields.push(eachField);

                        if (rowIndex > -1){
                            this.rowFields.splice(columnIndex,1);
                            }
                        if (columnIndex > -1){
                            this.columnFields.splice(dataIndex,1);
                            }

                        }
                        break;
                    }
            }

        },this);


        function createFormatFunction(ft) {
            return function (value) {
                return d3.format(ft)(value);
            };
        }

        this.newField().forEach(function(row,idx){

            var eachField = row.addField();

            for (var n=0;n<this.orbFields.length;n++){

                if (this.orbFields[n].caption === eachField){
                    var ft = row.formatFunction();

                    this.orbFields[n].dataSettings={
                    aggregateFunc:row.aggregateFunc(),
                    formatFunc: createFormatFunction(ft)
                    };


                }

            }

        },this);


        var orbCurrentConfig = this.orbConfig(ds,this.orbFields,this.rowFields,this.columnFields,this.dataFields);
        if (this.prevOrbConfig !== JSON.stringify(orbCurrentConfig)){
            var react = React;
            react.unmountComponentAtNode(document.getElementById(this.id() + "_orb"));
            this.prevOrbConfig = orbCurrentConfig;
        }
        
        this._div = element.append("div").attr("id", this.id() + "_orb");
        this._orb = new orb.pgridwidget(orbCurrentConfig);
        this._orb.render(document.getElementById(this.id() + "_orb"));

    };

    Orb.prototype.exit = function (domNode, element) {

        this._div.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Orb.prototype.render = function (domNode, element){
        if (!orb) {
            var context = this;
            var args = arguments;
            require(["orb-react"], function (React) {
                window.React = window.React || React;
                require(["orb"], function (_orb) {
                    orb = _orb;
                    HTMLWidget.prototype.render.apply(context, args);
                });
            });
        } else {
            HTMLWidget.prototype.render.apply(this, arguments);
        }
    };

        return Orb;
    }));
