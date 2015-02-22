define([
    "dojo/_base/declare",
    "dojo/dom",

    "dijit/registry",
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/form/Textarea",

    "src/common/FAChar",
    "src/marshaller/Graph",
    "src/other/PropertyEditor", 

    "dojo/text!./tpl/Main.html",

    "bootstrap/Dropdown", "bootstrap/Button",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer"

], function (declare, dom,
    registry, _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, Textarea,
    FAChar, GraphMarshaller, PropertyEditor,
    template) {

    return declare("Main", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "Main",
        graphs: {},

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.tabContainer = registry.byId(this.id + "TabContainer");

            var context = this;
            this.tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                console.log(nval.title);

                context.graphMarshaller = null;
                var graphInfo = context.graphWidgets[nval.title];
                if (graphInfo) {
                    context.graphMarshaller = graphInfo.graph;
                    if (!graphInfo.initialized) {
                        graphInfo.initialized = true;
                        context.graphMarshaller
                            .target(nval.id)
                            .layout("Hierarchy")
                            .design_mode(false)
                            .render()
                        ;
                    }
                }
            });

            this.ddl = registry.byId(this.id + "DDLTextBox");
            this.propsPage = registry.byId(this.id + "Props");
            this.designMode = false;
        },

        resize: function (args) {
            this.inherited(arguments);
            this.borderContainer.resize();
            if (this.graphMarshaller) {
                this.graphMarshaller.resize();
            }
        },
        
        startup: function (args) {
            this.inherited(arguments);
            this.url = dom.byId(this.id + "Url");
        },

        _onDesign: function (evt) {
            if (this.graphMarshaller) {
                this.designMode = !this.designMode;
                //this.graphMarshaller.design_mode(!this.graphMarshaller.design_mode());
                if (this.designMode) {
                    this.propsPage.domNode.style.width = "300px";
                    if (!this.propertyEditor) {
                        this.propertyEditor = new PropertyEditor()
                            .target(this.id + "Props")
                        ;
                        this.innerPropEditor = new PropertyEditor()
                            .target(this.id + "Props")
                        ;
                        this.propertyEditor.onChange = function (propID) {
                        };
                        this.innerPropEditor.onChange = function (propID) {
                        };
                    }
                    this.propertyEditor
                        .data(this.graphMarshaller)
                        .render()
                    ;
                } else {
                    this.propsPage.domNode.style.width = "0px";
                }
                this.resize();
                this.graphMarshaller.render();
            }
        },

        _onSave: function (evt) {
            if (this.graphMarshaller) {
                this.graphMarshaller.save();
            }
        },

        _onDebug: function (evt) {
            if (this.graphMarshaller) {
                this.graphMarshaller
                    .visualizeRoxie(this.debug.get("checked"))
                    .url(this.url.get("value"))
                    .doRender()
                ;
            }
        },

        _onGo: function (evt) {
            var tabs = this.tabContainer.getChildren();
            this.graphWidgets = {};
            for (var i = 0; i < tabs.length; ++i) {
                this.tabContainer.removeChild(tabs[i]);
                tabs[i].destroyRecursive();
            }

            var context = this;
            var graph = new GraphMarshaller()
                .ddl_url(this.url.value)
            ;
            context.graphWidgets["???"] = {
                graph: graph,
                initialized: false
            };
            graph.vertex_click = function (d, columns) {
                if (context.innerPropEditor) {
                    context.propertyEditor
                        .data(d)
                        .render()
                    ;
                }
            }

            var pane = new ContentPane({ title: "???" });
            context.tabContainer.addChild(pane);
            var ddlPane = new ContentPane({
                title: "DDL", style: {
                    overflow: "auto"
                }
            });
            context.tabContainer.addChild(ddlPane);
            var textArea = new Textarea({
                style: {
                    width: "100%",
                    height: "100%"
                }
            });
            ddlPane.addChild(textArea);
            //textArea.set("value", json);
        },

        _onReset: function (evt) {
            if (this.graphMarshaller) {
                this.graphMarshaller.clear();
                this._onGo();
            }
        },

        _toggleEdges: function (evt) {
            if (this.graphMarshaller) {
                this.graphMarshaller.showEdges(!this.graphMarshaller.showEdges()).render();
            }
        },

        _toggleSnap: function (evt) {
            if (this.graphMarshaller) {
                this.graphMarshaller.snapToGrid(this.graphMarshaller.snapToGrid() ? 0 : 12);
            }
        }
    });
});
