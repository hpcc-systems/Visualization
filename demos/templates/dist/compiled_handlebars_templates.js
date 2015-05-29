(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bootstrap-dropdown'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var helper;

  return "            <li role=\"presentation\" class=\"dropdown-header\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "           <li role=\"presentation\"><a class=\"menu_item\" role=\"menuitem\" tabindex=\"-1\" href=\"#\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.width : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.height : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " data-value=\""
    + alias2(alias1((depth0 != null ? depth0.path : depth0), depth0))
    + "\" data-example-url=\""
    + alias2(alias1((depth0 != null ? depth0.sample_url : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a></li>\r\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "data-width=\""
    + ((stack1 = this.lambda((depth0 != null ? depth0.width : depth0), depth0)) != null ? stack1 : "")
    + "\"";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "data-height=\""
    + ((stack1 = this.lambda((depth0 != null ? depth0.height : depth0), depth0)) != null ? stack1 : "")
    + "\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"true\">\r\n    Select A Chart\r\n    <span class=\"caret\"></span>\r\n</button>\r\n<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"useData":true});
templates['bootstrap-panel'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"panel panel-default doc-item clearfix\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['function'] : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.footer : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "            <div class=\"panel-heading\">\n                <span style=\"\"><a href=\"javascript:void(0);\" onClick=\"javascript:toggleSection(this);\"><b>"
    + ((stack1 = alias1((depth0 != null ? depth0['function'] : depth0), depth0)) != null ? stack1 : "")
    + "</b></a></span>\n                <span style=\"float:right;padding-left:10px;\"><a href=\"javascript:void(0);\" onClick=\"javascript:toggleSection(this);\" class=\"chevron icon-chevron-down\"></a></span>\n                <span style=\"float:right\"><a href=\"javascript:void(0);\" onClick=\"javascript:toggleSection(this);\"><i>"
    + ((stack1 = alias1((depth0 != null ? depth0.functionLocation : depth0), depth0)) != null ? stack1 : "")
    + "</i></a></span>\n\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "<div class=\"panel-body\">"
    + ((stack1 = alias1((depth0 != null ? depth0.body : depth0), depth0)) != null ? stack1 : "")
    + " "
    + ((stack1 = alias1((depth0 != null ? depth0['doc-ext'] : depth0), depth0)) != null ? stack1 : "")
    + "</div>";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"panel-footer\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0.footer : depth0), depth0)) != null ? stack1 : "")
    + "</div>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.panels : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['bootstrap-tabs'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "        <li role=\"presentation\" data-for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "><a href=\"#"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" aria-controls=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" role=\"tab\" data-toggle=\"tab\">"
    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
    + "</a></li>\n";
},"2":function(depth0,helpers,partials,data) {
    return " class=\"active\"";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <div role=\"tabpanel\" id=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"tab-pane"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"5":function(depth0,helpers,partials,data) {
    return " active";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.lambda((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"nav nav-tabs\" role=\"tablist\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tabs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n<div class=\"tab-content\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tabs : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
})();
