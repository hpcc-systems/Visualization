"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3v4", "../common/CanvasWidget", "./CanvasGraphLayouts", "dagre", "../common/Palette"], factory);
    } else {
        root.graph_CanvasGraph = factory(root.d3v4, root.common_CanvasWidget, root.graph_CanvasGraphLayouts, root.common_Palette);
    }
}(this, function (d3v4, CanvasWidget, CanvasGraphLayouts, dagre, Palette) {
    function CanvasGraph() {
        this._fixed_positions = {};
        this._cached_text_measurements = {};
        
        this._manually_zoomed = false;
        this._needs_redraw = true;
        
        this.draw_count = 0;
        this.prev_draw_count = 0;
        
        this.extra_log = [];
        this.demo_layout_idx = 0;
        
        CanvasWidget.call(this);
    }
    CanvasGraph.prototype = Object.create(CanvasWidget.prototype);
    CanvasGraph.prototype.constructor = CanvasGraph;
    
    CanvasGraph.prototype._palette = Palette.rainbow("default");
    CanvasGraph.prototype._class += " graph_CanvasGraph";
    
    /* DEBUGGING params */
    CanvasGraph.prototype.publish("show_debug_text", false, "boolean", "show_debug_text", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("also_debug_node_positions", false, "boolean", "also_debug_node_positions", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("debug_line_intersections", true, "boolean", "debug_line_intersections", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("debug_line_intersection_count", false, "boolean", "debug_line_intersection_count", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("show_geocache_grid", true, "boolean", "show_geocache_grid", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("geocache_grid_column_count", 10, "number", "geocache_grid_column_count", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("geocache_grid_row_count", 10, "number", "geocache_grid_row_count", null, { tags: ["Basic"] });
    
    /* LAYOUT params */
    CanvasGraph.prototype.publish("layout", "Hierarchy", "set", "layout", Object.keys(CanvasGraphLayouts.layouts), { tags: ["Basic"] });
    CanvasGraph.prototype.publish("charge_max_distance", null, "number", "charge_max_distance", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("charge_min_distance", null, "number", "charge_min_distance", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("xy_force", [], "array", "xy_force", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("link_force", [], "array", "link_force", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("manybody_force", [], "array", "manybody_force", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_manyBody_strength", -200, "number", "primary_manyBody_strength", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("singletons_showing", true, "boolean", "singletons_showing", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("hide_leaf_edge_label", true, "boolean", "hide_leaf_edge_label", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("hierarchyRankDirection", "TB", "set", "hierarchyRankDirection", ["LR","TB","BT","RL"], { tags: ["Basic"] });
    CanvasGraph.prototype.publish("hierarchyNodeSeparation", 0, "number", "hierarchyNodeSeparation", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("hierarchyEdgeSeparation", 10, "number", "hierarchyEdgeSeparation", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("hierarchyRankSeparation", 50, "number", "hierarchyRankSeparation", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("alphaDecay", 0.003, "number", "alphaDecay", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("circle_layout_radius", 300, "number", "circle_layout_radius", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("manyBody_strength", -60, "number", "manyBody_strength", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("disable_zoom", false, "boolean", "disable_zoom", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("disable_translate", false, "boolean", "disable_translate", null, { tags: ["Basic"] });
    
    /* EDGE params */
    CanvasGraph.prototype.publish("link_text_size", 16, "number", "link_text_size", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("line_stroke_w", 0.5, "number", "line_stroke_w", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("line_fill_color", "rgba(170, 170, 170, 1)", "string", "line_fill_color", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("line_stroke_color", "rgba(170, 170, 170, 1)", "string", "line_stroke_color", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("link_default", "straight", "set", "link_default", ["straight","orthogonal"], { tags: ["Basic"] });
    CanvasGraph.prototype.publish("scale_link_with_node", false, "boolean", "scale_link_with_node", null, { tags: ["Basic"] });
    
    /* VERTEX params */
    CanvasGraph.prototype.publish("enable_node_collapse", true, "boolean", "enable_node_collapse", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("velocity_target", 0.01, "number", "velocity_target", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("background_node_opacity", 0.2, "number", "background_node_opacity", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("auto_primary_threshold", 0.2, "number", "auto_primary_threshold", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("max_node_width", 68.5224609375, "number", "max_node_width", null, { tags: ["Basic"] });//<----- remove this?
    CanvasGraph.prototype.publish("max_node_height", 32.25, "number", "max_node_height", null, { tags: ["Basic"] });//<----- remove this?
    CanvasGraph.prototype.publish("dynamic_max_node_width", true, "boolean", "dynamic_max_node_width", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("dynamic_max_node_height", true, "boolean", "dynamic_max_node_height", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("icon_font", "FontAwesome", "string", "icon_font", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("annotation_font", "FontAwesome", "string", "annotation_font", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("annotation_icon_fill", "#FFF", "string", "annotation_icon_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("annotation_icon_stroke", "#FFF", "string", "annotation_icon_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("set_node_scale", 0.4, "number", "set_node_scale", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("disable_dblclick_zoom", true, "boolean", "disable_dblclick_zoom", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_icon_fill", "rgba(253, 114, 11, 1)", "string", "default_icon_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_icon_stroke", "rgba(0, 0, 0, 0)", "string", "default_icon_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_container_fill", "rgba(255, 255, 255, 1)", "string", "default_container_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_container_stroke", "rgba(51, 51, 51, 1)", "string", "default_container_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_label_fill", "rgba(51, 51, 51, 1)", "string", "default_label_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_label_stroke", "rgba(0, 0, 0, 0)", "string", "default_label_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_labelbg_fill", "rgba(255, 255, 255, 1)", "string", "default_labelbg_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_labelbg_stroke", "rgba(0, 0, 0, 1)", "string", "default_labelbg_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_icon_fill", "rgba(39, 174, 96, 1)", "string", "selected_icon_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_icon_stroke", "rgba(0, 0, 0, 0)", "string", "selected_icon_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_container_fill", "rgba(255, 255, 255, 1)", "string", "selected_container_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_container_stroke", "rgba(39, 174, 96, 1)", "string", "selected_container_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_label_fill", "rgba(39, 174, 96, 1)", "string", "selected_label_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_label_stroke", "rgba(39, 174, 96, 1)", "string", "selected_label_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_labelbg_fill", "rgba(255, 255, 255, 1)", "string", "selected_labelbg_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("selected_labelbg_stroke", "rgba(51, 51, 51, 1)", "string", "selected_labelbg_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_icon_fill", "rgba(237, 28, 36, 1)", "string", "primary_icon_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_icon_stroke", "rgba(237, 28, 36, 1)", "string", "primary_icon_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_container_fill", "rgba(255, 255, 255, 1)", "string", "primary_container_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_container_stroke", "rgba(51, 51, 51, 1)", "string", "primary_container_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_label_fill", "rgba(51, 51, 51, 1)", "string", "primary_label_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_label_stroke", "rgba(51, 51, 51, 1)", "string", "primary_label_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_labelbg_fill", "rgba(255, 255, 255, 1)", "string", "primary_labelbg_fill", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_labelbg_stroke", "rgba(51, 51, 51, 1)", "string", "primary_labelbg_stroke", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("default_node_scale", 0.5, "number", "default_node_scale", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("primary_node_scale", 0.75, "number", "primary_node_scale", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("vertex_preset", false, "boolean", "vertex_preset", null, { tags: ["Basic"] });//<---- refactor this concept
    CanvasGraph.prototype.publish("width", 30, "number", "width", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("height", 30, "number", "height", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("node_pixel_padding", 2, "number", "node_pixel_padding", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("node_text_size", 12, "number", "node_text_size", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("scale_node_text_size", false, "boolean", "scale_node_text_size", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("icon_size", 20, "number", "icon_size", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("annotation_size", 8, "number", "annotation_size", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("node_stroke_width", 0.5, "number", "node_stroke_width", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("is_circle_icon", true, "boolean", "is_circle_icon", null, { tags: ["Basic"] });
    CanvasGraph.prototype.publish("type_config", {}, "object", "type_config", null, { tags: ["Basic"] });
    
    /* GRAPH params misc */
    CanvasGraph.prototype.publish("unique_identifier", "id", "string", "unique_identifier", null, { tags: ["Basic"] });
    
    CanvasGraph.prototype.icon_fill = function (d) {
        if (d.is_selected)
            return this.selected_icon_fill();
        else if (d.icon_color)
            return d.icon_color;
        else if (d.is_primary)
            return this.primary_icon_fill();
        else if (this.get_type_config('icon/fill', d.type))
            return this.type_config()[d.type].icon.fill;
        else
            return this.default_icon_fill();
    };
    CanvasGraph.prototype.icon_stroke = function (d) {
        if (d.is_selected)
            return this.selected_icon_stroke();
        else if (d.is_primary)
            return this.primary_icon_stroke();
        else if (this.get_type_config('icon/stroke', d.type))
            return this.type_config()[d.type].icon.stroke;
        else
            return this.default_icon_stroke();
    };
    CanvasGraph.prototype.container_fill = function (d) {
        if (d.is_selected)
            return this.selected_container_fill();
        else if (d.is_primary)
            return this.primary_container_fill();
        else if (this.get_type_config('container/fill', d.type))
            return this.type_config()[d.type].container.fill;
        else
            return this.default_container_fill();
    };
    CanvasGraph.prototype.container_stroke = function (d) {
        if (d.is_selected)
            return this.selected_container_stroke();
        else if (d.is_primary)
            return this.primary_container_stroke();
        else if (this.get_type_config('container/stroke', d.type))
            return this.type_config()[d.type].container.stroke;
        else
            return this.default_container_stroke();
    };
    CanvasGraph.prototype.label_fill = function (d) {
        if (d.is_selected)
            return this.selected_label_fill();
        else if (d.is_primary)
            return this.primary_label_fill();
        else if (this.get_type_config('label/fill', d.type))
            return this.type_config()[d.type].label.fill;
        else
            return this.default_label_fill();
    };
    CanvasGraph.prototype.label_stroke = function (d) {
        if (d.is_selected)
            return this.selected_label_stroke();
        else if (d.is_primary)
            return this.primary_label_stroke();
        else if (this.get_type_config('label/stroke', d.type))
            return this.type_config()[d.type].label.stroke;
        else
            return this.default_label_stroke();
    };
    CanvasGraph.prototype.labelbg_fill = function (d) {
        if (d.is_selected)
            return this.selected_labelbg_fill();
        else if (d.is_primary)
            return this.primary_labelbg_fill();
        else if (this.get_type_config('labelbg/fill', d.type))
            return this.type_config()[d.type].labelbg.fill;
        else
            return this.default_labelbg_fill();
    };
    CanvasGraph.prototype.labelbg_stroke = function (d) {
        if (d.is_selected)
            return this.selected_labelbg_stroke();
        else if (d.is_primary)
            return this.primary_labelbg_stroke();
        else if (this.get_type_config('labelbg/stroke', d.type))
            return this.type_config()[d.type].labelbg.stroke;
        else
            return this.default_labelbg_stroke();
    };
    CanvasGraph.prototype.show_icon = function (d) {
        if (typeof(d.show_icon) !== "undefined") {
            return d.show_icon;
        }
        else if (this.get_type_config('showIcon', d.type)) {
            return this.type_config()[d.type].showIcon;
        }
        return true;
    };
    CanvasGraph.prototype.show_label = function (d) {
        if (d.is_hovered) {
            if (typeof(d.show_label) !== "undefined" && !d.show_label) {
                return false;
            }
            return true;
        }
        else if (typeof(d.show_label) !== "undefined") {
            return d.show_label;
        }
        else if (this.get_type_config('showLabel', d.type)) {
            return this.type_config()[d.type].showLabel;
        }
        return true;
    };
    CanvasGraph.prototype.show_annotations = function (d) {
        if (typeof(d.show_annotations) !== "undefined") {
            return d.show_annotations;
        }
        else if (this.get_type_config('showAnnotations', d.type)) {
            return this.type_config()[d.type].showAnnotations;
        } 
        return true;
    };
    
    CanvasGraph.prototype.vertex_click = function () {
        //this.zoom_to_fit();
    };
    CanvasGraph.prototype.vertex_dblclick = function () {};
                
    CanvasGraph.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        
        this.resize(this._size);
        this.canvas = domNode;
        
        if(!this.data() || (this.data() instanceof Array && !this.data().length)){
            this.data({nodes:[],links:[]});
        }
        
        this.init_linkanalysis();
        this.init_linkanalysis_interactions();
    };

    CanvasGraph.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);
        
        var params_needing_restart = ["layout"];
        var needs_restart = false;
        params_needing_restart.forEach(function(param_name){
            if(typeof this[param_name] === "function"){
                var param_val = this[param_name]();
                if("undefined" === typeof this['_prev_'+param_name]){
                    this['_prev_'+param_name] = param_val;
                }
                else if (this['_prev_'+param_name] !== param_val) {
                    needs_restart = true;
                }
            }
        },this);
        if(needs_restart){
            this.restart_forces();
        }
        this.init_linkanalysis();
        this.reset();
        
        this.set_leaf_visibility();
        
        this.draw();
        
        this.zoom_to_fit();
    };

    CanvasGraph.prototype.exit = function(domNode, element) {
        CanvasWidget.prototype.exit.apply(this, arguments);
    };
    
    CanvasGraph.prototype.restart_forces = function(){
        this.prev_draw_count = this.draw_count;
        this.data().info.layout_applied = false;
        this.simulation.stop();
        this.simulation = d3v4.forceSimulation(this.simulation.nodes());
        this.apply_layout();
        this.simulation.alpha(1).restart();
    };

    CanvasGraph.prototype.get_type_config = function(path, type) {
        var ret = false;
        if (typeof (this.type_config()) !== "undefined" && typeof (this.type_config()[type]) !== "undefined") {
            ret = true;
            var _reference = this.type_config()[type];
            path.split('/').forEach(function (_path_piece) {
                if (ret) {
                    if (typeof (_reference[_path_piece]) !== "undefined") {
                        _reference = _reference[_path_piece];
                    }
                }
            });
        }
        return ret;
    };
    
    CanvasGraph.prototype.clear_fixed_positions = function(data) {
        data.nodes.forEach(function (d) {
            delete d.fx;
            delete d.fy;
        });
    };
    
    CanvasGraph.prototype.zoom_to_fit = function(_duration) {
        _duration = _duration ? _duration : 0;
        var _zoom_by_force = CanvasGraphLayouts.layouts[this.layout()].zoom_by_force;
        var edge_points = this.find_xy_edges(this.data().nodes,_zoom_by_force);
        var axis_overlaps = this.find_axis_overlaps(edge_points);

        var overlap_x_is_larger = axis_overlaps.overlap_x > axis_overlaps.overlap_y;
        var mid_x = (edge_points.max_x + edge_points.min_x) / 2;
        var mid_y = (edge_points.max_y + edge_points.min_y) / 2;


        var _k = overlap_x_is_larger ? 1 / axis_overlaps.overlap_x : 1 / axis_overlaps.overlap_y;
        var _x = -1 * (mid_x * _k);// + this.canvas.width/2;
        var _y = -1 * (mid_y * _k);// + this.canvas.height/2;

        var zi = {};
        zi.x = _x;
        zi.y = _y;
        zi.k = _k;

        this.canvas_graph_translate(zi, _duration);
    };
    
    CanvasGraph.prototype.canvas_graph_translate = function(zi, duration) {
        var _k = !isNaN(zi.k) && !this.disable_zoom() ? zi.k : 1;
        var _x = !this.disable_translate() ? zi.x + (this.canvas.width / 2) : this.canvas.width/2;
        var _y = !this.disable_translate() ? zi.y + (this.canvas.height / 2) : this.canvas.height/2;
        this.x_transform = _x - this.transform.x;
        this.y_transform = _y - this.transform.y;
        this.k_transform = _k;
        var context = this;
        d3v4.select(this.canvas).transition().duration(duration)
            .call(
                this.zoom.transform,
                d3v4.zoomIdentity.translate(_x - this.transform.x,_y - this.transform.y).scale(_k)
            )
            .on("end",function(){
                context.draw();
            })
        ;
    };
    
    CanvasGraph.prototype.find_xy_edges = function(nodes,zoom_by_force) {
        
        var min_x,min_y,max_x,max_y;
        nodes.forEach(function (d) {
            if (!d.is_hidden) {
                var _x = zoom_by_force ? d.force_x : d.x;
                var _y = zoom_by_force ? d.force_y : d.y;
                if(typeof(d.fx) !== "undefined")_x = d.fx;
                if(typeof(d.fy) !== "undefined")_y = d.fy;
                if (min_x > _x || typeof(min_x) === "undefined")
                    min_x = _x;
                if (min_y > _y || typeof(min_y) === "undefined")
                    min_y = _y;
                if (max_x < _x || typeof(max_x) === "undefined")
                    max_x = _x;
                if (max_y < _y || typeof(max_y) === "undefined")
                    max_y = _y;
            }
        });
        min_x -= this.node_stroke_width();
        min_y -= this.node_stroke_width();
        max_x += this.node_stroke_width();
        max_y += this.node_stroke_width();
        min_x -= this.max_node_width();
        min_y -= this.max_node_height();
        max_x += this.max_node_width();
        max_y += this.max_node_height();
        return {
            min_x: min_x,
            max_x: max_x,
            min_y: min_y,
            max_y: max_y,
        };
    };
    CanvasGraph.prototype.find_axis_overlaps = function(edge_points) {
        return {
            overlap_x: (edge_points.max_x - edge_points.min_x) / this.canvas.width,
            overlap_y: (edge_points.max_y - edge_points.min_y) / this.canvas.height
        };
    };
    
    CanvasGraph.prototype.draw = function() {
        this.draw_count++;
        
        this._needs_redraw = this.simulation.alpha() > 0.001;
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.selection_rect.is_showing) {
            this.ctx.translate(this.transform.x, this.transform.y);
            this.ctx.scale(this.transform.k, this.transform.k);
            this.show_selection_rect();
        } else {
            this.ctx.translate(this.transform.x, this.transform.y);
            this.ctx.scale(this.transform.k, this.transform.k);
        }

        if(typeof this.data().info !== "undefined")this.data().info.nothing_is_moving = true;
        this.ctx.beginPath();
        this.data().nodes.forEach(function(d,i){
            if(typeof this._fixed_positions[i] !== "undefined"){
                d.fx = this._fixed_positions[i].x;
                d.fy = this._fixed_positions[i].y;
            }
        },this);
        
        if(this.debug_line_intersections()){
            find_link_intersections.call(this);
        }
        
        this.data().links.forEach(this.drawLink,this);
        this.data().nodes.forEach(this.drawNode,this);
        
        if(this.show_geocache_grid()){
            //this.draw_geocache_grid();
        }
        
        if(this.show_debug_text()){
            this.debug_text_dump();
        }
        this.ctx.restore();

        if (!this.data().info.layout_applied) {
            this.apply_layout();
        }
//        }

        function find_link_intersections(){
            var link_count = this.data().links.length;
            var _data = this.data();
            for(var i = 0;i < link_count;i++){
                _data.links[i].intersect_count = 0;
                _data.links[i].target.intersect_count = 0;
            }
            for(var _i = 0;_i < link_count;_i++){
                for(var j = 0;j < link_count;j++){
                    if(_i !== j){
                        var a = _data.links[_i];
                        var b = _data.links[j];
                        
                        if(typeof a.source.fx !== "undefined")a.source.x = a.source.fx;
                        if(typeof a.source.fy !== "undefined")a.source.y = a.source.fy;
                        if(typeof a.target.fx !== "undefined")a.target.x = a.target.fx;
                        if(typeof a.target.fy !== "undefined")a.target.y = a.target.fy;
                        if(typeof b.source.fx !== "undefined")b.source.x = b.source.fx;
                        if(typeof b.source.fy !== "undefined")b.source.y = b.source.fy;
                        if(typeof b.target.fx !== "undefined")b.target.x = b.target.fx;
                        if(typeof b.target.fy !== "undefined")b.target.y = b.target.fy;
                        var a_b_have_no_common_source = a.source !== b.source && a.source !== b.target;
                        var a_b_have_no_common_target = b.source !== a.source && b.source !== a.target;
                        if(a_b_have_no_common_source && a_b_have_no_common_target){
                            var p0_x = a.source.x;
                            var p0_y = a.source.y;
                            var p1_x = a.target.x;
                            var p1_y = a.target.y;
                            var p2_x = b.source.x;
                            var p2_y = b.source.y;
                            var p3_x = b.target.x;
                            var p3_y = b.target.y;
                            var is_intersecting = line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y);
                            if(is_intersecting){
                                a.intersect_count++;
                                b.intersect_count++;
                                a.target.intersect_count++;
                                b.target.intersect_count++;
                            }
                        }
                    }
                }
            }
        }
        function line_intersects(x1,y1,x2,y2,x3,y3,x4,y4) {
            var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
            var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
            if (isNaN(x)||isNaN(y)) {
                return false;
            } else {
                if (x1>=x2) {
                    if (!(x2<=x&&x<=x1)) {return false;}
                } else {
                    if (!(x1<=x&&x<=x2)) {return false;}
                }
                if (y1>=y2) {
                    if (!(y2<=y&&y<=y1)) {return false;}
                } else {
                    if (!(y1<=y&&y<=y2)) {return false;}
                }
                if (x3>=x4) {
                    if (!(x4<=x&&x<=x3)) {return false;}
                } else {
                    if (!(x3<=x&&x<=x4)) {return false;}
                }
                if (y3>=y4) {
                    if (!(y4<=y&&y<=y3)) {return false;}
                } else {
                    if (!(y3<=y&&y<=y4)) {return false;}
                }
            }
            return true;
        }
    };
    
    CanvasGraph.prototype.draw_geocache_grid = function(){
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "blue";
        var col_count = this.geocache_grid_column_count();
        var row_count = this.geocache_grid_row_count();
        
        var scaled_width = (this.canvas.width * (1/this.k_transform)) * 2;
        var scaled_height = (this.canvas.height * (1/this.k_transform)) * 2;
        var gc_w = scaled_width/col_count;
        var gc_h = scaled_height/row_count;
        
        var nodes_per_geocache_cell = {};
        var cell_x_arr = [];
        var cell_y_arr = [];
        
        for(var _x = 0 - col_count/2;_x<col_count/2;_x++)cell_x_arr.push(gc_w * _x);
        for(var _y = 0 - row_count/2;_y<row_count/2;_y++)cell_y_arr.push(gc_h * _y);
        
        this.data().nodes.forEach(function(n){
            var cell_x_idx = get_closest_idx(n.x,cell_x_arr);
            var cell_y_idx = get_closest_idx(n.y,cell_y_arr);
            var cell_idx = cell_x_idx+"_"+cell_y_idx;
            if("undefined" === typeof nodes_per_geocache_cell[cell_idx]){
                nodes_per_geocache_cell[cell_idx] = 0;
            }
            nodes_per_geocache_cell[cell_idx]++;
        });
        console.info("nodes_per_geocache_cell:", nodes_per_geocache_cell);
        
        function get_closest_idx(v,arr){
            var closest_idx = 0;
            var closest_num = arr[0];
            arr.forEach(function(n,i){
                if(Math.abs(v - n) < v - closest_num){
                    closest_num = n;
                    closest_idx = i;
                }
            });
            return closest_idx;
        }
        
        var x_sum = this.x_transform;
        var y_sum = this.y_transform;
        
        for(var x = 0 - col_count/2;x<col_count/2;x++){
            for(var y = 0 - row_count/2;y<row_count/2;y++){
                this.ctx.strokeStyle = get_geocache_cell_color(x,y);
                this.ctx.rect(
                    (gc_w * x),
                    (gc_h * y),
                    gc_w,
                    gc_h
                );
                this.ctx.stroke();
                y_sum += gc_h;
            }
            x_sum += gc_w;
            y_sum = 0 - row_count/2;
        }
        function get_geocache_cell_color(xi,yi){
            var cell_idx = xi+"_"+yi;
            if("undefined" === typeof nodes_per_geocache_cell[cell_idx]){
                return "blue";
            }
            else {
                return "#FF0000";
            }
        }
    };
    CanvasGraph.prototype.debug_text_dump = function(){
        var context = this;
        this.ctx.globalAlpha = 1;
        var _font_size = 12;
        var _row_padding = 2;
        _font_size = Math.ceil(_font_size/this.transform.k);
        _row_padding = Math.ceil(_row_padding/this.transform.k);
        this.ctx.font = _font_size+'px Arial';
        this.ctx.fillStyle = '#000';
        var text_x = 0 - this.transform.x/this.transform.k;
        var text_y = 0 - this.transform.y/this.transform.k + _font_size;
        
        var text_arr = [];
        text_arr.push("calls to draw: "+this.draw_count);
        text_arr.push("canvas x range: "+parseInt(text_x)+" to "+parseInt(text_x+(this.canvas.width/this.transform.k)));
        text_arr.push("canvas y range: "+parseInt(text_y)+" to "+parseInt(text_y+(this.canvas.height/this.transform.k)));
        text_arr.push("this.transform.k: "+this.transform.k);
        text_arr.push("this.transform.x: "+this.transform.x);
        text_arr.push("this.transform.y: "+this.transform.y);
        if(this.also_debug_node_positions()){
            this.data().nodes.forEach(function(node,i){
                text_arr.push("this.data().nodes["+i+"].x: "+node.x);
                text_arr.push("this.data().nodes["+i+"].y: "+node.y);
                text_arr.push("this.data().nodes["+i+"].vx: "+node.vx);
                text_arr.push("this.data().nodes["+i+"].vy: "+node.vy);
            });
        }
        this.extra_log.forEach(function(n){
            text_arr.push(n);
        });
        
        drawDebugTextArr(text_arr);
        
        function drawDebugTextArr(arr){
            arr.forEach(function(txt,i){
                context.ctx.fillText(txt,text_x,text_y + (_font_size * i) + (_row_padding * i));
            });
        }
    };
    CanvasGraph.prototype.debugNodeForces = function(){
        this.ctx.globalAlpha = 1;
        var _font_size = 12;
        var _row_padding = 2;
        _font_size = Math.ceil(_font_size/this.transform.k);
        _row_padding = Math.ceil(_row_padding/this.transform.k);
        this.ctx.font = _font_size+'px Arial';
        this.ctx.fillStyle = '#000';
        var text_x = 0 - this.transform.x/this.transform.k;
        var text_y = 0 - this.transform.y/this.transform.k + _font_size;
        var text_arr = [
            "this.transform.k: "+this.transform.k,
            "this.transform.x: "+this.transform.x,
            "this.transform.y: "+this.transform.y,
        ];
        text_arr.forEach(function(txt,i){
            this.ctx.fillText(txt,text_x,text_y + (_font_size * i) + (_row_padding * i));
        },this);
    };
    
    CanvasGraph.prototype.apply_layout = function(){
        this.data().info.layout_applied = true;
        if (typeof (CanvasGraphLayouts.layouts[this.layout()]) !== "undefined") {
            var layout_obj = CanvasGraphLayouts.layouts[this.layout()];
            if(!layout_obj.zoom_by_force){
                this.clear_fixed_positions(this.data());
            }
            this.extra_log = [
                "Layout: " + this.layout(),
                "xy strength: " + (typeof layout_obj.xy.strength === "function" ? "func" : layout_obj.xy.strength),
                "link strength: " + (typeof layout_obj.link.strength === "function" ? "func" : layout_obj.link.strength),
                "charge strength: " + (typeof layout_obj.manyBodyForce.strength === "function" ? "func" : layout_obj.manyBodyForce.strength),
            ];
            this.layout_pre_init(layout_obj);
            if(typeof layout_obj.pre_init !== "undefined")layout_obj.pre_init.call(this,this.data());
            if(typeof layout_obj.init !== "undefined")layout_obj.init.call(this,this.data());
            if(typeof layout_obj.post_init !== "undefined")layout_obj.post_init.call(this,this.data());
            this.layout_post_init(layout_obj);
            if(layout_obj.zoom_by_force){
                this.simulation.nodes().forEach(function(n){
                    n.fx = n.force_x;
                    n.fy = n.force_y;
                });
            }
            if(!this._manually_zoomed){
                this.zoom_to_fit.call(this,0);
            }
        }
    };
    CanvasGraph.prototype.layout_pre_init = function(layout_obj){
//        this.simulation.alphaDecay(0.001);
        this.simulation.velocityDecay(0.01);
        this.simulation.alphaDecay(layout_obj.decay.alpha);
        this.simulation.velocityDecay(layout_obj.decay.velocity);
        
        this.set_link_forces(layout_obj);
        this.set_charge_forces(layout_obj);

        if(typeof layout_obj.xy.post === "undefined" || !layout_obj.xy.post){
            this.set_xy_forces(layout_obj);
        }
    };
    CanvasGraph.prototype.layout_post_init = function(layout_obj){
        if(typeof layout_obj.xy.post !== "undefined" && layout_obj.xy.post){
            this.set_xy_forces(layout_obj);
        }
    };
    CanvasGraph.prototype.set_link_forces = function(layout_obj){
        if(this.link_force().length > 0){
            var _force_obj = this.link_force().find(function(n){
                return n.layout === this.layout();
            },this);
            if(_force_obj)layout_obj.link = _force_obj['obj'];
        }
        this.simulation.force("link", null);
        this.linkForce.distance(layout_obj.link.distance).strength(layout_obj.link.strength);
        this.simulation.force("link", this.linkForce);
    };
    CanvasGraph.prototype.set_charge_forces = function(layout_obj){
        if(this.manybody_force().length > 0){
            var _force_obj = this.manybody_force().find(function(n){
                return n.layout === this.layout();
            },this);
            if(_force_obj){
                layout_obj.manyBodyForce = _force_obj['obj'];
            }
        }
        if(this.charge_max_distance() || this.charge_min_distance()){
            this.manyBodyForce = d3v4.forceManyBody();
            if(this.charge_max_distance())this.manyBodyForce.distanceMax(this.charge_max_distance());
            if(this.charge_min_distance())this.manyBodyForce.distanceMin(this.charge_min_distance());
        }
        this.simulation.force("charge", null);
        this.manyBodyForce.strength(layout_obj.manyBodyForce.strength);
        this.simulation.force("charge", this.manyBodyForce);
    };
    CanvasGraph.prototype.set_xy_forces = function(layout_obj){
        if(this.xy_force().length > 0){
            var _force_obj = this.xy_force().find(function(n){
                return n.layout === this.layout();
            },this);
            if(_force_obj)layout_obj.xy = _force_obj['obj'];
        }
        this.simulation.force("x",null);
        this.simulation.force("y",null);
        delete this.forceX;
        delete this.forceY;
        this.forceX = d3v4.forceX();
        this.forceY = d3v4.forceY();
        this.forceX.x(layout_obj.xy.x).strength(layout_obj.xy.strength);
        this.forceY.y(layout_obj.xy.y).strength(layout_obj.xy.strength);
        this.simulation.force("x",this.forceX);
        this.simulation.force("y",this.forceY);
    };
    CanvasGraph.prototype.resize = function() {
        var retVal = CanvasWidget.prototype.resize.apply(this, arguments);
        if(this.data().info){
            this.zoom_to_fit(0);
            this.draw();
        }
        return retVal;
    };
    CanvasGraph.prototype.format_data = function(data) {
        data.info = {};
        if(data.nodes.length === 0)return data;
        var context = this;
        data.info.max_tiers = 1;
        data.info.nodes_by_tier = {};
        data.info.links_by_index = {};
        data.info.nodes_by_child_count = {};
        data.info.nodes_by_parent_count = {};
        data.info.nodes_by_unique_identifier = {};
        data.info.nodes_by_group_id = {};
        data.info.layout_applied = false;

        if (this.dynamic_max_node_width())
            this.max_node_width(0);
        if (this.dynamic_max_node_height())
            this.max_node_height(0);

        data.nodes.forEach(function (n, i) {
            if (typeof (n.id) === "undefined") {
                n.id = '' + i;
            }
            data.info.nodes_by_unique_identifier[n[context.unique_identifier()]] = n;
            if("undefined" === typeof n.child_arr)n.child_arr = [];
            if("undefined" === typeof n.parent_arr)n.parent_arr = [];
        });

        data.links.forEach(function (link) {
            if("undefined" === typeof link.source || "undefined" === typeof link.target){
                //
            } else {
                var _ = {};
                var source_obj,target_obj;
                if(typeof(link.source) === "object"){
                    _.source = link.source;
                    _.target = link.target;
                    source_obj = data.info.nodes_by_unique_identifier[link.source[context.unique_identifier()]];
                    target_obj = data.info.nodes_by_unique_identifier[link.target[context.unique_identifier()]];
                } else {
                    _ = link;
                    source_obj = data.info.nodes_by_unique_identifier[link.source];
                    target_obj = data.info.nodes_by_unique_identifier[link.target];
                }
                link.source = source_obj;
                link.target = target_obj;
                link.label = target_obj.type;
                if (typeof (data.info.links_by_index[_.source]) === "undefined")
                    data.info.links_by_index[_.source] = 0;
                if (typeof (source_obj.child_arr) === "undefined")source_obj.child_arr = [];
                if (typeof (target_obj.parent_arr) === "undefined")target_obj.parent_arr = [];
                if (typeof (source_obj.parent_arr) === "undefined")source_obj.parent_arr = [];
                if (typeof (target_obj.child_arr) === "undefined")target_obj.child_arr = [];
                var _tuid = _.target[context.unique_identifier()];
                var _suid = _.source[context.unique_identifier()];

                if(source_obj.child_arr.indexOf(_tuid) === -1 && target_obj.parent_arr.indexOf(_suid) === -1){
                    source_obj.child_arr.push(_tuid);
                    target_obj.parent_arr.push(_suid);

                    target_obj.leaf_idx = data.info.links_by_index[_.source];
                    data.info.links_by_index[_.source]++;
                }
            }
        });

        order_nodes_by_parent_count();
        order_nodes_by_child_count();

        assign_first_hierarchy_tier(data.info.nodes_by_parent_count[Object.keys(data.info.nodes_by_parent_count)[0]]);

        if (this.auto_primary_threshold()) {
            data.nodes.forEach(function (n, i, arr) {
                var child_to_total_ratio = context.auto_primary_threshold() < (n.child_arr.length / arr.length);
                if (n.child_arr.length > child_to_total_ratio) {
                    n.is_primary = true;
                }
            });
        }
        data.nodes.forEach(function (d, i, arr) {
            d.has_no_children = d.child_arr.length === 0;
            d.has_multiple_parents = d.parent_arr.length > 1;

            d.is_leaf = d.has_no_children && !d.has_multiple_parents;
            d.is_orphan = d.parent_arr.length === 0;
            if(typeof d.group_id !== "undefined")delete d.group_id;
        });
        data.nodes.forEach(function (d, i, arr) {
            d.child_leaf_count = 0;
            d.child_arr.forEach(function(_idx){
                if(data.info.nodes_by_unique_identifier[_idx].is_leaf)d.child_leaf_count++;
            });
            d.leaf_ratio = d.child_leaf_count / d.child_arr.length;
            d.leaf_ratio = isNaN(d.leaf_ratio) ? 0 : d.leaf_ratio;
        });
        
        data.info.current_group_id = 0;
        data.nodes.forEach(function (node) {
            if(typeof node.group_id === "undefined"){
                data.info.current_group_id++;
                assign_group_id(node);
            }
        });
        var group_id_arr = Object.keys(data.info.nodes_by_group_id);
        var group_xy = {};
        
        group_id_arr.forEach(function(gid,_i,_arr){
            var _radius = context.circle_layout_radius();
            var group_count_ratio = data.info.nodes_by_group_id[gid].length / data.nodes.length;
            _radius = _radius - (_radius * group_count_ratio);
            var _angle = Math.PI * 2 * (_i === 0 ? 0 : (_i) / (_arr.length));
            group_xy[gid] = {
                "x": Math.cos(_angle) * _radius,
                "y": Math.sin(_angle) * _radius
            };
        });
        for(var group_id in group_xy){
            data.info.nodes_by_group_id[group_id].forEach(function(node){
                node.group_x = group_xy[group_id].x;
                node.group_y = group_xy[group_id].y;
            });
        }
        
        return data;
        function assign_group_id(node){
            if(typeof node.group_id !== "undefined")return true;
            node.group_id = data.info.current_group_id;
            
            if("undefined" === typeof data.info.nodes_by_group_id[node.group_id])data.info.nodes_by_group_id[node.group_id] = [];
            data.info.nodes_by_group_id[node.group_id].push(node);
            
            node.child_arr.forEach(function(child_node_uid){
                var child_node_obj = data.info.nodes_by_unique_identifier[child_node_uid];
                assign_group_id(child_node_obj);
            });
            node.parent_arr.forEach(function(parent_node_uid){
                var parent_node_obj = data.info.nodes_by_unique_identifier[parent_node_uid];
                assign_group_id(parent_node_obj);
            });
        }
        function get_group_id(_node_obj){
            //data.info.nodes_by_unique_identifier[data.nodes[6].parent_arr[0]]
            var ret = false;
            ret = _node_obj.group_id;
            if(ret)return ret;
            ret = get_group_id_by_arr(_node_obj.child_arr);
            if(ret)return ret;
//            ret = get_group_id_by_arr(_node_obj.parent_arr);
            return ret;
        }
        function get_group_id_by_arr(uid_arr){
            //__g.data().info.nodes_by_unique_identifier[__g.data().nodes[6].parent_arr[0]]
            var ret = false;
            uid_arr.forEach(function(_uid){
                ret = get_group_id(data.info.nodes_by_unique_identifier[_uid]);
            });
            return ret;
        }
        function order_nodes_by_child_count() {
            data.nodes.forEach(function (node) {
                var _child_count = node.child_arr.length;
                if (typeof (data.info.nodes_by_child_count[_child_count]))
                    data.info.nodes_by_child_count[_child_count] = [];
                data.info.nodes_by_child_count[_child_count].push(node);
            });
        }
        function order_nodes_by_parent_count() {
            data.nodes.forEach(function (node) {
                var _parent_count = node.parent_arr.length;
                if (typeof (data.info.nodes_by_parent_count[_parent_count]))
                    data.info.nodes_by_parent_count[_parent_count] = [];
                data.info.nodes_by_parent_count[_parent_count].push(node);
            });
        }
        function assign_first_hierarchy_tier(_nodes) {
            _nodes.forEach(function (_node) {
                assign_hierarchy_tiers(_node, 0);
            });

        }
        function assign_hierarchy_tiers(_n, depth) {
            if (typeof (_n.tier) === "undefined") {
                _n.tier = depth;
                if (typeof (data.info.nodes_by_tier[depth]) === "undefined")
                    data.info.nodes_by_tier[depth] = [
                    ];
                data.info.nodes_by_tier[depth].push(_n);
                _n.child_arr.forEach(function (node_uid) {
                    if (data.info.max_tiers < (depth + 1)) {
                        data.info.max_tiers = (depth + 1);
                    }
                    assign_hierarchy_tiers(context.get_node(node_uid), depth + 1);
                });
            }
        }
    };

    CanvasGraph.prototype.init_linkanalysis = function() {
        var context = this;
        this.ctx = this.canvas.getContext("2d");
        this.transform = d3v4.zoomIdentity;
        this.selection_rect = {};
        
        var _rect = this.canvas.getBoundingClientRect();
        this.canvas.height = _rect.height;
        this.canvas.width = _rect.width;

        d3v4.select(this.canvas).on("mousemove", function(){
            context._needs_redraw = true;
            context.canvas_mousemove.call(context);
        });
        this.transform.x = this.canvas.width / 2;
        this.transform.y = this.canvas.height / 2;

        this.data(this.format_data(this.data()));
        this.simulation = d3v4.forceSimulation(this.data().nodes)
            .alphaDecay(this.alphaDecay())
        ;
        this.linkForce = d3v4.forceLink(this.data().links)
//            .strength(function () {
//                return 0.001;
//            })
        ;
        this.manyBodyForce = d3v4.forceManyBody();
        this.forceX = d3v4.forceX().x(function (n) {
            return n.force_x ? n.force_x : 0;
        });
        this.forceY = d3v4.forceY().y(function (n) {
            return n.force_y ? n.force_y : 0;
        });
        this.voronoi = d3v4.voronoi()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .extent([
                    [
                        -1 * (this.canvas.width / 2),
                        -1 * (this.canvas.height / 2)
                    ],
                    [
                        (this.canvas.width / 2),
                        (this.canvas.height / 2)
                    ]
                ]);
        this.simulation
                .force("charge", this.manyBodyForce)
                .force("link", this.linkForce)
                .force("x", this.forceX)
                .force("y", this.forceY)
                .on("tick", function(){
                    if(typeof context.data().info === "undefined"){
                        context.data().info = {};
                    }
                    if(!context.data().info.nothing_is_moving || context.draw_count <= 500 + context.prev_draw_count){
                        context.draw.call(context);
                    }
                });
                
        this.apply_fixed_positions();
    };
    CanvasGraph.prototype.apply_fixed_positions = function() {
        this.data().nodes.forEach(function(n){
            if(typeof(this._fixed_positions[n.index]) !== "undefined"){
                n.fx = this._fixed_positions[n.index].x;
                n.fy = this._fixed_positions[n.index].y;
            }
        },this);
    };
    CanvasGraph.prototype.inside_poly_array = function(point, vs_arr, trans) {
        if (point && vs_arr) {
            for (var i = 0; i < vs_arr.length; i++) {
                if (this.inside_poly(point, vs_arr[i], trans))
                    return true;
            }
        }
        return false;
    };
    CanvasGraph.prototype.inside_poly = function(point, vs, trans) {
        trans = trans ? trans : {
            "invertX": function (n) {
                return n;
            }, 
            "invertY": function (n) {
                return n;
            }
        };
        if (vs[vs.length - 1] !== vs[0]) {
            vs.push(vs[0]);
        }
        var x = trans.invertX(point[0]), y = trans.invertY(point[1]);
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = trans.invertX(vs[i][0]), yi = trans.invertY(vs[i][1]);
            var xj = trans.invertX(vs[j][0]), yj = trans.invertY(vs[j][1]);
            var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    CanvasGraph.prototype.avg_point_in_polygon = function(polygon) {
        var sum_x = 0;
        var sum_y = 0;
        var _points = polygon.filter(function (n) {
            return n instanceof Array;
        });
        _points
            .forEach(function (p) {
                sum_x += p[0];
                sum_y += p[1];
            });
        var avg_x = sum_x / (_points.length);
        var avg_y = sum_y / (_points.length);
        return [
            avg_x,
            avg_y
        ];
    };
    CanvasGraph.prototype.centerOnVoronoi = function(nodes) {
        var context = this;
        nodes.forEach(function (node) {
            var avg_point = context.avg_point_in_polygon(node.voronoi_polygon);
            node.fx = avg_point[0];
            node.fy = avg_point[1];
        });
    };
    CanvasGraph.prototype.drawVoronoiPolygons = function(voronoi, color, nodes) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.strokeStyle = color;
        var poly_arr_arr = _get_polygons(nodes);
        poly_arr_arr.forEach(function (poly_arr) {
            if (poly_arr) {
                poly_arr.forEach(function (poly, _idx) {
                    if (poly) {
                        if (_idx === 0) {
                            this.ctx.moveTo(poly[0], poly[1]);
                        } else {
                            this.ctx.lineTo(poly[0], poly[1]);
                        }
                    }
                });
            }
        });
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        function _get_polygons(_nodes) {
            var _voronoi_polygons = voronoi.polygons(_nodes);
            _nodes.forEach(function (n, i) {
                if (_voronoi_polygons[i])
                    n.voronoi_polygon = _voronoi_polygons[i];
            });
            return _voronoi_polygons;
        }
    };
    CanvasGraph.prototype.drawLink = function(d) {
        var context = this;
        if (d.target.is_hidden || d.source.is_hidden || d.target.is_collapsed || d.source.is_collapsed) {
            return;
        }
        if (!d.is_hovered && this.data().info.is_hovering) {
            this.ctx.globalAlpha = this.background_node_opacity();
        } else {
            this.ctx.globalAlpha = 1;
        }
        this.ctx.beginPath();
        var link_type = d.link_type ? d.link_type : this.link_default();
        this.ctx.lineWidth = this.line_stroke_w();
        this.ctx.fillStyle = this.line_fill_color();
        this.ctx.strokeStyle = this.line_stroke_color();
        
        
        if(this.debug_line_intersections()){
            if(d.intersect_count > 0){
                this.ctx.fillStyle = "#ff0000";
                this.ctx.strokeStyle = "#ff0000";
                if(this.debug_line_intersection_count())this.ctx.lineWidth = d.intersect_count;
            } else {
                this.ctx.fillStyle = "#0000ff";
                this.ctx.strokeStyle = "#0000ff";
                this.ctx.lineWidth = this.line_stroke_w();
            }
        }
        
        if(typeof d.source.fx !== "undefined")d.source.x = d.source.fx;
        if(typeof d.source.fy !== "undefined")d.source.y = d.source.fy;
        if(typeof d.target.fx !== "undefined")d.target.x = d.target.fx;
        if(typeof d.target.fy !== "undefined")d.target.y = d.target.fy;
        switch (link_type) {
            case 'straight':
                this.ctx.moveTo(d.source.x, d.source.y);
                this.ctx.lineTo(d.target.x, d.target.y);
                break;
            case 'orthogonal':
                this.ctx.moveTo(d.source.x, d.source.y);
                this.ctx.lineTo(d.source.x, d.target.y);
                this.ctx.lineTo(d.target.x, d.target.y);
                break;
        }
//        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.lineWidth = this.node_stroke_width();
        d.label = typeof d.label !== "undefined" ? d.label : d.text;
        if(typeof d.label !== "undefined"){
            if(d.target.is_hovered){
                if(typeof d.show_label_on_hover === "undefined" || d.show_label_on_hover){
                    drawLinkText();
                }
            }
            else if(d.show_label){
                if (this.hide_leaf_edge_label()) {
                    if (!d.target.is_leaf) {
                        drawLinkText();
                    }
                } else {
                    drawLinkText();
                }
            }
        }
        function drawLinkText() {
            var _txt_h = context.scale_link_with_node() ? context.link_text_size() * d.target.scale_mult : context.link_text_size();
            context.ctx.font = _txt_h + "px 'Helvetica'";
            var _text_size = context.getMeasuredText(d.label);

            var avg_line_x = (d.source.x + d.target.x) / 2;
            var avg_line_y = (d.source.y + d.target.y) / 2;
            var _x1 = avg_line_x - _text_size.width / 2;
            var _y1 = avg_line_y - (_txt_h / 2);

            context.ctx.fillStyle = '#ffffff';
            context.ctx.fillRect(_x1, _y1, _text_size.width, _txt_h);

            context.ctx.fillStyle = '#333333';
            context.ctx.fillText(d.label, _x1, _y1 + (_txt_h) - (_txt_h / 8));
        }
    };
    CanvasGraph.prototype.drawTooltip = function(d) {
        var context = this;
        
        drawTooltipText();
        
        function drawTooltipText() {
            var _txt_h = context.scale_link_with_node() ? context.link_text_size() * d.target.scale_mult : context.link_text_size();
            var p = 2;
            context.ctx.font = _txt_h + "px 'Helvetica'";
            var _text_size = context.getMeasuredText(d.tooltip);

            var _x1 = d.x - _text_size.width / 2;
            var _y1 = d.y - (_txt_h / 2);

            context.ctx.strokeStyle = '#333333';
            context.ctx.strokeRect(_x1 - p, _y1 - p, _text_size.width + p, _txt_h + p);
            context.ctx.fillStyle = '#ffffff';
            context.ctx.fillRect(_x1 - p, _y1 - p, _text_size.width + p, _txt_h + p);

            context.ctx.fillStyle = '#333333';
            context.ctx.fillText(d.tooltip, _x1 - (p/2), _y1 + (_txt_h) - (_txt_h / 8) - (p/2));
        }
    };
    CanvasGraph.prototype.drawNode = function(d,i) {
        var context = this;
        var _w = this.width();
        var _h = this.height();
        var is_circle_icon = this.is_circle_icon();
        var _p = this.node_pixel_padding();//pixel padding
        var _txt_h = this.node_text_size();
        var _icon_h = this.icon_size();
        var _anno_h = this.annotation_size();
        var _node_stroke_width = this.node_stroke_width();
        d.is_selected = d.is_selected ? d.is_selected : false;
        d.is_primary = d.is_primary ? d.is_primary : false;
        d.poly = [];
        d.left_edge = d.x;
        d.right_edge = d.x;
        d.top_edge = d.y;
        d.bottom_edge = d.y;
        d.scale_mult = d.default_scale_mult ? d.default_scale_mult : this.default_node_scale();
        d.scale_mult = d.is_primary ? this.primary_node_scale() : d.scale_mult;
        if(typeof this._fixed_positions[i] !== "undefined"){
            d.x = this._fixed_positions[i].x;
            d.y = this._fixed_positions[i].y;
        }
        if(Math.abs(d.vx) < this.velocity_target() && Math.abs(d.vy) < this.velocity_target()){
            d.vx = 0;
            d.vy = 0;
        } else {
            this.data().info.nothing_is_moving = false;
        }

        var apply_scale_multiplier = function (scale_mult) {
            _w *= scale_mult;
            _h *= scale_mult;
            _p *= scale_mult;
            _txt_h *= context.scale_node_text_size() ? scale_mult : context.default_node_scale();
            _icon_h *= scale_mult;
            _anno_h *= scale_mult;
            _node_stroke_width *= scale_mult;
        };
        if (typeof (d.scale_mult) !== "undefined") {
            apply_scale_multiplier(d.scale_mult);
        }

        if (this.selection_rect.is_showing && !this.selection_rect.is_moving) {
            if (this.inside_poly([
                d.x,
                d.y
            ], this.selection_rect.poly)) {
                d.is_selected = true;
            } else {
                d.is_selected = false;
            }
        }
        this.ctx.moveTo(d.x, d.y);
        this.ctx.textBaseline = 'alphabetic';
        this.ctx.scale(1, 1);

        var has_no_icon = typeof (d.icon) === "undefined";
        var has_no_annotations = typeof (d.annotations) === "undefined";
        var has_no_label = typeof (d.label) === "undefined";
        if (d.is_hidden || d.is_collapsed) {
            this.ctx.globalAlpha = 0;
        } else if (!d.is_hovered && this.data().info.is_hovering) {
            this.ctx.globalAlpha = 0.1;
        } else {
            this.ctx.globalAlpha = 1;
        }
        if (!has_no_icon && this.show_icon(d)) {
            drawNodeIcon();
        }
        if (!has_no_label && this.show_label(d) && d.label.length > 0) {
            drawNodeLabel();
        }
        if (!has_no_annotations && this.show_annotations(d)) {
            drawNodeAnnotations();
        }
        
        if(d.is_directly_hovered && typeof d.tooltip !== "undefined"){
            this.drawTooltip(d);
        }
        
        _update_edges();

        if (this.dynamic_max_node_width() && this.max_node_width() < d.width) {
            this.max_node_width(d.width);
        }
        if (this.dynamic_max_node_height() && this.max_node_height() < d.height) {
            this.max_node_height(d.height);
        }

        function _update_edges() {
            d.poly.forEach(function (points_arr) {
                points_arr.forEach(function (point) {
                    if (point[0] < d.left_edge)
                        d.left_edge = point[0];
                    if (point[0] > d.right_edge)
                        d.right_edge = point[0];
                    if (point[1] < d.top_edge)
                        d.top_edge = point[1];
                    if (point[1] > d.bottom_edge)
                        d.bottom_edge = point[1];
                });
            });
            d.width = d.right_edge - d.left_edge;
            d.height = d.bottom_edge - d.top_edge;
            d.diameter = Math.hypot(d.width, d.height);
        }

        function drawNodeIcon() {
            context.ctx.font = _icon_h + "px '" + context.icon_font() + "'";
            var _icon_txt = d.icon ? d.icon : d.id[0];
            
            d._icon_size = context.getMeasuredText(_icon_txt);
            drawNodeIconBackground();
            drawNodeIconText();
            function drawNodeIconText() {
                context.ctx.strokeStyle = context.icon_stroke(d);
                context.ctx.fillStyle = context.icon_fill(d);
                var _x1 = d.x - (_w / 2) - 20;
                var _y1 = d.y - (_h / 2);
                context.ctx.rect(_x1, _y1, _w, _h);
                //this.ctx.fillStyle = "#333";
                if (context.icon_font() === "FontAwesome") {
                    context.ctx.fillText(_icon_txt, d.x - (d._icon_size.width / 2), d.y + (_icon_h / 2) - (_p / 2) - (_icon_h * 0.1));
                } else {
                    context.ctx.fillText(_icon_txt, d.x - (d._icon_size.width / 2), d.y + (_icon_h / 2) - (_p / 2));
                }
            }
            function drawNodeIconBackground() {
                context.ctx.strokeStyle = typeof (context.default_container_stroke()) === "function" ? context.default_container_stroke(d) : context.default_container_stroke();
                context.ctx.fillStyle = typeof (context.default_container_fill()) === "function" ? context.default_container_fill(d) : context.default_container_fill();
                var _x1 = d.x - (_w / 2);
                var _y1 = d.y - (_h / 2);
                context.ctx.beginPath();
                d.poly.push([
                    [
                        _x1,
                        _y1
                    ],
                    [
                        _x1 + _w,
                        _y1
                    ],
                    [
                        _x1 + _w,
                        _y1 + _h
                    ],
                    [
                        _x1,
                        _y1 + _h
                    ]
                ]);
                if (is_circle_icon) {
                    context.ctx.arc(_x1 + _w / 2, _y1 + _h / 2, _w / 2, 0, 2 * Math.PI);
                } else {
                    context.ctx.rect(_x1, _y1, _w, _h);
                }
                //context.ctx.fillStyle = "#fff";
                context.ctx.fill();
                //context.ctx.strokeStyle = "#333";
                context.ctx.stroke();
                context.ctx.closePath();
            }
        }
        function drawNodeLabel() {
            context.ctx.font = _txt_h + "px 'Helvetica'";
            var _label_txt = d.label;
            var _txt_size = context.getMeasuredText(_label_txt);
            var _txt_w = _txt_size.width;

            var _x1 = d.x;
            var _y1 = d.y;

            _y1 -= _node_stroke_width;//Adjust upward for LABEL CONTAINER border
            _y1 -= _node_stroke_width;//Adjust upward for LABEL CONTAINER border

            if (has_no_icon) {
                _x1 -= _txt_w / 2;
            } else {
                if (!context.vertex_preset()) {
                    _x1 -= (_txt_w / 2);
                    _x1 -= context.node_stroke_width() * 2;
                    _y1 += _h;
                    _y1 -= (_txt_h / 2) - _p;
                    if(d.is_primary){
                        _y1 -= (_txt_h / 2);
                    }
                } else {
                    _x1 -= context.node_stroke_width() * 2;
                    _x1 += d._icon_size.width / 1.2;
                    _x1 -= _p;
                    _y1 += _h;
                    _y1 -= _icon_h / 2;
                    _y1 -= (_txt_h) + _p;
                }
            }
            drawNodeLabelBackground();
            drawNodeLabelText();
            function drawNodeLabelText() {
                context.ctx.strokeStyle = context.label_stroke(d);
                context.ctx.fillStyle = context.label_fill(d);
                var __x1 = _x1 + _p;
                var __y1 = _y1;
                context.ctx.fillText(_label_txt, __x1, __y1);
            }
            function drawNodeLabelBackground() {
                context.ctx.strokeStyle = context.labelbg_stroke(d);
                context.ctx.fillStyle = context.labelbg_fill(d);
                var __x1 = _x1;
                var __y1 = _y1;
                __y1 -= _txt_h + _p / 2;//Match top of LABEL CONTAINER with bottom of ICON CONTAINER
                var _tw = _txt_w + (_p * 2);
                var _th = _txt_h + (_p * 2);
                d.poly.push([
                    [
                        __x1,
                        __y1
                    ],
                    [
                        __x1 + _tw,
                        __y1
                    ],
                    [
                        __x1 + _tw,
                        __y1 + _th
                    ],
                    [
                        __x1,
                        __y1 + _th
                    ]
                ]);
                context.ctx.beginPath();
                context.ctx.rect(__x1, __y1, _tw, _th);
                context.ctx.fill();
                context.ctx.stroke();
                context.ctx.closePath();
            }
        }
        function drawNodeAnnotations() {
            context.ctx.font = _anno_h + "px '" + context.annotation_font() + "'";
            var _sum_w = 0;
            d.annotations.forEach(function (annotation, anno_idx) {
                drawNodeAnnotation(annotation, anno_idx);
            });
            function drawNodeAnnotation(o, i) {
                var _anno_txt = o.icon;
                var _anno_size = context.getMeasuredText(o.icon);
                var anno_w = _anno_size.width + (_p * 2);
                var anno_h = _anno_h + (_p * 2);
                var _anno_y_offset = 0;
                var _anno_side_margin = 1;
                var _x1 = d.x + (_w / 2) + _sum_w;
                var _y1 = d.y - (_p * 2) - _anno_h - _node_stroke_width + _anno_y_offset;

                if (!context.vertex_preset()) {
                    _y1 += _node_stroke_width;
                    _y1 += _h / 2;
                } else {
                    _y1 += _node_stroke_width * 2;
                    _y1 += _p * 2;
                    _y1 += _h / 2;
                }
                drawNodeAnnotationBackground();
                drawNodeAnnotationIcon();
                _sum_w += anno_w + _anno_side_margin;

                function drawNodeAnnotationBackground() {
                    var __x1 = _x1;
                    var __y1 = _y1;
                    var _tw = anno_w;
                    var _th = anno_h;
                    d.poly.push([
                        [
                            __x1,
                            __y1
                        ],
                        [
                            __x1 + _tw,
                            __y1
                        ],
                        [
                            __x1 + _tw,
                            __y1 + _th
                        ],
                        [
                            __x1,
                            __y1 + _th
                        ]
                    ]);
                    context.ctx.beginPath();
                    context.ctx.rect(__x1, __y1, anno_w, anno_h);

                    context.ctx.fillStyle = o.color ? o.color : o.fill;
                    context.ctx.fill();
                    context.ctx.strokeStyle = o.color ? o.color : o.stroke;
                    context.ctx.stroke();
                    context.ctx.closePath();
                }
                function drawNodeAnnotationIcon() {
                    var __x1 = _x1 + _p;
                    var __y1 = _y1 + anno_h - (_p * 2);
                    context.ctx.beginPath();
                    context.ctx.strokeStyle = context.annotation_icon_fill();
                    context.ctx.fillStyle = context.annotation_icon_stroke();
                    context.ctx.fillText(_anno_txt, __x1, __y1 + (_p / 2));
                    context.ctx.closePath();
                }
            }
        }
    };
    
    CanvasGraph.prototype.getMeasuredText = function(txt) {
        var ret;
        if(typeof(this._cached_text_measurements[this.ctx.font + '___' + txt]) !== "undefined"){
            ret = this._cached_text_measurements[this.ctx.font + '___' + txt];
        } else {
            ret = this.ctx.measureText(txt);
            this._cached_text_measurements[this.ctx.font + '___' + txt] = ret;
        }
        return ret;
    };
    
    CanvasGraph.prototype.show_selection_rect = function() {
        this.ctx.strokeStyle = "#333333";
        this.ctx.fillStyle = "#333333";
        this.selection_rect.endX = this.transform.invertX(this.selection_rect.offsetX - this.selection_rect.offsetLeft);
        this.selection_rect.endY = this.transform.invertY(this.selection_rect.offsetY - this.selection_rect.offsetTop);
        if (this.selection_rect.endX > this.selection_rect.startX) {
            this.selection_rect.minX = this.selection_rect.startX;
            this.selection_rect.maxX = this.selection_rect.endX;
        } else {
            this.selection_rect.minX = this.selection_rect.endX;
            this.selection_rect.maxX = this.selection_rect.startX;
        }
        if (this.selection_rect.endY > this.selection_rect.startY) {
            this.selection_rect.minY = this.selection_rect.startY;
            this.selection_rect.maxY = this.selection_rect.endY;
        } else {
            this.selection_rect.minY = this.selection_rect.endY;
            this.selection_rect.maxY = this.selection_rect.startY;
        }
        this.selection_rect.w = this.selection_rect.maxX - this.selection_rect.minX;
        this.selection_rect.h = this.selection_rect.maxY - this.selection_rect.minY;
        var selection_poly = [
            [this.selection_rect.minX,this.selection_rect.minY],
            [this.selection_rect.maxX,this.selection_rect.minY],
            [this.selection_rect.maxX,this.selection_rect.maxY],
            [this.selection_rect.minX,this.selection_rect.maxY]
        ];
        this.selection_rect.poly = selection_poly;
        this.ctx.setLineDash([6]);
        this.ctx.strokeRect(this.selection_rect.minX, this.selection_rect.minY, this.selection_rect.w, this.selection_rect.h);
        this.ctx.setLineDash([0]);
    };
    CanvasGraph.prototype.push_to_poly = function(poly, point) {
        var min_x = Math.min.apply(this, poly.map(function (_n) {
            return parseInt(this.transform.applyX(_n[0]));
        }));
        var max_x = Math.max.apply(this, poly.map(function (_n) {
            return parseInt(this.transform.applyX(_n[0]));
        }));
        var min_y = Math.min.apply(this, poly.map(function (_n) {
            return parseInt(this.transform.applyY(_n[1]));
        }));
        var max_y = Math.max.apply(this, poly.map(function (_n) {
            return parseInt(this.transform.applyY(_n[1]));
        }));
        var significant_x = point[0] < min_x || point[0] > max_x;
        var significant_y = point[1] < min_y || point[1] > max_y;
        if (significant_x || significant_y) {
            poly.push(point);
        }
    };
    CanvasGraph.prototype.init_linkanalysis_interactions = function() {
        var context = this;
        this.zoom = d3v4.zoom()
            .on("start", function () {
                context.zoomstart.apply(this,arguments);
            })
            .on("zoom", function () {
                context.zoomtick.apply(this,arguments);
            })
            .on("end", function () {
                context.zoomend.apply(this,arguments);
            })
        ;
        d3v4.select(this.canvas)
            .call(
                d3v4.drag()
                    .subject(function(){
                        return context.dragsubject.apply(context,arguments);
                    })
                    .on("start", function () {
                        context.dragstarted.apply(this,arguments);
                    })
                    .on("drag", function () {
                        context.dragtick.apply(this,arguments);
                    })
                    .on("end", function () {
                        context.dragended.apply(this,arguments);
                    })
                )
                .call(this.zoom)
                .on("click", function () {
                    var clicked_node = context.get_clicked_node.call(context,context.transform.invertX(d3v4.event.offsetX), context.transform.invertY(d3v4.event.offsetY));
                    if (typeof (clicked_node) === "undefined")
                        return;
                    var row = [
                        clicked_node.index,
                        clicked_node.label,
                        clicked_node.weight
                    ];
                    var col = '';
                    clicked_node.is_selected = !clicked_node.is_selected;
                    var is_selected = clicked_node.is_selected;
                    var vertex_obj = {vertex: clicked_node};
                    if (context.enable_node_collapse() && d3v4.event.shiftKey && d3v4.event.ctrlKey) {
                        context.toggle_collapsed_node_state(clicked_node);
                        context.draw();
                    }
                    context.vertex_click(row, col, is_selected, vertex_obj);
                })
                .on("dblclick", function () {
                    var clicked_node = context.get_clicked_node(context.transform.invertX(d3v4.event.offsetX), context.transform.invertY(d3v4.event.offsetY));
                    if (typeof (clicked_node) === "undefined")
                        return;
                    var row = [
                        clicked_node.index,
                        clicked_node.label,
                        clicked_node.weight
                    ];
                    var col = '';
                    clicked_node.is_selected = !clicked_node.is_selected;
                    var is_selected = clicked_node.is_selected;
                    var vertex_obj = {vertex: clicked_node};
                    context.vertex_dblclick(row, col, is_selected, vertex_obj);
                })
                ;
        if (this.disable_dblclick_zoom()) {
            d3v4.select(this.canvas).on("dblclick.zoom", null);
        }
    };
    CanvasGraph.prototype.toggle_collapsed_node_state = function(node) {
        var context = this;
        var collapsed_count = 0;
        var is_already_collapsing = !!node.is_collapsing;
        node.is_collapsing = !is_already_collapsing;
        node.child_arr
            .map(function(n){return context.data().nodes[n];})
            .forEach( is_already_collapsing ? recursive_uncollapse : recursive_collapse);
        
        return collapsed_count;
        
        function recursive_collapse(_node,_i){
            var _node_can_collapse = true;
            _node.parent_arr.forEach(function(i){
                var parent_is_collapsed = context.data().nodes[i].is_collapsing || context.data().nodes[i].is_collapsed;
                if(!parent_is_collapsed){
                    _node_can_collapse = false;
                }
            });
            if(_node_can_collapse){
                _node.is_collapsed = true;
                collapsed_count++;
                _node.child_arr.forEach(function(idx,i){
                    recursive_collapse(context.data().nodes[idx],i);
                });
            }
        }
        function recursive_uncollapse(_node){
            _node.is_collapsed = false;
            if(!_node.is_collapsing){
                _node.child_arr.forEach(function(idx,i){
                    recursive_uncollapse(context.data().nodes[idx],i);
                });
            }
        }
    };
    CanvasGraph.prototype.get_clicked_node = function(x, y) {
        var context = this;
        var _nodes = this.data().nodes.filter(function (d) {
            return d.is_hovered && context.inside_poly_array([x,y], d.poly, context.transform);
        });
        return _nodes.slice(-1)[0];
    };
    CanvasGraph.prototype.get_node = function(unique_identifier) {
        if(this.data().info.nodes_by_unique_identifier[this.unique_identifier()]){
            return this.data().info.nodes_by_unique_identifier[this.unique_identifier()];
        }
        var context = this;
        var filtered_nodes = this.data().nodes.filter(function(n){
            return n[context.unique_identifier()] === unique_identifier;
        });
        var ret;
        if(typeof filtered_nodes[0] !== "undefined")
            ret = filtered_nodes[0];
        return ret;
    };
    CanvasGraph.prototype.zoomstart = function(context) {
        context.transform = d3v4.event.transform;
        if (d3v4.event.sourceEvent && d3v4.event.sourceEvent.ctrlKey) {
            context.selection_rect.is_showing = true;
            context.selection_rect.offsetX = d3v4.event.sourceEvent.offsetX;
            context.selection_rect.offsetY = d3v4.event.sourceEvent.offsetY;
            context.selection_rect.offsetLeft = this.offsetLeft;
            context.selection_rect.offsetTop = this.offsetTop;
            context.selection_rect.startX = context.transform.invertX(context.selection_rect.offsetX - context.selection_rect.offsetLeft);
            context.selection_rect.startY = context.transform.invertY(context.selection_rect.offsetY - context.selection_rect.offsetTop);
            context.selection_rect.endX = context.selection_rect.startX;
            context.selection_rect.endY = context.selection_rect.startY;
        }
    };
    CanvasGraph.prototype.zoomtick = function(context) {
        if(d3v4.event && d3v4.event.sourceEvent){
            var _prev_transform_x = context.transform.x;
            var _prev_transform_y = context.transform.y;
            context.transform = d3v4.event.transform;
            if (d3v4.event.sourceEvent.ctrlKey) {
                context.selection_rect.offsetX = d3v4.event.sourceEvent.offsetX;
                context.selection_rect.offsetY = d3v4.event.sourceEvent.offsetY;
                context.transform.x = _prev_transform_x;
                context.transform.y = _prev_transform_y;
            } else {
                context.selection_rect.is_showing = false;
            }
        }
        context.draw();
    };
    CanvasGraph.prototype.zoomend = function(context) {
        var none_selected = true;
        context.data().nodes.forEach(function (_node) {
            if (_node.is_selected)
                none_selected = false;
        });
        if (none_selected) {
            context.selection_rect.is_showing = false;
            context.draw();
        }
    };

    CanvasGraph.prototype.dragsubject = function() {
        var x = this.transform.invertX(d3v4.event.sourceEvent.offsetX);
        var y = this.transform.invertY(d3v4.event.sourceEvent.offsetY);
        var direct_hover;
        var ret_arr = [];
        for (var i = 0; i < this.data().nodes.length;i++) {
            var node = this.data().nodes[i];
            var _is_in_poly = this.inside_poly_array([x,y], node.poly, this.transform);
            if (node.is_selected || _is_in_poly) {
                direct_hover = node;
                if(node.is_selected){
                    ret_arr.push(node);
                }
            }
            else if (node.is_selected){
                ret_arr.push(node);
            }
        }
        if(direct_hover){
            if(ret_arr.indexOf(direct_hover) === -1)ret_arr.push(direct_hover);
        }
        return ret_arr.length > 0 ? ret_arr : undefined;
    };
    CanvasGraph.prototype.dragstarted = function(context) {
        context.selection_rect.is_showing = false;
        if (!d3v4.event.active)
        d3v4.event.subject.forEach(function (_subject) {
            _subject.fx = _subject.x;
            _subject.fy = _subject.y;
        });
        if (context.selection_rect.is_showing) {
            context.selection_rect.is_moving = true;
        }
    };
    CanvasGraph.prototype.dragtick = function(context) {
        d3v4.event.subject.forEach(function (_subject, i) {
            _subject.x = (d3v4.event.dx * (1 / context.transform.k)) + _subject.fx;
            _subject.y = (d3v4.event.dy * (1 / context.transform.k)) + _subject.fy;
            _subject.fx = _subject.x;
            _subject.fy = _subject.y;
            context._fixed_positions[_subject.index] = {
                "x":_subject.fx,
                "y":_subject.fy
            };
        });
        context.draw();
    };
    CanvasGraph.prototype.dragended = function(context) {
        if(d3v4.event.sourceEvent && d3v4.event.sourceEvent.ctrlKey){
        } else {
            context.clear_node_selections();
        }
        context.simulation.alphaTarget(0).restart();
        context.draw();
    };

    CanvasGraph.prototype.applyHoverEffect = function(hovered_nodes,direct_hovered_nodes) {
        if (hovered_nodes.length > 0) {
            this.data().info.is_hovering = true;
        } else {
            this.data().info.is_hovering = false;
        }
        this.data().nodes.forEach(function (node) {
            node.is_hovered = false;
        });
        this.data().links.forEach(function (link) {
            if (hovered_nodes.indexOf(link.source.index) !== -1 || hovered_nodes.indexOf(link.target.index) !== -1) {
                link.is_hovered = true;
                link.source.is_hovered = true;
                link.target.is_hovered = true;
            } else {
                link.is_hovered = false;
            }
        });
        this.data().nodes.forEach(function(n){
            n.is_directly_hovered = direct_hovered_nodes.indexOf(n.index) !== -1;
        });
        this.draw();
    };

    CanvasGraph.prototype.canvas_mousemove = function() {
        var i,
            x = this.transform.invertX(d3v4.event.offsetX),
            y = this.transform.invertY(d3v4.event.offsetY),
            group_hover_arr = [],
            direct_hover_arr = []
        ;
        for (i = this.data().nodes.length - 1; i >= 0; --i) {
            var node = this.data().nodes[i];
            var _is_inside_node_poly = this.inside_poly_array([x,y], node.poly, this.transform);
            
            if (node.is_selected || _is_inside_node_poly) {
                group_hover_arr.push(node.index);
                if(_is_inside_node_poly){
                    direct_hover_arr.push(node.index);
                }
            }
        }
        if (group_hover_arr) {
            this.applyHoverEffect(group_hover_arr,direct_hover_arr);
        }
    };
    CanvasGraph.prototype.clear_node_selections = function() {
        this.data().nodes.forEach(function (node) {
            node.is_selected = false;
        });
    };
    CanvasGraph.prototype.set_leaf_visibility = function() {
        this.data().nodes.forEach(function (n) {
            if (n.is_leaf) {
                n.is_hidden = !this.singletons_showing();
            }
        },this);
    };
    CanvasGraph.prototype.reset = function() {
        this.data().info.layout_applied = false;
        this.simulation.alpha(1).restart();
    };
 
    return CanvasGraph;
}));