!function(e,i){"function"==typeof define&&define.amd?define(["d3","./Common2D"],i):e.google_Pie=i(e.d3,e.google_Common2D)}(this,function(e,i){function t(){i.call(this),this._chartType="PieChart"}function l(e){for(var i=[],t=0;e>t;t++)i.push({});return i}return t.prototype=Object.create(i.prototype),t.prototype.constructor=t,t.prototype._class+=" google_Pie",t.prototype.publish("is3D",!1,"boolean","Enable 3D",null,{tags:["Basic","Shared"]}),t.prototype.publish("pieHole",0,"number","Pie Hole Size",null,{min:0,max:.9,step:.1,tags:["Intermediate"]}),t.prototype.publish("pieStartAngle",0,"number","Pie Start Angle",null,{tags:["Advanced"]}),t.prototype.publish("pieSliceText","percentage","set","The Content of The Text Displayed On The Slice",["none","label","value","percentage"],{tags:["Basic"]}),t.prototype.publish("pieSliceFontColor",null,"html-color","Specifies The Slice Text Style (Color)",null,{tags:["Basic"]}),t.prototype.publish("pieSliceFontFamily",null,"string","Specifies The Slice Text Style (Font Name)",null,{tags:["Basic"]}),t.prototype.publish("pieSliceFontSize",null,"number","Specifies The Slice Text Style (Font Size)",null,{tags:["Basic"]}),t.prototype.publish("pieSliceBorderColor",null,"html-color","The Color of The Slice Borders",null,{tags:["Intermediate"]}),t.prototype.publish("pieResidueSliceColor",null,"html-color","Color For The Combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]}),t.prototype.publish("pieResidueSliceLabel","Other","string","A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]}),t.prototype.publish("sliceVisibilityThreshold",1/720,"number","The slice relative part, below which a slice will not show individually.",null,{tags:["Advanced"]}),t.prototype.publish("slicesOffset",[],"array","Per Slice Offset",null,{tags:["Advanced"]}),t.prototype.publish("slicesTextStyle",[],"array","Per Slice",null,{tags:["Private"]}),t.prototype.publish("slicesColor",[],"array","Per Slice Color",null,{tags:["Private"]}),t.prototype.getChartOptions=function(){var e=i.prototype.getChartOptions.apply(this,arguments);return e.colors=this.data().map(function(e){return this._palette(e[0])},this),e.is3D=this.is3D(),e.pieHole=this.pieHole(),e.pieStartAngle=this.pieStartAngle(),e.pieSliceText=this.pieSliceText(),e.pieSliceTextStyle={color:this.pieSliceFontColor(),fontName:this.pieSliceFontFamily(),fontSize:this.pieSliceFontSize()},e.pieSliceBorderColor=this.pieSliceBorderColor(),e.pieResidueSliceColor=this.pieResidueSliceColor(),e.pieResidueSliceLabel=this.pieResidueSliceLabel(),e.sliceVisibilityThreshold=this.sliceVisibilityThreshold(),e.slices=l(this.getNumSlices()),this.slicesColor().forEach(function(i,t){"undefined"==typeof e.slices[t]&&(e.slices[t]={}),e.slices[t].color=i}),this.slicesOffset().forEach(function(i,t){"undefined"==typeof e.slices[t]&&(e.slices[t]={}),e.slices[t].offset=i}),this.slicesTextStyle().forEach(function(i,t){"undefined"==typeof e.slices[t]&&(e.slices[t]={}),e.slices[t].textStyle=i}),e},t.prototype.getNumSlices=function(){return this.data().length},t.prototype.enter=function(e,t){i.prototype.enter.apply(this,arguments)},t.prototype.update=function(e,t){i.prototype.update.apply(this,arguments)},t});