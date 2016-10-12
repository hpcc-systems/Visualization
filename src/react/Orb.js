"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3","../common/HTMLWidget","../common/Utility","../common/PropertyExt","css!orb", "css!./Orb"], factory);
    } else {
        root.template_Orb = factory(root.d3, root.common_HTMLWidget, root.common_Utility, root.common_PropertyExt, root.React);
    }
}(this, function (d3, HTMLWidget, Utility, PropertyExt){
    var orb = null;
    function Orb(target) {
        HTMLWidget.call(this);
        this.orbFields =[];
        this.savedField = [];
        this.rowFields = [];
        this.dataFields = [];
        this.columnFields = [];

    }


function mapping(owner){
 PropertyExt.call(this);
 this._owner = owner;
}

mapping.prototype = Object.create(PropertyExt.prototype);
mapping.prototype.constructor = mapping;
mapping.prototype._class += " react_Orb";
mapping.prototype.publish("addField", "", "set", "Show Toolbox or not",function() { return this._owner ? this._owner.columns() : [];}, {optional: true} );
mapping.prototype.publish("location", true, "set", "Data Location",['row','column','data'], { tags: ["basic"] });
mapping.prototype.publish("aggregateFunc", "", "set", "Aggregate Function type",['sum','count','min','max','avg','prod','var','varp','stdev','stdevp'], {optional: true} );
mapping.prototype.publish("formatFunction","","string","Format function");



Orb.prototype = Object.create(HTMLWidget.prototype);
Orb.prototype.constructor = Orb;
Orb.prototype._class += " react_Orb";

Orb.prototype.mapping = mapping;
Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

Orb.prototype.publish("toolbar", true, "boolean", "Show Toolbox or not", null, { tags: ["basic"] });
Orb.prototype.publish("themeColor", "blue", "set", "Theme color", ['blue','red','black','green'], { tags: ["basic"] });
Orb.prototype.publish("newField" ,[], "propertyArray", "Source Columns", null, { autoExpand : mapping});
Orb.prototype.publish("removeField", "", "set", "Show Toolbox or not", Orb.prototype.columns,{ tags: ["basic"] },{optional: true});

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
               
  for (var i=0;i<this.orbFields.length;i++){
    if (this.savedField.indexOf(this.orbFields[i].caption) === -1){
     this.savedField.push(this.orbFields[i].caption);
    }
    
  }


 for (var k=0;k<this.newField().length;k++){
  if (this.savedField.indexOf(this.newField()[k].__prop_addField) === -1){

     var fieldIndex = columns.indexOf(this.newField()[k].__prop_addField);

     if (fieldIndex !== -1){
      this.orbFields.push({
        name: fieldIndex.toString(),
        caption: this.newField()[k].__prop_addField
      });
     }
  
    }
 }

    
 for (var h=0; h<this.newField().length; h++){
  var columnIndex = this.columnFields.indexOf(this.newField()[h] .__prop_addField);
  var dataIndex = this.dataFields.indexOf(this.newField()[h] .__prop_addField);
  var rowIndex = this.rowFields.indexOf(this.newField()[h] .__prop_addField);


  if (this.newField()[h] .__prop_addField !== null){
   switch(this.newField()[h] .__prop_location){        

   case "row":
    if (this.rowFields.indexOf(this.newField()[h] .__prop_addField) === -1){
     this.rowFields.push(this.newField()[h] .__prop_addField);

     if (columnIndex > -1){
      this.columnFields.splice(columnIndex,1);
     }
     if (dataIndex > -1){
      this.dataFields.splice(dataIndex,1);
     }
    }
    
    break;

   case "column":
    if (this.columnFields.indexOf(this.newField()[h] .__prop_addField) === -1){
     this.columnFields.push(this.newField()[h] .__prop_addField);

     if (rowIndex > -1){
      this.rowFields.splice(columnIndex,1);
     }
     if (dataIndex > -1){
      this.dataFields.splice(dataIndex,1);
     }

    }
    break;

   case "data":
     if (this.dataFields.indexOf(this.newField()[h] .__prop_addField) === -1){
      this.dataFields.push(this.newField()[h] .__prop_addField);

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
 }



 // for (var m=0; m<this.newField().length; m++){
      
 //  for (var n=0;n<this.orbFields.length;n++){
    
 //   if (this.orbFields[n].caption === this.newField()[m].__prop_addField){
 //    var ft = this.newField()[m].__prop_formatFunction;

 //    this.orbFields[n].dataSettings={
 //     aggregateFunc:this.newField()[m].__prop_aggregateFunc,
 //     formatFunc:function(value){
 //      return d3.format(ft)(value);
 //      }      
 //    };


 //   }
    
 //  }
 // }

var context = this;
function createFormatFunction(ft) {
     return function (value) {
         return d3.format(ft)(value);
     };
}
for (var m = 0; m < this.newField().length; m++) {
      
  for (var n=0;n<this.orbFields.length;n++){
    
   if (this.orbFields[n].caption === this.newField()[m].__prop_addField){
    var ft = this.newField()[m].__prop_formatFunction;
 
    this.orbFields[n].dataSettings={
     aggregateFunc:this.newField()[m].__prop_aggregateFunc,
     formatFunc: createFormatFunction(ft)
    };
 
 
   }
    
  }
}

     
 if (this.removeField()){
  for (var j=0;j<this.orbFields.length;j++){
   if (this.orbFields[j].caption === this.removeField()){
    this.orbFields.splice(j,1);
    break;

   }
  }

  for (var l=0;l<this.rowFields.length;l++){
   if (this.rowFields[l] === this.removeField()){
    this.rowFields.splice(l,1);
    break;
   }
  }

  for (var r=0;r<this.columnFields.length;r++){
   if (this.columnFields[r] === this.removeField()){
    this.columnFields.splice(r,1);
    break;
   }
  }

  for (var s=0;s<this.dataFields.length;s++){
   if (this.dataFields[s] === this.removeField()){
    this.dataFields.splice(s,1);
    break;
   }
  }
 }
 

 var react = React;
 react.unmountComponentAtNode(document.getElementById(this.id() + "_orb"));
 this._div = element.append("div").attr("id", this.id() + "_orb");
 this._orb = new orb.pgridwidget(this.orbConfig(ds,this.orbFields,this.rowFields,this.columnFields,this.dataFields));
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
