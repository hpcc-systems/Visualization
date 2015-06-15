"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget", "../common/HTMLWidget", "./Persist", "./PropertyEditor", "css!./ThemeEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.common_Widget, root.common_HTMLWidget, root.other_Persist, root.other_PropertyEditor);
    }
}(this, function (Widget, HTMLWidget, Persist, PropertyEditor) {
    function ThemeEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._current_grouping = undefined;
        this._showing_columns = undefined;
        this._showing_data = undefined;
        this._columns = ["Key", "Value"];
        this._contentEditors = [];
        this._showSettings = true;

        this._defaultThemes = [];

        this._widgetObjsById = {};
    }
    var getThemes = function(idx){
        g_defaultThemes(idx); // jshint ignore:line
        return JSON.parse(localStorage.themeEditorThemes);
    };
    var getSerials = function(idx){
        g_defaultSerials(idx); // jshint ignore:line
        return JSON.parse(localStorage.themeEditorSerials);
    };
    var getThemeNames = function(idx){
        var loadedThemes = getThemes();
        var themes = [];
        for(var themeName in loadedThemes){
            themes.push(themeName);
        }
        if(typeof(idx) !== "undefined" && typeof(themes[idx]) !== "undefined"){
            themes = themes[idx];
        }
        return themes;
    };
    var getSerialNames = function(idx){
        var loadedSerials = getSerials();
        var serials = [];
        for(var serialName in loadedSerials){
            serials.push(serialName);
        }
        if(typeof(idx) !== "undefined" && typeof(serials[idx]) !== "undefined"){
            serials = serials[idx];
        }
        return serials;
    };
    ThemeEditor.prototype = Object.create(HTMLWidget.prototype);
    ThemeEditor.prototype._class += " other_ThemeEditor";

    ThemeEditor.prototype.publish("themeMode", true, "boolean", "Edit default values",null,{tags:['Basic']});
    ThemeEditor.prototype.publish("saveTheme", "", "string", "Save Theme",null,{tags:['Basic','Theme'],saveButton:'Save',saveButtonID:'te-save-button'});
    ThemeEditor.prototype.publish("loadedTheme", getThemeNames(1), "set", "Loaded Theme",getThemeNames(),{tags:['Basic','Theme']});
    ThemeEditor.prototype.publish("saveSerial", "", "string", "Save Serial",null,{tags:['Basic','Serial'],saveButton:'Save',saveButtonID:'te-save-button'});
    ThemeEditor.prototype.publish("loadedSerial", getSerialNames(0), "set", "Loaded Serial",getSerialNames(),{tags:['Basic','Serial']});
    ThemeEditor.prototype.publish("showColumns", true, "boolean", "Show Columns",null,{tags:['Intermediate']});
    ThemeEditor.prototype.publish("showData", true, "boolean", "Show Data",null,{tags:['Intermediate']});
    ThemeEditor.prototype.publish("shareCountMin", 1, "number", "Share Count Min",null,{tags:['Private']});
    ThemeEditor.prototype.publish("paramGrouping", "By Param", "set", "Param Grouping", ["By Param", "By Widget"],{tags:['Private']});
    ThemeEditor.prototype.publish("editorComplexity", "Basic", "set", "Choose what publish properties to display within the editor.", ["Basic", "Intermediate", "Advanced", "Private"],{tags:['Private']});
    ThemeEditor.prototype.publish("sectionTitle", "", "string", "Section Title",null,{tags:['Private']});
    ThemeEditor.prototype.publish("collapsibleSections", true, "boolean", "Collapsible Sections",null,{tags:['Intermediate']});

    ThemeEditor.prototype.getThemes = getThemes;
    ThemeEditor.prototype.getSerials = getSerials;
    ThemeEditor.prototype.getDefaultThemes = getThemeNames;
    ThemeEditor.prototype.getDefaultSerials = getSerialNames;

    ThemeEditor.prototype.showSettings = function (_) {
        if (!arguments.length) {
            return this._showSettings;
        }
        this._showSettings = _;
        return this;
    };

    ThemeEditor.prototype.onChange = function (widget, propID) {};

    ThemeEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
    };

    var tableNeedsRedraw = function (context) {
        var needsRedraw = false;
        if (typeof (context._current_grouping) === 'undefined') {
            context._current_grouping = context._group_params_by;
        } else if (context._current_grouping !== context._group_params_by) {
            needsRedraw = true;
        }
        if (typeof (context._showing_columns) === 'undefined') {
            context._showing_columns = context.showColumns();
        } else if (context._showing_columns !== context.showColumns()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_data) === 'undefined') {
            context._showing_data = context.showData();
        } else if (context._showing_data !== context.showData()) {
            needsRedraw = true;
        }
        return needsRedraw;
    };

    ThemeEditor.prototype.widgetProperty = function (widget, propID, _) {
        if (_ === undefined) {
            return widget[propID]();
        }
        return widget[propID](_);
    };

    ThemeEditor.prototype.load = function(){};

    ThemeEditor.prototype.save = function(){};

    ThemeEditor.prototype.needsPropTableRedraw = function (domNode, element) {
        var ret = document.getElementById('te-themeEditorOptions') === null;
        return ret;
    };

    ThemeEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (tableNeedsRedraw(this)) {
            element.selectAll("#" + this._id + " > table").remove();
        }
        this._current_grouping = this.paramGrouping();
        this._widgetObjsById[this._id] = this;
        this._sharedProperties = this.findSharedProperties(this._data);

        var needsPropertiesTableRedraw = this.needsPropTableRedraw();
        if(needsPropertiesTableRedraw && this.showSettings()){
            var teParams = Persist.discover(this);
            for(var i in teParams){
                if(teParams[i].ext.tags.indexOf(this.editorComplexity()) !== -1){
                    var teParamVal = this[teParams[i].id]();
                    if(teParams[i].id === "loadedTheme" || teParams[i].id === "loadedSerial"){
                        teParams[i].inputID = 'te-load-theme';
                    }
                    teParams[i].input = tableInputHtml(teParams[i],teParamVal,[this._id],this._id);
                } else {
                    delete teParams[i];
                }
            }
            domNode.innerHTML = this.propertiesTableHtml(teParams);
            var evt = document.createEvent("Events");
            evt.initEvent("TE Properties Ready", true, true);
            document.dispatchEvent(evt);
        }

        this.buildTableObjects(domNode,this._sharedProperties);

        this.initFunctionality(domNode);
    };

    ThemeEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    ThemeEditor.prototype.click = function (d) {
    };

    ThemeEditor.prototype.propertiesTableHtml = function (editorParams) {
        var tableObj = {
            id:'te-themeEditorOptions',
            label:'Editor Options',
            rowArr: []
        };
        var modeTableObj = {
            id:'te-tableModeOptions',
            label:this.themeMode() ? 'Save/Load Theme' : 'Save/Load Serial',
            rowArr: []
        };
        for(var i in editorParams){
            if(this.themeMode()){
                if(editorParams[i].ext.tags.indexOf('Theme') === -1 && editorParams[i].ext.tags.indexOf('Serial') === -1){
                    tableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:'propertyRow',
                    });
                }
                else if(editorParams[i].ext.tags.indexOf('Theme') !== -1){
                    modeTableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:'propertyRow',
                    });
                }
            } else {
                if (editorParams[i].ext.tags.indexOf('Serial') === -1 && editorParams[i].ext.tags.indexOf('Theme') === -1){
                    tableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:'propertyRow',
                    });
                }
                else if (editorParams[i].ext.tags.indexOf('Serial') !== -1){
                    modeTableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:'propertyRow',
                    });
                }
            }

        }
        var html = '';
        if(tableObj.rowArr.length > 0){
            html += this.tableObjHtml(tableObj);
        }
        if(modeTableObj.rowArr.length > 0){
            html += this.tableObjHtml(modeTableObj);
        }
        return html;
    };
    ThemeEditor.prototype.buildTableObjects = function(targetElement, propObjs){
        var sectionObjs = {};
        if(this.themeMode()){
            sectionObjs = {
                'chartColorSection':{
                    id:'te-colorOptions',
                    label:'Chart Colors',
                    rowObjArr: []
                },
                'surfaceSection':{
                    id:'te-containerOptions',
                    label:'Container Styles/Colors',
                    rowObjArr: []
                },
                'fontSection':{
                    id:'te-fontOptions',
                    label:'Font Styles/Colors',
                    rowObjArr: []
                }
            };
        } else {
            sectionObjs = {
                'nonSurfaceSection':{
                    id:'te-chartOptions',
                    label:'Chart Properties',
                    rowObjArr: []
                }
            };
        }
        for(var p in propObjs){
            if(this.themeMode()){
                if(p.toUpperCase().indexOf('FONT') !== -1 && !(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1 && p.toUpperCase().indexOf('COLOR') !== -1)){
                    sectionObjs['fontSection'].rowObjArr.push(propObjs[p]);
                }
                else if(p === "paletteID"){
                    sectionObjs['chartColorSection'].rowObjArr.push(propObjs[p]);
                }
                else if(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1){
                    sectionObjs['surfaceSection'].rowObjArr.push(propObjs[p]);
                }
            } else {
                if(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") === -1){
                    sectionObjs['nonSurfaceSection'].rowObjArr.push(propObjs[p]);
                }
            }
        }
        var html = '';
        for(var i in sectionObjs){
            html += this.sharedPropertyTableHtml(sectionObjs[i]);
        }
        targetElement.innerHTML += html;
    };

    ThemeEditor.prototype.initFunctionality = function(elm){
        var context = this;
        _expandCollapse(elm);
        _inputOnChange(elm);
        _inputOnClick(elm);
        function _inputOnClick(elm){
            if(context.showSettings()){
                var saveBtn = document.getElementById('te-save-button');
                saveBtn.onclick = function(e){
                    var clickedElm = e.srcElement;
                    var themeName = clickedElm.previousSibling.value;
                    if(themeName.length > 1){
                        var loadSelect = document.getElementById('te-load-theme');
                        var loadOptions = loadSelect.getElementsByTagName('option');
                        var saveExists = false;
                        var saveStr;
                        for(var i in loadOptions){
                            var val = loadOptions[i].value;
                            if(val === themeName){
                                saveExists = true;
                            }
                        }
                        if(!saveExists){
                            saveStr = context.save(themeName);
                            loadSelect.innerHTML += '<option value="'+themeName+'">'+themeName+'</option>';
                        } else {
                            var overwrite = confirm("'"+themeName+"' already exists. Do you want to overwrite the existing save?");
                            if (overwrite) {
                                saveStr = context.save(themeName);
                            }
                        }
                        clickedElm.previousSibling.value = '';
                        loadSelect.value = themeName;
                    } else {
                        alert('Save Name cannot be empty.');
                    }
                };
            }
        }
        function _inputOnChange(elm){
            var teInputs = elm.getElementsByClassName('te-input');
            for(var i in teInputs){
                if(isNaN(parseInt(i)))break;
                var inputElm = teInputs[i];
                var inputID = inputElm.getAttribute('id');
                if(inputID === "te-load-theme"){
                    inputElm.onchange = function (e){
                        var elm = e.srcElement;
                        context.load(elm.value);
                    };
                }
                else if(inputID !== null && inputID.indexOf("te-input-themeMode") !== -1){
                    inputElm.onchange = function (e){
                        var elm = e.srcElement;
                        context.themeMode(elm.checked);

                        var name = document.getElementById("te-load-theme");
                        var nameToLoad = name !== null ? name.value : "Default";
                        context.load(nameToLoad);
                    };
                }
                else if(inputElm.tagName === 'INPUT' || inputElm.tagName === 'SELECT' || inputElm.tagName === 'TEXTAREA'){
                    inputElm.onchange = function(e){
                        var elm = e.srcElement;

                        var id = elm.getAttribute('id');

                        if (elm.className.split(' ').indexOf('te-html-color-button') !== -1){
                            id = elm.previousSibling.getAttribute('id');
                            elm.previousSibling.value = elm.value;
                        }
                        var elmType = elm.getAttribute('type');
                        var splitId = id.split('-');
                        var genericId = splitId.slice(0,splitId.length-1).join('-') + '-';

                        var widsStr = elm.getAttribute('data-wids');
                        var paramId = elm.getAttribute('data-paramid');
                        var widArr = widsStr.split(',');
                        widArr.forEach(function(wid){
                            var individualId = genericId + wid;
                            var indElm = document.getElementById(individualId);
                            if(elmType === "checkbox"){
                                indElm.checked = elm.checked;
                                context._widgetObjsById[wid][paramId](elm.checked);
                            }
                            else if (elm.getAttribute('data-type') === 'array') {
                                indElm.value = elm.value;
                                try{
                                    context._widgetObjsById[wid][paramId](JSON.parse(elm.value));
                                }catch(e){}
                            }
                            else {
                                indElm.value = elm.value;
                                context._widgetObjsById[wid][paramId](elm.value);

                                if (indElm.className.split(' ').indexOf('te-html-color-input') !== -1){
                                    indElm.nextSibling.value = elm.value;
                                }
                                else if (indElm.className.split(' ').indexOf('te-html-color-button') !== -1) {
                                    indElm.previousSibling.value = elm.value;
                                }
                            }
                        });
                        context._data.forEach(function(d){
                            d.render();
                        });
                    };
                }
            }
        }
        function _expandCollapse(elm){
            var tableArr = elm.getElementsByClassName('te-section-table');
            for(var i in tableArr){
                if(typeof(tableArr[i].getElementsByTagName) === 'function'){
                    var thead = tableArr[i].getElementsByTagName('thead');
                    thead[0].onclick = function(e){
                        var elm = e.toElement;
                        if(elm.tagName === 'TH'){
                            elm = elm.parentElement.parentElement;
                        }
                        var parent = elm.parentElement;
                        var tbodyClass = '';
                        if(parent.className.split(' ').indexOf('expanded') === -1){
                            parent.className = 'te-section-table expanded';
                            tbodyClass = 'shown';
                        } else {
                            parent.className = 'te-section-table collapsed';
                            tbodyClass = 'hidden';
                        }
                        var tbody = parent.getElementsByTagName('tbody');
                        tbody[0].className = tbodyClass;
                    };
                }
            }
            var sharedRowArr = elm.getElementsByClassName('sharedPropertyRow');
            for(var n in sharedRowArr){
                if(typeof(sharedRowArr[n].getElementsByClassName) === 'function'){
                    var label = sharedRowArr[n].getElementsByClassName('te-label');
                    label[0].onclick = function(e){
                        var elm = e.toElement;
                        var parent = elm.parentElement;
                        var subRowClass = '';
                        if(parent.className.split(' ').indexOf('expanded') === -1){
                            parent.className = 'sharedPropertyRow expanded';
                            subRowClass = 'shown';
                        } else {
                            parent.className = 'sharedPropertyRow collapsed';
                            subRowClass = 'hidden';
                        }
                        var nextSib = parent.nextSibling;
                        while(nextSib !== null){
                            if(nextSib.className.split(' ').indexOf('sharedPropertyRow') === -1){
                                nextSib.className = 'propertyRow '+subRowClass;
                                nextSib = nextSib.nextSibling;
                            } else {
                                nextSib = null;
                            }
                        }
                    };
                }
            }
        }
    };
    ThemeEditor.prototype.sharedPropertyTableHtml = function(sectionObj){
        var tableObj = {
            id:sectionObj.id,
            label:sectionObj.label,
            rowArr: []
        };
        sectionObj.rowObjArr.forEach(function(rowObj){
            rowObj.arr.forEach(function(widgetObj,widgetIdx){
                if(widgetIdx === 0){
                    tableObj.rowArr.push({
                        th:_sharedPropertyLabel(rowObj),
                        td:_sharedPropertyInput(rowObj),
                        trClass:'sharedPropertyRow collapsed'
                    });
                }
                tableObj.rowArr.push({
                    th:_propertyLabel(widgetObj),
                    td:_propertyInput(rowObj,widgetIdx),
                    trClass:'propertyRow hidden'
                });
            });
        });

        return this.tableObjHtml(tableObj);

        function _propertyLabel(widgetObj){
            var spaceSplit = widgetObj.widget._class.split(' ');
            var splitClass = spaceSplit[spaceSplit.length-1].split('_');
            var displayClass = splitClass.join('/');
            return displayClass + ' <i>[' + widgetObj.widget._id + ']</i>';
        }
        function _sharedPropertyLabel(rowObj){
            return camelizeString(rowObj.id);
        }

        function _propertyInput(rowObj,idx){
            var value = _value(rowObj,idx);
            var html = tableInputHtml(rowObj,value,[rowObj.arr[idx]],rowObj.arr[idx].widget._id);
            return html;

            function _value(rowObj,idx){
                var value = rowObj.arr[idx].widget[rowObj.id]();
                return value !== null ? value : '';
            }
        }
        function _sharedPropertyInput(rowObj){
            var value = _sharedValue(rowObj);
            var html = tableInputHtml(rowObj,value,rowObj.arr,'shared');
            return html;

            function _sharedValue(rowObj){
                var value = rowObj.arr[0].widget[rowObj.id]();
                rowObj.arr.forEach(function(w,i){
                    if(value !== w.widget[w.id]()){
                        return '';
                    }
                });
                if(value !== null){
                    if(rowObj.type === 'array'){
                        return JSON.stringify(value);
                    }
                    return value;
                }
                return '';
            }
        }
    };

    var camelizeString = function(str){
        var spacedText = str.split(/(?=[0-9A-Z])/).map(function(n){return n.length > 1 ? n+' ' : n;}).join('');
        return spacedText.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    var tableInputHtml = function (rowObj,value,widgetArr,idSuffix){
        var inputHtml = '';
        var id = 'te-input-'+rowObj.id+'-'+idSuffix;

        var inputType;
        if (typeof (rowObj.ext) !== 'undefined' && typeof (rowObj.ext.inputType) !== 'undefined') {
            inputType = rowObj.ext.inputType;
        }

        if(typeof(rowObj.inputID) !== "undefined"){
            id = rowObj.inputID;
        }

        var dataWIDs = 'data-paramid="'+rowObj.id+'" data-wids="'+widgetArr.map(function(w){
            if(typeof(w.widget) === "object"){
                return w.widget._id;
            } else {
                return w;
            }
        }).join(',')+'"';
        switch(rowObj.type){
            case "boolean":
                var checked = value ? ' checked' : '';
                inputHtml = '<input id="'+id+'" '+dataWIDs+' type="checkbox" class="te-checkbox te-input"'+checked+'>';
                break;
            case "number":
                if (typeof (inputType) !== 'undefined') {
                    if (inputType === "textarea") {
                        inputHtml = '<textarea id="'+id+'" class="te-textarea te-input" '+dataWIDs+'>'+value+'</textarea>';
                    }
                    else if (inputType === 'range') {
                        inputHtml = '<input id="'+id+'" class="te-input" type="range" '+dataWIDs+' value="'+value+'" min="'+rowObj.ext.min+'" max="'+rowObj.ext.max+'" step="'+rowObj.ext.step+'">';
                    }
                }
                else {
                    inputHtml = '<input id="'+id+'" type="text" class="te-text te-input" '+dataWIDs+' value="'+value+'">';
                }
                break;
            case "string":
                if (typeof (inputType) !== 'undefined') {
                    if (inputType === "textarea") {
                        inputHtml = '<textarea id="'+id+'" class="te-textarea te-input" '+dataWIDs+'>'+value+'</textarea>';
                    }
                }
                else {
                    inputHtml = '<input id="'+id+'" type="text" class="te-text te-input" value="'+value+'" '+dataWIDs+'>';
                }
                break;
            case "html-color":
                var valueAttr = value === '' ? '' : ' value="'+value+'"';
                inputHtml = '<input id="'+id+'" type="text" class="te-html-color-input te-input" '+dataWIDs+' '+valueAttr+'>';
                inputHtml += '<input type="color" class="te-html-color-button te-input" '+dataWIDs+' '+valueAttr+'>';
                break;
            case "set":
                var options = _options(rowObj,value);
                inputHtml = '<select id="'+id+'" class="te-select te-input" '+dataWIDs+'>'+options+'</select>';
                break;
            case "array":
                inputHtml = '<textarea id="'+id+'" class="te-textarea te-input" data-type="array" '+dataWIDs+'>'+value+'</textarea>';
                break;
            default:
                break;
        }
        if(typeof(rowObj.ext.saveButton) !== "undefined"){
            inputHtml += '<button id="'+rowObj.ext.saveButtonID+'">'+rowObj.ext.saveButton+'</button>';
        }
        return inputHtml;

        function _options(obj,val){
            var options = '';
            obj.set.forEach(function(s){
                var selected = s === val ? ' selected' : '';
                options += '<option value="'+s+'"'+selected+'>'+s+'</option>';
            });
            return options;
        }
    };

    ThemeEditor.prototype.tableObjHtml = function (tableObj) {
        var html = '<table id="'+tableObj.id+'" class="te-section-table expanded">';
            html += '<thead><tr><th colspan="2">'+tableObj.label+'</th></tr></thead>';
            html += '<tbody>';
                tableObj.rowArr.forEach(function(rowObj){
                    html += this.tableRowObjHtml(rowObj);
                },this);
            html += '</tbody>';
        return html + '</table>';
    };
    ThemeEditor.prototype.tableRowObjHtml = function (rowObj) {
        var html = typeof (rowObj.trClass) !== 'undefined' ? '<tr class="'+rowObj.trClass+'">' : '<tr>';
            html += '<th class="te-label">'+rowObj.th+'</th>';
            html += '<td>'+rowObj.td+'</td>';
        return html + '</tr>';
    };

    ThemeEditor.prototype.setWidgetObjsById = function (widgetProp) {
        var context = this;
        var val = widgetProp.widget[widgetProp.id]();
        if(widgetProp.type === "widgetArray") {
            val.forEach(function(widget){
                context._widgetObjsById[widget._id] = widget;
            });
        }
        else if(widgetProp.type === "widget" && val !== null) {
            this._widgetObjsById[val._id] = val;
        }
    };
    ThemeEditor.prototype.checkTagFilter = function (tagArr) {
        var allowTags = ["Basic"];
        var ret = false;
        tagArr.forEach(function(tag){
            if(allowTags.indexOf(tag) !== -1){
                ret = true;
            }
        });
        return ret;
    };
    ThemeEditor.prototype.findSharedProperties = function (data) {
        var context = this;
        var propsByID;
        if (typeof (data) !== 'undefined' && data.length > 0) {
            var allProps = [];
            propsByID = {};
            var surfacePropsByID = {};
            var nonSurfacePropsByID = {};
            data.forEach(function (widget) {
                var gpResponse = _getParams(widget, 0);
                allProps = allProps.concat(gpResponse);
            });
            allProps.forEach(function (prop) {
                if (['widget', 'widgetArray'].indexOf(prop.type) !== -1) {
                    context.setWidgetObjsById(prop);
                } else if (context.checkTagFilter(prop.ext.tags)) {
                    var tempIdx = prop.id;
                    if(prop.widget._class.indexOf('Surface') !== -1){
                        if (typeof (surfacePropsByID[tempIdx]) === 'undefined') {
                            surfacePropsByID[tempIdx] = { arr: [] };
                        }
                        surfacePropsByID[tempIdx].id = prop.id;
                        surfacePropsByID[tempIdx].description = prop.description;
                        surfacePropsByID[tempIdx].type = prop.type;
                        surfacePropsByID[tempIdx].set = prop.set;
                        surfacePropsByID[tempIdx].ext = prop.ext;
                        surfacePropsByID[tempIdx].arr.push(prop);
                    } else {
                        if (typeof (nonSurfacePropsByID[tempIdx]) === 'undefined') {
                            nonSurfacePropsByID[tempIdx] = { arr: [] };
                        }
                        nonSurfacePropsByID[tempIdx].id = prop.id;
                        nonSurfacePropsByID[tempIdx].description = prop.description;
                        nonSurfacePropsByID[tempIdx].type = prop.type;
                        nonSurfacePropsByID[tempIdx].set = prop.set;
                        nonSurfacePropsByID[tempIdx].ext = prop.ext;
                        nonSurfacePropsByID[tempIdx].arr.push(prop);
                    }
                    if (typeof (propsByID[tempIdx]) === 'undefined') {
                        propsByID[tempIdx] = { arr: [] };
                    }
                    propsByID[tempIdx].id = prop.id;
                    propsByID[tempIdx].description = prop.description;
                    propsByID[tempIdx].type = prop.type;
                    propsByID[tempIdx].set = prop.set;
                    propsByID[tempIdx].ext = prop.ext;
                    propsByID[tempIdx].arr.push(prop);
                }
            });
        }
        return propsByID;

        function _getParams(widgetObj, depth) {
            var retArr = [];
            if(widgetObj !== null){
                var paramArr = Persist.discover(widgetObj);
                paramArr.forEach(function (param, i1) {
                    if(typeof(param.ext.tags) !== 'undefined'){
                        retArr.push({
                            id: param.id,
                            type: param.type,
                            description: param.description,
                            set: param.set,
                            ext: param.ext,
                            widget: widgetObj
                        });
                    }
                    if (param.type === "widgetArray") {
                        var childWidgetArray = context.widgetProperty(widgetObj, param.id);
                        childWidgetArray.forEach(function (childWidget) {
                            var cwArr = _getParams(childWidget, depth + 1);
                            retArr = retArr.concat(cwArr);
                        });
                    }
                    else if (param.type === "widget") {
                        var childWidget = context.widgetProperty(widgetObj, param.id);
                        var temp = _getParams(childWidget, depth + 1);
                        retArr = retArr.concat(temp);
                    }
                });
            }
            return retArr;
        }
    };

    return ThemeEditor;
}));