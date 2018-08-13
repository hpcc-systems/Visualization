import { TreeMap } from "@hpcc-js/tree";

var treemap = new Treemap()
    .columns(["label", "size"])
    .data(createData(document.documentElement))
    .showRoot(true)
    .paddingInner(2)
    .paddingOuter(4)
    .paddingTop(18)
    .parentFontSize(12)
    .leafFontSize(10)
    .render()
    ;

function createData(e){
    return {
        "label": e.tagName,
        "size": e.outerHTML.length,
        "children": [...e.children].map(createData)
    };
}

var all_tiling_methods = treemap.__meta_tilingMethod.set;

setInterval(function () {
    var tiling_method = treemap.tilingMethod();
    var tiling_method_idx = all_tiling_methods.indexOf(tiling_method);
    var next_tiling_method = tiling_method_idx === all_tiling_methods.length - 1 ? all_tiling_methods[0] : all_tiling_methods[tiling_method_idx+1];
    treemap
        .tilingMethod(next_tiling_method)
        .lazyRender()
        ;
}, 3000);
