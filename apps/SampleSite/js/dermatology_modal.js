var g_param_val;
//function init_modal_functionality() {
//    $('#select-a-widget').change(function() {
//        var v_idx = $(this).val();
//        var body_html = display_discover_params(g_graph.data().vertices[v_idx]);
//        $('#modal-body table').html(body_html);
//    });
//    $('#modal').draggable({
//        snap: 'body',
//        containment: 'body'
//    }).resizable({
//        handles: "n, e, s, w, ne, nw, se, sw",
//        minWidth: 180
//    });
//    $('#modal .controls > .dock').click(function() {
//        if (!$('#modal').hasClass('docked')) {
//            dock_modal_left();
//            $(this).find('.fa').switchClass('fa-arrow-left', 'fa-arrow-right');
//        } else {
//            undock_modal();
//            $(this).find('.fa').switchClass('fa-arrow-right', 'fa-arrow-left');
//        }
//    });
//    $('#modal .controls > .close').click(function() {
//        $('#modal,#modal-blur').remove();
//    });
//    $('li.li-collapsible > span').click(function(){
//        var span = $(this);
//        var li = span.parent();
//        li.toggleClass('collapsed');
//        if(li.hasClass('collapsed')){
//            li.find('span > i').first().switchClass('fa-minus-square-o','fa-plus-square-o');
//        } else {
//            li.find('span > i').first().switchClass('fa-plus-square-o','fa-minus-square-o');
//        }
//    });
//}
//function widget_select() {
//    var ret = '<span class="select-a-widget">Select a Widget:</span><br>';
//    ret += '<select id="select-a-widget">';
//    g_graph.data().vertices.forEach(function(v_obj, v_idx) {
//        ret += '<option value="' + v_idx + '">' + v_obj.title() + '</option>';
//    });
//    ret += '</select>';
//    return ret;
//}
var undocked_modal_styles;
//function dock_modal_left() {
//    $('body.minified').removeClass('minified');
//    var mod_obj = $('#modal');
//    undocked_modal_styles = {
//        left: mod_obj.position().left,
//        top: mod_obj.position().top,
//        width: mod_obj.width(),
//        height: mod_obj.height(),
//        position: 'fixed'
//    };
//    mod_obj.css({
//        left: 0,
//        top: 0,
//        width: 220,
//        height: '100%',
//        position: 'fixed'
//    }).addClass('docked');
//}
//function undock_modal() {
//    $('#modal').css(undocked_modal_styles).removeClass('docked');
//}
//function display_discover_params(v_obj) {
//    g_discover = discoverContent(v_obj._content);
//    g_discover = g_discover.concat(discoverAll(v_obj));
//    var disc_table = '<table id="discover_ul">';
//    g_discover.forEach(function(disc_section, idx) {
//        disc_table += _disc_section_row(disc_section, idx);
//    });
//    disc_table += '</table>';
//    return disc_table;
//    function _disc_section_row(discov_cat, idx) {
//        var obj_idx = discov_cat.idx.length > 0 ? discov_cat.idx : 'Surface';
//        var section_id = discov_cat.obj.id();
//        var section_class = discov_cat.obj.class();
//        var pad_left = (discov_cat.depth + 1) * 8;
//        var param_rows = '';
//        discov_cat.discover.forEach(function(disc_obj) {
//            param_rows += _disc_param_rows(disc_obj, idx, discov_cat.depth);
//        });
//        var section_controls = '<div class="min-max" onclick="javascript:min_max(this,\'tr[data-sectionidx=' + idx + ']\')"><i class="fa fa-minus"></i></div>';
//        var ret = ''
//                + '<tr data-depth="' + discov_cat.depth + '">'
//                + '<th colspan="2" style="padding-left:' + pad_left + 'px;"><div class="discover-section-desc">' + obj_idx + '</div>' + section_controls + '</th>'
//                + '</tr>'
//                + '<tr data-sectionidx="' + idx + '" data-depth="' + discov_cat.depth + '">'
//                + '<td class="input-desc"><span>ID:</span></td>'
//                + '<td><span>' + section_id + '</span></td>'
//                + '</tr>'
//                + '<tr data-sectionidx="' + idx + '" data-depth="' + discov_cat.depth + '">'
//                + '<td class="input-desc"><span>Class:</span></td>'
//                + '<td><span>' + section_class + '</span></td>'
//                + '</tr>'
//                + param_rows;
//        return ret;
//    }
//    function _disc_param_rows(disc_obj, idx, depth) {
//        var ret = ''
//                + '<tr data-sectionidx="' + idx + '" data-depth="' + depth + '">'
//                + '<td class="input-desc">'
//                + '<span>' + disc_obj.description + '</span>'
//                + '</td>'
//                + '<td>'
//                + _discover_type_input(disc_obj, idx)
//                + '</td>'
//                + '</tr>';
//        return ret;
//
//        function _discover_type_input(disc_obj, idx) {
//            var elm_data = 'class="disc-option" data-idx="' + idx + '" data-discid="' + disc_obj.id + '"';
//            var ret_control = '';
//            switch (disc_obj.type) {
//                case 'boolean':
//                    var trueChecked = g_discover[idx].obj[disc_obj.id]() ? ' checked' : '';
//                    var falseChecked = g_discover[idx].obj[disc_obj.id]() ? '' : ' checked';
//                    ret_control += '<select ' + elm_data + '>';
//                    ret_control += '<option value="1"' + trueChecked + '>True</option>';
//                    ret_control += '<option value=""' + falseChecked + '>False</option>';
//                    ret_control += '</select>';
//                    break;
//                case 'html-color':
//                    ret_control += '<input type="color" value="' + g_discover[idx].obj[disc_obj.id]() + '" ' + elm_data + '>';
//                    break;
//                case 'string':
//                    ret_control += '<input type="text" value="' + g_discover[idx].obj[disc_obj.id]() + '" ' + elm_data + '>';
//                    break;
//                case 'number':
//                    ret_control += '<input type="number" value="' + g_discover[idx].obj[disc_obj.id]() + '" ' + elm_data + '>';
//                    break;
//                case 'set':
//                    ret_control += '<select ' + elm_data + '>';
//                    disc_obj.options.forEach(function(opt) {
//                        var isChecked = opt === g_discover[idx].obj[disc_obj.id]() ? ' checked' : '';
//                        ret_control += '<option value="' + opt + '"' + isChecked + '>' + opt + '</option>';
//                    });
//                    ret_control += '</select>';
//                    break;
//                default:
//                    break;
//            }
//            return ret_control;
//        }
//    }
//}
//function discover_type_input(discover_type, discover_options) {
//    var elm_data = 'class="disc-option"';
//    var ret_control = '';
//    switch (discover_type) {
//        case 'boolean':
//            ret_control += '<select ' + elm_data + '>';
//            ret_control += '<option value="1">True</option>';
//            ret_control += '<option value="">False</option>';
//            ret_control += '</select>';
//            break;
//        case 'html-color':
//            ret_control += '<input type="color">';
//            break;
//        case 'string':
//            ret_control += '<input type="text">';
//            break;
//        case 'number':
//            ret_control += '<input type="number">';
//            break;
//        case 'set':
//            ret_control += '<select ' + elm_data + '>';
//            discover_options.forEach(function(opt) {
//                ret_control += '<option value="' + opt + '">' + opt + '</option>';
//            });
//            ret_control += '</select>';
//            break;
//        default:
//            break;
//    }
//    return ret_control;
//}

//function discoverAll(obj, obj_idx, depth) {
//    var depthLimit = 2;
//    depth = typeof (depth) === 'undefined' ? 0 : depth + 1;
//    obj_idx = typeof (obj_idx) === 'undefined' ? '' : obj_idx;
//    var excludeList = ['_parentWidget', '_target', '_widget', '_content'];
//
//    var arr = [];
//    if (typeof (g_graph.persist().discover(obj)) === 'object') {
//        var disc_obj = {obj: obj, discover: [], idx: obj_idx, depth: depth};
//        disc_obj.discover = g_graph.persist().discover(obj);
//        if (disc_obj.discover.length > 0) {
//            arr.push(disc_obj);
//        }
//        if (depthLimit >= depth) {
//            try {
//                if (typeof (obj) === 'object') {
//                    for (var i in obj) {
//                        if (typeof (obj[i]) === 'object' && $.inArray(i, excludeList) === -1) {
//                            var disc = discoverAll(obj[i], i, depth);
//                            if (disc.length > 0) {
//                                arr = arr.concat(disc);
//                            }
//                        }
//                    }
//                }
//            } catch (e) {
//            }
//        }
//    }
//    return arr;
//}
//function discoverContent(obj) {
//    var arr = [];
//    var disc = g_graph.persist().discover(obj._content);
//    if (typeof (disc) === 'object') {
//        var disc_obj = {obj: obj, discover: disc, idx: 0, depth: 0};
//        disc_obj.discover = g_graph.persist().discover(obj._content);
//        if (disc_obj.discover.length > 0) {
//            arr.push(disc_obj);
//        }
//    }
//    return arr;
//}

//function min_max(this_elm, selector) {
//    var is_showing = $(selector).css('display') !== 'none';
//    $(selector).toggle();
//    $(this_elm).find('i.fa').attr('class', is_showing ? 'fa fa-plus' : 'fa fa-minus');
//}
//
//function toggle_this_option(n) {
//    var parent_row = $('#documentation > tbody > tr > td > button:contains("' + n + '")').closest('tr');
//    var doesnt_exist_yet = parent_row.next('tr').find('.option-slide-wrapper').length === 0;
//    if (doesnt_exist_yet) {
//        var opt_html = $('[name=' + n + ']').parent().find('.panel-body').html();
//        var colspan = parent_row.children('td').length;
//        parent_row.after('<tr style="display:none;"><td colspan="' + colspan + '"><div class="option-slide-wrapper">' + opt_html + '</div></td></tr>');
//    }
//
//    var is_currently_showing = parent_row.next('tr:visible').length === 1;
//    if (is_currently_showing) {
//        parent_row.next('tr').find('.option-slide-wrapper:visible').animate({height: 0}, {duration: 300, complete: function() {
//                parent_row.next('tr').hide();
//            }});
//    } else {
//        parent_row.next('tr').show();
//        var wrapper = parent_row.next('tr').find('.option-slide-wrapper');
//        wrapper.css('height', 'auto').show();
//        var auto_height = parent_row.next('tr').find('.option-slide-wrapper').height();
//        wrapper.height(0).animate({height: auto_height}, {duration: 300});
//    }
//}


//function displayProperties(containerId, disc_arr, sourceWidget) {
//
//    _append_Data_textarea();
//    _append_Columns_textarea();
//    disc_arr.map(function(row) {
//        var tr = document.getElementById(containerId).appendChild(document.createElement('tr'));
//        var td = tr.appendChild(document.createElement('td'));
//        td.appendChild(document.createTextNode(row.id));
//        td = tr.appendChild(document.createElement('td'));
//
//        // TODO abstract this
//
//        var param = sourceWidget['__meta_'+row.id];
//        var paramDefaultValue = param.defaultValue;
//        var paramExt = param.ext;
//        var paramStruct = param.structure;
//
//    if ((paramExt.hasOwnProperty('type') && paramExt.type.indexOf("custom") === -1) || !paramExt.hasOwnProperty('type')) {
//        var inputType = 'input';
//        if(typeof (row.ext) !== 'undefined'
//            && typeof (row.ext.inputType) !== 'undefined'
//            && row.ext.inputType === "textarea"){
//            inputType = 'textarea';
//        }
//        switch (row.type) {
//            case "boolean":
//                var checkbox = document.createElement(inputType);
//                checkbox.type = "checkbox";
//                var input = td.appendChild(checkbox);
//                input.checked = sourceWidget[row.id]();
//                input.onchange = function() {
//                    sourceWidget[row.id](input.checked).render();
//                };
//                break;
//            case "number":
//                var input = td.appendChild(document.createElement(inputType));
//                if(typeof (row.ext.inputType) !== 'undefined'){
//                    input.setAttribute("type", row.ext.inputType);
//                    if(row.ext.inputType === 'range'){
//                        input.setAttribute("min", row.ext.min);
//                        input.setAttribute("max", row.ext.max);
//                        input.setAttribute("step", row.ext.step);
//                    }
//                }
//                input.value = sourceWidget[row.id]();
//                input.onchange = function() {
//                    sourceWidget[row.id](input.value).render();
//                };
//                break;
//            case "array":
//                var input = td.appendChild(document.createElement(inputType));
//                input.value = JSON.stringify(sourceWidget[row.id]()) || sourceWidget[row.id]();
//                input.onchange = function() {
//                    sourceWidget[row.id](JSON.parse(input.value)).render();
//                };
//                break;
//            case "string":
//                var input = td.appendChild(document.createElement(inputType));
//                input.value = sourceWidget[row.id]();
//                input.onchange = function() {
//                    sourceWidget[row.id](input.value).render();
//                };
//                break;
//            case "html-color":
//                var input = td.appendChild(document.createElement(inputType));
//                input.type = 'color';
//                input.value = sourceWidget[row.id]();
//                input.onchange = function() {
//                    sourceWidget[row.id](input.value).render();
//                };
//                break;
//            case "set":
//                var select = td.appendChild(document.createElement('select'));
//                row.set.forEach(function(item) {
//                    var option = select.appendChild(document.createElement("option"));
//                    option.value = item;
//                    option.text = item;
//                });
//                select.value = sourceWidget[row.id]();
//                select.onchange = function() {
//                    sourceWidget[row.id](select.value).render();
//                };
//                break;
//            default:
//                break;
//        }
//    } else if(paramExt.hasOwnProperty('type') && paramExt.type.indexOf("custom") !== -1) {
//
//        var pStructure = paramExt.structure;
//        createInputs(pStructure);
//
//
//        function createInputs(d, l) {
//            l = typeof l !== 'undefined' ? l : 0;
//
//            for (var i = 0, j = d.length; i < j; i++) {
//
//                if (d[i].hasOwnProperty("sections") && d[i].sections.length > 0) {
//                    switch(typeof(d[i].sections)) {
//                        case "function":
//                            createInputs(d[i].sections(sourceWidget), i);
//                            break;
//                        default:
//                            createInputs(d[i].sections, i);
//                            break;
//                    }
//                } else {
//
//                    switch(d[i].dataType) {
//
//                    //case "html-color":
//                    default:
//                        var name = d[i].name;
//
//                        var div = document.createElement("div");
//                        var input = document.createElement("input");
//                        input.setAttribute("param-idx",l+","+i);
//                        input.setAttribute("param-idx-name",name);
//                        var label = document.createElement("Label");
//                        label.setAttribute("for",input);
//                        label.innerHTML = name+": ";
//                        div.appendChild(label);
//                        div.appendChild(input);
//                        td.appendChild(div);
//                        if (l == 0) {
//                            input.value = sourceWidget[row.id]()[i] !== undefined ? JSON.stringify(sourceWidget[row.id]()[i]) : 'none';
//                        }
//                        else {
//                            if (
//                                sourceWidget[row.id]() &&
//                                sourceWidget[row.id]()[l] &&
//                                sourceWidget[row.id]()[l][name]
//                            ) {
//                                input.value = sourceWidget[row.id]()[l][name] !== undefined ? JSON.stringify(sourceWidget[row.id]()[l][name]) : 'none';
//                            }
//                        }
//
//                        input.onchange = function(val) {
//                            var paramIdx = this.getAttribute("param-idx").split(',');
//                            var paramIdxName = this.getAttribute("param-idx-name")
//                            var currentVal = sourceWidget[row.id]();
//
//
//                            if (paramIdxName && paramIdxName != 'global') {
//                                currentVal[paramIdx[0]][paramIdxName] = JSON.parse(val.target.value);
//                            } else {
//                                currentVal[paramIdx[0]] = JSON.parse(val.target.value);
//                            }
//
//                            sourceWidget[row.id](currentVal).render();
//                        };
//                        break;
//
//                    }
//                    div.style.display = "table-row";
//                    input.style.display = "table-row";
//                    label.style.display = "table-cell";
//                    label.style.margin = "2px";
//                    input.style.margin = "2px";
//                }
//            }
//        }
//    }
//
//    });
//    function _append_Data_textarea() {
//        var tr = document.getElementById(containerId).appendChild(document.createElement('tr'));
//        var td = tr.appendChild(document.createElement('td'));
//        td.appendChild(document.createTextNode('Data'));
//        td = tr.appendChild(document.createElement('td'));
//
//        var textarea = document.createElement('textarea');
//        var input = td.appendChild(textarea);
//        input.value = JSON.stringify(sourceWidget.testData().data());
//        input.onchange = function() {
//            sourceWidget.data(JSON.parse(input.value)).render();
//        };
//    }
//    function _append_Columns_textarea() {
//        var tr = document.getElementById(containerId).appendChild(document.createElement('tr'));
//        var td = tr.appendChild(document.createElement('td'));
//        td.appendChild(document.createTextNode('Columns'));
//        td = tr.appendChild(document.createElement('td'));
//
//        var textarea = document.createElement('textarea');
//        var input = td.appendChild(textarea);
//        input.value = JSON.stringify(sourceWidget.columns());
//        input.onchange = function() {
//            sourceWidget.columns(JSON.parse(input.value)).render();
//        };
//    }
//}
//var g_swatches = [
//    //[
//    //0-3    container_stroke, header_border_color, icon_stroke,     button_color_stroke,
//    //4-7    container_fill,   header_color,        icon_fill,       button_color,
//    //8-10                     title_color,         icon_char_color, button_char_color
//    //],
//    [
//        '#504f45','#504f45','#504f45','#504f45',
//        '#fafafa','#53b493','#1c9a77','#fafafa',
//                  '#fafafa','#fafafa','#53b493'
//    ],
//    [
//        '#333333','#333333','transparent','#333333',
//        '#c0cf9d', '#195244', '#195244', '#c0cf9d',
//        '#fafafa', '#fafafa', '#195244'
//    ],
//    [
//        '#d1404a','#ff6f6f','transparent','transparent',
//        '#ecf0f1', '#ff6f6f', '#d1404a', '#ecf0f1',
//                   '#ecf0f1', '#ecf0f1', '#d1404a'
//    ],
//    [
//        "transparent","transparent","transparent","transparent",
//        "rgb(245, 243, 238)","rgb(157, 178, 255)","rgb(157, 178, 255)","rgb(245, 243, 238)",
//                             "rgb(245, 243, 238)","rgb(245, 243, 238)","rgb(157, 178, 255)"
//    ],
//    [
//        "rgb(121, 64, 68)","rgb(121, 64, 68)","transparent","transparent",
//        "rgb(255, 231, 186)","rgb(220, 198, 173)","transparent","rgb(121, 64, 68)",
//        "rgb(121, 64, 68)","rgb(121, 64, 68)","rgb(220, 198, 173)"
//    ],
//    [
//        'transparent','transparent','transparent','transparent',
//        'transparent','transparent','transparent','transparent',
//                      '#000','transparent','transparent',
//    ],
//];
//var g_preset_fonts = [
//    ['-3','Arial',12],
//    ['-4','Arial',16],
//    ['-4','Arial',18],
//    ['-3','Calibri',12],
//    ['-4','Calibri',16],
//    ['-4','Calibri',18],
//    ['-3','Tahoma',12],
//    ['-4','Tahoma',16],
//    ['-2','Tahoma',18],
//];
//function fill_color_swatches(elm) {
//    var ul = $(elm).parent().find('ul');
//    ul.html('');
//    g_swatches.forEach(function(swatch,idx) {
//        var html = '<li><a href="javascript:void(0);" data-swatchidx="'+idx+'" onclick="javascript:change_surface_colors(this);">';
//        swatch.forEach(function(color) {
//            html += '<div style="background-color:' + color + ';"></div>';
//        });
//        html += '</a></li>';
//        ul.append(html);
//    });
//    ul.append('<li class="divider"></li><li><a href="javascript:void(0);" onclick="javascript:modal_container_colors();">Customize...</a></li>');
//}
//function fill_font_presets(elm) {
//    var ul = $(elm).parent().find('ul');
//    ul.html('');
//    g_preset_fonts.forEach(function(font_preset,idx) {
//        var html = '<li>';
//            html += '<a href="javascript:void(0);" data-presetfontidx="'+idx+'" onclick="javascript:change_surface_font(this);">';
//                   html += '<span style="margin-right:6px;font-family:\''+font_preset[1]+'\';font-size:'+font_preset[2]+'px;">Sample Title</span>';
////                font_preset.forEach(function(node) {
////                   html += '<span style="margin-right:6px;font-family:\''+font_preset[1]+'\';font-size:'+font_preset[2]+';">' + node + '</span>';
////                });
//            html += '</a>';
//        html += '</li>';
//        ul.append(html);
//    });
//    ul.append('<li class="divider"></li><li><a href="javascript:void(0);" onclick="javascript:modal_container_font();">Customize...</a></li>');
//}
//function widget_palette_presets2(elm) {
//    require(["src/common/Palette"], function(Palette) {
//        //var ul = $(elm).parent().find('ul');
//        var ul = $(elm).parent().find('div.color-swatches');
//        ul.html('');
//        var cLength = Object.keys(colorbrewer).length
//        var lcount = 0;
//        for (var ix=0; ix<2;ix++) {
//        ul.html(ul.html()+'<div class="column"><ul>');
//        for (var key in colorbrewer) {
//
//            var cArr = [];
//            for (var swatch in colorbrewer[key]) {
//                cArr.push(colorbrewer[key][swatch].length);
//            }
//            var sorted_cArr = cArr.sort(function(a,b){return a < b ? 1 : -1;});
//            var html = '<li><a href="javascript:void(0);" data-swatchidx="'+key+'" onclick="javascript:change_widget_palette(this);">';
//            colorbrewer[key][sorted_cArr[0]].forEach(function(color) {
//                html += '<div style="background-color:' + color + ';"></div>';
//            });
//            html += '</a></li>';
//            ul.append(html);
//        }
//        ul.html(ul.html()+'</ul></div>');
//    }
//        // todo
//        //ul.append('<li class="divider"></li><li><a href="javascript:void(0);" onclick="javascript:modal_container_colors();">Customize...</a></li>');
//    });
//}
//
//function widget_palette_presets(elm) {
//    require(["src/common/Palette"], function(Palette) {
//        var div = $(elm).parent().find('div.color-swatches');
//        div.css({'width':340});
//        div.html('');
//
//        var tArr = [];
//        for (var key in colorbrewer) {
//            var cArr = [];
//            for (var swatch in colorbrewer[key]) {
//                cArr.push(colorbrewer[key][swatch].length);
//            }
//            var sorted_cArr = cArr.sort(function(a,b){return a < b ? 1 : -1;});
//            var html = '<li><a href="javascript:void(0);" data-swatchidx="'+key+'" onclick="javascript:change_widget_palette(this);">';
//            colorbrewer[key][sorted_cArr[0]].forEach(function(color) {
//                html += '<div style="background-color:' + color + ';"></div>';
//            });
//            html += '</a></li>';
//            tArr.push(html);
//        }
//
//        // should use 'mod' below switch on mod X = and inc a column counter...
//
//        var tHTML = '<div class="column" style="float:left"><ul>';
//        var str1 = '';
//        var str2 = '';
//        for (var i=0;i<tArr.length;i++) {
//            if (i>tArr.length/2) {
//                str1 += tArr[i];
//            } else {
//                str2 += tArr[i];
//            }
//        }
//
//        div.html('<div class="column" style="float:left"><ul style="list-style-type: none;padding: 5px;">'+str1+'</ul></div><div class="column" style="float:left"><ul style="list-style-type: none;padding: 5px;">'+str2+'</ul></div>')
//    });
//}
//
//function change_surface_colors(elm) {
//    close_modal();
//    var swatch_idx = $(elm).attr('data-swatchidx');
//    var colors = g_swatches[swatch_idx];
//    var serial;
//    g_graph.data().vertices.forEach(function(surface,i){
//        if(typeof (serial) === 'undefined'){
//            var vertex_serial = {__properties:{}};
//            vertex_serial.__properties.container_stroke = colors[0];
//            vertex_serial.__properties.container_fill = colors[4];
//            vertex_serial.__properties.header_color = colors[5];
//            vertex_serial.__properties.header_border_color = colors[1];
//            vertex_serial.__properties.icon_fill = colors[6];
//            vertex_serial.__properties.icon_stroke = colors[2];
//            vertex_serial.__properties.icon_char_color = colors[9];
//            vertex_serial.__properties.button_color = colors[7];
//            vertex_serial.__properties.button_color_stroke = colors[3];
//            vertex_serial.__properties.button_char_color = colors[10];
//            vertex_serial.__properties.title_color = colors[8];
//
//            serial = append_default_vertex_params(vertex_serial);
//        }
//
//        g_graph.persist().deserialize(g_graph.data().vertices[i],serial);
//    });
//    g_graph.render();
//}
//
//function change_widget_palette(elm) {
//    close_modal();
//    var swatch_idx = $(elm).attr('data-swatchidx');
//    g_graph.data().vertices.forEach(function(surface,i){
//        g_graph.data().vertices[i]._content.paletteID(swatch_idx);
//        g_graph.data().vertices[i].render();
//    });
//}
//
//function change_surface_font(elm) {
//    close_modal();
//    var presetfont_idx = $(elm).attr('data-presetfontidx');
//    var fonts = g_preset_fonts[presetfont_idx];
//    g_graph.data().vertices.forEach(function(surface,i){
//        g_graph.data().vertices[i].title_yOffset(fonts[0]);
//        g_graph.data().vertices[i].title_font_family(fonts[1]);
//        g_graph.data().vertices[i].title_font_size(fonts[2]);
////        g_graph.data().vertices[i].title_font_alignment(fonts[2]);
//
//        g_graph.data().vertices[i].render();
//    });
//}
//
//var g_debug_modal;
//function modal_widget_options(vertex_obj) {
//    var obj = {container_obj:vertex_obj,widget_obj:vertex_obj._content};
//    var modal_obj = {
//        icon:"fa-gear",
//        title:"Widget Options",
//        body_html:html_modal_widget_options(obj),
//        width:"300px",
//        height:"500px"
//    };
//    modal_widget(modal_obj);
//}
//function modal_widget_options_adv(vertex_obj) {
//    var obj = {container_obj:vertex_obj,widget_obj:vertex_obj._content};
//    var modal_obj = {
//        icon:"fa-gears",
//        title:"Adv. Options",
//        body_html:html_modal_widget_options(obj,true),
//        width:"300px",
//        height:"500px"
//    };
//    modal_widget(modal_obj);
//}
//
//function modal_container_colors() {
//    var obj = g_graph.data().vertices;
//    var filter = 'Color';
//    filter = typeof(filter) === "undefined" ? '' : filter;
//    var modal_obj = {
//        icon:"fa-sliders",
//        title:"Container Colors",
//        body_html:modal_surface_options(obj,filter),
//        width:"300px",
//        height:"500px"
//    };
//    modal_widget(modal_obj);
//}
//function modal_container_font() {
//
//    var obj = g_graph.data().vertices;
//    var filter = 'Title Font';
//    filter = typeof(filter) === "undefined" ? '' : filter;
//    var modal_obj = {
//        icon:"fa-text-height",
//        title:"Title Font",
//        body_html:modal_surface_options(obj,filter),
//        width:"300px",
//        height:"500px"
//    };
//    modal_widget(modal_obj);
//}
//var g_disc_obj;
//var g_disc_funcs = []; // for keep tracking of params so we dont duplicate
//function modal_surface_options(widget_obj,filter) {
//    var disc_arr;
//    var html = '';
//    g_disc_obj = widget_obj;
//    if(typeof(widget_obj) === "object"){
//        if(typeof(widget_obj.length) === "number"
//                && typeof(widget_obj[0]) === "object"){
//            disc_arr = g_graph.persist().discover(widget_obj[0]);
//            disc_arr = disc_arr.sort(_sort_alpha);
//            $.each(disc_arr,function(i,disc_obj){
//                disc_obj.defaultValue = widget_obj[0][disc_obj.id]();
//                $.each(disc_arr,function(i,disc_obj){
//                    if(disc_obj.description.indexOf(filter) !== -1){
//                        if (g_disc_funcs.indexOf(disc_obj.id) == -1) {
//                            g_disc_funcs.push(disc_obj.id);
//                            html += discover_label_html(disc_obj);
//                        }
//                    }
//                });
//            });
//        } else {
//            disc_arr = g_graph.persist().discover(widget_obj);
//            disc_arr = disc_arr.sort(_sort_alpha);
//            $.each(disc_arr,function(i,disc_obj){
//                disc_obj.defaultValue = widget_obj[disc_obj.id]();
//                if(disc_obj.description.indexOf(filter) !== -1){
//                    if (g_disc_funcs.indexOf(disc_obj.id) == -1) {
//                        g_disc_funcs.push(disc_obj.id);
//                        html += discover_label_html(disc_obj);
//                    }
//                }
//            });
//        }
//    }
//    g_disc_funcs = []; // reset here so it clears in time for next reload
//    return html;
//
//    function _sort_alpha(a,b) {
//        return a.description > b.description ? 1 : -1;
//    }
//}
//var g_m;
//function html_modal_widget_options(obj,showBlocked) {
//    showBlocked = typeof(showBlocked) === 'undefined' ? false : showBlocked;
//    var disc_arr;
//    var html_obj = {Container:{},Widget:{}};
//    g_disc_obj = {};
//    g_disc_obj['Container'] = obj.container_obj;
//    disc_arr = g_graph.persist().discover(g_disc_obj['Container']);
//    disc_arr = disc_arr.sort(_sort_alpha);
//    var container_unique = [];
//    var widget_unique = [];
//    var categories = _container_option_categories();
//    $.each(disc_arr,function(i,disc_obj){
//        disc_obj.defaultValue = g_disc_obj['Container'][disc_obj.id]();
//        $.each(categories,function(i,category_obj){
//            category_obj.str_arr.forEach(function(filter){
//                if(!_blocked_disc_obj('Container',disc_obj) || showBlocked){
//                    if(disc_obj.description.indexOf(filter) !== -1 || filter === 'Misc.'){
//                        if(typeof(html_obj.Container[category_obj.label]) === 'undefined'){
//                            html_obj.Container[category_obj.label] = [];
//                        }
//                        if(container_unique.indexOf(disc_obj.description) === -1){
//                            html_obj.Container[category_obj.label].push({
//                                id:disc_obj.description,
//                                category:category_obj.label,
//                                html:discover_label_html(disc_obj,'Container'),
//                            });
//                            container_unique.push(disc_obj.description);
//                        }
//                    }
//                }
//            });
//        });
//    });
//    g_disc_widget_obj = obj.widget_obj;
//    g_disc_obj['Widget'] = obj.widget_obj;
//    disc_arr = g_graph.persist().discover(g_disc_obj['Widget']);
//    disc_arr = disc_arr.sort(_sort_alpha);
//    categories = _widget_option_categories();
//    $.each(disc_arr,function(i,disc_obj){
//        disc_obj.defaultValue = g_disc_obj['Widget'][disc_obj.id]();
//        $.each(categories,function(i,category_obj){
//            category_obj.str_arr.forEach(function(filter){
//                if(!_blocked_disc_obj('Widget',disc_obj) || showBlocked){
//                    if(disc_obj.description.indexOf(filter) !== -1 || filter === 'Misc.'){
//                        if(typeof(html_obj.Widget[category_obj.label]) === 'undefined'){
//                            html_obj.Widget[category_obj.label] = [];
//                        }
//                        if(widget_unique.indexOf(disc_obj.description) === -1){
//                            html_obj.Widget[category_obj.label].push({
//                                id:disc_obj.description,
//                                category:category_obj.label,
//                                html:discover_label_html(disc_obj,'Widget'),
//                            });
//                            widget_unique.push(disc_obj.description);
//                        }
//                    }
//                }
//            });
//        });
//    });
//    g_m = html_obj;
//    return _html_option_categories(html_obj);
//
//    function _container_option_categories() {
//        var ret = [];
//        ret.push({label:'Show/Hide',str_arr:['Show']});
//        ret.push({label:'Colors',str_arr:['Color']});
//        ret.push({label:'Buttons',str_arr:['Button']});
//        ret.push({label:'Icon',str_arr:['Icon']});
//        ret.push({label:'Header Text',str_arr:['Header','Title']});
//        ret.push({label:'Misc.',str_arr:['Misc.']});
//        return ret;
//    }
//    function _widget_option_categories() {
//        var ret = [];
//        ret.push({label:'Show/Hide',str_arr:['Show']});
//        ret.push({label:'Animation',str_arr:['Animation','Animate']});
//        ret.push({label:'Colors',str_arr:['Color','Palette']});
//        ret.push({label:'Height/Width',str_arr:['Height','Width']});
//        ret.push({label:'Legend',str_arr:['Legend']});
//        ret.push({label:'Header Text',str_arr:['Header','Title']});
//        ret.push({label:'Misc.',str_arr:['Misc.']});
//        return ret;
//    }
//
//    function _html_option_categories(html_obj) {
//        html_obj["Container"] = sort_obj(html_obj["Container"]);
//        html_obj["Widget"] = sort_obj(html_obj["Widget"]);
//        var html = '<ul>';
//            $.each(html_obj,function(i1,n1){
//                html += _li_collapsible(i1,n1,false,function(i,n){
//                    var ret = '';
//                    if(n.length > 0){
//                        ret = _li_collapsible(i,n,true,function(i,n){
//                            return n.html;
//                        });
//                    }
//                    return ret;
//                });
//            });
//        html += '</ul>';
//        return html;
//
//        function _li_collapsible(label,child_arr,isCollapsed,each_callback) {
//            var html = '';
//                if(isCollapsed){
//                    html += '<li class="li-collapsible collapsed">';
//                    html += '<span>'+label+'<i class="fa fa-plus-square-o"></i></span>';
//                } else {
//                    html += '<li class="li-collapsible">';
//                    html += '<span>'+label+'<i class="fa fa-minus-square-o"></i></span>';
//                }
//                html += '<ul>';
//                $.each(child_arr,function(i,n){
//                    if(typeof(each_callback) === 'function'){
//                        html += each_callback(i,n);
//                    } else {
//                        html += '<li>'+n+'</li>';
//                    }
//                });
//                html += '</ul>';
//            html += '</li>';
//            return html;
//        }
//    }
//
//    function _sort_alpha(a,b) {
//        return a.description > b.description ? 1 : -1;
//    }
//}
//function _blocked_disc_obj(category,obj){
//    //Returns true if it is blocked
//    var ret = false;
//    var blocked_list;
//    switch(category){
//        case 'Container':
//            blocked_list = [
//                "Shape Type",
//                "Icon Border Width",
//                "Button Border Width",
//                "Header Border Width",
//                "Icon Border Width",
//                "Title Anchor Position",
//                "Header Text Padding"
//            ];
//            break;
//        case 'Widget':
//            blocked_list = [
//                "Animate On Startup",
//                "Animation Duration",
//                "Animation Easing",
//            ];
//            break;
//    }
//    if(blocked_list.indexOf(obj.description) !== -1){
//        ret = true;
//    }
//    return ret;
//}
//function discover_label_html(disc_obj,objid) {
//    objid = typeof(objid) === "undefined" ? '' : objid;
//    var ret_control = '';
//    ret_control += '<label>';
//        ret_control += '<span>'+disc_obj.description+'</span>';
//        ret_control += discover_input_html(disc_obj,objid);
//    ret_control += '</label>';
//    ret_control += '<br/>';
//    ret_control += '<hr>';
//    return ret_control;
//}
//function discover_input_html(disc_obj,objid) {
//    var elm_data = 'class="disc-option" data-objid="'+objid+'" data-discid="' + disc_obj.id + '" onchange="javascript:apply_disc_change(this)"';
//    var ret_control = '';
//    switch (disc_obj.type) {
//        case 'boolean':
//            ret_control += '<select ' + elm_data + '>';
//                ret_control += '<option></option>';
//                ret_control += '<option value="1">True</option>';
//                ret_control += '<option value="">False</option>';
//            ret_control += '</select>';
//            break;
//        case 'html-color':
//            ret_control += '<input type="color" value="' + disc_obj.defaultValue + '" ' + elm_data + '>';
//            ret_control += '<label style="padding:0;font-size:12px;"><input type="checkbox" style="margin: 0px 3px 0px 6px;position:relative;top:2px;" onchange="javascript:apply_disc_change(this);" />Transparent</label>';
//            break;
//        case 'string':
//            disc_obj.defaultValue = disc_obj.defaultValue === null ? '' : disc_obj.defaultValue;
//            ret_control += '<input type="text" value="' + disc_obj.defaultValue + '" ' + elm_data + '>';
//            break;
//        case 'number':
//            if(typeof(disc_obj.ext.min) !== 'undefined'
//                    && typeof (disc_obj.ext.max) !== 'undefined'
//                    && typeof (disc_obj.ext.step) !== 'undefined'){
//                var min = disc_obj.ext.min;
//                var max = disc_obj.ext.max;
//                var step = disc_obj.ext.step;
//                ret_control += '<input type="number" value="' + disc_obj.defaultValue + '" min="'+min+'" max="'+max+'" step="'+step+'" ' + elm_data + '>';
//            } else {
//                ret_control += '<input type="number" value="' + disc_obj.defaultValue + '" ' + elm_data + '>';
//            }
//            break;
//        case 'set':
//            ret_control += '<select ' + elm_data + '>';
//                ret_control += '<option></option>';
//                disc_obj.set.forEach(function(opt) {
//                    ret_control += '<option value="' + opt + '">' + opt + '</option>';
//                });
//            ret_control += '</select>';
//            break;
//        default:
//            break;
//    }
//    return ret_control;
//}
//function apply_disc_change(elm) {
//    var $elm_obj = $(elm);
//    var objid,discid,val;
//    if($elm_obj.attr('type') === 'checkbox'){
//        if($elm_obj.prop('checked')){
//            $elm_obj = $elm_obj.parent().prev();
//            val = 'transparent';
//            $elm_obj.val('transparent');
//        } else {
//            $elm_obj = $elm_obj.parent().prev();
//            val = $elm_obj.val();
//            if(val === 'transparent'){
//                val = $elm_obj.val('#000000');
//            }
//        }
//    } else if ($elm_obj.attr('type') === 'color') {
//        $elm_obj.parent().find('input[type=checkbox]').prop('checked',false);
//        val = $elm_obj.val();
//    } else {
//        val = $elm_obj.val();
//    }
//    objid = $elm_obj.attr('data-objid');
//    discid = $elm_obj.attr('data-discid');
//    if(typeof(g_disc_obj) === "object"){
//        if(objid.length > 0){
//            g_disc_obj[objid][discid](val);
//            g_disc_obj[objid].render();
//        } else {
//            if(typeof(g_disc_obj.length) === "number"
//                    && typeof(g_disc_obj[0]) === "object"){
//                $.each(g_disc_obj,function(i,w_obj){
//                    w_obj[discid](val);
//                    w_obj.render();
//                });
//            } else {
//                g_disc_obj[discid](val);
//                g_disc_obj.render();
//            }
//        }
//    }
//}