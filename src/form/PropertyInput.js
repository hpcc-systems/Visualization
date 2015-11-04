"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3"], factory);
    } else {
        root.form_PropertyInput = factory(root.d3);
    }
}(this, function (d3) {
    function appendInputs(cell,param) {
        var input;
        cell.classed(param.type+"-cell",true);
        switch(param.type){
            case 'set':
                input = cell.append("select").classed("property-input",true);
                for(var i = 0;i<param.set.length;i++){
                    input.append("option").attr("value",param.set[i]).text(param.set[i]);
                }
                break;
            case 'string':
            case 'number':
            case 'html-color':
                cell.append("input").classed("property-input",true);
                break;
            case 'boolean':
                cell.append("input").classed("property-input",true).attr("type","checkbox");
                break;
            default:
                cell.append("textarea").classed("property-input",true);
                break;
        }
        if(param.type === 'html-color'){
            cell.append("input").classed("property-input",true).attr("type","color");
        }
    }

    function updateInputs(widget,param,inpArr){
        inpArr.each(function(n,idx){
            var val = widget[param.id]();
            if(this.type === "checkbox"){
                d3.select(this).property("checked",val)
                    .on("change",function(){
                        widget[param.id](this.checked).render();
                    });
            } else if(this.type === "html-color") {
                d3.select(this).attr("value",val)
                    .on("change",function(){
                        widget[param.id](this.value).render();
                        inpArr[0][(idx+1)%2].value = this.value;
                    });
            } else if(param.type === "array" || param.type === "object") {
                this.value = JSON.stringify(val);
                this.innerHTML = this.value;
                d3.select(this)
                    .on("change",function(){
                        widget[param.id](JSON.parse(this.value)).render();
                    });
            } else {
                d3.select(this).attr("value",val)
                    .on("change",function(){
                        widget[param.id](this.value).render();
                    });
            }
        });
    }

    return {
        appendInputs: appendInputs,
        updateInputs: updateInputs,
    };
}));