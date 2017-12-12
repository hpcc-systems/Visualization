import { MultiChartPanel } from "@hpcc-js/composite";
import * as DDL from "@hpcc-js/ddl-shim";
import { Form, Input } from "@hpcc-js/form";
import { Databomb, Form as DBForm } from "./activities/databomb";
import { AggregateField, GroupByColumn } from "./activities/groupby";
import { ComputedField } from "./activities/project";
import { HipieRequest, RoxieRequest } from "./activities/roxie";
import { WUResult } from "./activities/wuresult";
import { Element, ElementContainer } from "./model";

export class DDLImport {
    _owner: ElementContainer;
    _url: string;
    _datasources: { [key: string]: DDL.IDatasource } = {};
    _dashboards: { [key: string]: DDL.IDashboard } = {};
    _visualizations: { [key: string]: DDL.IAnyVisualization } = {};
    _vizzies: { [key: string]: Element } = {};

    constructor(dashboard: ElementContainer, url: string, ddl: DDL.IDDL) {
        this._owner = dashboard;
        this._url = url;

        for (const ddlDashboard of ddl.dashboards) {
            this.dashboardPre(ddlDashboard);
        }

        for (const ddlDS of ddl.datasources) {
            this.datasource(ddlDS);
        }

        for (const ddlDashboard of ddl.dashboards) {
            this.dashboardPost(ddlDashboard);
        }
    }

    form(ddlVisualization: DDL.IVisualization, viz: Element) {
        const dbForm = new DBForm();
        const payload: any = {};
        const inputs: Input[] = [];
        for (const field of ddlVisualization.fields) {
            const defaultVal: any = field.properties.default[0];
            payload[field.id] = defaultVal || "";

            inputs.push(new Input()
                .type("text")
                .name(field.id)
                .label(field.properties.label)
                .value(defaultVal) // TODO Hippie support for multiple default values (checkbox only)
            );
        }
        dbForm.payload(payload);

        const form = new Form()
            .inputs(inputs)
            .on("click", function (row: object) {
                viz.state().selection([row]);
            })
            ;

        viz.view().dataSource(dbForm);
        viz.multiChartPanel().multiChart().chart(form);
    }

    line(ddlVisualization: DDL.ILineVisualization, viz: Element) {
        const mappingFields: ComputedField[] = [];
        try {
            for (const id of ddlVisualization.source.mappings.x.concat(ddlVisualization.source.mappings.y)) {
                mappingFields.push(new ComputedField(viz.view().project())
                    .label(id.toLocaleLowerCase())
                    .type("=")
                    .column1(id.toLocaleLowerCase())
                );
            }
        } catch (e) {
        }
        viz.view().mappings()
            .trim(mappingFields.length > 0)
            .computedFields(mappingFields)
            ;
        (viz.chartPanel() as MultiChartPanel).chartType(ddlVisualization.properties.charttype || "COLUMN");
    }

    table(ddlVisualization: DDL.ITableVisualization, viz: Element) {
        const mappingFields: ComputedField[] = [];
        ddlVisualization.source.mappings.value.forEach((value, idx) => {
            mappingFields.push(new ComputedField(viz.view().project())
                .label(ddlVisualization.label[idx])
                .type("=")
                .column1(value.toLowerCase())
            );
        });

        viz.view().mappings()
            .trim(mappingFields.length > 0)
            .computedFields(mappingFields)
            ;
        (viz.chartPanel() as MultiChartPanel).chartType((ddlVisualization.properties && ddlVisualization.properties.charttype) ? ddlVisualization.properties.charttype : "TABLE");
    }

    visualizationPre(ddlVisualization: DDL.IAnyVisualization) {
        this._visualizations[ddlVisualization.id] = ddlVisualization;
        const viz = new Element(this._owner)
            .id(ddlVisualization.id)
            .title(ddlVisualization.title)
            ;
        viz.state().monitorProperty("selection", (id, newVal, oldVal) => {
            for (const filteredViz of this._owner.filteredBy(viz)) {
                filteredViz.refresh().then(() => {
                    //                    if (this._currViz === filteredViz) {
                    //                        this.refreshPreview();
                    //                    }
                });
            }
        });
        this._vizzies[ddlVisualization.id] = viz;
        const w = viz.chartPanel();
        if (w instanceof MultiChartPanel) {
            w.title(ddlVisualization.title);
        }
        const projectFields: ComputedField[] = [];
        const groupByColumns: GroupByColumn[] = [];
        const groupByFields: AggregateField[] = [];
        for (const field of ddlVisualization.fields) {
            if (field.properties) {
                switch (field.properties.function) {
                    case "SUM":
                        break;
                    case "AVE":
                        projectFields.push(new ComputedField(viz.view().project())
                            .label(field.id.toLowerCase())
                            .type("/")
                            .column1(field.properties.params.param1.toLowerCase())
                            .column2(field.properties.params.param2.toLowerCase())
                        );
                        /*
                        groupByColumns.push(new GroupByColumn(viz.view().groupBy())
                            .label(field.id.toLowerCase())
                        );
                        */
                        groupByFields.push(new AggregateField(viz.view().groupBy())
                            .fieldID(field.id.toLowerCase())
                            .aggrType("mean")
                            .aggrColumn(field.id.toLowerCase())
                        );
                        break;
                    case "MIN":
                        break;
                    case "MAX":
                        break;
                    case undefined:
                    default:
                        groupByColumns.push(new GroupByColumn(viz.view().groupBy())
                            .label(field.id.toLowerCase())
                        );
                        break;
                }
            }
        }
        viz.view().project().computedFields(projectFields);
        if (groupByColumns.length && groupByFields.length) {
            viz.view().groupBy()
                .column(groupByColumns)
                .computedFields(groupByFields)
                ;
        }
        switch (ddlVisualization.type) {
            case "FORM":
                this.form(ddlVisualization, viz);
                break;
            case "CHORO":
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
            case "LINE":
                this.line(ddlVisualization as DDL.ILineVisualization, viz);
                break;
            case "GRAPH":
                //                this.graph(ddlVisualization as DDL.IGraphVisualization, viz);
                break;
            case "TABLE":
                this.table(ddlVisualization as DDL.ITableVisualization, viz);
                break;
            default:
                break;
        }
        this._owner.append(this._vizzies[ddlVisualization.id]);
    }

    visualizationPost(ddlVisualization: DDL.IAnyVisualization) {
        const viz = this._vizzies[ddlVisualization.id];
        for (const eventType in ddlVisualization.events) {
            for (const update of ddlVisualization.events[eventType].updates) {
                const otherViz = this._vizzies[update.visualization];
                const mappings: Array<{ remoteField: string, localField: string }> = [];
                for (const key in update.mappings) {
                    mappings.push({
                        remoteField: update.mappings[key],
                        localField: key
                    });
                }
                const otherView = otherViz.view();
                const otherDataSource = otherView.dataSource();
                if (otherDataSource instanceof RoxieRequest) {
                    otherDataSource.appendParam(viz, mappings);
                } else {
                    otherView.filters().appendFilter(viz, mappings);
                }
            }
        }
    }

    dashboardPre(ddlDashboard: DDL.IDashboard) {
        this._dashboards[ddlDashboard.id] = ddlDashboard;
        for (const ddlVisualization of ddlDashboard.visualizations) {
            this.visualizationPre(ddlVisualization);
        }
    }

    dashboardPost(ddlDashboard: DDL.IDashboard) {
        for (const ddlVisualization of ddlDashboard.visualizations) {
            this.visualizationPost(ddlVisualization);
        }
    }

    datasource(ddlDS: DDL.IDatasource) {
        for (const ddlOP of ddlDS.outputs) {
            for (const ddlNotify of ddlOP.notify) {
                const view = this._vizzies[ddlNotify].view();
                if (ddlDS.WUID) {
                    const wuResult = new WUResult()
                        .fullUrl(this._url)
                        .resultName(ddlOP.from)
                        ;
                    view.dataSource(wuResult);
                } else if (ddlDS.databomb) {
                    const databomb = new Databomb()
                        ;
                    view.dataSource(databomb);
                } else {
                    const hipieRequest = new HipieRequest(this._owner)
                        .fullUrl(ddlDS.URL)
                        .resultName(ddlOP.from)
                        ;
                    view.dataSource(hipieRequest);
                }
            }
        }
    }
}

export function doImport(ec: ElementContainer, url: string, ddl: string) {
    new DDLImport(ec, url, JSON.parse(ddl));
}
