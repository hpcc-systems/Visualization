import * as marshaller from "../src/index.ts";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Dashboard, Dashy, DDLEditor, DDLAdapter, GraphAdapter, JavaScriptAdapter, ElementContainer } from "../src/index.ts";
import { Databomb, DatasourceAdapt } from "../src/index.ts";
import { Limit } from "../src/index.ts";
import { Sort, SortColumn } from "../src/index.ts";
import { GroupBy, GroupByColumn, AggregateField } from "../src/index.ts";
import { Project, ComputedField, Mappings } from "../src/index.ts";
import { Filters, ColumnMapping } from "../src/index.ts";
import { Form, FormField } from "../src/index.ts";
import { HipiePipeline, NullView } from "../src/index.ts";
import { Element, State, Visualization, VizChartPanel } from "../src/index.ts";
import { Activity, ActivityPipeline, ActivitySelection, stringify, schemaType2IFieldType } from "../src/index.ts";
import { describe, it, expect } from "vitest";

const urlSearch: string = "";

//  Classes that require constructor arguments or are not constructable  ---
const skipNew = new Set([
    "Dashboard", "Element", "ElementContainer", "Visualization", "VizChartPanel",
    "Filters", "HipiePipeline", "NullView", "DatasourceAdapt", "DSPicker",
    "ESPResult", "LogicalFile", "WUResult",
    "DDLAdapter", "JavaScriptAdapter",
    "createProps", "hookSend", "rowToFields", "schemaRow2IField", "schemaType2IFieldType",
    "stringify", "wsEclSchemaRow2IField"
]);

describe("@hpcc-js/marshaller", () => {
    for (const key in marshaller) {
        const item = (marshaller as any)[key];
        if (item?.prototype?.constructor) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (!skipNew.has(key)) {
                        it("Simple", () => {
                            const instance = new item();
                            expect(instance).to.be.an.instanceof(item);
                        });
                    } else {
                        it("Simple", () => {
                            expect(item).to.be.a("function");
                        });
                    }
                });
            }
        }
    }

    describe("Activity basics", () => {
        it("stringify", () => {
            expect(stringify({ a: 1, b: "hello" })).to.be.a("string");
            expect(stringify({ a: 1, b: "hello" })).to.include("a:");
            expect(stringify({ a: 1, b: "hello" })).to.include("b:");
        });

        it("schemaType2IFieldType", () => {
            expect(schemaType2IFieldType("boolean")).to.equal("boolean");
            expect(schemaType2IFieldType("xs:double")).to.equal("number");
            expect(schemaType2IFieldType("xs:string")).to.equal("string");
            expect(schemaType2IFieldType("xs:integer")).to.equal("number64");
            expect(schemaType2IFieldType("unknown")).to.equal("string");
        });
    });

    describe("Databomb", () => {
        it("create with payload", () => {
            const db = new Databomb();
            expect(db).to.be.instanceOf(Databomb);
        });

        it("toDDL", () => {
            const db = new Databomb();
            db.id("test");
            const ddl = db.toDDL();
            expect(ddl).to.have.property("type", "databomb");
        });
    });

    describe("Limit", () => {
        it("create", () => {
            const limit = new Limit();
            expect(limit).to.be.instanceOf(Limit);
        });

        it("toDDL", () => {
            const limit = new Limit();
            const ddl = limit.toDDL();
            expect(ddl).to.have.property("type", "limit");
        });

        it("fromDDL", () => {
            const limit = Limit.fromDDL({ type: "limit", limit: 100 });
            expect(limit.rows()).to.equal(100);
        });

        it("hash", () => {
            const limit = new Limit();
            const h = limit.hash();
            expect(h).to.be.a("string");
        });
    });

    describe("Sort", () => {
        it("create", () => {
            const sort = new Sort();
            expect(sort).to.be.instanceOf(Sort);
        });

        it("toDDL", () => {
            const sort = new Sort();
            const ddl = sort.toDDL();
            expect(ddl).to.have.property("type", "sort");
        });

        it("SortColumn create", () => {
            const col = new SortColumn();
            expect(col).to.be.instanceOf(SortColumn);
        });
    });

    describe("GroupBy", () => {
        it("create", () => {
            const gb = new GroupBy();
            expect(gb).to.be.instanceOf(GroupBy);
        });

        it("toDDL", () => {
            const gb = new GroupBy();
            const ddl = gb.toDDL();
            expect(ddl).to.have.property("type", "groupby");
        });

        it("GroupByColumn create", () => {
            const col = new GroupByColumn();
            expect(col).to.be.instanceOf(GroupByColumn);
        });

        it("AggregateField create", () => {
            const af = new AggregateField();
            expect(af).to.be.instanceOf(AggregateField);
        });
    });

    describe("Filters", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const filters = new Filters(ec);
            expect(filters).to.be.instanceOf(Filters);
        });

        it("toDDL", () => {
            const ec = new ElementContainer();
            const filters = new Filters(ec);
            const ddl = filters.toDDL();
            expect(ddl).to.have.property("type", "filter");
            expect(ddl).to.have.property("conditions");
        });

        it("ColumnMapping create", () => {
            const cm = new ColumnMapping();
            expect(cm).to.be.instanceOf(ColumnMapping);
        });
    });

    describe("Form", () => {
        it("create", () => {
            const form = new Form();
            expect(form).to.be.instanceOf(Form);
        });

        it("toDDL", () => {
            const form = new Form();
            const ddl = form.toDDL();
            expect(ddl).to.have.property("type", "form");
        });

        it("FormField create", () => {
            const ff = new FormField();
            expect(ff).to.be.instanceOf(FormField);
        });
    });

    describe("Project", () => {
        it("create", () => {
            const project = new Project();
            expect(project).to.be.instanceOf(Project);
        });

        it("toDDL", () => {
            const project = new Project();
            const ddl = project.toDDL();
            expect(ddl).to.have.property("type", "project");
        });

        it("ComputedField create", () => {
            const cf = new ComputedField();
            expect(cf).to.be.instanceOf(ComputedField);
        });
    });

    describe("DDLAdapter", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const dashboard = new Dashboard(ec);
            const adapter = new DDLAdapter(dashboard);
            expect(adapter).to.be.instanceOf(DDLAdapter);
        });

        it("write empty DDL", () => {
            const ec = new ElementContainer();
            const dashboard = new Dashboard(ec);
            const adapter = new DDLAdapter(dashboard);
            const ddl = adapter.write();
            expect(ddl).to.have.property("version");
            expect(ddl).to.have.property("datasources");
            expect(ddl).to.have.property("dataviews");
        });
    });

    describe("GraphAdapter", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const adapter = new GraphAdapter(ec);
            expect(adapter).to.be.instanceOf(GraphAdapter);
        });
    });

    describe("ElementContainer", () => {
        it("create", () => {
            const ec = new ElementContainer();
            expect(ec).to.be.instanceOf(ElementContainer);
        });

        it("elements returns array", () => {
            const ec = new ElementContainer();
            expect(ec.elements()).to.be.an("array");
        });

        it("elementIDs returns array", () => {
            const ec = new ElementContainer();
            expect(ec.elementIDs()).to.be.an("array");
        });
    });

    describe("Element", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const elem = new Element(ec);
            expect(elem).to.be.instanceOf(Element);
        });
    });

    describe("State", () => {
        it("create", () => {
            const state = new State();
            expect(state).to.be.instanceOf(State);
        });
    });

    describe("Visualization", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const pipeline = new HipiePipeline(ec, "test_viz");
            const viz = new Visualization(pipeline);
            expect(viz).to.be.instanceOf(Visualization);
        });
    });

    describe("Dashboard", () => {
        it("create", () => {
            const ec = new ElementContainer();
            const dashboard = new Dashboard(ec);
            expect(dashboard).to.be.instanceOf(Dashboard);
        });

        it("render", () => {
            return new Promise<void>((done) => {
                const div = document.createElement("DIV");
                div.style.width = "640px";
                div.style.height = "480px";
                document.body.appendChild(div);
                const ec = new ElementContainer();
                const dashboard = new Dashboard(ec)
                    .target(div)
                    ;
                dashboard.render(() => {
                    dashboard.target(null);
                    div.parentNode!.removeChild(div);
                    done();
                });
            });
        });
    });

    describe("DDLEditor", () => {
        it("create", () => {
            const editor = new DDLEditor();
            expect(editor).to.be.instanceOf(DDLEditor);
        });

        it("set and get DDL", () => {
            const editor = new DDLEditor();
            const sampleDDL = { version: "2.2.1", datasources: [], dataviews: [] };
            editor.ddl(sampleDDL);
            const result = editor.ddl();
            expect(result).to.have.property("version");
        });
    });
});
