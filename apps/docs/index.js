let hpccjs = {};
let hpccjs_properties = {};
let hpccjs_datashapes = [];
let hpccjs_datashape_map = {};
let hpccjs_datashape_hashes = {};
let all_config_samples = [];
let all_config_folders = {};
const playground_url = `https://rawgit.com/hpcc-systems/Visualization/candidate-2.x.x/demos/gallery/playground.html`;
const gallery_url = `https://rawgit.com/hpcc-systems/Visualization/candidate-2.x.x/demos/gallery/gallery.html`;
let tab_options = {}
let tab_arr = [];

function init_hpccjs() {
    flatten_sample_config(config.samples);
    Object.keys(window).filter(n => n.indexOf('@hpcc-js/') === 0).forEach(function (module_name) {
        let package_name = module_name.split('/')[1];
        hpccjs[package_name] = {};
        hpccjs_properties[package_name] = {};
        Object.keys(window[module_name]).forEach(function (widget_name) {
            hpccjs[package_name][widget_name] = window[module_name][widget_name];
            try {
                let temp = new window[module_name][widget_name]();
                hpccjs_properties[package_name][widget_name] = temp.publishedProperties();
                if (window[module_name][widget_name] && window[module_name][widget_name].__inputs) {
                    let _str = JSON.stringify(window[module_name][widget_name].__inputs, null, "    ");
                    datashape = btoa(_str);
                    if (typeof hpccjs_datashape_hashes[datashape] === "undefined") {
                        hpccjs_datashape_hashes[datashape] = hpccjs_datashapes.length;
                        hpccjs_datashapes.push(datashape);
                    }
                    let ds_idx = hpccjs_datashape_hashes[datashape];
                    if (typeof hpccjs_datashape_map[ds_idx] === "undefined") {
                        hpccjs_datashape_map[ds_idx] = [];
                    }
                    hpccjs_datashape_map[ds_idx].push(widget_name);
                }
            } catch (e) {
                // console.log(e);
            }
        });
    });
}

function init_page() {

    init_hpccjs();

    init_page_config();

    init_click_handlers();

    new hpccjs.other.HPCCBadge().target("logo").render();

    console.log(Object.keys(tab_options).map(tab_text => {
        let tab_obj = tab_options[tab_text];
        return icon_tab_html(tab_obj.icon, tab_text);
    }).join(''));
}
function tree_to_list(data, $container) {
    let $list_item;
    if (data.name && !data.label) {
        data.label = data.name;
    }
    if (data.label) {
        $list_item = $(list_item_html(data.children ? "fa-caret-right" : "", data.label, data.no_label_click));
        if (data["ignore_search"]) {
            $list_item.addClass("ignore-search");
        }
        if (data["click_to_show_properties"]) {
            $list_item.attr("data-meta", data.label);
            $list_item.addClass("show-widget-properties");
        }
        if (data["path"]) {
            $list_item.attr("data-path", data["path"]);
            $list_item.addClass("view-samples");
        }
        if (data["meta"]) {
            $list_item.attr("data-meta", data["meta"]);
            $list_item.addClass("view-samples");
        }
        if (data.children) {
            data.children.forEach(function (child_node) {
                tree_to_list(child_node, $list_item);
            })
        } else {
            $list_item.addClass("list-endpoint");
        }
        $container.append($list_item);
    } else {
        data.forEach(row => tree_to_list(row, $container));
    }
}
function flatten_sample_config(d) {
    if (d.type) {
        if (d.type === "file") {
            all_config_samples.push({
                path: d.path,
                name: d.name,
                imports: Object.keys(d.imports).reduce((acc, module_name)=>{
                    return acc.concat(d.imports[module_name]);
                },[])
            });
        } else if (d.type === "folder") {
            all_config_folders[d.path] = {
                path: d.path,
                name: d.name,
                count: d.children.length
            };
        }
    }
    if (d.children) {
        d.children.forEach(function (n) {
            flatten_sample_config(n);
        });
    }
}
function set_active_tab(elm) {
    $("#left-tabs > div.selected").removeClass("selected");
    $(elm).addClass("selected");
    let active_tab = $("#left-tabs > div.selected span").text();
    $("#list-label").text(active_tab);
    let $list = $("#list");
    $list.html(tab_options[active_tab].html.call(tab_options[active_tab]));
}
function show_tab_as_tree(elm) {
    $("#content").html("");
    let tab_label = $(elm).find("span").first().text();
    let tree_types = [
        "Indented",
        "CirclePacking",
        "Dendrogram",
        "SunburstPartition",
        "Treemap",
    ];
    window.g_tree_type_idx = typeof window.g_tree_type_idx === "undefined" || window.g_tree_type_idx + 1 >= tree_types.length ? 0 : window.g_tree_type_idx + 1;
    window.g_tree = new hpccjs.tree[tree_types[window.g_tree_type_idx]]()
        .target("content")
        .data({
            "label": tab_label,
            "children": tab_options[tab_label].data()
        })
        .render()
        ;
    console.log('g_tree === ', g_tree);
}
function remove_after(elm) {
    $(elm).siblings().slice($(elm).index()).remove();
}

function icon_tab_html(fa_icon_class, tab_text) {
    return `<div class="tab-div"><i class="fa ${fa_icon_class}"></i><span>${tab_text}</span></div>`;
}
function list_item_html(fa_icon_class, text, no_label_click) {
    let _icon_button = fa_icon_class ? `<button class="list-item-icon-btn btn btn-dark btn-sm fa ${fa_icon_class}"></button>` : '<div class="list-item-spacer"></div>';
    let _label_button = no_label_click ? `<span class="list-item-label">${text}</span>` : `<button class="list-item-label-btn btn btn-dark btn-sm">${text}</button>`;
    return `<div class="list-item">${_icon_button}${_label_button}</div>`;
}
function gallery_iframe_html(url) {
    return `<iframe src="${url}"></iframe>`;
}
function gallery_iframe_arr_html(path_arr) {
    let $div = $('<div></div>');
    const sqrt = Math.sqrt(path_arr.length);
    path_arr.forEach(function (path) {
        let $iframe = $(`<iframe src="${path}"></iframe>`);
        $iframe.css({
            "height": `${100 / sqrt}%`,
            "width": `${100 / sqrt}%`
        })
        $div.append($iframe);
    })
    return $div.html();
}
function get_widget_sample_paths(w) {
    return all_config_samples
        .filter(sample_obj => {
            return sample_obj.imports.indexOf(w) !== -1;
        })
        .map(sample=>sample.path)
        ;
}
function samples_breadcrumbs_html(meta) {
    let full_path = meta ? meta.replace('./', '') : '';
    return full_path.split('/').map((n, i, arr) => {
        if (i + 1 === arr.length) return breadcrumbs_item_html('', n);
        let _path = arr.slice(0, i + 1).join('/');
        return breadcrumbs_item_html(gallery_url + '?./' + _path, n);
    }).join('<div class="breadcrumbs-spacer"></div>')
        ;
    function breadcrumbs_item_html(url, text) {
        let _attr = url ? `class="btn btn-link" onclick="$('#content').html(gallery_iframe_html('${url}'));remove_after(this);"` : `class="btn btn-link" disabled`;
        return `<button type="button" ${_attr}>${text}</button>`;
    }
}
function properties_html(package_name, widget_name) {

}
