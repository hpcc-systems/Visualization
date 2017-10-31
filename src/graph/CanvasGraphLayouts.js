"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "d3v4",
            "dagre"
        ], factory);
    } else {
        root.graph_CanvasGraphLayouts = factory(root.d3v4, root.dagre);
    }
}(this, function (d3v4, dagre) {

    var force_directed_forces = {
        "xy": {
            "x": function (d) {return d.group_x;},
            "y": function (d) {return d.group_y;},
            "strength": function (d) {return d.child_arr.length > 0 ? 1 : -0.1;},
            "post": false
        },
        "link": {
            "distance": function (d) {
                if (d.target.is_primary)return 200;
                if (d.target.is_leaf)return 60;
                if (d.target.parent_arr.length < 3)return 20;
                if (d.target.parent_arr.length < 4)return 30;
                return 80;
            },
            "strength": 1
        },
        "manyBodyForce": {
            "strength": function (d) {
                if (d.is_leaf)return -200;
                if (d.parent_arr.length < 3)return -400;
                if (d.parent_arr.length < 4)return -200;
                if (d.is_leaf)return -200;
                return -50;
            }
        },
    };

    var layouts = {
        "Hierarchy": {
            decay: {alpha: 0.0228, velocity: 0.7},
            xy: {
                x: function (n) {
                    return n.force_x ? n.force_x : 0;
                },
                y: function (n) {
                    return n.force_y ? n.force_y : 0;
                },
                strength: 0.1,
                post: true
            },
            link: {distance: 0, strength: 0},
            manyBodyForce: {strength: 0},
            zoom_by_force: true,
            init: function (data) {
                var dagre_graph = createDagreGraph.call(this, data);
                dagre.layout(dagre_graph);
                dagre_graph.nodes().map(function (n) {
                    return dagre_graph.node(n);
                }).forEach(function (_pos, _idx) {
                    var _node = data.nodes[_idx];
                    _node.force_x = _pos.x;
                    _node.force_y = _pos.y;
                    _node.vx = 0;
                    _node.vy = 0;
                }, this);
            }
        },
        "Circle": {
            decay: {alpha: 0.03, velocity: 0.6},
            xy: {
                x: function (n) {
                    return n.force_x ? n.force_x : 0;
                },
                y: function (n) {
                    return n.force_y ? n.force_y : 0;
                },
                strength: 0.01,
                post: true
            },
            link: {distance: 0, strength: 0},
            manyBodyForce: {strength: 0},
            zoom_by_force: true,
            init: function (data) {
                var _radius = this.circle_layout_radius();
                data.nodes.forEach(function (_node, _i, _arr) {
                    var angle = Math.PI * 2 * (_i === 0 ? 0 : (_i) / (_arr.length));
                    _node.force_x = Math.cos(angle) * _radius;
                    _node.force_y = Math.sin(angle) * _radius;
                    _node.vx = 0;
                    _node.vy = 0;
                });
            }
        },
        "CircleHierarchy": {
            decay: {alpha: 0.03, velocity: 0.6},
            xy: {
                x: function (n) {
                    return n.force_x ? n.force_x : 0;
                },
                y: function (n) {
                    return n.force_y ? n.force_y : 0;
                },
                strength: 0.01,
                post: true
            },
            link: {distance: 0, strength: 0},
            manyBodyForce: {strength: 0},
            zoom_by_force: true,
            init: function (data) {
                var dagre_graph = createDagreGraph.call(this, data);
                dagre.layout(dagre_graph);

                var node_positions = dagre_graph.nodes()
                        .map(function (n) {
                            return dagre_graph.node(n);
                        });
                if (typeof node_positions[0] === "undefined")
                    return;
                var uni_x = [];
                var uni_y = [];
                var min_x = node_positions[0].x;
                var max_x = node_positions[0].x;
                var min_y = node_positions[0].y;
                var max_y = node_positions[0].y;
                node_positions.forEach(function (_pos) {
                    if (min_x > _pos.x)min_x = _pos.x;
                    if (max_x < _pos.x)max_x = _pos.x;
                    if (min_y > _pos.y)min_y = _pos.y;
                    if (max_y < _pos.y)max_y = _pos.y;
                    if (uni_x.indexOf(_pos.x) === -1)uni_x.push(_pos.x);
                    if (uni_y.indexOf(_pos.y) === -1)uni_y.push(_pos.y);
                });
                
                var circle_map_angle = {};
                var circle_map_radius = {};
                var _radius = this.circle_layout_radius();
                if (["LR","RL"].indexOf(this.hierarchyRankDirection()) !== -1) {
                    uni_x.forEach(function (x) {
                        var _x_ratio = ((x - min_x) / (max_x - min_x));
                        _x_ratio = _x_ratio > 0.9 ? _x_ratio * 0.8 : _x_ratio;
                        circle_map_radius[x] = _x_ratio * _radius;
                    }, this);
                    uni_y.forEach(function (y) {
                        var _y_ratio = ((y - min_y) / (max_y - min_y));
                        circle_map_angle[y] = _y_ratio * Math.PI * 2;
                    });
                    node_positions.forEach(function (_pos, _idx) {
                        var _node = data.nodes[_idx];
//                        var _x_mult = _node.is_leaf ? _radius : circle_map_radius[_pos.x];
//                        var _y_mult = _node.is_leaf ? _radius : circle_map_radius[_pos.x];
                        var _x_mult = circle_map_radius[_pos.x];
                        var _y_mult = circle_map_radius[_pos.x];
                        _node.force_x = Math.cos(circle_map_angle[_pos.x]) * _x_mult;
                        _node.force_y = Math.sin(circle_map_angle[_pos.x]) * _y_mult;
                    },this);
                } else {
                    uni_x.forEach(function (x) {
                        var _x_ratio = ((x - min_x) / (max_x - min_x));
                        circle_map_angle[x] = _x_ratio * Math.PI * 2;
                    });
                    uni_y.forEach(function (y) {
                        var _y_ratio = ((y - min_y) / (max_y - min_y));
                        _y_ratio = _y_ratio > 0.9 ? _y_ratio * 0.8 : _y_ratio;
                        circle_map_radius[y] = _y_ratio * _radius;
                    }, this);
                    node_positions.forEach(function (_pos, _idx) {
                        var _node = data.nodes[_idx];
                        var _x_mult = _node.is_leaf ? _radius : circle_map_radius[_pos.y];
                        var _y_mult = _node.is_leaf ? _radius : circle_map_radius[_pos.y];
                        _node.force_x = Math.cos(circle_map_angle[_pos.x]) * _x_mult;
                        _node.force_y = Math.sin(circle_map_angle[_pos.x]) * _y_mult;
                    },this);
                }
            }
        },
        "ForceDirected": {
            decay: {alpha: 0.03, velocity: 0.6},
            xy: force_directed_forces.xy,
            link: force_directed_forces.link,
            manyBodyForce: force_directed_forces.manyBodyForce,
            zoom_by_force: false,
            init: function (data) {
                //
            },
            post_init: function (data) {
                for (var i = 0; i < 150; i++) {
                    this.simulation.tick();
//                    if(!i%30){
//                        data.nodes.forEach(function(n){
//                            if(n.is_leaf || n.intersect_count > 0){
//                                var _parent = data.nodes[n.parent_arr[0]];
//                                if(!_parent.is_primary){
//                                    n.x = (n.x + _parent.x)/2;
//                                    n.y = (n.y + _parent.y)/2;
//                                }
//                            }
//                        });
//                    }
                    if(i === 130){
                       data.nodes.forEach(function(n){
                           if(n.intersect_count > 0 && !n.is_leaf){
                               var _parent_x_sum = 0;
                               var _parent_y_sum = 0;
                               n.parent_arr.forEach(function(_paridx){
                                   var _parent = data.nodes[_paridx];
                                   if(_parent.is_primary)_parent_x_sum = undefined;
                                   if(typeof _parent_x_sum !== "undefined"){
                                       _parent_x_sum += _parent.x;
                                       _parent_y_sum += _parent.y;
                                   }
                               });
                               if(typeof _parent_x_sum !== "undefined"){
                                   var _parent_avg_x = _parent_x_sum/n.parent_arr.length;
                                   var _parent_avg_y = _parent_y_sum/n.parent_arr.length;
                                   n.x = (_parent_avg_x - n.group_x) * 2;
                                   n.y = (_parent_avg_y - n.group_y) * 2;
                                   move_children_to_neato(n.x,n.y,n);
                               }
                           }
                       });
                    }
                }
                data.nodes.forEach(function (_node, _i, _arr) {
                    _node.fx = _node.x;
                    _node.fy = _node.y;
                });
                this.zoom_to_fit();
                
                function move_children_to_neato(x,y,node){
                    node.child_arr.forEach(function(_i){
                        var angle = Math.PI * 2 * (_i === 0 ? 0 : (_i) / (data.nodes.length));
                        node.x = x + Math.cos(angle) * 100;
                        node.y = y + Math.sin(angle) * 100;
                    });
                }
            }
        },
        "ForceDirected2": {
            decay: {alpha: 0.03, velocity: 0.6},
            xy: force_directed_forces.xy,
            link: force_directed_forces.link,
            manyBodyForce: force_directed_forces.manyBodyForce,
            zoom_by_force: false,
            init: function (data) {
                //
            },
            post_init: function (data) {
                //
            }
        },
    };

    function createDagreGraph(data) {
        var g = new dagre.graphlib.Graph({
            multigraph: true,
            compound: true,
            directed: true
        });
        g.setGraph({
            rankdir: this.hierarchyRankDirection(),
            nodesep: this.hierarchyNodeSeparation(),
            edgesep: this.hierarchyEdgeSeparation(),
            ranksep: this.hierarchyRankSeparation()
        });
        g.setDefaultEdgeLabel(function () {
            return {};
        });
        data.nodes.forEach(function (u) {
            g.setNode(u.index, {
                width: u.width,
                height: u.height
            });
        });
        data.links.forEach(function (u) {
            g.setEdge(u.source.index, u.target.index);
        });
        return g;
    }

    return {
        layouts: layouts
    };
}));