import { Button, Spacer } from "@hpcc-js/common";
import { Table } from "@hpcc-js/dgrid";
import { ChartPanel } from "@hpcc-js/layout";
import { CommandRegistry, ContextMenu } from "@hpcc-js/phosphor";
import { text as d3Text } from "d3-fetch";
import { Databomb } from "./activities/databomb";
import { DatasourceRefType } from "./activities/datasource";
import { DSPicker } from "./activities/dspicker";
import { Form, FormField } from "./activities/form";
import { LogicalFile } from "./activities/logicalfile";
import { RoxieResult, RoxieService } from "./activities/roxie";
import { WU, WUResult } from "./activities/wuresult";
import { ElementContainer } from "./model/element";

export class DSTable extends ChartPanel {

    private _addButton = new Button().faChar("fa-plus").tooltip("Add...")
        .on("click", () => {
            const node = this._addButton.element().node();
            const rect = node.getBoundingClientRect();
            if (this._contextMenu.open({
                target: node,
                currentTarget: node,
                clientX: rect.left,
                clientY: rect.bottom
            })) {
            }
        });

    private _removeButton = new Button().faChar("fa-minus").tooltip("Remove...")
        .enabled(false)
        .on("click", () => {
            this.remove();
        });

    private _cloneButton = new Button().faChar("fa-clone").tooltip("Clone...")
        .enabled(false)
        .on("click", () => {
            if (this._selectedDS2) {
                if (this._selectedDS2 instanceof Databomb) {
                    this.add(new Databomb()
                        .format(this._selectedDS2.format())
                        .payload(this._selectedDS2.payload())
                    );
                } else if (this._selectedDS2 instanceof Form) {
                    this.add(new Form()
                        .fromDDL(this._selectedDS2.toDDL())
                    );
                } else if (this._selectedDS2 instanceof LogicalFile) {
                    this.add(new LogicalFile(this._ec)
                        .url(this._selectedDS2.url())
                        .logicalFile(this._selectedDS2.logicalFile())
                    );
                } else if (this._selectedDS2 instanceof WUResult) {
                    this.add(new WUResult(this._ec)
                        .wu(new WU(this._ec)
                            .url(this._selectedDS2.wu().url())
                            .wuid(this._selectedDS2.wu().wuid())
                        )
                        .resultName(this._selectedDS2.resultName())
                    );
                } else if (this._selectedDS2 instanceof RoxieResult) {
                    const rs = this._selectedDS2.service();
                    this.add(new RoxieResult(this._ec)
                        .service(new RoxieService(this._ec)
                            .url(rs.url())
                            .querySet(rs.querySet())
                            .queryID(rs.queryID())
                        )
                        .resultName(this._selectedDS2.resultName())
                    );
                } else {
                    console.log("Unknown datasoure type");
                }
            }
        });

    private _addSamples = new Button().faChar("fa-database").tooltip("Add Samples")
        .on("click", () => {
            d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/airports.csv").then(csv => {
                this.add(new Databomb().format("csv").payload(csv));
            });
            d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/carriers.csv").then(csv => {
                this.add(new Databomb().format("csv").payload(csv));
            });
            d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/stats.csv").then(csv => {
                this.add(new Databomb().format("csv").payload(csv));
            });
            this.add(new WUResult(this._ec)
                .wu(new WU(this._ec).url("http://localhost:8010").wuid("W20190802-112509"))
                .resultName("Result 1")
            );
            this.add(new LogicalFile(this._ec)
                .url("http://localhost:8010")
                .logicalFile("progguide::exampledata::peopleaccts")
            );
            this.add(new LogicalFile(this._ec)
                .url("http://localhost:8010")
                .logicalFile("progguide::exampledata::people")
            );
            const vmRoxie = new RoxieService(this._ec)
                .url("http://localhost:8002")
                .querySet("roxie")
                .queryID("peopleaccounts")
                ;
            this.add(new RoxieResult(this._ec)
                .service(vmRoxie)
                .resultName("Accounts")
            );
            this.add(new Form()
                .formFields([
                    new FormField().type("number").fieldID("id").value(8),
                    new FormField().fieldID("first_name").value("John"),
                    new FormField().fieldID("last_name").value("Doe"),
                    new FormField().fieldID("gender").default("M"),
                    new FormField().type("number").fieldID("age")
                ])
            );
            this.render();
        });

    private _dstable = new Table();
    private _selectedDS;
    private _selectedDS2;

    private _contextMenu;

    constructor(private _ec: ElementContainer) {
        super();
        this
            .buttons([this._addButton, this._removeButton, new Spacer(), this._cloneButton, new Spacer(), this._addSamples])
            .widget(this._dstable)
            .columns(["ID", "Type", "References"])
            .on("click", (row, col, sel) => {
                this._selectedDS2 = row.__lparam;
                if (sel && row.References === 0 && row.ID !== "Empty") {
                    this._selectedDS = row.__lparam;
                } else {
                    delete this._selectedDS;
                }
                this._removeButton.enabled(this._selectedDS !== undefined).render();
                this._cloneButton.enabled(this._selectedDS2 !== undefined).render();
            })
            ;

        this.initMenu();
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("add_wu_result", {
            label: "Workunit Result",
            execute: () => {
                this.add(new WUResult(this._ec));
            }
        });

        commands.addCommand("add_logicalfile", {
            label: "Logical File",
            execute: () => {
                this.add(new LogicalFile(this._ec));
            }
        });

        commands.addCommand("add_roxie", {
            label: "Roxie Service",
            execute: () => {
                this.add(new RoxieResult(this._ec));
            }
        });

        commands.addCommand("add_databomb", {
            label: "Databomb",
            execute: () => {
                this.add(new Databomb());
            }
        });

        commands.addCommand("add_form", {
            label: "Form",
            execute: () => {
                this.add(new Form());
            }
        });

        this._contextMenu = new ContextMenu({ commands });
        this._contextMenu.addItem({ command: "add_wu_result", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_logicalfile", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_roxie", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_databomb", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_form", selector: ".common_Button" });
    }

    add(ds: DatasourceRefType) {
        this._ec.appendDatasource(ds);
        this.render();
    }

    remove() {
        if (this._selectedDS) {
            this._ec.removeDatasource(this._selectedDS);
            this.render();
        }
    }

    private _prevDataID;
    render(callback?) {
        const refs = {};
        this._ec.elements().forEach(e => {
            let ds = e.hipiePipeline().datasource();
            if (ds instanceof DSPicker) {
                ds = ds.datasource();
            }
            if (refs[ds.id()] === undefined) {
                refs[ds.id()] = 0;
            }
            refs[ds.id()]++;
        });
        const data = this._ec.datasources().filter(ds => ds.id() !== "Empty").map(ds => {
            if (refs[ds.id()] === undefined) {
                refs[ds.id()] = 0;
            }
            return [ds.id(), ds.classID(), refs[ds.id()] || 0, ds];
        });
        const dataID = JSON.stringify(refs);
        if (this._prevDataID !== dataID) {
            this._prevDataID = dataID;
            this.data(data);
        }
        return super.render(callback);
    }
}
