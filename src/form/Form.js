"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Input", "./Slider", "css!./Form"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.form_Input, root.form_Slider);
    }
}(this, function (d3,HTMLWidget,Input,Slider) {
    function Form() {
        HTMLWidget.call(this);

        this._tag = "form";
    }
    Form.prototype = Object.create(HTMLWidget.prototype);
    Form.prototype._class += " form_Form";

    Form.prototype.publish("validate", true, "boolean", "Enable/Disable input validation");
    Form.prototype.publish("inputs", [], "widgetArray", "Array of input widgets");
    Form.prototype.publish("controls", [], "widgetArray", "Array of input widgets to control form functionality");

    Form.prototype.testData = function () {
        this
            .inputs([
                new Input()
                    .name("textbox-test")
                    .label("Alphanumeric")
                    .type("textbox")
                    .validate("^[A-Za-z0-9]+$")
                    .value("SomeString123"),
                new Input()
                    .name("textbox-test")
                    .label("Only Alpha")
                    .type("textbox")
                    .validate("^[A-Za-z]+$")
                    .value("SomeString"),
                new Input()
                    .name("number-test")
                    .label("Number Test")
                    .type("number")
                    .validate("\\d+")
                    .value(123),
                new Input()
                    .name("checkbox-test")
                    .label("Checkbox Test")
                    .type("checkbox")
                    .value(true),
                new Input()
                    .name("select-test")
                    .label("Select Test")
                    .type("select")
                    .selectOptions(['A','B','C'])
                    .value('B'),
                new Input()
                    .name("button-test")
                    .label("Button Test")
                    .type("button")
                    .value('Button Text'),
                new Input()
                    .name("button-test")
                    .label("Textarea Test")
                    .type("textarea")
                    .value('Textarea Text'),
                new Slider()
                    .name("button-test")
                    .label("Slider Test")
                    .value(66)
            ])
        ;
        var context = this;
        this
            .controls([
                new Input()
                    .type("button")
                    .value("Submit")
                    .on("click", function(){
                        context.submit();
                    }, true),
                new Input()
                    .type("button")
                    .value("Clear")
                    .on("click", function(){
                        context.clear();
                    }, true)
            ]);
        return this;
    };
    
    Form.prototype.submit = function(){
        var isValid = true;
        if(this.validate()){
            isValid = this.checkValidation();
        }
        if(isValid){
            var dataArr = [];
            var inpArr = this.inputs();
            inpArr.forEach(function(inp){
                dataArr.push({name:inp.name(),value:inp.value()});
            });
            console.log('Clicked Submit: '+JSON.stringify(dataArr));
        }
    };
    Form.prototype.clear = function(){
        var inpArr = this.inputs();
        inpArr.forEach(function(inp){
            if(inp.type() === "checkbox"){
                inp.value(false);
                inp._inputElement.node().checked = false;
            } else {
                inp.value(' ');
                inp._inputElement.node().value = ' ';
            }
        });
    };
    
    Form.prototype.checkValidation = function(){
        var ret = true;
        var msgArr = [];
        this.inputs().forEach(function(inp){
            if(!inp.isValid()){
                msgArr.push("'"+inp.label()+"'"+' value is invalid.');
            }
        });
        if(msgArr.length > 0){
            alert(msgArr.join('\n'));
            ret = false;
        }
        return ret;
    };
    
    Form.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this._parentElement.style("overflow", "auto");
        var table = element
            .append("table")
        ;
        this.tbody = table.append("tbody");
        var btntd = table.append("tfoot").append("tr").append('td')
            .attr('colspan', "2")
        ;

        this.controls().reverse().forEach(function(w){
            var controlNode = btntd
                .append("div")
                .style("float", "right")
            ;
            w.target(controlNode.node()).render();
        });
    };

    Form.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var rows = this.tbody.selectAll("tr").data(this.inputs());
        rows.enter().append("tr")
            .each(function (inputWidget, i) {
                var element = d3.select(this);
                element.append("td")
                    .attr("class", "prompt")
                    .text(inputWidget.label() + ":")
                ;
                var input = element.append("td")
                    .attr("class", "input")
                ;
                inputWidget.target(input.node()).render();
                var inputElement = inputWidget.element();
                if (inputElement.node && inputElement.node().getBBox) {
                    var node = inputElement.node();
                    if (node.getBBox) {
                        var xxx = node.getBBox();
                        inputWidget.resize({ width: xxx.width + inputWidget.padding() - 8, height: xxx.height + inputWidget.padding() }).render();
                    }
                }
            });
        rows.exit().remove();
    };

    Form.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Form;

}));