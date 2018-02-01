var g_node_radius = 30;

var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height,
        transform = d3.zoomIdentity
        ;
var graph = format_data(random_graph_data);

var repelForce = d3.forceManyBody().strength(-30).distanceMax(g_node_radius * 3).distanceMin(g_node_radius * 3);

var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }))
        .force("charge", repelForce)
        .force("center", d3.forceCenter(width / 2, height / 2));

document.addEventListener("DOMContentLoaded", function (event) {
    start_canvas_graph();
});

function start_canvas_graph() {
    simulation
            .nodes(graph.nodes)
            .on("tick", render);
    simulation.force("link")
            .links(graph.links);

    d3.select(canvas)
            .call(d3.drag()
                    .subject(dragsubject)
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
            .call(d3.zoom().on("zoom", zoomed))
            ;
}

function zoomed() {
    transform = d3.event.transform;
    render();
}
function debug_node_poly(node){
    console.info("node [x, y]:", '['+parseInt(node.x)+', '+parseInt(node.y)+'] <--- '+node.id);
    var min_x = Math.min.apply(this,node.poly.map(function(_n){return parseInt(transform.applyX(_n[0]))}));
    var max_x = Math.max.apply(this,node.poly.map(function(_n){return parseInt(transform.applyX(_n[0]))}));
    var min_y = Math.min.apply(this,node.poly.map(function(_n){return parseInt(transform.applyY(_n[1]))}));
    var max_y = Math.max.apply(this,node.poly.map(function(_n){return parseInt(transform.applyY(_n[1]))}));
    console.info("node poly x [min _ max]:", '['+min_x+' _ '+max_x+']');
    console.info("node poly y [min _ max]:", '['+min_y+' _ '+max_y+']');
}
function dragsubject() {
    var i,
            x = transform.invertX(d3.event.x),
            y = transform.invertY(d3.event.y),
            dx,
            dy;
    for (i = graph.nodes.length - 1; i >= 0; --i) {
        node = graph.nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        if (inside_poly_array([x,y],node.poly,transform)) {
            node.x = transform.applyX(node.x);
            node.y = transform.applyY(node.y);
            return node;
        }
    }
}

function render() {
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    context.beginPath();
    graph.links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();
    graph.nodes.forEach(drawNode);
    context.restore();
}
function dragstarted() {
    if (!d3.event.active)
        simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = transform.invertX(d3.event.subject.x);
    d3.event.subject.fy = transform.invertY(d3.event.subject.y);
}

function dragged() {
    d3.event.subject.fx = transform.invertX(d3.event.x);
    d3.event.subject.fy = transform.invertY(d3.event.y);
}

function dragended() {
    //if (!d3.event.active)
        //simulation.alphaTarget(0);
//    d3.event.subject.fx = null;
//    d3.event.subject.fy = null;
}

function drawLink(d) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
}

function drawNode(d) {
    var _w = g_node_radius;
    var _h = g_node_radius;
    var _p = 2;//pixel padding
    var _txt_h = 12;
    var _icon_h = 24;
    var _anno_h = 8;
    var _stroke_w = 1;
    d.poly = [];
    context.moveTo(d.x, d.y);

    context.textBaseline = 'alphabetic';
    context.scale(1, 1);


//    d.annotations = [
//        {"color": "#c0392b", "icon": "A"},
//        {"color": "#27ae60", "icon": "B"},
//        {"color": "#d35400", "icon": "C"},
//    ];

    drawNodeIcon();
    drawNodeLabel();
    drawNodeAnnotations();

    function drawNodeIcon() {
        context.font = _icon_h + "px 'FontAwesome'";
        var _icon_txt = d.icon ? d.icon : d.id[0];
        var _icon_size = context.measureText(_icon_txt);
        drawNodeIconBackground();
        drawNodeIconText();
        function drawNodeIconText() {
            var _x1 = d.x - (_w / 2) - 20;
            var _y1 = d.y - (_h / 2);
            context.rect(_x1, _y1, _w, _h);
            context.fillStyle = "#333";
            context.fillText(_icon_txt, d.x - (_icon_size.width / 2), d.y + (_icon_h / 2) - (_p / 2) - (_icon_h * 0.1));
        }
        function drawNodeIconBackground() {
            var _x1 = d.x - (_w / 2);
            var _y1 = d.y - (_h / 2);
            context.beginPath();
            d.poly.push([
                [_x1,_y1],
                [_x1+_w,_y1],
                [_x1+_w,_y1+_h],
                [_x1,   _y1+_h]
            ]);
            context.rect(_x1, _y1, _w, _h);
            context.fillStyle = "#fff";
            context.fill();
            context.strokeStyle = "#333";
            context.stroke();
            context.closePath();
        }
    }
    function drawNodeLabel() {
        context.font = _txt_h + "px 'Helvetica'";
        var _label_txt = d.name ? d.name : d.id;
        var _txt_size = context.measureText(_label_txt);
        drawNodeLabelBackground();
        drawNodeLabelText();
        function drawNodeLabelText() {
            var _x1 = d.x - (_w / 2);
            var _y1 = d.y - (_h / 2);
            context.rect(_x1, _y1, _w, _h);
            context.fillStyle = "#333";
            context.fillText(_label_txt, d.x + (_w / 2) + _p, d.y + _txt_h - (_p / 2));
        }
        function drawNodeLabelBackground() {
            var _x1 = d.x + (_w / 2);
            var _y1 = d.y - (_p / 2);
            var _tw = _txt_size.width + (_p * 2);
            var _th = _txt_h + (_p * 2);
            d.poly.push([
                [_x1,_y1],
                [_x1+_tw,_y1],
                [_x1+_tw,_y1+_th],
                [_x1,    _y1+_th]
            ]);
            context.beginPath();
            //context.rect(d.x + (_w / 2), _y1, _txt_size.width + (_p * 2), _txt_h + (_p * 2));
            context.rect(_x1, _y1, _tw, _th);
            context.fillStyle = "#fff";
            context.fill();
            context.strokeStyle = "#333";
            context.stroke();
            context.closePath();
        }
    }
    function drawNodeAnnotations() {
        context.font = _anno_h + "px 'Helvetica'";
        var _sum_w = 0;
        d.annotations.forEach(function (annotation, anno_idx) {
            drawNodeAnnotation(annotation, anno_idx);
        });
        function drawNodeAnnotation(o, i) {
            var _anno_txt = o.icon;
            var _anno_size = context.measureText(o.icon);
            var anno_w = _anno_size.width + (_p * 2);
            var anno_h = _anno_h + (_p * 2);
            drawNodeAnnotationBackground();
            drawNodeAnnotationIcon();
            _sum_w += anno_w + _stroke_w;

            function drawNodeAnnotationBackground() {
                var _x1 = d.x + (_w / 2) + (_sum_w);
                var _y1 = d.y - (_p * 2) - _anno_h - _stroke_w;
                var _tw = anno_w;
                var _th = anno_h;
                d.poly.push([
                    [_x1,_y1],
                    [_x1+_tw,_y1],
                    [_x1+_tw,_y1+_th],
                    [_x1,    _y1+_th]
                ]);
                context.beginPath();
                context.rect(_x1, _y1, anno_w, anno_h);
                context.fillStyle = o.color;
                context.fill();
                context.strokeStyle = "#333";
                context.stroke();
                context.closePath();
            }
            function drawNodeAnnotationIcon() {
                context.rect(d.x - (_w / 2), d.y - (_h / 2), _w, _h);
                context.fillStyle = "#fff";
                context.fillText(_anno_txt, d.x + (_w / 2) + _p + _sum_w, d.y - (_p * 2));
            }
        }
    }

}
function format_data(data) {
    data.nodes.forEach(function (n, i) {
        if (typeof (n.id) === "undefined") {
            n.id = '' + i;
        }
    });
    return data;
}
function inside_poly_array(point, vs_arr, trans) {
    for(var i = 0;i < vs_arr.length;i++){
        if(inside_poly(point, vs_arr[i], trans))return true;
    }
    return false;
}
function inside_poly(point, vs, trans) {
    trans = trans ? trans : {"invertX":function(n){return n;},"invertY":function(n){return n;}}
    if(vs[vs.length-1] !== vs[0]){
        vs.push(vs[0]);
    }
    var x = trans.invertX(point[0]), y = trans.invertY(point[1]);
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = trans.invertX(vs[i][0]), yi = trans.invertY(vs[i][1]);
        var xj = trans.invertX(vs[j][0]), yj = trans.invertY(vs[j][1]);
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};
function push_to_poly(poly,point){
    var min_x = Math.min.apply(this,poly.map(function(_n){return parseInt(transform.applyX(_n[0]))}));
    var max_x = Math.max.apply(this,poly.map(function(_n){return parseInt(transform.applyX(_n[0]))}));
    var min_y = Math.min.apply(this,poly.map(function(_n){return parseInt(transform.applyY(_n[1]))}));
    var max_y = Math.max.apply(this,poly.map(function(_n){return parseInt(transform.applyY(_n[1]))}));
    var significant_x = point[0] < min_x || point[0] > max_x;
    var significant_y = point[1] < min_y || point[1] > max_y;
    if(significant_x || significant_y){
        poly.push(point);
    }
}