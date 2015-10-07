"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Widget", "../common/HTMLWidget", "./Persist", "../layout/Grid", "../layout/Accordion", "../form/Form", "../form/Input", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_Widget, root.common_HTMLWidget, root.other_Persist, root.layout_Grid, root.layout_Accordion, root.form_Form, root.form_Input);
    }
}(this, function (d3, Widget, HTMLWidget, Persist, Grid, Accordion, Form, Input) {
    function PropertyEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._columns = ["Key", "Value"];
        this._contentEditors = [];
        this._show_settings = true;
        this._dataDiv = {};
        this._previousIds = "";
    }
    
    PropertyEditor.prototype = Object.create(Accordion.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showColumns", false, "boolean", "Show Columns",null,{tags:["Intermediate"]});
    PropertyEditor.prototype.publish("showData", false, "boolean", "Show Data",null,{tags:["Intermediate"]});
    PropertyEditor.prototype.publish("paramsBeforeWidgets", true, "boolean", "The non-widget parameter collapsible is placed before widget section(s)",null,{tags:["Private"]});
    PropertyEditor.prototype.publish("paramGrouping", "By Widget", "set", "Param Grouping", ["By Param", "By Widget"],{tags:["Basic"]});
    PropertyEditor.prototype.publish("excludeTags", [], "array", "Array of publish parameter tags to exclude from PropertEditor",null,{tags:["Private"]});
    PropertyEditor.prototype.publish("showProperties", [], "array", "Array of publish parameter IDs to include in PropertEditor (all others will be excluded)",null,{tags:["Private"]});
    
    PropertyEditor.prototype.publish("settingsWidget", null, "widget", "Another instance of PropertyEditor containing the publish parameters for the main instance of PropertyEditor",null,{tags:["Private"]});
    
    PropertyEditor.prototype.publish("ignoredClasses", [], "array", "Array of class chain substrings to hide params on match",null,{tags:["Basic"]});

    PropertyEditor.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var context = this;
            if (_[0] instanceof Grid) {
                _[0].postSelectionChange = function () {
                    var selectedItems = _[0]._selectionBag.get().map(function(item){ return item.widget; });
                    context
                        .data(selectedItems.length > 0 ? selectedItems : [_[0]])
                        .paramGrouping( selectedItems.length > 1 ? "By Param" : "By Widget")
                        .render();
                };
            }
        }
        return retVal;
    };

    PropertyEditor.prototype.show_settings = function (_) {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    };
    PropertyEditor.prototype.excludeWidgets = function (_) {
        if (!arguments.length) {
            return this._excludeWidgets;
        }
        this._excludeWidgets = _;
        return this;
    };

    PropertyEditor.prototype.onChange = function (widget, propID) {};

    PropertyEditor.prototype.paramFilter = function (){
        var showPropsList = this.showProperties();
        var excludeTagsList = this.excludeTags();
        return function (widget, publishItem){
            var showProperties = showPropsList;
            if(showProperties.length > 0){
                if(showProperties.indexOf(publishItem.id) === -1){
                    return true;
                }
            }
            if(excludeTagsList.length > 0){
                if(typeof(publishItem.ext) === "object" && typeof(publishItem.ext.tags) === "object"){
                    for(var tag in publishItem.ext.tags){
                        if(excludeTagsList.indexOf(publishItem.ext.tags[tag]) !== -1){
                            return true;
                        }
                    }
                }
            }
            return false;
        };
    };

    PropertyEditor.prototype.enter = function (domNode, element) {
        Accordion.prototype.enter.apply(this, arguments);
        
        if(this._parentElement.filter(".other_PropertyEditor div").empty()){
            this._parentElement.style("overflow", "auto");
        }
        
        if(this.title() === ""){
            this.title("Property Editor");
        }
        if (this.show_settings()) {
            this.pushListItem(
                new PropertyEditor()
                    .showColumns(false)
                    .showData(false)
                    .show_settings(false)
                    .excludeWidgets(true)
                    .defaultCollapsed(true)
                    .excludeTags(["Private"])
                    .paramGrouping("By Widget")
                    .title("Editor Settings")
                    .data([this]),null,true
            );
        }
    };
    
    PropertyEditor.prototype.update = function (domNode, element) {
        var context = this;
        
        switch(this.paramGrouping()){
            case "By Param":
                var paramObjs = this.getAllParams();
                
                this.clearListItems();
                
                this.removeWatches();
                for(var j in this.data()) {
                    this.createWatch(this.data()[j]);
                }

                var categorizedParams = this.categorizeParams(paramObjs);

                for(var categoryName in categorizedParams){
                    var paramArr1 = [];
                    for(var paramNode in categorizedParams[categoryName]){
                        var pNode = categorizedParams[categoryName][paramNode];
                        paramArr1.push(this.getSharedParamInputObj(pNode));
                    }
                    this.pushListItem(
                        new Accordion()
                            .title(categoryName+":")
                            .pushListItem(new Form().showSubmit(false).inputs(paramArr1))
                    );
                }
                break;
            case "By Widget":
                this.clearListItems();

                this.removeWatches();

                for(var i in this.data()) {
                    this.createWatch(this.data()[i]);
                    var paramArr2 = [];
                    var parentWidgetClass = this.data()[i]._class.split("_").pop();
                    Persist.propertyWalker(this.data()[i],context.paramFilter(),function(widget, param){
                        switch(param.type){
                            case "widget":
                                if(!context.excludeWidgets()){
                                    var wClass = widget[param.id]()._class.split("_").pop();
                                    context.pushListItem(
                                        new PropertyEditor()
                                        .showData(context.showData())
                                        .showColumns(context.showColumns())
                                        .show_settings(false)
                                        .title(wClass)
                                        .data([widget[param.id]()])
                                        .ignoredClasses(context.ignoredClasses())
                                    );
                                }
                                break;
                            case "widgetArray":
                                if(!context.excludeWidgets()){
                                    var w = widget[param.id]();
                                    var wClassArr = [];
                                    for(var widx in w){
                                        wClassArr.push(w[widx]._class.split("_").pop());
                                    }
                                    context.pushListItem(
                                        new PropertyEditor()
                                            .show_settings(false)
                                            .title(parentWidgetClass+"."+param.id+": ["+wClassArr.join(", ")+"]")
                                            .data(w)
                                            .ignoredClasses(context.ignoredClasses())
                                    );
                                }
                                break;
                            default:
                                paramArr2.push(context.getParamInputObj(widget,param));
                                break;
                        }
                    });

                    if(this.showData()){
                        paramArr2.push(this.getDataInputObj(this.data()[i]));
                    }
                    if(this.showColumns()){
                        paramArr2.push(this.getColumnsInputObj(this.data()[i]));
                    }

                    if(paramArr2.length > 0 && this.classIsNotHidden(this.data()[i]._class)){
                        var paramListItem;
                        if(this.excludeWidgets()){
                            this.clearListItems();
                            paramListItem = new Form().showSubmit(false).inputs(paramArr2);
                        } else {
                            if(this.content().length > 0){
                                paramListItem = new Accordion()
                                    .title(parentWidgetClass+" Params:")
                                    .pushListItem(
                                        new Form().showSubmit(false).inputs(paramArr2)
                                    )
                                ;
                            } else {
                                paramListItem = new Form().showSubmit(false).inputs(paramArr2);
                            }
                        }
                        this.pushListItem(paramListItem,this.paramsBeforeWidgets());
                    }
                }
                break;
        }
        Accordion.prototype.update.apply(this, arguments);
    };
    
    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    PropertyEditor.prototype.removeWatches = function(){
        for(var n in this.__propertyEditor_watch){
            if(typeof (this.__propertyEditor_watch[n].remove) === "function"){
                this.__propertyEditor_watch[n].remove();
            }
        }
        this.__propertyEditor_watch = [];
    };
    
    PropertyEditor.prototype.createWatch = function(obj){
        var context = this;
        this.__propertyEditor_watch.push(obj.watch(function(key, newVal){
            if(typeof (newVal) === "object"){
                context.render();
            }
        }));
    };
    
    PropertyEditor.prototype.categorizeParams = function (arr) {
        var categories = {
            "Colors":["palette","color"],
            "Font":["font"],
            "Axis":["axis"],
            "General":[],
        };
        var ret = {};
        for(var p in arr){
            for(var c in categories){
                if(p.toLowerCase().indexOf(categories[c]) !== -1){
                    break;
                }
            }
            if(typeof (ret[c]) === "undefined"){
                ret[c] = [];
            }
            ret[c].push(arr[p]);
        }
        return ret;
    };
    
    PropertyEditor.prototype.classIsNotHidden = function (classNameString) {
        var classesToHide = this.ignoredClasses();
        for(var n in classesToHide){
            if(classNameString.indexOf(classesToHide[n]) !== -1){
                return false;
            }
        }
        return true;
    };
    
    PropertyEditor.prototype.getAllParams = function () {
        var context = this;
        var paramObjArr = {};
        for(var i in this.data()){
            Persist.widgetPropertyWalker(this.data()[i],context.paramFilter(),function(widget, param){
                switch(param.type){
                    case "widget":
                    case "widgetArray":
                        break;
                    default:
                        if(typeof (paramObjArr[param.id]) === "undefined"){
                            paramObjArr[param.id] = [];
                        }
                        paramObjArr[param.id].push({
                            widget:widget,
                            param:param,
                        });
                        break;
                }
            });
        }
        return paramObjArr;
    };
    
    PropertyEditor.prototype.getParamInputObj = function (widget,paramObj) {
        var val = ["widget","widgetArray"].indexOf(paramObj.type) === -1 ? widget[paramObj.id]() : null;
        var inp = new Input()
            .name(widget._id+"-"+paramObj.id)
            .label(paramObj.id)
            .type(this.inputTypeMapping(paramObj.type))
            .value(val)
        ;
        if(paramObj.type === "set"){
            inp.selectOptions(paramObj.set).value(val);
        }
        inp.change = function(w){
            if(paramObj.type === "boolean"){
                widget[paramObj.id](w._element.select("input").property("checked")).render();
            } else if(paramObj.type === "array") {
                var newArrayVal = w.value().split(",").filter(function(a){return a.length;});
                widget[paramObj.id](newArrayVal).render();
            } else {
                widget[paramObj.id](w.value()).render();
            }
        };
        inp._paramId = paramObj.id;
        return inp;
        
    };
    
    PropertyEditor.prototype.getSharedParamInputObj = function (sharedParamObj) {
        var paramId = sharedParamObj[0].param.id;
        var type = sharedParamObj[0].param.type;
        var inp = new Input()
            .name(paramId)
            .label(paramId)
            .type(this.inputTypeMapping(type))
        ;
        if(type === "set"){
            inp.selectOptions(sharedParamObj[0].param.set);
        }
        inp.change = function(w){
            for(var i in sharedParamObj){
                if(type === "boolean"){
                    sharedParamObj[i].widget[paramId](w._element.select("input").property("checked")).render();
                } else if(type === "array") {
                    var newArrayVal = w.value().split(",").filter(function(a){return a.length;});
                    sharedParamObj[i].widget[paramId](newArrayVal).render();
                } else {
                    sharedParamObj[i].widget[paramId](w.value()).render();
                }
            }
        };
        inp._paramId = paramId;
        return inp;
    };
    
    PropertyEditor.prototype.getDataInputObj = function (widget) {
        var dataStr = "";
        try{
            dataStr = JSON.stringify(widget.data());
        }catch(e){}
        var inp = new Input()
            .name(widget._id+"-data")
            .label("Data")
            .type("textarea")
            .value(dataStr)
        ;
        inp.change = function(w){
            try{
                widget.data(JSON.parse(w.value())).render();
            }catch(e){}
        };
        return inp;
    };
    PropertyEditor.prototype.getColumnsInputObj = function (widget) {
        var inp = new Input()
            .name(widget._id+"-columns")
            .label("Columns")
            .type("textarea")
            .value(widget.columns())
        ;
        inp.change = function(w){
            widget.columns(w.value().split(",")).render();
        };
        return inp;
    };
    
    PropertyEditor.prototype.inputTypeMapping = function (type){
        switch(type){
            case "set": return "select";
            case "array": return "textarea";
            case "boolean": return "checkbox";
            case "string": return "text";
            default: return type;
        }
    };
    
    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));
