"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/common/HTMLWidget","../common/Utility","../common/PropertyExt","css!orb", "css!./Orb"], factory);
    } else {
        root.template_Orb = factory(root.common_HTMLWidget, root.common_Utility, root.common_PropertyExt, root.React);
    }
}(this, function (HTMLWidget, Utility, PropertyExt) {
    var orb = null
    function Orb(target) {
        HTMLWidget.call(this);
    }


function mapping(owner){
	PropertyExt.call(this);
	this._owner = owner;
}


var fields =[];
var savedField = [];
var savedTableField = [];
var rowFields = [];
var dataFields = [];
var columnFields = [];





mapping.prototype = Object.create(PropertyExt.prototype);
mapping.prototype.constructor = mapping;
mapping.prototype._class += " react_Orb";
mapping.prototype.publish("addField", "", "set", "Show Toolbox or not",function() { return this._owner ? this._owner.columns() : [];}, {optional: true} );
mapping.prototype.publish("aggregateFunc", "", "set", "Aggregate Function type",['sum','count','min','max','avg','prod','var','varp','stdev','stdevp'], {optional: true} );
mapping.prototype.publish("location", true, "set", "Data Location",['row','column','data'], { tags: ["basic"] });






Orb.prototype = Object.create(HTMLWidget.prototype);
Orb.prototype.constructor = Orb;
Orb.prototype._class += " react_Orb";

Orb.prototype.mapping = mapping;
Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

Orb.prototype.publish("toolbar", true, "boolean", "Show Toolbox or not", null, { tags: ["basic"] });
Orb.prototype.publish("themeColor", "blue", "set", "Theme color", ['blue','red','black','green'], { tags: ["basic"] });
Orb.prototype.publish("mappings" ,[], "propertyArray", "Source Columns", null, { autoExpand : mapping});
Orb.prototype.publish("removeField", "", "set", "Show Toolbox or not", Orb.prototype.columns,{ tags: ["basic"] });

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
	        rows: rowFields,
	        columns: columnFields,
	        data: dataFields

	    }

	    return config;
	    	
    };
    

    Orb.prototype.enter = function (domNode, element) {
        
        HTMLWidget.prototype.enter.apply(this, arguments);

        var ds = this.data();
		var columns = this.columns();

        this._div = element.append("div").attr("id", this.id() + "_orb")
       
        

        this._orb = new orb.pgridwidget(this.orbConfig())
	    this._orb.render(document.getElementById(this.id() + "_orb"));
              
        
    };


    Orb.prototype.update = function (domNode, element) {
    	
    
		HTMLWidget.prototype.update.apply(this, arguments);      

		var ds = this.data();
		var columns = this.columns();
               
       for (var i=0;i<fields.length;i++){
       		savedField.push(fields[i].caption);
       }
  	

    	for (var k=0;k<this.mappings().length;k++){
    		if (savedField.indexOf(this.mappings()[k].__prop_addField) == -1){

    		   var fieldIndex = columns.indexOf(this.mappings()[k].__prop_addField);

    		   if (fieldIndex != -1){
	    		   fields.push({
	    		   		name: fieldIndex.toString(),
	    		   		caption: this.mappings()[k].__prop_addField
	    		   })
    		   }
    		  
    		
	       }
    	}

    	for (var k=0; k<this.mappings().length; k++){
    		if (this.mappings()[k].__prop_addField != null && this.mappings()[k].__prop_aggregateFunc != null){
    			for (var i=0;i<fields.length;i++){
    				if (fields[i].caption == this.mappings()[k].__prop_addField){
    					fields[i].dataSettings={
    						aggregateFunc:this.mappings()[k].__prop_aggregateFunc,
    						formatFunc: function(value){
    							return value ? Number(value).toFixed(2) : '';
    						}
    					

    					}
    					break;
    				}
    			}
    		}
    	}


    	for (var k=0; k<this.mappings().length; k++){
    		if (this.mappings()[k].__prop_addField != null && savedTableField.indexOf(this.mappings()[k].__prop_addField) == -1){

    			switch(this.mappings()[k].__prop_location){    				

    				case 'row':
    					if (rowFields.indexOf(this.mappings()[k].__prop_addField) == -1){
    						rowFields.push(this.mappings()[k].__prop_addField);
    						savedTableField.push(this.mappings()[k].__prop_addField);
    					}
    					
    					break;

    				case 'column':
    				if (columnFields.indexOf(this.mappings()[k].__prop_addField) == -1){
    					columnFields.push(this.mappings()[k].__prop_addField);
    					savedTableField.push(this.mappings()[k].__prop_addField);
    				}
    					break;

    				case 'data':
    				if (dataFields.indexOf(this.mappings()[k].__prop_addField) == -1){
    					dataFields.push(this.mappings()[k].__prop_addField);
    					savedTableField.push(this.mappings()[k].__prop_addField);
    					break;
    				}


    			}
    		}
    	}

    	
    	if (this.removeField()){
    		for (var i=0;i<fields.length;i++){
    			if (fields[i].caption == this.removeField()){
    				fields.splice(i,1);
    				break;

    			}
    		}

    		for (var i=0;i<rowFields.length;i++){
    			if (rowFields[i] ==this.removeField()){
    				rowFields.splice(i,1);
    				break;
    			}
    		}

    		for (var i=0;i<columnFields.length;i++){
    			if (columnFields[i] ==this.removeField()){
    				columnFields.splice(i,1);
    				break;
    			}
    		}

    		for (var i=0;i<dataFields.length;i++){
    			if (dataFields[i] ==this.removeField()){
    				dataFields.splice(i,1);
    				break;
    			}
    		}
    	}

    	
    	React.unmountComponentAtNode(document.getElementById(this.id() + "_orb"));
    	this._div = element.append("div").attr("id", this.id() + "_orb")
    	
 
    	this._orb = new orb.pgridwidget(this.orbConfig(ds,fields,rowFields,columnFields,dataFields))

        this._orb.render(document.getElementById(this.id() + "_orb"));
        
	        
	          
 		
    };

    Orb.prototype.exit = function (domNode, element) {
        
        this._div.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Orb.prototype.render = function (domNode, element) {
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
