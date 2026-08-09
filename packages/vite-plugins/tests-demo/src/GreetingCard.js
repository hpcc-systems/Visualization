define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!app/GreetingCard.html"
], function (declare, _WidgetBase, _TemplatedMixin, template) {
    return declare("app.GreetingCard", [_WidgetBase, _TemplatedMixin], {
        name: "Dojo",
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
            this.messageNode.textContent = `Hello, ${this.name}.`;
        },

        refresh: function () {
            this.messageNode.textContent = `Hello again, ${this.name}.`;
        }
    });
});