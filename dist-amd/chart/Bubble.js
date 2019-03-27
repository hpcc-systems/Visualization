!function(t,e){"function"==typeof define&&define.amd?define(["d3","../common/SVGWidget","../api/I2DChart","../common/Text","../common/FAChar","../common/Utility","../api/ITooltip","css!./Bubble"],e):t.chart_Bubble=e(t.d3,t.common_SVGWidget,t.api_I2DChart,t.common_Text,t.common_FAChar,t.common_Utility,t.api_ITooltip)}(this,function(t,e,i,o,n,l,r){function a(o){e.call(this),i.call(this),r.call(this),l.SimpleSelectionMixin.call(this),this._drawStartPos="origin",this.labelWidgets={},this.d3Pack=t.layout.pack().sort(function(t,e){return e>t?-1:t>e?1:0}).size([this.width(),this.height()]).value(function(t){return t[1]})}return a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.prototype._class+=" chart_Bubble",a.prototype["implements"](i.prototype),a.prototype["implements"](r.prototype),a.prototype.mixin(l.SimpleSelectionMixin),a.prototype.publish("paletteID","default","set","Palette ID",a.prototype._palette["switch"](),{tags:["Basic","Shared"]}),a.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),a.prototype.size=function(t){var i=e.prototype.size.apply(this,arguments);return arguments.length&&this.d3Pack.size([this.width(),this.height()]),i},a.prototype.enter=function(t,i){e.prototype.enter.apply(this,arguments),this._selection.widgetElement(i);var o=this;this.tooltipHTML(function(t){switch(o.tooltipStyle()){case"series-table":return o.tooltipFormat({label:t[0],arr:o.columns().slice(1).map(function(e,i){return{label:e,color:o._palette(t[0]),value:t[1]}})});default:return o.tooltipFormat({label:t[0],value:t[1]})}})},a.prototype.update=function(e,i){var l=this;this._palette=this._palette["switch"](this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id()));var r=i.selectAll(".node").data(this.data().length?this.d3Pack.nodes({children:this.cloneData()}).filter(function(t){return!t.children}):[],function(t){return t[0]});r.enter().append("g").attr("class","node").attr("opacity",0).call(this._selection.enter.bind(this._selection)).on("click",function(t){l.click(l.rowToObj(t),l.columns()[1],l._selection.selected(this))}).on("dblclick",function(t){l.dblclick(l.rowToObj(t),l.columns()[1],l._selection.selected(this))}).each(function(e){var i=t.select(this);i.append("circle").attr("r",function(t){return t.r}).on("mouseout.tooltip",l.tooltip.hide).on("mousemove.tooltip",l.tooltip.show),e.__viz_faChar?l.labelWidgets[e[0]]=(new n)["char"](e.__viz_faChar).target(this).render():l.labelWidgets[e[0]]=(new o).text(e[0]).target(this).render()}),r.transition().attr("opacity",1).each(function(e){var i=t.select(this),o={x:e.x,y:e.y};if(i.select("circle").transition().attr("transform",function(t){return"translate("+o.x+","+o.y+")"}).style("fill",function(t){return l._palette(t[0])}).attr("r",function(t){return t.r}).select("title").text(function(t){return t[0]+" ("+t[1]+")"}),e.__viz_faChar)l.labelWidgets[e[0]].pos(o).render();else{var n=e[0],r=l.labelWidgets[e[0]].getBBox().width;if(2*e.r<16)n="";else if(2*e.r<r){var a=r-2*e.r,s=a/r,c=n.slice(0,Math.floor(n.length-n.length*s));n=c.slice(0,-3)+"..."}l.labelWidgets[e[0]].pos(o).text(n).render()}}),r.exit().transition().style("opacity",0).remove()},a.prototype.exit=function(t,i){e.prototype.exit.apply(this,arguments)},a});