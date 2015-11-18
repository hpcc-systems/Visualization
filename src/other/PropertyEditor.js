"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../other/Persist", "../layout/Grid", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_HTMLWidget, root.other_Persist, root.layout_Grid);
    }
}(this, function (d3, HTMLWidget, Persist, Grid) {
    function PropertyEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._childWidgets = {};
        this._flatParams = {};
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showColumns", true, "boolean", "If true, widget.columns() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("showData", true, "boolean", "If true, widget.data() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type",["none","A-Z","Z-A","type"],{tags:["Basic"],icons:["fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc"]});
    PropertyEditor.prototype.publish("collapsed", false, "boolean", "If true, the table will default to collapased",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._table = element.append("table").classed("property-table",true);
        this._thead = this._table.append("thead");
        this._tbody = this._table.append("tbody");
        this._tablePath = "#"+this.id()+" > table";
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        if(!this.widget())return;
        
        this.setWatches();
        
        var discArr = Persist.discover(this.widget());
        if(context.showData()){
            discArr.push({id:"data",type:"array"});
        }
        if(context.showColumns()){
            discArr.push({id:"columns",type:"array"});
        }
        if(context.hideNonWidgets()){
            discArr = discArr.filter(function(n){
                return n.type === "widget" || n.type === "widgetArray";
            });
        }
        
        this._rowSorting(discArr);
        
        var theadRow = this._thead.selectAll(this._tablePath+" > thead > tr").data([this.widget()], function (d) { return d._class; });
        theadRow.enter().append("tr").append("th").attr("colspan","2").text(function(d){
            return d._class.split(" ").pop().split("_").pop();
        }).each(function(){
            context.thButtons(this);
        });
        
        theadRow.exit().remove();
        
        var rows = this._tbody.selectAll(this._tablePath+" > tbody > tr").data(discArr, function (d) { return d.id; });
        
        rows.enter().append("tr")
            .classed("property-wrapper", true)
            .each(function (param) {
                var tr = d3.select(this);
                if(param.type === "widget" || param.type === "widgetArray"){
                    tr.classed("property-widget-wrapper",true);
                    var rowCell = tr.append("td").attr("colspan","2");
                    rowCell.append("span").classed("property-label",true).text(param.id);
                    context.onEnterWidgetRow(rowCell,context.widget(),param);
                } else {
                    tr.classed("property-input-wrapper",true);
                    tr.append("td").classed("property-label",true).text(param.id);
                    
                    var inputCell = tr.append("td").classed("property-input-cell",true);
                    context.appendInputs(inputCell,param);
                    context._flatParams[param.id] = param.id;
                }
            })
        ;
        
        rows.order();
        
        rows.each(function(param){
            if(param.type === "widget" || param.type === "widgetArray"){
                context.onEnterWidgetRow(d3.select(this).select("td"),context.widget(),param);
            } else {
                var inputPath = context._tablePath+" > tbody > tr > td > .property-input";
                context.updateInputs(context.widget(),param,d3.select(this).selectAll(inputPath));
            }
        });
        rows.exit().each(function(d){
            delete context._flatParams[d.id];
            var childId = d3.select(this).attr("data-childid");
            if(childId){
                context._childWidgets[childId].watch.remove();
                context._childWidgets[childId].target(null);
                context._childWidgets[childId].exitAllChildren();
                delete context._childWidgets[childId];
            }
        }).remove();
        
        if (this.widget() instanceof Grid) {
            this.widget().postSelectionChange = function () {
                var selectedItems = context.widget()._selectionBag.get().map(function(item){ return item.widget; });
                element.selectAll(context._tablePath+" [data-widgetid] tr").style("display","none");
                var selected = selectedItems.map(function(n){return n.id();});
                if(selected.length > 0){
                    var selectString = selected.map(function(n){
                                return '[data-widgetid="'+n+'"] tr';
                            }).join(",");
                    element.selectAll(context._tablePath+" > tbody > tr.property-widget-wrapper").style("display","table-row");
                    element.selectAll(selectString).style("display","table-row");
                    context.hideNonWidgets(true);
                } else {
                    element.selectAll(context._tablePath+" tr").style("display","table-row");
                    context.hideNonWidgets(false);
                }
                context.render();
            };
        }
    };
    
    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    PropertyEditor.prototype.exitAllChildren = function () {
        var context = this;
        for(var paramId in context._flatParams){
            if(context._flatParams[paramId] instanceof Array){
                var widgetIdArr = context._flatParams[paramId];
                for(var i = 0;paramId < widgetIdArr.length;paramId++){
                    context._childWidgets[widgetIdArr[i]].watch.remove();
                    context._childWidgets[widgetIdArr[i]].target(null);
                    context._childWidgets[widgetIdArr[i]].exitAllChildren();
                    delete context._childWidgets[widgetIdArr[i]];
                }
            }
        }
    };
    
    PropertyEditor.prototype.setWatches = function (w) {
        var context = this;
        if(context._watch){
            context._watch.remove();
        }
        context._watch = context.widget().watch(function(paramId,newVal,oldVal){
            context.render();
        });
    };
    
    PropertyEditor.prototype.thButtons = function (th) {
        var context = this;
        var collapseIcon = d3.select(th).append("i").classed("fa fa-minus-square-o",true);
        var sortIcon = d3.select(th).append("i")
                .classed("fa "+context.__meta_sorting.ext.icons[context.__meta_sorting.set.indexOf(context.sorting())],true);
        var hideParamsIcon = d3.select(th).append("i").classed("fa "+(context.hideNonWidgets() ? "fa-eye-slash" : "fa-eye"),true);
        collapseIcon.on("click",function(){
            context._table.classed("property-table-collapsed",!context.collapsed());
            collapseIcon
                .classed("fa-minus-square-o",!context._table.classed("property-table-collapsed"))
                .classed("fa-plus-square-o",context._table.classed("property-table-collapsed"));
            context.collapsed(!context.collapsed());
        });
        sortIcon.on("click",function(){
            var sort = context.sorting();
            var types = context.__meta_sorting.set;
            var icons = context.__meta_sorting.ext.icons;
            sortIcon.classed(icons[types.indexOf(sort)],false);
            sortIcon.classed(icons[(types.indexOf(sort)+1)%types.length],true);
            context.sorting(types[(types.indexOf(sort)+1)%types.length]).render();
        });
        hideParamsIcon.on("click",function(){
            hideParamsIcon
                .classed("fa-eye",context.hideNonWidgets())
                .classed("fa-eye-slash",!context.hideNonWidgets());
            context.hideNonWidgets(!context.hideNonWidgets()).render();
        });
    };

    PropertyEditor.prototype.getDataTree = function () {
        var context = this;
        var dendro = {
            label:context._class.split(" ").pop().split("_")[1]+" ("+context.id()+")",
            children:[]
        };
        for(var param_id in this._flatParams){
            if(typeof this._flatParams[param_id] === "string"){
                dendro.children.push({
                    label:param_id
                });
            } else if (this._flatParams[param_id] instanceof Array) {
                var childrenArr = [];
                this._flatParams[param_id].forEach(function(childId){
                    childrenArr.push(context._childWidgets[childId].getDataTree());
                });
                dendro.children.push({
                    label:param_id,
                    children:childrenArr
                });
            }
        }
        return dendro;
    };
    
    PropertyEditor.prototype.onEnterWidgetRow = function (element,widget,param) {
        var context = this;
        var widgetArr = widget[param.id]();
        if(!widgetArr)return;
        widgetArr = widgetArr instanceof Array ? widgetArr : [widgetArr];
        var widgetCell = element.selectAll(this._tablePath+" > tbody > tr > td > div")
                .data(widgetArr, function(d){return d.id();});

        if(context._flatParams[param.id] === undefined){
            context._flatParams[param.id] = [];
        }
        widgetCell.enter().append("div")
            .classed("property-input-cell",true)
            .each(function(w){
                var child = new PropertyEditor().widget(w).target(this).render();
                d3.select(this)
                        .attr("data-childid",child.id())
                        .attr("data-widgetid",w.id());
                context._flatParams[param.id].push(child.id());
                context._childWidgets[child.id()] = child;
            });
        widgetCell.exit().each(function(w){
            context._flatParams[param.id].splice(context._flatParams[param.id].indexOf(w.id()),1);
            w.target(null);
        }).remove();
    };
    
    PropertyEditor.prototype._rowSorting = function (paramArr) {
        if(this.sorting() === "type"){
            var typeOrder = ["boolean","number","string","html-color","array","object","widget","widgetArray"];
            paramArr.sort(function(a,b){
                if(a.type === b.type){
                    return a.id < b.id ? -1 : 1;
                }else{
                    return typeOrder.indexOf(a.type) < typeOrder.indexOf(b.type) ? -1 : 1;
                }
            });
        }
        else if(this.sorting() === "A-Z") {
            paramArr.sort(function(a,b){ return a.id < b.id ? -1 : 1;});
        }
        else if(this.sorting() === "Z-A") {
            paramArr.sort(function(a,b){ return a.id > b.id ? -1 : 1;});
        }
    };
    
    PropertyEditor.prototype.appendInputs = function(cell,param) {
        var input;
        cell.classed(param.type+"-cell",true);
        switch(param.type){
            case 'set':
                input = cell.append("select").classed("property-input",true);
                for(var i = 0;i<param.set.length;i++){
                    input.append("option").attr("value",param.set[i]).text(param.set[i]);
                }
                break;
            case 'string':
            case 'number':
            case 'html-color':
                cell.append("input").classed("property-input",true);
                break;
            case 'boolean':
                cell.append("input").classed("property-input",true).attr("type","checkbox");
                break;
            default:
                cell.append("textarea").classed("property-input",true);
                break;
        }
        if(param.type === 'html-color'){
            cell.append("input").classed("property-input",true).attr("type","color");
        }
    };

    PropertyEditor.prototype.updateInputs = function(widget,param,inpArr){
        inpArr.each(function(n,idx){
            var val = widget[param.id]();
            if(this.type === "checkbox"){
                d3.select(this).property("checked",val)
                    .on("change",function(){
                        widget[param.id](this.checked).render();
                    });
            } else if(this.type === "html-color") {
                d3.select(this).attr("value",val)
                    .on("change",function(){
                        widget[param.id](this.value).render();
                        inpArr[0][(idx+1)%2].value = this.value;
                    });
            } else if(param.type === "array" || param.type === "object") {
                this.value = JSON.stringify(val);
                this.innerHTML = this.value;
                d3.select(this)
                    .on("change",function(){
                        widget[param.id](JSON.parse(this.value)).render();
                    });
            } else if (param.type === "set") {
                d3.select(this).property("value",val)
                    .on("change",function(){
                        widget[param.id](this.value).render();
                    });
            } else {
                d3.select(this).attr("value",val)
                    .on("change",function(){
                        widget[param.id](this.value).render();
                    });
            }
        });
    };
    
    return PropertyEditor;
}));