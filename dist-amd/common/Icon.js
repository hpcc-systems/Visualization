!function(t,e){"function"==typeof define&&define.amd?define(["./SVGWidget","./Shape","./FAChar","css!./Icon"],e):t.common_Icon=e(t.common_SVGWidget,t.common_Shape,t.common_FAChar)}(this,function(t,e,i){function o(){t.call(this),this._shapeWidget=new e,this._faChar=new i}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype._class+=" common_Icon",o.prototype.publish("shape","circle","set","Shape Type",["circle","square"],{tags:["Private"]}),o.prototype.publishProxy("faChar","_faChar","char"),o.prototype.publish("imageUrl",null,"string","Image URL",null,{optional:!0}),o.prototype.publishProxy("image_colorFill","_faChar","text_colorFill"),o.prototype.publish("tooltip","","string","Tooltip",null,{tags:["Private"]}),o.prototype.publish("diameter",24,"number","Diameter",null,{tags:["Private"]}),o.prototype.publish("paddingPercent",45,"number","Padding Percent",null,{tags:["Private"]}),o.prototype.publishProxy("shape_colorFill","_shapeWidget","colorFill"),o.prototype.publishProxy("shape_colorStroke","_shapeWidget","colorStroke"),o.prototype.intersection=function(t,e){return this._shapeWidget.intersection(t,e)},o.prototype.enter=function(e,i){t.prototype.enter.apply(this,arguments),this._defs=i.append("defs"),this._defs.append("clipPath").attr("id","clip_"+this.id()+"_circle").append("circle").attr("x",0).attr("y",0),this._defs.append("clipPath").attr("id","clip_"+this.id()+"_square").append("rect"),this._root=i.append("g"),this._shapeWidget.target(this._root.node()).render(),this._faChar.target(i.node()).render(),this._tooltipElement=i.append("title");var o=this;i.on("click",function(t){o.click(t)}).on("dblclick",function(t){o.dblclick(t)})},o.prototype.click=function(t){console.log("Clicked the icon")},o.prototype.dblclick=function(t){console.log("Double clicked the icon")},o.prototype.update=function(e,i){t.prototype.update.apply(this,arguments);var o=this.diameter(),r=o/2;this._defs.select("circle").attr("r",r),this._defs.select("rect").attr("x",-r).attr("y",-r).attr("width",o).attr("height",o),this._faChar.fontSize(o*(100-this.paddingPercent())/100).render(),this._shapeWidget.shape(this.shape()).width(o).height(o).render();var p=this._root.selectAll("image").data(this.imageUrl()?[this.imageUrl()]:[],function(t){return t});p.enter().append("image").attr("xlink:href",this.imageUrl()),p.attr("clip-path","url(#clip_"+this.id()+"_"+this.shape()+")").attr("x",-r).attr("y",-r).attr("width",o).attr("height",o),p.exit().remove(),this._tooltipElement.text(this.tooltip())},o.prototype.exit=function(e,i){t.prototype.exit.apply(this,arguments),this._shapeWidget.target(null),this._faChar.target(null)},o});