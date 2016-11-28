import * as d3 from "d3";
import { HTMLWidget } from "../common/HTMLWidget";
import { } from "../common/Utility";
import { PropertyExt } from "../common/PropertyExt";
import "css!orb";
import "css!./Orb";

function Mapping(owner){
    PropertyExt.call(this);
    this._owner = owner;
}

Mapping.prototype = Object.create(PropertyExt.prototype);
Mapping.prototype.constructor = Mapping;
Mapping.prototype._class += " react_Orb.Mapping";
Mapping.prototype.publish("addField", "", "set", "Show Toolbox or not",function() { return this._owner ? this._owner.columns() : [];}, {optional: true} );
Mapping.prototype.publish("location", true, "set", "Data Location",['row','column','data','remove'], { tags: ["basic"] });
Mapping.prototype.publish("aggregateFunc", "", "set", "Aggregate Function type",['sum','count','min','max','avg','prod','var','varp','stdev','stdevp'], {optional: true} );
Mapping.prototype.publish("formatFunction","","string","Format function");

var ReactOrb = null;
export function Orb(target) {
    HTMLWidget.call(this);
    this.orbFields =[];
    this.savedField = [];
    this.rowFields = [];
    this.dataFields = [];
    this.columnFields = [];
    this.removeFields = [];
    this.prevOrbConfig = '';

}



Orb.prototype._OrbTypes = [{id:"PIVOT", display:"Pivot Table",widgetClass: "react_Orb"}];

Orb.prototype = Object.create(HTMLWidget.prototype);
Orb.prototype.constructor = Orb;
Orb.prototype._class += " react_Orb";

Orb.prototype.Mapping = Mapping;
Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");
Orb.prototype.publish("width","2000","string","Table width",null, { tags: ["basic"] });
Orb.prototype.publish("height","711","string","Table height",null, { tags: ["basic"] });

Orb.prototype.publish("toolbar", true, "boolean", "Show Toolbox or not", null, { tags: ["basic"] });
Orb.prototype.publish("themeColor", "blue", "set", "Theme color", ['blue','red','black','green'], { tags: ["basic"] });
Orb.prototype.publish("newField" ,[], "propertyArray", "Source Columns", null, { autoExpand : Mapping});
    

Orb.prototype.publish("columnGrandTotal", true, "boolean", "Show Grand total or not");
Orb.prototype.publish("rowGrandTotal", true, "boolean", "Show Grand total or not");
// Orb.prototype.publish("movable", true, "boolean", "Fields can be moved or not");

        
Orb.prototype.orbConfig = function (ds,fs,rowFields,columnFields,dataFields) {

    var config = {

        dataSource:ds,
        canMoveFields: false, 
        dataHeadersLocation: 'columns',
        width: this.width(),
        height: this.height(),
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
    this._orbDiv = element.append("div");
    this._orb = new ReactOrb.pgridwidget(this.orbConfig());
    this._orb.render(this._orbDiv.node());
    // var context = this;
    // setInterval(function () {
    //     context.saveOrbConfig();
    // }, 1000);      
};

Orb.prototype.deleteField =  function(field){
    var fieldIndex =  this.savedField.indexOf(field);
    if (fieldIndex > -1){
        this.savedField.splice(fieldIndex);
    }

    fieldIndex = this.rowFields.indexOf(field);
    if (fieldIndex > -1){
        this.rowFields.splice(fieldIndex);
    }

    fieldIndex = this.columnFields.indexOf(field);
    if (fieldIndex > -1){
        this.columnFields.splice(fieldIndex);
    }

    fieldIndex = this.dataFields.indexOf(field);
    if (fieldIndex > -1){
        this.dataFields.splice(fieldIndex);
    }

    this.orbFields.forEach(function(item,index,object){
        if (item.caption === field){
            object.splice(index,1);
        }

    });

};


Orb.prototype.update = function (domNode, element) { 
        
    HTMLWidget.prototype.update.apply(this, arguments);

    var ds = this.data();
    var columns = this.columns();
                   
    for (var i=0;i<this.orbFields.length;i++){
        if (this.savedField.indexOf(this.orbFields[i].caption) === -1){
            this.savedField.push(this.orbFields[i].caption);
        }

    }

    this.newField().forEach(function(row,idx){
        var eachField = row.__prop_addField;
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

        var eachField = row.__prop_addField;

        var columnIndex = this.columnFields.indexOf(eachField);
        var dataIndex = this.dataFields.indexOf(eachField);
        var rowIndex = this.rowFields.indexOf(eachField);
        var removeIndex =  this.removeFields.indexOf(eachField);


        if (eachField !== null){

            switch(row.__prop_location){        

                case "row":
                    if (rowIndex === -1){
                        this.rowFields.push(eachField);

                        if (columnIndex > -1){
                            this.columnFields.splice(columnIndex,1);
                        }
                        if (dataIndex > -1){
                            this.dataFields.splice(dataIndex,1);
                        }
                        if (removeIndex > -1){
                            this.removeFields.splice(removeIndex,1);
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
                        if (removeIndex > -1){
                            this.removeFields.splice(removeIndex,1);
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
                        if (removeIndex > -1){
                            this.removeFields.splice(removeIndex,1);
                        }

                    }

                    break;

                case 'remove':
                    if (removeIndex === -1){
                        this.removeFields.push(eachField);
                        this.deleteField(eachField);
 
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

        var eachField = row.__prop_addField;

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
        react.unmountComponentAtNode(this._orbDiv.node());
        this.prevOrbConfig = orbCurrentConfig;
    }
        
    this._orbDiv = element.append("div");
    this._orb = new ReactOrb.pgridwidget(orbCurrentConfig);
    this._orb.render(this._orbDiv.node());
    this._orb.refreshData(this.data());

};

Orb.prototype.exit = function (domNode, element) {

    this._orbDiv.remove();
    HTMLWidget.prototype.exit.apply(this, arguments);
};

Orb.prototype.render = function (domNode, element){
    if (!ReactOrb) {
        var context = this;
        var args = arguments;
        require(["orb-react"], function (React) {
            window.React = window.React || React;
            require(["orb"], function (_orb) {
                ReactOrb = _orb;
                HTMLWidget.prototype.render.apply(context, args);
            });
        });
    } else {
        HTMLWidget.prototype.render.apply(this, arguments);
    }
};
