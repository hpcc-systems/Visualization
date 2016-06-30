"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "auto-complete", "css!./AutoCompleteText", "css!auto-complete"], factory);
    } else {
        root.other_AutoCompleteText = factory(root.common_HTMLWidget, root.autoComplete);
    }
}(this, function (HTMLWidget) {
    function AutoCompleteText(target) {
        HTMLWidget.call(this);
        this._tag = 'div';
    }
    AutoCompleteText.prototype = Object.create(HTMLWidget.prototype);
    AutoCompleteText.prototype.constructor = AutoCompleteText;
    AutoCompleteText.prototype._class += " other_AutoCompleteText";

    AutoCompleteText.prototype.publish("label", "Label: ", "string", "Label for AutoCompleteText");
    AutoCompleteText.prototype.publish("placeholder", "Search...", "string", "Placeholder for AutoCompleteText");
    AutoCompleteText.prototype.publish("multiple", false, "boolean", "Multiple AutoCompleteTextion");
    AutoCompleteText.prototype.publish("inputType", "text", "set", "Input Type", ["text","email","date", "datetime", "datetime-local", "month", "number", "time", "week"]);
    AutoCompleteText.prototype.publish("autoCompleteTextSize", 20, "number", "Size of multiAutoCompleteText box", null, {disabled:function(){return !this.multiple();}});
    AutoCompleteText.prototype.publish("minCharsText", 1, "number", "Size of multiAutoCompleteText box");
    AutoCompleteText.prototype.publish("valueColumn", null, "set", "Select column for autocomplete", function(){return this.columns();}, {optional:true});
    
    AutoCompleteText.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
    		.attr("for", this.id() + "_input")
    	;

        var context = this;
        // any value in placing in a form? 
        //this._form = this._span.append("form");
        //this._input = this._form.append("input")
        this._input = this._span.append("input")
        	.attr("id", this.id()+"_input")
        	.attr("name", this.id()+"_input_name")
        	.attr("placeholder", this.placeholder())
        ;
    
    };

    AutoCompleteText.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;
        
        this._label.text(this.label());
        
        this._input
        	.attr("multiple", this.multiple() ? this.multiple() : null)
        	.attr("size", this.autoCompleteTextSize())
        	.attr("type", this.inputType())
        ;
var autoCompleted = this;

        this._autoComplete =
        new autoComplete({
            //selector: 'input[name="'+ context.id()+'_input_name' + '"]',
        	selector: '#' + context.id()+'_input',
            minChars: context.minCharsText(),
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = context.data(); 
                var matches = [];
                for (var i=0; i<choices.length; i++)
                    if (~choices[i][0].toLowerCase().indexOf(term)) matches.push(choices[i][0]); // need to replace 0 with valueColumn
                suggest(matches);
            },
	        renderItem: function (item, search){
	            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
	            var listing = '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
	            return listing;
	        },
	        onSelect: function(e, term, item){
	            context.click('Term "' + term + '" Item "'+item.getAttribute('data-langname')+' ('+item.getAttribute('data-lang')+')" selected by '+(e.type === 'keydown' ? 'pressing enter' : 'mouse click')+'.');
	        }
        });
        
    };

    AutoCompleteText.prototype.exit = function (domNode, element) {
        this._autoComplete.destroy();
    	this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    AutoCompleteText.prototype.click = function(v) {
    	console.log(v);
    };

    return AutoCompleteText;
}));
